import type { Metadata } from 'next'
import RehberPostClient from './RehberPostClient'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug} | Fatih Emin Çakıroğlu`,
    alternates: { canonical: `https://fatihemincakiroglu.com/rehber/${params.slug}` }
  }
}

export default function Page({ params }: Props) {
  return <RehberPostClient slug={params.slug} />
}
