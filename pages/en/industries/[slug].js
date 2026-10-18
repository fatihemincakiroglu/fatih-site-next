import SektorSayfasi from '../../../components/SektorSayfasi'
import { SEKTORLER, sektorBulEn, sektorVerisi } from '../../../lib/sektorler'

// EN industry page: /en/industries/<slug_en>  (TR: pages/sektorler/[slug].js)
export default function Page({ veri }) {
  return <SektorSayfasi veri={veri} isEn={true} />
}

export async function getStaticPaths() {
  return { paths: SEKTORLER.map(s => ({ params: { slug: s.slug_en } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const s = sektorBulEn(params.slug)
  if (!s) return { notFound: true }
  return { props: { veri: sektorVerisi(s, 'en') } }
}
