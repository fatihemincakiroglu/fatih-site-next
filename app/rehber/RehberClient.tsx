'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const REHBERLER = [
  { slug: 'teknik-seo', no: '01', baslik: 'Teknik SEO', kategori: 'Teknik', ikon: '⚙', ozet: 'Crawl bütçesi, site mimarisi, HTTP ve performansla ilgili teknik temel taşlar.' },
  { slug: 'on-page-seo', no: '02', baslik: 'On-Page SEO', kategori: 'Strateji', ikon: '📄', ozet: 'Başlık, içerik sinyalleri ve sayfa içi optimizasyon odaklı rehber.' },
  { slug: 'off-page-seo', no: '03', baslik: 'Off Page SEO', kategori: 'Strateji', ikon: '★', ozet: 'Dış güven, itibar ve marka sinyalleriyle organik görünürlük.' },
  { slug: 'keyword-research', no: '04', baslik: 'Keyword Research', kategori: 'Strateji', ikon: '🔍', ozet: 'Araştırma, arama niyeti ve içerik planına anlamlı bağlantı.' },
  { slug: 'backlink', no: '05', baslik: 'Link Oluşturma', kategori: 'Strateji', ikon: '🔗', ozet: 'Backlink kalitesi, otorite sinyalleri ve sürdürülebilir link stratejisi.' },
  { slug: 'mobil-seo', no: '06', baslik: 'Mobil SEO', kategori: 'Teknik', ikon: '📱', ozet: 'Mobil deneyim, kullanılabilirlik ve arama ile uyumlu sayfa sunumu.' },
  { slug: 'core-web-vitals', no: '07', baslik: 'Core Web Vitals', kategori: 'Teknik', ikon: '↗', ozet: 'LCP, INP ve CLS optimizasyonu için kapsamlı rehber.' },
  { slug: 'yerel-seo', no: '08', baslik: 'Yerel SEO', kategori: 'Strateji', ikon: '📍', ozet: 'Google Maps ve yerel arama optimizasyonu stratejileri.' },
  { slug: 'seo-101', no: '09', baslik: 'SEO 101', kategori: 'Strateji', ikon: '☀', ozet: 'SERP yapısı, temel kavramlar ve giriş seviyesi çerçeve.' },
  { slug: 'geo-nedir', no: '10', baslik: 'GEO Nedir?', kategori: 'AI & GEO', ikon: '🤖', ozet: 'Generative Engine Optimization tanımı ve SEO\'dan farkı.' },
  { slug: 'llmstxt', no: '11', baslik: 'llms.txt', kategori: 'Teknik', ikon: '📄', ozet: 'LLM tabanlı sistemler için standart dosya oluşturma ve GEO bağlamı.' },
  { slug: 'ai-overview', no: '12', baslik: 'AI Overview Optimizasyonu', kategori: 'AI & GEO', ikon: '✦', ozet: 'Google AI Overview\'da kaynak olarak görünme stratejisi.' },
  { slug: 'aeo', no: '13', baslik: 'Answer Engine Optimization', kategori: 'Strateji', ikon: '▣', ozet: 'Yanıt motorları ve yapılandırılmış içerikle uyumlu optimizasyon.' },
  { slug: 'zero-click', no: '14', baslik: 'Zero-Click Search', kategori: 'Ölçüm & İçerik', ikon: '◎', ozet: 'Tıklama olmadan yanıtlanan sorgular ve görünürlük stratejisi.' },
  { slug: 'eeat', no: '15', baslik: 'E-E-A-T Rehberi', kategori: 'Strateji', ikon: '⭐', ozet: 'Deneyim, Uzmanlık, Otorite ve Güvenilirlik sinyalleri.' },
];

const KATEGORİLER = ['Tümü', 'Strateji', 'Teknik', 'AI & GEO', 'Ölçüm & İçerik'];
const KAT_RENK = {
  Teknik: { bg: '#e0f2fe', color: '#0369a1' },
  Strateji: { bg: '#f3e8ff', color: '#7c3aed' },
  'Ölçüm & İçerik': { bg: '#fce7f3', color: '#be185d' },
  'AI & GEO': { bg: '#e0f2fe', color: '#0284c7' },
};

export default function RehberClient() {
  const [aktifKat, setAktifKat] = useState('Tümü');
  const [arama, setArama] = useState('');

  let filtered = aktifKat === 'Tümü' ? REHBERLER : REHBERLER.filter(r => r.kategori === aktifKat);
  if (arama) filtered = filtered.filter(r => r.baslik.toLowerCase().includes(arama.toLowerCase()) || r.ozet.toLowerCase().includes(arama.toLowerCase()));

  return (
    <>
      

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>REHBER</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
              SEO Bilgi <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Rehberleri</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '520px' }}>Teknik SEO, GEO ve dijital pazarlama hakkında {REHBERLER.length} kapsamlı rehber. Her biri ayrı sayfada, detaylı içerikle.</p>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '32px 32px 96px' }}>
          {/* Kontroller */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '8px 14px' }}>
              <span style={{ color: '#aaa' }}>🔍</span>
              <input type="text" placeholder="Rehberlerde ara..." value={arama} onChange={e => setArama(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', fontFamily: 'var(--font-body)', width: '180px' }} />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {KATEGORİLER.map(k => (
                <button key={k} onClick={() => setAktifKat(k)} style={{
                  padding: '7px 14px', borderRadius: '20px',
                  background: aktifKat === k ? 'var(--orange)' : '#fff',
                  color: aktifKat === k ? '#fff' : '#555',
                  border: aktifKat === k ? 'none' : '1px solid #eee',
                  fontSize: '13px', fontWeight: aktifKat === k ? 700 : 400,
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}>{k}</button>
              ))}
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#aaa' }}>{filtered.length} rehber</span>
          </div>

          {/* Grid — tıklandığında ayrı sayfaya */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filtered.map((r, i) => {
              const renk = KAT_RENK[r.kategori] || { bg: '#f5f5f5', color: '#555' };
              return (
                <Link key={i} to={`/rehber/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#fff', borderRadius: '14px', padding: '24px',
                    border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s',
                    display: 'flex', flexDirection: 'column', height: '100%',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span style={{ fontSize: '22px' }}>{r.ikon}</span>
                      <span style={{ padding: '3px 8px', borderRadius: '4px', background: renk.bg, color: renk.color, fontSize: '10px', fontWeight: 700 }}>{r.kategori}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#ccc', fontWeight: 700, marginBottom: '6px' }}>{r.no}</div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '8px', lineHeight: 1.3 }}>{r.baslik}</h3>
                    <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>{r.ozet}</p>
                    <span style={{ color: 'var(--orange)', fontSize: '13px', fontWeight: 600 }}>Rehberi oku →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
