import TrPage from '../../rehber/[slug]'
export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}
export { getServerSideProps } from '../../rehber/[slug]'
