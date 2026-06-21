import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug} | Fatih Emin Çakıroğlu`,
    alternates: { canonical: `https://fatihemincakiroglu.com/blog/${params.slug}` }
  }
}

const BlogPostClient = dynamic(() => import('./BlogPostClient'), { ssr: false })

export default function Page({ params }: Props) {
  return <BlogPostClient slug={params.slug} />
}
