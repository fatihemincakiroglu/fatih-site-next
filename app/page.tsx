import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Fatih Emin Çakıroğlu | SEO ve Dijital Pazarlama Uzmanı',
  description: '8+ yıllık deneyimle 150+ işletmenin organik büyümesini hızlandırdım. Teknik SEO, GEO ve dijital pazarlama danışmanlığı.',
  alternates: { canonical: 'https://fatihemincakiroglu.com' }
}

const HomeClient = dynamic(() => import('./HomeClient'), { ssr: false })

export default function Page() {
  return <HomeClient />
}
