import type { Metadata } from 'next'
import GeorehberiClient from './GeorehberiClient'

export const metadata: Metadata = {
  title: 'GEO Rehberi | Fatih Emin Çakıroğlu',
  description: 'AI aramasında görünürlük için kapsamlı GEO rehberleri.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/geo-rehberi' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <GeorehberiClient />
}
