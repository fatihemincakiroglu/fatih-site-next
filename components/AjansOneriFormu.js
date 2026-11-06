import { useState } from 'react'
import Link from 'next/link'

// "Listeye eklenmesini önerdiğiniz bir ajans var mı?" formu (ajans listeleri).
// Öneriler /api/ajans-oneri üzerinden e-postayla gelir, sitede otomatik yayımlanmaz.
export default function AjansOneriFormu({ isEn = false, isMobile = false, sayfa = '' }) {
  const [f, setF] = useState({ ajans: '', siteUrl: '', neden: '', email: '', iliski: '', website: '' })
  const [durum, setDurum] = useState('bos') // bos | gonderiliyor | tamam | hata
  const t = isEn ? {
    baslik: 'Know an agency that should be on this list?',
    aciklama: 'Suggestions are reviewed by hand at the monthly update. Agencies are only added after their own website has been checked. Suggesting your own agency is fine, just say so.',
    ajans: 'Agency name', site: 'Website (https://...)', neden: 'Why should it be on the list? (services, sectors, region)', email: 'Your email (optional, for follow-up questions)',
    iliski: 'Your relationship with the agency', iliskiler: [['', 'Select'], ['musteri', 'Client'], ['calisan', 'Employee or owner'], ['diger', 'No relationship']],
    gonder: 'Send suggestion', gonderiliyor: 'Sending...', tamam: '✓ Thank you. Your suggestion has been received and will be reviewed at the next update.',
    hata: 'The suggestion could not be sent. Please check the fields or write via the', iletisim: 'contact page', iletisimHref: '/en/contact',
    not: 'Suggestions are not published automatically and there is no paid placement.', gizlilik: 'Privacy Policy', gizlilikHref: '/en/privacy',
  } : {
    baslik: 'Listeye eklenmesini önerdiğiniz bir ajans var mı?',
    aciklama: 'Öneriler aylık güncellemede tek tek incelenir. Bir ajans, yalnızca kendi web sitesi kontrol edildikten sonra listeye alınır. Kendi ajansınızı önermeniz de mümkün; lütfen bunu belirtin.',
    ajans: 'Ajans adı', site: 'Web sitesi (https://...)', neden: 'Neden listede olmalı? (hizmetler, sektörler, bölge)', email: 'E-posta adresiniz (isteğe bağlı, soru sormamız için)',
    iliski: 'Ajansla ilişkiniz', iliskiler: [['', 'Seçin'], ['musteri', 'Müşterisiyim'], ['calisan', 'Çalışanı veya sahibiyim'], ['diger', 'İlişkim yok']],
    gonder: 'Öneriyi gönder', gonderiliyor: 'Gönderiliyor...', tamam: '✓ Teşekkürler. Öneriniz alındı, bir sonraki güncellemede incelenecek.',
    hata: 'Öneri gönderilemedi. Alanları kontrol edin ya da', iletisim: 'iletişim sayfasından', iletisimHref: '/iletisim',
    not: 'Öneriler otomatik yayımlanmaz, ücretli listeleme yoktur.', gizlilik: 'Gizlilik Politikası', gizlilikHref: '/gizlilik',
  }
  const degis = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const gonder = async (e) => {
    e.preventDefault()
    if (f.ajans.trim().length < 2) { setDurum('hata'); return }
    setDurum('gonderiliyor')
    try {
      const r = await fetch('/api/ajans-oneri', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, sayfa }) })
      setDurum(r.ok ? 'tamam' : 'hata')
    } catch { setDurum('hata') }
  }
  const girdi = { width: '100%', padding: '11px 12px', border: '1px solid #e5e0da', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box' }
  return (
    <section aria-labelledby="ajans-oneri-baslik" style={{ margin: '36px 0 8px', background: '#faf9f7', border: '1px solid #f0ece6', borderRadius: '16px', padding: isMobile ? '18px' : '24px 26px' }}>
      <h2 id="ajans-oneri-baslik" style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '18px' : '20px', fontWeight: 800, color: '#111', margin: '0 0 6px' }}>{t.baslik}</h2>
      <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, margin: '0 0 16px' }}>{t.aciklama}</p>
      {durum === 'tamam' ? (
        <p role="status" style={{ fontSize: '14.5px', color: '#15803d', fontWeight: 600, margin: 0 }}>{t.tamam}</p>
      ) : (
        <form onSubmit={gonder} style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
          <input aria-label={t.ajans} placeholder={t.ajans} value={f.ajans} onChange={degis('ajans')} required maxLength={120} style={girdi} />
          <input aria-label={t.site} placeholder={t.site} value={f.siteUrl} onChange={degis('siteUrl')} type="url" maxLength={300} style={girdi} />
          <textarea aria-label={t.neden} placeholder={t.neden} value={f.neden} onChange={degis('neden')} rows={3} maxLength={1500} style={{ ...girdi, gridColumn: '1 / -1', resize: 'vertical' }} />
          <input aria-label={t.email} placeholder={t.email} value={f.email} onChange={degis('email')} type="email" maxLength={254} style={girdi} />
          <select aria-label={t.iliski} value={f.iliski} onChange={degis('iliski')} style={girdi}>
            {t.iliskiler.map(([v, l]) => <option key={v} value={v}>{v ? l : `${t.iliski}: ${l}`}</option>)}
          </select>
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={degis('website')} style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }} />
          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button type="submit" disabled={durum === 'gonderiliyor'} style={{ background: 'var(--orange)', color: '#fff', border: 0, borderRadius: '10px', padding: '11px 18px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              {durum === 'gonderiliyor' ? t.gonderiliyor : t.gonder}
            </button>
            <span style={{ fontSize: '12px', color: '#999' }}>{t.not} <Link href={t.gizlilikHref} style={{ color: '#999' }}>{t.gizlilik}</Link></span>
          </div>
          {durum === 'hata' && (
            <p role="alert" style={{ gridColumn: '1 / -1', fontSize: '13.5px', color: '#b91c1c', margin: 0 }}>{t.hata} <Link href={t.iletisimHref} style={{ color: '#b91c1c', fontWeight: 600 }}>{t.iletisim}</Link>{isEn ? '.' : ' yazın.'}</p>
          )}
        </form>
      )}
    </section>
  )
}
