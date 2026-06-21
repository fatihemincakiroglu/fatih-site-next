import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'GEO Danışmanlığı | Fatih Emin Çakıroğlu',
  description: 'ChatGPT, Perplexity ve AI Overview üzerinde kaynak olarak görünme.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/geo' }
}

const GeoClient = dynamic(() => import('./GeoClient'), { ssr: false })

export default function Page() {
  return <GeoClient />
}
