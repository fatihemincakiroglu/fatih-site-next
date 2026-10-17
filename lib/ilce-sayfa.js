// ─────────────────────────────────────────────────────────────
// İlçe sayfası (SEO ve GEO) blok üretici — ortak.
// Veri: lib/seo-konum/ilceler.json ve lib/geo-konum/ilceler-icerik.json
// Alanlar: alt, desc, giris[], pazar{baslik,paragraflar[]},
// bolgeler{baslik,giris,maddeler[]}, tablo{baslik,giris,basliklar[],satirlar[][]},
// senaryo{baslik,paragraflar[]}, plan{baslik,adimlar[]}, hatalar{baslik,maddeler[]},
// kapanis, komsular[], sss[{s,c}]
// Blok tipleri pages/[konum].js içindeki <Blok> ile aynıdır: p, h2, h3, ul, ol, table.
// ─────────────────────────────────────────────────────────────
import { KONUMLAR } from './geo-konum/ilceler'

const adBul = (slug) => (KONUMLAR.find(k => k.slug === slug) || {}).ad
const ETIKET = { seo: 'SEO Uzmanı', geo: 'GEO Uzmanı' }

/**
 * @param k     KONUMLAR kaydı (slug, ad)
 * @param v     ilçe içerik kaydı
 * @param tip   'seo' | 'geo'
 * @param gecerliSluglar  komşu linki verilebilecek sayfa slug'ları (ör. 'kartal-seo-uzmani')
 */
export function ilceSayfasi(k, v, tip, gecerliSluglar) {
  const ek = tip === 'geo' ? 'geo-uzmani' : 'seo-uzmani'
  const h1 = `${k.ad} ${ETIKET[tip]}`
  const bloklar = []
  const p = (x) => bloklar.push({ t: 'p', x })
  const h2 = (x) => bloklar.push({ t: 'h2', x })

  v.giris.forEach(p)

  h2(v.pazar.baslik)
  v.pazar.paragraflar.forEach(p)

  h2(v.bolgeler.baslik)
  p(v.bolgeler.giris)
  bloklar.push({ t: 'ul', x: v.bolgeler.maddeler })

  h2(v.tablo.baslik)
  p(v.tablo.giris)
  bloklar.push({ t: 'table', x: { basliklar: v.tablo.basliklar, satirlar: v.tablo.satirlar } })

  h2(v.senaryo.baslik)
  v.senaryo.paragraflar.forEach(p)

  h2(v.plan.baslik)
  bloklar.push({ t: 'ol', x: v.plan.adimlar })

  h2(v.hatalar.baslik)
  bloklar.push({ t: 'ul', x: v.hatalar.maddeler })

  p(v.kapanis)

  // Yakın ilçeler: hem kullanıcıya hem tarayıcılara komşu sayfaları gösterir.
  const komsular = (v.komsular || [])
    .map(s => ({ slug: s, ad: adBul(s) }))
    .filter(x => x.ad && gecerliSluglar.includes(`${x.slug}-${ek}`))
  if (komsular.length) {
    bloklar.push({ t: 'h3', x: `${k.ad} çevresindeki ilçeler` })
    bloklar.push({ t: 'ul', x: komsular.map(x => `[${x.ad} ${ETIKET[tip]}](/${x.slug}-${ek})`) })
  }

  return {
    meta: { title: `${h1} | Fatih Emin Çakıroğlu`, h1, desc: v.desc },
    alt: v.alt,
    bloklar,
    sss: v.sss,
  }
}
