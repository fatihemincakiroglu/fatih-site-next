import TrPage from '../blog'

// Force EN locale for this page
export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}
