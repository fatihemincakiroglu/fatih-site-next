// "Ücretsiz PDF" formu (components/LeadMagnet.js) buraya gönderir.
//
// Önceden e-posta yalnızca ziyaretçinin kendi tarayıcısına (localStorage)
// yazılıyordu; size hiçbir şey ulaşmıyordu. Artık her kayıt, iletişim formuyla
// aynı Gmail/Workspace hesabı üzerinden size e-posta olarak iletiliyor.
//
// Ortam değişkenleri iletişim formuyla aynıdır (bkz. pages/api/contact.js):
//   GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL (opsiyonel)
//   LEAD_TO_EMAIL (opsiyonel) → PDF kayıtlarını farklı bir adrese yönlendirmek için.
//
// İleride Brevo / Mailchimp gibi bir listeye eklemek isterseniz, sendMail'in
// yanına o servisin API çağrısını ekleyebilirsiniz.

import nodemailer from 'nodemailer'
import { rateLimit, getClientIp } from '../../lib/rate-limit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(str = '', max = 254) {
  return String(str).replace(/[\r\n\t"<>]/g, '').trim().slice(0, max)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const limited = rateLimit(`lead:${getClientIp(req)}`, { limit: 5, windowMs: 10 * 60_000 })
  if (!limited.ok) {
    res.setHeader('Retry-After', String(limited.retryAfter))
    return res.status(429).json({ error: 'too_many' })
  }

  const { email, kaynak, website } = req.body || {}

  // Honeypot: gerçek kullanıcı bu alanı göremez; dolduran bottur.
  if (website) return res.status(200).json({ ok: true })

  const adres = clean(email)
  if (!adres || !EMAIL_RE.test(adres)) {
    return res.status(400).json({ error: 'invalid_email' })
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Lead form: GMAIL_USER / GMAIL_APP_PASSWORD ortam değişkenleri tanımlı değil.')
    return res.status(500).json({ error: 'not_configured' })
  }

  const to = process.env.LEAD_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'info@fatihemincakiroglu.com'
  const sayfa = clean(kaynak, 200) || '-'

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    await transporter.sendMail({
      from: `"Web Sitesi — PDF Kaydı" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: adres,
      subject: `[PDF Kaydı] Teknik SEO Kontrol Listesi — ${adres}`,
      text: `Yeni PDF kaydı\n\nE-posta: ${adres}\nSayfa: ${sayfa}\nTarih: ${new Date().toISOString()}`,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Lead form email error:', err)
    return res.status(502).json({ error: 'send_failed' })
  }
}
