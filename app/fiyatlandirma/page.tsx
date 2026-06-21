import type { Metadata } from 'next'
import FiyatlandirmaClient from './FiyatlandirmaClient'

export const metadata: Metadata = {
  title: 'Fiyatlandırma | Fatih Emin Çakıroğlu',
  description: 'SEO danışmanlık paketleri. Şeffaf fiyatlandırma, ölçülebilir sonuçlar.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/fiyatlandirma' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <FiyatlandirmaClient />
}
