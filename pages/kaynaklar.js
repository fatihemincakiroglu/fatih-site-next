import Link from 'next/link';
import Head from 'next/head';


const KAYNAKLAR = [
  { url: '/seo-rehberi', ikon: '📖', baslik: 'SEO Rehberi', aciklama: 'Teknik SEO, on-page, off-page ve içerik stratejisine dair kapsamlı rehberler.' },
  { url: '/geo-rehberi', ikon: '🤖', baslik: 'GEO Rehberi', aciklama: 'LLM ve yanıt motorlarında görünürlük için uygulamalı rehber.' },
  { url: '/ai-sozluk', ikon: '📚', baslik: 'AI Sözlük', aciklama: 'AI ve arama terimleri için hızlı başvuru kaynağı.' },
  { url: '/sss', ikon: '❓', baslik: 'SSS', aciklama: 'Sık sorulan sorular ve net cevaplar.' },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>Kaynaklar | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="SEO rehberleri, GEO rehberi, AI sözlük ve SSS. Ücretsiz dijital pazarlama kaynakları." />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '64px 32px 48px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>KAYNAKLAR</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
              Ücretsiz <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>kaynaklar</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '500px' }}>SEO ve GEO hakkında kapsamlı rehberler, sözlükler ve sıkça sorulan sorular.</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {KAYNAKLAR.map((k, i) => (
              <Link key={i} href={k.url} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '16px' }}>{k.ikon}</div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>{k.baslik}</h2>
                  <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.6, marginBottom: '16px' }}>{k.aciklama}</p>
                  <span style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '14px' }}>İncele →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
