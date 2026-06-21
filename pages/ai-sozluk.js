import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

const TERIMLER = [
  { terim: 'LLM', aciklama: 'Large Language Model. Büyük ölçekli metin verisi üzerinde eğitilmiş, insan benzeri metin üreten yapay zekâ modelidir. GPT-4, Claude ve Gemini bu kategorinin örnekleridir.' },
  { terim: 'RAG', aciklama: 'Retrieval-Augmented Generation. LLM\'lerin gerçek zamanlı veri kaynaklarına erişerek yanıt ürettiği hibrit yaklaşımdır; hem güncel bilgi hem de derin dil anlayışı sağlar.' },
  { terim: 'GEO', aciklama: 'Generative Engine Optimization. Yapay zekâ destekli arama motorlarında içeriklerin kaynak olarak gösterilmesini sağlayan optimizasyon pratiğidir.' },
  { terim: 'AI Overview', aciklama: 'Google\'ın SERP üst kısmına yerleştirdiği LLM tabanlı yanıt kutucuğudur. Kaynak siteler sağ panelde listelenir.' },
  { terim: 'Grounding', aciklama: 'LLM\'lerin yanıtlarını doğrulanabilir kaynaklara dayandırması sürecidir. GEO optimizasyonunda içeriğin kaynak ve atıf bakımından güçlü olması kritiktir.' },
  { terim: 'Embedding', aciklama: 'Metinlerin anlam bakımından benzerliğini ölçmek için kullanılan vektör temsil yöntemidir. Semantik arama ve içerik eşleştirmede kullanılır.' },
  { terim: 'Prompt Engineering', aciklama: 'LLM\'lerden en iyi sonuçları almak için girdi metnini tasarlama sanatıdır. SEO içerik üretiminde ve GEO stratejisinde kullanılır.' },
  { terim: 'Answer Engine', aciklama: 'Perplexity, You.com gibi kullanıcı sorgularına doğrudan yanıt üreten yapay zekâ tabanlı arama sistemleridir.' },
  { terim: 'E-E-A-T', aciklama: 'Experience, Expertise, Authoritativeness, Trustworthiness. Google\'ın içerik kalitesini değerlendirdiği dört temel sinyal çerçevesi.' },
  { terim: 'Topical Authority', aciklama: 'Bir sitenin belirli bir konu alanında kapsamlı bilgi sunması nedeniyle arama motorları tarafından uzman kaynak olarak tanınması.' },
  { terim: 'Zero-Click', aciklama: 'Kullanıcının arama sonuçlarından herhangi bir siteye tıklamadan sorguya yanıt bulduğu arama deneyimidir.' },
  { terim: 'SERP', aciklama: 'Search Engine Results Page. Arama motoru sonuç sayfası. Organik sonuçlar, reklam, featured snippet gibi farklı bileşenleri içerir.' },
  { terim: 'Core Web Vitals', aciklama: 'Google\'ın kullanıcı deneyimini ölçmek için kullandığı üç temel metrik: LCP, INP ve CLS.' },
  { terim: 'Schema Markup', aciklama: 'Arama motorlarının içeriği daha iyi anlaması için sayfalara eklenen yapılandırılmış veri kodu. JSON-LD formatı önerilir.' },
  { terim: 'Featured Snippet', aciklama: 'Google arama sonuçlarının üstünde gösterilen ve bir soruyu doğrudan yanıtlayan içerik kutucuğu.' },
];

export default function Page() {
  const [arama, setArama] = useState('');
  const filtered = arama ? TERIMLER.filter(t => t.terim.toLowerCase().includes(arama.toLowerCase()) || t.aciklama.toLowerCase().includes(arama.toLowerCase())) : TERIMLER;

  return (
    <>
      <Head>
        <title>AI Sözlük | Fatih Emin Çakıroğlu</title>
        <meta name="description" content="SEO, GEO ve yapay zeka terimleri için hızlı başvuru sözlüğü." />
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '64px 32px 48px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <Link to="/kaynaklar" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>← Kaynaklar</Link>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>AI SÖZLÜK</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '20px' }}>AI & SEO Sözlüğü</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f7f5', border: '1px solid #eee', borderRadius: '8px', padding: '10px 16px', maxWidth: '400px' }}>
              <span style={{ color: '#aaa' }}>🔍</span>
              <input type="text" placeholder="Terim ara..." value={arama} onChange={e => setArama(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%' }} />
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 32px 96px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '10px', padding: '20px 24px', border: '1px solid #eee', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '140px', fontSize: '15px', fontWeight: 800, color: 'var(--orange)', fontFamily: 'var(--font-display)' }}>{t.terim}</div>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0 }}>{t.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
