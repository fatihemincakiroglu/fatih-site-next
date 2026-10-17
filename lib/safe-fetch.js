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
  if (a === 198 && (b === 18 || b === 19)) return true         // 198.18.0.0/15 (benchmark)
  if (a === 198 && b === 51) return true                       // 198.51.100.0/24 (TEST-NET-2)
  if (a === 203 && b === 0) return true                        // 203.0.113.0/24 (TEST-NET-3)
  if (a >= 224) return true                                    // multicast + reserved
  return false
}

// IPv6 adresini 8 adet 16 bitlik sayıya açar. "::" kısaltmasını ve sonda
// noktalı IPv4 yazımını (::ffff:1.2.3.4) destekler. Geçersizse null döner.
//
// NEDEN: WHATWG URL ayrıştırıcısı [::ffff:169.254.169.254] adresini
// "::ffff:a9fe:a9fe" biçimine çeviriyor. Eski kontrol yalnızca noktalı yazımı
// yakaladığı için bu adres (bulut metadata servisi) kontrolden geçiyordu.
// Metin karşılaştırması yerine adresi sayılara açıp aralık kontrolü yapıyoruz.
function expandIpv6(ip) {
  let v = ip.toLowerCase().split('%')[0] // zone id (fe80::1%eth0) at
  const v4 = v.match(/^(.*:)(\d+\.\d+\.\d+\.\d+)$/)
  if (v4) {
    const o = v4[2].split('.').map(Number)
    if (o.some(n => n > 255)) return null
    v = v4[1] + ((o[0] << 8) | o[1]).toString(16) + ':' + ((o[2] << 8) | o[3]).toString(16)
  }
  const parts = v.split('::')
  if (parts.length > 2) return null
  const head = parts[0] ? parts[0].split(':') : []
  const tail = parts.length === 2 && parts[1] ? parts[1].split(':') : []
  const fill = parts.length === 2 ? 8 - head.length - tail.length : 0
  if (fill < 0) return null
  const all = [...head, ...Array(fill).fill('0'), ...tail]
  if (all.length !== 8) return null
  const nums = all.map(h => (/^[0-9a-f]{1,4}$/.test(h) ? parseInt(h, 16) : NaN))
  return nums.some(Number.isNaN) ? null : nums
}

const v4FromWords = (hi, lo) => `${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`

function ipv6Private(ip) {
  const w = expandIpv6(ip)
  if (!w) return true // ayrıştırılamadı → güvenli tarafta kal
  const [w0, w1, w2, w3, w4, w5, w6, w7] = w
  const firstFiveZero = w0 === 0 && w1 === 0 && w2 === 0 && w3 === 0 && w4 === 0

  if (firstFiveZero && w5 === 0 && w6 === 0 && (w7 === 0 || w7 === 1)) return true // :: ve ::1
  if (firstFiveZero && w5 === 0xffff) return ipv4Private(v4FromWords(w6, w7))       // ::ffff:a.b.c.d (IPv4-mapped)
  if (firstFiveZero && w5 === 0) return ipv4Private(v4FromWords(w6, w7))            // ::a.b.c.d (IPv4-compatible, eski)
  if (w0 === 0x64 && w1 === 0xff9b) return ipv4Private(v4FromWords(w6, w7))         // 64:ff9b::/96 (NAT64)
  if (w0 === 0x2002) return ipv4Private(v4FromWords(w1, w2))                        // 2002::/16 (6to4)
  if ((w0 & 0xfe00) === 0xfc00) return true                                         // fc00::/7 unique local
  if ((w0 & 0xffc0) === 0xfe80) return true                                         // fe80::/10 link-local
  if ((w0 & 0xffc0) === 0xfec0) return true                                         // fec0::/10 site-local (eski)
  if ((w0 & 0xff00) === 0xff00) return true                                         // ff00::/8 multicast
  if (w0 === 0x2001 && w1 === 0x0db8) return true                                   // 2001:db8::/32 dokümantasyon
  if (w0 === 0x2001 && w1 === 0) return true                                        // 2001::/32 Teredo
  if (w0 === 0x0100 && w1 === 0 && w2 === 0 && w3 === 0) return true                // 100::/64 discard
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
