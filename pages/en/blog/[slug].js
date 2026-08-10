import TrPage from '../../blog/[slug]'
export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}

// TR sayfasıyla aynı slug listesi; sayfa build sırasında statik üretilir.
export { getStaticPaths, getStaticProps } from '../../blog/[slug]'
