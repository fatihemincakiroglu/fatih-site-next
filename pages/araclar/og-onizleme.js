import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { ogAyristir, ogKontrol, etkinDegerler, kisalt, PLATFORM_SINIRLARI, ONERILEN_GORSEL, ORNEK_HTML } from '../../lib/og-ayristir'

// Open Graph önizleme ve paylaşım etiketi kontrolü.
// TR: /og-onizleme   EN: /en/og-preview
// URL modu: HTML sunucuda getirilir ve ayrıştırılır (pages/api/og-getir.js, SSRF korumalı).
// HTML modu: yapıştırılan kod tarayıcıda ayrıştırılır, hiçbir istek gönderilmez.

const ORNEK_URL = 'https://www.ornek.com/teknik-seo-denetimi'
const PLATFORM_AD = { google: 'Google', facebook: 'Facebook', linkedin: 'LinkedIn', x: 'X (Twitter)', whatsapp: 'WhatsApp' }
const SEVIYE_RENK = {
  hata: { renk: '#b91c1c', zemin: '#fef2f2', isaret: '✗' },
  uyari: { renk: '#b45309', zemin: '#fffbeb', isaret: '!' },
  bilgi: { renk: '#1d4ed8', zemin: '#eff6ff', isaret: 'i' },
}
const satirKes = (n) => ({ display: '-webkit-box', WebkitLineClamp: n, WebkitBoxOrient: 'vertical', overflow: 'hidden', overflowWrap: 'anywhere' })
const SISTEM_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

function alanAdi(u) {
  try { return new URL(u).hostname.replace(/^www\./, '') } catch { return '' }
}

// Dış görsel: next/image kullanılmaz (rastgele alan adları). Yönlendiren bilgisi gönderilmez.
function Gorsel({ src, oran = '1.91 / 1', yok, yuklenemedi, stil = {} }) {
  const [hata, setHata] = useState(false)
  const kutu = { aspectRatio: oran, width: '100%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '12px', textAlign: 'center', padding: '8px', ...stil }
  if (!src || hata) return <div style={kutu}>{!src ? yok : yuklenemedi}</div>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" referrerPolicy="no-referrer" loading="lazy" decoding="async" onError={() => setHata(true)}
      style={{ display: 'block', width: '100%', aspectRatio: oran, objectFit: 'cover', background: '#e5e7eb', ...stil }} />
  )
}

function Onizleme({ ad, children }) {
  return (
    <figure style={{ margin: 0, minWidth: 0 }}>
      <figcaption style={{ fontSize: '12.5px', fontWeight: 700, color: '#555', marginBottom: '8px' }}>{ad}</figcaption>
      {children}
    </figure>
  )
}

