import TrPage from '../seo'

// Force EN locale for this page
export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}
