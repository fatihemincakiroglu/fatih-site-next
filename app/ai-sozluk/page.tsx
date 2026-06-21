import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Sözlük | Fatih Emin Çakıroğlu',
  description: 'SEO, GEO ve yapay zeka terimleri için hızlı başvuru sözlüğü.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/ai-sozluk' }
}

export const dynamic = 'force-dynamic'

import AisozlukClient from './AisozlukClient'

export default function Page() {
  return <AisozlukClient />
}
