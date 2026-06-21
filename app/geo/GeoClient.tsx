'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function GeoClient() {
  const neler = ['llms.txt implementasyonu','Google AI Overview optimizasyonu','Yapılandırılmış içerik stratejisi','E-E-A-T sinyal güçlendirme','Yanıt motoru optimizasyonu','LLM kaynak analizleri'];
  return (
    <>
      
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#1a1612', padding: '80px 32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/hizmetler" style={{ fontSize: '13px', color: '#4a4540', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Tüm Hizmetler</Link>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>GEO DANIŞMANLIĞI</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
              AI aramasında<br /><span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>kaynak olun</span>
            </h1>
            <p style={{ color: '#9a9a9a', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '580px' }}>ChatGPT, Perplexity ve Google AI Overview gibi yapay zeka araçlarında içeriklerinizin kaynak olarak gösterilmesi için strateji geliştiriyorum.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/iletisim"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Ücretsiz Teklif Al →</button></Link>
              <Link to="/kaynaklar/geo-rehberi"><button style={{ padding: '14px 28px', borderRadius: '8px', background: 'transparent', color: '#fff', border: '1px solid #2a2520', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>GEO Rehberi</button></Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '40px' }}>
            {neler.map((n, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '10px', padding: '20px', border: '1px solid #eee', display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--orange)', fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: '14px', color: '#555' }}>{n}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1612', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '12px' }}>GEO danışmanlığı almak ister misiniz?</h2>
            <Link to="/iletisim"><button style={{ padding: '13px 28px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>İletişime Geç →</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
