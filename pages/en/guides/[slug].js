import TrPage from '../../rehber/[slug]'
import { rehberStaticPaths, rehberStaticProps } from '../../../lib/rehber-icerikler'

export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}

// TR sayfasıyla aynı slug listesi; props yalnızca EN içeriği taşır.
export const getStaticPaths = rehberStaticPaths
export const getStaticProps = rehberStaticProps('en')
