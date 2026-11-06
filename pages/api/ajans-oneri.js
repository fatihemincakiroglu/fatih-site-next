// Ajans listelerindeki "Listeye eklenmesini önerdiğiniz bir ajans var mı?" formu
// (components/AjansOneriFormu.js) buraya gönderir. Öneri size e-posta olarak iletilir;
// sitede otomatik yayımlanmaz (yorum sistemi yok, spam ve sahte yorum riski yok).
// Ortam değişkenleri iletişim formuyla aynıdır: GMAIL_USER, GMAIL_APP_PASSWORD,
// CONTACT_TO_EMAIL (opsiyonel), LEAD_TO_EMAIL (opsiyonel).
import nodemailer from 'nodemailer'
import { rateLimit, getClientIp } from '../../lib/rate-limit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const clean = (str = '', max = 254) => String(str).replace(/[\r\n\t"<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const limited = rateLimit(`ajans-oneri:${getClientIp(req)}`, { limit: 3, windowMs: 30 * 60_000 })
  if (!limited.ok) {
    res.setHeader('Retry-After', String(limited.retryAfter))
    return res.status(429).json({ error: 'too_many' })
  }

  const { ajans, siteUrl, neden, email, sayfa, website, iliski } = req.body || {}
  if (website) return res.status(200).json({ ok: true }) // honeypot

  const ad = clean(ajans, 120)
  const url = clean(siteUrl, 300)
  const gerekce = clean(neden, 1500)
  const posta = clean(email)
  if (ad.length < 2) return res.status(400).json({ error: 'missing_name' })
  if (url && !/^https?:\/\/[^\s/]+\.[^\s]+$/i.test(url)) return res.status(400).json({ error: 'invalid_url' })
  if (posta && !EMAIL_RE.test(posta)) return res.status(400).json({ error: 'invalid_email' })

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Ajans önerisi: GMAIL_USER / GMAIL_APP_PASSWORD tanımlı değil.')
    return res.status(500).json({ error: 'not_configured' })
  }
  const to = process.env.LEAD_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'info@fatihemincakiroglu.com'
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', port: 465, secure: true,
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })
    await transporter.sendMail({
      from: `"Web Sitesi - Ajans Önerisi" <${process.env.GMAIL_USER}>`,
      to,
      ...(posta ? { replyTo: posta } : {}),
      subject: `[Ajans Önerisi] ${ad}`,
      text: `Yeni ajans önerisi\n\nAjans: ${ad}\nWeb sitesi: ${url || '-'}\nÖneren ile ajans ilişkisi: ${clean(iliski, 40) || '-'}\nNeden: ${gerekce || '-'}\nE-posta: ${posta || '-'}\nSayfa: ${clean(sayfa, 200) || '-'}\nTarih: ${new Date().toISOString()}`,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Ajans önerisi e-posta hatası:', err)
    return res.status(502).json({ error: 'send_failed' })
  }
}
