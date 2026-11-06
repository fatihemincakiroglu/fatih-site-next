import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { VARSAYILAN, PARA_BIRIMLERI, seoRoiHesapla } from '../../lib/seo-roi'

// SEO ROI hesaplayıcı: hesap tamamen tarayıcıda yapılır, hiçbir veri gönderilmez.
// TR: /seo-roi-hesaplayici   EN: /en/seo-roi-calculator
// Sonuçlar yalnızca kullanıcının girdiği varsayımlara dayanır; araç hazır sektör ortalaması kullanmaz.

const RENK = { brut: 'var(--orange)', maliyet: '#9ca3af', arti: '#15803d', eksi: '#b91c1c' }

export default function SeoRoiHesaplayici(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [g, setG] = useState(() => Object.fromEntries(Object.entries(VARSAYILAN).map(([k, x]) => [k, String(x)])))
  const [para, setPara] = useState('TRY')
  const degistir = (k) => (ev) => setG(s => ({ ...s, [k]: ev.target.value }))

  const r = useMemo(() => seoRoiHesapla(g), [g])
  const yerel = isEn ? 'en-US' : 'tr-TR'
  const tutar = (x) => new Intl.NumberFormat(yerel, { style: 'currency', currency: para, maximumFractionDigits: 0 }).format(Math.round(x) || 0)
  const adet = (x, ondalik = 0) => new Intl.NumberFormat(yerel, { maximumFractionDigits: ondalik, minimumFractionDigits: 0 }).format(x || 0)
  const yuzde = (x) => `${isEn ? '' : '%'}${adet(x, 0)}${isEn ? '%' : ''}`

  const alanlar = [
    { k: 'oturum', ad: t('Mevcut aylık organik oturum', 'Current monthly organic sessions'), adim: 100 },
    { k: 'artis', ad: t('Beklenen organik trafik artışı (%)', 'Expected organic traffic growth (%)'), adim: 5, not: t('Dönem sonunda ulaşılması beklenen artış', 'Growth expected by the end of the period') },
    { k: 'ay', ad: t('Dönem (ay)', 'Period (months)'), adim: 1, not: t('Artışa bu sürede doğrusal olarak ulaşıldığı varsayılır (en fazla 60)', 'Growth is assumed to be reached linearly over this period (max 60)') },
    { k: 'donusum', ad: t('Dönüşüm oranı (%)', 'Conversion rate (%)'), adim: 0.1, not: t('Organik oturumların satışa ya da müşteri adayına dönüşme oranı', 'Share of organic sessions that become a sale or a lead') },
    { k: 'deger', ad: t('Ortalama sipariş ya da müşteri adayı değeri', 'Average order or lead value'), adim: 50, para: true },
    { k: 'marj', ad: t('Brüt marj (%)', 'Gross margin (%)'), adim: 1, not: t('Ciro üzerinden hesap için 100 yazın', 'Enter 100 to calculate on revenue') },
    { k: 'aylikMaliyet', ad: t('Aylık SEO maliyeti', 'Monthly SEO cost'), adim: 1000, para: true, not: t('Danışmanlık, içerik, araçlar ve iç ekip zamanı', 'Consulting, content, tools and in-house time') },
    { k: 'kurulum', ad: t('Tek seferlik kurulum maliyeti (isteğe bağlı)', 'One-time setup cost (optional)'), adim: 1000, para: true, not: t('1. aya eklenir', 'Added to month 1') },
  ]

  const enBuyuk = Math.max(1, ...r.aylar.map(a => Math.max(a.ekBrut, a.maliyet)))
  const etiketAraligi = r.aylar.length <= 12 ? 1 : r.aylar.length <= 24 ? 2 : r.aylar.length <= 36 ? 3 : 6
  const roiRenk = r.roi === null ? '#555' : r.roi >= 0 ? RENK.arti : RENK.eksi

  const kartlar = [
    { ad: t('Ek organik oturum', 'Extra organic sessions'), deger: adet(r.toplam.ekOturum) },
    { ad: t('Ek dönüşüm', 'Extra conversions'), deger: adet(r.toplam.ekDonusum, 1) },
    { ad: t('Ek gelir', 'Extra revenue'), deger: tutar(r.toplam.ekGelir) },
    { ad: t('Ek brüt kâr', 'Extra gross profit'), deger: tutar(r.toplam.ekBrut) },
    { ad: t('Toplam SEO maliyeti', 'Total SEO cost'), deger: tutar(r.toplam.maliyet) },
    { ad: t('Net kazanç', 'Net gain'), deger: tutar(r.toplam.net), renk: r.toplam.net >= 0 ? RENK.arti : RENK.eksi },
    { ad: 'ROI', deger: r.roi === null ? t('maliyet yok', 'no cost') : yuzde(r.roi), renk: roiRenk, vurgu: true },
    { ad: t('Geri ödeme', 'Payback'), deger: r.geriOdemeAyi ? t(`${r.geriOdemeAyi}. ay`, `Month ${r.geriOdemeAyi}`) : t('Dönem içinde yok', 'Not within period'), vurgu: true },
  ]

  const icerik = isEn ? {
    baslik: 'SEO ROI Calculator',
    metaBaslik: 'SEO ROI Calculator | Free SEO Tool',
    metaDesc: 'Estimate the return on your SEO investment from your own traffic, conversion and cost assumptions. See extra profit, ROI and payback month.',
    giris: 'Estimate the return on SEO with your own numbers: enter current organic traffic, expected growth, conversion rate, average value, gross margin and cost to see extra profit, ROI and the payback month, month by month. Everything is calculated in your browser and nothing is sent. The result is not a guarantee but a scenario based on the assumptions you enter.',
    adimlar: [
      'Enter your current monthly organic sessions and conversion rate from GA4 or your analytics tool. Use a recent, typical period rather than a seasonal peak.',
      'Set the growth you expect and the period. The tool assumes growth is reached linearly, so month 1 gets a small share and the last month gets the full increase.',
      'Enter the average order or lead value, your gross margin and all SEO costs. Pick the currency that matches your figures.',
      'Read the results and the monthly table. Try a cautious, an expected and an optimistic scenario instead of relying on a single number.',
    ],
    sss: [
      { s: 'How is SEO ROI calculated here?', c: 'ROI = (extra gross profit from SEO - total SEO cost) / total SEO cost. Extra gross profit is extra sessions × conversion rate × average order or lead value × gross margin. How to set up the measurement in practice is covered in the [SEO ROI measurement article](/en/seo-roi-olcumu).' },
      { s: 'Why gross profit instead of revenue?', c: 'Revenue is not all gain; an ROI calculated before product or service costs looks misleadingly high. Set gross margin to 100% if you want the revenue-based figure. If you collect leads, you can enter the average gross profit a lead brings as the value and leave the margin at 100%.' },
      { s: 'Why is growth assumed to be linear?', c: 'SEO impact usually builds up gradually. Linear growth is a simple and transparent assumption; the real curve depends on your site, competition and how fast changes are implemented. Read the result as a scenario, not a forecast, and compare several growth rates and periods.' },
      { s: 'Which growth rate should I enter?', c: 'The tool deliberately does not suggest an average. Start from your own history (organic growth in earlier periods), the search volume of the keywords you target and your current rankings. Calculating cautious, expected and optimistic scenarios is a sound approach. For metrics worth tracking, see the [SEO KPI article](/en/seo-kpi).' },
      { s: 'If there is no payback within the period, is SEO unprofitable?', c: 'Not necessarily. Traffic earned through SEO often continues for a while after the work stops, while this tool only counts the selected period. The "monthly net at period end" figure shows the monthly contribution once growth is reached. Effects that are hard to measure, such as brand awareness, are not included.' },
      { s: 'What should I count as monthly SEO cost?', c: 'Besides agency or consultant fees, include content production, tool subscriptions and the cost of in-house time spent on SEO. For common pricing models see the [SEO agency pricing article](/en/seo-ajansi-fiyatlari), and for my packages see the [pricing page](/en/pricing).' },
    ],
  } : {
    baslik: 'SEO ROI Hesaplayıcı',
    metaBaslik: 'SEO ROI Hesaplayıcı | Ücretsiz SEO Aracı',
    metaDesc: 'SEO yatırımınızın getirisini kendi trafik, dönüşüm ve maliyet varsayımlarınızla tahmin edin. Ek kârı, ROI\'yi ve geri ödeme ayını görün.',
    giris: 'SEO yatırımının getirisini kendi rakamlarınızla tahmin edin: mevcut organik trafiği, beklenen artışı, dönüşüm oranını, ortalama değeri, brüt marjı ve maliyeti girin; ek kârı, ROI\'yi ve geri ödeme ayını ay ay görün. Hesap tamamen tarayıcınızda yapılır, hiçbir veri gönderilmez. Sonuç bir garanti değil, girdiğiniz varsayımlara dayanan bir senaryodur.',
    adimlar: [
      'Mevcut aylık organik oturum sayınızı ve dönüşüm oranınızı GA4 ya da kullandığınız analiz aracından alın. Sezonluk zirve yerine yakın tarihli, olağan bir dönemi esas alın.',
      'Beklediğiniz artışı ve dönemi girin. Araç artışa doğrusal olarak ulaşıldığını varsayar: 1. ay artışın küçük bir kısmını, son ay ise tamamını alır.',
      'Ortalama sipariş ya da müşteri adayı değerini, brüt marjınızı ve tüm SEO maliyetlerini yazın. Rakamlarınıza uyan para birimini seçin.',
      'Sonuçları ve aylık tabloyu okuyun. Tek bir rakama güvenmek yerine temkinli, beklenen ve iyimser olmak üzere üç senaryo deneyin.',
    ],
    sss: [
      { s: 'SEO ROI nasıl hesaplanır?', c: 'Bu araç ROI\'yi (SEO\'dan gelen ek brüt kâr - toplam SEO maliyeti) / toplam SEO maliyeti formülüyle hesaplar. Ek brüt kâr; ek oturum × dönüşüm oranı × ortalama sipariş ya da müşteri adayı değeri × brüt marj ile bulunur. Ölçümün pratikte nasıl kurulacağını [SEO ROI ölçümü yazısında](/seo-roi-olcumu) anlattım.' },
      { s: 'Neden ciro değil brüt kâr kullanılıyor?', c: 'Cironun tamamı kazanç değildir; ürün ya da hizmet maliyeti düşülmeden hesaplanan ROI yanıltıcı derecede yüksek çıkar. Brüt marjı %100 yaparsanız ciro üzerinden hesabı görürsünüz. Müşteri adayı topluyorsanız ortalama değer olarak bir adayın ortalama getirdiği brüt kârı yazıp marjı %100 bırakabilirsiniz.' },
      { s: 'Trafik artışı neden doğrusal varsayılıyor?', c: 'SEO etkisi genellikle kademeli birikir. Doğrusal artış basit ve şeffaf bir varsayımdır; gerçek eğri sitenize, rekabete ve değişikliklerin ne kadar hızlı uygulandığına göre farklı olur. Sonucu kesin bir tahmin değil senaryo olarak okuyun ve birkaç farklı artış oranı ile süreyi karşılaştırın.' },
      { s: 'Hangi artış oranını yazmalıyım?', c: 'Araç bilerek hazır bir ortalama önermez. Kendi geçmiş verinizden (önceki dönemlerdeki organik büyüme), hedeflediğiniz anahtar kelimelerin arama hacminden ve mevcut sıralamalarınızdan yola çıkın. Temkinli, beklenen ve iyimser üç senaryo hesaplamak sağlıklı bir yöntemdir. Takip edilecek göstergeler için [SEO KPI yazısına](/seo-kpi) bakın.' },
      { s: 'Dönem içinde geri ödeme yoksa SEO kârsız mı demektir?', c: 'Şart değil. SEO ile kazanılan trafik çoğu zaman çalışma durduktan sonra da bir süre devam eder; bu araç ise yalnızca seçtiğiniz dönemi sayar. "Dönem sonu aylık net" değeri, artışa ulaşıldıktan sonraki aylık katkıyı gösterir. Marka bilinirliği gibi ölçülmesi zor etkiler hesaba girmez.' },
      { s: 'Aylık SEO maliyeti olarak neleri saymalıyım?', c: 'Ajans ya da danışman ücretine ek olarak içerik üretimi, araç abonelikleri ve iç ekibin SEO\'ya ayırdığı zamanın maliyetini de ekleyin. Yaygın fiyat modelleri için [SEO ajansı fiyatları yazısına](/seo-ajansi-fiyatlari), çalışma paketlerim için [fiyatlandırma sayfasına](/fiyatlandirma) bakabilirsiniz.' },
    ],
  }

  const hucre = { padding: '7px 10px', borderBottom: '1px solid #f0ece6', textAlign: 'right', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }

  return (
    <AracSayfa isEn={isEn} yol="/seo-roi-hesaplayici" yolEn="/en/seo-roi-calculator" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['seo-raporlama', 'icerik-stratejisi', 'teknik-seo']}>
      <div style={{ display: 'grid', gap: '20px' }}>
        <div className="roi-girdi" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px 18px' }}>
          {alanlar.map(a => (
            <div key={a.k}>
              <label htmlFor={`roi-${a.k}`} style={F.etiket}>{a.ad}{a.para ? ` (${para})` : ''}</label>
              <input id={`roi-${a.k}`} type="number" inputMode="decimal" min="0" step={a.adim} value={g[a.k]} onChange={degistir(a.k)} style={F.girdi} />
              {a.not && <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{a.not}</div>}
            </div>
          ))}
          <div>
            <label htmlFor="roi-para" style={F.etiket}>{t('Para birimi', 'Currency')}</label>
            <select id="roi-para" value={para} onChange={ev => setPara(ev.target.value)} style={F.girdi}>
              {PARA_BIRIMLERI.map(p => <option key={p} value={p}>{p === 'TRY' ? 'TL (TRY)' : p}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button type="button" style={F.ikincil} onClick={() => setG(Object.fromEntries(Object.entries(VARSAYILAN).map(([k, x]) => [k, String(x)])))}>{t('Örnek değerlere dön', 'Reset to sample values')}</button>
          </div>
        </div>

        <div role="note" style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px 14px', fontSize: '13.5px', color: '#444', lineHeight: 1.6 }}>
          <strong style={{ color: '#b45309' }}>{t('Tahmindir, garanti değildir.', 'This is an estimate, not a guarantee.')}</strong>{' '}
          {t('Sonuçlar yalnızca yukarıda girdiğiniz varsayımlardan hesaplanır; araç hiçbir sektör ortalaması ya da hazır kıyas verisi kullanmaz. Açılıştaki rakamlar yalnızca örnektir. SEO olmasa organik trafiğin mevcut seviyede sabit kalacağı varsayılır.', 'Results are calculated only from the assumptions you enter above; the tool uses no industry averages or benchmark data. The starting figures are just an example. Without SEO, organic traffic is assumed to stay at its current level.')}
        </div>

        <div aria-live="polite">
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{t(`${r.girdi.ay} aylık tahmini sonuç`, `Estimated result over ${r.girdi.ay} months`)}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '10px' }}>
            {kartlar.map(k => (
              <div key={k.ad} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 14px', background: k.vurgu ? '#faf9f7' : '#fff' }}>
                <div style={{ fontSize: '12px', color: '#777', marginBottom: '4px' }}>{k.ad}</div>
                <div style={{ fontSize: k.vurgu ? '22px' : '18px', fontWeight: 800, color: k.renk || '#111', fontVariantNumeric: 'tabular-nums', overflowWrap: 'anywhere' }}>{k.deger}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: '#555', margin: '10px 0 0', lineHeight: 1.6 }}>
            {t('Dönem sonunda ulaşılan seviye: ayda', 'Level reached at period end:')} <strong>{adet(r.donemSonuAylikEkOturum)}</strong> {t('ek oturum. Aylık maliyet aynı kalırsa dönem sonu aylık net', 'extra sessions per month. If the monthly cost stays the same, monthly net at period end is')} <strong style={{ color: r.donemSonuAylikNet >= 0 ? RENK.arti : RENK.eksi }}>{tutar(r.donemSonuAylikNet)}</strong>.
          </p>
        </div>

        <figure style={{ margin: 0 }}>
          <figcaption style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', fontSize: '12.5px', color: '#555', marginBottom: '8px' }}>
            <strong style={{ color: '#111' }}>{t('Aylık ek brüt kâr ve maliyet', 'Monthly extra gross profit and cost')}</strong>
            <span><span aria-hidden="true" style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', background: RENK.brut, marginRight: '5px' }} />{t('Ek brüt kâr', 'Extra gross profit')}</span>
            <span><span aria-hidden="true" style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', background: RENK.maliyet, marginRight: '5px' }} />{t('Maliyet', 'Cost')}</span>
            {r.geriOdemeAyi && <span><span aria-hidden="true" style={{ display: 'inline-block', width: '10px', height: '2px', background: RENK.arti, marginRight: '5px', verticalAlign: 'middle' }} />{t('Geri ödeme ayı', 'Payback month')}</span>}
          </figcaption>
          <div aria-hidden="true" style={{ border: '1px solid #eee', borderRadius: '10px', padding: '14px 12px 8px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: r.aylar.length > 24 ? '2px' : '6px', height: '180px', minWidth: `${r.aylar.length * (r.aylar.length > 24 ? 10 : 22)}px` }}>
              {r.aylar.map(a => (
                <div key={a.ay} title={`${t('Ay', 'Month')} ${a.ay}: ${tutar(a.ekBrut)} / ${tutar(a.maliyet)}`}
                  style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end', gap: '1px', borderBottom: a.ay === r.geriOdemeAyi ? `3px solid ${RENK.arti}` : '3px solid transparent' }}>
                  <div style={{ flex: 1, height: `${(a.ekBrut / enBuyuk) * 100}%`, minHeight: a.ekBrut > 0 ? '1px' : 0, background: RENK.brut, borderRadius: '2px 2px 0 0' }} />
                  <div style={{ flex: 1, height: `${(a.maliyet / enBuyuk) * 100}%`, minHeight: a.maliyet > 0 ? '1px' : 0, background: RENK.maliyet, borderRadius: '2px 2px 0 0' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: r.aylar.length > 24 ? '2px' : '6px', minWidth: `${r.aylar.length * (r.aylar.length > 24 ? 10 : 22)}px`, marginTop: '4px' }}>
              {r.aylar.map(a => (
                <div key={a.ay} style={{ flex: 1, textAlign: 'center', fontSize: '10.5px', color: '#888' }}>{a.ay === 1 || a.ay % etiketAraligi === 0 ? a.ay : ''}</div>
              ))}
            </div>
          </div>
        </figure>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{t('Ay ay tablo', 'Month by month')}</h2>
          <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px', maxHeight: '460px', overflowY: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px', minWidth: '720px' }}>
              <thead>
                <tr style={{ background: '#faf9f7', position: 'sticky', top: 0 }}>
                  {[t('Ay', 'Month'), t('Ek oturum', 'Extra sessions'), t('Ek dönüşüm', 'Extra conv.'), t('Ek gelir', 'Extra revenue'), t('Ek brüt kâr', 'Extra gross profit'), t('Maliyet', 'Cost'), t('Kümülatif net', 'Cumulative net')].map((b, i) => (
                    <th key={b} scope="col" style={{ ...hucre, textAlign: i ? 'right' : 'left', fontWeight: 700, borderBottom: '1px solid #eee', background: '#faf9f7' }}>{b}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.aylar.map(a => (
                  <tr key={a.ay} style={a.ay === r.geriOdemeAyi ? { background: '#f0fdf4' } : undefined}>
                    <th scope="row" style={{ ...hucre, textAlign: 'left', fontWeight: 600 }}>{a.ay}</th>
                    <td style={hucre}>{adet(a.ekOturum)}</td>
                    <td style={hucre}>{adet(a.ekDonusum, 1)}</td>
                    <td style={hucre}>{tutar(a.ekGelir)}</td>
                    <td style={hucre}>{tutar(a.ekBrut)}</td>
                    <td style={hucre}>{tutar(a.maliyet)}</td>
                    <td style={{ ...hucre, fontWeight: 700, color: a.kumulatifNet >= 0 ? RENK.arti : RENK.eksi }}>{tutar(a.kumulatifNet)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: '#faf9f7' }}>
                  <th scope="row" style={{ ...hucre, textAlign: 'left' }}>{t('Toplam', 'Total')}</th>
                  <td style={{ ...hucre, fontWeight: 700 }}>{adet(r.toplam.ekOturum)}</td>
                  <td style={{ ...hucre, fontWeight: 700 }}>{adet(r.toplam.ekDonusum, 1)}</td>
                  <td style={{ ...hucre, fontWeight: 700 }}>{tutar(r.toplam.ekGelir)}</td>
                  <td style={{ ...hucre, fontWeight: 700 }}>{tutar(r.toplam.ekBrut)}</td>
                  <td style={{ ...hucre, fontWeight: 700 }}>{tutar(r.toplam.maliyet)}</td>
                  <td style={{ ...hucre, fontWeight: 700, color: r.toplam.net >= 0 ? RENK.arti : RENK.eksi }}>{tutar(r.toplam.net)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p style={{ fontSize: '12.5px', color: '#666', margin: '8px 0 0', lineHeight: 1.6 }}>
            {t('ROI = (toplam ek brüt kâr - toplam maliyet) / toplam maliyet. Geri ödeme ayı, kümülatif ek brüt kârın kümülatif maliyete ilk ulaştığı aydır.', 'ROI = (total extra gross profit - total cost) / total cost. The payback month is the first month in which cumulative extra gross profit reaches cumulative cost.')}
          </p>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@media (max-width: 640px){.roi-girdi{grid-template-columns:minmax(0,1fr)!important}}' }} />
    </AracSayfa>
  )
}
