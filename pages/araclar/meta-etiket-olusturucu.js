import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { SINIRLAR, genislik, kisalt as pikselKisalt, durum, gorunenUrl } from '../../lib/serp-olcum'
import { metaUret, kontrolEt, etkinDegerler, OG_TURLERI, TWITTER_KARTLARI, VARSAYILAN_VIEWPORT, BOS_FORM, ORNEK_FORM_TR, ORNEK_FORM_EN } from '../../lib/meta-etiket'

// Meta etiket oluşturucu: tamamen tarayıcıda çalışır, hiçbir veri gönderilmez.
// TR: /meta-etiket-olusturucu   EN: /en/meta-tag-generator
// Piksel genişliği lib/serp-olcum.js ile tarayıcıda canvas üzerinden ölçülür (SERP önizleme aracıyla aynı).

const RENK = { bos: '#9ca3af', iyi: '#15803d', sinirda: '#b45309', uzun: '#b91c1c' }
const SEVIYE_RENK = {
  hata: { renk: '#b91c1c', zemin: '#fef2f2', isaret: '✗' },
  uyari: { renk: '#b45309', zemin: '#fffbeb', isaret: '!' },
  bilgi: { renk: '#1d4ed8', zemin: '#eff6ff', isaret: 'i' },
}
const SISTEM_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
const satirKes = (n) => ({ display: '-webkit-box', WebkitLineClamp: n, WebkitBoxOrient: 'vertical', overflow: 'hidden', overflowWrap: 'anywhere' })

function Cubuk({ px, sinir, isEn }) {
  const d = durum(px, sinir)
  const oran = Math.min(1.25, px / sinir)
  const metin = { bos: isEn ? 'empty' : 'boş', iyi: isEn ? 'fits' : 'sığıyor', sinirda: isEn ? 'at the limit' : 'sınırda', uzun: isEn ? 'likely truncated' : 'büyük ihtimalle kesilir' }[d]
  return (
    <div style={{ marginTop: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '12px', color: RENK[d], fontWeight: 700, marginBottom: '3px' }}>{px} / ~{sinir} px · {metin}</div>
      <div style={{ position: 'relative', height: '6px', background: '#f0ece6', borderRadius: '3px', overflow: 'hidden' }} aria-hidden="true">
        <div style={{ width: `${(oran / 1.25) * 100}%`, height: '100%', background: RENK[d], borderRadius: '3px' }} />
        <div style={{ position: 'absolute', left: `${100 / 1.25}%`, top: 0, bottom: 0, width: '2px', background: '#111', opacity: 0.35 }} />
      </div>
    </div>
  )
}

