import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Referanslar | Fatih Emin Çakıroğlu',
  description: '150+ müşterinin SEO danışmanlığı deneyimleri ve yorumları.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/referanslar' }
}

const ReferanslarClient = dynamic(() => import('./ReferanslarClient'), { ssr: false })

export default function Page() {
  return <ReferanslarClient />
}
