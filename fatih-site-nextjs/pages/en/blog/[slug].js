import TrPage from '../../blog/[slug]'
export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}
export { getServerSideProps } from '../../blog/[slug]'