const kodKacis = (s) => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default function OgOnizleme(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [mod, setMod] = useState('url')
  const [url, setUrl] = useState('')
  const [getirDurum, setGetirDurum] = useState(null)
  const [getirilen, setGetirilen] = useState(null)
  const [html, setHtml] = useState(ORNEK_HTML)
  const [htmlUrl, setHtmlUrl] = useState(ORNEK_URL)
  const [kopyalandi, setKopyalandi] = useState(false)

  const ornekVeri = useMemo(() => ogAyristir(ORNEK_HTML, ORNEK_URL), [])
  const htmlVeri = useMemo(() => ogAyristir(html, /^https?:\/\//i.test(htmlUrl.trim()) ? htmlUrl.trim() : ''), [html, htmlUrl])

  const ornekMi = mod === 'url' && !getirilen
  const v = mod === 'html' ? htmlVeri : getirilen ? getirilen.etiketler : ornekVeri
  const sayfaUrl = mod === 'html' ? htmlUrl.trim() : getirilen ? getirilen.url : ORNEK_URL
  const e = useMemo(() => etkinDegerler(v), [v])
  const sorunlar = useMemo(() => ogKontrol(v), [v])
  const alan = alanAdi(v.og.url) || alanAdi(sayfaUrl) || alanAdi(v.canonical) || 'ornek.com'

  const getir = async () => {
    if (!url.trim()) return
    setGetirDurum({ yukleniyor: true })
    try {
      const r = await fetch(`/api/og-getir?url=${encodeURIComponent(url.trim())}`)
      const j = await r.json()
      if (r.status === 429) return setGetirDurum({ hata: t('Çok fazla istek. Bir dakika sonra tekrar deneyin.', 'Too many requests. Try again in a minute.') })
      if (r.status === 400) return setGetirDurum({ hata: t('Geçerli bir adres yazın (ör. https://www.ornek.com/sayfa).', 'Enter a valid address (e.g. https://www.example.com/page).') })
      if (!j.ok) {
        return setGetirDurum({ hata: t(`Sayfa getirilemedi${j.detay ? ` (${j.detay})` : ''}. Adresi kontrol edin ya da HTML yapıştır sekmesini kullanın.`, 'Could not fetch the page. Check the address or use the Paste HTML tab.') })
      }
      setGetirilen({ etiketler: j.etiketler, url: j.url, status: j.status, istenen: j.istenen })
      const yon = j.istenen && j.url !== j.istenen ? t(` Yönlendirme sonrası adres ${j.url}.`, ` Final address after redirects is ${j.url}.`) : ''
      if (j.status >= 400) return setGetirDurum({ hata: t(`Sayfa HTTP ${j.status} döndürdü; paylaşım botları da büyük ihtimalle bu yanıtı görür.${yon}`, `The page returned HTTP ${j.status}; sharing bots will most likely see the same response.${yon}`) })
      setGetirDurum({ bilgi: t(`Getirildi (HTTP ${j.status}).${yon}`, `Fetched (HTTP ${j.status}).${yon}`) })
    } catch {
      setGetirDurum({ hata: t('Bağlantı hatası.', 'Connection error.') })
    }
  }

  const alanAd = (a) => (a === 'baslik' ? t('başlık', 'title') : t('açıklama', 'description'))
  const sorunMetni = (s) => {
    switch (s.kod) {
      case 'og-image-yok': return t('og:image yok. Paylaşımlar görselsiz ya da platformun sayfadan rastgele seçtiği bir görselle çıkar.', 'og:image is missing. Shares appear without an image or with an image the platform picks from the page.')
      case 'og-image-goreli': return t(`og:image göreli adres ("${s.deger}"). Facebook ve diğer platformlar tam adres ister; https:// ile başlayan mutlak URL yazın.`, `og:image is a relative address ("${s.deger}"). Facebook and other platforms expect an absolute URL starting with https://.`)
      case 'og-image-http': return t('og:image http ile başlıyor. Bazı platformlar güvensiz görseli göstermez; https kullanın.', 'og:image uses http. Some platforms will not show insecure images; use https.')
      case 'og-image-boyut-yok': return t(`og:image:width ve og:image:height yok. Eklemek ilk paylaşımda görselin hemen gösterilmesine yardım eder (önerilen ${ONERILEN_GORSEL.genislik}×${ONERILEN_GORSEL.yukseklik}).`, `og:image:width and og:image:height are missing. Adding them helps the image show on the very first share (recommended ${ONERILEN_GORSEL.genislik}×${ONERILEN_GORSEL.yukseklik}).`)
      case 'og-image-kucuk': return t(`Görsel ${s.w}×${s.h} piksel; büyük kart için küçük. Platformlar küçük görseli yan tarafta minik gösterebilir. ${ONERILEN_GORSEL.genislik}×${ONERILEN_GORSEL.yukseklik} önerilir.`, `The image is ${s.w}×${s.h} px, small for a large card. Platforms may show it as a small thumbnail. ${ONERILEN_GORSEL.genislik}×${ONERILEN_GORSEL.yukseklik} is recommended.`)
      case 'og-image-onerilen': return t(`Görsel ${s.w}×${s.h} piksel; yüksek çözünürlüklü ekranlarda net görünmesi için ${ONERILEN_GORSEL.genislik}×${ONERILEN_GORSEL.yukseklik} önerilir.`, `The image is ${s.w}×${s.h} px; ${ONERILEN_GORSEL.genislik}×${ONERILEN_GORSEL.yukseklik} is recommended for sharp display on high resolution screens.`)
      case 'og-image-oran': return t(`Görsel oranı ${s.oran}:1. Çoğu platform yaklaşık 1,91:1 oranında kırpar; kenarlardaki metin kesilebilir.`, `The image ratio is ${s.oran}:1. Most platforms crop to about 1.91:1, so text near the edges may be cut off.`)
      case 'og-image-alt-yok': return t('og:image:alt yok. Ekran okuyucu kullananlar için görseli kısaca tarif edin.', 'og:image:alt is missing. Describe the image briefly for screen reader users.')
      case 'og-title-yok': return s.yedek ? t('og:title yok. Platformlar <title> etiketini kullanır; sosyal medyaya özel, marka ekisiz bir başlık yazmak genellikle daha iyi sonuç verir.', 'og:title is missing. Platforms fall back to the <title> tag; a share-specific title without the brand suffix usually works better.') : t('og:title ve <title> ikisi de yok. Paylaşımda başlık görünmez ya da adres gösterilir.', 'Both og:title and <title> are missing. Shares show no title or just the address.')
      case 'og-description-yok': return s.yedek ? t('og:description yok. Platformlar meta description\'ı kullanabilir ama her zaman değil; ayrıca yazın.', 'og:description is missing. Platforms may fall back to the meta description, but not always; add it explicitly.') : t('og:description ve meta description ikisi de yok. Paylaşımda açıklama satırı boş kalır ya da sayfadan rastgele metin çekilir.', 'Both og:description and meta description are missing. The description line stays empty or random page text is used.')
      case 'title-yok': return t('<title> etiketi yok. Google sonucundaki başlık ve sekme adı için gerekli.', 'The <title> tag is missing. It is needed for the Google result and the browser tab.')
      case 'description-yok': return t('Meta description yok. Google bu durumda sayfadan bir parça seçer.', 'Meta description is missing. Google will pick a passage from the page instead.')
      case 'twitter-card-yok': return t('twitter:card yok. X kart tipini bu etiketten anlar; büyük görselli kart için summary_large_image ekleyin.', 'twitter:card is missing. X decides the card type from this tag; add summary_large_image for a large image card.')
      case 'twitter-card-gecersiz': return t(`twitter:card değeri tanınmıyor ("${s.deger}"). summary ya da summary_large_image kullanın.`, `twitter:card value is not recognised ("${s.deger}"). Use summary or summary_large_image.`)
      case 'twitter-image-goreli': return t(`twitter:image göreli adres ("${s.deger}"); tam URL yazın.`, `twitter:image is a relative address ("${s.deger}"); use a full URL.`)
      case 'og-url-yok': return t('og:url yok. Platform paylaşılan adresi kullanır; parametreli adreslerde paylaşım sayıları bölünebilir.', 'og:url is missing. The platform uses the shared address, so shares of URLs with parameters may be counted separately.')
      case 'og-url-goreli': return t(`og:url göreli adres ("${s.deger}"); tam URL yazın.`, `og:url is a relative address ("${s.deger}"); use a full URL.`)
      case 'canonical-yok': return t('Canonical etiketi yok. Sayfanın tercih edilen adresini belirtmek için ekleyin.', 'No canonical tag. Add one to declare the preferred address of the page.')
      case 'og-url-canonical-farkli': return t(`og:url (${s.ogUrl}) canonical adresle (${s.canonical}) aynı değil. İkisini de tercih edilen adrese ayarlayın.`, `og:url (${s.ogUrl}) does not match the canonical (${s.canonical}). Set both to the preferred address.`)
      case 'og-type-yok': return t('og:type yok. Platformlar "website" varsayar; yazılar için "article" kullanabilirsiniz.', 'og:type is missing. Platforms assume "website"; use "article" for articles.')
      case 'og-site-name-yok': return t('og:site_name yok. Marka adını gösterir; Google da site adını belirlerken bu etiketi kaynaklardan biri olarak kullanır.', 'og:site_name is missing. It shows your brand name, and Google uses it as one of the sources for the site name.')
      case 'uzun': return t(`${PLATFORM_AD[s.platform]} ${alanAd(s.alan)} ${s.uzunluk} karakter; yaklaşık ${s.sinir} karakterden sonrası kesilebilir.`, `${PLATFORM_AD[s.platform]} ${alanAd(s.alan)} is ${s.uzunluk} characters; it may be cut off after about ${s.sinir}.`)
      default: return s.kod
    }
  }

  const onerilen = useMemo(() => {
    const ph = (deger, yer) => kodKacis(deger || yer)
    const sayfa = v.canonical || v.og.url || (sayfaUrl || 'https://www.ornek.com/sayfa')
    const satirlar = [
      `<meta property="og:type" content="${ph(v.og.type, 'website')}">`,
      `<meta property="og:title" content="${ph(v.og.title || v.title, t('Sayfa başlığı', 'Page title'))}">`,
      `<meta property="og:description" content="${ph(v.og.description || v.description, t('Sayfanın kısa açıklaması', 'Short page description'))}">`,
      `<meta property="og:url" content="${ph(sayfa)}">`,
      `<meta property="og:image" content="${ph(v.og.image && /^https?:\/\//i.test(v.og.image) ? v.og.image.replace(/^http:/i, 'https:') : '', 'https://www.ornek.com/gorseller/paylasim-1200x630.jpg')}">`,
      `<meta property="og:image:width" content="${ONERILEN_GORSEL.genislik}">`,
      `<meta property="og:image:height" content="${ONERILEN_GORSEL.yukseklik}">`,
      `<meta property="og:image:alt" content="${ph(v.og.imageAlt, t('Görselin kısa tarifi', 'Short description of the image'))}">`,
      `<meta property="og:site_name" content="${ph(v.og.siteName, t('Marka adı', 'Brand name'))}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
    ]
    if (!v.canonicalHam) satirlar.unshift(`<link rel="canonical" href="${ph(sayfa)}">`)
    return satirlar.join('\n')
  }, [v, sayfaUrl, isEn]) // eslint-disable-line react-hooks/exhaustive-deps

  const kopyala = async () => {
    try { await navigator.clipboard.writeText(onerilen); setKopyalandi(true); setTimeout(() => setKopyalandi(false), 1800) } catch { /* pano izni yok */ }
  }

  const icerik = isEn ? {
    baslik: 'Open Graph Preview and Checker',
    metaBaslik: 'Open Graph Preview | Free SEO Tool',
    metaDesc: 'Preview how your page looks when shared on WhatsApp, LinkedIn, X, Facebook and Google. Find missing og tags and image problems.',
    giris: 'See how a page may look when it is shared on WhatsApp, LinkedIn, X, Facebook and in Google. The tool reads the Open Graph and Twitter tags, lists missing or broken ones and suggests values. For pixel width of titles in Google use the [SERP preview tool](/en/serp-preview); for writing rules see [meta title and description guidelines](/en/meta-baslik-aciklama-kurallari).',
    adimlar: [
      'Enter the page address and press **Fetch**. For a page that is not live yet, switch to **Paste HTML** and paste the source code.',
      'Check the previews: each platform crops the image and cuts the title differently. Cut-off points are approximate.',
      'Fix the red and amber items in the checklist. Copy the recommended tags and adapt them in the <head> of your page.',
      'After changing tags, refresh the platform caches: use Sharing Debugger for Facebook and Post Inspector for LinkedIn. WhatsApp and X may keep showing the old preview for a while.',
    ],
    sss: [
      { s: 'Do Open Graph tags affect SEO rankings?', c: 'They are not a direct ranking factor. Their effect shows in shares: a clear title, an accurate description and a well-cropped image make people more likely to click on social media and in messaging apps. Google uses the title and meta description in results, and og:site_name is one of the sources it uses for site names. For rich results in search, use the [schema generator](/en/schema-generator).' },
      { s: 'What is the best og:image size?', c: '1200×630 pixels (about a 1.91:1 ratio) looks right on most platforms. Keep important text and the logo in the centre, because some apps crop the edges or crop to a square. The image address should be a full URL starting with https, the file should be reasonably small, and og:image:width, og:image:height and og:image:alt should be set.' },
      { s: 'Do I need twitter:card? Does X not read og tags?', c: 'X falls back to og tags when twitter:title, twitter:description and twitter:image are missing. The card type, however, comes from twitter:card; use summary_large_image for a large image card. Without it the card may appear small or not at all.' },
      { s: 'Should og:url be the same as the canonical?', c: 'Usually yes. og:url is the address that likes, shares and the preview are tied to. If it differs from the canonical (for example a trailing slash or a parameter), engagement can be split across two addresses. Set both to the preferred address of the page.' },
      { s: 'Why does the old image still show after I changed it?', c: 'Platforms cache previews. Use Facebook Sharing Debugger and LinkedIn Post Inspector to re-scrape the address. Renaming the image file (e.g. cover-v2.jpg) is also a practical way to bypass caches.' },
      { s: 'Why can the tool not fetch my page?', c: 'The page may block bot requests, require a login, return something other than HTML or respond too slowly. Internal network addresses are not fetched for security reasons. In that case open the page source in your browser (Ctrl+U) and use the **Paste HTML** tab. Keep in mind that Facebook and LinkedIn bots may hit the same barriers.' },
    ],
  } : {
    baslik: 'Open Graph Önizleme ve Kontrol',
    metaBaslik: 'Open Graph Önizleme | Ücretsiz SEO Aracı',
    metaDesc: 'Sayfanızın WhatsApp, LinkedIn, X, Facebook ve Google\'daki paylaşım önizlemesini görün. Eksik og etiketlerini ve görsel sorunlarını bulun.',
    giris: 'Bir sayfanın WhatsApp, LinkedIn, X, Facebook ve Google\'da nasıl görünebileceğini önizleyin. Araç sayfanın Open Graph ve Twitter etiketlerini okur, eksik ya da hatalı olanları listeler ve önerilen değerleri verir. Başlığın Google\'daki piksel genişliği için [SERP önizleme aracına](/serp-onizleme), yazım kuralları için [meta başlık ve açıklama kuralları yazısına](/meta-baslik-aciklama-kurallari) bakın.',
    adimlar: [
      'Sayfa adresini yazıp **Getir**\'e basın. Henüz yayında olmayan bir sayfa için **HTML yapıştır** sekmesine geçip kaynak kodunu yapıştırın.',
      'Önizlemelere bakın: her platform görseli farklı kırpar ve başlığı farklı yerden keser. Kesme noktaları yaklaşıktır.',
      'Kontrol listesindeki kırmızı ve sarı maddeleri düzeltin. Önerilen etiketleri kopyalayıp sayfanızın <head> bölümüne uyarlayın.',
      'Etiketleri değiştirdikten sonra platformların önbelleğini yenileyin: Facebook için Sharing Debugger, LinkedIn için Post Inspector kullanılır. WhatsApp ve X eski önizlemeyi bir süre gösterebilir.',
    ],
    sss: [
      { s: 'Open Graph etiketleri SEO sıralamasını etkiler mi?', c: 'Doğrudan bir sıralama faktörü değildir. Etkisi paylaşımlarda görülür: net bir başlık, doğru bir açıklama ve düzgün kırpılan bir görsel, sosyal medyada ve mesajlaşma uygulamalarında tıklanma ihtimalini artırır. Google arama sonucunda title ve meta description kullanır; og:site_name ise site adını belirlerken kullandığı kaynaklardan biridir. Arama sonuçlarında zengin görünüm için [schema oluşturucuyu](/schema-olusturucu) kullanabilirsiniz.' },
      { s: 'og:image için ideal boyut nedir?', c: '1200×630 piksel (yaklaşık 1,91:1 oran) çoğu platformda düzgün görünür. Önemli metni ve logoyu görselin ortasında tutun; bazı uygulamalar kenarları ya da kare biçimde kırpar. Görsel adresi https ile başlayan tam bir URL olmalı, dosya makul boyutta tutulmalı ve og:image:width, og:image:height ile og:image:alt etiketleri eklenmelidir.' },
      { s: 'twitter:card gerekli mi? X og etiketlerini okumuyor mu?', c: 'X; twitter:title, twitter:description ve twitter:image yoksa og etiketlerini kullanır. Ama kart tipini belirleyen twitter:card etiketidir; büyük görselli kart için summary_large_image yazın. Etiket yoksa kart küçük görünebilir ya da hiç oluşmayabilir.' },
      { s: 'og:url ile canonical aynı olmalı mı?', c: 'Genellikle evet. og:url, beğeni, paylaşım ve önizlemenin bağlandığı adrestir. Canonical ile farklıysa (ör. sondaki / farkı ya da bir parametre) etkileşim iki adrese bölünebilir. İkisini de sayfanın tercih edilen adresine ayarlayın.' },
      { s: 'Değiştirdiğim görsel paylaşımda neden hâlâ eski görünüyor?', c: 'Platformlar önizlemeyi önbelleğe alır. Facebook Sharing Debugger ve LinkedIn Post Inspector ile adresi yeniden taratabilirsiniz. Görsel dosyasının adını değiştirmek (ör. kapak-v2.jpg) de önbelleği aşmanın pratik bir yoludur.' },
      { s: 'Araç sayfamı neden getiremiyor?', c: 'Sayfa bot isteklerini engelliyor, giriş gerektiriyor, HTML yerine başka bir içerik döndürüyor ya da çok yavaş yanıt veriyor olabilir. Güvenlik nedeniyle iç ağ adresleri getirilmez. Bu durumda tarayıcıda sayfa kaynağını açıp (Ctrl+U) **HTML yapıştır** sekmesini kullanın. Facebook ve LinkedIn botlarının da aynı engellere takılabileceğini unutmayın.' },
    ],
  }

  const gorselYazi = { yok: t('og:image yok', 'No og:image'), yuklenemedi: t('Görsel yüklenemedi', 'Image could not be loaded') }
  const L = PLATFORM_SINIRLARI
  const ogBaslik = e.og.baslik || alan
  const etiketSatirlari = [
    ['<title>', v.title, true], ['meta description', v.description, true], ['canonical', v.canonical],
    ['og:title', v.og.title, true], ['og:description', v.og.description, true], ['og:image', v.og.image],
    ['og:image:width', v.og.imageWidth], ['og:image:height', v.og.imageHeight], ['og:image:alt', v.og.imageAlt],
    ['og:url', v.og.url], ['og:type', v.og.type], ['og:site_name', v.og.siteName],
    ['twitter:card', v.twitter.card], ['twitter:title', v.twitter.title, true], ['twitter:description', v.twitter.description, true], ['twitter:image', v.twitter.image],
  ]
  const yolParcalari = (() => { try { return new URL(sayfaUrl).pathname.split('/').filter(Boolean).slice(0, 3) } catch { return [] } })()

  return (
    <AracSayfa isEn={isEn} yol="/og-onizleme" yolEn="/en/og-preview" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['schema-yapisal-veri', 'teknik-seo', 'icerik-stratejisi']}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div role="radiogroup" aria-label={t('Giriş yöntemi', 'Input method')} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[['url', t('URL\'den getir', 'Fetch from URL')], ['html', t('HTML yapıştır', 'Paste HTML')]].map(([id, ad]) => (
            <button key={id} type="button" role="radio" aria-checked={mod === id} onClick={() => setMod(id)}
              style={{ ...F.ikincil, ...(mod === id ? { background: 'var(--orange)', color: '#fff', borderColor: 'var(--orange)' } : {}) }}>{ad}</button>
          ))}
        </div>

        {mod === 'url' ? (
          <div>
            <label htmlFor="og-url" style={F.etiket}>{t('Sayfa adresi', 'Page address')}</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input id="og-url" value={url} onChange={ev => setUrl(ev.target.value)} onKeyDown={ev => { if (ev.key === 'Enter') getir() }}
                placeholder="https://www.ornek.com/sayfa" inputMode="url" style={{ ...F.girdi, flex: '1 1 260px', width: 'auto' }} />
              <button type="button" onClick={getir} style={F.buton} disabled={getirDurum?.yukleniyor}>{getirDurum?.yukleniyor ? t('Getiriliyor…', 'Fetching…') : t('Getir', 'Fetch')}</button>
            </div>
            {getirDurum?.hata && <p role="alert" style={{ color: '#b91c1c', fontSize: '13px', margin: '6px 0 0', overflowWrap: 'anywhere' }}>{getirDurum.hata}</p>}
            {getirDurum?.bilgi && <p role="status" style={{ color: '#15803d', fontSize: '13px', margin: '6px 0 0', overflowWrap: 'anywhere' }}>{getirDurum.bilgi}</p>}
            {ornekMi && <p style={{ color: '#888', fontSize: '13px', margin: '6px 0 0' }}>{t('Aşağıda örnek bir sayfanın sonucu gösteriliyor. Kendi adresinizi yazıp Getir\'e basın.', 'Below is the result for a sample page. Enter your own address and press Fetch.')}</p>}
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div>
              <label htmlFor="og-html" style={F.etiket}>{t('Sayfanın HTML kodu (en azından <head> bölümü)', 'Page HTML (at least the <head> section)')}</label>
              <textarea id="og-html" value={html} onChange={ev => setHtml(ev.target.value)} spellCheck={false} rows={12}
                style={{ ...F.girdi, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: '13px', lineHeight: 1.6, resize: 'vertical' }} />
            </div>
            <div>
              <label htmlFor="og-html-url" style={F.etiket}>{t('Sayfa adresi (göreli adresleri çözmek için, isteğe bağlı)', 'Page address (to resolve relative URLs, optional)')}</label>
              <input id="og-html-url" value={htmlUrl} onChange={ev => setHtmlUrl(ev.target.value)} placeholder="https://www.ornek.com/sayfa" style={F.girdi} />
            </div>
            <p style={{ color: '#888', fontSize: '12.5px', margin: 0 }}>{t('Yapıştırılan kod yalnızca tarayıcınızda işlenir, sunucuya gönderilmez. Görseller ise önizleme için doğrudan kendi adreslerinden yüklenir.', 'Pasted code is processed only in your browser and is not sent to the server. Images are loaded directly from their own addresses for the preview.')}</p>
          </div>
        )}

        <div aria-live="polite">
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 4px' }}>{t('Önizlemeler', 'Previews')}{ornekMi ? t(' (örnek)', ' (sample)') : ''}</h2>
          <p style={{ color: '#888', fontSize: '12.5px', margin: '0 0 14px' }}>{t('Temsilîdir: platform arayüzleri ve kesme noktaları cihaza ve sürüme göre değişir, karakter sınırları yaklaşıktır.', 'Illustrative only: platform layouts and cut-off points vary by device and version, and character limits are approximate.')}</p>

          <div className="og-izgara" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '22px' }}>
            <Onizleme ad="WhatsApp">
              <div style={{ background: '#efeae2', borderRadius: '12px', padding: '16px 14px', fontFamily: SISTEM_FONT }}>
                <div style={{ background: '#d9fdd3', borderRadius: '8px', padding: '4px', maxWidth: '330px', marginLeft: 'auto', boxShadow: '0 1px 0.5px rgba(11,20,26,.13)' }}>
                  <div style={{ background: 'rgba(11,20,26,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                    <Gorsel key={e.og.gorsel} src={e.og.gorsel} {...gorselYazi} />
                    <div style={{ padding: '6px 8px 8px' }}>
                      <div style={{ ...satirKes(2), fontSize: '13.5px', fontWeight: 600, color: '#111b21', lineHeight: 1.35 }}>{kisalt(ogBaslik, L.whatsapp.baslik)}</div>
                      {e.og.aciklama && <div style={{ ...satirKes(2), fontSize: '12.5px', color: '#667781', lineHeight: 1.35, marginTop: '2px' }}>{kisalt(e.og.aciklama, L.whatsapp.aciklama)}</div>}
                      <div style={{ fontSize: '12px', color: '#8696a0', marginTop: '3px' }}>{alan}</div>
                    </div>
                  </div>
                  <div style={{ padding: '6px 4px 0', fontSize: '13.5px', color: '#027eb5', overflowWrap: 'anywhere' }}>{sayfaUrl || `https://${alan}`}</div>
                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#667781', padding: '0 4px 2px' }}>12:00 ✓✓</div>
                </div>
              </div>
            </Onizleme>

            <Onizleme ad="LinkedIn">
              <div style={{ background: '#fff', border: '1px solid #e0dfdc', borderRadius: '10px', overflow: 'hidden', fontFamily: SISTEM_FONT }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px 14px 10px' }}>
                  <span aria-hidden="true" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dbe7f0', flexShrink: 0 }} />
                  <div style={{ lineHeight: 1.3 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,.9)' }}>{t('Ad Soyad', 'Jane Doe')}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(0,0,0,.6)' }}>{t('1 sa', '1h')} · 🌐</div>
                  </div>
                </div>
                <Gorsel key={e.og.gorsel} src={e.og.gorsel} {...gorselYazi} />
                <div style={{ background: '#eef3f8', padding: '10px 14px' }}>
                  <div style={{ ...satirKes(2), fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,.9)', lineHeight: 1.35 }}>{kisalt(ogBaslik, L.linkedin.baslik)}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(0,0,0,.6)', marginTop: '2px' }}>{alan}</div>
                </div>
              </div>
            </Onizleme>

            <Onizleme ad={`X (Twitter) · ${e.x.kart === 'buyuk' ? 'summary_large_image' : 'summary'}`}>
              <div style={{ fontFamily: SISTEM_FONT }}>
                {e.x.kart === 'buyuk' ? (
                  <>
                    <div style={{ position: 'relative', border: '1px solid #cfd9de', borderRadius: '16px', overflow: 'hidden' }}>
                      <Gorsel key={e.x.gorsel} src={e.x.gorsel} {...gorselYazi} />
                      <span style={{ position: 'absolute', left: '12px', bottom: '12px', maxWidth: 'calc(100% - 24px)', background: 'rgba(0,0,0,0.77)', color: '#fff', fontSize: '13px', padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{kisalt(e.x.baslik || alan, L.x.baslik)}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#536471', marginTop: '4px' }}>{t(`${alan} adresinden`, `From ${alan}`)}</div>
                  </>
                ) : (
                  <div style={{ display: 'flex', border: '1px solid #cfd9de', borderRadius: '16px', overflow: 'hidden', minHeight: '120px' }}>
                    <div style={{ width: '120px', flexShrink: 0, borderRight: '1px solid #cfd9de' }}>
                      <Gorsel key={e.x.gorsel} src={e.x.gorsel} oran="1 / 1" {...gorselYazi} stil={{ height: '100%' }} />
                    </div>
                    <div style={{ padding: '10px 12px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px' }}>
                      <div style={{ fontSize: '14px', color: '#536471' }}>{alan}</div>
                      <div style={{ ...satirKes(1), fontSize: '14px', color: '#0f1419' }}>{kisalt(e.x.baslik || alan, L.x.baslik)}</div>
                      {e.x.aciklama && <div style={{ ...satirKes(2), fontSize: '14px', color: '#536471', lineHeight: 1.35 }}>{kisalt(e.x.aciklama, L.x.aciklama)}</div>}
                    </div>
                  </div>
                )}
                {!v.twitter.card && <div style={{ fontSize: '12px', color: '#b45309', marginTop: '6px' }}>{t('twitter:card olmadığı için X\'in nasıl bir kart göstereceği belirsiz; burada küçük kart varsayıldı.', 'Without twitter:card the card X shows is uncertain; a small card is assumed here.')}</div>}
              </div>
            </Onizleme>

            <Onizleme ad="Facebook">
              <div style={{ border: '1px solid #dddfe2', borderRadius: '8px', overflow: 'hidden', fontFamily: SISTEM_FONT, background: '#fff' }}>
                <Gorsel key={e.og.gorsel} src={e.og.gorsel} {...gorselYazi} />
                <div style={{ background: '#f0f2f5', padding: '10px 12px', borderTop: '1px solid #dddfe2' }}>
                  <div style={{ fontSize: '12px', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.2px' }}>{alan}</div>
                  <div style={{ ...satirKes(2), fontSize: '16px', fontWeight: 600, color: '#050505', lineHeight: 1.3, margin: '3px 0 2px' }}>{kisalt(ogBaslik, L.facebook.baslik)}</div>
                  {e.og.aciklama && <div style={{ ...satirKes(1), fontSize: '14px', color: '#65676b' }}>{kisalt(e.og.aciklama, L.facebook.aciklama)}</div>}
                </div>
              </div>
            </Onizleme>
          </div>

          <div style={{ marginTop: '22px' }}>
            <Onizleme ad={t('Google (masaüstü, yaklaşık)', 'Google (desktop, approximate)')}>
              <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '18px 20px', maxWidth: '652px', fontFamily: 'Arial, sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span aria-hidden="true" style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#f1f3f4', border: '1px solid #e5e5e5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#5f6368', flexShrink: 0 }}>{(alan[0] || '•').toUpperCase()}</span>
                  <div style={{ minWidth: 0, lineHeight: 1.3 }}>
                    <div style={{ fontSize: '14px', color: '#202124', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.og.siteName || alan}</div>
                    <div style={{ fontSize: '12px', color: '#4d5156', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>https://{alan}{yolParcalari.map(p => ` › ${p}`).join('')}</div>
                  </div>
                </div>
                <div style={{ fontSize: '20px', lineHeight: 1.3, color: '#1a0dab', marginBottom: '4px', overflowWrap: 'anywhere' }}>{kisalt(e.google.baslik, L.google.baslik) || t('(başlık yok)', '(no title)')}</div>
                <div style={{ fontSize: '14px', lineHeight: 1.58, color: '#4d5156', overflowWrap: 'anywhere' }}>{kisalt(e.google.aciklama, L.google.aciklama) || t('(açıklama yok, Google sayfa içeriğinden bir parça gösterir)', '(no description; Google shows a passage from the page)')}</div>
              </div>
            </Onizleme>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{t('Kontrol listesi', 'Checklist')}</h2>
          {sorunlar.length === 0 ? (
            <p style={{ color: '#15803d', fontSize: '14px', margin: 0 }}>{t('✓ Temel paylaşım etiketlerinin hepsi yerinde.', '✓ All the basic sharing tags are in place.')}</p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>
              {sorunlar.map((s, i) => {
                const r = SEVIYE_RENK[s.seviye]
                return (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: r.zemin, borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', color: '#333', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', background: r.renk, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>{r.isaret}</span>
                    <span><span className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{s.seviye === 'hata' ? t('Hata', 'Error') : s.seviye === 'uyari' ? t('Uyarı', 'Warning') : t('Öneri', 'Tip')}. </span>{sorunMetni(s)}</span>
                  </li>
                )
              })}
            </ul>
          )}
          {v.ogGorselSayisi > 1 && <p style={{ fontSize: '12.5px', color: '#666', margin: '8px 0 0' }}>{t(`Sayfada ${v.ogGorselSayisi} og:image var; platformlar genellikle ilkini kullanır.`, `The page has ${v.ogGorselSayisi} og:image tags; platforms usually use the first one.`)}</p>}
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{t('Bulunan etiketler', 'Tags found')}</h2>
          <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px' }}>
              <tbody>
                {etiketSatirlari.map(([ad, deger, say]) => (
                  <tr key={ad}>
                    <th scope="row" style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #f0ece6', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontWeight: 600, color: '#333', whiteSpace: 'nowrap', verticalAlign: 'top', background: '#faf9f7' }}>{ad}</th>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6', color: deger ? '#222' : '#aaa', wordBreak: 'break-word' }}>
                      {deger || t('yok', 'missing')}
                      {deger && say ? <span style={{ color: '#999', marginLeft: '6px' }}>({[...deger].length})</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: 0 }}>{t('Önerilen etiketler', 'Recommended tags')}</h2>
            <button type="button" onClick={kopyala} style={F.ikincil}>{kopyalandi ? t('Kopyalandı ✓', 'Copied ✓') : t('Kopyala', 'Copy')}</button>
          </div>
          <pre style={F.kod}>{onerilen}</pre>
          <p style={{ fontSize: '12.5px', color: '#666', margin: '8px 0 0', lineHeight: 1.6 }}>{t(`Mevcut değerler korunur, eksikler yer tutucuyla doldurulur. Görseli ${ONERILEN_GORSEL.genislik}×${ONERILEN_GORSEL.yukseklik} piksel hazırlayın ve önemli içeriği ortada tutun. Yazı başlığınız uzunsa og:title için marka ekisiz, kısa bir sürüm kullanabilirsiniz.`, `Existing values are kept and missing ones get placeholders. Prepare the image at ${ONERILEN_GORSEL.genislik}×${ONERILEN_GORSEL.yukseklik} px and keep key content in the centre. If your page title is long, use a shorter version without the brand suffix for og:title.`)}</p>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@media (max-width: 760px){.og-izgara{grid-template-columns:minmax(0,1fr)!important}}' }} />
    </AracSayfa>
  )
}
