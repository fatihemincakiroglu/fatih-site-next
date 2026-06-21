import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  url?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const all = [{ label: 'Ana Sayfa', url: '/' }, ...items]

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": all.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.label,
      "item": item.url ? `https://fatihemincakiroglu.com${item.url}` : undefined
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" style={{ padding: '12px 0', marginBottom: '8px' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', flexWrap: 'wrap' }}>
          {all.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {i > 0 && <span style={{ color: '#ccc', fontSize: '12px' }}>›</span>}
              {item.url && i < all.length - 1 ? (
                <Link href={item.url} style={{ fontSize: '13px', color: 'var(--orange)', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              ) : (
                <span style={{ fontSize: '13px', color: '#888' }}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
