import SektorSayfasi from '../../components/SektorSayfasi'
import { SEKTORLER, sektorBulTr, sektorVerisi } from '../../lib/sektorler'
import { yaziKartlari, SEKTOR_YAZILARI } from '../../lib/yazi-kart'

// TR sektör sayfası: /sektorler/<slug>  (EN: pages/en/industries/[slug].js)
export default function Page({ veri, yazilar }) {
  return <SektorSayfasi veri={veri} yazilar={yazilar} isEn={false} />
}

export async function getStaticPaths() {
  return { paths: SEKTORLER.map(s => ({ params: { slug: s.slug } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const s = sektorBulTr(params.slug)
  if (!s) return { notFound: true }
  return { props: { veri: sektorVerisi(s, 'tr'), yazilar: yaziKartlari(SEKTOR_YAZILARI[s.slug] || [], 'tr') } }
}
