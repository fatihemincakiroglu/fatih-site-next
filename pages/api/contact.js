// İletişim formu — Google Workspace (Gmail SMTP) üzerinden e-posta gönderir.
//
// Gerekli ortam değişkenleri (.env.local veya hosting sağlayıcınızın
// "Environment Variables" ayarları içinde tanımlanmalı):
//
//   GMAIL_USER            -> Gönderen Workspace adresi, örn: info@fatihemincakiroglu.com
//   GMAIL_APP_PASSWORD    -> Bu hesap için oluşturulmuş 16 haneli "Uygulama Şifresi"
//   CONTACT_TO_EMAIL      -> (opsiyonel) Mesajların iletileceği adres.
//                            Boş bırakılırsa info@fatihemincakiroglu.com kullanılır.
//
// Uygulama şifresi nasıl alınır (Google Workspace hesabı için):
//   1) myaccount.google.com/security -> "2 Adımlı Doğrulama" aktif olmalı.
//   2) Aynı sayfada "Uygulama Şifreleri" (App passwords) bölümüne girin.
//   3) "Diğer (Özel ad)" seçip örn. "Website Formu" yazıp oluşturun.
//   4) Üretilen 16 haneli şifreyi GMAIL_APP_PASSWORD olarak kaydedin
//      (normal Google şifreniz DEĞİL).
//   Not: Workspace yöneticiniz "Daha az güvenli uygulamalar / App Passwords"
//   özelliğini kapatmışsa, Admin Console > Güvenlik > Kimlik Doğrulama
//   bölümünden bu özelliği açması gerekir.

import nodemailer from 'nodemailer'
import { rateLimit, getClientIp } from '../../lib/rate-limit'

// E-posta BAŞLIKLARINA (from / replyTo / subject) giren kullanıcı verisinden
// satır sonlarını ve tırnakları temizler. Aksi hâlde isim alanına \r\n
// koyan biri kendi başlığını ekleyebilir (header injection) — nodemailer'ın
// CRLF açıklarının kaynağı da buydu. Uzunluk da sınırlanıyor.
function sanitizeHeader(str = '', max = 100) {
  return String(str)
    .replace(/[\r\n\t]/g, ' ')
    .replace(/["<>]/g, '')
    .trim()
    .slice(0, max)
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const limited = rateLimit(`contact:${getClientIp(req)}`, { limit: 5, windowMs: 10 * 60_000 })
  if (!limited.ok) {
    res.setHeader('Retry-After', String(limited.retryAfter))
    return res.status(429).json({ error: 'Çok fazla mesaj gönderdiniz. Lütfen biraz sonra tekrar deneyin.' })
  }

  const { isim, email, telefon, konu, mesaj, website } = req.body || {}

  // Honeypot: bu alan normal kullanıcılara görünmez (bkz. iletisim.js).
  // Bir bot bunu doldurursa sessizce başarı döneriz, mail göndermeyiz.
  if (website) {
    return res.status(200).json({ ok: true })
  }

  if (!isim || !email || !mesaj) {
    return res.status(400).json({ error: 'Ad, e-posta ve mesaj alanları zorunludur.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Geçerli bir e-posta adresi girin.' })
  }
  // Alan uzunlukları: aşırı büyük gövdelerle kaynak tüketimini engeller.
  if (String(isim).length > 100 || String(konu || '').length > 150 || String(mesaj).length > 5000) {
    return res.status(400).json({ error: 'Girdiğiniz metin çok uzun.' })
  }
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Contact form: GMAIL_USER / GMAIL_APP_PASSWORD ortam değişkenleri tanımlı değil.')
    return res.status(500).json({ error: 'E-posta servisi henüz yapılandırılmadı. Lütfen daha sonra tekrar deneyin.' })
  }

  const toAddress = process.env.CONTACT_TO_EMAIL || 'info@fatihemincakiroglu.com'

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"${sanitizeHeader(isim)} (Web Sitesi Formu)" <${process.env.GMAIL_USER}>`,
      to: toAddress,
      replyTo: `"${sanitizeHeader(isim)}" <${sanitizeHeader(email, 254)}>`,
      subject: sanitizeHeader(`[İletişim Formu] ${konu ? konu : 'Yeni Mesaj'} — ${isim}`, 200),
      text: `Ad Soyad: ${isim}\nE-posta: ${email}\nTelefon: ${telefon || '-'}\nKonu: ${konu || '-'}\n\nMesaj:\n${mesaj}`,
      html: `
        <div style="font-family: -apple-system, Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.6;">
          <h2 style="color:#e8560a; margin-bottom: 16px;">Yeni İletişim Formu Mesajı</h2>
          <p><strong>Ad Soyad:</strong> ${escapeHtml(isim)}</p>
          <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefon:</strong> ${escapeHtml(telefon || '-')}</p>
          <p><strong>Konu:</strong> ${escapeHtml(konu || '-')}</p>
          <p><strong>Mesaj:</strong></p>
          <p style="white-space: pre-wrap; background:#f8f7f5; padding:12px 16px; border-radius:8px; border:1px solid #eee;">${escapeHtml(mesaj)}</p>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form email error:', err)
    return res.status(502).json({ error: 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta gönderin.' })
  }
}