function Gorsel({ src, yok, yuklenemedi }) {
  const [hata, setHata] = useState(false)
  const kutu = { aspectRatio: '1.91 / 1', width: '100%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '12px', textAlign: 'center', padding: '8px' }
  if (!src || hata || !/^https?:\/\//i.test(src)) return <div style={kutu}>{!src ? yok : yuklenemedi}</div>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" referrerPolicy="no-referrer" loading="lazy" decoding="async" onError={() => setHata(true)}
      style={{ display: 'block', width: '100%', aspectRatio: '1.91 / 1', objectFit: 'cover', background: '#e5e7eb' }} />
  )
}

const bolumBaslik = { fontSize: '13px', fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 10px' }
const kutu = { border: '1px solid #eee', borderRadius: '12px', padding: '16px', display: 'grid', gap: '12px', alignContent: 'start', minWidth: 0 }

export default function MetaEtiketOlusturucu(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const ornek = isEn ? ORNEK_FORM_EN : ORNEK_FORM_TR
  const [f, setF] = useState(ornek)
  const [yorumlar, setYorumlar] = useState(true)
  const [kopyalandi, setKopyalandi] = useState(false)
  const [hazir, setHazir] = useState(false) // canvas ölçümü yalnızca tarayıcıda
  useEffect(() => { setHazir(true) }, [])

  const deg = (k) => (ev) => {
    const v = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    setF(s => ({ ...s, [k]: v }))
  }
  const e = useMemo(() => etkinDegerler(f), [f])
  const html = useMemo(() => metaUret(f, { yorumlar, isEn }), [f, yorumlar, isEn])
  const sorunlar = useMemo(() => kontrolEt(f), [f])

  const M = SINIRLAR.masaustu
  const olc = useMemo(() => {
    if (!hazir) return null
    return {
      bPx: genislik(e.baslik, M.baslik.font),
      aPx: genislik(e.aciklama, M.aciklama.font),
      bKisa: pikselKisalt(e.baslik, M.baslik.font, M.baslik.px),
      aKisa: pikselKisalt(e.aciklama, M.aciklama.font, M.aciklama.px),
    }
  }, [hazir, e.baslik, e.aciklama, M])
  const gu = gorunenUrl(e.canonical || (isEn ? 'https://www.example.com/' : 'https://www.ornek.com/'))
  const alan = gu.alan

  const kopyala = async () => {
    try { await navigator.clipboard.writeText(html); setKopyalandi(true); setTimeout(() => setKopyalandi(false), 1800) } catch { /* pano izni yok */ }
  }

  const sorunMetni = (s) => {
    switch (s.kod) {
      case 'baslik-yok': return t('Başlık (title) boş. Her sayfanın kendine özgü bir başlığı olmalı.', 'The title is empty. Every page needs its own unique title.')
      case 'baslik-uzun': return t(`Başlık ${s.uzunluk} karakter. Genişlik piksele bağlıdır ama yaklaşık ${s.sinir} karakterden uzun başlıklar genellikle kesilir; önemli kelimeleri başa alın.`, `The title is ${s.uzunluk} characters. Width depends on pixels, but titles longer than about ${s.sinir} characters usually get cut off; put the key words first.`)
      case 'baslik-kisa': return t(`Başlık ${s.uzunluk} karakter; sayfanın konusunu ve ayırt edici yanını eklemeyi düşünün.`, `The title is ${s.uzunluk} characters; consider adding the topic and what sets the page apart.`)
      case 'aciklama-yok': return t('Meta açıklama boş. Google bu durumda sayfadan bir parça seçer.', 'The meta description is empty. Google will pick a passage from the page instead.')
      case 'aciklama-uzun': return t(`Açıklama ${s.uzunluk} karakter; yaklaşık ${s.sinir} karakterden sonrası kesilebilir.`, `The description is ${s.uzunluk} characters; text after about ${s.sinir} may be cut off.`)
      case 'aciklama-kisa': return t(`Açıklama ${s.uzunluk} karakter; sayfanın neyi neden sunduğunu bir cümleyle daha açabilirsiniz.`, `The description is ${s.uzunluk} characters; one more sentence could explain what the page offers and why.`)
      case 'canonical-yok': return t('Canonical adres yok. Sayfanın tercih edilen adresini belirtmek için ekleyin (genellikle sayfanın kendi adresi).', 'No canonical URL. Add it to declare the preferred address of the page (usually its own address).')
      case 'canonical-goreli': return t(`Canonical tam adres değil ("${s.deger}"). https:// ile başlayan mutlak adres yazın.`, `The canonical is not a full URL ("${s.deger}"). Use an absolute URL starting with https://.`)
      case 'canonical-http': return t('Canonical http ile başlıyor. Site https ile açılıyorsa https adresi kullanın.', 'The canonical uses http. If the site runs on https, use the https address.')
      case 'canonical-parametre': return t('Canonical adreste ? ya da # var. Genellikle parametresiz temiz adres tercih edilir.', 'The canonical contains ? or #. A clean address without parameters is usually preferred.')
      case 'noindex': return t('noindex seçili: sayfa Google dizinine eklenmez. Bilerek mi seçtiniz?', 'noindex is selected: the page will not be indexed by Google. Is that intended?')
      case 'noindex-canonical': return t('noindex ile canonical birlikte kullanılıyor. Canonical başka bir adresi gösteriyorsa bu çelişkili bir sinyaldir; genellikle ikisinden biri yeterli.', 'noindex and canonical are used together. If the canonical points to another URL, the signals conflict; usually one of them is enough.')
      case 'nofollow': return t('nofollow seçili: sayfadaki hiçbir link takip edilmez. Çoğu sayfada gerekmez.', 'nofollow is selected: no links on the page will be followed. Most pages do not need this.')
      case 'og-gorsel-yok': return t('og:image yok. Paylaşımlar görselsiz ya da rastgele seçilen bir görselle çıkar; 1200×630 piksel bir görsel önerilir.', 'og:image is missing. Shares appear without an image or with a random one; a 1200×630 px image is recommended.')
      case 'og-gorsel-goreli': return t(`og:image tam adres değil ("${s.deger}"). Platformlar https:// ile başlayan mutlak adres ister.`, `og:image is not a full URL ("${s.deger}"). Platforms expect an absolute URL starting with https://.`)
      case 'og-gorsel-http': return t('og:image http ile başlıyor; bazı platformlar güvensiz görseli göstermez.', 'og:image uses http; some platforms will not show insecure images.')
      case 'og-gorsel-alt-yok': return t('og:image:alt yok. Ekran okuyucu kullananlar için görseli kısaca tarif edin.', 'og:image:alt is missing. Describe the image briefly for screen reader users.')
      case 'og-url-goreli': return t(`og:url tam adres değil ("${s.deger}").`, `og:url is not a full URL ("${s.deger}").`)
      case 'og-url-canonical-farkli': return t('og:url canonical adresle aynı değil. Paylaşımlar iki adrese bölünebilir; ikisini de tercih edilen adrese ayarlayın.', 'og:url differs from the canonical. Shares may be split across two addresses; set both to the preferred address.')
      case 'og-site-adi-yok': return t('og:site_name yok. Marka adını gösterir; Google da site adını belirlerken kullanabilir.', 'og:site_name is missing. It shows your brand name, and Google may use it for the site name.')
      case 'og-locale-bicim': return t(`og:locale biçimi tanınmadı ("${s.deger}"). tr_TR ya da en_US gibi yazın.`, `og:locale format not recognised ("${s.deger}"). Use a value like en_US or tr_TR.`)
      case 'twitter-buyuk-gorselsiz': return t('twitter:card summary_large_image ama görsel yok. Görsel ekleyin ya da summary seçin.', 'twitter:card is summary_large_image but there is no image. Add an image or choose summary.')
      case 'twitter-site-bicim': return t(`twitter:site geçerli bir kullanıcı adı gibi görünmüyor ("${s.deger}"). @ ve en fazla 15 harf, rakam ya da alt çizgi.`, `twitter:site does not look like a valid handle ("${s.deger}"). Use @ and up to 15 letters, digits or underscores.`)
      case 'tema-rengi-bicim': return t(`theme-color değeri tanınmadı ("${s.deger}"). #e8560a gibi bir renk kodu yazın.`, `theme-color value not recognised ("${s.deger}"). Use a colour code like #e8560a.`)
      case 'viewport-yok': return t('viewport boş. Mobil uyumlu bir sayfa için gerekli.', 'viewport is empty. It is required for a mobile friendly page.')
      case 'viewport-genislik': return t('viewport width=device-width içermiyor; sayfa mobilde masaüstü genişliğinde açılabilir.', 'viewport does not contain width=device-width; the page may render at desktop width on mobile.')
      case 'viewport-yakinlastirma': return t('viewport yakınlaştırmayı engelliyor (user-scalable=no ya da maximum-scale=1). Erişilebilirlik için kaldırın.', 'viewport blocks zooming (user-scalable=no or maximum-scale=1). Remove it for accessibility.')
      default: return s.kod
    }
  }

  const icerik = isEn ? {
    baslik: 'Meta Tag Generator',
    metaBaslik: 'Meta Tag Generator | Free SEO Tool',
    metaDesc: 'Generate title, meta description, canonical, robots, Open Graph and Twitter tags. Check pixel width, preview the result and copy the HTML.',
    giris: 'Fill in the form to get ready-to-paste HTML for the title, meta description, canonical, robots, Open Graph and X (Twitter) tags, theme-color and viewport. Title and description width is measured in pixels, and you see a Google result and a share card as you type. Everything runs in your browser. To test a live page use the [SERP preview](/en/serp-preview) and [Open Graph preview](/en/og-preview) tools; for writing rules see [meta title and description guidelines](/en/meta-baslik-aciklama-kurallari).',
    adimlar: [
      'Write the title, meta description and canonical URL. The bars show whether the text is likely to fit in Google on desktop.',
      'Choose robots settings. "index, follow" is the default and needs no tag, so the tool only writes robots when you change something or enable max-image-preview.',
      'Add the share image and, if you want, separate og:title and og:description. Empty Open Graph fields fall back to the title, description and canonical.',
      'Fix the items in the checklist, copy the generated HTML and paste it inside the <head> of your page or into the matching fields of your CMS or SEO plugin.',
    ],
    sss: [
      { s: 'Which meta tags actually matter?', c: 'For search: a unique title, a meta description, a canonical URL, robots when you need noindex or nofollow, and viewport for mobile. For sharing: og:title, og:description, og:image and twitter:card. The meta keywords tag is ignored by Google, so this tool does not generate it.' },
      { s: 'How long should the title and description be?', c: 'Google does not publish a character limit; it truncates by pixel width. About 580 px for the title and about 920 px for the description on desktop are common working limits, which the bars measure. The writing side is covered in [meta title and description guidelines](/en/meta-baslik-aciklama-kurallari), and you can test a live page with the [SERP preview](/en/serp-preview).' },
      { s: 'Should I add "index, follow"?', c: 'It is not needed; indexing and following links is the default. Use noindex only for pages you do not want in search results, and do not combine it with a canonical pointing to another page. max-image-preview:large allows large image previews in results and Discover, which is why it is enabled by default.' },
      { s: 'What is the difference between og tags and the title?', c: 'The title and meta description are used by Google. Open Graph tags decide how the page looks when it is shared on Facebook, LinkedIn, WhatsApp and X. You can write a shorter, more social og:title without the brand suffix; if you leave it empty, the tool uses the title. To see how a live page is shared, use the [Open Graph preview](/en/og-preview).' },
      { s: 'What are theme-color and viewport?', c: 'theme-color sets the colour of the browser bar in some mobile browsers; it is cosmetic and not an SEO signal. viewport tells mobile browsers to use the device width; "width=device-width, initial-scale=1" is the standard value. Do not block zooming with user-scalable=no, because it hurts accessibility.' },
      { s: 'How should the canonical be written?', c: 'As a full, absolute URL with https, usually pointing to the page itself (self-referencing). Use the clean address without tracking parameters, and keep it consistent with internal links, the sitemap and og:url. Google treats the canonical as a strong hint, not a command.' },
    ],
  } : {
    baslik: 'Meta Etiket Oluşturucu',
    metaBaslik: 'Meta Etiket Oluşturucu | Ücretsiz SEO Aracı',
    metaDesc: 'Title, meta description, canonical, robots, Open Graph ve Twitter etiketlerini oluşturun. Piksel genişliğini ölçün, önizleyin ve kodu kopyalayın.',
    giris: 'Formu doldurun; title, meta description, canonical, robots, Open Graph ve X (Twitter) etiketleri, theme-color ve viewport için yapıştırmaya hazır HTML alın. Başlık ve açıklama genişliği pikselle ölçülür, yazarken Google sonucunu ve paylaşım kartını görürsünüz. Her şey tarayıcınızda çalışır. Canlı bir sayfayı test etmek için [SERP önizleme](/serp-onizleme) ve [Open Graph önizleme](/og-onizleme) araçlarını, yazım kuralları için [meta başlık ve açıklama kuralları yazısını](/meta-baslik-aciklama-kurallari) kullanın.',
    adimlar: [
      'Başlığı, meta açıklamayı ve canonical adresi yazın. Çubuklar metnin masaüstünde Google\'a sığıp sığmayacağını gösterir.',
      'Robots ayarlarını seçin. "index, follow" varsayılandır ve etiket gerektirmez; araç robots etiketini yalnızca bir şeyi değiştirdiğinizde ya da max-image-preview açıkken yazar.',
      'Paylaşım görselini ve isterseniz ayrı og:title ve og:description ekleyin. Boş Open Graph alanları başlık, açıklama ve canonical ile doldurulur.',
      'Kontrol listesindeki maddeleri düzeltin, üretilen HTML\'i kopyalayıp sayfanızın <head> bölümüne ya da CMS veya SEO eklentinizin ilgili alanlarına yapıştırın.',
    ],
    sss: [
      { s: 'Hangi meta etiketler gerçekten önemli?', c: 'Arama için: sayfaya özgü bir title, meta description, canonical adres, noindex ya da nofollow gerektiğinde robots ve mobil için viewport. Paylaşım için: og:title, og:description, og:image ve twitter:card. meta keywords etiketi Google tarafından yok sayılır; bu yüzden araç onu üretmez.' },
      { s: 'Başlık ve açıklama kaç karakter olmalı?', c: 'Google resmi bir karakter sınırı yayınlamaz; metni piksel genişliğine göre keser. Masaüstünde başlık için yaklaşık 580, açıklama için yaklaşık 920 piksel yaygın çalışma sınırlarıdır ve çubuklar bunu ölçer. Yazım tarafı [meta başlık ve açıklama kuralları yazısında](/meta-baslik-aciklama-kurallari) anlatılıyor; canlı bir sayfayı [SERP önizleme aracıyla](/serp-onizleme) test edebilirsiniz.' },
      { s: '"index, follow" etiketini yazmalı mıyım?', c: 'Gerek yok; dizine ekleme ve linkleri takip etme zaten varsayılandır. noindex\'i yalnızca arama sonuçlarında görünmesini istemediğiniz sayfalarda kullanın ve başka bir sayfayı gösteren canonical ile birlikte kullanmayın. max-image-preview:large sonuçlarda ve Discover\'da büyük görsel önizlemesine izin verir; bu yüzden varsayılan olarak açıktır.' },
      { s: 'og etiketleri ile title arasındaki fark nedir?', c: 'Title ve meta description Google tarafından kullanılır. Open Graph etiketleri ise sayfanın Facebook, LinkedIn, WhatsApp ve X\'te paylaşıldığında nasıl görüneceğini belirler. og:title için marka ekisiz, daha kısa ve sosyal medyaya uygun bir başlık yazabilirsiniz; boş bırakırsanız araç title\'ı kullanır. Canlı bir sayfanın paylaşım görünümü için [Open Graph önizleme aracına](/og-onizleme) bakın.' },
      { s: 'theme-color ve viewport nedir?', c: 'theme-color bazı mobil tarayıcılarda adres çubuğunun rengini belirler; görseldir, SEO sinyali değildir. viewport mobil tarayıcılara cihaz genişliğini kullanmalarını söyler; standart değer "width=device-width, initial-scale=1" olur. user-scalable=no ile yakınlaştırmayı engellemeyin, erişilebilirliği bozar.' },
      { s: 'Canonical nasıl yazılmalı?', c: 'https ile başlayan tam ve mutlak bir adres olarak, genellikle sayfanın kendisini gösterecek şekilde (self-referencing). İzleme parametresi olmayan temiz adresi kullanın; iç linkler, site haritası ve og:url ile tutarlı olsun. Google canonical\'ı bir komut değil güçlü bir ipucu olarak değerlendirir.' },
    ],
  }

  const girdi = (k, ad, { ph = '', tip = 'text', not, satir, mono } = {}) => (
    <div>
      <label htmlFor={`me-${k}`} style={F.etiket}>{ad}</label>
      {satir
        ? <textarea id={`me-${k}`} value={f[k]} onChange={deg(k)} rows={satir} placeholder={ph} style={{ ...F.girdi, resize: 'vertical', lineHeight: 1.6 }} />
        : <input id={`me-${k}`} type={tip} value={f[k]} onChange={deg(k)} placeholder={ph} inputMode={tip === 'url' ? 'url' : undefined} style={{ ...F.girdi, ...(mono ? { fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: '13px' } : {}) }} />}
      {not && <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{not}</div>}
    </div>
  )
  const secim = (ad, ad2, k, ev, hayir) => (
    <div role="radiogroup" aria-label={ad} style={{ display: 'flex', gap: '6px' }}>
      {[[true, ev], [false, hayir]].map(([v, l]) => (
        <button key={l} type="button" role="radio" aria-checked={f[k] === v} onClick={() => setF(s => ({ ...s, [k]: v }))}
          style={{ ...F.ikincil, padding: '8px 12px', fontSize: '13px', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', ...(f[k] === v ? { background: 'var(--orange)', color: '#fff', borderColor: 'var(--orange)' } : {}) }}>{l}</button>
      ))}
      <span style={{ fontSize: '12px', color: '#888', alignSelf: 'center' }}>{ad2}</span>
    </div>
  )

  return (
    <AracSayfa isEn={isEn} yol="/meta-etiket-olusturucu" yolEn="/en/meta-tag-generator" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['teknik-seo', 'icerik-stratejisi', 'schema-yapisal-veri']}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button type="button" style={F.ikincil} onClick={() => setF(ornek)}>{t('Örnek değerler', 'Sample values')}</button>
          <button type="button" style={F.ikincil} onClick={() => setF({ ...BOS_FORM, ogLocale: isEn ? 'en_US' : 'tr_TR' })}>{t('Formu temizle', 'Clear form')}</button>
        </div>

        <div className="me-izgara" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
          <section style={kutu} aria-labelledby="me-temel">
            <h2 id="me-temel" style={bolumBaslik}>{t('Arama', 'Search')}</h2>
            <div>
              {girdi('baslik', <>{t('Başlık (title)', 'Title')} <span style={{ color: '#999', fontWeight: 400 }}>· {[...e.baslik].length} {t('karakter', 'characters')}</span></>, { ph: t('Sayfa başlığı | Marka', 'Page title | Brand') })}
              {olc && <Cubuk px={olc.bPx} sinir={M.baslik.px} isEn={isEn} />}
            </div>
            <div>
              {girdi('aciklama', <>{t('Meta açıklama', 'Meta description')} <span style={{ color: '#999', fontWeight: 400 }}>· {[...e.aciklama].length} {t('karakter', 'characters')}</span></>, { satir: 3, ph: t('Sayfanın neyi neden sunduğunu anlatan bir iki cümle', 'One or two sentences on what the page offers and why') })}
              {olc && <Cubuk px={olc.aPx} sinir={M.aciklama.px} isEn={isEn} />}
            </div>
            {girdi('canonical', t('Canonical adres', 'Canonical URL'), { tip: 'url', ph: isEn ? 'https://www.example.com/page' : 'https://www.ornek.com/sayfa' })}
            <div>
              <div style={F.etiket}>robots</div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {secim('index', t('dizine ekleme', 'indexing'), 'index', 'index', 'noindex')}
                {secim('follow', t('linkleri takip', 'link following'), 'follow', 'follow', 'nofollow')}
                <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', color: '#333', cursor: 'pointer' }}>
                  <input type="checkbox" checked={f.buyukGorsel} onChange={deg('buyukGorsel')} style={{ marginTop: '3px', accentColor: 'var(--orange)' }} />
                  <span>max-image-preview:large <span style={{ color: '#888' }}>{t('(büyük görsel önizlemesine izin ver)', '(allow large image previews)')}</span></span>
                </label>
              </div>
            </div>
          </section>

          <section style={kutu} aria-labelledby="me-og">
            <h2 id="me-og" style={bolumBaslik}>Open Graph</h2>
            {girdi('ogBaslik', 'og:title', { ph: e.baslik || t('Boşsa başlık kullanılır', 'Falls back to the title') })}
            {girdi('ogAciklama', 'og:description', { satir: 2, ph: e.aciklama || t('Boşsa meta açıklama kullanılır', 'Falls back to the meta description') })}
            {girdi('ogGorsel', 'og:image', { tip: 'url', ph: 'https://…/paylasim-1200x630.jpg', not: t('Önerilen boyut 1200×630 piksel.', 'Recommended size 1200×630 px.') })}
            {girdi('ogGorselAlt', 'og:image:alt', { ph: t('Görselin kısa tarifi', 'Short description of the image') })}
            {girdi('ogUrl', 'og:url', { tip: 'url', ph: e.canonical || t('Boşsa canonical kullanılır', 'Falls back to the canonical') })}
            <div className="me-iki" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
              <div>
                <label htmlFor="me-ogTur" style={F.etiket}>og:type</label>
                <select id="me-ogTur" value={f.ogTur} onChange={deg('ogTur')} style={F.girdi}>
                  {OG_TURLERI.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
              </div>
              {girdi('ogLocale', 'og:locale', { ph: isEn ? 'en_US' : 'tr_TR', mono: true })}
            </div>
            {girdi('ogSiteAdi', 'og:site_name', { ph: t('Marka adı', 'Brand name') })}
          </section>

          <section style={kutu} aria-labelledby="me-x">
            <h2 id="me-x" style={bolumBaslik}>X (TWITTER)</h2>
            <div className="me-iki" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
              <div>
                <label htmlFor="me-twitterKart" style={F.etiket}>twitter:card</label>
                <select id="me-twitterKart" value={f.twitterKart} onChange={deg('twitterKart')} style={F.girdi}>
                  {TWITTER_KARTLARI.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
              </div>
              {girdi('twitterSite', 'twitter:site', { ph: '@marka' })}
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{t('X, twitter:title, twitter:description ve twitter:image yoksa og etiketlerini kullanır; bu yüzden yalnızca kart tipi ve hesap yazılır.', 'X falls back to og tags when twitter:title, twitter:description and twitter:image are missing, so only the card type and account are written.')}</p>
          </section>

          <section style={kutu} aria-labelledby="me-diger">
            <h2 id="me-diger" style={bolumBaslik}>{t('Tarayıcı', 'Browser')}</h2>
            <div>
              <label htmlFor="me-temaRengi" style={F.etiket}>theme-color</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="color" aria-label={t('Renk seç', 'Pick a colour')} value={/^#[0-9a-f]{6}$/i.test(f.temaRengi) ? f.temaRengi : '#ffffff'} onChange={deg('temaRengi')} style={{ width: '46px', height: '42px', padding: '2px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', cursor: 'pointer' }} />
                <input id="me-temaRengi" value={f.temaRengi} onChange={deg('temaRengi')} placeholder={t('#e8560a (boşsa eklenmez)', '#e8560a (left out if empty)')} style={{ ...F.girdi, fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: '13px' }} />
              </div>
            </div>
            {girdi('viewport', 'viewport', { ph: VARSAYILAN_VIEWPORT, mono: true })}
            <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', color: '#333', cursor: 'pointer' }}>
              <input type="checkbox" checked={yorumlar} onChange={ev => setYorumlar(ev.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--orange)' }} />
              <span>{t('Koda bölüm açıklamaları (HTML yorumu) ekle', 'Add section comments (HTML comments) to the code')}</span>
            </label>
          </section>
        </div>

        <div className="me-izgara" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '18px', alignItems: 'start' }} aria-live="polite">
          <figure style={{ margin: 0, minWidth: 0 }}>
            <figcaption style={{ fontSize: '12.5px', fontWeight: 700, color: '#555', marginBottom: '8px' }}>{t('Google (masaüstü, yaklaşık)', 'Google (desktop, approximate)')}</figcaption>
            <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '18px 20px', fontFamily: 'Arial, sans-serif' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span aria-hidden="true" style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#f1f3f4', border: '1px solid #e5e5e5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#5f6368', flexShrink: 0 }}>{(alan[0] || '•').toUpperCase()}</span>
                <div style={{ minWidth: 0, lineHeight: 1.3 }}>
                  <div style={{ fontSize: '14px', color: '#202124', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.ogSiteAdi || alan}</div>
                  <div style={{ fontSize: '12px', color: '#4d5156', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{gu.tam}{gu.parcalar.map(p => ` › ${p}`).join('')}</div>
                </div>
              </div>
              <div style={{ fontSize: '20px', lineHeight: 1.3, color: '#1a0dab', marginBottom: '4px', overflowWrap: 'anywhere' }}>{(olc ? olc.bKisa.metin : e.baslik) || t('(başlık yok)', '(no title)')}</div>
              <div style={{ fontSize: '14px', lineHeight: 1.58, color: '#4d5156', overflowWrap: 'anywhere' }}>{(olc ? olc.aKisa.metin : e.aciklama) || t('(açıklama yok, Google sayfa içeriğinden bir parça gösterir)', '(no description; Google shows a passage from the page)')}</div>
            </div>
            {!f.index && <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: '#b91c1c' }}>{t('noindex seçili olduğu için bu sayfa arama sonuçlarında görünmez.', 'With noindex selected, this page will not appear in search results.')}</p>}
          </figure>
          <figure style={{ margin: 0, minWidth: 0 }}>
            <figcaption style={{ fontSize: '12.5px', fontWeight: 700, color: '#555', marginBottom: '8px' }}>{t('Paylaşım kartı (Facebook, LinkedIn, yaklaşık)', 'Share card (Facebook, LinkedIn, approximate)')}</figcaption>
            <div style={{ border: '1px solid #dddfe2', borderRadius: '8px', overflow: 'hidden', fontFamily: SISTEM_FONT, background: '#fff', maxWidth: '420px' }}>
              <Gorsel key={e.ogGorsel} src={e.ogGorsel} yok={t('og:image yok', 'No og:image')} yuklenemedi={t('Görsel yüklenemedi', 'Image could not be loaded')} />
              <div style={{ background: '#f0f2f5', padding: '10px 12px', borderTop: '1px solid #dddfe2' }}>
                <div style={{ fontSize: '12px', color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.2px' }}>{gorunenUrl(e.ogUrl || e.canonical || alan).alan}</div>
                <div style={{ ...satirKes(2), fontSize: '16px', fontWeight: 600, color: '#050505', lineHeight: 1.3, margin: '3px 0 2px' }}>{e.ogBaslik || t('(og:title yok)', '(no og:title)')}</div>
                {e.ogAciklama && <div style={{ ...satirKes(1), fontSize: '14px', color: '#65676b' }}>{e.ogAciklama}</div>}
              </div>
            </div>
          </figure>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{t('Kontrol listesi', 'Checklist')}</h2>
          {sorunlar.length === 0 ? (
            <p style={{ color: '#15803d', fontSize: '14px', margin: 0 }}>{t('✓ Temel etiketlerin hepsi yerinde.', '✓ All the basic tags are in place.')}</p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>
              {sorunlar.map((s, i) => {
                const r = SEVIYE_RENK[s.seviye]
                return (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: r.zemin, borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', color: '#333', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', background: r.renk, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>{r.isaret}</span>
                    <span><span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{s.seviye === 'hata' ? t('Hata', 'Error') : s.seviye === 'uyari' ? t('Uyarı', 'Warning') : t('Öneri', 'Tip')}. </span>{sorunMetni(s)}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: 0 }}>{t('HTML kodu', 'HTML code')}</h2>
            <button type="button" onClick={kopyala} style={F.buton}>{kopyalandi ? t('Kopyalandı ✓', 'Copied ✓') : t('Kopyala', 'Copy')}</button>
          </div>
          <pre style={F.kod}>{html}</pre>
          <p style={{ fontSize: '12.5px', color: '#666', margin: '8px 0 0', lineHeight: 1.6 }}>{t('Kodu sayfanızın <head> bölümüne yapıştırın. WordPress gibi bir CMS kullanıyorsanız aynı değerleri SEO eklentinizin alanlarına girin; aynı etiketin iki kez yazılmamasına dikkat edin. Tüm değerler HTML için kaçışlanır.', 'Paste the code into the <head> of your page. If you use a CMS such as WordPress, enter the same values in your SEO plugin instead, and make sure no tag is written twice. All values are HTML escaped.')}</p>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@media (max-width: 760px){.me-izgara,.me-iki{grid-template-columns:minmax(0,1fr)!important}}' }} />
    </AracSayfa>
  )
}
