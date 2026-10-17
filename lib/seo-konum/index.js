// ─────────────────────────────────────────────────────────────
// Yerel SEO uzmanı sayfaları: /kadikoy-seo-uzmani, /tuzla-seo-uzmani ...
//
// • İçerik: lib/seo-konum/ilceler.json — her ilçe için ayrı, özgün metin
//   (semtler, ticari akslar, sektör tablosu, örnek senaryo, 90 günlük plan,
//   sık yapılan hatalar, SSS). Eski şablon içerik (icerik.json) sayfalar
//   arasında ~%80 aynıydı; "doorway page" riski nedeniyle kaldırıldı.
//   Yalnızca getStaticProps içinde okunur; istemci paketine girmez.
// • Konum listesi GEO sayfalarıyla ortaktır: lib/geo-konum/ilceler.js
// • Keşif: TR sitemap + her sayfadaki "yakın ilçeler" bağlantıları.
//
// Yeni ilçe / içerik güncellemesi: ilceler.json'daki ilgili kaydı düzenleyin.
// Alanlar: alt, desc, giris[], pazar{baslik,paragraflar[]},
// bolgeler{baslik,giris,maddeler[]}, tablo{baslik,giris,basliklar[],satirlar[][]},
// senaryo{baslik,paragraflar[]}, plan{baslik,adimlar[]}, hatalar{baslik,maddeler[]},
// kapanis, komsular[], sss[{s,c}]
// ─────────────────────────────────────────────────────────────
import { KONUMLAR } from '../geo-konum/ilceler'

// SEO sayfası üretilmeyen konumlar (KONUMLAR listesi GEO sayfalarıyla ortak).
// • istanbul: /istanbul-seo-uzmani, /seo-uzmani ile aynı sorguyu hedeflediği
//   için kaldırıldı; next.config.mjs'te /seo-uzmani'ye 301 ile yönleniyor.
const SEO_SAYFASI_OLMAYAN = ['istanbul']
const SEO_KONUMLARI = KONUMLAR.filter(k => !SEO_SAYFASI_OLMAYAN.includes(k.slug))

export const SEO_KONUM_SLUGLARI = SEO_KONUMLARI.map(k => `${k.slug}-seo-uzmani`)

export const seoKonumBul = (sayfaSlug) =>
  SEO_KONUMLARI.find(k => `${k.slug}-seo-uzmani` === sayfaSlug) || null

const adBul = (slug) => (KONUMLAR.find(k => k.slug === slug) || {}).ad

/**
 * ilceler.json kaydını sayfanın blok yapısına çevirir.
 * Blok tipleri pages/[konum].js içindeki <Blok> ile aynıdır: p, h2, h3, ul, ol, table.
 */
export function seoKonumSayfasi(k, v) {
  const h1 = `${k.ad} SEO Uzmanı`
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
    .filter(x => x.ad && SEO_KONUM_SLUGLARI.includes(`${x.slug}-seo-uzmani`))
  if (komsular.length) {
    bloklar.push({ t: 'h3', x: `${k.ad} çevresindeki ilçeler` })
    bloklar.push({ t: 'ul', x: komsular.map(x => `[${x.ad} SEO Uzmanı](/${x.slug}-seo-uzmani)`) })
  }

  return {
    meta: { title: `${h1} | Fatih Emin Çakıroğlu`, h1, desc: v.desc },
    alt: v.alt,
    bloklar,
    sss: v.sss,
    komsular,
  }
}
