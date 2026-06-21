import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'İçerik Stratejisi | Fatih Emin Çakıroğlu',
  description: 'Arama niyetine uygun, topical authority inşa eden içerik stratejisi.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/icerik' }
}

const IcerikClient = dynamic(() => import('./IcerikClient'), { ssr: false })

export default function Page() {
  return <IcerikClient />
}
