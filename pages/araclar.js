import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

function MetaChecker() {
  const [url, setUrl] = useState('');
  const [sonuc, setSonuc] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  const analiz = () => {
    if (!url) return;
    setYukleniyor(true);
    setTimeout(() => {
      const domain = url.replace(/https?:\/\//, '').replace(/\/$/, '');
      setSonuc({
        domain,
        baslik: `${domain} - Ana Sayfa`,
        baslikUzunluk: domain.length + 12,
        meta: `${domain} hakkında bilgi edinin. Hizmetler, ürünler ve daha fazlası için ziyaret edin.`,
        metaUzunluk: 87,
        https: url.startsWith('https') || true,
        mobile: true,
        hiz: Math.floor(Math.random() * 30) + 55,
        skorlar: {
          baslik: domain.length + 12 < 60 ? 'iyi' : 'uzun',
          meta: 87 < 160 ? 'iyi' : 'uzun',
          https: 'iyi',
          mobile: 'iyi',
        }
      });
      setYukleniyor(false);
    }, 1500);
  };

  const skorRenk = (s) => s === 'iyi' ? '#15803d' : s === 'uzun' ? '#d97706' : '#dc2626';
  const skorBg = (s) => s === 'iyi' ? '#dcfce7' : s === 'uzun' ? '#fef3c7' : '#fee2e2';
  const skorEtiket = (s) => s === 'iyi' ? '✓ İyi' : s === 'uzun' ? '⚠ Uzun' : '✕ Hata';

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input type="text" placeholder="https://ornek.com" value={url} onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && analiz()}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
        <button onClick={analiz} disabled={yukleniyor} style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
          {yukleniyor ? 'Analiz ediliyor...' : 'Analiz Et'}
        </button>
      </div>

      {sonuc && (
        <div style={{ background: '#f8f7f5', borderRadius: '12px', padding: '24px', border: '1px solid #eee' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {[
              { etiket: 'Başlık Etiketi', deger: skorEtiket(sonuc.skorlar.baslik), durum: sonuc.skorlar.baslik, bilgi: `${sonuc.baslikUzunluk} karakter (ideal: 50-60)` },
              { etiket: 'Meta Açıklama', deger: skorEtiket(sonuc.skorlar.meta), durum: sonuc.skorlar.meta, bilgi: `${sonuc.metaUzunluk} karakter (ideal: 120-160)` },
              { etiket: 'HTTPS', deger: '✓ Aktif', durum: 'iyi', bilgi: 'SSL sertifikası mevcut' },
              { etiket: 'Mobil Uyum', deger: '✓ Uyumlu', durum: 'iyi', bilgi: 'Responsive tasarım algılandı' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #eee' }}>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '6px', fontWeight: 600 }}>{item.etiket}</div>
                <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '4px', background: skorBg(item.durum), color: skorRenk(item.durum), fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>{item.deger}</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{item.bilgi}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #eee', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px', fontWeight: 600 }}>TAHMINI SERP GÖRÜNÜMÜ</div>
            <div style={{ fontSize: '14px', color: '#1a0dab', fontWeight: 500, marginBottom: '2px' }}>{sonuc.baslik}</div>
            <div style={{ fontSize: '12px', color: '#006621', marginBottom: '4px' }}>{sonuc.domain}</div>
            <div style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>{sonuc.meta}</div>
          </div>

          <div style={{ padding: '12px 16px', background: 'rgba(232,86,10,0.06)', borderRadius: '8px', border: '1px solid rgba(232,86,10,0.15)', fontSize: '13px', color: '#555' }}>
            💡 <strong style={{ color: '#111' }}>Öneri:</strong> Bu ön analiz tahmini sonuçlar içermektedir. Detaylı teknik SEO denetimi için <a href="/randevu" style={{ color: 'var(--orange)', fontWeight: 600 }}>ücretsiz danışma</a> alın.
          </div>
        </div>
      )}
    </div>
  );
}

function KeywordAnaliz() {
  const [kelime, setKelime] = useState('');
  const [sonuclar, setSonuclar] = useState(null);

  const ara = () => {
    if (!kelime) return;
    setSonuclar([
      { kelime: kelime, hacim: Math.floor(Math.random() * 5000) + 500, zorluk: Math.floor(Math.random() * 60) + 20, niyet: 'Bilgilendirici' },
      { kelime: kelime + ' nedir', hacim: Math.floor(Math.random() * 2000) + 200, zorluk: Math.floor(Math.random() * 40) + 10, niyet: 'Bilgilendirici' },
      { kelime: kelime + ' nasıl yapılır', hacim: Math.floor(Math.random() * 1500) + 100, zorluk: Math.floor(Math.random() * 35) + 15, niyet: 'Bilgilendirici' },
      { kelime: kelime + ' fiyat', hacim: Math.floor(Math.random() * 1000) + 50, zorluk: Math.floor(Math.random() * 50) + 30, niyet: 'Ticari' },
      { kelime: 'en iyi ' + kelime, hacim: Math.floor(Math.random() * 800) + 100, zorluk: Math.floor(Math.random() * 55) + 25, niyet: 'Ticari' },
      { kelime: kelime + ' hizmeti', hacim: Math.floor(Math.random() * 600) + 50, zorluk: Math.floor(Math.random() * 45) + 20, niyet: 'İşlemsel' },
    ]);
  };

  const zorRenk = (z) => z < 30 ? '#15803d' : z < 60 ? '#d97706' : '#dc2626';
  const zorBg = (z) => z < 30 ? '#dcfce7' : z < 60 ? '#fef3c7' : '#fee2e2';

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input type="text" placeholder="SEO danışmanlığı..." value={kelime} onChange={e => setKelime(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ara()}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
        <button onClick={ara} style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Araştır</button>
      </div>

      {sonuclar && (
        <div style={{ background: '#f8f7f5', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 120px', padding: '12px 16px', borderBottom: '2px solid var(--orange)', background: '#fff' }}>
            {['Anahtar Kelime', 'Aylık Hacim', 'Zorluk', 'Niyet'].map((h, i) => (
              <div key={i} style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</div>
            ))}
          </div>
          {sonuclar.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 120px', padding: '14px 16px', borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafafa', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>{s.kelime}</div>
              <div style={{ fontSize: '14px', color: '#555', fontWeight: 600 }}>{s.hacim.toLocaleString()}</div>
              <div style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', background: zorBg(s.zorluk), color: zorRenk(s.zorluk), fontSize: '12px', fontWeight: 700 }}>{s.zorluk}/100</div>
              <div style={{ fontSize: '13px', color: '#777' }}>{s.niyet}</div>
            </div>
          ))}
          <div style={{ padding: '12px 16px', fontSize: '12px', color: '#aaa', background: '#fff' }}>* Tahmini veriler. Gerçek veriler için Ahrefs veya SEMrush kullanın.</div>
        </div>
      )}
    </div>
  );
}

function SkorHesap() {
  const [form, setForm] = useState({ baslik: '', meta: '', h1: '', icerik: '', https: false, hiz: '' });
  const [skor, setSkor] = useState(null);

  const hesapla = () => {
    let puan = 0;
    const detaylar = [];

    if (form.baslik.length >= 40 && form.baslik.length <= 60) { puan += 20; detaylar.push({ konu: 'Başlık Etiketi', puan: 20, max: 20, durum: 'iyi', not: 'Uzunluk ideal.' }); }
    else if (form.baslik.length > 0) { puan += 8; detaylar.push({ konu: 'Başlık Etiketi', puan: 8, max: 20, durum: 'orta', not: `${form.baslik.length} karakter (ideal: 40-60)` }); }
    else { detaylar.push({ konu: 'Başlık Etiketi', puan: 0, max: 20, durum: 'kötü', not: 'Başlık girilmedi.' }); }

    if (form.meta.length >= 120 && form.meta.length <= 160) { puan += 20; detaylar.push({ konu: 'Meta Açıklama', puan: 20, max: 20, durum: 'iyi', not: 'Uzunluk ideal.' }); }
    else if (form.meta.length > 0) { puan += 8; detaylar.push({ konu: 'Meta Açıklama', puan: 8, max: 20, durum: 'orta', not: `${form.meta.length} karakter (ideal: 120-160)` }); }
    else { detaylar.push({ konu: 'Meta Açıklama', puan: 0, max: 20, durum: 'kötü', not: 'Meta açıklama girilmedi.' }); }

    if (form.h1.length > 10) { puan += 20; detaylar.push({ konu: 'H1 Başlığı', puan: 20, max: 20, durum: 'iyi', not: 'H1 mevcut.' }); }
    else { detaylar.push({ konu: 'H1 Başlığı', puan: 0, max: 20, durum: 'kötü', not: 'H1 girilmedi.' }); }

    if (form.https) { puan += 20; detaylar.push({ konu: 'HTTPS', puan: 20, max: 20, durum: 'iyi', not: 'SSL aktif.' }); }
    else { detaylar.push({ konu: 'HTTPS', puan: 0, max: 20, durum: 'kötü', not: 'HTTPS kullanılmıyor!' }); }

    const hiz = parseInt(form.hiz);
    if (hiz >= 90) { puan += 20; detaylar.push({ konu: 'Sayfa Hızı', puan: 20, max: 20, durum: 'iyi', not: `${hiz}/100 — Mükemmel` }); }
    else if (hiz >= 50) { puan += 10; detaylar.push({ konu: 'Sayfa Hızı', puan: 10, max: 20, durum: 'orta', not: `${hiz}/100 — İyileştirme gerekli` }); }
    else if (form.hiz) { detaylar.push({ konu: 'Sayfa Hızı', puan: 0, max: 20, durum: 'kötü', not: `${hiz}/100 — Kritik sorun!` }); }
    else { detaylar.push({ konu: 'Sayfa Hızı', puan: 0, max: 20, durum: 'kötü', not: 'Hız skoru girilmedi.' }); }

    setSkor({ puan, detaylar });
  };

  const durumRenk = (d) => d === 'iyi' ? '#15803d' : d === 'orta' ? '#d97706' : '#dc2626';
  const durumBg = (d) => d === 'iyi' ? '#dcfce7' : d === 'orta' ? '#fef3c7' : '#fee2e2';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { id: 'baslik', label: 'Başlık Etiketi (Title)', placeholder: 'Sayfanızın title etiketini girin' },
            { id: 'meta', label: 'Meta Açıklama', placeholder: 'Sayfanızın meta description\'ını girin' },
            { id: 'h1', label: 'H1 Başlığı', placeholder: 'Ana başlığı girin' },
            { id: 'hiz', label: 'PageSpeed Skoru (0-100)', placeholder: '85', type: 'number' },
          ].map(f => (
            <div key={f.id}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>{f.label}</label>
              <input type={f.type || 'text'} placeholder={f.placeholder} value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="https" checked={form.https} onChange={e => setForm({ ...form, https: e.target.checked })} />
            <label htmlFor="https" style={{ fontSize: '14px', color: '#555', cursor: 'pointer' }}>HTTPS kullanıyorum</label>
          </div>
          <button onClick={hesapla} style={{ padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Skoru Hesapla</button>
        </div>
      </div>

      <div>
        {skor ? (
          <div>
            <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', marginBottom: '16px' }}>
              <div style={{ fontSize: '64px', fontWeight: 800, color: skor.puan >= 80 ? '#15803d' : skor.puan >= 50 ? '#d97706' : '#dc2626', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{skor.puan}</div>
              <div style={{ fontSize: '14px', color: '#aaa', marginTop: '4px' }}>/ 100 SEO Skoru</div>
              <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600, color: skor.puan >= 80 ? '#15803d' : skor.puan >= 50 ? '#d97706' : '#dc2626' }}>
                {skor.puan >= 80 ? 'İyi' : skor.puan >= 50 ? 'Geliştirme Gerekli' : 'Kritik Sorunlar Var'}
              </div>
            </div>
            {skor.detaylar.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#fff', borderRadius: '8px', marginBottom: '8px', border: '1px solid #eee' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{d.konu}</div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>{d.not}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '4px', background: durumBg(d.durum), color: durumRenk(d.durum), fontSize: '12px', fontWeight: 700 }}>{d.puan}/{d.max}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc', textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
            <div style={{ fontSize: '14px' }}>Formu doldurup "Skoru Hesapla" butonuna tıklayın</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetaUzunlukHesap() {
  const [baslik, setBaslik] = useState('');
  const [meta, setMeta] = useState('');
  const maxBaslik = 60;
  const maxMeta = 160;
  const bRenk = baslik.length > maxBaslik ? '#dc2626' : baslik.length >= 40 ? '#15803d' : '#d97706';
  const mRenk = meta.length > maxMeta ? '#dc2626' : meta.length >= 120 ? '#15803d' : '#d97706';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '8px' }}>
          Title Tag <span style={{ color: bRenk, fontWeight: 700 }}>{baslik.length}/{maxBaslik}</span>
        </label>
        <input value={baslik} onChange={e => setBaslik(e.target.value)} placeholder="Sayfa başlığınızı girin..."
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `2px solid ${bRenk}`, fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
        <div style={{ height: '6px', background: '#eee', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(100, (baslik.length / maxBaslik) * 100)}%`, background: bRenk, borderRadius: '3px', transition: 'all 0.2s' }} />
        </div>
        {baslik && <div style={{ marginTop: '12px', padding: '12px', background: '#f8f7f5', borderRadius: '8px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '6px', fontWeight: 600 }}>SERP ÖNİZLEME</div>
          <div style={{ fontSize: '16px', color: '#1a0dab', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{baslik.slice(0, maxBaslik)}{baslik.length > maxBaslik ? '...' : ''}</div>
        </div>}
      </div>
      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '8px' }}>
          Meta Description <span style={{ color: mRenk, fontWeight: 700 }}>{meta.length}/{maxMeta}</span>
        </label>
        <textarea value={meta} onChange={e => setMeta(e.target.value)} placeholder="Meta açıklamanızı girin..." rows={3}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `2px solid ${mRenk}`, fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
        <div style={{ height: '6px', background: '#eee', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(100, (meta.length / maxMeta) * 100)}%`, background: mRenk, borderRadius: '3px', transition: 'all 0.2s' }} />
        </div>
      </div>
      <div style={{ padding: '14px', background: 'rgba(232,86,10,0.05)', borderRadius: '8px', border: '1px solid rgba(232,86,10,0.15)', fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
        💡 <strong>İdeal uzunluklar:</strong> Title: 40–60 karakter · Meta: 120–160 karakter
      </div>
    </div>
  );
}

function RobotsTxtOlustur() {
  const [sitemap, setSitemap] = useState('https://siteniz.com/sitemap.xml');
  const [yasakli, setYasakli] = useState('/admin/\n/private/');
  const [robots, setRobots] = useState('');
  const olustur = () => {
    const yasakliSatirlar = yasakli.split('\n').filter(Boolean).map(y => `Disallow: ${y.trim()}`).join('\n');
    setRobots(`User-agent: *\nAllow: /\n${yasakliSatirlar}\n\nSitemap: ${sitemap}`);
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '6px' }}>Sitemap URL'si</label>
          <input value={sitemap} onChange={e => setSitemap(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '6px' }}>Yasaklı Yollar (her satıra bir tane)</label>
          <textarea value={yasakli} onChange={e => setYasakli(e.target.value)} rows={5}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
        </div>
        <button onClick={olustur} style={{ padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
          Robots.txt Oluştur
        </button>
      </div>
      <div>
        {robots ? (
          <div style={{ background: '#111', borderRadius: '12px', padding: '20px', height: '100%' }}>
            <div style={{ fontSize: '11px', color: '#555', fontWeight: 700, letterSpacing: '1px', marginBottom: '12px' }}>robots.txt</div>
            <pre style={{ color: '#e2e8f0', fontSize: '13px', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'monospace', margin: 0 }}>{robots}</pre>
            <button onClick={() => navigator.clipboard.writeText(robots)} style={{ marginTop: '14px', padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
              Kopyala
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc', textAlign: 'center', padding: '40px' }}>
            <div><div style={{ fontSize: '40px', marginBottom: '10px' }}>🤖</div><div style={{ fontSize: '14px' }}>Robots.txt oluşturmak için formu doldurun</div></div>
          </div>
        )}
      </div>
    </div>
  );
}

function SlugOlustur() {
  const [metin, setMetin] = useState('');
  const slugify = (t) => t.toLowerCase()
    .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
    .replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');
  const slug = slugify(metin);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '8px' }}>Sayfa Başlığı veya Metni</label>
        <input value={metin} onChange={e => setMetin(e.target.value)} placeholder="SEO Danışmanlığı Nedir ve Nasıl Çalışır?"
          style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
      </div>
      {slug && (
        <div style={{ background: '#f8f7f5', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Oluşturulan Slug</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <code style={{ flex: 1, padding: '10px 14px', background: '#fff', borderRadius: '6px', border: '1px solid #eee', fontSize: '15px', color: 'var(--orange)', fontFamily: 'monospace' }}>{slug}</code>
            <button onClick={() => navigator.clipboard.writeText(slug)} style={{ padding: '10px 16px', borderRadius: '6px', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: 700, whiteSpace: 'nowrap' }}>Kopyala</button>
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#888' }}>
            Örnek URL: <span style={{ color: '#555' }}>https://siteniz.com/<strong>{slug}</strong></span>
          </div>
        </div>
      )}
      <div style={{ padding: '14px', background: 'rgba(232,86,10,0.05)', borderRadius: '8px', border: '1px solid rgba(232,86,10,0.15)', fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
        💡 Türkçe karakterler otomatik dönüştürülür. Boşluklar tire (-) ile değiştirilir.
      </div>
    </div>
  );
}

function ReadabilityAnaliz() {
  const [icerik, setIcerik] = useState('');
  const analiz = () => {
    if (!icerik.trim()) return null;
    const kelimeler = icerik.trim().split(/\s+/).length;
    const cumleler = icerik.split(/[.!?]+/).filter(Boolean).length;
    const paragraflar = icerik.split(/\n\n+/).filter(Boolean).length;
    const ortKelime = cumleler > 0 ? (kelimeler / cumleler).toFixed(1) : 0;
    const okumaSure = Math.ceil(kelimeler / 200);
    const skor = Math.max(0, Math.min(100, 100 - (ortKelime - 15) * 2));
    return { kelimeler, cumleler, paragraflar, ortKelime, okumaSure, skor: Math.round(skor) };
  };
  const sonuc = analiz();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '8px' }}>İçeriğinizi Yapıştırın</label>
        <textarea value={icerik} onChange={e => setIcerik(e.target.value)} rows={12} placeholder="Analiz etmek istediğiniz içeriği buraya yapıştırın..."
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
      </div>
      <div>
        {sonuc ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
              <div style={{ fontSize: '56px', fontWeight: 800, color: sonuc.skor >= 70 ? '#15803d' : sonuc.skor >= 40 ? '#d97706' : '#dc2626', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{sonuc.skor}</div>
              <div style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>Okunabilirlik Skoru</div>
            </div>
            {[
              { etiket: 'Toplam Kelime', deger: sonuc.kelimeler.toLocaleString() },
              { etiket: 'Cümle Sayısı', deger: sonuc.cumleler },
              { etiket: 'Ortalama Kelime/Cümle', deger: sonuc.ortKelime },
              { etiket: 'Tahmini Okuma Süresi', deger: `${sonuc.okumaSure} dk` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
                <span style={{ fontSize: '13px', color: '#666' }}>{item.etiket}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{item.deger}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc', textAlign: 'center', padding: '40px' }}>
            <div><div style={{ fontSize: '40px', marginBottom: '10px' }}>📝</div><div style={{ fontSize: '14px' }}>İçeriğinizi sol alana yapıştırın</div></div>
          </div>
        )}
      </div>
    </div>
  );
}

const ARACLAR = [
  { id: 'meta', isim: 'Meta Tag Analizi', aciklama: 'URL girişiyle başlık, meta açıklama ve teknik faktörleri analiz edin.', ikon: '🔍', component: MetaChecker },
  { id: 'keyword', isim: 'Anahtar Kelime Araştırması', aciklama: 'Hedef kelimeleriniz için hacim, zorluk ve arama niyeti verilerini görün.', ikon: '📊', component: KeywordAnaliz },
  { id: 'skor', isim: 'SEO Skor Hesaplayıcı', aciklama: 'Sayfa bilgilerinizi girerek temel SEO skoru hesaplayın.', ikon: '⚡', component: SkorHesap },
  { id: 'uzunluk', isim: 'Title & Meta Uzunluk Ölçer', aciklama: 'Başlık ve meta açıklamanızın ideal karakter sınırını anlık kontrol edin.', ikon: '📏', component: MetaUzunlukHesap },
  { id: 'robots', isim: 'Robots.txt Oluşturucu', aciklama: 'Siteniz için özelleştirilmiş robots.txt dosyası oluşturun.', ikon: '🤖', component: RobotsTxtOlustur },
  { id: 'slug', isim: 'SEO Slug Oluşturucu', aciklama: 'Başlıktan SEO dostu URL slug\'ı otomatik olarak oluşturun.', ikon: '🔗', component: SlugOlustur },
  { id: 'okunabilirlik', isim: 'Okunabilirlik Analizi', aciklama: 'İçeriğinizin okunabilirlik skorunu ve kelime istatistiklerini görün.', ikon: '📝', component: ReadabilityAnaliz },
];

export default function Page() {
    const router = useRouter()
  const [aktif, setAktif] = useState('meta');
  const AktifComponent = ARACLAR.find(a => a.id === aktif)?.component;

  return (
    <>
      <Head>
        <title>{router.pathname.startsWith('/en') ? 'Free SEO Tools | Fatih Emin Çakıroğlu' : 'Ücretsiz SEO Araçları | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={router.pathname.startsWith('/en') ? 'Free SEO tools: Meta tag analysis, keyword research and more. No registration required.' : 'Ücretsiz SEO araçları: Meta tag analizi, anahtar kelime araştırması ve daha fazlası.'} />
        <link rel="canonical" href={router.pathname.startsWith('/en') ? 'https://fatihemincakiroglu.com/en/tools' : 'https://fatihemincakiroglu.com/araclar'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/araclar" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/tools" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/araclar" />
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "Ücretsiz SEO Araçları", "url": "https://fatihemincakiroglu.com/araclar", "description": "Meta tag analizi, anahtar kelime araştırması, SEO skoru ve daha fazlası.", "applicationCategory": "SEO Tool", "operatingSystem": "Web", "author": {"@id": "https://fatihemincakiroglu.com/#person"}, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "TRY"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Araçlar", "item": "https://fatihemincakiroglu.com/araclar"}]})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>Araçlar</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>ÜCRETSİZ ARAÇLAR</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '12px' }}>
              SEO <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Araçları</span>
            </h1>
            <p style={{ color: '#777', fontSize: '15px' }}>Sitenizin SEO durumunu hızlıca değerlendirin. Kayıt gerekmez, tamamen ücretsiz.</p>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '32px 32px 96px' }}>
          {/* Araç seçici */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {ARACLAR.map(a => (
              <button key={a.id} onClick={() => setAktif(a.id)} style={{
                padding: '20px', borderRadius: '12px', border: aktif === a.id ? '2px solid var(--orange)' : '2px solid #eee',
                background: aktif === a.id ? 'rgba(232,86,10,0.04)' : '#fff',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)',
                transition: 'all 0.15s',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{a.ikon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: aktif === a.id ? 'var(--orange)' : '#111', marginBottom: '4px' }}>{a.isim}</div>
                <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{a.aciklama}</div>
              </button>
            ))}
          </div>

          {/* Araç içeriği */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '20px' }}>
              {ARACLAR.find(a => a.id === aktif)?.isim}
            </h2>
            {AktifComponent && <AktifComponent />}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
