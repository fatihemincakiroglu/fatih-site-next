// ─────────────────────────────────────────────────────────────
// SSRF korumalı dış istek yardımcısı.
//
// Sorun: kullanıcıdan alınan bir URL'i sunucu tarafında olduğu gibi fetch etmek,
// sunucuyu saldırgan için bir "proxy"ye çevirir. Saldırgan;
//   • http://127.0.0.1:xxxx  ile iç servisleri,
//   • http://10.0.0.0/8, 192.168.x.x gibi özel ağları,
//   • http://169.254.169.254 (cloud metadata) ile bulut kimlik bilgilerini
// hedefleyebilir. redirect:'follow' kullanıldığında dış görünen bir adres
// 302 ile iç bir adrese yönlendirilerek kontrol atlatılabilir.
//
// Çözüm: her adımda (ilk istek + her yönlendirme) hostname'i DNS ile çözüp
// dönen TÜM IP'lerin herkese açık aralıkta olduğunu doğruluyoruz.
// ─────────────────────────────────────────────────────────────

import dns from 'dns/promises'
import net from 'net'

function ipv4Private(ip) {
  const [a, b] = ip.split('.').map(Number)
  if (a === 0 || a === 10 || a === 127) return true            // this/private/loopback
  if (a === 172 && b >= 16 && b <= 31) return true             // 172.16.0.0/12
  if (a === 192 && b === 168) return true                      // 192.168.0.0/16
  if (a === 169 && b === 254) return true                      // link-local + cloud metadata
  if (a === 100 && b >= 64 && b <= 127) return true            // CGNAT 100.64.0.0/10
  if (a === 192 && b === 0) return true                        // 192.0.0.0/24, 192.0.2.0/24
  if (a >= 224) return true                                    // multicast + reserved
  return false
}

function ipv6Private(ip) {
  const v = ip.toLowerCase()
  if (v === '::1' || v === '::') return true
  if (v.startsWith('fc') || v.startsWith('fd')) return true    // unique local
  if (v.startsWith('fe80')) return true                        // link-local
  // IPv4-mapped (::ffff:127.0.0.1) — gömülü IPv4'ü kontrol et
  const mapped = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped) return ipv4Private(mapped[1])
  return false
}

export function isPrivateIp(ip) {
  const type = net.isIP(ip)
  if (type === 4) return ipv4Private(ip)
  if (type === 6) return ipv6Private(ip)
  return true // tanınmayan format → güvenli tarafta kal
}

export async function assertPublicUrl(urlString) {
  const url = new URL(urlString)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Yalnızca http ve https adresleri denetlenebilir.')
  }
  if (url.username || url.password) {
    throw new Error('Kullanıcı adı/şifre içeren adresler desteklenmiyor.')
  }

  const host = url.hostname.replace(/^\[|\]$/g, '')

  // Hostname doğrudan IP ise DNS'e gerek yok
  if (net.isIP(host)) {
    if (isPrivateIp(host)) throw new Error('Özel/iç ağ adresleri denetlenemez.')
    return url
  }

  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) {
    throw new Error('Özel/iç ağ adresleri denetlenemez.')
  }

  let records
  try {
    records = await dns.lookup(host, { all: true, verbatim: true })
  } catch {
    throw new Error('Alan adı çözümlenemedi. URL doğru mu kontrol edin.')
  }
  if (!records.length) throw new Error('Alan adı çözümlenemedi.')

  // TEK BİR IP bile özel aralıktaysa reddet (DNS rebinding riskini azaltır)
  for (const r of records) {
    if (isPrivateIp(r.address)) throw new Error('Özel/iç ağ adresleri denetlenemez.')
  }

  return url
}

/**
 * Yönlendirmeleri manuel takip eder ve HER adımda hedefi yeniden doğrular.
 * Ayrıca yanıtı maxBytes ile sınırlar (bellek tüketimi / zip bomb koruması).
 */
export async function safeFetchHtml(rawUrl, { timeoutMs = 8000, maxRedirects = 3, maxBytes = 2 * 1024 * 1024 } = {}) {
  let current = rawUrl
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    for (let hop = 0; hop <= maxRedirects; hop++) {
      const url = await assertPublicUrl(current)

      const response = await fetch(url.toString(), {
        signal: controller.signal,
        redirect: 'manual', // yönlendirmeyi biz yönetiyoruz ki her hop doğrulansın
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FatihSEOAuditBot/1.0; +https://fatihemincakiroglu.com)',
          'Accept': 'text/html,application/xhtml+xml',
        },
      })

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location')
        if (!location) throw new Error('Yönlendirme hedefi okunamadı.')
        if (hop === maxRedirects) throw new Error('Çok fazla yönlendirme var.')
        current = new URL(location, url).toString()
        continue
      }

      const contentType = response.headers.get('content-type') || ''
      if (contentType && !/text\/html|application\/xhtml/i.test(contentType)) {
        throw new Error('Adres bir HTML sayfası döndürmüyor.')
      }

      // Gövdeyi parça parça oku, sınırı aşarsa kes
      const reader = response.body?.getReader()
      let received = 0
      const chunks = []
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          received += value.length
          if (received > maxBytes) { await reader.cancel(); break }
          chunks.push(value)
        }
      }
      const buffer = Buffer.concat(chunks.map(c => Buffer.from(c)))

      return { html: buffer.toString('utf8'), status: response.status, finalUrl: url.toString(), bytes: received }
    }
    throw new Error('Çok fazla yönlendirme var.')
  } finally {
    clearTimeout(timer)
  }
}
