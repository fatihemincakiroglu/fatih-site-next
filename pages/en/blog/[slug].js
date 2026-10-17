import TrPage from '../../blog/[slug]'
import { blogStaticPaths, blogStaticProps } from '../../../lib/blog-icerikler'

export default function EnPage(props) {
  return <TrPage {...props} __forceLocale="en" />
}

// TR sayfasıyla aynı slug listesi; props yalnızca EN içeriği taşır.
export const getStaticPaths = blogStaticPaths
export const getStaticProps = blogStaticProps('en')
