'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const REFERANSLAR = [
  { isim: 'Mehmet A.', unvan: 'E-Ticaret Direktörü', sirket: 'Tekstil Markası', sektor: 'E-Ticaret', yorum: 'Fatih ile çalışmaya başladıktan 4 ay sonra organik trafiğimiz %280 arttı. Her adımı şeffaf şekilde takip edebildik. Yatırımın geri dönüşü inanılmaz hızda oldu. Teknik SEO denetiminde fark etmediğimiz onlarca kritik sorunu tespit etti ve hepsini sistematik biçimde çözdü.' },
  { isim: 'Zeynep K.', unvan: 'Büro Ortağı', sirket: 'Hukuk Bürosu', sektor: 'Hukuk', yorum: 'Dijital varlığımızı sıfırdan inşa etti. Yerel SEO çalışması sayesinde Google\'da ilk sayfaya çıktık, müvekkil sayımız 3 katına çıktı. Özellikle Google Business Profile optimizasyonu ve yerel içerik stratejisi çok etkili oldu.' },
  { isim: 'Can S.', unvan: 'Kurucu & CEO', sirket: 'SaaS Platformu', sektor: 'SaaS', yorum: 'Teknik SEO denetimi gerçekten göz açıcıydı. Fark etmediğimiz onlarca kritik hata vardı. 6 ayda organik trafiği sıfırdan ciddi rakamlara taşıdı. Aylık MRR\'miz 4 katına çıktı. Programatik SEO yaklaşımı bizim için oyun değiştirici oldu.' },
  { isim: 'Dr. Ayşe M.', unvan: 'Klinik Direktörü', sirket: 'Sağlık Kliniği', sektor: 'Sağlık', yorum: 'Medikal SEO alanında gerçek bir uzman. E-E-A-T odaklı çalışma sonrasında hem sıralamalarımız hem de hasta güveni ciddi oranda arttı. Doktor profilleri ve uzmanlık içerikleri sayesinde randevu oranımız %200 arttı.' },
  { isim: 'Ahmet B.', unvan: 'Pazarlama Müdürü', sirket: 'Fintech Şirketi', sektor: 'Finans', yorum: 'Rekabetçi finans sektöründe organik büyüme sağlamak çok zordu. Fatih\'in content clustering ve topical authority stratejisi sayesinde hedef kelimelerimizde ilk 3\'e girdik. ROI olağanüstü.' },
  { isim: 'Selin Y.', unvan: 'CMO', sirket: 'Gayrimenkul Platformu', sektor: 'Gayrimenkul', yorum: '8 ay içinde organik trafiğimizi 5 katına çıkardı. Özellikle şehir bazlı yerel SEO stratejisi ve içerik mimarisi mükemmeldi. Rakiplerimizin çok önüne geçtik.' },
];

export default function ReferanslarClient() {
  return (
    <>
      
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '64px 32px 48px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>REFERANSLAR</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
              Müşterilerin <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>deneyimleri</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '500px', lineHeight: 1.6 }}>150+ işletmeyle çalıştım. İşte bazıları ne diyor.</p>
          </div>
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px 32px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {REFERANSLAR.map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1px solid #eee' }}>
                <div style={{ fontSize: '32px', color: 'var(--orange)', fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '12px' }}>"</div>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.75, marginBottom: '20px' }}>{r.yorum}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{r.isim[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>{r.isim}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>{r.unvan} · {r.sirket}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: '4px', background: '#f5f5f5', fontSize: '11px', color: '#888' }}>{r.sektor}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link to="/vakalar"><button style={{ padding: '14px 28px', borderRadius: '8px', background: '#111', color: '#fff', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Vaka Çalışmalarını İncele →</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
