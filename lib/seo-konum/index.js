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
// Alanlar ve blok yapısı: lib/ilce-sayfa.js
// ─────────────────────────────────────────────────────────────
import { KONUMLAR } from '../geo-konum/ilceler'
import { ilceSayfasi } from '../ilce-sayfa'

// SEO sayfası üretilmeyen konumlar (KONUMLAR listesi GEO sayfalarıyla ortak).
// • istanbul: /istanbul-seo-uzmani, /seo-uzmani ile aynı sorguyu hedeflediği
//   için kaldırıldı; next.config.mjs'te /seo-uzmani'ye 301 ile yönleniyor.
const SEO_SAYFASI_OLMAYAN = ['istanbul']
const SEO_KONUMLARI = KONUMLAR.filter(k => !SEO_SAYFASI_OLMAYAN.includes(k.slug))

export const SEO_KONUM_SLUGLARI = SEO_KONUMLARI.map(k => `${k.slug}-seo-uzmani`)

export const seoKonumBul = (sayfaSlug) =>
  SEO_KONUMLARI.find(k => `${k.slug}-seo-uzmani` === sayfaSlug) || null

export const seoKonumSayfasi = (k, v) => ilceSayfasi(k, v, 'seo', SEO_KONUM_SLUGLARI)
