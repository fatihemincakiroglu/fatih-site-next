import type { Metadata } from 'next'
import SssClient from './SssClient'

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | Fatih Emin Çakıroğlu',
  description: 'SEO danışmanlığı hakkında sıkça sorulan sorular ve uzman yanıtları.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/sss' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <SssClient />
}
