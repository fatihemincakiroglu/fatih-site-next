import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'AI Sözlük | Fatih Emin Çakıroğlu',
  description: 'SEO, GEO ve yapay zeka terimleri için hızlı başvuru sözlüğü.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/ai-sozluk' }
}

const AisozlukClient = dynamic(() => import('./AisozlukClient'), { ssr: false })

export default function Page() {
  return <AisozlukClient />
}
