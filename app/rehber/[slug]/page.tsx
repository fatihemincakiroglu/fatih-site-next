import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug} | SEO Rehberi | Fatih Emin Çakıroğlu`,
    alternates: { canonical: `https://fatihemincakiroglu.com/rehber/${params.slug}` }
  }
}

const RehberPostClient = dynamic(() => import('./RehberPostClient'), { ssr: false })

export default function Page({ params }: Props) {
  return <RehberPostClient slug={params.slug} />
}
