import type { Metadata } from 'next'
import GeoClient from './GeoClient'

export const metadata: Metadata = {
  title: 'GEO Danışmanlığı | Fatih Emin Çakıroğlu',
  description: 'ChatGPT, Perplexity ve AI Overview üzerinde kaynak olarak görünme.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/geo' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <GeoClient />
}
