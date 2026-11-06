import { useDeferredValue, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { basitOku, hreflangOku, dosyalariUret, tabanDuzelt, EN_FAZLA_URL, ORNEK_BASIT, ORNEK_HREFLANG } from '../../lib/site-haritasi'

// XML site haritası oluşturucu: tamamen tarayıcıda çalışır, hiçbir veri gönderilmez.
// TR: /site-haritasi-olusturucu   EN: /en/sitemap-generator
// priority ve changefreq Google tarafından yok sayıldığı için eklenmez.

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const ONIZLEME_KARAKTER = 60000
const LISTE_SINIRI = 40

function bugunTarih() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export default function SiteHaritasiOlusturucu(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [mod, setMod] = useState('basit')
  const [metin, setMetin] = useState(ORNEK_BASIT)
  const [lastmod, setLastmod] = useState('')
  const [taban, setTaban] = useState('')
  const [xDefault, setXDefault] = useState('')
  const [secili, setSecili] = useState(0)
  const [kopyalandi, setKopyalandi] = useState('')

  const ertMetin = useDeferredValue(metin)
  const sonuc = useMemo(() => (mod === 'basit'
    ? basitOku(ertMetin, { varsayilanLastmod: lastmod })
    : hreflangOku(ertMetin, { varsayilanLastmod: lastmod, xDefault })), [mod, ertMetin, lastmod, xDefault])
  const cikti = useMemo(() => dosyalariUret(sonuc.girdiler, { taban }), [sonuc, taban])
  const tumDosyalar = cikti.dizin ? [cikti.dizin, ...cikti.dosyalar] : cikti.dosyalar
  const gosterilen = tumDosyalar[Math.min(secili, Math.max(0, tumDosyalar.length - 1))]
  const hesaplaniyor = ertMetin !== metin

  // hreflang modunda x-default için seçilebilecek dil kodları (girdide geçenler)
  const diller = useMemo(() => {
    if (mod !== 'hreflang') return []
    const s = new Set()
    for (const g of sonuc.gruplar || []) for (const a of g.alternatifler) if (a.kod !== 'x-default') s.add(a.kod)
    return [...s]
  }, [mod, sonuc])

  const modDegistir = (yeni) => {
    if (yeni === mod) return
    setMod(yeni)
    setSecili(0)
    if (!metin.trim() || metin === ORNEK_BASIT || metin === ORNEK_HREFLANG) setMetin(yeni === 'basit' ? ORNEK_BASIT : ORNEK_HREFLANG)
  }

  const indir = (d) => {
    const blob = new Blob([d.xml], { type: 'application/xml;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = d.ad
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }
  const kopyala = async (d) => {
    try { await navigator.clipboard.writeText(d.xml); setKopyalandi(d.ad); setTimeout(() => setKopyalandi(''), 1800) } catch { /* pano izni yok */ }
  }

  const yerel = isEn ? 'en-US' : 'tr-TR'
  const sayi = (x) => new Intl.NumberFormat(yerel).format(x || 0)
  const boyut = (b) => (b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : b >= 1024 ? `${Math.round(b / 1024)} KB` : `${b} B`)
  const satirOn = (s) => (s ? t(`${s}. satır: `, `Line ${s}: `) : '')

  const hataMetni = (h) => {
    switch (h.kod) {
      case 'url-goreli': return satirOn(h.satir) + t(`tam adres değil ("${h.ham}"). https:// ile başlayan mutlak adres yazın.`, `not a full address ("${h.ham}"). Use an absolute URL starting with https://.`)
      case 'url-gecersiz': return satirOn(h.satir) + t(`geçerli bir adres değil ("${h.ham}").`, `not a valid address ("${h.ham}").`)
      case 'url-uzun': return satirOn(h.satir) + t('adres 2.048 karakterden uzun; site haritası protokolü buna izin vermez.', 'the address is longer than 2,048 characters, which the sitemap protocol does not allow.')
      case 'varsayilan-tarih': return t('Varsayılan tarih geçersiz.', 'The default date is invalid.')
      case 'hreflang-bicim': return satirOn(h.satir) + t(`"${h.ham}" kod|adres biçiminde değil (ör. tr|https://ornek.com/).`, `"${h.ham}" is not in code|address format (e.g. en|https://example.com/).`)
      case 'hreflang-kod': return satirOn(h.satir) + t(`"${h.ham}" geçerli bir hreflang kodu değil${h.oneri ? `; "${h.oneri}" olmalı` : ''}. Dil kodu ISO 639-1, bölge ISO 3166-1 olmalı (ör. tr, en-GB).`, `"${h.ham}" is not a valid hreflang code${h.oneri ? `; use "${h.oneri}"` : ''}. Language must be ISO 639-1 and region ISO 3166-1 (e.g. tr, en-GB).`)
      case 'hreflang-tekrar-kod': return satirOn(h.satir) + t(`"${h.ham}" kodu aynı grupta iki kez var.`, `the code "${h.ham}" appears twice in the same group.`)
      default: return satirOn(h.satir) + h.kod
    }
  }
  const uyariMetni = (u) => {
    switch (u.kod) {
      case 'tekrar': return satirOn(u.satir) + t(`${u.ilk}. satırın tekrarı; atlandı.`, `duplicate of line ${u.ilk}; skipped.`)
      case 'parca': return satirOn(u.satir) + t('adresteki # kısmı atıldı; arama motorları parçaları ayrı sayfa saymaz.', 'the # fragment was removed; search engines do not treat fragments as separate pages.')
      case 'tarih-bicim': return satirOn(u.satir) + t(`tarih tanınmadı ("${u.ham}"), lastmod eklenmedi. YYYY-AA-GG ya da 2026-11-01T10:00:00+03:00 biçimini kullanın.`, `date not recognised ("${u.ham}"), so no lastmod was added. Use YYYY-MM-DD or 2026-11-01T10:00:00+03:00.`)
      case 'tarih-gelecek': return satirOn(u.satir) + t(`tarih (${u.tarih}) gelecekte. lastmod sayfanın son önemli değişikliğini göstermeli; yanlış tarihler Google'ın lastmod'a güvenmemesine yol açar.`, `the date (${u.tarih}) is in the future. lastmod should show the last significant change; wrong dates make Google stop trusting lastmod.`)
      case 'farkli-host': return t(`${sayi(u.adet)} adres farklı bir alan adında (${u.hostlar.slice(0, 3).join(', ')}). Site haritası kendi alan adındaki (${u.ana}) adresleri listelemeli; diğer alan adları aynı Search Console hesabında doğrulanmadıkça bu adresler yok sayılabilir.`, `${sayi(u.adet)} address(es) are on a different host (${u.hostlar.slice(0, 3).join(', ')}). A sitemap should list addresses on its own host (${u.ana}); unless the other hosts are verified in the same Search Console account, these may be ignored.`)
      case 'karisik-protokol': return t('Listede hem http hem https adresler var. Yalnızca tercih edilen (genellikle https) sürümü listeleyin.', 'The list mixes http and https addresses. List only the preferred version (usually https).')
      case 'http': return t('Tüm adresler http. Siteniz https ile açılıyorsa site haritasında https adresleri kullanın.', 'All addresses use http. If your site runs on https, use the https addresses in the sitemap.')
      case 'kodlandi': return t(`${sayi(u.adet)} adresteki Türkçe karakterler ve boşluklar URL kodlamasıyla yazıldı (ör. ş → %C5%9F). Site haritası protokolü bunu ister; tarayıcıda aynı adrestir.`, `Non ASCII characters and spaces in ${sayi(u.adet)} address(es) were percent encoded (e.g. ş → %C5%9F). The sitemap protocol requires this; it is the same address in the browser.`)
      case 'x-default-dil-yok': return satirOn(u.satir) + t(`grupta "${u.dil}" sürümü olmadığı için x-default eklenmedi.`, `no "${u.dil}" version in this group, so no x-default was added.`)
      case 'hreflang-tek': return satirOn(u.satir) + t('grupta tek dil sürümü var; hreflang en az iki sürüm olduğunda anlamlıdır.', 'the group has a single language version; hreflang only makes sense with at least two.')
      case 'hreflang-cakisma': return satirOn(u.satir) + t(`${u.url} adresi ${u.ilk}. satırdaki grupta da var. Bir sayfa yalnızca bir dil grubunda olmalı.`, `${u.url} also appears in the group on line ${u.ilk}. A page should belong to only one language group.`)
      default: return satirOn(u.satir) + u.kod
    }
  }

  const icerik = isEn ? {
    baslik: 'XML Sitemap Generator',
    metaBaslik: 'XML Sitemap Generator | Free SEO Tool',
    metaDesc: 'Create an XML sitemap from a URL list with lastmod, hreflang alternates, automatic splitting at 50,000 URLs, a sitemap index and proper escaping.',
    giris: 'Paste your URLs and download a valid XML sitemap. The tool checks every address, removes duplicates, escapes special characters, adds lastmod dates if you want them and splits large lists into several files with a sitemap index. In hreflang mode it writes reciprocal xhtml:link alternates, including x-default. Everything runs in your browser. For the basics see [what an XML sitemap is](/en/xml-site-haritasi-nedir); for hreflang in HTML use the [hreflang generator](/en/hreflang-generator).',
    adimlar: [
      'Paste one URL per line. To set a date for a single page, add it after a comma (e.g. "https://example.com/page,2026-11-01"), or pick a default date for all pages.',
      'For a multilingual site, switch to **hreflang groups** and write each page group on one line as code|URL pairs separated by spaces (e.g. "en|https://example.com/en/ tr|https://example.com/").',
      'Fix the errors and review the warnings. Only canonical, indexable pages that return 200 belong in a sitemap.',
      'Download the file (or all files and the index), upload it to your site root, add a Sitemap line to robots.txt and submit it in Search Console.',
    ],
    sss: [
      { s: 'What is an XML sitemap and do I need one?', c: 'An XML sitemap lists the pages you want search engines to find. It does not guarantee indexing, but it helps Google discover new and updated pages, especially on large or new sites, sites with weak internal linking and sites with many media or language versions. The details are in [what an XML sitemap is](/en/xml-site-haritasi-nedir).' },
      { s: 'Why are priority and changefreq not added?', c: 'Google has stated that it ignores priority and changefreq. It does use lastmod when it is consistently accurate, meaning the date of the last significant change to the content, not the date the file was generated. That is why this tool only writes loc and, optionally, lastmod.' },
      { s: 'What happens with more than 50,000 URLs?', c: 'A single sitemap may contain at most 50,000 URLs and be at most 50 MB uncompressed. The tool splits larger lists into sitemap-1.xml, sitemap-2.xml and so on, and creates a sitemap index (sitemap.xml) that lists them. Set the address where the files will be published, upload all files there and submit only the index in Search Console.' },
      { s: 'How do I add hreflang to a sitemap?', c: 'Each URL lists all language versions, including itself, as xhtml:link alternate elements; the links must be reciprocal. x-default points to the page for users whose language matches none of the versions. Write each page group on one line and the tool adds the alternates to every URL. For HTML link tags or HTTP headers use the [hreflang generator](/en/hreflang-generator).' },
      { s: 'How do I tell Google about my sitemap?', c: 'Submit it in the Sitemaps report in Search Console and add a "Sitemap: https://example.com/sitemap.xml" line to robots.txt, which other search engines read as well. You can check robots.txt with the [robots.txt tester](/en/robots-txt-tester), and the [Search Console guide](/en/search-console-rehberi) explains how to read the sitemap and page indexing reports.' },
      { s: 'Which URLs should be in the sitemap?', c: 'Only canonical pages that return 200 and that you want indexed. Leave out redirected addresses, noindex pages, parameter and filter variations and pages blocked by robots.txt; listing them sends mixed signals. If you are unsure whether old addresses redirect, check them with the [redirect checker](/en/redirect-checker).' },
    ],
  } : {
    baslik: 'XML Site Haritası Oluşturucu',
    metaBaslik: 'XML Site Haritası Oluşturucu | Ücretsiz SEO Aracı',
    metaDesc: 'URL listenizden XML site haritası oluşturun. lastmod, hreflang alternatifleri, 50.000 adreste bölme, site haritası dizini ve doğru XML kaçışı.',
    giris: 'Adreslerinizi yapıştırın, geçerli bir XML site haritası indirin. Araç her adresi kontrol eder, tekrarları atar, özel karakterleri kaçışlar, isterseniz lastmod tarihi ekler ve büyük listeleri site haritası diziniyle birden çok dosyaya böler. hreflang modunda x-default dahil karşılıklı xhtml:link alternatiflerini yazar. Her şey tarayıcınızda çalışır. Temel bilgiler için [XML site haritası nedir yazısına](/xml-site-haritasi-nedir), HTML\'de hreflang için [hreflang oluşturucuya](/hreflang-olusturucu) bakın.',
    adimlar: [
      'Her satıra bir adres yazın. Tek bir sayfaya tarih vermek için adresten sonra virgülle ekleyin (ör. "https://ornek.com/sayfa,2026-11-01") ya da tüm sayfalar için varsayılan bir tarih seçin.',
      'Çok dilli bir site için **hreflang grupları** moduna geçin ve her sayfa grubunu tek satıra, boşlukla ayrılmış kod|adres çiftleri olarak yazın (ör. "tr|https://ornek.com/ en|https://ornek.com/en/").',
      'Hataları düzeltin, uyarıları gözden geçirin. Site haritasına yalnızca 200 döndüren, dizine eklenebilir canonical sayfalar girmeli.',
      'Dosyayı (ya da tüm dosyaları ve dizini) indirin, sitenizin köküne yükleyin, robots.txt\'ye Sitemap satırı ekleyin ve Search Console\'dan gönderin.',
    ],
    sss: [
      { s: 'XML site haritası nedir, gerekli mi?', c: 'XML site haritası, arama motorlarının bulmasını istediğiniz sayfaların listesidir. Dizine eklenmeyi garanti etmez ama Google\'ın yeni ve güncellenen sayfaları bulmasına yardım eder; özellikle büyük ya da yeni sitelerde, iç linkleri zayıf sitelerde ve çok sayıda medya ya da dil sürümü olan sitelerde işe yarar. Ayrıntılar [XML site haritası nedir yazısında](/xml-site-haritasi-nedir).' },
      { s: 'priority ve changefreq neden eklenmiyor?', c: 'Google, priority ve changefreq değerlerini yok saydığını açıkça belirtiyor. lastmod\'u ise tutarlı biçimde doğru olduğunda kullanıyor; yani dosyanın üretildiği tarih değil, içeriğin son önemli değişikliğinin tarihi. Bu yüzden araç yalnızca loc ve isteğe bağlı olarak lastmod yazar.' },
      { s: '50.000\'den fazla adresim varsa ne olur?', c: 'Tek bir site haritası en fazla 50.000 adres içerebilir ve sıkıştırılmamış hâlde en fazla 50 MB olabilir. Araç büyük listeleri sitemap-1.xml, sitemap-2.xml gibi dosyalara böler ve bunları listeleyen bir site haritası dizini (sitemap.xml) üretir. Dosyaların yayınlanacağı adresi girin, tüm dosyaları oraya yükleyin ve Search Console\'a yalnızca dizini gönderin.' },
      { s: 'hreflang site haritasında nasıl gösterilir?', c: 'Her adres, kendisi dahil tüm dil sürümlerini xhtml:link alternate öğeleriyle listeler; bağlantılar karşılıklı olmalıdır. x-default, dili hiçbir sürümle eşleşmeyen kullanıcılar için gösterilecek sayfayı belirtir. Her sayfa grubunu tek satıra yazın, araç alternatifleri her adrese ekler. HTML link etiketi ya da HTTP başlığı için [hreflang oluşturucuyu](/hreflang-olusturucu) kullanın.' },
      { s: 'Site haritasını Google\'a nasıl bildiririm?', c: 'Search Console\'daki Site haritaları raporundan gönderin ve robots.txt dosyasına "Sitemap: https://ornek.com/sitemap.xml" satırı ekleyin; diğer arama motorları da bu satırı okur. robots.txt dosyanızı [robots.txt test aracıyla](/robots-txt-test) kontrol edebilirsiniz. Site haritası ve sayfa dizine ekleme raporlarının nasıl okunacağı [Search Console rehberinde](/search-console-rehberi) anlatılıyor.' },
      { s: 'Site haritasına hangi adresler girmeli?', c: 'Yalnızca 200 döndüren ve dizine eklenmesini istediğiniz canonical sayfalar. Yönlendirilen adresleri, noindex sayfaları, parametre ve filtre varyasyonlarını ve robots.txt ile engellenen sayfaları eklemeyin; bunlar çelişkili sinyal verir. Eski adreslerin yönlendirilip yönlendirilmediğinden emin değilseniz [yönlendirme zinciri kontrol aracıyla](/yonlendirme-zinciri-kontrol) bakın.' },
    ],
  }

  const ozet = [
    { ad: t('Site haritasındaki adres', 'URLs in sitemap'), deger: sayi(sonuc.girdiler.length), vurgu: true },
    { ad: t('Dosya', 'Files'), deger: sayi(cikti.dosyalar.length) + (cikti.dizin ? t(' + dizin', ' + index') : '') },
    { ad: t('Hata', 'Errors'), deger: sayi(sonuc.hatalar.length), renk: sonuc.hatalar.length ? '#b91c1c' : '#15803d' },
    { ad: t('Uyarı', 'Warnings'), deger: sayi(sonuc.uyarilar.length), renk: sonuc.uyarilar.length ? '#b45309' : '#15803d' },
  ]
  const onizleme = gosterilen ? (gosterilen.xml.length > ONIZLEME_KARAKTER ? gosterilen.xml.slice(0, ONIZLEME_KARAKTER) + `\n<!-- ${t('önizleme kısaltıldı; indirilen dosya tamdır', 'preview truncated; the downloaded file is complete')} -->` : gosterilen.xml) : ''

  const liste = (ogeler, metinFn, renk, zemin, baslik) => ogeler.length ? (
    <div style={{ background: zemin, borderRadius: '10px', padding: '10px 14px' }}>
      <div style={{ fontSize: '13px', fontWeight: 800, color: renk, marginBottom: '4px' }}>{baslik} ({sayi(ogeler.length)})</div>
      <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#333', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
        {ogeler.slice(0, LISTE_SINIRI).map((x, i) => <li key={i}>{metinFn(x)}</li>)}
      </ul>
      {ogeler.length > LISTE_SINIRI && <div style={{ fontSize: '12.5px', color: '#666', marginTop: '4px' }}>{t(`ve ${sayi(ogeler.length - LISTE_SINIRI)} tane daha`, `and ${sayi(ogeler.length - LISTE_SINIRI)} more`)}</div>}
    </div>
  ) : null

  return (
    <AracSayfa isEn={isEn} yol="/site-haritasi-olusturucu" yolEn="/en/sitemap-generator" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['teknik-seo', 'site-tasima-seo', 'e-ticaret-seo']}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div role="radiogroup" aria-label={t('Giriş biçimi', 'Input format')} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[['basit', t('Adres listesi', 'URL list')], ['hreflang', t('hreflang grupları', 'hreflang groups')]].map(([id, ad]) => (
            <button key={id} type="button" role="radio" aria-checked={mod === id} onClick={() => modDegistir(id)}
              style={{ ...F.ikincil, ...(mod === id ? { background: 'var(--orange)', color: '#fff', borderColor: 'var(--orange)' } : {}) }}>{ad}</button>
          ))}
        </div>

        <div>
          <label htmlFor="sh-metin" style={F.etiket}>
            {mod === 'basit'
              ? t('Adresler (her satıra bir tane; isteğe bağlı ",2026-11-01" tarihiyle)', 'URLs (one per line; optional ",2026-11-01" date)')
              : t('Sayfa grupları (her satıra bir grup: kod|adres kod|adres ...; isteğe bağlı tarih sonda)', 'Page groups (one group per line: code|URL code|URL ...; optional date at the end)')}
          </label>
          <textarea id="sh-metin" value={metin} onChange={ev => { setMetin(ev.target.value); setSecili(0) }} rows={10} spellCheck={false}
            style={{ ...F.girdi, fontFamily: MONO, fontSize: '13px', lineHeight: 1.6, resize: 'vertical', whiteSpace: 'pre', overflowWrap: 'normal', overflowX: 'auto' }} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
            <button type="button" style={F.ikincil} onClick={() => setMetin('')}>{t('Temizle', 'Clear')}</button>
            <button type="button" style={F.ikincil} onClick={() => setMetin(mod === 'basit' ? ORNEK_BASIT : ORNEK_HREFLANG)}>{t('Örneği yükle', 'Load sample')}</button>
          </div>
        </div>

        <div className="sh-ayar" style={{ display: 'grid', gridTemplateColumns: mod === 'hreflang' ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))', gap: '14px 18px' }}>
          <div>
            <label htmlFor="sh-lastmod" style={F.etiket}>{t('Varsayılan lastmod (isteğe bağlı)', 'Default lastmod (optional)')}</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input id="sh-lastmod" type="date" value={lastmod} onChange={ev => setLastmod(ev.target.value)} style={{ ...F.girdi, flex: 1 }} />
              <button type="button" style={{ ...F.ikincil, padding: '10px 12px' }} onClick={() => setLastmod(lastmod ? '' : bugunTarih())}>{lastmod ? t('Kaldır', 'Clear') : t('Bugün', 'Today')}</button>
            </div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{t('Satırda tarih olmayan adreslere uygulanır. Yalnızca içerik gerçekten o gün değiştiyse kullanın.', 'Applied to lines without their own date. Use it only if the content really changed on that day.')}</div>
          </div>
          <div>
            <label htmlFor="sh-taban" style={F.etiket}>{t('Dosyaların yayınlanacağı adres', 'Address where files will be published')}</label>
            <input id="sh-taban" value={taban} onChange={ev => setTaban(ev.target.value)} placeholder={tabanDuzelt('', sonuc.girdiler[0]?.url || 'https://www.ornek.com/')} inputMode="url" style={F.girdi} />
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{t(`Yalnızca ${sayi(EN_FAZLA_URL)} adresten fazlası bölündüğünde site haritası dizininde kullanılır.`, `Used in the sitemap index only when more than ${sayi(EN_FAZLA_URL)} URLs are split.`)}</div>
          </div>
          {mod === 'hreflang' && (
            <div>
              <label htmlFor="sh-xd" style={F.etiket}>x-default</label>
              <select id="sh-xd" value={xDefault} onChange={ev => setXDefault(ev.target.value)} style={F.girdi}>
                <option value="">{t('Ekleme (yalnızca satırda yazılanlar)', 'Do not add (only those in the lines)')}</option>
                {diller.map(d => <option key={d} value={d}>{t(`Grupta yoksa ${d} sürümünü kullan`, `If missing, use the ${d} version`)}</option>)}
              </select>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{t('Dili eşleşmeyen kullanıcılara gösterilecek sürüm.', 'The version shown to users whose language matches none.')}</div>
            </div>
          )}
        </div>

        <div aria-live="polite" aria-busy={hesaplaniyor} style={{ display: 'grid', gap: '12px', opacity: hesaplaniyor ? 0.6 : 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
            {ozet.map(k => (
              <div key={k.ad} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 14px', background: k.vurgu ? '#faf9f7' : '#fff' }}>
                <div style={{ fontSize: '12px', color: '#777', marginBottom: '4px' }}>{k.ad}</div>
                <div style={{ fontSize: k.vurgu ? '22px' : '18px', fontWeight: 800, color: k.renk || '#111', fontVariantNumeric: 'tabular-nums' }}>{k.deger}</div>
              </div>
            ))}
          </div>
          {liste(sonuc.hatalar, hataMetni, '#b91c1c', '#fef2f2', t('Hatalar (bu satırlar site haritasına eklenmedi)', 'Errors (these lines were not added)'))}
          {liste(sonuc.uyarilar, uyariMetni, '#b45309', '#fffbeb', t('Uyarılar', 'Warnings'))}
        </div>

        {tumDosyalar.length > 0 ? (
          <div style={{ display: 'grid', gap: '10px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: 0 }}>{t('Dosyalar', 'Files')}</h2>
            {cikti.dizin && <p style={{ margin: 0, fontSize: '13px', color: '#555', lineHeight: 1.6 }}>{t(`${sayi(EN_FAZLA_URL)} adres sınırı nedeniyle liste ${cikti.dosyalar.length} dosyaya bölündü. Tüm dosyaları ${tabanDuzelt(taban, sonuc.girdiler[0]?.url)} adresine yükleyin ve Search Console'a yalnızca ${cikti.dizin.ad} dizinini gönderin.`, `Because of the ${sayi(EN_FAZLA_URL)} URL limit, the list was split into ${cikti.dosyalar.length} files. Upload all files to ${tabanDuzelt(taban, sonuc.girdiler[0]?.url)} and submit only the ${cikti.dizin.ad} index in Search Console.`)}</p>}
            <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px', minWidth: '520px' }}>
                <tbody>
                  {tumDosyalar.map((d, i) => (
                    <tr key={d.ad} style={i === Math.min(secili, tumDosyalar.length - 1) ? { background: '#faf9f7' } : undefined}>
                      <th scope="row" style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #f0ece6', fontFamily: MONO, fontWeight: 600 }}>{d.ad}{cikti.dizin && i === 0 ? <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#888' }}> · {t('dizin', 'index')}</span> : null}</th>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6', color: '#555', whiteSpace: 'nowrap' }}>{cikti.dizin && i === 0 ? t(`${d.adet} dosya`, `${d.adet} files`) : t(`${sayi(d.adet)} adres`, `${sayi(d.adet)} URLs`)} · {boyut(d.bayt)}</td>
                      <td style={{ padding: '6px 10px', borderBottom: '1px solid #f0ece6', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button type="button" style={{ ...F.ikincil, padding: '6px 10px', fontSize: '13px', marginRight: '6px' }} onClick={() => setSecili(i)}>{t('Önizle', 'Preview')}</button>
                        <button type="button" style={{ ...F.ikincil, padding: '6px 10px', fontSize: '13px', marginRight: '6px' }} onClick={() => kopyala(d)}>{kopyalandi === d.ad ? t('Kopyalandı ✓', 'Copied ✓') : t('Kopyala', 'Copy')}</button>
                        <button type="button" style={{ ...F.buton, padding: '6px 12px', fontSize: '13px' }} onClick={() => indir(d)}>{t('İndir', 'Download')}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {gosterilen && (
              <figure style={{ margin: 0 }}>
                <figcaption style={{ fontSize: '12.5px', color: '#888', marginBottom: '6px' }}>{t('Önizleme', 'Preview')}: {gosterilen.ad}</figcaption>
                <pre style={F.kod}>{onizleme}</pre>
              </figure>
            )}
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: '13.5px', color: '#555' }}>{t('Geçerli adres olmadığı için dosya oluşturulmadı.', 'No valid URLs, so no file was created.')}</p>
        )}

        <div role="note" style={{ background: '#faf9f7', border: '1px solid #f0ece6', borderRadius: '10px', padding: '12px 14px', fontSize: '13px', color: '#444', lineHeight: 1.7 }}>
          <strong style={{ color: '#111' }}>{t('priority ve changefreq yok, bilerek.', 'No priority or changefreq, on purpose.')}</strong>{' '}
          {t('Google bu iki değeri yok sayar; lastmod\'u ise yalnızca tutarlı biçimde doğruysa kullanır. Dosyayı yükledikten sonra robots.txt\'ye Sitemap satırını ekleyin (', 'Google ignores both values and uses lastmod only when it is consistently accurate. After uploading the file, add the Sitemap line to robots.txt (check it with the ')}
          <Link href={isEn ? '/en/robots-txt-tester' : '/robots-txt-test'} style={{ color: 'var(--orange)', fontWeight: 600 }}>{t('robots.txt test aracıyla kontrol edin', 'robots.txt tester')}</Link>
          {t(') ve Search Console\'dan gönderin.', ') and submit it in Search Console.')}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@media (max-width: 760px){.sh-ayar{grid-template-columns:minmax(0,1fr)!important}}' }} />
    </AracSayfa>
  )
}
