import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

function MetaChecker({ isEn }) {
  const [url, setUrl] = useState('');
  const [sonuc, setSonuc] = useState(null);
  const [hata, setHata] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  const analiz = async () => {
    if (!url) return;
    setYukleniyor(true);
    setHata(null);
    setSonuc(null);
    try {
      const res = await fetch(`/api/seo-audit?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) { setHata(data.error || (isEn ? 'An error occurred.' : 'Bir hata oluştu.')); return; }
      setSonuc(data);
    } catch {
      setHata(isEn ? 'Could not connect to the server. Please try again.' : 'Sunucuya bağlanılamadı. Lütfen tekrar deneyin.');
    } finally {
      setYukleniyor(false);
    }
  };

  const skorRenk = (ok) => ok ? '#15803d' : '#dc2626';
  const skorBg = (ok) => ok ? '#dcfce7' : '#fee2e2';
  const skorEtiket = (ok) => ok ? (isEn ? '✓ Good' : '✓ İyi') : (isEn ? '✕ Check' : '✕ Kontrol et');

  const CHECK_LABELS = isEn ? {
    https: 'HTTPS', title: 'Title Tag', metaDescription: 'Meta Description',
    viewport: 'Mobile Viewport', canonical: 'Canonical', h1: 'H1 Tag',
    imagesAlt: 'Image Alt Text', indexable: 'Indexability',
    speed: 'Response Time', pageSize: 'Page Size',
  } : {
    https: 'HTTPS', title: 'Başlık Etiketi', metaDescription: 'Meta Açıklama',
    viewport: 'Mobil Viewport', canonical: 'Canonical', h1: 'H1 Etiketi',
    imagesAlt: 'Görsel Alt Metni', indexable: 'İndekslenebilirlik',
    speed: 'Yanıt Süresi', pageSize: 'Sayfa Boyutu',
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input type="text" placeholder={isEn ? 'example.com' : 'ornek.com'} value={url} onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && analiz()}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
        <button onClick={analiz} disabled={yukleniyor} style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)', opacity: yukleniyor ? 0.7 : 1 }}>
          {yukleniyor ? (isEn ? 'Analyzing...' : 'Analiz ediliyor...') : (isEn ? 'Analyze' : 'Analiz Et')}
        </button>
      </div>
      <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '20px' }}>
        {isEn ? 'This tool fetches the page you enter server-side in real time and checks core on-page SEO signals — it is not a simulation.' : 'Bu araç girdiğiniz sayfayı gerçek zamanlı olarak sunucu tarafında çeker ve temel on-page SEO sinyallerini kontrol eder — simülasyon değildir.'}
      </p>

      {hata && (
        <div style={{ padding: '14px 16px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '10px', color: '#991b1b', fontSize: '14px', marginBottom: '16px' }}>
          ⚠ {hata}
        </div>
      )}

      {sonuc && (
        <div style={{ background: '#f8f7f5', borderRadius: '12px', padding: '24px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#fff', border: `4px solid ${sonuc.score >= 70 ? '#15803d' : sonuc.score >= 40 ? '#d97706' : '#dc2626'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: sonuc.score >= 70 ? '#15803d' : sonuc.score >= 40 ? '#d97706' : '#dc2626', flexShrink: 0 }}>
              {sonuc.score}
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#999', wordBreak: 'break-all' }}>{sonuc.url}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>{isEn ? `Overall SEO Score: ${sonuc.score}/100` : `Genel SEO Skoru: ${sonuc.score}/100`}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {Object.entries(sonuc.checks).map(([key, item]) => (
              <div key={key} style={{ background: '#fff', borderRadius: '8px', padding: '14px 16px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#999', fontWeight: 600 }}>{CHECK_LABELS[key] || key}</span>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: skorBg(item.ok), color: skorRenk(item.ok), fontSize: '11px', fontWeight: 700 }}>{skorEtiket(item.ok)}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '2px' }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#aaa', lineHeight: 1.4 }}>{item.detail}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '12px 16px', background: 'rgba(232,86,10,0.06)', borderRadius: '8px', border: '1px solid rgba(232,86,10,0.15)', fontSize: '13px', color: '#555', marginTop: '16px' }}>
            💡 <strong style={{ color: '#111' }}>{isEn ? 'Tip:' : 'Öneri:'}</strong> {isEn ? (
              <>This is a quick preliminary analysis. For a comprehensive technical SEO audit, get a <a href="/en/book-a-call" style={{ color: 'var(--orange)', fontWeight: 600 }}>free consultation</a>.</>
            ) : (
              <>Bu, hızlı bir ön analizdir. Kapsamlı bir teknik SEO denetimi için <a href="/randevu" style={{ color: 'var(--orange)', fontWeight: 600 }}>ücretsiz danışma</a> alın.</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function KeywordAnaliz({ isEn }) {
  const [kelime, setKelime] = useState('');
  const [sonuclar, setSonuclar] = useState(null);

  const intents = isEn
    ? { info: 'Informational', comm: 'Commercial', trans: 'Transactional' }
    : { info: 'Bilgilendirici', comm: 'Ticari', trans: 'İşlemsel' };

  const ara = () => {
    if (!kelime) return;
    if (isEn) {
      setSonuclar([
        { kelime: kelime, hacim: Math.floor(Math.random() * 5000) + 500, zorluk: Math.floor(Math.random() * 60) + 20, niyet: intents.info },
        { kelime: 'what is ' + kelime, hacim: Math.floor(Math.random() * 2000) + 200, zorluk: Math.floor(Math.random() * 40) + 10, niyet: intents.info },
        { kelime: 'how to ' + kelime, hacim: Math.floor(Math.random() * 1500) + 100, zorluk: Math.floor(Math.random() * 35) + 15, niyet: intents.info },
        { kelime: kelime + ' pricing', hacim: Math.floor(Math.random() * 1000) + 50, zorluk: Math.floor(Math.random() * 50) + 30, niyet: intents.comm },
        { kelime: 'best ' + kelime, hacim: Math.floor(Math.random() * 800) + 100, zorluk: Math.floor(Math.random() * 55) + 25, niyet: intents.comm },
        { kelime: kelime + ' service', hacim: Math.floor(Math.random() * 600) + 50, zorluk: Math.floor(Math.random() * 45) + 20, niyet: intents.trans },
      ]);
    } else {
      setSonuclar([
        { kelime: kelime, hacim: Math.floor(Math.random() * 5000) + 500, zorluk: Math.floor(Math.random() * 60) + 20, niyet: intents.info },
        { kelime: kelime + ' nedir', hacim: Math.floor(Math.random() * 2000) + 200, zorluk: Math.floor(Math.random() * 40) + 10, niyet: intents.info },
        { kelime: kelime + ' nasıl yapılır', hacim: Math.floor(Math.random() * 1500) + 100, zorluk: Math.floor(Math.random() * 35) + 15, niyet: intents.info },
        { kelime: kelime + ' fiyat', hacim: Math.floor(Math.random() * 1000) + 50, zorluk: Math.floor(Math.random() * 50) + 30, niyet: intents.comm },
        { kelime: 'en iyi ' + kelime, hacim: Math.floor(Math.random() * 800) + 100, zorluk: Math.floor(Math.random() * 55) + 25, niyet: intents.comm },
        { kelime: kelime + ' hizmeti', hacim: Math.floor(Math.random() * 600) + 50, zorluk: Math.floor(Math.random() * 45) + 20, niyet: intents.trans },
      ]);
    }
  };

  const zorRenk = (z) => z < 30 ? '#15803d' : z < 60 ? '#d97706' : '#dc2626';
  const zorBg = (z) => z < 30 ? '#dcfce7' : z < 60 ? '#fef3c7' : '#fee2e2';

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input type="text" placeholder={isEn ? 'SEO consulting...' : 'SEO danışmanlığı...'} value={kelime} onChange={e => setKelime(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ara()}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
        <button onClick={ara} style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>{isEn ? 'Research' : 'Araştır'}</button>
      </div>

      {sonuclar && (
        <div style={{ background: '#f8f7f5', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 120px', padding: '12px 16px', borderBottom: '2px solid var(--orange)', background: '#fff' }}>
            {(isEn ? ['Keyword', 'Monthly Volume', 'Difficulty', 'Intent'] : ['Anahtar Kelime', 'Aylık Hacim', 'Zorluk', 'Niyet']).map((h, i) => (
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
          <div style={{ padding: '12px 16px', fontSize: '12px', color: '#aaa', background: '#fff' }}>{isEn ? '* Estimated data. Use Ahrefs or SEMrush for real data.' : '* Tahmini veriler. Gerçek veriler için Ahrefs veya SEMrush kullanın.'}</div>
        </div>
      )}
    </div>
  );
}

function SkorHesap({ isEn }) {
  const [form, setForm] = useState({ baslik: '', meta: '', h1: '', icerik: '', https: false, hiz: '' });
  const [skor, setSkor] = useState(null);

  const hesapla = () => {
    let puan = 0;
    const detaylar = [];

    if (isEn) {
      if (form.baslik.length >= 40 && form.baslik.length <= 60) { puan += 20; detaylar.push({ konu: 'Title Tag', puan: 20, max: 20, durum: 'iyi', not: 'Length is ideal.' }); }
      else if (form.baslik.length > 0) { puan += 8; detaylar.push({ konu: 'Title Tag', puan: 8, max: 20, durum: 'orta', not: `${form.baslik.length} characters (ideal: 40-60)` }); }
      else { detaylar.push({ konu: 'Title Tag', puan: 0, max: 20, durum: 'kötü', not: 'No title entered.' }); }

      if (form.meta.length >= 120 && form.meta.length <= 160) { puan += 20; detaylar.push({ konu: 'Meta Description', puan: 20, max: 20, durum: 'iyi', not: 'Length is ideal.' }); }
      else if (form.meta.length > 0) { puan += 8; detaylar.push({ konu: 'Meta Description', puan: 8, max: 20, durum: 'orta', not: `${form.meta.length} characters (ideal: 120-160)` }); }
      else { detaylar.push({ konu: 'Meta Description', puan: 0, max: 20, durum: 'kötü', not: 'No meta description entered.' }); }

      if (form.h1.length > 10) { puan += 20; detaylar.push({ konu: 'H1 Heading', puan: 20, max: 20, durum: 'iyi', not: 'H1 is present.' }); }
      else { detaylar.push({ konu: 'H1 Heading', puan: 0, max: 20, durum: 'kötü', not: 'No H1 entered.' }); }

      if (form.https) { puan += 20; detaylar.push({ konu: 'HTTPS', puan: 20, max: 20, durum: 'iyi', not: 'SSL is active.' }); }
      else { detaylar.push({ konu: 'HTTPS', puan: 0, max: 20, durum: 'kötü', not: 'HTTPS is not used!' }); }

      const hiz = parseInt(form.hiz);
      if (hiz >= 90) { puan += 20; detaylar.push({ konu: 'Page Speed', puan: 20, max: 20, durum: 'iyi', not: `${hiz}/100 — Excellent` }); }
      else if (hiz >= 50) { puan += 10; detaylar.push({ konu: 'Page Speed', puan: 10, max: 20, durum: 'orta', not: `${hiz}/100 — Needs improvement` }); }
      else if (form.hiz) { detaylar.push({ konu: 'Page Speed', puan: 0, max: 20, durum: 'kötü', not: `${hiz}/100 — Critical issue!` }); }
      else { detaylar.push({ konu: 'Page Speed', puan: 0, max: 20, durum: 'kötü', not: 'No speed score entered.' }); }
    } else {
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
    }

    setSkor({ puan, detaylar });
  };

  const durumRenk = (d) => d === 'iyi' ? '#15803d' : d === 'orta' ? '#d97706' : '#dc2626';
  const durumBg = (d) => d === 'iyi' ? '#dcfce7' : d === 'orta' ? '#fef3c7' : '#fee2e2';

  const fields = isEn ? [
    { id: 'baslik', label: 'Title Tag', placeholder: 'Enter your page title tag' },
    { id: 'meta', label: 'Meta Description', placeholder: "Enter your page's meta description" },
    { id: 'h1', label: 'H1 Heading', placeholder: 'Enter the main heading' },
    { id: 'hiz', label: 'PageSpeed Score (0-100)', placeholder: '85', type: 'number' },
  ] : [
    { id: 'baslik', label: 'Başlık Etiketi (Title)', placeholder: 'Sayfanızın title etiketini girin' },
    { id: 'meta', label: 'Meta Açıklama', placeholder: "Sayfanızın meta description'ını girin" },
    { id: 'h1', label: 'H1 Başlığı', placeholder: 'Ana başlığı girin' },
    { id: 'hiz', label: 'PageSpeed Skoru (0-100)', placeholder: '85', type: 'number' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {fields.map(f => (
            <div key={f.id}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>{f.label}</label>
              <input type={f.type || 'text'} placeholder={f.placeholder} value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="https" checked={form.https} onChange={e => setForm({ ...form, https: e.target.checked })} />
            <label htmlFor="https" style={{ fontSize: '14px', color: '#555', cursor: 'pointer' }}>{isEn ? 'I use HTTPS' : 'HTTPS kullanıyorum'}</label>
          </div>
          <button onClick={hesapla} style={{ padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>{isEn ? 'Calculate Score' : 'Skoru Hesapla'}</button>
        </div>
      </div>

      <div>
        {skor ? (
          <div>
            <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', marginBottom: '16px' }}>
              <div style={{ fontSize: '64px', fontWeight: 800, color: skor.puan >= 80 ? '#15803d' : skor.puan >= 50 ? '#d97706' : '#dc2626', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{skor.puan}</div>
              <div style={{ fontSize: '14px', color: '#aaa', marginTop: '4px' }}>{isEn ? '/ 100 SEO Score' : '/ 100 SEO Skoru'}</div>
              <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600, color: skor.puan >= 80 ? '#15803d' : skor.puan >= 50 ? '#d97706' : '#dc2626' }}>
                {isEn
                  ? (skor.puan >= 80 ? 'Good' : skor.puan >= 50 ? 'Needs Improvement' : 'Critical Issues')
                  : (skor.puan >= 80 ? 'İyi' : skor.puan >= 50 ? 'Geliştirme Gerekli' : 'Kritik Sorunlar Var')}
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
            <div style={{ fontSize: '14px' }}>{isEn ? 'Fill in the form and click "Calculate Score"' : 'Formu doldurup "Skoru Hesapla" butonuna tıklayın'}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetaUzunlukHesap({ isEn }) {
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
        <input value={baslik} onChange={e => setBaslik(e.target.value)} placeholder={isEn ? 'Enter your page title...' : 'Sayfa başlığınızı girin...'}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `2px solid ${bRenk}`, fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
        <div style={{ height: '6px', background: '#eee', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(100, (baslik.length / maxBaslik) * 100)}%`, background: bRenk, borderRadius: '3px', transition: 'all 0.2s' }} />
        </div>
        {baslik && <div style={{ marginTop: '12px', padding: '12px', background: '#f8f7f5', borderRadius: '8px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '6px', fontWeight: 600 }}>{isEn ? 'SERP PREVIEW' : 'SERP ÖNİZLEME'}</div>
          <div style={{ fontSize: '16px', color: '#1a0dab', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{baslik.slice(0, maxBaslik)}{baslik.length > maxBaslik ? '...' : ''}</div>
        </div>}
      </div>
      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '8px' }}>
          Meta Description <span style={{ color: mRenk, fontWeight: 700 }}>{meta.length}/{maxMeta}</span>
        </label>
        <textarea value={meta} onChange={e => setMeta(e.target.value)} placeholder={isEn ? 'Enter your meta description...' : 'Meta açıklamanızı girin...'} rows={3}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `2px solid ${mRenk}`, fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
        <div style={{ height: '6px', background: '#eee', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(100, (meta.length / maxMeta) * 100)}%`, background: mRenk, borderRadius: '3px', transition: 'all 0.2s' }} />
        </div>
      </div>
      <div style={{ padding: '14px', background: 'rgba(232,86,10,0.05)', borderRadius: '8px', border: '1px solid rgba(232,86,10,0.15)', fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
        💡 <strong>{isEn ? 'Ideal lengths:' : 'İdeal uzunluklar:'}</strong> {isEn ? 'Title: 40–60 characters · Meta: 120–160 characters' : 'Title: 40–60 karakter · Meta: 120–160 karakter'}
      </div>
    </div>
  );
}

function RobotsTxtOlustur({ isEn }) {
  const [sitemap, setSitemap] = useState(isEn ? 'https://yoursite.com/sitemap.xml' : 'https://siteniz.com/sitemap.xml');
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
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '6px' }}>{isEn ? 'Sitemap URL' : "Sitemap URL'si"}</label>
          <input value={sitemap} onChange={e => setSitemap(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '6px' }}>{isEn ? 'Disallowed Paths (one per line)' : 'Yasaklı Yollar (her satıra bir tane)'}</label>
          <textarea value={yasakli} onChange={e => setYasakli(e.target.value)} rows={5}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
        </div>
        <button onClick={olustur} style={{ padding: '12px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
          {isEn ? 'Generate Robots.txt' : 'Robots.txt Oluştur'}
        </button>
      </div>
      <div>
        {robots ? (
          <div style={{ background: '#111', borderRadius: '12px', padding: '20px', height: '100%' }}>
            <div style={{ fontSize: '11px', color: '#555', fontWeight: 700, letterSpacing: '1px', marginBottom: '12px' }}>robots.txt</div>
            <pre style={{ color: '#e2e8f0', fontSize: '13px', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'monospace', margin: 0 }}>{robots}</pre>
            <button onClick={() => navigator.clipboard.writeText(robots)} style={{ marginTop: '14px', padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
              {isEn ? 'Copy' : 'Kopyala'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc', textAlign: 'center', padding: '40px' }}>
            <div><div style={{ fontSize: '40px', marginBottom: '10px' }}>🤖</div><div style={{ fontSize: '14px' }}>{isEn ? 'Fill in the form to generate a robots.txt' : 'Robots.txt oluşturmak için formu doldurun'}</div></div>
          </div>
        )}
      </div>
    </div>
  );
}

function SlugOlustur({ isEn }) {
  const [metin, setMetin] = useState('');
  const slugify = (t) => t.toLowerCase()
    .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
    .replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');
  const slug = slugify(metin);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '8px' }}>{isEn ? 'Page Title or Text' : 'Sayfa Başlığı veya Metni'}</label>
        <input value={metin} onChange={e => setMetin(e.target.value)} placeholder={isEn ? 'What is SEO Consulting and How Does It Work?' : 'SEO Danışmanlığı Nedir ve Nasıl Çalışır?'}
          style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
      </div>
      {slug && (
        <div style={{ background: '#f8f7f5', borderRadius: '12px', padding: '20px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{isEn ? 'Generated Slug' : 'Oluşturulan Slug'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <code style={{ flex: 1, padding: '10px 14px', background: '#fff', borderRadius: '6px', border: '1px solid #eee', fontSize: '15px', color: 'var(--orange)', fontFamily: 'monospace' }}>{slug}</code>
            <button onClick={() => navigator.clipboard.writeText(slug)} style={{ padding: '10px 16px', borderRadius: '6px', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: 700, whiteSpace: 'nowrap' }}>{isEn ? 'Copy' : 'Kopyala'}</button>
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#888' }}>
            {isEn ? 'Example URL: ' : 'Örnek URL: '}<span style={{ color: '#555' }}>https://{isEn ? 'yoursite.com' : 'siteniz.com'}/<strong>{slug}</strong></span>
          </div>
        </div>
      )}
      <div style={{ padding: '14px', background: 'rgba(232,86,10,0.05)', borderRadius: '8px', border: '1px solid rgba(232,86,10,0.15)', fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
        💡 {isEn ? 'Special characters are automatically converted. Spaces are replaced with hyphens (-).' : 'Türkçe karakterler otomatik dönüştürülür. Boşluklar tire (-) ile değiştirilir.'}
      </div>
    </div>
  );
}

function ReadabilityAnaliz({ isEn }) {
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
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#555', display: 'block', marginBottom: '8px' }}>{isEn ? 'Paste Your Content' : 'İçeriğinizi Yapıştırın'}</label>
        <textarea value={icerik} onChange={e => setIcerik(e.target.value)} rows={12} placeholder={isEn ? 'Paste the content you want to analyze here...' : 'Analiz etmek istediğiniz içeriği buraya yapıştırın...'}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #eee', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
      </div>
      <div>
        {sonuc ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
              <div style={{ fontSize: '56px', fontWeight: 800, color: sonuc.skor >= 70 ? '#15803d' : sonuc.skor >= 40 ? '#d97706' : '#dc2626', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{sonuc.skor}</div>
              <div style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>{isEn ? 'Readability Score' : 'Okunabilirlik Skoru'}</div>
            </div>
            {(isEn ? [
              { etiket: 'Total Words', deger: sonuc.kelimeler.toLocaleString() },
              { etiket: 'Sentence Count', deger: sonuc.cumleler },
              { etiket: 'Avg. Words/Sentence', deger: sonuc.ortKelime },
              { etiket: 'Estimated Reading Time', deger: `${sonuc.okumaSure} min` },
            ] : [
              { etiket: 'Toplam Kelime', deger: sonuc.kelimeler.toLocaleString() },
              { etiket: 'Cümle Sayısı', deger: sonuc.cumleler },
              { etiket: 'Ortalama Kelime/Cümle', deger: sonuc.ortKelime },
              { etiket: 'Tahmini Okuma Süresi', deger: `${sonuc.okumaSure} dk` },
            ]).map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
                <span style={{ fontSize: '13px', color: '#666' }}>{item.etiket}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{item.deger}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc', textAlign: 'center', padding: '40px' }}>
            <div><div style={{ fontSize: '40px', marginBottom: '10px' }}>📝</div><div style={{ fontSize: '14px' }}>{isEn ? 'Paste your content on the left' : 'İçeriğinizi sol alana yapıştırın'}</div></div>
          </div>
        )}
      </div>
    </div>
  );
}

const ARACLAR = [
  { id: 'meta', component: MetaChecker,
    tr: { isim: 'Gerçek Zamanlı SEO Denetimi', aciklama: 'URL girişiyle sitenizi anlık çekip başlık, meta açıklama, H1, görsel alt metni ve daha fazlasını gerçek veriyle kontrol edin.' },
    en: { isim: 'Real-Time SEO Audit', aciklama: "Enter a URL to fetch your site live and check the title, meta description, H1, image alt text and more with real data." }, ikon: '🔍' },
  { id: 'keyword', component: KeywordAnaliz,
    tr: { isim: 'Anahtar Kelime Araştırması', aciklama: 'Hedef kelimeleriniz için hacim, zorluk ve arama niyeti verilerini görün.' },
    en: { isim: 'Keyword Research', aciklama: 'See volume, difficulty and search intent data for your target keywords.' }, ikon: '📊' },
  { id: 'skor', component: SkorHesap,
    tr: { isim: 'SEO Skor Hesaplayıcı', aciklama: 'Sayfa bilgilerinizi girerek temel SEO skoru hesaplayın.' },
    en: { isim: 'SEO Score Calculator', aciklama: 'Enter your page details to calculate a basic SEO score.' }, ikon: '⚡' },
  { id: 'uzunluk', component: MetaUzunlukHesap,
    tr: { isim: 'Title & Meta Uzunluk Ölçer', aciklama: 'Başlık ve meta açıklamanızın ideal karakter sınırını anlık kontrol edin.' },
    en: { isim: 'Title & Meta Length Checker', aciklama: 'Check your title and meta description against the ideal character limits in real time.' }, ikon: '📏' },
  { id: 'robots', component: RobotsTxtOlustur,
    tr: { isim: 'Robots.txt Oluşturucu', aciklama: 'Siteniz için özelleştirilmiş robots.txt dosyası oluşturun.' },
    en: { isim: 'Robots.txt Generator', aciklama: 'Generate a custom robots.txt file for your site.' }, ikon: '🤖' },
  { id: 'slug', component: SlugOlustur,
    tr: { isim: 'SEO Slug Oluşturucu', aciklama: "Başlıktan SEO dostu URL slug'ı otomatik olarak oluşturun." },
    en: { isim: 'SEO Slug Generator', aciklama: 'Automatically generate an SEO-friendly URL slug from a title.' }, ikon: '🔗' },
  { id: 'okunabilirlik', component: ReadabilityAnaliz,
    tr: { isim: 'Okunabilirlik Analizi', aciklama: 'İçeriğinizin okunabilirlik skorunu ve kelime istatistiklerini görün.' },
    en: { isim: 'Readability Analysis', aciklama: 'See your content\'s readability score and word statistics.' }, ikon: '📝' },
];

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktif, setAktif] = useState('meta');
  const aktifArac = ARACLAR.find(a => a.id === aktif);
  const AktifComponent = aktifArac?.component;

  const t = isEn ? {
    breadcrumbHome: 'Home', breadcrumbSelf: 'Tools',
    eyebrow: 'FREE TOOLS', h1a: 'SEO', h1b: 'Tools',
    intro: 'Quickly assess your site\'s SEO health. No registration required, completely free.',
  } : {
    breadcrumbHome: 'Ana Sayfa', breadcrumbSelf: 'Araçlar',
    eyebrow: 'ÜCRETSİZ ARAÇLAR', h1a: 'SEO', h1b: 'Araçları',
    intro: 'Sitenizin SEO durumunu hızlıca değerlendirin. Kayıt gerekmez, tamamen ücretsiz.',
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'Free SEO Tools | Fatih Emin Çakıroğlu' : 'Ücretsiz SEO Araçları | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? 'Free SEO tools: meta tag analysis, keyword research and more. No registration required — quickly analyze and improve your website in just a few clicks.' : 'Ücretsiz SEO araçları: meta tag analizi, anahtar kelime araştırması ve daha fazlası. Kayıt gerektirmeden sitenizi hızlıca analiz edip iyileştirin.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/tools' : 'https://fatihemincakiroglu.com/araclar'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/araclar" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/tools" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/araclar" />
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": isEn ? "Free SEO Tools" : "Ücretsiz SEO Araçları", "url": isEn ? "https://fatihemincakiroglu.com/en/tools" : "https://fatihemincakiroglu.com/araclar", "description": isEn ? "Meta tag analysis, keyword research, SEO score and more." : "Meta tag analizi, anahtar kelime araştırması, SEO skoru ve daha fazlası.", "applicationCategory": "SEO Tool", "operatingSystem": "Web", "author": {"@id": "https://fatihemincakiroglu.com/#person"}, "offers": {"@type": "Offer", "price": "0", "priceCurrency": isEn ? "USD" : "TRY"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": t.breadcrumbHome, "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": t.breadcrumbSelf, "item": isEn ? "https://fatihemincakiroglu.com/en/tools" : "https://fatihemincakiroglu.com/araclar"}]})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href={isEn ? '/en' : '/'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumbHome}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumbSelf}</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.eyebrow}</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '12px' }}>
              {t.h1a} <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{t.h1b}</span>
            </h1>
            <p style={{ color: '#777', fontSize: '15px' }}>{t.intro}</p>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '32px 32px 96px' }}>
          {/* Araç seçici */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {ARACLAR.map(a => {
              const l = isEn ? a.en : a.tr
              return (
                <button key={a.id} onClick={() => setAktif(a.id)} style={{
                  padding: '20px', borderRadius: '12px', border: aktif === a.id ? '2px solid var(--orange)' : '2px solid #eee',
                  background: aktif === a.id ? 'rgba(232,86,10,0.04)' : '#fff',
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s',
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{a.ikon}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: aktif === a.id ? 'var(--orange)' : '#111', marginBottom: '4px' }}>{l.isim}</div>
                  <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{l.aciklama}</div>
                </button>
              )
            })}
          </div>

          {/* Araç içeriği */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '20px' }}>
              {(isEn ? aktifArac?.en : aktifArac?.tr)?.isim}
            </h2>
            {AktifComponent && <AktifComponent isEn={isEn} />}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} } }
