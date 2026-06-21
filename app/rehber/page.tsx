import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'SEO Rehberleri | Fatih Emin Çakıroğlu',
  description: 'Teknik SEO, GEO ve dijital pazarlama hakkında kapsamlı rehberler.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/rehber' }
}

const RehberClient = dynamic(() => import('./RehberClient'), { ssr: false })

export default function Page() {
  return <RehberClient />
}
