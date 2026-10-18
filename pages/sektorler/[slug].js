import SektorSayfasi from '../../components/SektorSayfasi'
import { SEKTORLER, sektorBulTr, sektorVerisi } from '../../lib/sektorler'

// TR sektör sayfası: /sektorler/<slug>  (EN: pages/en/industries/[slug].js)
export default function Page({ veri }) {
  return <SektorSayfasi veri={veri} isEn={false} />
}

export async function getStaticPaths() {
  return { paths: SEKTORLER.map(s => ({ params: { slug: s.slug } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const s = sektorBulTr(params.slug)
  if (!s) return { notFound: true }
  return { props: { veri: sektorVerisi(s, 'tr') } }
}
