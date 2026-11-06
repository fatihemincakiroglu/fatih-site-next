import { useDeferredValue, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { listeyiOku, kumele, csvUret, VARSAYILAN_ESIK, EN_FAZLA_SATIR, ORNEK_LISTE } from '../../lib/anahtar-kelime-gruplama'

// Anahtar kelime gruplama (kümeleme): tamamen tarayıcıda çalışır, hiçbir veri gönderilmez.
// TR: /anahtar-kelime-gruplama   EN: /en/keyword-clustering

const SAYFA_BOYUTU = 30

export default function AnahtarKelimeGruplama(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [metin, setMetin] = useState(ORNEK_LISTE)
  const [esik, setEsik] = useState(VARSAYILAN_ESIK)
  const [asciiKatla, setAsciiKatla] = useState(true)
  const [durakAt, setDurakAt] = useState(true)
  const [tekilGoster, setTekilGoster] = useState(true)
  const [gosterilecek, setGosterilecek] = useState(SAYFA_BOYUTU)

  // Uzun listelerde yazarken arayüz takılmasın diye hesap ertelenmiş değerlerle yapılır
  const ertMetin = useDeferredValue(metin)
  const ertEsik = useDeferredValue(esik)
  const okunan = useMemo(() => listeyiOku(ertMetin, { asciiKatla }), [ertMetin, asciiKatla])
  const sonuc = useMemo(() => kumele(okunan.kelimeler, { esik: ertEsik, asciiKatla, durakAt }), [okunan, ertEsik, asciiKatla, durakAt])
  const hesaplaniyor = ertMetin !== metin || ertEsik !== esik

  const yerel = isEn ? 'en-US' : 'tr-TR'
  const sayi = (x) => new Intl.NumberFormat(yerel).format(x || 0)
  const hacimVar = okunan.hacimli > 0
  const toplamHacim = okunan.kelimeler.reduce((s, k) => s + (k.hacim || 0), 0)
  const kumelenen = sonuc.kumeler.reduce((s, k) => s + k.adet, 0)

  const csvIndir = () => {
    const csv = csvUret(sonuc, { isEn, tekilleriEkle: tekilGoster })
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = isEn ? 'keyword-clusters.csv' : 'anahtar-kelime-kumeleri.csv'
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  const icerik = isEn ? {
    baslik: 'Keyword Clustering Tool',
    metaBaslik: 'Keyword Clustering | Free SEO Tool',
    metaDesc: 'Group your keyword list by shared terms. Turkish aware matching, total volume per cluster, suggested page names and CSV export, all in your browser.',
    giris: 'Paste a keyword list, optionally with search volumes, and group it into clusters of keywords that share their important words. Each cluster gets a suggested page or topic name, a keyword count and a total volume, so you can see which page should target which keywords. Matching handles Turkish letters and common Turkish suffixes. Everything runs in your browser. For the whole research process, see the [keyword research guide](/en/anahtar-kelime-arastirmasi).',
    adimlar: [
      'Paste one keyword per line. To include volume, add it after a tab, comma or semicolon (e.g. "seo agency, 2400"). Two columns copied from a spreadsheet or an Ahrefs, Semrush or Search Console export work as-is.',
      'Adjust the similarity threshold. Higher values give smaller, tighter clusters; lower values merge more keywords into broader topics.',
      'Review each cluster: does it really share one search intent? Split clusters that mix, for example, "what is" questions with service or price searches.',
      'Download the CSV and turn each cluster into one page in your content plan, using the suggested name as a starting point.',
    ],
    sss: [
      { s: 'What is keyword clustering and why do it?', c: 'Keyword clustering groups keywords that can be answered by the same page. Instead of writing a separate page for every variation, you build one strong page per cluster, which avoids pages competing with each other (cannibalisation) and makes the site structure clearer. It is a core step of [keyword research](/en/anahtar-kelime-arastirmasi).' },
      { s: 'How does the tool group keywords?', c: 'Each keyword is lowercased with Turkish rules (İ to i, I to ı), optionally folded to ASCII (ş to s), cleared of conjunctions and prepositions such as "ve", "için", "the" and "for", and reduced to simple stems by conservatively removing common suffixes (lar, ler, lık, ı, sı, da, den and so on). The highest volume keyword that is not yet in a cluster becomes the head term, and every remaining keyword whose stem overlap (Jaccard similarity) with it reaches the threshold joins its cluster. Nothing is sent to a server.' },
      { s: 'Which similarity threshold should I choose?', c: '50% is a good start: "seo agency" and "istanbul seo agency" end up together, while "seo" and "seo agency" stay apart. For a landing page plan where each page targets a narrow intent, try 60 to 70%. For broad topic groups or a content hub plan, try 30 to 40%. Results depend on the head term, so review clusters before you use them.' },
      { s: 'How is this different from SERP based clustering?', c: 'This tool compares the words in the keywords. SERP based tools compare the search results: if two keywords show many of the same URLs, Google sees them as one intent. Word based grouping is fast and free, but it cannot tell, for example, that "what is seo" and "seo pricing" have different intents. Check each cluster with the [search intent guide](/en/arama-niyeti-nedir) in mind and confirm important ones by looking at the actual results.' },
      { s: 'Where can I get a keyword list with volumes?', c: 'Search Console (queries your site already appears for), Google Keyword Planner and paid tools such as Ahrefs and Semrush all export lists you can paste here. For a comparison see [the best keyword research tools](/en/en-iyi-anahtar-kelime-araclari). Without volumes, the tool still works; clusters are then ordered by keyword count.' },
      { s: 'How do I turn clusters into a content plan?', c: 'Treat each cluster as one page and the suggested name as a working title. Group related clusters under a pillar page and link them to each other; this is how [topical authority](/en/topical-authority) is built. Start with clusters that have high total volume and a clear intent you can serve well.' },
    ],
  } : {
    baslik: 'Anahtar Kelime Gruplama Aracı',
    metaBaslik: 'Anahtar Kelime Gruplama | Ücretsiz SEO Aracı',
    metaDesc: 'Anahtar kelime listenizi ortak kelimelere göre gruplayın. Türkçe eklere duyarlı eşleşme, küme hacmi, sayfa önerisi ve CSV çıktısı tarayıcınızda.',
    giris: 'Anahtar kelime listenizi, isterseniz arama hacimleriyle birlikte yapıştırın; önemli kelimeleri ortak olan anahtar kelimeler kümelere ayrılsın. Her küme için önerilen sayfa ya da konu adı, kelime sayısı ve toplam hacim gösterilir; hangi sayfanın hangi kelimeleri hedeflemesi gerektiğini görürsünüz. Eşleştirme Türkçe karakterleri ve yaygın Türkçe ekleri dikkate alır. Her şey tarayıcınızda çalışır. Sürecin tamamı için [anahtar kelime araştırması rehberine](/anahtar-kelime-arastirmasi) bakın.',
    adimlar: [
      'Her satıra bir anahtar kelime yazın. Hacim eklemek için kelimeden sonra sekme, virgül ya da noktalı virgül kullanın (ör. "seo ajansı, 2400"). Tablodan kopyalanan iki sütun ya da Ahrefs, Semrush veya Search Console dışa aktarımı olduğu gibi çalışır.',
      'Benzerlik eşiğini ayarlayın. Yüksek değer daha küçük ve sıkı kümeler, düşük değer daha geniş konu grupları verir.',
      'Her kümeye bakın: gerçekten tek bir arama niyetini mi paylaşıyor? Örneğin "nedir" sorularını hizmet ya da fiyat aramalarıyla karıştıran kümeleri bölün.',
      'CSV dosyasını indirin ve her kümeyi içerik planınızda bir sayfaya dönüştürün; önerilen adı başlangıç noktası olarak kullanın.',
    ],
    sss: [
      { s: 'Anahtar kelime gruplama (kümeleme) nedir, neden yapılır?', c: 'Anahtar kelime gruplama, aynı sayfanın cevaplayabileceği kelimeleri bir araya toplamaktır. Her varyasyon için ayrı sayfa yazmak yerine her küme için tek ve güçlü bir sayfa hazırlarsınız; böylece sayfalar birbiriyle yarışmaz (yamyamlaşma) ve site yapısı netleşir. [Anahtar kelime araştırmasının](/anahtar-kelime-arastirmasi) temel adımlarından biridir.' },
      { s: 'Araç kelimeleri nasıl grupluyor?', c: 'Her kelime Türkçe kurallarıyla küçük harfe çevrilir (İ → i, I → ı), isterseniz ASCII\'ye katlanır (ş → s), "ve", "için", "the", "for" gibi bağlaç ve edatlardan arındırılır ve yaygın ekler (lar, ler, lık, ı, sı, da, den vb.) temkinli biçimde atılarak basit köklere indirilir. Henüz bir kümeye girmemiş en yüksek hacimli kelime baş kelime olur; kök örtüşmesi (Jaccard benzerliği) eşiğe ulaşan diğer kelimeler onun kümesine katılır. Hiçbir veri sunucuya gönderilmez.' },
      { s: 'Benzerlik eşiğini nasıl seçmeliyim?', c: '%50 iyi bir başlangıçtır: "seo ajansı" ile "istanbul seo ajansı" aynı kümeye girer, "seo" ile "seo ajansı" ayrı kalır. Her sayfanın dar bir niyeti hedeflediği bir hizmet sayfası planı için %60 ile %70 arasını, geniş konu grupları ya da içerik merkezi planı için %30 ile %40 arasını deneyin. Sonuç baş kelimeye göre değiştiği için kümeleri kullanmadan önce gözden geçirin.' },
      { s: 'SERP tabanlı kümelemeden farkı nedir?', c: 'Bu araç kelimelerin kendisini karşılaştırır. SERP tabanlı araçlar ise arama sonuçlarını karşılaştırır: iki kelimede aynı URL\'lerin çoğu çıkıyorsa Google onları tek niyet olarak görüyordur. Kelime tabanlı gruplama hızlı ve ücretsizdir ama örneğin "seo nedir" ile "seo fiyatı" aramalarının niyetinin farklı olduğunu anlayamaz. Kümeleri [arama niyeti yazısındaki](/arama-niyeti-nedir) ölçütlerle kontrol edin, önemli olanları gerçek arama sonuçlarına bakarak doğrulayın.' },
      { s: 'Hacimli bir kelime listesini nereden alabilirim?', c: 'Search Console (sitenizin zaten göründüğü sorgular), Google Anahtar Kelime Planlayıcı ve Ahrefs, Semrush gibi ücretli araçlar buraya yapıştırabileceğiniz listeler verir. Karşılaştırma için [en iyi anahtar kelime araçları yazısına](/en-iyi-anahtar-kelime-araclari) bakın. Hacim olmadan da araç çalışır; kümeler o zaman kelime sayısına göre sıralanır.' },
      { s: 'Kümeleri içerik planına nasıl dönüştürürüm?', c: 'Her kümeyi bir sayfa, önerilen adı da çalışma başlığı olarak düşünün. Birbiriyle ilgili kümeleri bir ana (pillar) sayfa altında toplayıp birbirine bağlayın; [topical authority](/topical-authority) bu şekilde kurulur. Toplam hacmi yüksek ve iyi karşılayabileceğiniz net bir niyeti olan kümelerden başlayın.' },
    ],
  }

  const ozet = [
    { ad: t('Anahtar kelime', 'Keywords'), deger: sayi(okunan.kelimeler.length) },
    { ad: t('Küme', 'Clusters'), deger: sayi(sonuc.kumeler.length), vurgu: true },
    { ad: t('Kümelenen kelime', 'Clustered keywords'), deger: sayi(kumelenen) },
    { ad: t('Gruplanmamış', 'Unclustered'), deger: sayi(sonuc.tekiller.length) },
    ...(hacimVar ? [{ ad: t('Toplam hacim', 'Total volume'), deger: sayi(toplamHacim) }] : []),
  ]
  const kutuStil = { border: '1px solid #eee', borderRadius: '12px', background: '#fff', overflow: 'hidden' }
  const hucre = { padding: '6px 10px', borderBottom: '1px solid #f4f1ec', fontSize: '13px' }
  const yuzde = Math.round(esik * 100)

  return (
    <AracSayfa isEn={isEn} yol="/anahtar-kelime-gruplama" yolEn="/en/keyword-clustering" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['anahtar-kelime-arastirmasi', 'icerik-stratejisi', 'e-ticaret-seo']}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div>
          <label htmlFor="akg-liste" style={F.etiket}>{t('Anahtar kelimeler (her satıra bir tane, isteğe bağlı hacimle)', 'Keywords (one per line, optional volume)')}</label>
          <textarea id="akg-liste" value={metin} onChange={ev => { setMetin(ev.target.value); setGosterilecek(SAYFA_BOYUTU) }} rows={10} spellCheck={false}
            placeholder={t('seo ajansı\t2400\nistanbul seo ajansı, 880\nseo ajansı fiyatları', 'seo agency\t2400\nseo agency london, 880\nseo agency pricing')}
            style={{ ...F.girdi, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: '13px', lineHeight: 1.6, resize: 'vertical' }} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginTop: '8px' }}>
            <button type="button" style={F.ikincil} onClick={() => setMetin('')}>{t('Temizle', 'Clear')}</button>
            <button type="button" style={F.ikincil} onClick={() => setMetin(ORNEK_LISTE)}>{t('Örnek listeyi yükle', 'Load sample list')}</button>
            <span style={{ fontSize: '12.5px', color: '#888' }}>
              {okunan.tekrar > 0 && t(`${okunan.tekrar} tekrar birleştirildi. `, `${okunan.tekrar} duplicate(s) merged. `)}
              {okunan.fazla > 0 && <span style={{ color: '#b45309' }}>{t(`İlk ${sayi(EN_FAZLA_SATIR)} kelime işlendi, ${sayi(okunan.fazla)} kelime atlandı.`, `Only the first ${sayi(EN_FAZLA_SATIR)} keywords are processed; ${sayi(okunan.fazla)} skipped.`)}</span>}
            </span>
          </div>
        </div>

        <div className="akg-ayar" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '14px 22px', alignItems: 'start' }}>
          <div>
            <label htmlFor="akg-esik" style={F.etiket}>{t('Benzerlik eşiği', 'Similarity threshold')}: <strong style={{ color: 'var(--orange)' }}>{isEn ? `${yuzde}%` : `%${yuzde}`}</strong></label>
            <input id="akg-esik" type="range" min="0.2" max="1" step="0.05" value={esik} onChange={ev => { setEsik(Number(ev.target.value)); setGosterilecek(SAYFA_BOYUTU) }} style={{ width: '100%', accentColor: 'var(--orange)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
              <span>{t('Geniş konular', 'Broad topics')}</span><span>{t('Sıkı kümeler', 'Tight clusters')}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '8px', fontSize: '13.5px', color: '#333' }}>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={asciiKatla} onChange={ev => setAsciiKatla(ev.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--orange)' }} />
              <span>{t('Türkçe karakterleri eşle (ş = s, ı = i, ğ = g); "ayakkabı" ile "ayakkabi" aynı sayılır', 'Fold Turkish letters (ş = s, ı = i, ğ = g) so "ayakkabı" and "ayakkabi" match')}</span>
            </label>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={durakAt} onChange={ev => setDurakAt(ev.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--orange)' }} />
              <span>{t('Bağlaç ve edatları yok say (ve, ile, için, en, the, for ...)', 'Ignore conjunctions and prepositions (ve, ile, için, the, for ...)')}</span>
            </label>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={tekilGoster} onChange={ev => setTekilGoster(ev.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--orange)' }} />
              <span>{t('Gruplanmamış kelimeleri göster ve CSV\'ye ekle', 'Show unclustered keywords and include them in the CSV')}</span>
            </label>
          </div>
        </div>

        <div aria-live="polite" aria-busy={hesaplaniyor} style={{ display: 'grid', gap: '14px', opacity: hesaplaniyor ? 0.6 : 1, transition: 'opacity .15s' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
            {ozet.map(k => (
              <div key={k.ad} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 14px', background: k.vurgu ? '#faf9f7' : '#fff' }}>
                <div style={{ fontSize: '12px', color: '#777', marginBottom: '4px' }}>{k.ad}</div>
                <div style={{ fontSize: k.vurgu ? '22px' : '18px', fontWeight: 800, color: '#111', fontVariantNumeric: 'tabular-nums' }}>{k.deger}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: 0 }}>{t('Kümeler', 'Clusters')}</h2>
            <button type="button" onClick={csvIndir} style={F.buton} disabled={!okunan.kelimeler.length}>{t('CSV indir', 'Download CSV')}</button>
          </div>
          {!hacimVar && okunan.kelimeler.length > 0 && <p style={{ margin: 0, fontSize: '12.5px', color: '#888' }}>{t('Listede hacim yok; kümeler kelime sayısına göre sıralanıyor.', 'The list has no volumes, so clusters are ordered by keyword count.')}</p>}
          {okunan.kelimeler.length > 0 && sonuc.kumeler.length === 0 && <p style={{ margin: 0, fontSize: '13.5px', color: '#555' }}>{t('Bu eşikte hiç küme oluşmadı. Eşiği düşürmeyi deneyin.', 'No clusters at this threshold. Try lowering it.')}</p>}

          <div className="akg-izgara" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
            {sonuc.kumeler.slice(0, gosterilecek).map((k, i) => (
              <section key={`${k.bas}-${i}`} style={kutuStil} aria-label={k.ad}>
                <div style={{ padding: '12px 14px', background: '#faf9f7', borderBottom: '1px solid #f0ece6' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111', margin: 0, overflowWrap: 'anywhere' }}><span style={{ color: '#bbb', fontWeight: 700, marginRight: '6px' }}>{i + 1}.</span>{k.ad}</h3>
                    <span style={{ fontSize: '12.5px', color: '#555', whiteSpace: 'nowrap' }}>{t(`${k.adet} kelime`, `${k.adet} keywords`)}{k.hacimli ? ` · ${sayi(k.toplamHacim)}` : ''}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '2px', overflowWrap: 'anywhere' }}>{t('Baş kelime', 'Head term')}: {k.bas}</div>
                </div>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                    <tr><th scope="col">{t('Anahtar kelime', 'Keyword')}</th><th scope="col">{t('Hacim', 'Volume')}</th></tr>
                  </thead>
                  <tbody>
                    {k.kelimeler.map(w => (
                      <tr key={w.kelime}>
                        <td style={{ ...hucre, color: '#222', overflowWrap: 'anywhere' }}>{w.kelime}</td>
                        <td style={{ ...hucre, textAlign: 'right', color: '#555', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', width: '1%' }}>{w.hacim != null ? sayi(w.hacim) : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
          </div>
          {sonuc.kumeler.length > gosterilecek && (
            <button type="button" style={{ ...F.ikincil, justifySelf: 'start' }} onClick={() => setGosterilecek(g => g + SAYFA_BOYUTU)}>
              {t(`Daha fazla küme göster (${sonuc.kumeler.length - gosterilecek} kaldı)`, `Show more clusters (${sonuc.kumeler.length - gosterilecek} left)`)}
            </button>
          )}

          {tekilGoster && sonuc.tekiller.length > 0 && (
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '4px 0 6px' }}>{t('Gruplanmamış kelimeler', 'Unclustered keywords')} ({sayi(sonuc.tekiller.length)})</h2>
              <p style={{ margin: '0 0 8px', fontSize: '12.5px', color: '#888' }}>{t('Bu kelimeler eşikte başka hiçbir kelimeyle eşleşmedi. Kendi sayfasını hak eden ayrı bir niyet olabilir ya da eşik yüksek olabilir.', 'These keywords did not match any other keyword at this threshold. They may be a separate intent worth their own page, or the threshold may be too high.')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
                {sonuc.tekiller.slice(0, 500).map(w => (
                  <span key={w.kelime} style={{ fontSize: '12.5px', background: '#f5f5f4', borderRadius: '999px', padding: '3px 10px', color: '#333' }}>{w.kelime}{w.hacim != null ? <span style={{ color: '#999' }}> · {sayi(w.hacim)}</span> : null}</span>
                ))}
                {sonuc.tekiller.length > 500 && <span style={{ fontSize: '12.5px', color: '#888' }}>{t(`ve ${sayi(sonuc.tekiller.length - 500)} kelime daha (CSV'de)`, `and ${sayi(sonuc.tekiller.length - 500)} more (in the CSV)`)}</span>}
              </div>
            </div>
          )}
        </div>

        <p style={{ fontSize: '12.5px', color: '#666', margin: 0, lineHeight: 1.6 }}>
          {t('Gruplama kelime benzerliğine dayanır, arama sonuçlarına bakmaz. Aynı kelimeleri paylaşan ama niyeti farklı aramaları (ör. "nedir" ile "fiyatları") ayrı sayfalarda ele almanız gerekebilir. Listeniz yalnızca tarayıcınızda işlenir.', 'Grouping is based on word similarity, not on search results. Searches that share words but differ in intent (e.g. "what is" and "pricing") may still need separate pages. Your list is processed only in your browser.')}
        </p>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@media (max-width: 760px){.akg-izgara,.akg-ayar{grid-template-columns:minmax(0,1fr)!important}}' }} />
    </AracSayfa>
  )
}
