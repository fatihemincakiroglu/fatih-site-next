// ─────────────────────────────────────────────────────────────
// REHBER İÇERİKLERİ (TR + EN)
//
// Önceden pages/rehber/[slug].js içindeydi; sayfa bileşeni doğrudan okuduğu
// için tüm rehberler her rehber sayfasında tarayıcıya JS olarak gidiyordu.
// Artık yalnızca getStaticProps / getStaticPaths ve sunucu tarafı (api/blog-md)
// tarafından import ediliyor; sayfaya yalnızca o rehberin o dildeki içeriği gider.
//
// • Tüm rehberler lib/rehber-yazilar/<slug>.json dosyalarında (bkz. index.js).
// Alanlar: baslik_tr/en, meta_baslik_tr/en, meta_desc_tr/en, ozet_tr/en, kategori,
//          bolumler_tr/en (blok tipleri: components/IcerikBlok.js), sss_tr/en [{s,c}]
// Yeni rehber: JSON'u ekleyin, rehber-yazilar/index.js'e kaydedin,
// slug'ı lib/content-index.js → YAYINDAKI_REHBER_SLUGS listesine yazın.
// ─────────────────────────────────────────────────────────────
import { REHBER_YAZILARI } from './rehber-yazilar'
import { YAYINDAKI_REHBER_SLUGS } from './content-index'

// Tüm rehberler (teknik-seo ve icerik-stratejisi dahil) lib/rehber-yazilar/*.json içinde.
export const TUM_REHBERLER = {}
Object.assign(TUM_REHBERLER, REHBER_YAZILARI)

// Bir rehberin yalnızca istenen dildeki alanları (_tr / _en) — props küçük kalır.
export function rehberVerisi(slug, lang) {
  const veri = TUM_REHBERLER[slug]
  if (!veri) return null
  const diger = lang === 'en' ? '_tr' : '_en'
  return Object.fromEntries(Object.entries(veri).filter(([k]) => !k.endsWith(diger)))
}

export async function rehberStaticPaths() {
  return {
    paths: YAYINDAKI_REHBER_SLUGS.map(slug => ({ params: { slug } })),
    // Dolgu içerikli rehber üretilmez; listede olmayan slug 404 döner.
    fallback: false,
  }
}

export function rehberStaticProps(lang) {
  return async function getStaticProps({ params }) {
    if (!TUM_REHBERLER[params.slug] || !YAYINDAKI_REHBER_SLUGS.includes(params.slug)) return { notFound: true }
    return { props: { slug: params.slug, veri: rehberVerisi(params.slug, lang) } }
  }
}
