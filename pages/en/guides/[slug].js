import TrPage from '../../rehber/[slug]'
export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}

// TR sayfasıyla aynı slug listesi; sayfa build sırasında statik üretilir.
export { getStaticPaths, getStaticProps } from '../../rehber/[slug]'
