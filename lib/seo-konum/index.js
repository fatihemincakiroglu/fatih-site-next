// ─────────────────────────────────────────────────────────────
// Yerel SEO uzmanı sayfaları: /istanbul-seo-uzmani, /kartal-seo-uzmani ...
//
// • İçerik: lib/seo-konum/icerik.json (Word dosyalarından üretildi).
//   Yalnızca getStaticProps içinde okunur; istemci paketine girmez.
// • Konum listesi GEO sayfalarıyla ortaktır: lib/geo-konum/ilceler.js
// • GEO sayfaları gibi bilinçli olarak menüye/footer'a bağlı değil;
//   keşif yalnızca TR sitemap üzerinden.
// ─────────────────────────────────────────────────────────────
import { KONUMLAR } from '../geo-konum/ilceler'

export const SEO_KONUM_SLUGLARI = KONUMLAR.map(k => `${k.slug}-seo-uzmani`)

export const seoKonumBul = (sayfaSlug) =>
  KONUMLAR.find(k => `${k.slug}-seo-uzmani` === sayfaSlug) || null

// Meta açıklama: konuma göre sabit seçilen 3 varyanttan biri (build'ler arasında değişmez)
export function seoKonumMeta(d, h1) {
  const varyantlar = [
    `${h1}: teknik SEO, anahtar kelime ve içerik stratejisi, yerel SEO ve Google Business Profile ile organik trafiği ticari sonuca dönüştürün.`,
    `${d.loc} işletmeler için SEO danışmanlığı: teknik denetim, arama niyeti haritası, içerik mimarisi, yerel görünürlük ve ölçümleme.`,
    `${h1} desteği: teknik SEO, topical authority, yerel SEO ve dönüşüm odaklı ölçümleme ile sürdürülebilir organik büyüme planı.`,
  ]
  const i = [...d.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % varyantlar.length
  return { title: `${h1} | Fatih Emin Çakıroğlu`, h1, desc: varyantlar[i] }
}
