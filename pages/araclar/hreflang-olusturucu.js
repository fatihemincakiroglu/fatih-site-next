import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { analizEt, uret, sutunOku, satirOku } from '../../lib/hreflang-uretici'

// hreflang oluşturucu — tamamen tarayıcıda çalışır.
// TR: /hreflang-olusturucu   EN: /en/hreflang-generator

const ORNEK_SUTUN = 'tr, en, de-DE, x-default'
const ORNEK_SATIR = `https://www.ornek.com/\thttps://www.ornek.com/en/\thttps://www.ornek.com/de/\thttps://www.ornek.com/
https://www.ornek.com/hakkimizda\thttps://www.ornek.com/en/about\thttps://www.ornek.com/de/uber-uns\thttps://www.ornek.com/hakkimizda
https://www.ornek.com/iletisim\thttps://www.ornek.com/en/contact\t\thttps://www.ornek.com/iletisim`

const FORMATLAR = [
  { id: 'html', tr: 'HTML <link> etiketleri', en: 'HTML <link> tags', dosya: 'hreflang.html' },
  { id: 'xml', tr: 'XML site haritası', en: 'XML sitemap', dosya: 'sitemap-hreflang.xml' },
  { id: 'http', tr: 'HTTP Link başlığı', en: 'HTTP Link header', dosya: 'hreflang-headers.txt' },
]

