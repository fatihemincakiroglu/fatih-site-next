import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const guncelleme = '1 Ocak 2025'

  return (
    <>
      <Head>
        <title>{isEn ? 'Privacy Policy | Fatih Emin Çakıroğlu' : 'Gizlilik Politikası | Fatih Emin Çakıroğlu'}</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            {isEn ? 'PRIVACY POLICY' : 'GİZLİLİK POLİTİKASI'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
            {isEn ? 'Privacy Policy' : 'Gizlilik Politikası'}
          </h1>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '48px' }}>
            {isEn ? `Last updated: ${guncelleme}` : `Son güncelleme: ${guncelleme}`}
          </p>

          {(isEn ? [
            { baslik: '1. Data Controller', icerik: 'Fatih Emin Çakıroğlu ("we", "our") is the data controller for the personal data you provide on this website (fatihemincakiroglu.com).' },
            { baslik: '2. Data We Collect', icerik: 'We may collect: Name and email address (via contact form), usage data (via Google Analytics), and technical data such as IP address and browser type. We do not sell your personal data to third parties.' },
            { baslik: '3. How We Use Your Data', icerik: 'Your data is used to: respond to your inquiries, send you information about our services (with your consent), improve our website, and comply with legal obligations.' },
            { baslik: '4. Cookies', icerik: 'Our website uses cookies for analytics purposes (Google Analytics) and to improve user experience. You can control cookie preferences through your browser settings. Essential cookies are required for the site to function.' },
            { baslik: '5. Your Rights (GDPR)', icerik: 'Under GDPR, you have the right to: access your personal data, correct inaccurate data, request deletion of your data, object to processing, and data portability. To exercise these rights, contact us at info@fatihemincakiroglu.com.' },
            { baslik: '6. Data Retention', icerik: 'We retain your data only as long as necessary for the purposes described in this policy. Contact form data is retained for up to 2 years unless you request earlier deletion.' },
            { baslik: '7. Third-Party Services', icerik: 'We use Google Analytics for website analytics and Google Tag Manager for tag management. These services have their own privacy policies. We recommend reviewing them.' },
            { baslik: '8. Contact', icerik: 'For privacy-related inquiries: info@fatihemincakiroglu.com | fatihemincakiroglu.com/en/contact' },
          ] : [
            { baslik: '1. Veri Sorumlusu', icerik: 'Bu web sitesinde (fatihemincakiroglu.com) sağladığınız kişisel verilerin sorumlusu Fatih Emin Çakıroğlu\'dur.' },
            { baslik: '2. Toplanan Veriler', icerik: 'Şu verileri toplayabiliriz: Ad ve e-posta adresi (iletişim formu aracılığıyla), kullanım verileri (Google Analytics aracılığıyla) ve IP adresi, tarayıcı türü gibi teknik veriler. Kişisel verilerinizi üçüncü taraflara satmıyoruz.' },
            { baslik: '3. Verilerinizi Nasıl Kullanıyoruz', icerik: 'Verileriniz şu amaçlarla kullanılır: sorularınızı yanıtlamak, hizmetlerimiz hakkında bilgi göndermek (onayınızla), web sitemizi geliştirmek ve yasal yükümlülüklere uymak.' },
            { baslik: '4. Çerezler (Cookie)', icerik: 'Web sitemiz analitik amaçlarla (Google Analytics) ve kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerez tercihlerinizi tarayıcı ayarlarınızdan kontrol edebilirsiniz. Temel çerezler sitenin çalışması için gereklidir.' },
            { baslik: '5. KVKK Kapsamında Haklarınız', icerik: '6698 sayılı KVKK kapsamında şu haklara sahipsiniz: kişisel verilerinize erişim, düzeltme talep etme, silme talep etme, işlemeye itiraz etme ve veri taşınabilirliği. Bu hakları kullanmak için info@fatihemincakiroglu.com adresine başvurabilirsiniz.' },
            { baslik: '6. Veri Saklama', icerik: 'Verilerinizi yalnızca bu politikada açıklanan amaçlar için gerekli olduğu süre kadar saklarız. İletişim formu verileri, daha erken silme talep etmediğiniz sürece en fazla 2 yıl saklanır.' },
            { baslik: '7. Üçüncü Taraf Hizmetler', icerik: 'Web sitesi analitiği için Google Analytics, etiket yönetimi için Google Tag Manager kullanıyoruz. Bu hizmetlerin kendi gizlilik politikaları bulunmaktadır. İncelemenizi öneririz.' },
            { baslik: '8. İletişim', icerik: 'Gizlilikle ilgili sorularınız için: info@fatihemincakiroglu.com | fatihemincakiroglu.com/iletisim' },
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
