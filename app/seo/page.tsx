import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'SEO Danışmanlığı | Fatih Emin Çakıroğlu',
  description: 'Teknik SEO, içerik ve backlink stratejisiyle organik büyüme sağlıyorum.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/seo' }
}

const SeoClient = dynamic(() => import('./SeoClient'), { ssr: false })

export default function Page() {
  return <SeoClient />
}
