// UTM link oluşturucu - saf mantık. pages/araclar/utm-olusturucu.js kullanır.
//
// GA4 notları (Google Analytics yardım dokümanı):
// • utm_source ve utm_medium kampanya trafiğinin kaynağını ve aracını belirler; utm_campaign önerilir.
// • Değerler büyük/küçük harfe duyarlıdır: "Instagram" ile "instagram" ayrı kaynak sayılır.
// • Varsayılan kanal grubu (ör. Email, Organic Social, Paid Social) medium ve source değerine göre atanır.

export const ALANLAR = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content']

export const HAZIR = [
  { id: 'instagram-bio', tr: 'Instagram profil linki', en: 'Instagram bio link', source: 'instagram', medium: 'social' },
  { id: 'instagram-reklam', tr: 'Instagram reklamı', en: 'Instagram ad', source: 'instagram', medium: 'paid_social' },
  { id: 'facebook', tr: 'Facebook gönderisi', en: 'Facebook post', source: 'facebook', medium: 'social' },
  { id: 'linkedin', tr: 'LinkedIn gönderisi', en: 'LinkedIn post', source: 'linkedin', medium: 'social' },
  { id: 'whatsapp', tr: 'WhatsApp mesajı', en: 'WhatsApp message', source: 'whatsapp', medium: 'referral' },
  { id: 'bulten', tr: 'E-posta bülteni', en: 'Email newsletter', source: 'newsletter', medium: 'email' },
  { id: 'sms', tr: 'SMS kampanyası', en: 'SMS campaign', source: 'sms', medium: 'sms' },
  { id: 'qr', tr: 'QR kod (basılı)', en: 'QR code (print)', source: 'qr', medium: 'offline' },
]

// Medium değerinden GA4 varsayılan kanalının kabaca tahmini (kaynak listesine de bağlıdır, kesin değildir)
export function kanalTahmini(source, medium) {
  const m = (medium || '').toLowerCase()
  const s = (source || '').toLowerCase()
  const sosyal = /facebook|instagram|linkedin|twitter|x\.com|^x$|tiktok|pinterest|youtube|reddit|whatsapp|threads/.test(s)
  if (/^(email|e-mail|e_mail|e mail)$/.test(m) || /^(email|e-mail|e_mail|e mail)$/.test(s)) return 'Email'
  if (/^(.*cp.*|ppc|retargeting|paid.*)$/.test(m)) return sosyal ? 'Paid Social' : 'Paid Other / Paid Search'
  if (/^(social|social-network|social-media|sm|social network|social media)$/.test(m)) return 'Organic Social'
  if (/^(display|banner|expandable|interstitial|cpm)$/.test(m)) return 'Display'
  if (m === 'affiliate') return 'Affiliates'
  if (/^(referral|app|link)$/.test(m)) return 'Referral'
  if (m === 'sms' || s === 'sms') return 'SMS'
  if (m === 'audio') return 'Audio'
  if (m === 'organic') return 'Organic Search'
  return 'Unassigned'
}

const temizle = (v) => (v || '').trim()
// Dil bağımsız küçük harf: "Instagram" → "instagram" (tr-TR yerel ayarı I'yı ı yapardı), "İ" → "i"
const kucuk = (v) => v.replace(/İ/g, 'i').replace(/I/g, 'i').toLowerCase()
const TR_ASCII = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u' }

export function olustur(tabanUrl, degerler, { kucukHarf = true, bosluk = '-', ascii = true } = {}) {
  const hatalar = []
  const uyarilar = []
  const ham = temizle(tabanUrl)
  let u
  try {
    if (!/^https?:\/\//i.test(ham)) throw new Error('bicim')
    u = new URL(ham)
  } catch {
    hatalar.push('url')
    return { url: '', hatalar, uyarilar }
  }
  const d = {}
  for (const k of ALANLAR) {
    let v = temizle(degerler[k])
    if (!v) continue
    if (ascii) v = v.replace(/[çğıöşüÇĞİÖŞÜ]/g, ch => TR_ASCII[ch])
    if (v !== kucuk(v)) {
      if (kucukHarf) v = kucuk(v)
      else uyarilar.push({ kod: 'buyuk-harf', alan: k })
    }
    if (/\s/.test(v)) {
      if (bosluk) v = v.replace(/\s+/g, bosluk)
      else uyarilar.push({ kod: 'bosluk', alan: k })
    }
    if (/[çğıöşü]/i.test(v)) uyarilar.push({ kod: 'turkce', alan: k })
    d[k] = v
  }
  if (!d.utm_source) hatalar.push('source')
  if (!d.utm_medium) hatalar.push('medium')
  if (!d.utm_campaign) uyarilar.push({ kod: 'kampanya-yok' })
  const mevcut = ALANLAR.filter(k => u.searchParams.has(k))
  if (mevcut.length) uyarilar.push({ kod: 'mevcut-utm', alanlar: mevcut })
  if (u.searchParams.has('gclid') || /google/.test(d.utm_source || '') && /cpc|ppc|paid/.test(d.utm_medium || '')) uyarilar.push({ kod: 'google-ads' })
  for (const k of ALANLAR) if (d[k]) u.searchParams.set(k, d[k])
  // URLSearchParams boşluğu "+" yapar; GA4 her ikisini de çözer, ama %20 daha evrenseldir
  const url = u.toString().replace(/\+/g, '%20')
  return { url, degerler: d, hatalar, uyarilar, kanal: hatalar.length ? null : kanalTahmini(d.utm_source, d.utm_medium) }
}
