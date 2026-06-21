import type { Metadata } from 'next'
import SeorehberiClient from './SeorehberiClient'

export const metadata: Metadata = {
  title: 'SEO Rehberi | Fatih Emin Çakıroğlu',
  description: 'Teknik SEO, on-page ve off-page optimizasyon hakkında kapsamlı rehberler.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/seo-rehberi' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <SeorehberiClient />
}
