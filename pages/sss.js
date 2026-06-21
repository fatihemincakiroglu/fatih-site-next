import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const SORULAR = [
  {
    s_tr: 'SEO danışmanlığı süreci nasıl başlıyor?',
    s_en: 'How does the SEO consulting process begin?',
    c_tr: 'İlk adım ücretsiz bir keşif görüşmesidir. Sitenizi, hedeflerinizi ve rakiplerinizi değerlendirdikten sonra size özel bir SEO yol haritası hazırlarım. Ardından teknik denetim, anahtar kelime araştırması ve strateji geliştirme aşamalarına geçeriz.',
    c_en: 'The first step is a free discovery call. After evaluating your site, goals and competitors, I prepare a custom SEO roadmap for you. Then we move to technical audit, keyword research and strategy development phases.',
  },
  {
    s_tr: 'SEO sonuçları ne zaman görülür?',
    s_en: 'When do SEO results appear?',
    c_tr: 'SEO uzun vadeli bir yatırımdır. Genellikle ilk iyileşmeler 2-3 ayda görülmeye başlar, anlamlı sonuçlar 4-6 ay içinde ortaya çıkar. Teknik sorunların çözümü ve içerik çalışmaları bu süreci hızlandırır.',
    c_en: 'SEO is a long-term investment. Initial improvements are typically seen within 2-3 months, with meaningful results emerging in 4-6 months. Resolving technical issues and content work accelerate this process.',
  },
  {
    s_tr: 'Aylık ücret ne kadar?',
    s_en: 'What is the monthly fee?',
    c_tr: 'Fiyatlandırma, sitenizin büyüklüğü, rekabet seviyesi ve ihtiyaç duyulan hizmet kapsamına göre değişir. Keşif görüşmesi sonrası size özel bir teklif hazırlarım. Fiyatlandırma sayfasına da göz atabilirsiniz.',
    c_en: 'Pricing varies depending on the size of your site, competition level and required service scope. After the discovery call, I prepare a custom proposal for you. You can also check the pricing page.',
  },
  {
    s_tr: 'GEO ve SEO arasındaki fark nedir?',
    s_en: 'What is the difference between GEO and SEO?',
    c_tr: 'SEO, Google gibi geleneksel arama motorlarında organik sıralama kazanmayı hedefler. GEO (Generative Engine Optimization) ise ChatGPT, Perplexity ve Google AI Overview gibi yapay zekâ sistemlerinde içeriklerin kaynak olarak gösterilmesini sağlar. En etkili yaklaşım her ikisini birlikte uygulamaktır.',
    c_en: 'SEO aims to gain organic rankings in traditional search engines like Google. GEO (Generative Engine Optimization) ensures your content is cited as a source in AI systems like ChatGPT, Perplexity and Google AI Overview. The most effective approach is implementing both together.',
  },
  {
    s_tr: 'Hangi sektörlerle çalışıyorsunuz?',
    s_en: 'Which sectors do you work with?',
    c_tr: 'E-ticaret, SaaS, sağlık, hukuk, finans, gayrimenkul ve daha birçok sektörde 150+ işletmeyle çalıştım. Her sektörün dinamiklerini ve arama davranışlarını iyi bilen bir danışmanla çalışmak büyük avantaj sağlar.',
    c_en: 'I have worked with 150+ businesses in e-commerce, SaaS, healthcare, legal, finance, real estate and many more sectors. Working with a consultant who understands the dynamics and search behaviors of each sector provides a great advantage.',
  },
  {
    s_tr: 'Raporlama nasıl yapılıyor?',
    s_en: 'How is reporting done?',
    c_tr: 'Aylık kapsamlı raporlar sunuyorum. Bu raporlarda organik trafik değişimleri, sıralama hareketleri, teknik iyileştirmeler ve bir sonraki dönem planı yer alır. Google Analytics 4 ve Search Console verileri kullanılır.',
    c_en: 'I provide comprehensive monthly reports. These reports include organic traffic changes, ranking movements, technical improvements and the next period plan. Google Analytics 4 and Search Console data are used.',
  },
]

export default function Page() {
  const router = useRouter()
  const isEn = router.locale === 'en'
  const [acik, setAcik] = useState(null)
  const t = {
    title: isEn ? 'FAQ | Fatih Emin Çakıroğlu' : 'SSS | Fatih Emin Çakıroğlu',
    badge: isEn ? 'FAQ' : 'SIK SORULAN SORULAR',
    h1: isEn ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular',
    desc: isEn ? 'Everything you need to know about SEO consulting.' : 'SEO danışmanlığı hakkında merak ettiğiniz her şey.',
    breadcrumb: isEn ? ['Home','Resources','FAQ'] : ['Ana Sayfa','Kaynaklar','SSS'],
    ctaTitle: isEn ? 'Have another question?' : 'Başka sorunuz mu var?',
    ctaDesc: isEn ? 'Book a free call and ask directly.' : 'Ücretsiz görüşme ayarlayın ve doğrudan sorun.',
    ctaBtn: isEn ? 'Get in Touch →' : 'İletişime Geç →',
  }
  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? 'Most frequently asked questions about SEO consulting. Pricing, process and results.' : 'SEO danışmanlığı hakkında en sık sorulan sorular. Fiyatlandırma, süreç ve sonuçlar.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/faq' : 'https://fatihemincakiroglu.com/sss'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/sss" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/faq" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/sss" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"FAQPage",
          "mainEntity": SORULAR.map(s => ({
            "@type":"Question","name": isEn ? s.s_en : s.s_tr,
            "acceptedAnswer":{"@type":"Answer","text": isEn ? s.c_en : s.c_tr}
          }))
        })}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link><span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn?'/resources':'/kaynaklar'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link><span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>{t.h1}</h1>
          <p style={{ color: '#777', fontSize: '16px', marginBottom: '40px' }}>{t.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            {SORULAR.map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                <button onClick={() => setAcik(acik===i?null:i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#111', flex: 1, lineHeight: 1.4 }}>{isEn ? s.s_en : s.s_tr}</span>
                  <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '18px', flexShrink: 0, marginLeft: '12px', transition: 'transform 0.2s', transform: acik===i?'rotate(45deg)':'none', display: 'inline-block' }}>+</span>
                </button>
                {acik === i && (
                  <div style={{ padding: '0 24px 20px', borderTop: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.75, paddingTop: '16px' }}>{isEn ? s.c_en : s.c_tr}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>{t.ctaTitle}</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '20px' }}>{t.ctaDesc}</p>
            <Link href={isEn?'/en/contact':'/iletisim'}><button style={{ padding: '13px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t.ctaBtn}</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
