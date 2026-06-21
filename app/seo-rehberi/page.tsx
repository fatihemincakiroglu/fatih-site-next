import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'SEO Rehberi | Fatih Emin Çakıroğlu',
  description: 'Teknik SEO, on-page ve off-page optimizasyon hakkında kapsamlı rehberler.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/seo-rehberi' }
}

const SeorehberiClient = dynamic(() => import('./SeorehberiClient'), { ssr: false })

export default function Page() {
  return <SeorehberiClient />
}
