import SektorSayfasi from '../../../components/SektorSayfasi'
import { SEKTORLER, sektorBulEn, sektorVerisi } from '../../../lib/sektorler'
import { yaziKartlari, SEKTOR_YAZILARI } from '../../../lib/yazi-kart'

// EN industry page: /en/industries/<slug_en>  (TR: pages/sektorler/[slug].js)
export default function Page({ veri, yazilar }) {
  return <SektorSayfasi veri={veri} yazilar={yazilar} isEn={true} />
}

export async function getStaticPaths() {
  return { paths: SEKTORLER.map(s => ({ params: { slug: s.slug_en } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const s = sektorBulEn(params.slug)
  if (!s) return { notFound: true }
  return { props: { veri: sektorVerisi(s, 'en'), yazilar: yaziKartlari(SEKTOR_YAZILARI[s.slug] || [], 'en') } }
}
