import TrPage from '../google-guncellemeleri'

export default function EnPage(props) {
  return <TrPage {...props} />
}

export async function getStaticProps() {
  const { guncellemeVerisi } = await import('../../lib/google-guncellemeleri')
  return { props: { isEn: true, veri: guncellemeVerisi('en') } }
}
