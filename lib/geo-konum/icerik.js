// ─────────────────────────────────────────────────────────────
// Yerel GEO uzmanı sayfaları — içerik üretimi
//
// Akış ve anlam her sayfada aynıdır (kaynak: İstanbul GEO Uzmanı metni).
// Benzersizlik üç katmandan gelir:
//   1) Her paragrafın 4 farklı yazımı var (v0 = orijinal metin).
//      Hangi yazımın kullanılacağı ilçe adından hesaplanan sabit bir
//      değerle seçilir; build'den build'e değişmez.
//   2) İlçeye özgü bağlam, sektörler, örnek işletme ve örnek sorgular.
//   3) Listelerde ilçeye göre sabit sıralama ve iki ayrı ifade seti.
// İstanbul sayfası her zaman v0'ı (orijinal metni) kullanır.
//
// Paragraf içi [metin](/url) link, **metin** kalın olarak render edilir.
// İç link anahtar kelimeleri ve URL'leri tüm sayfalarda aynıdır (LINK).
// ─────────────────────────────────────────────────────────────

import { KONUMLAR } from './ilceler'

export const LINK = {
  seoUzmani: '/seo-uzmani',
  googleAds: '/performans',
  dijitalPazarlama: '/hizmetler',
  seoRehberi: '/seo-rehberi',
  geoRehberi: '/geo-rehberi',
  referanslar: '/referanslar',
  aiSozluk: '/ai-sozluk',
  geoAjans10: '/blog/turkiye-en-iyi-10-geo-ajansi-2026',
  seoAjans15: '/blog/turkiye-en-iyi-15-seo-ajansi-2026',
}

// ── yardımcılar ──────────────────────────────────────────────
function hash(s) {
  let h = 2166136261
  for (const c of s) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619) }
  return h >>> 0
}
const coz = (v, d) => (typeof v === 'function' ? v(d) : v)

// ── Varyant ataması ─────────────────────────────────────────
// Her konuma L uzunluğunda bir varyant vektörü atanır; her paragraf slotu
// bu vektörde sabit bir pozisyona denk gelir. Vektörler, sayfa çiftlerinin
// aynı varyantı paylaştığı slot sayısını en aza indirecek şekilde sabit
// tohumlu bir optimizasyonla üretilir (her build'de aynı sonuç).
// İstanbul satırı sabit 0'dır (orijinal metin) ve optimizasyona dahildir;
// yani ilçeler İstanbul sayfasından da mümkün olduğunca uzaklaştırılır.
// NOT: KONUMLAR'a yeni konum eklemek mevcut atamaları değiştirir.
const L = 128
const V = 4
function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const VEKTOR = (() => {
  const rnd = mulberry32(20261003)
  const n = KONUMLAR.length
  const vek = KONUMLAR.map(k => Array.from({ length: L }, () => (k.slug === 'istanbul' ? 0 : Math.floor(rnd() * V))))
  const uyum = Array.from({ length: n }, () => new Array(n).fill(0))
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    let c = 0; for (let p = 0; p < L; p++) if (vek[i][p] === vek[j][p]) c++
    uyum[i][j] = uyum[j][i] = c
  }
  const sabit = KONUMLAR.map(k => k.slug === 'istanbul')
  for (let it = 0; it < 60000; it++) {
    const i = Math.floor(rnd() * n)
    if (sabit[i]) continue
    const p = Math.floor(rnd() * L)
    const a = vek[i][p], b = Math.floor(rnd() * V)
    if (a === b) continue
    let delta = 0
    for (let j = 0; j < n; j++) {
      if (j === i) continue
      const fark = (vek[j][p] === b ? 1 : 0) - (vek[j][p] === a ? 1 : 0)
      if (fark) delta += (uyum[i][j] + fark) ** 2 - uyum[i][j] ** 2
    }
    if (delta < 0) {
      vek[i][p] = b
      for (let j = 0; j < n; j++) {
        if (j === i) continue
        const fark = (vek[j][p] === b ? 1 : 0) - (vek[j][p] === a ? 1 : 0)
        uyum[i][j] += fark; uyum[j][i] += fark
      }
    }
  }
  return Object.fromEntries(KONUMLAR.map((k, i) => [k.slug, vek[i]]))
})()
const pozisyon = (id) => hash(id) % L

