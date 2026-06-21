import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  return (
    <>
      <Head>
        <title>{isEn ? 'Terms of Service | Fatih Emin Çakıroğlu' : 'Kullanım Koşulları | Fatih Emin Çakıroğlu'}</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            {isEn ? 'TERMS OF SERVICE' : 'KULLANIM KOŞULLARI'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111', marginBottom: '48px' }}>
            {isEn ? 'Terms of Service' : 'Kullanım Koşulları'}
          </h1>
          {(isEn ? [
            { baslik: '1. Acceptance', icerik: 'By accessing fatihemincakiroglu.com, you agree to these Terms of Service. If you do not agree, please do not use this website.' },
            { baslik: '2. Intellectual Property', icerik: 'All content on this website (articles, guides, tools, design) is owned by Fatih Emin Çakıroğlu. Reproduction without written permission is prohibited. You may quote content with proper attribution.' },
            { baslik: '3. Use of Tools', icerik: 'The free SEO tools provided on this site are for informational purposes. Results are estimates and do not constitute professional advice. We are not responsible for decisions made based on tool outputs.' },
            { baslik: '4. Disclaimer', icerik: 'SEO results vary based on many factors including competition, industry, and algorithm changes. Past results shown on this site do not guarantee future performance.' },
            { baslik: '5. External Links', icerik: 'This site may contain links to external websites. We are not responsible for the content or privacy practices of those sites.' },
            { baslik: '6. Changes', icerik: 'We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.' },
            { baslik: '7. Governing Law', icerik: 'These terms are governed by the laws of the Republic of Turkey. Disputes shall be resolved in Istanbul courts.' },
          ] : [
            { baslik: '1. Kabul', icerik: 'fatihemincakiroglu.com\'a erişerek bu Kullanım Koşulları\'nı kabul etmiş sayılırsınız. Kabul etmiyorsanız lütfen siteyi kullanmayınız.' },
            { baslik: '2. Fikri Mülkiyet', icerik: 'Bu web sitesindeki tüm içerikler (makaleler, rehberler, araçlar, tasarım) Fatih Emin Çakıroğlu\'na aittir. Yazılı izin olmaksızın çoğaltılması yasaktır. Atıf yaparak alıntı yapabilirsiniz.' },
            { baslik: '3. Araçların Kullanımı', icerik: 'Bu sitede sunulan ücretsiz SEO araçları bilgilendirme amaçlıdır. Sonuçlar tahminidir ve profesyonel tavsiye niteliği taşımaz. Araç çıktılarına dayanarak alınan kararların sorumluluğu kullanıcıya aittir.' },
            { baslik: '4. Sorumluluk Reddi', icerik: 'SEO sonuçları rekabet, sektör ve algoritma değişimleri gibi birçok faktöre göre değişir. Sitede gösterilen geçmiş sonuçlar gelecekteki performansı garanti etmez.' },
            { baslik: '5. Dış Bağlantılar', icerik: 'Bu site harici web sitelerine bağlantılar içerebilir. Söz konusu sitelerin içerikleri veya gizlilik uygulamalarından sorumlu değiliz.' },
            { baslik: '6. Değişiklikler', icerik: 'Bu koşulları dilediğimiz zaman değiştirme hakkını saklı tutarız. Değişikliklerden sonra siteyi kullanmaya devam etmek güncel koşulları kabul etmek anlamına gelir.' },
            { baslik: '7. Uygulanacak Hukuk', icerik: 'Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklar İstanbul mahkemelerinde çözüme kavuşturulur.' },
          ]).map((b, i) => (
            <div key={i} style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>{b.baslik}</h2>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8 }}>{b.icerik}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
