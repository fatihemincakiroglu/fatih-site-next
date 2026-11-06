import TrPage from '../../sektorler'
export { getStaticProps } from '../../sektorler'

export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}
