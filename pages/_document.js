import { Html, Head, Main, NextScript } from 'next/document'
import Document from 'next/document'
import { createElement } from 'react'

// ── OPEN GRAPH: MERKEZÎ ÜRETİM ───────────────────────────────
// Sayfalar zaten <title>, meta description ve canonical veriyor; og:title,
// og:description ve og:url bunların birebir kopyası olmalı. 40+ sayfaya tek
// tek eklemek yerine, next/head'in topladığı etiketleri burada (sunucuda)
// okuyup eksik OG etiketlerini tamamlıyoruz. Bir sayfa kendi og:* etiketini
// verdiyse (ör. [konum].js, blog yazıları) ona dokunulmaz.
// next-head-count bu dizinin uzunluğundan hesaplandığı için istemci tarafı
// head yönetimi de tutarlı kalır.
function textOf(children) {
  if (children == null || typeof children === 'boolean') return ''
  if (Array.isArray(children)) return children.map(textOf).join('')
  return String(children)
}

function withOpenGraph(head = []) {
  let title, description, canonical
  const present = new Set()
  for (const el of head) {
    if (!el || !el.props) continue
    const { props, type } = el
    if (type === 'title') title = textOf(props.children).trim()
    if (type === 'meta' && props.name === 'description') description = props.content
    if (type === 'meta' && props.property) present.add(props.property)
    if (type === 'meta' && props.name && props.name.startsWith('twitter:')) present.add(props.name)
    if (type === 'link' && props.rel === 'canonical') canonical = props.href
  }
  const extra = []
  const add = (attr, key, content) => {
    if (content && !present.has(key)) extra.push(createElement('meta', { [attr]: key, content, key: `og-auto-${key}` }))
  }
  add('property', 'og:title', title)
  add('property', 'og:description', description)
  add('property', 'og:url', canonical)
  add('name', 'twitter:title', title)
  add('name', 'twitter:description', description)
  return extra.length ? [...head, ...extra] : head
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const pathname = ctx.pathname || ctx.asPath || '/'
    const isEn = pathname.startsWith('/en')
    return { ...initialProps, head: withOpenGraph(initialProps.head), isEn }
  }

  render() {
    const { isEn } = this.props
    return (
      <Html lang={isEn ? 'en' : 'tr'}>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#e8560a" />
          {/* Global robots etiketi kaldırıldı: indeksleme zaten varsayılan
              ve sayfa bazlı noindex ile çakışan ikinci bir etiket üretiyordu. */}
          <meta name="author" content="Fatih Emin Çakıroğlu" />
          <meta name="publisher" content="Fatih Emin Çakıroğlu" />
          {/* Fontlar next/font ile _app.js'te yükleniyor (self-hosted). */}
          {/* Person + ProfessionalService tek grafta.
              @id verilmesi önemli: hizmet sayfalarındaki Service şeması
              provider olarak "#person" referansı veriyordu ama karşılığında
              bir @id yoktu, yani referans boşa düşüyordu. */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [{
            // Sayfa şemalarındaki WebPage.isPartOf bu @id'ye bağlanır.
            "@type": "WebSite",
            "@id": "https://fatihemincakiroglu.com/#website",
            "url": "https://fatihemincakiroglu.com",
            "name": "Fatih Emin Çakıroğlu",
            "inLanguage": ["tr", "en"],
            "publisher": { "@id": "https://fatihemincakiroglu.com/#person" }
          }, {
            "@type": "Person",
            "@id": "https://fatihemincakiroglu.com/#person",
            "name": "Fatih Emin Çakıroğlu",
            "jobTitle": isEn ? "SEO & Digital Marketing Expert" : "SEO & Dijital Pazarlama Uzmanı",
            "url": "https://fatihemincakiroglu.com",
            "image": "https://fatihemincakiroglu.com/images/fatih-emin-cakiroglu.jpg",
            "email": "info@fatihemincakiroglu.com",
            "address": {"@type": "PostalAddress", "addressLocality": "İstanbul", "addressCountry": "TR"},
            "sameAs": ["https://www.linkedin.com/in/fatihemincakiroglu/"]
          }, {
            // Yerel arama sinyali: İstanbul merkezli danışmanlık.
            "@type": "ProfessionalService",
            "@id": "https://fatihemincakiroglu.com/#business",
            "name": "Fatih Emin Çakıroğlu — SEO & GEO Danışmanlığı",
            "url": "https://fatihemincakiroglu.com",
            "image": "https://fatihemincakiroglu.com/og-image.jpg",
            "email": "info@fatihemincakiroglu.com",
            "founder": { "@id": "https://fatihemincakiroglu.com/#person" },
            "address": { "@type": "PostalAddress", "addressLocality": "İstanbul", "addressCountry": "TR" },
            "areaServed": [
              { "@type": "Country", "name": "Türkiye" },
              { "@type": "City", "name": "İstanbul" }
            ],
            "priceRange": "$$",
            "knowsLanguage": ["tr", "en"],
            "sameAs": ["https://www.linkedin.com/in/fatihemincakiroglu/"],
            "description": isEn
              ? "SEO and Generative Engine Optimization consulting for businesses in Turkey and abroad."
              : "Türkiye ve yurt dışındaki işletmeler için SEO ve Generative Engine Optimization danışmanlığı."
          }]
          })}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
