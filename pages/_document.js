import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Fatih Emin Çakıroğlu" />
        <meta name="publisher" content="Fatih Emin Çakıroğlu" />
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