// Varyant seçimi: İstanbul her zaman v0 (orijinal metin).
function sec(d, id, arr) {
  return coz(arr[VEKTOR[d.slug][pozisyon(id)] % arr.length], d)
}
// Liste sırası: İstanbul orijinal sırada, diğerleri ilçeye göre sabit karışık.
function karistir(d, id, arr) {
  if (d.slug === 'istanbul') return arr
  return [...arr].sort((a, b) => hash(`${d.slug}|${id}|${a}`) - hash(`${d.slug}|${id}|${b}`))
}
const buyukHarf = (s) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1)
const liste = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} ve ${a[a.length - 1]}`)

const h2 = (x) => ({ t: 'h2', x })
const h3 = (x) => ({ t: 'h3', x })
const p = (x) => ({ t: 'p', x })
const ul = (x) => ({ t: 'ul', x })
const q = (x) => ({ t: 'q', x })

// ── içerik ───────────────────────────────────────────────────
export function konumIcerigi(d) {
  const S = (id, arr) => sec(d, id, arr)
  const ist = d.slug === 'istanbul'
  const bloklar = []
  const ekle = (...b) => bloklar.push(...b)

  // 1) GİRİŞ
  ekle(
    p(S('i1', [
      `${d.ad} GEO Uzmanı, markaların yalnızca Google gibi klasik arama motorlarında değil; ChatGPT, Gemini, Perplexity, Google AI Overviews ve benzeri üretken yapay zekâ sistemlerinde de daha görünür ve anlaşılır hale gelmesi için çalışan dijital pazarlama uzmanıdır.`,
      `${d.ad} GEO Uzmanı; işletmelerin Google'ın klasik sonuçlarının yanı sıra ChatGPT, Gemini, Perplexity ve Google AI Overviews gibi üretken yapay zekâ sistemlerinde de doğru anlaşılmasını ve görünür olmasını sağlamaya odaklanan dijital pazarlama uzmanıdır.`,
      `${d.loc} faaliyet gösteren markaların hem Google gibi geleneksel arama motorlarında hem de ChatGPT, Gemini, Perplexity ve Google AI Overviews gibi üretken yapay zekâ sistemlerinde daha görünür ve daha anlaşılır olması için çalışan dijital pazarlama uzmanına ${d.ad} GEO Uzmanı denir.`,
      `${d.ad} GEO Uzmanı olarak yürütülen çalışmaların amacı, markaları yalnızca Google'ın arama sonuçlarında değil; ChatGPT, Gemini, Perplexity, Google AI Overviews ve benzeri üretken yapay zekâ sistemlerinin verdiği cevaplarda da görünür ve anlaşılır kılmaktır. Bu iş, dijital pazarlamanın yeni uzmanlık alanlarından biridir.`,
    ])),
    p(S('i2', [
      "Kullanıcıların bilgiye ulaşma biçimi değiştikçe dijital görünürlük kavramı da genişliyor. İnsanlar artık yalnızca Google üzerinden arama yapmıyor; ürün araştırmak, hizmet sağlayıcı bulmak, alternatifleri karşılaştırmak ve karar vermek için yapay zekâ araçlarına doğrudan sorular yöneltiyor.",
      "Dijital görünürlük, kullanıcıların bilgiye erişme şekliyle birlikte genişleyen bir kavram. Bugün pek çok kişi bir ürünü araştırırken, hizmet sağlayıcı ararken ya da seçenekleri karşılaştırırken Google'a ek olarak yapay zekâ araçlarına doğrudan soru soruyor ve kararını bu cevaplar üzerinden şekillendiriyor.",
      "Arama alışkanlıkları değiştikçe görünür olmanın anlamı da değişiyor. Kullanıcılar Google'ı kullanmaya devam ediyor; ancak ürün araştırması, hizmet sağlayıcı seçimi, alternatif karşılaştırması ve karar aşamasında yapay zekâ araçlarına doğrudan soru yöneltenlerin sayısı her geçen gün artıyor.",
      "İnsanların bilgiye ulaşma yolları çeşitlendikçe dijital görünürlüğün sınırları da genişliyor. Artık arama yalnızca Google'da başlamıyor; bir hizmet sağlayıcı bulmak, ürünleri kıyaslamak veya bir karara varmak isteyen kullanıcılar sorularını doğrudan yapay zekâ araçlarına soruyor.",
    ])),
    p(S('i3', [
      "Bu değişim, markaların içeriklerini yalnızca klasik SEO kriterlerine göre değil, yapay zekâ destekli arama sistemlerinin bilgiyi nasıl yorumladığına göre de şekillendirmesini gerekli hale getiriyor.",
      "Bu nedenle markaların içeriklerini klasik SEO kriterlerinin yanında, yapay zekâ destekli arama sistemlerinin bilgiyi nasıl okuyup yorumladığını da dikkate alarak kurgulaması gerekiyor.",
      "Bu tablo, içeriklerin yalnızca geleneksel SEO ölçütlerine göre hazırlanmasını yetersiz kılıyor; yapay zekâ destekli arama sistemlerinin bilgiyi nasıl yorumladığı da içerik planlamasının bir parçası hâline geliyor.",
      `${d.loc} hizmet veren işletmeler için bu değişimin sonucu açık: içerikler artık yalnızca klasik SEO kurallarına göre değil, yapay zekâ destekli arama sistemlerinin bilgiyi yorumlama biçimine göre de şekillendirilmeli.`,
    ])),
    p(S('i4', [
      "Profesyonel bir GEO uzmanı, markanın hangi konularla ilişkilendirildiğini, web sitesindeki içeriklerin ne kadar açık olduğunu, marka otoritesinin nasıl oluştuğunu ve yapay zekâ sistemlerinin markayı hangi bağlamlarda değerlendirebileceğini analiz eder.",
      "Profesyonel bir GEO uzmanı; markanın hangi konularla bağdaştırıldığını, web sitesindeki içeriklerin ne ölçüde net olduğunu, marka otoritesinin hangi kaynaklardan beslendiğini ve yapay zekâ sistemlerinin markayı hangi bağlamlarda ele alabileceğini inceler.",
      "Bu noktada GEO uzmanının görevi analiz etmektir: Marka hangi konularla eşleşiyor, web sitesindeki içerikler ne kadar açık, marka otoritesi nasıl oluşuyor ve yapay zekâ sistemleri markayı hangi bağlamlarda değerlendirebilir?",
      "Deneyimli bir GEO uzmanı işe markanın dijital resmini çıkararak başlar; markanın hangi konularla anıldığını, içeriklerin açıklık düzeyini, otoritenin nereden geldiğini ve yapay zekâ sistemlerinin markayı hangi bağlamlarda değerlendirebileceğini analiz eder.",
    ])),
  )

  // 2) GEO NEDİR?
  ekle(
    h2('GEO Nedir?'),
    p(S('g1', [
      "GEO, Generative Engine Optimization kavramının kısaltmasıdır.",
      "GEO, İngilizce Generative Engine Optimization ifadesinin kısaltmasıdır; Türkçede üretken motor optimizasyonu olarak da karşılanır.",
      "GEO kısaltması, Generative Engine Optimization yani üretken arama motoru optimizasyonu anlamına gelir.",
      "GEO, “Generative Engine Optimization” kavramının baş harflerinden oluşan kısaltmadır.",
    ])),
    p(S('g2', [
      "En temel tanımıyla GEO; markaların ve web sitelerinin üretken yapay zekâ destekli arama ve cevap sistemlerinde daha doğru anlaşılması, ilgili sorgularla eşleştirilmesi ve güvenilir bir bilgi kaynağı olarak değerlendirilmesi için gerçekleştirilen optimizasyon çalışmalarını ifade eder.",
      "Kısaca GEO; markaların ve web sitelerinin üretken yapay zekâ tabanlı arama ve cevap sistemleri tarafından daha doğru anlaşılmasını, uygun sorgularla eşleşmesini ve güvenilir bir bilgi kaynağı olarak görülmesini hedefleyen optimizasyon çalışmalarının bütünüdür.",
      "Temel tanımıyla GEO, bir markanın ve web sitesinin yapay zekâ destekli arama ve cevap sistemlerinde doğru yorumlanması, ilgili sorularla ilişkilendirilmesi ve güvenilir bir kaynak olarak kabul görmesi için yapılan optimizasyon çalışmalarını kapsar.",
      "Bu çalışmaların ortak hedefi; markanın ve web sitesinin üretken yapay zekâ destekli arama ve cevap sistemlerinde doğru anlaşılması, ilgili sorgularla eşleştirilmesi ve güvenilir bir bilgi kaynağı olarak değerlendirilmesidir.",
    ])),
    p(S('g3', [
      "Geleneksel arama motorlarında kullanıcı bir sorgu yaptığında karşısına web sitesi sonuçları çıkar. Yapay zekâ destekli sistemlerde ise kullanıcı çoğu zaman doğrudan cevabı görür.",
      "Klasik bir arama motorunda sorgu yapan kullanıcı bir web sitesi listesiyle karşılaşır. Yapay zekâ destekli sistemlerde ise kullanıcıya çoğunlukla doğrudan bir cevap sunulur.",
      "Geleneksel aramada kullanıcı sonuç sayfasındaki web sitelerini tek tek inceler; yapay zekâ destekli sistemlerde ise cevap genellikle doğrudan karşısına gelir.",
      "Aradaki temel fark şudur: Arama motorları kullanıcıya bir web sitesi listesi sunarken yapay zekâ destekli sistemler çoğu zaman cevabın kendisini sunar.",
    ])),
    p(S('g4', [
      "Örneğin kullanıcı şu sorulardan birini yöneltebilir:",
      "Örneğin bir kullanıcı yapay zekâ aracına şöyle sorabilir:",
      "Bir kullanıcının yapay zekâ aracına yönelttiği soru örneğin şu şekilde olabilir:",
      "Şöyle bir senaryo düşünelim; kullanıcı yapay zekâ aracına şu soruyu soruyor:",
    ])),
    q(S('g5', [
      `“${d.loc} işletmelere GEO hizmeti veren uzman kimdir?”`,
      `“${d.loc} yapay zekâ arama optimizasyonu yapan bir GEO uzmanı önerir misin?”`,
      `“${d.ad} çevresinde işletmelere GEO danışmanlığı veren kim var?”`,
      `“${d.loc} markamı ChatGPT'de görünür kılabilecek bir GEO uzmanıyla çalışmak istiyorum, kimi önerirsin?”`,
    ])),
    q(S('g6', [
      "“Türkiye’de yapay zekâ arama optimizasyonu konusunda kimlerle çalışabilirim?”",
      "“İstanbul’da yapay zekâ görünürlüğü konusunda deneyimli danışmanlar kimler?”",
      "“Türkiye’de GEO alanında uzmanlaşmış kişiler kimler?”",
      "“Yapay zekâ arama optimizasyonu için Türkiye’de kimlerle çalışılabilir?”",
    ])),
    p(S('g7', [
      "Bu durumda markaların yalnızca belirli anahtar kelimelerde Google'da sıralama alması değil, yapay zekâ sistemlerinin markayı doğru hizmetlerle ve doğru uzmanlık alanlarıyla ilişkilendirebilmesi önem kazanır.",
      "Böyle bir soruda belirleyici olan, markanın birkaç anahtar kelimede Google sıralaması alması değildir; yapay zekâ sisteminin markayı doğru hizmetler ve doğru uzmanlık alanlarıyla ilişkilendirebilmesidir.",
      "Bu tür sorularda Google'daki anahtar kelime sıralamaları tek başına yeterli olmaz. Asıl önemli olan, yapay zekâ sistemlerinin markayı sunduğu hizmetlerle ve uzmanlık alanlarıyla doğru biçimde eşleştirebilmesidir.",
      "Burada markanın kazanması gereken şey yalnızca Google'da birkaç kelimede üst sıra değildir; yapay zekâ sistemlerinin markayı doğru hizmetlere ve doğru uzmanlık alanlarına bağlayabilmesidir.",
    ])),
  )

  // 3) GEO UZMANI NE YAPAR?
  ekle(
    h2(S('h-ne', ['GEO Uzmanı Ne Yapar?', `${d.ad} GEO Uzmanı Ne Yapar?`])),
    p(S('u1', [
      "GEO uzmanının temel amacı, markanın dijital dünyadaki bilgi yapısını yapay zekâ sistemlerinin daha kolay anlayabileceği hale getirmektir.",
      "GEO uzmanı, markanın internetteki bilgi yapısını yapay zekâ sistemlerinin kolayca okuyup anlayabileceği bir düzene kavuşturmayı amaçlar.",
      "Bir GEO uzmanının asıl hedefi, markaya ait dijital bilgilerin yapay zekâ sistemleri tarafından zahmetsizce anlaşılabilir hâle gelmesini sağlamaktır.",
      "GEO uzmanının işi özünde bir düzenleme işidir: Markanın dijital dünyadaki bilgi yapısı, yapay zekâ sistemlerinin daha kolay anlayabileceği şekilde yeniden kurgulanır.",
    ])),
    p(S('u2', [
      "Bu süreç genellikle web sitesinin mevcut durumunun incelenmesiyle başlar. Hizmet sayfaları, kategori sayfaları, blog içerikleri, uzmanlık sayfaları ve marka hakkında yayınlanan bilgiler değerlendirilir.",
      "Çalışma çoğunlukla web sitesinin mevcut durumunu inceleyerek başlar. Bu aşamada hizmet ve kategori sayfaları, blog içerikleri, uzmanlık sayfaları ve marka hakkında yayımlanmış bilgiler gözden geçirilir.",
      "İlk adım genellikle mevcut durumun tespitidir: Hizmet sayfaları, kategori sayfaları, blog yazıları, uzmanlık sayfaları ve markayla ilgili yayınlanan tüm bilgiler tek tek değerlendirilir.",
      "Süreç, web sitesinin bugünkü hâlinin incelenmesiyle başlar. Hizmet ve kategori sayfalarından blog içeriklerine, uzmanlık sayfalarından markayla ilgili yayımlanan bilgilere kadar tüm dijital varlıklar değerlendirilir.",
    ])),
    p(S('u3', [
      "Ardından şu soruların yanıtları araştırılır:",
      "Ardından aşağıdaki soruların cevabı aranır:",
      "Bu inceleme sırasında şu sorulara yanıt aranır:",
      "Sonrasında analiz şu sorular etrafında derinleşir:",
    ])),
    ul(karistir(d, 'u-liste', S('u-set', [
      ['Marka internette hangi konularla ilişkilendiriliyor?', 'Web sitesinde ana hizmetler açık şekilde anlatılıyor mu?', 'İçerikler arasında güçlü bir konu ilişkisi bulunuyor mu?', 'Marka belirli bir konuda uzman olarak konumlandırılmış mı?', 'Yapay zekâ sistemlerinin kullanabileceği açık bilgi blokları mevcut mu?', 'Markanın güvenilirliğini destekleyen dış kaynaklar bulunuyor mu?', 'Hizmet, uzmanlık ve marka ilişkisi dijital ortamda tutarlı mı?'],
      ['Marka internette hangi konularla birlikte anılıyor?', 'Ana hizmetler web sitesinde net biçimde anlatılmış mı?', 'İçerikler konu bakımından birbirini destekliyor mu?', 'Marka belirli bir alanda uzman olarak konumlanmış mı?', 'Yapay zekâ sistemlerinin doğrudan kullanabileceği açık bilgi blokları var mı?', 'Markanın güvenilirliğini destekleyen dış kaynaklar mevcut mu?', 'Hizmet, uzmanlık ve marka arasındaki ilişki dijital ortamda tutarlı mı?'],
    ]))),
    p(S('u4', [
      "Bu analizlerin ardından içerik, teknik altyapı ve marka otoritesi tarafında bir GEO yol haritası hazırlanır.",
      "Analizler tamamlandığında içerik, teknik altyapı ve marka otoritesi başlıklarını kapsayan bir GEO yol haritası oluşturulur.",
      "Elde edilen bulgular; içerik, teknik altyapı ve marka otoritesi olmak üzere üç alanda ilerleyen bir GEO yol haritasına dönüştürülür.",
      "Bu soruların cevapları, içerik, teknik altyapı ve marka otoritesi tarafındaki adımları sıralayan bir GEO yol haritasının temelini oluşturur.",
    ])),
  )

  // 4) GEO DANIŞMANLIĞI NELERİ KAPSAR?
  ekle(
    h2(S('h-kapsam', ['GEO Danışmanlığı Neleri Kapsar?', `${d.ad} GEO Danışmanlığı Neleri Kapsar?`])),
    p(S('k1', [
      "Profesyonel bir GEO danışmanlığı yalnızca birkaç blog içeriği hazırlamak veya metinlere yapay zekâ ile ilgili anahtar kelimeler eklemek anlamına gelmez. GEO daha geniş kapsamlı bir dijital görünürlük çalışmasıdır.",
      "GEO danışmanlığı, birkaç blog yazısı yayınlamaktan ya da metinlere yapay zekâyla ilgili anahtar kelimeler serpiştirmekten ibaret değildir; çok daha kapsamlı bir dijital görünürlük çalışmasıdır.",
      "Profesyonel GEO danışmanlığını birkaç blog içeriğine veya metinlere eklenen yapay zekâ temalı anahtar kelimelere indirgemek doğru olmaz. GEO, kapsamı çok daha geniş bir dijital görünürlük çalışmasıdır.",
      "GEO danışmanlığı denildiğinde akla yalnızca blog içeriği ya da yapay zekâ ile ilgili anahtar kelimeler gelmemeli. Söz konusu olan, çok daha geniş kapsamlı bir dijital görünürlük çalışmasıdır.",
    ])),
    p(S('k2', [
      "Çalışma kapsamında şu alanlar değerlendirilebilir:",
      "Danışmanlık kapsamında ele alınabilecek başlıca alanlar şunlardır:",
      "Bu çalışma genellikle şu başlıkları içerir:",
      "Kapsam projeye göre değişse de şu alanlar sıklıkla yer alır:",
    ])),
    ul(karistir(d, 'k-liste', S('k-set', [
      ['Marka ve uzmanlık ilişkilerinin oluşturulması', 'İçerik mimarisinin güçlendirilmesi', 'Semantic SEO çalışmalarının geliştirilmesi', 'Konu kümelerinin oluşturulması', 'Soru-cevap odaklı içeriklerin hazırlanması', 'Entity ilişkilerinin güçlendirilmesi', 'Yapılandırılmış veri kullanımı', 'Hizmet sayfalarının geliştirilmesi', 'Marka otoritesinin desteklenmesi', 'Yapay zekâ cevaplarında görünürlüğün takip edilmesi'],
      ['Marka ile uzmanlık alanları arasındaki ilişkilerin kurulması', 'İçerik mimarisinin güçlendirilmesi', 'Semantic SEO çalışmalarının geliştirilmesi', 'Konu kümelerinin planlanması', 'Soru-cevap formatında içeriklerin hazırlanması', 'Entity ilişkilerinin güçlendirilmesi', 'Yapılandırılmış verilerin kullanılması', 'Hizmet sayfalarının iyileştirilmesi', 'Marka otoritesinin desteklenmesi', 'Yapay zekâ cevaplarındaki görünürlüğün izlenmesi'],
    ]))),
    p(S('k3', [
      "Buradaki amaç mümkün olduğunca fazla içerik üretmek değil; belirli konularda güçlü, tutarlı ve güvenilir bir dijital bilgi ağı oluşturmaktır.",
      "Hedef, olabildiğince çok içerik üretmek değil; belirli konularda güçlü, tutarlı ve güvenilir bir dijital bilgi ağı kurmaktır.",
      "Bu çalışmalarda başarıyı içerik sayısı belirlemez. Amaç, seçilen konularda güçlü, tutarlı ve güvenilir bir dijital bilgi ağı oluşturmaktır.",
      "Kısacası amaç içerik hacmini artırmak değil, belirli konularda güçlü, tutarlı ve güvenilir bir dijital bilgi ağı inşa etmektir.",
    ])),
  )

  // 5) GEO İLE SEO ARASINDAKİ FARK
  ekle(
    h2('GEO ile SEO Arasındaki Fark Nedir?'),
    p(S('s1', [
      "SEO ve GEO birbirinden tamamen bağımsız iki çalışma değildir. Aksine güçlü bir GEO stratejisinin önemli bir bölümü iyi bir SEO altyapısına dayanır.",
      "SEO ile GEO'yu birbirinden tamamen kopuk iki çalışma olarak düşünmemek gerekir. Güçlü bir GEO stratejisinin önemli bir kısmı, sağlam bir SEO altyapısının üzerine kurulur.",
      "SEO ve GEO ayrı disiplinler gibi görünse de birbirinden bağımsız değildir; iyi bir GEO stratejisi büyük ölçüde iyi kurulmuş bir SEO altyapısına yaslanır.",
      "GEO, SEO'dan kopuk bir çalışma değildir. Tam tersine, başarılı bir GEO stratejisinin önemli bir bölümü iyi bir SEO altyapısından güç alır.",
    ])),
    p(S('s2', [
      `Bir [SEO uzmanı](${LINK.seoUzmani}), web sitesinin Google ve diğer arama motorlarında daha görünür hale gelmesi için teknik SEO, içerik optimizasyonu, anahtar kelime araştırması, site mimarisi, iç linkleme ve otorite çalışmaları gerçekleştirir.`,
      `Bir [SEO uzmanı](${LINK.seoUzmani}); teknik SEO, içerik optimizasyonu, anahtar kelime araştırması, site mimarisi, iç linkleme ve otorite çalışmalarıyla web sitesinin Google ve diğer arama motorlarındaki görünürlüğünü artırmaya çalışır.`,
      `Bir [SEO uzmanı](${LINK.seoUzmani}) için odak noktası; teknik SEO, içerik optimizasyonu, anahtar kelime araştırması, site mimarisi, iç linkleme ve otorite çalışmalarıyla sitenin Google ve diğer arama motorlarında daha görünür olmasıdır.`,
      `Teknik SEO, içerik optimizasyonu, anahtar kelime araştırması, site mimarisi, iç linkleme ve otorite çalışmaları, bir [SEO uzmanı](${LINK.seoUzmani}) için web sitesini Google ve diğer arama motorlarında görünür kılmanın temel araçlarıdır.`,
    ])),
    p(S('s3', [
      "GEO tarafında ise aynı dijital varlığın yapay zekâ sistemleri tarafından nasıl yorumlandığı daha fazla önem kazanır.",
      "GEO'da ise aynı dijital varlığın yapay zekâ sistemleri tarafından nasıl yorumlandığı öne çıkar.",
      "GEO tarafında ağırlık, aynı dijital varlığın yapay zekâ sistemlerince nasıl yorumlandığına kayar.",
      "GEO ise aynı dijital varlığa farklı bir pencereden bakar ve yapay zekâ sistemlerinin bu varlığı nasıl yorumladığına odaklanır.",
    ])),
    p(S('s4', [
      "SEO tarafında temel soru şu olabilir:",
      "SEO açısından sorulan temel soru genellikle şudur:",
      "SEO çalışmasında akla gelen ilk soru çoğu zaman şudur:",
      "Klasik SEO bakış açısıyla temel soru şöyle özetlenebilir:",
    ])),
    q("“Bu sayfa Google'da hangi pozisyonda?”"),
    p(S('s5', [
      "GEO tarafında ise şu sorular gündeme gelir:",
      "GEO tarafında ise sorular değişir:",
      "GEO açısından ise şu sorular önem kazanır:",
      "GEO perspektifinde ise şu sorulara cevap aranır:",
    ])),
    ...S('s6', [
      ['“ChatGPT bu markayı tanıyor mu?”', '“Gemini markanın hangi hizmetleri sunduğunu doğru anlıyor mu?”', '“Perplexity ilgili bir soruda markayı kaynak olarak kullanıyor mu?”', '“Google AI Overviews içerisinde marka hangi konularla ilişkilendiriliyor?”'],
      ['“ChatGPT bu markayı biliyor mu?”', '“Gemini markanın sunduğu hizmetleri doğru anlıyor mu?”', '“Perplexity ilgili bir soruda markayı kaynak gösteriyor mu?”', '“Google AI Overviews markayı hangi konularla ilişkilendiriyor?”'],
    ]).map(q),
    p(S('s7', [
      "Bu nedenle SEO ve GEO birlikte yürütüldüğünde çok daha kapsamlı bir organik görünürlük stratejisi ortaya çıkabilir.",
      "Bu yüzden SEO ve GEO birlikte ele alındığında çok daha kapsamlı bir organik görünürlük stratejisi oluşturulabilir.",
      "İki çalışmanın birlikte yürütülmesi, tek başına hiçbirinin sağlayamayacağı kapsamlı bir organik görünürlük stratejisi ortaya çıkarabilir.",
      `${d.loc} rekabet eden işletmeler için SEO ve GEO'yu birlikte yürütmek, çok daha kapsamlı bir organik görünürlük stratejisi kurmanın yoludur.`,
    ])),
  )

  // 6) SEMANTIC SEO
  ekle(
    h2('GEO Çalışmalarında Semantic SEO Neden Önemlidir?'),
    p(S('m1', [
      "Yapay zekâ sistemleri bir web sitesini yalnızca tekil anahtar kelimeler üzerinden değerlendirmez. Konular, kavramlar ve varlıklar arasındaki ilişkiler önemlidir.",
      "Yapay zekâ sistemleri bir siteyi tek tek anahtar kelimelere bakarak değerlendirmez; konular, kavramlar ve varlıklar arasındaki ilişkiler belirleyici rol oynar.",
      "Bir web sitesini değerlendiren yapay zekâ sistemi için tekil anahtar kelimeler yeterli bir sinyal değildir. Asıl önemli olan konular, kavramlar ve varlıklar arasında kurulan ilişkilerdir.",
      "Yapay zekâ sistemleri bir siteyi kelime kelime değil, ilişkiler üzerinden okur; konular, kavramlar ve varlıklar arasındaki bağlar bu okumanın merkezindedir.",
    ])),
    p(S('m2', [
      "Örneğin bir site yalnızca “GEO uzmanı” anahtar kelimesine yönelik tek bir sayfa yayınladığında sınırlı bir konu sinyali oluşturabilir.",
      "Örneğin yalnızca “GEO uzmanı” anahtar kelimesini hedefleyen tek bir sayfa yayınlayan bir site, sınırlı bir konu sinyali verebilir.",
      "Sadece “GEO uzmanı” kelimesine odaklanan tek bir sayfa, sitenin bu konudaki uzmanlığı hakkında zayıf bir sinyal oluşturabilir.",
      "Bir site “GEO uzmanı” anahtar kelimesi için yalnızca tek bir sayfa yayınlıyorsa, konu hakkında verdiği sinyal sınırlı kalabilir.",
    ])),
    p(S('m3', [
      "Bunun yerine şu başlıkları kapsayan daha geniş bir içerik ağı oluşturulabilir:",
      "Bunun yerine aşağıdaki başlıkları kapsayan daha geniş bir içerik ağı kurulabilir:",
      "Daha güçlü bir sinyal için şu başlıkları içeren bir içerik ağı oluşturmak mümkündür:",
      "Oysa şu konuları birbirine bağlayan geniş bir içerik ağı çok daha güçlü bir tablo ortaya koyar:",
    ])),
    ul(karistir(d, 'm-liste', ['GEO nedir?', 'Generative Engine Optimization nedir?', 'AI Search Optimization nedir?', 'ChatGPT SEO nasıl yapılır?', 'Google AI Overviews nedir?', 'Yapay zekâ görünürlüğü nasıl artırılır?', 'GEO ve SEO arasındaki fark nedir?', 'Entity SEO nedir?', 'Semantic SEO nedir?', 'Topical authority nasıl oluşturulur?'])),
    p(S('m4', [
      "Bu konu yapısı hem arama motorlarının hem de yapay zekâ sistemlerinin sitenin hangi konuda uzmanlaştığını daha kolay anlamasına katkı sağlar.",
      "Böyle bir konu yapısı, arama motorlarının ve yapay zekâ sistemlerinin sitenin uzmanlık alanını daha kolay kavramasına yardımcı olur.",
      "Bu yapı sayesinde hem arama motorları hem de yapay zekâ sistemleri sitenin hangi konuda uzman olduğunu daha net görebilir.",
      "Birbirini destekleyen bu konu yapısı, sitenin uzmanlık alanının arama motorları ve yapay zekâ sistemleri tarafından daha kolay anlaşılmasını sağlar.",
    ])),
    p(S('m5', [
      `SEO tarafındaki temel kavramları daha detaylı incelemek isteyenler için hazırlanan [SEO rehberi](${LINK.seoRehberi}), teknik ve içerik odaklı organik görünürlük çalışmalarının daha kapsamlı şekilde anlaşılmasına yardımcı olabilir.`,
      `SEO'nun temel kavramlarını ayrıntılı incelemek isteyenler için hazırlanan [SEO rehberi](${LINK.seoRehberi}), teknik ve içerik odaklı organik görünürlük çalışmalarını daha kapsamlı biçimde anlatıyor.`,
      `Teknik ve içerik odaklı organik görünürlük çalışmalarını daha derinlemesine anlamak isteyenler, temel kavramların ele alındığı [SEO rehberi](${LINK.seoRehberi}) üzerinden ilerleyebilir.`,
      `SEO tarafındaki temel kavramlar için hazırlanan [SEO rehberi](${LINK.seoRehberi}), teknik ve içerik odaklı çalışmaların organik görünürlüğe nasıl katkı sağladığını daha kapsamlı şekilde açıklıyor.`,
    ])),
    p(S('m6', [
      `GEO tarafındaki kavramları ve uygulama modellerini incelemek için ise [GEO rehberi](${LINK.geoRehberi}) üzerinden Generative Engine Optimization çalışmalarının temel bileşenleri değerlendirilebilir.`,
      `GEO kavramlarını ve uygulama modellerini incelemek isteyenler ise [GEO rehberi](${LINK.geoRehberi}) üzerinden Generative Engine Optimization çalışmalarının temel bileşenlerine ulaşabilir.`,
      `Generative Engine Optimization çalışmalarının temel bileşenleri ve uygulama modelleri ise [GEO rehberi](${LINK.geoRehberi}) içinde ayrıntılı biçimde ele alınıyor.`,
      `GEO tarafındaki kavramları ve uygulama modellerini görmek isteyenler için [GEO rehberi](${LINK.geoRehberi}), Generative Engine Optimization çalışmalarının temel bileşenlerini değerlendirmeye uygun bir başlangıç noktası sunar.`,
    ])),
  )

  // 7) YEREL: {İLÇE}'DE GEO UZMANIYLA ÇALIŞMAK
  const sektor = liste(d.sektorler)
  ekle(
    h2(S('h-yerel', [`${d.loc} GEO Uzmanıyla Çalışmak Neden Önemli?`, `${d.loc} Bir GEO Uzmanıyla Çalışmanın Önemi`])),
    p(d.baglam),
    p(S('l2', [
      `${buyukHarf(sektor)} gibi birçok sektörde ${ist ? 'binlerce şirket' : 'çok sayıda işletme'} aynı müşteri kitlesine ulaşmaya çalışıyor.`,
      `${d.loc} özellikle ${sektor} alanlarında faaliyet gösteren işletmeler aynı müşteri kitlesinin dikkatini çekmek için yarışıyor.`,
      `${buyukHarf(sektor)} gibi sektörlerde ${d.ad} ve çevresindeki işletmeler, aynı müşterilere ulaşmak için birbirleriyle doğrudan rekabet ediyor.`,
      `Bu yapı içinde ${sektor} başta olmak üzere pek çok sektörde işletmeler aynı müşteri kitlesine ulaşma çabasında.`,
    ])),
    p(S('l3', [
      "Klasik arama motoru görünürlüğü bu rekabette hâlâ son derece önemlidir. Ancak kullanıcı davranışının yapay zekâ araçlarına kayması yeni bir rekabet alanı oluşturuyor.",
      "Bu rekabette klasik arama motoru görünürlüğü önemini koruyor. Bununla birlikte kullanıcıların bir kısmının yapay zekâ araçlarına yönelmesi, yeni bir rekabet alanı yaratıyor.",
      "Google'daki görünürlük bu yarışta hâlâ kritik; fakat kullanıcı davranışının yapay zekâ araçlarına doğru kayması, işletmelerin karşısına ikinci bir rekabet alanı çıkarıyor.",
      "Klasik arama motorlarında görünür olmak bu ortamda hâlâ çok değerli. Yine de kullanıcıların yapay zekâ araçlarına yönelmesiyle birlikte rekabet yeni bir alana taşınıyor.",
    ])),
    p(S('l4', [
      "Bir kullanıcı Google'a şunu yazabilir:",
      "Örneğin bir kullanıcı Google'da kısaca şöyle arar:",
      "Bir kullanıcının Google'a yazdığı sorgu oldukça kısa olabilir:",
      "Google'da arama yapan bir kullanıcı genellikle kısa bir ifade kullanır:",
    ])),
    q(`“${d.ad} dijital pazarlama uzmanı”`),
    p(S('l5', [
      "Başka bir kullanıcı ise ChatGPT'ye çok daha detaylı bir soru yöneltebilir:",
      "Başka bir kullanıcı ise aynı ihtiyacı ChatGPT'ye çok daha ayrıntılı biçimde anlatabilir:",
      "Oysa aynı ihtiyaca sahip başka bir kullanıcı ChatGPT'ye çok daha detaylı bir soru sorabilir:",
      "ChatGPT kullanan bir başka kullanıcının sorusu ise çok daha ayrıntılıdır:",
    ])),
    q(ist
      ? "“İstanbul’da SEO, Google Ads ve yapay zekâ arama optimizasyonunu birlikte yönetebilecek bir uzman arıyorum.”"
      : S('l6', [
        `“${d.loc}ki ${d.isletme} için SEO, Google Ads ve yapay zekâ arama optimizasyonunu birlikte yönetebilecek bir uzman arıyorum.”`,
        `“${d.loc}ki ${d.isletme} için SEO, Google Ads ve yapay zekâ görünürlüğünü tek elden yönetebilecek bir uzman önerir misin?”`,
        `“${d.loc}ki ${d.isletme} için hem SEO hem Google Ads hem de yapay zekâ arama optimizasyonu yapabilen bir uzmana ihtiyacım var.”`,
        `“${d.loc}ki ${d.isletme} için SEO, Google Ads ve yapay zekâ aramalarındaki görünürlüğü birlikte yönetecek birini arıyorum, kimi önerirsin?”`,
      ])),
    p(S('l7', [
      "İkinci sorguda klasik anahtar kelime eşleşmesinin ötesinde; uzmanlık alanları, marka hakkında bulunan bilgiler, içerik kapsamı ve güvenilirlik sinyalleri birlikte değerlendirilir.",
      "İkinci soruya verilecek cevapta yalnızca anahtar kelime eşleşmesine bakılmaz; uzmanlık alanları, marka hakkında erişilebilen bilgiler, içerik kapsamı ve güvenilirlik sinyalleri birlikte tartılır.",
      "Bu ikinci sorguda belirleyici olan klasik anahtar kelime eşleşmesi değildir. Uzmanlık alanları, markayla ilgili bilgiler, içeriklerin kapsamı ve güvenilirlik sinyalleri bir arada değerlendirilir.",
      "İkinci örnekte yapay zekâ sistemi, anahtar kelime eşleşmesinin çok ötesine geçerek uzmanlık alanlarını, marka hakkındaki bilgileri, içerik kapsamını ve güvenilirlik sinyallerini birlikte ele alır.",
    ])),
    p(S('l8', [
      "Bu nedenle güçlü bir GEO stratejisi özellikle rekabetin yoğun olduğu pazarlarda markaların yeni nesil arama davranışlarına hazırlanmasına yardımcı olabilir.",
      `Bu yüzden güçlü bir GEO stratejisi, ${d.ad} gibi rekabetin yoğun olduğu pazarlarda markaların yeni nesil arama davranışlarına hazırlanmasını kolaylaştırabilir.`,
      `${d.loc} faaliyet gösteren markalar için güçlü bir GEO stratejisi, yeni nesil arama davranışlarına zamanında hazırlanmanın yollarından biridir.`,
      "Güçlü bir GEO stratejisi, rekabetin yoğun olduğu pazarlarda markaların yeni nesil arama davranışlarına hazırlıklı olmasına katkı sağlayabilir.",
    ])),
  )

  // 8) GEO, SEO VE GOOGLE ADS
  ekle(
    h2('GEO, SEO ve Google Ads Birlikte Nasıl Çalışır?'),
    p(S('a1', [
      "Dijital büyümenin yalnızca tek bir kanala bağlı olması çoğu işletme için yeterli değildir. Organik görünürlük uzun vadeli bir değer oluştururken performans reklamları daha hızlı talep yaratılmasını sağlayabilir.",
      "Çoğu işletme için büyümeyi tek bir dijital kanala bağlamak yeterli olmaz. Organik görünürlük uzun vadede kalıcı bir değer üretirken performans reklamları talebin daha hızlı oluşmasına yardımcı olur.",
      "Tek kanallı bir dijital büyüme modeli çoğu işletmenin ihtiyacını karşılamaz. Organik görünürlük zamanla biriken bir değer yaratır; performans reklamları ise talebi daha kısa sürede harekete geçirebilir.",
      "Dijital büyümeyi tek bir kanala emanet etmek çoğu işletme için yeterli değildir. Organik görünürlük uzun vadeli bir varlık oluştururken performans reklamları daha hızlı talep yaratma imkânı sunar.",
    ])),
    p(S('a2', [
      `Örneğin bir [Google Ads uzmanı](${LINK.googleAds}) işletmenin yüksek satın alma niyetine sahip kullanıcıların karşısına reklamlarla çıkmasını sağlayabilir.`,
      `Bir [Google Ads uzmanı](${LINK.googleAds}), örneğin, işletmenin satın almaya yakın kullanıcıların karşısına doğru reklamlarla çıkmasını sağlayabilir.`,
      `Örneğin ${d.loc}ki bir ${d.tur} için bir [Google Ads uzmanı](${LINK.googleAds}), satın alma niyeti yüksek kullanıcılara reklamlarla ulaşılmasını sağlayabilir.`,
      `Yüksek satın alma niyetine sahip kullanıcıların karşısına reklamla çıkmak, bir [Google Ads uzmanı](${LINK.googleAds}) ile çalışmanın en belirgin katkılarından biridir; örneğin ${d.loc}ki bir ${d.tur} bu sayede talebi hızla karşılayabilir.`,
    ])),
    p(S('a3', [
      "SEO tarafında organik görünürlük geliştirilirken GEO tarafında markanın üretken yapay zekâ sistemlerindeki görünürlüğü desteklenebilir. Bu kanallar birbirinden bağımsız şekilde yönetilebileceği gibi ortak bir büyüme stratejisinin parçaları olarak da ele alınabilir.",
      "SEO organik görünürlüğü büyütürken GEO, markanın üretken yapay zekâ sistemlerindeki varlığını destekler. Bu kanallar ayrı ayrı yönetilebilir; ancak ortak bir büyüme stratejisinin parçaları olarak da planlanabilir.",
      "Aynı dönemde SEO çalışmaları organik görünürlüğü, GEO çalışmaları ise markanın üretken yapay zekâ sistemlerindeki görünürlüğünü güçlendirebilir. Kanallar bağımsız yürütülebileceği gibi tek bir büyüme planı altında da birleştirilebilir.",
      "SEO ile organik görünürlük artarken GEO ile markanın yapay zekâ sistemlerindeki görünürlüğü desteklenir. Bu kanalları ayrı ayrı yönetmek mümkün olduğu gibi ortak bir büyüme stratejisinin parçası olarak ele almak da mümkündür.",
    ])),
    p(S('a4', [
      `Profesyonel bir [dijital pazarlama uzmanı](${LINK.dijitalPazarlama}) SEO, Google Ads, içerik pazarlaması, analitik ve yapay zekâ arama görünürlüğü gibi farklı kanalların ortak iş hedefleri doğrultusunda çalışmasını sağlayabilir.`,
      `Profesyonel bir [dijital pazarlama uzmanı](${LINK.dijitalPazarlama}); SEO, Google Ads, içerik pazarlaması, analitik ve yapay zekâ arama görünürlüğü gibi kanalları ortak iş hedeflerine göre bir arada çalıştırabilir.`,
      `SEO, Google Ads, içerik pazarlaması, analitik ve yapay zekâ arama görünürlüğü gibi farklı kanalların aynı iş hedeflerine hizmet etmesini sağlamak, profesyonel bir [dijital pazarlama uzmanı](${LINK.dijitalPazarlama}) için temel görevlerden biridir.`,
      `Farklı kanalları ortak iş hedeflerinde buluşturmak profesyonel bir [dijital pazarlama uzmanı](${LINK.dijitalPazarlama}) ile mümkündür; SEO, Google Ads, içerik pazarlaması, analitik ve yapay zekâ arama görünürlüğü aynı planın parçaları hâline gelir.`,
    ])),
    p(S('a5', [
      "Bu yaklaşım markanın yalnızca tek bir trafik kaynağına bağımlı kalmasını önleyerek daha dengeli bir dijital büyüme modeli oluşturabilir.",
      "Böylece marka tek bir trafik kaynağına bağımlı kalmaz ve daha dengeli bir dijital büyüme modeli kurulabilir.",
      "Bu yaklaşım, tek bir trafik kaynağına bağımlılığı azaltarak daha dengeli bir dijital büyüme modelinin önünü açar.",
      `${d.loc} faaliyet gösteren bir işletme için bu yaklaşım, tek bir trafik kaynağına bağımlı kalmadan daha dengeli bir dijital büyüme modeli kurmak anlamına gelir.`,
    ])),
  )

  // 9) GEO STRATEJİSİ
  ekle(
    h2(S('h-strateji', ['Profesyonel Bir GEO Stratejisi Nasıl Hazırlanır?', `${d.ad} İçin Profesyonel Bir GEO Stratejisi Nasıl Hazırlanır?`])),
    p(S('st0', [
      "Başarılı bir GEO stratejisi içerik üretmeye başlamadan önce analizle başlamalıdır.",
      "Başarılı bir GEO stratejisinin ilk adımı içerik üretimi değil, analizdir.",
      "İçerik üretimine geçmeden önce yapılan analiz, başarılı bir GEO stratejisinin temelini oluşturur.",
      "Etkili bir GEO stratejisi, ilk içerik yazılmadan önce yapılan analizle şekillenir.",
    ])),
    h3('1. Mevcut dijital görünürlük analiz edilir'),
    p(S('st1', [
      "Öncelikle web sitesinin mevcut yapısı incelenir. Hangi hizmetlerin güçlü şekilde anlatıldığı, hangi konularda içerik eksikliği bulunduğu ve hangi sayfaların birbirini desteklemediği belirlenir.",
      "İlk olarak web sitesinin mevcut yapısı ele alınır; hangi hizmetlerin iyi anlatıldığı, hangi konularda içerik açığı olduğu ve hangi sayfaların birbirini desteklemediği tespit edilir.",
      "Bu aşamada sitenin bugünkü yapısı değerlendirilir: Güçlü anlatılan hizmetler, içerik eksiği bulunan konular ve birbirini desteklemeyen sayfalar ortaya çıkarılır.",
      "Önce sitenin mevcut hâline bakılır. Hangi hizmetin net anlatıldığı, hangi konunun eksik kaldığı ve hangi sayfaların birbirinden kopuk olduğu belirlenir.",
    ])),
    h3('2. Ana uzmanlık alanları belirlenir'),
    p(S('st2', [
      "Markanın hangi konularla ilişkilendirilmek istediği netleştirilir. Örneğin bir uzman için ana konu başlıkları şu şekilde olabilir:",
      "Markanın hangi konularla anılmak istediği açıkça tanımlanır. Bir uzman için bu başlıklar örneğin şöyle olabilir:",
      "Bu adımda markanın hangi konularla ilişkilendirilmesi gerektiğine karar verilir. Bir uzman için örnek ana konu başlıkları şunlardır:",
      "Hedef, markanın hangi konularda akla gelmesi gerektiğini netleştirmektir. Örneğin bir uzmanın ana konu başlıkları şu şekilde belirlenebilir:",
    ])),
    ul(karistir(d, 'st2-liste', ['GEO', 'SEO', 'Google Ads', 'Dijital pazarlama', 'Yapay zekâ arama optimizasyonu', 'İçerik stratejisi'])),
    h3('3. Konu kümeleri oluşturulur'),
    p(S('st3', [
      "Her ana hizmetin çevresinde onu destekleyen içerikler hazırlanır. Örneğin GEO hizmet sayfasının çevresinde şu içerikler geliştirilebilir:",
      "Her ana hizmet, onu destekleyen içeriklerle çevrelenir. Örneğin GEO hizmet sayfası için şu destekleyici içerikler hazırlanabilir:",
      "Ana hizmetlerin her biri için destekleyici içerikler planlanır. GEO hizmet sayfası özelinde bu içerikler şunlar olabilir:",
      "Her hizmet sayfası tek başına bırakılmaz; çevresinde onu besleyen içerikler oluşturulur. GEO hizmet sayfası için örnek içerikler şunlardır:",
    ])),
    ul(karistir(d, 'st3-liste', ['GEO nedir?', 'GEO uzmanı ne yapar?', 'GEO danışmanlığı nedir?', 'AI Search Optimization nedir?', 'ChatGPT görünürlüğü nasıl artırılır?', 'Google AI Overviews optimizasyonu nasıl yapılır?'])),
    h3('4. İç link yapısı oluşturulur'),
    p(S('st4', [
      "İlgili içeriklerin birbirine doğal bağlantılarla bağlanması hem kullanıcıların site içerisinde daha kolay ilerlemesini hem de konu ilişkilerinin daha açık hale gelmesini sağlar.",
      "Birbiriyle ilgili içeriklerin doğal bağlantılarla birbirine bağlanması, kullanıcıların site içinde rahatça gezinmesini sağlarken konu ilişkilerini de görünür kılar.",
      "İlgili sayfalar arasında kurulan doğal iç linkler, kullanıcının site içinde kolayca ilerlemesine ve konular arasındaki ilişkinin daha net anlaşılmasına katkı sağlar.",
      "Doğal iç linklerle birbirine bağlanan içerikler hem kullanıcıya akıcı bir gezinme deneyimi sunar hem de konu ilişkilerini daha açık hâle getirir.",
    ])),
    h3('5. Marka otoritesi geliştirilir'),
    p(S('st5', [
      "GEO yalnızca web sitesinin içerisinde yapılan çalışmalarla sınırlı değildir. Markanın farklı güvenilir platformlarda doğru şekilde tanımlanması, uzman görüşlerinin yayınlanması, referansların gösterilmesi ve dijital profillerde tutarlı bilgi kullanılması önemlidir.",
      "GEO çalışmaları web sitesinin sınırlarında kalmaz. Markanın güvenilir platformlarda doğru tanımlanması, uzman görüşlerinin yayımlanması, referansların gösterilmesi ve dijital profillerde tutarlı bilgilerin yer alması büyük önem taşır.",
      "Web sitesi içinde yapılan çalışmalar GEO'nun yalnızca bir parçasıdır. Markanın farklı güvenilir platformlarda doğru tanımlanması, uzman görüşlerinin yayınlanması, referansların paylaşılması ve tüm dijital profillerde tutarlı bilgi kullanılması da gerekir.",
      "GEO'nun önemli bir bölümü web sitesinin dışında gerçekleşir: Markanın güvenilir platformlarda doğru şekilde tanımlanması, uzman görüşlerinin yayınlanması, referansların gösterilmesi ve dijital profillerde bilgilerin tutarlı olması.",
    ])),
    p(S('st6', [
      `Gerçek proje ve çalışma örnekleri markanın uzmanlık alanlarının desteklenmesine katkı sağlayabilir. Bu noktada geçmiş çalışmalar ve marka deneyimleri [referanslar](${LINK.referanslar}) sayfası üzerinden incelenebilir.`,
      `Gerçek proje ve çalışma örnekleri, markanın uzmanlık iddiasını destekleyen en somut kanıtlardandır. Geçmiş çalışmalar ve marka deneyimleri [referanslar](${LINK.referanslar}) sayfasında incelenebilir.`,
      `Markanın uzmanlık alanlarını destekleyen en güçlü sinyallerden biri gerçek proje örnekleridir. Geçmiş çalışmalara ve marka deneyimlerine [referanslar](${LINK.referanslar}) sayfasından ulaşılabilir.`,
      `Uzmanlık alanlarının desteklenmesinde gerçek proje ve çalışma örnekleri önemli bir rol oynar. Bu kapsamdaki geçmiş çalışmalar ve marka deneyimleri [referanslar](${LINK.referanslar}) sayfasında yer alıyor.`,
    ])),
  )

  // 10) YAPAY ZEKÂ KAVRAMLARI
  ekle(
    h2('Yapay Zekâ Kavramlarını Anlamak Neden Önemli?'),
    p(S('y1', [
      "GEO alanında ChatGPT, LLM, RAG, entity, embedding, prompt, AI Search, semantic search ve generative search gibi birçok kavram kullanılıyor.",
      "GEO çalışmalarında ChatGPT, LLM, RAG, entity, embedding, prompt, AI Search, semantic search ve generative search gibi pek çok kavramla karşılaşılıyor.",
      "ChatGPT, LLM, RAG, entity, embedding, prompt, AI Search, semantic search ve generative search; GEO alanında sıkça kullanılan kavramlardan yalnızca birkaçı.",
      "GEO'nun kendine özgü bir terminolojisi var: ChatGPT, LLM, RAG, entity, embedding, prompt, AI Search, semantic search ve generative search bunlardan bazıları.",
    ])),
    p(S('y2', [
      "Bu terminolojiyi doğru anlamak hem GEO stratejisinin nasıl çalıştığını hem de yapay zekâ sistemlerinin bilgiyi nasıl işlediğini kavramayı kolaylaştırır.",
      "Bu terimlere hâkim olmak, hem GEO stratejisinin işleyişini hem de yapay zekâ sistemlerinin bilgiyi nasıl işlediğini anlamayı kolaylaştırır.",
      "Bu kavramları doğru anlamak, GEO stratejisinin mantığını ve yapay zekâ sistemlerinin bilgiyi işleme biçimini kavramanın en kısa yoludur.",
      "Terminolojiyi doğru anlamak; GEO stratejisinin nasıl çalıştığını ve yapay zekâ sistemlerinin bilgiyi nasıl işlediğini görmeyi kolaylaştırır.",
    ])),
    p(S('y3', [
      `Bu kavramların açıklamalarını toplu şekilde incelemek isteyenler [AI sözlük](${LINK.aiSozluk}) üzerinden yapay zekâ ve Generative Engine Optimization alanında kullanılan terimlere ulaşabilir.`,
      `Yapay zekâ ve Generative Engine Optimization alanında kullanılan terimlerin açıklamalarına [AI sözlük](${LINK.aiSozluk}) üzerinden toplu olarak ulaşılabilir.`,
      `Bu kavramların tamamını tek bir yerde görmek isteyenler, yapay zekâ ve Generative Engine Optimization terimlerinin açıklandığı [AI sözlük](${LINK.aiSozluk}) sayfasına göz atabilir.`,
      `Yapay zekâ ve Generative Engine Optimization alanındaki terimlerin açıklamaları [AI sözlük](${LINK.aiSozluk}) sayfasında toplu şekilde yer alıyor.`,
    ])),
  )

  // 11) AJANS MI UZMAN MI
  ekle(
    h2('GEO Ajansı mı GEO Uzmanı mı?'),
    p(S('j1', [
      "Şirketlerin GEO çalışması için ajans veya bireysel uzman tercih etmesi ihtiyaçlara göre değişebilir.",
      "GEO çalışması için ajansla mı yoksa bireysel bir uzmanla mı çalışılacağı, şirketin ihtiyaçlarına göre değişir.",
      "Ajans ya da bireysel uzman tercihi, şirketin GEO tarafındaki ihtiyaçlarına göre farklılık gösterebilir.",
      `${d.loc} GEO çalışması planlayan şirketler için ajans veya bireysel uzman tercihi, projenin ihtiyaçlarına göre şekillenir.`,
    ])),
    p(S('j2', [
      "Büyük ölçekli projelerde içerik ekibi, teknik ekip, yazılım geliştiriciler, dijital PR ekibi ve SEO uzmanlarının aynı anda çalışması gerekebilir. Daha odaklı projelerde ise doğrudan bir GEO uzmanıyla çalışmak daha hızlı iletişim ve daha esnek bir danışmanlık modeli sağlayabilir.",
      "Büyük ölçekli projeler içerik ekibi, teknik ekip, yazılım geliştiriciler, dijital PR ekibi ve SEO uzmanlarının eş zamanlı çalışmasını gerektirebilir. Daha odaklı projelerde ise doğrudan bir GEO uzmanıyla çalışmak iletişimi hızlandırır ve daha esnek bir danışmanlık modeli sunar.",
      "Kapsamı geniş projelerde içerik, teknik, yazılım, dijital PR ve SEO ekiplerinin birlikte çalışması gerekebilir. Odaklı projelerde ise bir GEO uzmanıyla doğrudan çalışmak daha hızlı iletişim ve daha esnek bir danışmanlık modeli anlamına gelir.",
      "Proje büyüdükçe içerik ekibi, teknik ekip, yazılımcılar, dijital PR ve SEO uzmanlarının aynı anda devrede olması gerekebilir. Daha odaklı işlerde ise doğrudan bir GEO uzmanıyla çalışmak hem iletişimi hızlandırır hem de danışmanlık modelini esnekleştirir.",
    ])),
    p(S('j3', [
      `Ajans alternatiflerini değerlendirmek isteyen işletmeler için hazırlanan [en iyi 10 GEO ajansı](${LINK.geoAjans10}) içeriği farklı GEO hizmet sağlayıcılarını incelemek için kullanılabilir.`,
      `Ajans alternatiflerine bakmak isteyen işletmeler, farklı GEO hizmet sağlayıcılarını [en iyi 10 GEO ajansı](${LINK.geoAjans10}) içeriğinde inceleyebilir.`,
      `Farklı GEO hizmet sağlayıcılarını karşılaştırmak isteyen işletmeler için hazırlanan [en iyi 10 GEO ajansı](${LINK.geoAjans10}) içeriği, ajans alternatiflerini değerlendirmeye yardımcı olabilir.`,
      `GEO ajanslarını değerlendirmek isteyenler, farklı hizmet sağlayıcıların yer aldığı [en iyi 10 GEO ajansı](${LINK.geoAjans10}) içeriğinden yararlanabilir.`,
    ])),
    p(S('j4', [
      `Daha geniş bir karşılaştırma yapmak isteyenler ise [en iyi 15 SEO ajansı](${LINK.seoAjans15}) listesi üzerinden daha fazla alternatifin hizmet yapılarını değerlendirebilir.`,
      `Daha kapsamlı bir karşılaştırma için [en iyi 15 SEO ajansı](${LINK.seoAjans15}) listesi, daha fazla alternatifin hizmet yapısını bir arada sunuyor.`,
      `Karşılaştırmayı genişletmek isteyenler, daha fazla alternatifin hizmet yapısını [en iyi 15 SEO ajansı](${LINK.seoAjans15}) listesinde bulabilir.`,
      `Seçenekleri daha geniş bir çerçevede görmek isteyenler için [en iyi 15 SEO ajansı](${LINK.seoAjans15}) listesi, farklı alternatiflerin hizmet yapılarını değerlendirme imkânı sunar.`,
    ])),
  )

  // 12) UZMAN SEÇİMİ
  ekle(
    h2(S('h-secim', ['GEO Uzmanı Seçerken Nelere Dikkat Edilmeli?', `${d.ad} GEO Uzmanı Seçerken Nelere Dikkat Edilmeli?`])),
    p(S('e0', [
      "GEO oldukça yeni bir çalışma alanı olduğu için uzman seçiminde yalnızca “GEO hizmeti veriyorum” ifadesine bakmak yeterli değildir. Uzmanın şu alanlarda deneyime sahip olması önemlidir:",
      "GEO henüz yeni bir alan olduğundan, bir uzmanın “GEO hizmeti veriyorum” demesi seçim için yeterli bir ölçüt değildir. Uzmanın şu alanlardaki deneyimine bakmak gerekir:",
      "Yeni bir çalışma alanı olan GEO'da, “GEO hizmeti veriyorum” ifadesi tek başına güvence sağlamaz. Uzman seçerken şu alanlardaki deneyim belirleyici olur:",
      "GEO'nun yeni bir alan olması, uzman seçiminde “GEO hizmeti veriyorum” ifadesinin ötesine bakmayı gerektiriyor. Özellikle şu alanlardaki deneyim önemlidir:",
    ])),
    h3('Teknik SEO bilgisi'),
    p(S('e1', [
      "Yapay zekâ sistemlerinin erişemediği veya doğru şekilde tarayamadığı bir web sitesinin güçlü GEO görünürlüğü elde etmesi zorlaşabilir.",
      "Yapay zekâ sistemlerinin erişemediği ya da doğru tarayamadığı bir web sitesi için güçlü bir GEO görünürlüğü elde etmek zordur.",
      "Bir web sitesi yapay zekâ sistemleri tarafından erişilemiyor veya doğru taranamıyorsa, güçlü GEO görünürlüğüne ulaşması zorlaşır.",
      "Erişim ve tarama sorunları olan bir web sitesinin yapay zekâ sistemlerinde güçlü bir görünürlük kazanması kolay değildir.",
    ])),
    h3('İçerik stratejisi'),
    p(S('e2', [
      "Yalnızca anahtar kelime odaklı içerik değil, kullanıcıların gerçek sorularına cevap veren kapsamlı bilgi mimarisi oluşturulmalıdır.",
      "İçerikler yalnızca anahtar kelimeye göre değil, kullanıcıların gerçek sorularına cevap veren kapsamlı bir bilgi mimarisine göre planlanmalıdır.",
      "Anahtar kelime odaklı içeriğin ötesine geçilmeli; kullanıcıların gerçek sorularını cevaplayan kapsamlı bir bilgi mimarisi kurulmalıdır.",
      "Hedef, anahtar kelimeleri doldurmak değil; kullanıcıların gerçek sorularına cevap veren kapsamlı bir bilgi mimarisi oluşturmaktır.",
    ])),
    h3('Semantic SEO yaklaşımı'),
    p(S('e3', [
      "Konular arasındaki ilişkilerin doğru kurulması markanın uzmanlık alanını güçlendirebilir.",
      "Konular arasında doğru ilişkiler kurmak, markanın uzmanlık alanının daha güçlü algılanmasını sağlayabilir.",
      "Konu ilişkilerinin doğru kurgulanması, markanın uzmanlık alanını belirgin biçimde güçlendirebilir.",
      "Birbiriyle doğru ilişkilendirilmiş konular, markanın uzmanlık alanını daha güçlü bir şekilde ortaya koyar.",
    ])),
    h3('Entity bilgisi'),
    p(S('e4', [
      "Marka, kişi, hizmet, lokasyon ve sektör ilişkilerinin açık şekilde oluşturulması gerekir.",
      "Marka, kişi, hizmet, lokasyon ve sektör arasındaki ilişkilerin net biçimde tanımlanması gerekir.",
      "Marka, kişi, hizmet, lokasyon ve sektör bağlantılarının açık ve tutarlı şekilde kurulması önemlidir.",
      "Marka, kişi, hizmet, lokasyon ve sektör ilişkileri açık bir biçimde tanımlanmalıdır.",
    ])),
    h3('Ölçümleme'),
    p(S('e5', [
      "GEO çalışmalarının yalnızca tahminlere dayanmaması gerekir. Belirli promptlar ve kullanıcı soruları üzerinden markanın ChatGPT, Gemini veya Perplexity gibi platformlardaki görünürlüğü düzenli olarak izlenebilir.",
      "GEO çalışmaları tahminle yönetilmemelidir. Belirlenen promptlar ve kullanıcı soruları üzerinden markanın ChatGPT, Gemini veya Perplexity gibi platformlardaki görünürlüğü düzenli aralıklarla takip edilebilir.",
      "GEO'da kararlar tahmine değil veriye dayanmalıdır. Markanın ChatGPT, Gemini veya Perplexity gibi platformlardaki görünürlüğü, belirli promptlar ve kullanıcı soruları üzerinden düzenli olarak izlenebilir.",
      "Ölçüm olmadan GEO çalışması tahmin üzerinde ilerler. Belirli promptlar ve kullanıcı soruları kullanılarak markanın ChatGPT, Gemini veya Perplexity gibi platformlardaki görünürlüğü düzenli şekilde izlenebilir.",
    ])),
  )

  // 13) İÇERİK
  ekle(
    h2('GEO Çalışmalarında İçerik Nasıl Hazırlanmalı?'),
    p(S('c1', [
      "GEO uyumlu içeriklerde en önemli noktalardan biri bilgiyi açık biçimde sunmaktır. Uzun ve karmaşık paragraflar yerine kullanıcının sorusunu doğrudan cevaplayan bölümler oluşturmak faydalıdır.",
      "GEO uyumlu içeriğin temel özelliklerinden biri bilgiyi açık bir şekilde sunmasıdır. Uzun ve karmaşık paragraflar yerine kullanıcının sorusuna doğrudan cevap veren bölümler tercih edilmelidir.",
      "GEO için hazırlanan içeriklerde açıklık her şeyden önce gelir. Kullanıcının sorusunu doğrudan cevaplayan bölümler, uzun ve karmaşık paragraflardan çok daha faydalıdır.",
      "Bilgiyi açık biçimde sunmak, GEO uyumlu içeriğin en önemli koşullarından biridir. Karmaşık ve uzun paragraflar yerine soruyu doğrudan cevaplayan bölümler oluşturulmalıdır.",
    ])),
    p(S('c2', [
      "İçeriklerde şu yapıların kullanılması bilgi değerini artırabilir:",
      "Aşağıdaki yapılar içeriklerin bilgi değerini artırabilir:",
      "İçeriklerin bilgi değerini artıran yapılardan bazıları şunlardır:",
      "Şu yapıların içerikte yer alması bilgi değerini yükseltebilir:",
    ])),
    ul(karistir(d, 'c-liste', ['Açık tanımlar', 'Soru-cevap bölümleri', 'Karşılaştırma tabloları', 'Adım adım açıklamalar', 'Uzman görüşleri', 'İstatistikler', 'Kaynaklar', 'Örnek senaryolar', 'Hizmet açıklamaları', 'Sıkça sorulan sorular'])),
    p(S('c3', [
      "Amaç yalnızca metni yapay zekâ için optimize etmek değildir. Asıl amaç kullanıcı için gerçekten yararlı olan ve yapay zekâ sistemlerinin de kolayca yorumlayabileceği içerikler üretmektir.",
      "Burada hedef metni sadece yapay zekâya göre düzenlemek değildir; asıl hedef kullanıcıya gerçekten fayda sağlayan ve yapay zekâ sistemlerinin de kolayca yorumlayabileceği içerikler üretmektir.",
      "İçeriği yalnızca yapay zekâ için optimize etmek yeterli değildir. Önemli olan, kullanıcı için gerçekten yararlı olan ve yapay zekâ sistemlerinin de rahatça yorumlayabildiği içerikler hazırlamaktır.",
      "Doğru yaklaşım, metni yalnızca yapay zekâya göre şekillendirmek değil; hem kullanıcıya gerçek değer sunan hem de yapay zekâ sistemlerinin kolayca yorumlayabileceği içerikler üretmektir.",
    ])),
  )

  // 14) ÖLÇÜM
  const metrikA = [
    ['AI görünürlüğü', 'Marka hedeflenen soruların kaçında cevap içerisinde yer alıyor?'],
    ['Mention oranı', 'Marka ne sıklıkla isim olarak kullanılıyor?'],
    ['Citation görünürlüğü', 'Web sitesi kaynak olarak gösteriliyor mu?'],
    ['Rakip görünürlüğü', 'Aynı sorgularda hangi rakipler daha fazla yer alıyor?'],
    ['Markalı aramalar', 'Kullanıcıların doğrudan marka adını arama sıklığında değişim bulunuyor mu?'],
    ['Referral trafik', 'Yapay zekâ platformlarından web sitesine trafik geliyor mu?'],
    ['Dönüşüm', 'GEO çalışmaları sonucunda lead veya satış tarafında ölçülebilir katkı oluşuyor mu?'],
  ]
  const metrikB = [
    ['AI görünürlüğü', 'Hedeflenen soruların kaçında marka cevabın içinde geçiyor?'],
    ['Mention oranı', 'Marka adı cevaplarda ne sıklıkla anılıyor?'],
    ['Citation görünürlüğü', 'Web sitesi cevaplarda kaynak olarak gösteriliyor mu?'],
    ['Rakip görünürlüğü', 'Aynı sorgularda hangi rakipler daha sık yer alıyor?'],
    ['Markalı aramalar', 'Marka adını doğrudan arayan kullanıcı sayısında bir değişim var mı?'],
    ['Referral trafik', 'Yapay zekâ platformlarından siteye gelen ziyaretçi var mı?'],
    ['Dönüşüm', 'GEO çalışmaları lead veya satış tarafında ölçülebilir bir katkı sağlıyor mu?'],
  ]
  ekle(
    h2('GEO Çalışmalarının Başarısı Nasıl Ölçülür?'),
    p(S('o1', [
      "GEO tarafında tek bir başarı metriği bulunmaz. Çalışmanın kapsamına göre farklı ölçümler kullanılabilir. Örneğin:",
      "GEO'da başarıyı tek bir metrikle ölçmek mümkün değildir; çalışmanın kapsamına göre farklı ölçümler kullanılır. Örneğin:",
      "GEO başarısının tek bir ölçüsü yoktur. Kapsama bağlı olarak farklı metrikler bir arada kullanılabilir:",
      "Tek bir GEO başarı metriğinden söz etmek doğru olmaz. Çalışmanın kapsamına göre şu ölçümlerden yararlanılabilir:",
    ])),
    ...S('o-set', [metrikA, metrikB]).map(([b, a]) => p(`**${b}:** ${a}`)),
    p(S('o2', [
      "Bu verilerin düzenli izlenmesi GEO çalışmalarının yalnızca görünürlük değil iş sonucu açısından da değerlendirilmesini sağlar.",
      "Bu verileri düzenli olarak takip etmek, GEO çalışmalarını yalnızca görünürlükle değil iş sonuçlarıyla da değerlendirmeyi mümkün kılar.",
      "Düzenli takip edilen bu veriler sayesinde GEO çalışmaları görünürlüğün yanında iş sonuçları açısından da değerlendirilebilir.",
      "Bu göstergeler düzenli izlendiğinde GEO'nun katkısı yalnızca görünürlükle değil, doğrudan iş sonuçlarıyla da ölçülebilir.",
    ])),
  )

  // 15) GELECEK
  ekle(
    h2("GEO Gelecekte SEO'nun Yerini Alacak mı?"),
    p(S('f1', [
      "GEO'nun SEO'nun tamamen yerini alması beklenmemelidir. Arama motorları ve yapay zekâ sistemleri birbirine giderek daha fazla yaklaşırken teknik SEO, kaliteli içerik, güvenilirlik ve dijital otorite gibi temel unsurlar her iki alan için de önemini koruyor.",
      "GEO'nun SEO'yu tamamen ortadan kaldırması beklenmiyor. Arama motorları ile yapay zekâ sistemleri giderek yakınlaşsa da teknik SEO, kaliteli içerik, güvenilirlik ve dijital otorite her iki alanda da temel önemini koruyor.",
      "SEO'nun yerini tamamen GEO'nun alacağını düşünmek doğru olmaz. Arama motorları ve yapay zekâ sistemleri birbirine yaklaştıkça teknik SEO, kaliteli içerik, güvenilirlik ve dijital otorite iki alanın ortak temeli olmaya devam ediyor.",
      "GEO, SEO'nun yerini almak yerine onunla birlikte gelişiyor. Arama motorları ve yapay zekâ sistemleri yakınlaştıkça teknik SEO, kaliteli içerik, güvenilirlik ve dijital otorite her iki taraf için de vazgeçilmez kalıyor.",
    ])),
    p(S('f2', [
      "Değişen şey kullanıcıların bilgiye ulaşma şeklidir. Eskiden kullanıcı bir sorgu yaparak 10 farklı sonucu tek tek inceleyebiliyordu. Bugün aynı kullanıcı yapay zekâ sisteminden birkaç saniye içinde karşılaştırmalı bir cevap alabiliyor.",
      "Değişen, kullanıcıların bilgiye ulaşma biçimi. Eskiden bir sorgunun ardından 10 farklı sonuç tek tek inceleniyordu; bugün aynı kullanıcı yapay zekâ sisteminden birkaç saniyede karşılaştırmalı bir cevap alabiliyor.",
      "Asıl değişim bilgiye erişim yolunda yaşanıyor. Kullanıcı eskiden bir sorgu için 10 sonucu tek tek inceleyebiliyordu; bugün ise yapay zekâ sistemi birkaç saniye içinde ona karşılaştırmalı bir cevap sunabiliyor.",
      "Değişen tek şey bilgiye ulaşma şekli. Bir zamanlar 10 farklı sonucu tek tek inceleyen kullanıcı, bugün yapay zekâ sisteminden saniyeler içinde karşılaştırmalı bir cevap alabiliyor.",
    ])),
    p(S('f3', [
      "Bu nedenle markaların yalnızca klasik arama motorlarını değil, yeni nesil bilgi keşif platformlarını da dijital görünürlük stratejilerine dahil etmesi gerekiyor.",
      "Bu yüzden markaların dijital görünürlük stratejilerinde klasik arama motorlarının yanına yeni nesil bilgi keşif platformlarını da eklemesi gerekiyor.",
      "Markaların dijital görünürlük stratejisi artık yalnızca klasik arama motorlarını değil, yeni nesil bilgi keşif platformlarını da kapsamalı.",
      `${d.loc} faaliyet gösteren markalar için de sonuç aynı: Dijital görünürlük stratejisi, klasik arama motorlarının yanında yeni nesil bilgi keşif platformlarını da içermeli.`,
    ])),
  )

  return bloklar
}

