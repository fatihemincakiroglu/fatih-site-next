import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Fatih Emin Çakıroğlu | SEO & Dijital Pazarlama Uzmanı',
  description: '8+ yıllık deneyimle 150+ işletmenin organik büyümesini hızlandırdım.',
  metadataBase: new URL('https://fatihemincakiroglu.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Fatih Emin Çakıroğlu",
              "jobTitle": "SEO & Dijital Pazarlama Uzmanı",
              "url": "https://fatihemincakiroglu.com",
              "email": "info@fatihemincakiroglu.com",
              "address": { "@type": "PostalAddress", "addressLocality": "İstanbul", "addressCountry": "TR" },
              "sameAs": ["https://www.linkedin.com/in/fatihemincakiroglu/"]
            })
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
