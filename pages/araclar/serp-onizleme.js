import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { SINIRLAR, genislik, kisalt, durum, gorunenUrl, ipuclari } from '../../lib/serp-olcum'

// SERP önizleme ve başlık uzunluğu kontrolü — ölçüm tarayıcıda canvas ile yapılır.
// TR: /serp-onizleme   EN: /en/serp-preview

const RENK = { bos: '#9ca3af', iyi: '#15803d', sinirda: '#b45309', uzun: '#b91c1c' }

function Cubuk({ px, sinir, etiket, isEn }) {
  const d = durum(px, sinir)
  const oran = Math.min(1.25, px / sinir)
  const metin = { bos: isEn ? 'empty' : 'boş', iyi: isEn ? 'fits' : 'sığıyor', sinirda: isEn ? 'at the limit' : 'sınırda', uzun: isEn ? 'likely truncated' : 'büyük ihtimalle kesilir' }[d]
  return (
    <div style={{ marginTop: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#555', marginBottom: '4px', gap: '8px', flexWrap: 'wrap' }}>
        <span>{etiket}</span>
        <span style={{ color: RENK[d], fontWeight: 700 }}>{px} / ~{sinir} px · {metin}</span>
      </div>
      <div style={{ position: 'relative', height: '8px', background: '#f0ece6', borderRadius: '4px', overflow: 'hidden' }} aria-hidden="true">
        <div style={{ width: `${(oran / 1.25) * 100}%`, height: '100%', background: RENK[d], borderRadius: '4px' }} />
        <div style={{ position: 'absolute', left: `${100 / 1.25}%`, top: 0, bottom: 0, width: '2px', background: '#111', opacity: 0.35 }} />
      </div>
    </div>
  )
}

export default function SerpOnizleme(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [baslik, setBaslik] = useState(t('SEO Uzmanı İstanbul: Teknik SEO Danışmanı | Örnek', 'SEO Consultant in Istanbul: Technical SEO | Example Brand'))
  const [aciklama, setAciklama] = useState(t('Teknik SEO denetimi, içerik stratejisi ve yapay zekâ aramalarında görünürlük için bağımsız danışmanlık. Ücretsiz ön görüşme ayarlayın.', 'Independent consulting for technical SEO audits, content strategy and AI search visibility. Book a free intro call today.'))
  const [url, setUrl] = useState('https://www.ornek.com/seo-uzmani')
  const [cihaz, setCihaz] = useState('masaustu')
  const [hazir, setHazir] = useState(false) // canvas ölçümü yalnızca tarayıcıda
  const [getir, setGetir] = useState({ url: '', durum: null })
  useEffect(() => { setHazir(true) }, [])

  const S = SINIRLAR[cihaz]
  const olc = useMemo(() => {
    if (!hazir) return null
    return {
      bPx: genislik(baslik.trim(), S.baslik.font),
      aPx: genislik(aciklama.trim(), S.aciklama.font),
      bKisa: kisalt(baslik, S.baslik.font, S.baslik.px),
      aKisa: kisalt(aciklama, S.aciklama.font, S.aciklama.px),
      // Diğer cihaz için de durum (ikisi birlikte gösterilir)
      diger: (() => { const D = SINIRLAR[cihaz === 'masaustu' ? 'mobil' : 'masaustu']; return { b: durum(genislik(baslik.trim(), D.baslik.font), D.baslik.px), a: durum(genislik(aciklama.trim(), D.aciklama.font), D.aciklama.px) } })(),
    }
  }, [hazir, baslik, aciklama, cihaz, S])
  const gu = gorunenUrl(url)
  const ip = ipuclari(baslik, aciklama)

  const sayfadanGetir = async () => {
    if (!getir.url.trim()) return
    setGetir(g => ({ ...g, durum: 'yukleniyor' }))
    try {
      const r = await fetch(`/api/seo-audit?url=${encodeURIComponent(getir.url.trim())}`)
      const j = await r.json()
      if (!r.ok) return setGetir(g => ({ ...g, durum: 'hata', mesaj: j.error }))
      setBaslik(j.title || ''); setAciklama(j.metaDescription || ''); setUrl(j.url || getir.url)
      setGetir(g => ({ ...g, durum: 'tamam' }))
    } catch { setGetir(g => ({ ...g, durum: 'hata' })) }
  }

  const ipucuMetni = (x) => {
    if (x === 'buyuk-harf') return t('Başlığın tamamı büyük harf: hem daha geniş yer kaplar hem de okunması zorlaşır.', 'The title is all caps: it takes more width and is harder to read.')
    if (x === 'aciklama-kisa') return t('Açıklama kısa; sayfanın neyi neden sunduğunu bir cümle daha açabilirsiniz.', 'The description is short; one more sentence could explain what the page offers and why.')
    if (x === 'baslik-kisa') return t('Başlık kısa; sayfanın ana konusunu ve ayırt edici yanını eklemeyi düşünün.', 'The title is short; consider adding the main topic and what sets the page apart.')
    if (x.kod === 'tekrar') return t(`Başlıkta tekrar eden kelime: ${x.kelimeler.join(', ')}. Anahtar kelime doldurma gibi görünebilir.`, `Repeated word in the title: ${x.kelimeler.join(', ')}. It can look like keyword stuffing.`)
    return ''
  }

  const icerik = isEn ? {
    baslik: 'SERP Preview & Title Length Checker',
    metaBaslik: 'SERP Preview and Title Length Checker | Free SEO Tool',
    metaDesc: 'See how your title and meta description may look in Google on desktop and mobile. Measure pixel width and see where your text gets cut off.',
    giris: 'Type a title, meta description and URL, or fetch them from a live page, to see a Google-style result on desktop and mobile. Width is measured in pixels, the way truncation actually works, not just in characters. For the bigger picture of search result features, see the [featured snippets and SERP features article](/en/featured-snippet-serp-ozellikleri).',
    adimlar: [
      'Enter your title, meta description and page URL, or paste a live URL and press **Fetch** to load them.',
      'Switch between desktop and mobile. The bars show pixel width against an approximate limit; red means the text will likely be cut off with "...".',
      'Put the most important words at the start of the title so they survive truncation, and make the description answer "why click this result?".',
      'Remember that Google may rewrite titles and descriptions; a clear, accurate title that matches the page\'s H1 is rewritten less often.',
    ],
    sss: [
      { s: 'What is the maximum title length for Google?', c: 'Google does not publish a character or pixel limit. Titles are cut off based on the available width of the device, so a title of wide letters truncates sooner than one of narrow letters. Around 580 px on desktop is a widely used working limit, which is roughly 55-60 characters in Latin script.' },
      { s: 'Why does Google show a different title or description than mine?', c: 'Google can generate its own title link or snippet when it thinks another text describes the page better for that query, for example when the title is vague, stuffed with keywords or does not match the page. Clear, specific titles that match the main heading are rewritten less often.' },
      { s: 'Is meta description length a ranking factor?', c: 'No. The description does not affect rankings directly, but a clear description can improve how many people click. Google often builds the snippet from page content for specific queries.' },
      { s: 'Why is the measurement only approximate?', c: 'Google\'s fonts, device widths and layout change over time and differ between devices. The tool measures with Arial in your browser, which gets close but cannot be exact. Treat amber as "check" and red as "shorten".' },
    ],
  } : {
    baslik: 'SERP Önizleme ve Başlık Uzunluğu Kontrolü',
    metaBaslik: 'SERP Önizleme ve Başlık Kontrolü | Ücretsiz SEO Aracı',
    metaDesc: 'Başlık ve meta açıklamanızın Google\'da masaüstü ve mobilde nasıl görünebileceğine bakın. Piksel genişliğini ve kesilme noktasını görün.',
    giris: 'Başlık, meta açıklama ve URL\'yi yazın ya da canlı bir sayfadan getirin; masaüstü ve mobilde Google tarzı sonucu görün. Genişlik, kesilmenin gerçekte nasıl çalıştığı gibi karakterle değil pikselle ölçülür. Arama sonucu özelliklerinin genel resmi için [featured snippet ve SERP özellikleri yazısına](/featured-snippet-serp-ozellikleri) bakın.',
    adimlar: [
      'Başlığı, meta açıklamayı ve sayfa adresini yazın ya da canlı bir URL yapıştırıp **Getir**\'e basın.',
      'Masaüstü ve mobil arasında geçiş yapın. Çubuklar piksel genişliğini yaklaşık sınırla karşılaştırır; kırmızı, metnin büyük ihtimalle "..." ile kesileceği anlamına gelir.',
      'En önemli kelimeleri başlığın başına koyun ki kesilmeden kalsın; açıklama "bu sonuca neden tıklamalıyım?" sorusunu cevaplasın.',
      'Google\'ın başlık ve açıklamayı yeniden yazabileceğini unutmayın; sayfanın H1\'i ile uyumlu, net ve doğru başlıklar daha az değiştirilir.',
    ],
    sss: [
      { s: 'Google için maksimum başlık uzunluğu nedir?', c: 'Google resmi bir karakter ya da piksel sınırı yayınlamaz. Başlıklar cihazdaki kullanılabilir genişliğe göre kesilir; bu yüzden geniş harflerden oluşan bir başlık, dar harflerden oluşandan önce kesilir. Masaüstünde yaklaşık 580 piksel yaygın kullanılan bir çalışma sınırıdır; Latin alfabesinde kabaca 55-60 karaktere denk gelir.' },
      { s: 'Google neden benim yazdığımdan farklı bir başlık ya da açıklama gösteriyor?', c: 'Google, o sorgu için sayfayı başka bir metnin daha iyi anlattığını düşündüğünde kendi başlık bağlantısını ya da snippet\'ini üretebilir; örneğin başlık belirsizse, anahtar kelimeyle doldurulmuşsa ya da sayfayla uyuşmuyorsa. Ana başlıkla uyumlu, net ve özgül başlıklar daha az yeniden yazılır.' },
      { s: 'Meta açıklama uzunluğu bir sıralama faktörü mü?', c: 'Hayır. Açıklama sıralamayı doğrudan etkilemez ama net bir açıklama tıklayan kişi sayısını artırabilir. Google belirli sorgularda snippet\'i çoğu zaman sayfa içeriğinden oluşturur.' },
      { s: 'Ölçüm neden yaklaşık?', c: 'Google\'ın yazı tipleri, cihaz genişlikleri ve sayfa düzeni zamanla değişir ve cihaza göre farklıdır. Araç tarayıcınızda Arial ile ölçer; yakın sonuç verir ama birebir olamaz. Sarıyı "kontrol et", kırmızıyı "kısalt" diye okuyun.' },
    ],
  }

  return (
    <AracSayfa isEn={isEn} yol="/serp-onizleme" yolEn="/en/serp-preview" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['icerik-stratejisi', 'anahtar-kelime-arastirmasi', 'teknik-seo']}>
      <div style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label htmlFor="sp-getir" style={F.etiket}>{t('Canlı sayfadan getir (isteğe bağlı)', 'Fetch from a live page (optional)')}</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input id="sp-getir" value={getir.url} onChange={e => setGetir(g => ({ ...g, url: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter') sayfadanGetir() }}
              placeholder="https://www.ornek.com/sayfa" style={{ ...F.girdi, flex: '1 1 240px', width: 'auto' }} />
            <button type="button" onClick={sayfadanGetir} style={F.buton} disabled={getir.durum === 'yukleniyor'}>{getir.durum === 'yukleniyor' ? t('Getiriliyor…', 'Fetching…') : t('Getir', 'Fetch')}</button>
          </div>
          {getir.durum === 'hata' && <p role="alert" style={{ color: '#b91c1c', fontSize: '13px', margin: '6px 0 0' }}>{getir.mesaj || t('Sayfa getirilemedi.', 'Could not fetch the page.')}</p>}
        </div>

        <div>
          <label htmlFor="sp-baslik" style={F.etiket}>{t('Başlık (title)', 'Title')} <span style={{ color: '#999', fontWeight: 400 }}>· {baslik.trim().length} {t('karakter', 'characters')}</span></label>
          <input id="sp-baslik" value={baslik} onChange={e => setBaslik(e.target.value)} style={F.girdi} />
          {olc && <Cubuk px={olc.bPx} sinir={S.baslik.px} etiket={t('Genişlik', 'Width')} isEn={isEn} />}
        </div>
        <div>
          <label htmlFor="sp-aciklama" style={F.etiket}>{t('Meta açıklama', 'Meta description')} <span style={{ color: '#999', fontWeight: 400 }}>· {aciklama.trim().length} {t('karakter', 'characters')}</span></label>
          <textarea id="sp-aciklama" value={aciklama} onChange={e => setAciklama(e.target.value)} rows={3} style={{ ...F.girdi, resize: 'vertical', lineHeight: 1.6 }} />
          {olc && <Cubuk px={olc.aPx} sinir={S.aciklama.px} etiket={t('Genişlik', 'Width')} isEn={isEn} />}
        </div>
        <div>
          <label htmlFor="sp-url" style={F.etiket}>URL</label>
          <input id="sp-url" value={url} onChange={e => setUrl(e.target.value)} style={F.girdi} />
        </div>

        <div role="radiogroup" aria-label={t('Cihaz', 'Device')} style={{ display: 'flex', gap: '8px' }}>
          {[['masaustu', t('Masaüstü', 'Desktop')], ['mobil', t('Mobil', 'Mobile')]].map(([id, ad]) => (
            <button key={id} type="button" role="radio" aria-checked={cihaz === id} onClick={() => setCihaz(id)}
              style={{ ...F.ikincil, ...(cihaz === id ? { background: 'var(--orange)', color: '#fff', borderColor: 'var(--orange)' } : {}) }}>{ad}</button>
          ))}
        </div>

        <figure style={{ margin: 0 }}>
          <figcaption style={{ fontSize: '12px', color: '#999', marginBottom: '6px' }}>{t('Önizleme (yaklaşık)', 'Preview (approximate)')}</figcaption>
          <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '12px', padding: cihaz === 'mobil' ? '14px 16px' : '18px 20px', maxWidth: cihaz === 'mobil' ? '412px' : '652px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span aria-hidden="true" style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#f1f3f4', border: '1px solid #e5e5e5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#5f6368', fontFamily: 'Arial, sans-serif', flexShrink: 0 }}>{(gu.alan[0] || '•').toUpperCase()}</span>
              <div style={{ minWidth: 0, fontFamily: 'Arial, sans-serif', lineHeight: 1.3 }}>
                <div style={{ fontSize: '14px', color: '#202124', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{gu.alan}</div>
                <div style={{ fontSize: '12px', color: '#4d5156', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{gu.tam}{gu.parcalar.map(p => ` › ${p}`).join('')}</div>
              </div>
            </div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: cihaz === 'mobil' ? '18px' : '20px', lineHeight: 1.3, color: '#1a0dab', marginBottom: '4px', overflowWrap: 'anywhere' }}>
              {olc ? (olc.bKisa.metin || t('(başlık yok)', '(no title)')) : baslik}
            </div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: 1.58, color: '#4d5156', overflowWrap: 'anywhere' }}>
              {olc ? (olc.aKisa.metin || t('(açıklama yok, Google sayfa içeriğinden bir parça gösterir)', '(no description; Google shows a passage from the page)')) : aciklama}
            </div>
          </div>
        </figure>

        {olc && (
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#444', lineHeight: 1.7 }}>
            <li>{cihaz === 'masaustu' ? t('Mobilde', 'On mobile') : t('Masaüstünde', 'On desktop')}: {t('başlık', 'title')} <strong style={{ color: RENK[olc.diger.b] }}>{olc.diger.b === 'uzun' ? t('kesilir', 'truncated') : olc.diger.b === 'sinirda' ? t('sınırda', 'at the limit') : t('sığıyor', 'fits')}</strong>, {t('açıklama', 'description')} <strong style={{ color: RENK[olc.diger.a] }}>{olc.diger.a === 'uzun' ? t('kesilir', 'truncated') : olc.diger.a === 'sinirda' ? t('sınırda', 'at the limit') : t('sığıyor', 'fits')}</strong>.</li>
            {ip.map((x, i) => <li key={i}>{ipucuMetni(x)}</li>)}
          </ul>
        )}
      </div>
    </AracSayfa>
  )
}
