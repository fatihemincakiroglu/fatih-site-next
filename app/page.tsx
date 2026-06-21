import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Fatih Emin Çakıroğlu | SEO ve Dijital Pazarlama Uzmani',
  description: '8+ yillik deneyimle 150+ isletmenin organik buyumesini hizlandirdim. Teknik SEO, GEO ve dijital pazarlama danismanligi.',
  alternates: { canonical: 'https://fatihemincakiroglu.com' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <HomeClient />
}