export default function HreflangOlusturucu(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [sutunMetni, setSutunMetni] = useState(ORNEK_SUTUN)
  const [satirMetni, setSatirMetni] = useState(ORNEK_SATIR)
  const [format, setFormat] = useState('html')
  const [kopyalandi, setKopyalandi] = useState(false)

  const sutunHam = useMemo(() => sutunOku(sutunMetni), [sutunMetni])
  const satirlar = useMemo(() => satirOku(satirMetni, sutunHam.length), [satirMetni, sutunHam.length])
  const analiz = useMemo(() => analizEt(sutunHam, satirlar), [sutunHam, satirlar])
  const cikti = useMemo(() => (analiz.hatalar.length ? '' : uret(analiz.gruplar, format, { isEn })), [analiz, format, isEn])
  const dosyaAdi = FORMATLAR.find(f => f.id === format).dosya

  const hataMetni = (h) => {
    const yer = h.satir ? `${t('Satır', 'Row')} ${h.satir}${h.sutun ? `, ${t('sütun', 'column')} ${h.sutun}` : ''}: ` : h.sutun ? `${t('Sütun', 'Column')} ${h.sutun}: ` : ''
    switch (h.kod) {
      case 'bos': return yer + t('Dil kodu boş.', 'Empty language code.')
      case 'yaygin-hata': return yer + t(`"${h.ham}" geçerli bir kod değil.`, `"${h.ham}" is not a valid code.`) + (h.oneri ? t(` Doğrusu: "${h.oneri}".`, ` Use "${h.oneri}".`) : '')
      case 'bolge-desteklenmiyor': return yer + t(`"${h.ham}": EU ve 419 gibi bölge grupları hreflang'de desteklenmez; ülke kodu kullanın.`, `"${h.ham}": regional groupings such as EU or 419 are not supported; use a country code.`)
      case 'yalniz-bolge': return yer + t(`"${h.ham}" bir ülke kodu; hreflang'de bölge tek başına kullanılamaz, önce dil gelir (ör. de-DE).`, `"${h.ham}" is a country code; a region cannot be used alone, the language comes first (e.g. de-DE).`)
      case 'dil': return yer + t(`"${h.ham}" geçerli bir ISO 639-1 dil kodu değil.`, `"${h.ham}" is not a valid ISO 639-1 language code.`)
      case 'bolge': return yer + t(`"${h.ham}": bölge kısmı geçerli bir ISO 3166-1 ülke kodu değil.`, `"${h.ham}": the region is not a valid ISO 3166-1 country code.`)
      case 'bicim': return yer + t(`"${h.ham}" biçimi hatalı; "dil" ya da "dil-BÖLGE" yazın.`, `"${h.ham}" is malformed; use "language" or "language-REGION".`)
      case 'tekrar-kod': return t(`"${h.ham}" kodu birden fazla sütunda var.`, `The code "${h.ham}" appears in more than one column.`)
      case 'goreli-url': return yer + t(`"${h.ham}" tam adres değil; https:// ile başlayan tam URL yazın.`, `"${h.ham}" is not absolute; use a full URL starting with https://.`)
      case 'tekrar-url': return yer + t(`${h.ham} aynı grupta iki farklı dil için kullanılmış.`, `${h.ham} is used for two different languages in the same group.`)
      default: return yer + h.kod
    }
  }
  const uyariMetni = (u) => {
    switch (u.kod) {
      case 'x-default-yok': return t('x-default sütunu yok. Zorunlu değil ama dil seçici ya da varsayılan bir sayfanız varsa eklemeniz önerilir.', 'No x-default column. It is optional, but recommended if you have a language selector or default page.')
      case 'genel-dil-yok': return t(`"${u.ornek}" gibi bölgeli sürümler var ama genel "${u.dil}" sürümü yok. Diğer ülkelerdeki ${u.dil} kullanıcıları için bir sürümü genel "${u.dil}" olarak da işaretlemeyi düşünün.`, `You have regional versions like "${u.ornek}" but no generic "${u.dil}". Consider also marking one version as plain "${u.dil}" for speakers in other countries.`)
      case 'tek-surum': return `${t('Satır', 'Row')} ${u.satir}: ${t('yalnızca tek dil sürümü var; hreflang için en az iki sürüm gerekir.', 'only one language version; hreflang needs at least two.')}`
      default: return u.kod
    }
  }

  const kopyala = async () => { try { await navigator.clipboard.writeText(cikti); setKopyalandi(true); setTimeout(() => setKopyalandi(false), 2000) } catch {} }
  const indir = () => {
    const blob = new Blob([cikti], { type: format === 'xml' ? 'application/xml' : 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob); a.download = dosyaAdi
    document.body.appendChild(a); a.click(); a.remove()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  const icerik = isEn ? {
    baslik: 'hreflang Generator',
    metaBaslik: 'hreflang Tag Generator | Free SEO Tool',
    metaDesc: 'Generate valid hreflang tags for multilingual sites as HTML link tags, an XML sitemap or HTTP headers. Language, region and x-default are checked.',
    giris: 'List your language codes and the URL of each page in every language. The tool checks the codes against ISO standards, makes every version list all the others (reciprocity), and outputs the format you need. Background: the [international SEO and hreflang article](/en/hreflang-uluslararasi-seo).',
    adimlar: [
      'In the first box, write the language codes in column order, e.g. "tr, en, de-DE, x-default". Use a language code (ISO 639-1) with an optional country code (ISO 3166-1), never a country on its own.',
      'In the second box, put one page per row and its language versions in the same column order. Copying columns from Excel or Google Sheets works as-is (tab-separated). Leave a cell empty if a page has no version in that language.',
      'Fix any red errors. Pick the output format: HTML tags for each page\'s <head>, an XML sitemap, or HTTP headers for PDFs and other non-HTML files. Use only one method per site.',
      'After publishing, check a few pages in the source code and watch Search Console for errors.',
    ],
    sss: [
      { s: 'Which method should I use: HTML, sitemap or HTTP header?', c: 'Google treats all three as equivalent. HTML tags are easiest on small sites; a sitemap is easier to manage on large sites because it keeps the markup out of page templates. HTTP headers are for non-HTML files such as PDFs. Use one method consistently.' },
      { s: 'What is x-default for?', c: 'x-default marks the page to show users whose language or region does not match any of your versions, typically a language selector or your main international page. It is optional but recommended.' },
      { s: 'Why do I get "en-UK is not valid"?', c: 'The ISO code for the United Kingdom is GB, so the correct value is en-GB. Similarly, EU is not a country code, and JP, CN and KR are country codes, not language codes (ja, zh and ko are).' },
      { s: 'Does hreflang need canonical tags too?', c: 'Yes, each language version should have a self-referencing canonical pointing to itself, not to another language. Pointing all versions to one canonical tells Google they are duplicates. The [technical SEO guide](/en/teknik-seo) covers canonicals.' },
    ],
  } : {
    baslik: 'hreflang Oluşturucu',
    metaBaslik: 'hreflang Etiketi Oluşturucu | Ücretsiz SEO Aracı',
    metaDesc: 'Çok dilli siteniz için hreflang etiketlerini HTML, XML site haritası ya da HTTP başlığı olarak üretin. Dil, bölge kodu ve x-default denetlenir.',
    giris: 'Dil kodlarınızı ve her sayfanın dil sürümlerinin adreslerini girin. Araç kodları ISO standartlarına göre kontrol eder, her sürümün diğerlerini listelemesini (karşılıklılık) sağlar ve ihtiyacınız olan biçimde çıktı verir. Arka plan için [uluslararası SEO ve hreflang yazısı](/hreflang-uluslararasi-seo).',
    adimlar: [
      'İlk kutuya dil kodlarını sütun sırasıyla yazın, ör. "tr, en, de-DE, x-default". Dil kodu (ISO 639-1) ve isteğe bağlı ülke kodu (ISO 3166-1) kullanın; ülke kodu tek başına kullanılamaz.',
      'İkinci kutuya her satıra bir sayfa, sütunlara aynı sırayla o sayfanın dil sürümlerini yazın. Excel ya da Google E-Tablolar\'dan sütun kopyalayıp yapıştırabilirsiniz (sekmeyle ayrılmış). Bir sayfanın o dilde sürümü yoksa hücreyi boş bırakın.',
      'Kırmızı hataları düzeltin. Çıktı biçimini seçin: her sayfanın <head> bölümü için HTML etiketleri, XML site haritası ya da PDF gibi HTML olmayan dosyalar için HTTP başlığı. Sitede tek bir yöntem kullanın.',
      'Yayından sonra birkaç sayfanın kaynak kodunu kontrol edin ve Search Console\'da hata olup olmadığını izleyin.',
    ],
    sss: [
      { s: 'Hangi yöntemi kullanmalıyım: HTML, site haritası, HTTP başlığı?', c: 'Google üçünü de eşdeğer kabul eder. Küçük sitelerde HTML etiketleri en kolayıdır; büyük sitelerde site haritası yönetimi kolaylaştırır çünkü işaretleme sayfa şablonlarına girmez. HTTP başlığı PDF gibi HTML olmayan dosyalar içindir. Tek yöntemi tutarlı kullanın.' },
      { s: 'x-default ne işe yarar?', c: 'x-default, dili ya da bölgesi sürümlerinizden hiçbiriyle eşleşmeyen kullanıcılara gösterilecek sayfayı belirtir; genellikle dil seçici ya da ana uluslararası sayfadır. Zorunlu değildir ama önerilir.' },
      { s: '"en-UK geçerli değil" uyarısı neden çıkıyor?', c: 'Birleşik Krallık\'ın ISO kodu GB\'dir; doğru değer en-GB. Benzer şekilde EU bir ülke kodu değildir; JP, CN ve KR ülke kodudur, dil kodları ja, zh ve ko\'dur.' },
      { s: 'hreflang ile birlikte canonical da gerekir mi?', c: 'Evet. Her dil sürümünün canonical etiketi kendisini göstermeli, başka bir dili değil. Tüm sürümleri tek bir canonical\'a bağlamak Google\'a bunların kopya olduğunu söyler. Canonical ayrıntısı [teknik SEO rehberinde](/teknik-seo).' },
    ],
  }

  return (
    <AracSayfa isEn={isEn} yol="/hreflang-olusturucu" yolEn="/en/hreflang-generator" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['teknik-seo', 'site-tasima-seo', 'e-ticaret-seo']}>
      <div style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label htmlFor="hl-sutun" style={F.etiket}>{t('Dil kodları (sütun sırasıyla)', 'Language codes (in column order)')}</label>
          <input id="hl-sutun" value={sutunMetni} onChange={e => setSutunMetni(e.target.value)} spellCheck={false} style={{ ...F.girdi, fontFamily: 'ui-monospace, Menlo, Consolas, monospace' }} />
        </div>
        <div>
          <label htmlFor="hl-satir" style={F.etiket}>{t('Sayfalar: her satıra bir sayfa, sütunlar yukarıdaki sırayla', 'Pages: one per row, columns in the order above')}</label>
          <textarea id="hl-satir" value={satirMetni} onChange={e => setSatirMetni(e.target.value)} spellCheck={false} rows={7}
            style={{ ...F.girdi, fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: '13px', lineHeight: 1.6, resize: 'vertical', whiteSpace: 'pre', overflowX: 'auto' }} />
        </div>

        {analiz.hatalar.length > 0 && (
          <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ fontWeight: 800, color: '#b91c1c', fontSize: '14px', marginBottom: '6px' }}>{t('Düzeltilmesi gerekenler', 'Fix these first')} ({analiz.hatalar.length})</div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#444', lineHeight: 1.7 }}>{analiz.hatalar.map((h, i) => <li key={i}>{hataMetni(h)}</li>)}</ul>
          </div>
        )}
        {analiz.uyarilar.length > 0 && (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px 14px' }}>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#444', lineHeight: 1.7 }}>{analiz.uyarilar.map((u, i) => <li key={i}>{uyariMetni(u)}</li>)}</ul>
          </div>
        )}

        <div role="radiogroup" aria-label={t('Çıktı biçimi', 'Output format')} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {FORMATLAR.map(f => (
            <button key={f.id} type="button" role="radio" aria-checked={format === f.id} onClick={() => setFormat(f.id)}
              style={{ ...F.ikincil, ...(format === f.id ? { background: 'var(--orange)', color: '#fff', borderColor: 'var(--orange)' } : {}) }}>
              {isEn ? f.en : f.tr}
            </button>
          ))}
        </div>

        <div>
          <pre style={F.kod} aria-label={t('Oluşturulan kod', 'Generated code')}>{cikti || t('// Önce yukarıdaki hataları düzeltin.', '// Fix the errors above first.')}</pre>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            <button type="button" onClick={kopyala} disabled={!cikti} style={F.buton}>{kopyalandi ? t('Kopyalandı ✓', 'Copied ✓') : t('Kopyala', 'Copy')}</button>
            <button type="button" onClick={indir} disabled={!cikti} style={F.ikincil}>{t('İndir', 'Download')} ({dosyaAdi})</button>
          </div>
        </div>
      </div>
    </AracSayfa>
  )
}
