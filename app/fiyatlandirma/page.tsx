import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Fiyatlandırma | Fatih Emin Çakıroğlu',
  description: 'SEO danışmanlık paketleri. Şeffaf fiyatlandırma, ölçülebilir sonuçlar.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/fiyatlandirma' }
}

const FiyatlandirmaClient = dynamic(() => import('./FiyatlandirmaClient'), { ssr: false })

export default function Page() {
  return <FiyatlandirmaClient />
}
