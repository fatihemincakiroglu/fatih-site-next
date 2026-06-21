import type { Metadata } from 'next'
import RehberClient from './RehberClient'

export const metadata: Metadata = {
  title: 'SEO Rehberleri | Fatih Emin Çakıroğlu',
  description: 'Teknik SEO, GEO ve dijital pazarlama hakkında kapsamlı rehberler.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/rehber' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <RehberClient />
}
