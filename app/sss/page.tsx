import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | Fatih Emin Çakıroğlu',
  description: 'SEO danışmanlığı hakkında sıkça sorulan sorular ve uzman yanıtları.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/sss' }
}

const SssClient = dynamic(() => import('./SssClient'), { ssr: false })

export default function Page() {
  return <SssClient />
}