// ── SSS ─────────────────────────────────────────────────────
export function konumSSS(d) {
  const S = (id, arr) => sec(d, id, arr)
  const ist = d.slug === 'istanbul'
  return [
    {
      s: S('sss1-s', ['GEO uzmanı nedir?', `${d.ad} GEO uzmanı nedir?`]),
      c: S('sss1', [
        "GEO uzmanı, markaların ChatGPT, Gemini, Perplexity, Google AI Overviews ve diğer üretken yapay zekâ sistemlerinde daha görünür ve doğru anlaşılır hale gelmesi için strateji geliştiren uzmandır.",
        "GEO uzmanı; markaların ChatGPT, Gemini, Perplexity, Google AI Overviews ve benzeri üretken yapay zekâ sistemlerinde daha görünür olması ve doğru anlaşılması için strateji geliştiren kişidir.",
        "ChatGPT, Gemini, Perplexity, Google AI Overviews ve diğer üretken yapay zekâ sistemlerinde markaların daha görünür ve doğru anlaşılır olması için strateji geliştiren uzmana GEO uzmanı denir.",
        "GEO uzmanı, markaların üretken yapay zekâ sistemlerinde (ChatGPT, Gemini, Perplexity, Google AI Overviews gibi) daha görünür olması ve doğru anlaşılması için strateji kuran uzmandır.",
      ]),
    },
    {
      s: S('sss2-s', ['GEO danışmanlığı kimler için uygundur?', `${d.loc} GEO danışmanlığı kimler için uygundur?`]),
      c: ist
        ? "İnternet üzerinden müşteri kazanan B2B şirketler, e-ticaret markaları, danışmanlık firmaları, sağlık kuruluşları, turizm işletmeleri, teknoloji şirketleri ve profesyonel hizmet sağlayıcılar GEO çalışmalarından faydalanabilir."
        : S('sss2', [
          `İnternet üzerinden müşteri kazanan B2B şirketler, e-ticaret markaları ve profesyonel hizmet sağlayıcılar GEO çalışmalarından faydalanabilir. ${d.loc} özellikle ${liste(d.sektorler)} alanlarındaki işletmeler için GEO önemli bir görünürlük alanı oluşturur.`,
          `${d.loc} başta ${liste(d.sektorler)} olmak üzere, internet üzerinden müşteri kazanan B2B şirketler, e-ticaret markaları ve profesyonel hizmet sağlayıcılar GEO çalışmalarından faydalanabilir.`,
          `Müşterilerini internet üzerinden kazanan her işletme GEO'dan faydalanabilir: B2B şirketler, e-ticaret markaları ve profesyonel hizmet sağlayıcılar bunların başında gelir. ${d.ad} özelinde ${liste(d.sektorler)} alanlarındaki işletmeler öne çıkar.`,
          `B2B şirketler, e-ticaret markaları ve profesyonel hizmet sağlayıcılar gibi internet üzerinden müşteri kazanan işletmeler GEO çalışmalarından faydalanabilir; ${d.loc} bu durum özellikle ${liste(d.sektorler)} için geçerlidir.`,
        ]),
    },
    {
      s: 'SEO ve GEO aynı şey midir?',
      c: S('sss3', [
        "Hayır. SEO klasik arama motorlarında görünürlüğe odaklanırken GEO üretken yapay zekâ sistemlerindeki marka ve içerik görünürlüğünü geliştirmeye odaklanır. Ancak iki alan birbirini güçlü şekilde tamamlar.",
        "Hayır. SEO klasik arama motorlarındaki görünürlüğü hedeflerken GEO, üretken yapay zekâ sistemlerinde marka ve içerik görünürlüğünü geliştirmeyi amaçlar. Yine de iki alan birbirini güçlü biçimde tamamlar.",
        "Aynı değildir. SEO'nun odağı klasik arama motorlarındaki görünürlük, GEO'nun odağı ise üretken yapay zekâ sistemlerindeki marka ve içerik görünürlüğüdür. İki alan birbirini güçlü şekilde destekler.",
        "Hayır; SEO klasik arama motorlarına, GEO ise üretken yapay zekâ sistemlerindeki marka ve içerik görünürlüğüne odaklanır. Bununla birlikte iki çalışma birbirini güçlü şekilde tamamlar.",
      ]),
    },
    {
      s: 'GEO çalışmalarında ChatGPT görünürlüğü artırılabilir mi?',
      c: S('sss4', [
        "Doğru içerik mimarisi, marka otoritesi, semantic SEO, entity ilişkileri ve güvenilir dijital kaynaklarla ChatGPT ve benzeri sistemlerin markayı doğru bağlamlarla ilişkilendirmesi desteklenebilir.",
        "Doğru bir içerik mimarisi, marka otoritesi, semantic SEO, entity ilişkileri ve güvenilir dijital kaynaklar sayesinde ChatGPT ve benzeri sistemlerin markayı doğru bağlamlarla ilişkilendirmesi desteklenebilir.",
        "Evet, desteklenebilir. İçerik mimarisi, marka otoritesi, semantic SEO, entity ilişkileri ve güvenilir dijital kaynaklar doğru kurgulandığında ChatGPT ve benzeri sistemlerin markayı doğru bağlamlarla ilişkilendirmesi kolaylaşır.",
        "ChatGPT ve benzeri sistemlerin markayı doğru bağlamlarla ilişkilendirmesi; doğru içerik mimarisi, marka otoritesi, semantic SEO, entity ilişkileri ve güvenilir dijital kaynaklarla desteklenebilir.",
      ]),
    },
    {
      s: 'GEO uzmanı ile GEO ajansı arasındaki fark nedir?',
      c: S('sss5', [
        "GEO uzmanı çoğu zaman strateji ve uygulamayı daha doğrudan yönetirken GEO ajansları içerik, SEO, yazılım ve dijital PR gibi farklı uzmanlıkları ekip halinde sunabilir. Tercih projenin kapsamına göre yapılmalıdır.",
        "GEO uzmanı strateji ve uygulamayı genellikle daha doğrudan yönetir; GEO ajansları ise içerik, SEO, yazılım ve dijital PR gibi uzmanlıkları bir ekip hâlinde sunabilir. Seçim projenin kapsamına göre yapılmalıdır.",
        "Temel fark çalışma modelindedir: GEO uzmanı strateji ve uygulamayı çoğunlukla doğrudan yönetirken ajanslar içerik, SEO, yazılım ve dijital PR gibi uzmanlıkları ekip olarak sunar. Hangisinin uygun olduğu projenin kapsamına bağlıdır.",
        "GEO ajansları içerik, SEO, yazılım ve dijital PR gibi farklı uzmanlıkları ekip hâlinde sunabilirken GEO uzmanı strateji ve uygulamayı çoğu zaman daha doğrudan yönetir. Doğru tercih projenin kapsamına göre belirlenmelidir.",
      ]),
    },
    {
      s: 'GEO çalışmaları ne kadar sürede sonuç verir?',
      c: S('sss6', [
        "Süre; sitenin mevcut otoritesine, içerik yapısına, sektör rekabetine ve markanın internetteki bilinirliğine göre değişir. GEO tek seferlik bir optimizasyon yerine sürekli geliştirilen dijital otorite çalışması olarak değerlendirilmelidir.",
        "Sonuç alma süresi; sitenin mevcut otoritesine, içerik yapısına, sektördeki rekabete ve markanın internetteki bilinirliğine bağlıdır. GEO, tek seferlik bir optimizasyon değil, sürekli geliştirilen bir dijital otorite çalışmasıdır.",
        "Bu süre sitenin mevcut otoritesi, içerik yapısı, sektör rekabeti ve markanın internetteki bilinirliğine göre farklılık gösterir. GEO'yu tek seferlik bir optimizasyon olarak değil, sürekli gelişen bir dijital otorite çalışması olarak görmek gerekir.",
        `Sabit bir süre vermek doğru olmaz; sitenin otoritesi, içerik yapısı, sektör rekabeti ve markanın internetteki bilinirliği süreyi belirler. Bu nedenle GEO, tek seferlik bir optimizasyon yerine sürekli geliştirilen bir dijital otorite çalışması olarak ele alınmalıdır.`,
      ]),
    },
  ]
}

// ── META ────────────────────────────────────────────────────
export function konumMeta(d) {
  return {
    title: `${d.ad} GEO Uzmanı | Fatih Emin Çakıroğlu`,
    h1: `${d.ad} GEO Uzmanı`,
    desc: sec(d, 'meta', [
      `${d.ad} GEO Uzmanı: ChatGPT, Gemini, Perplexity ve Google AI Overviews'da markanızın doğru anlaşılması ve görünür olması için GEO danışmanlığı.`,
      `${d.loc} markanızı ChatGPT, Gemini ve Google AI Overviews cevaplarında görünür kılmak için GEO uzmanı desteği: analiz, içerik mimarisi ve ölçüm.`,
      `${d.ad} GEO Uzmanı ile yapay zekâ aramalarında görünür olun. GEO nedir, GEO uzmanı ne yapar, SEO ile farkı ve başarı nasıl ölçülür?`,
      `${d.loc} işletmeler için GEO danışmanlığı: ChatGPT, Gemini ve Perplexity'de marka görünürlüğü, semantic SEO, entity ve AI görünürlük takibi.`,
    ]),
  }
}
