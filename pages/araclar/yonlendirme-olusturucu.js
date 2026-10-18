import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { FORMATLAR, satirlariOku, analizEt, uret } from '../../lib/yonlendirme-uretici'

// 301 yönlendirme oluşturucu — tamamen tarayıcıda çalışır.
// TR: /araclar/yonlendirme-olusturucu   EN: /en/tools/redirect-generator

const ORNEK = `/eski-hakkimizda\t/hakkimda
/urun.php?id=12\t/urunler/mavi-gomlek
/blog/2019/seo-ipuclari\t/blog/seo-ipuclari
https://eskisite.com/iletisim\thttps://yenisite.com/iletisim`

export default function YonlendirmeOlusturucu(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [metin, setMetin] = useState(ORNEK)
  const [format, setFormat] = useState('apache')
  const [kod, setKod] = useState(301)
  const [zincirCoz, setZincirCoz] = useState(true)
  const [kopyalandi, setKopyalandi] = useState(false)

  const { ciftler, hatalar } = useMemo(() => satirlariOku(metin), [metin])
  const { kurallar, uyarilar } = useMemo(() => analizEt(ciftler, { zincirCoz }), [ciftler, zincirCoz])
  const cikti = useMemo(() => uret(kurallar, format, { kod }), [kurallar, format, kod])
  const dosyaAdi = FORMATLAR.find(f => f.id === format)?.dosya || 'redirects.txt'

  const mesaj = (u) => {
    const s = `${t('Satır', 'Line')} ${u.satir}: `
    switch (u.kod) {
      case 'eksik': return s + t(`Eski ve yeni adres bulunamadı ("${u.metin}"). Her satırda iki adres olmalı.`, `Couldn't find both URLs ("${u.metin}"). Each line needs two URLs.`)
      case 'kendine': return s + t(`${u.eski} kendisine yönleniyor; atlandı.`, `${u.eski} redirects to itself; skipped.`)
      case 'tekrar': return s + t(`${u.eski} ${u.onceki}. satırda zaten var; atlandı.`, `${u.eski} already appears on line ${u.onceki}; skipped.`)
      case 'celiski': return s + t(`${u.eski} ${u.onceki}. satırda farklı bir hedefe yönleniyor. İlk kural kullanıldı.`, `${u.eski} points to a different target on line ${u.onceki}. The first rule was kept.`)
      case 'zincir': return s + t(`${u.eski} zincir oluşturuyor (nihai hedef: ${u.nihai}). Zincirleri çözme seçeneğini açın.`, `${u.eski} creates a chain (final target: ${u.nihai}). Turn on chain resolution.`)
      case 'zincir-cozuldu': return s + t(`${u.eski} zinciri çözüldü; doğrudan ${u.nihai} adresine yönlendirildi.`, `${u.eski} chain resolved; now points directly to ${u.nihai}.`)
      case 'dongu': return s + t(`${u.eski} bir yönlendirme döngüsünün parçası; çıktıya eklenmedi.`, `${u.eski} is part of a redirect loop; left out.`)
      default: return s + u.kod
    }
  }
  const tumUyarilar = [...hatalar.map(h => ({ ...h, kod: 'eksik' })), ...uyarilar].sort((a, b) => a.satir - b.satir)

  const kopyala = async () => { try { await navigator.clipboard.writeText(cikti); setKopyalandi(true); setTimeout(() => setKopyalandi(false), 2000) } catch {} }
  const indir = () => {
    const blob = new Blob([cikti], { type: format === 'vercel' ? 'application/json' : 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob); a.download = dosyaAdi
    document.body.appendChild(a); a.click(); a.remove()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  const icerik = isEn ? {
    baslik: '301 Redirect Generator',
    metaBaslik: '301 Redirect Generator: htaccess, Nginx, Vercel',
    metaDesc: 'Paste old and new URLs to generate 301 redirect rules for Apache .htaccess, Nginx, Vercel, Next.js and Netlify. Detects chains, loops and duplicates.',
    giris: 'Paste your old and new URLs, pick your server, and copy ready-to-use 301 rules. The tool flags duplicates, chains and loops before they reach production. For the full process, see the [site migration SEO guide](/en/guides/site-tasima-seo).',
    adimlar: [
      'Put one redirect per line: old URL first, new URL second. Copying two columns from Excel or Google Sheets works as-is.',
      'Choose your server or platform. If you are unsure, ask your developer or hosting provider.',
      'Review the warnings. Keep **resolve chains** on so every old URL points straight to its final destination.',
      'Copy or download the rules, test them on a staging environment, then check a sample of old URLs after go-live.',
    ],
    sss: [
      { s: '301 or 302: which should I use?', c: 'Use 301 (permanent) when a page has moved for good, as in a migration. Use 302 only for genuinely temporary moves.' },
      { s: 'Why are redirect chains a problem?', c: 'Every extra hop slows users down and makes it harder for search engines to follow the move. Pointing each old URL directly to its final target is the safest approach.' },
      { s: 'Can I redirect URLs with query strings?', c: 'Yes. The tool adds a query condition for Apache, matches the full request for Nginx and uses a has condition for Vercel and Next.js. Always test these rules after deployment.' },
      { s: 'Is my URL list stored anywhere?', c: 'No. Everything runs in your browser; nothing is sent to a server.' },
    ],
  } : {
    baslik: '301 Yönlendirme Oluşturucu',
    metaBaslik: '301 Yönlendirme Oluşturucu: htaccess, Nginx, Vercel',
    metaDesc: 'Eski ve yeni URL listesini yapıştırın; Apache .htaccess, Nginx, Vercel, Next.js ve Netlify için 301 kuralları üretin. Zincir, döngü ve tekrarları yakalar.',
    giris: 'Eski ve yeni adresleri yapıştırın, sunucunuzu seçin ve kullanıma hazır 301 kurallarını kopyalayın. Araç tekrarları, zincirleri ve döngüleri canlıya çıkmadan yakalar. Sürecin tamamı için [site taşıma SEO rehberine](/rehber/site-tasima-seo) bakın.',
    adimlar: [
      'Her satıra bir yönlendirme yazın: önce eski, sonra yeni adres. Excel veya Google E-Tablolar\'dan iki sütunu kopyalayıp yapıştırmanız yeterli.',
      'Sunucunuzu veya platformunuzu seçin. Emin değilseniz geliştiricinize ya da hosting firmanıza sorun.',
      'Uyarıları kontrol edin. Her eski adresin doğrudan nihai hedefe gitmesi için **zincirleri çöz** seçeneğini açık tutun.',
      'Kuralları kopyalayın veya indirin, önce test ortamında deneyin; yayından sonra eski adreslerden bir örneklemi kontrol edin.',
    ],
    sss: [
      { s: '301 mi 302 mi kullanmalıyım?', c: 'Sayfa kalıcı olarak taşındıysa, örneğin bir site taşımasında, 301 (kalıcı) kullanın. 302 yalnızca gerçekten geçici taşımalar içindir.' },
      { s: 'Yönlendirme zinciri neden sorun?', c: 'Her ek adım kullanıcıyı yavaşlatır ve arama motorlarının taşımayı izlemesini zorlaştırır. Her eski adresi doğrudan nihai hedefe yönlendirmek en güvenli yoldur.' },
      { s: 'Sorgu parametreli (?id=12) adresleri yönlendirebilir miyim?', c: 'Evet. Araç Apache için sorgu koşulu ekler, Nginx\'te isteğin tamamını eşleştirir, Vercel ve Next.js için has koşulu kullanır. Bu kuralları yayından sonra mutlaka test edin.' },
      { s: 'URL listem bir yere kaydediliyor mu?', c: 'Hayır. Her şey tarayıcınızda çalışır; hiçbir veri sunucuya gönderilmez.' },
    ],
  }

  return (
    <AracSayfa isEn={isEn} yol="/araclar/yonlendirme-olusturucu" yolEn="/en/tools/redirect-generator"
      baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc} giris={icerik.giris}
      adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['site-tasima-seo', 'teknik-seo', 'seo-raporlama']}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: '14px', minWidth: 0 }}>
          <div>
            <label htmlFor="y-liste" style={F.etiket}>{t('Eski ve yeni adresler (her satıra bir çift)', 'Old and new URLs (one pair per line)')}</label>
            <textarea id="y-liste" rows={12} value={metin} onChange={e => setMetin(e.target.value)} spellCheck={false}
              style={{ ...F.girdi, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: '13px', resize: 'vertical' }} />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
              {t('Ayırıcı olarak sekme, virgül, noktalı virgül veya boşluk kullanılabilir. # ile başlayan satırlar yok sayılır.', 'Tab, comma, semicolon or space can separate the URLs. Lines starting with # are ignored.')}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            <div>
              <label htmlFor="y-format" style={F.etiket}>{t('Sunucu / platform', 'Server / platform')}</label>
              <select id="y-format" value={format} onChange={e => setFormat(e.target.value)} style={F.girdi}>
                {FORMATLAR.map(f => <option key={f.id} value={f.id}>{f.ad}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="y-kod" style={F.etiket}>{t('Durum kodu', 'Status code')}</label>
              <select id="y-kod" value={kod} onChange={e => setKod(Number(e.target.value))} style={F.girdi}>
                <option value={301}>{t('301 — kalıcı', '301 — permanent')}</option>
                <option value={302}>{t('302 — geçici', '302 — temporary')}</option>
              </select>
            </div>
          </div>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px', color: '#444', cursor: 'pointer' }}>
            <input type="checkbox" checked={zincirCoz} onChange={e => setZincirCoz(e.target.checked)} />
            {t('Zincirleri çöz (her eski adresi doğrudan nihai hedefe yönlendir)', 'Resolve chains (point every old URL to its final target)')}
          </label>
          <div style={{ fontSize: '13px', color: '#666' }}>
            {t(`${kurallar.length} kural üretildi`, `${kurallar.length} rules generated`)}{tumUyarilar.length ? ` · ${tumUyarilar.length} ${t('uyarı', 'warnings')}` : ''}
          </div>
          {tumUyarilar.length > 0 && (
            <ul style={{ margin: 0, padding: '12px 14px 12px 30px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', color: '#92400e', fontSize: '13px', lineHeight: 1.6, maxHeight: '220px', overflowY: 'auto' }}>
              {tumUyarilar.map((u, i) => <li key={i}>{mesaj(u)}</li>)}
            </ul>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <strong style={{ fontSize: '14px', color: '#111' }}>{dosyaAdi}</strong>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={indir} style={F.ikincil} disabled={!kurallar.length}>{t('İndir', 'Download')}</button>
              <button type="button" onClick={kopyala} style={F.buton} disabled={!kurallar.length}>{kopyalandi ? t('Kopyalandı ✓', 'Copied ✓') : t('Kopyala', 'Copy')}</button>
            </div>
          </div>
          <pre style={F.kod} aria-live="polite"><code>{cikti}</code></pre>
          <p style={{ fontSize: '12.5px', color: '#888', lineHeight: 1.6, marginTop: '10px' }}>
            {t('Kuralları canlı sunucuya eklemeden önce test ortamında deneyin. Mevcut kurallarınızla çakışma olup olmadığını kontrol edin.', 'Test the rules on a staging environment before going live, and check for conflicts with your existing rules.')}
          </p>
        </div>
      </div>
    </AracSayfa>
  )
}
