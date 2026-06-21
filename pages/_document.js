import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Fatih Emin Çakıroğlu",
          "jobTitle": "SEO & Dijital Pazarlama Uzmanı",
          "url": "https://fatihemincakiroglu.com",
          "email": "info@fatihemincakiroglu.com",
          "address": {"@type": "PostalAddress", "addressLocality": "İstanbul", "addressCountry": "TR"},
          "sameAs": ["https://www.linkedin.com/in/fatihemincakiroglu/"]
        })}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
