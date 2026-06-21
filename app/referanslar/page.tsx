import type { Metadata } from 'next'
import ReferanslarClient from './ReferanslarClient'

export const metadata: Metadata = {
  title: 'Referanslar | Fatih Emin Çakıroğlu',
  description: '150+ müşterinin SEO danışmanlığı deneyimleri ve yorumları.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/referanslar' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <ReferanslarClient />
}
