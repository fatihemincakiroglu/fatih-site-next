import type { Metadata } from 'next'
import IcerikClient from './IcerikClient'

export const metadata: Metadata = {
  title: 'İçerik Stratejisi | Fatih Emin Çakıroğlu',
  description: 'Arama niyetine uygun, topical authority inşa eden içerik stratejisi.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/icerik' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <IcerikClient />
}
