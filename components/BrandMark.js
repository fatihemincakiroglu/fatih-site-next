// ─────────────────────────────────────────────────────────────
// Marka rozetleri
//
// NOT (önemli): Burada markaların GERÇEK logoları kullanılmıyor.
// Her marka için, markanın kendi renginde sade bir monogram/simge
// üretiliyor. Sebebi:
//   • Logolar tescilli markadır; her birinin kendi kullanım kılavuzu
//     (boyut, boşluk, renk, arka plan) vardır ve izinsiz kullanım
//     özellikle "iş ortağı" izlenimi verecek şekilde sorun yaratabilir.
//   • Onlarca PNG/SVG dosyası sayfa ağırlığı ve bakım yükü demek.
//
// Gerçek logoları kullanmak isterseniz: her markanın basın/brand kitinden
// SVG'yi indirip public/images/brands/ altına koyun ve aşağıdaki
// `logo` alanına dosya yolunu yazın; bileşen otomatik olarak monogram
// yerine dosyayı gösterir.
// ─────────────────────────────────────────────────────────────

export const BRANDS = {
  google:        { isim: 'Google',            kisa: 'G', renk: '#4285f4', not: 'Search & AI Overview' },
  googlePartner: { isim: 'Google Partner',    kisa: 'G', renk: '#34a853', not: 'Partner' },
  gsc:           { isim: 'Search Console',    kisa: '↗', renk: '#ea4335', not: 'Analytics' },
  chatgpt:       { isim: 'ChatGPT',           kisa: '✦', renk: '#10a37f', not: 'OpenAI Search' },
  perplexity:    { isim: 'Perplexity',        kisa: '◈', renk: '#20808d', not: 'Answer Engine' },
  claude:        { isim: 'Claude',            kisa: '✳', renk: '#d97757', not: 'Anthropic' },
  gemini:        { isim: 'Gemini',            kisa: '✧', renk: '#9334e6', not: 'Google AI' },
  bing:          { isim: 'Bing',              kisa: '⬡', renk: '#0078d4', not: 'Copilot AI' },
  ahrefs:        { isim: 'Ahrefs',            kisa: 'A', renk: '#f96332', not: 'SEO Data' },
  semrush:       { isim: 'SEMrush',           kisa: 'S', renk: '#ff642d', not: 'SEO Suite' },
  seomonitor:    { isim: 'SEOmonitor',        kisa: 'M', renk: '#00b3a4', not: 'Rank Tracking' },
  screamingfrog: { isim: 'Screaming Frog',    kisa: 'F', renk: '#7ac143', not: 'Crawler' },
  metaBusiness:  { isim: 'Meta Business',     kisa: '∞', renk: '#0866ff', not: 'Ads' },
  sel:           { isim: 'Search Engine Land', kisa: 'L', renk: '#0891b2', not: 'Yayın' },
  ahrefsBlog:    { isim: 'Ahrefs Blog',       kisa: 'A', renk: '#f96332', not: 'Yayın' },
  semrushAcademy:{ isim: 'SEMrush Academy',   kisa: 'S', renk: '#ff642d', not: 'Eğitim' },
}

/**
 * Tek bir marka simgesi.
 * @param {string} id     BRANDS içindeki anahtar
 * @param {number} boyut  piksel cinsinden kare kenarı
 */
export function BrandMark({ id, boyut = 30 }) {
  const b = BRANDS[id]
  if (!b) return null

  if (b.logo) {
    return (
      <img
        src={b.logo}
        alt={b.isim}
        width={boyut}
        height={boyut}
        loading="lazy"
        style={{ width: boyut, height: boyut, objectFit: 'contain', display: 'block' }}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      style={{
        width: boyut,
        height: boyut,
        flexShrink: 0,
        borderRadius: Math.round(boyut * 0.3),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(boyut * 0.46),
        fontWeight: 800,
        lineHeight: 1,
        color: b.renk,
        background: `${b.renk}1a`,
        border: `1px solid ${b.renk}33`,
        fontFamily: 'var(--font-body)',
      }}
    >
      {b.kisa}
    </span>
  )
}

export default BrandMark
