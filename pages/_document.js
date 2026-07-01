import { Html, Head, Main, NextScript } from 'next/document'
import Document from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const pathname = ctx.pathname || ctx.asPath || '/'
    const isEn = pathname.startsWith('/en')
    return { ...initialProps, isEn }
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
            "jobTitle": isEn ? "SEO & Digital Marketing Expert" : "SEO & Dijital Pazarlama Uzmanı",
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
}

export default MyDocument
