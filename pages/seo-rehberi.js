import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';

const BOLUMLER_TR = [
  {
    id: 'seo-nedir', no: '01', baslik: 'SEO Nedir?',
    alt: [
      {
        h: 'SEO Nedir? Arama Motoru Optimizasyonunu Anlamak',
        p: ['SEO (Search Engine Optimization — Arama Motoru Optimizasyonu), web sitenizin Google, Bing ve Yandex gibi arama motorlarında organik (ücretli olmayan) arama sonuçlarında üst sıralarda görünmesi için yapılan teknik, içerik ve otorite inşası çalışmalarının tümüdür. SEO\'nun amacı; doğru anahtar kelimelerde, doğru kullanıcılara, doğru zamanda görünmektir.',
          'SEO üç temel sütun üzerine kuruludur: (1) Teknik SEO — sitenizin arama motorları tarafından taranabilir ve indexlenebilir olması. (2) İçerik SEO — kullanıcı niyetiyle örtüşen, E-E-A-T sinyalleri güçlü içerikler. (3) Off-Page SEO — diğer sitelerden kazanılan backlinkler ve marka sinyalleri. Bu üç sütunun dengeli biçimde güçlenmesi kalıcı organik büyüme sağlar.',
          'SEO bir gün içinde sonuç vermez; ancak doğru yapıldığında reklamların aksine zamanla birikim yapan, maliyeti azalan ve geri dönüşü yükselen bir yatırımdır. Organik arama, tüm web trafiğinin %53\'ünü oluşturur ve satın alma kararlarının %70\'inden fazlası bir arama sorgusuyla başlar.'],
      },
      {
        h: "SEO'nun Kısa Tarihi: 1990'lardan Bugüne",
        p: ["SEO'nun tarihi 1990'lı yılların ortasında, web\'in hızla büyüdüğü ve ilk arama motorlarının (AltaVista, Yahoo, Excite) ortaya çıktığı dönemde başlar. O yıllarda SEO yalnızca anahtar kelimeleri sayfa içine doldurmaktan ibaretti — meta keyword stuffing bu dönemin sembolüdür.",
          "2000'li yıllarda Google'ın PageRank algoritması devrim yarattı. Artık sayfalar yalnızca içerikle değil, dışarıdan aldıkları link miktarıyla da değerlendiriliyordu. Bu dönem, link satın alma ve link çiftliklerinin (PBN) altın çağıydı.",
          "2010'larla birlikte Google, Panda (düşük kaliteli içerik), Penguin (spam backlinkler) ve Hummingbird (semantik arama) güncellemeleriyle manipülatif taktikleri cezalandırmaya başladı. 2023-2025 arası dönemde ise AI Overview, Helpful Content güncellemeleri ve E-E-A-T odağı modern SEO'nun çerçevesini belirledi."],
      },
      {
        h: "SEO Neden Bu Kadar Önemlidir? (İstatistiklerle)",
        p: ["SEO'nun önemi rakamlarla somutlaşır: Google'daki organik sonuçlar toplam tıklamaların %71\'ini alır. Kullanıcıların %75\'i hiçbir zaman ikinci sayfaya geçmez. İlk sıradaki organik sonuç, 10. sıradaki sonuca göre ortalama 10 kat daha fazla tıklama alır. SEO ile edinilen lead\'lerin kapanma oranı %14.6 iken, outbound pazarlamada bu oran yalnızca %1.7\'dir.",
          "Maliyet açısından bakıldığında SEO, uzun vadede Google Ads\'ten çok daha düşük müşteri edinim maliyeti (CAC) sunar. Organik sıralama bir kez elde edildiğinde, reklam harcaması olmaksızın sürekli trafik üretmeye devam eder. Araştırmalar, SEO\'nun ortalama %1000\'in üzerinde ROI sağladığını ortaya koyuyor.",
          "Rekabetçi avantaj açısından ise ilk sayfada yer alan bir marka; otomatik olarak güvenilir, uzman ve önemli bir kaynak olarak algılanır. AI Overview döneminde bu algı daha da güçlendi — kullanıcılar AI yanıtlarında görünen markaları daha güvenilir buluyor."],
      },
      {
        h: "SEO, SEM ve Sosyal Medya Pazarlaması Arasındaki Fark",
        p: ["SEO (organik arama) ve SEM (Search Engine Marketing — ücretli arama) sıkça karıştırılır. SEM; Google Ads, tıklama başına ödeme (PPC) modeliyle çalışır ve bütçe kesildiğinde trafik anında durur. SEO ise zaman gerektirir ama kalıcıdır. En güçlü strateji, ikisini birlikte uygulamaktır.",
          "Sosyal medya pazarlaması ise doğrudan arama niyetiyle buluşmak yerine, marka bilinirliği ve topluluk inşası için tasarlanmıştır. Sosyal sinyaller (beğeni, paylaşım) doğrudan sıralama faktörü değildir; ancak içeriğin yayılması backlink kazanımını dolaylı olarak artırabilir.",
          "Üç kanalın akıllıca kombinasyonu ideal dijital pazarlama stratejisini oluşturur: SEO uzun vadeli organik büyüme için, SEM hızlı görünürlük ve anahtar kelime verisi için, sosyal medya marka güveni ve içerik amplifikasyonu için kullanılır."],
      },
      {
        h: "White Hat, Black Hat ve Gray Hat SEO: Neleri Asla Yapmamalısınız?",
        p: ["White Hat SEO, Google\'ın yönergelerine tam uyumlu, kullanıcı odaklı ve sürdürülebilir yöntemlerin tümüdür. Kaliteli içerik üretmek, doğal backlink kazanmak, iyi teknik altyapı kurmak bu kategoriye girer. Uzun vadeli, güvenli tek yol budur.",
          "Black Hat SEO, kısa vadeli kazanım için Google kurallarını ihlal eden taktikleri kapsar: anahtar kelime doldurma (keyword stuffing), gizli metin (hidden text), link satın alma, içerik kopyalama (scraping) ve cloaking. Bu taktikler manuel ceza veya algoritmik değer düşürmeyle sonuçlanır ve geri dönüşü çok zordur.",
          "Gray Hat SEO ise ikisi arasında kalan gri bölgedir. Belirli link exchange anlaşmaları, yüksek miktarda misafir yazarlık veya exact match domain kullanımı bu kategoride değerlendirilebilir. Risk toleransınıza göre kaçınılması önerilir; Google'ın algoritmaları giderek daha hassas hale gelmektedir."],
      },
    ],
  },
  {
    id: 'nasil-calisir', no: '02', baslik: 'Arama Motorları Nasıl Çalışır?',
    alt: [
      {
        h: 'Googlebot Nasıl Çalışır? Crawl Bütçesi ve Tarama Önceliği',
        p: ['Googlebot, Google\'ın web\'i keşfetmek için kullandığı otomatik tarayıcı programıdır. İnterneti sürekli dolaşarak yeni ve güncellenmiş sayfalar bulur. Bir sayfayı bulduğunda içeriğini okur, içindeki linkleri takip eder ve bu şekilde yeni sayfalara geçer.',
          'Crawl bütçesi, Google\'ın sitenize belirli bir sürede ayırdığı tarama kapasitesidir. Büyük siteler için kritik olan bu kavram, düşük kaliteli sayfaların (thin content, parametre URL\'leri, session ID\'ler) crawl bütçesini tüketmesi nedeniyle önemli sayfaların indexlenmemesine yol açabilir.',
          'Tarama önceliği; sayfa değerine (iç ve dış link sayısı), güncelleme sıklığına ve crawl başarı geçmişine göre belirlenir. Robots.txt ile belirli alanları taramadan hariç tutabilir, XML sitemap ile önemli sayfaları öne çıkarabilirsiniz.'],
      },
      {
        h: 'İndeksleme Süreci: Sayfanız Google\'a Nasıl Girer?',
        p: ['Googlebot bir sayfayı taradıktan sonra içeriği işler ve Google\'ın devasa veritabanına (indeks) ekler. Bu süreçte sayfa; başlık, içerik, meta etiketler, linkler ve yapısal veri açısından analiz edilir.',
          'İndeksleme için sayfanızın birkaç koşulu sağlaması gerekir: robots.txt tarafından engellenmemiş olması, noindex etiketi taşımaması, canonical tag\'inin doğru yapılandırılmış olması ve çok düşük kaliteli içerik içermemesi. Google Search Console\'daki URL Inspection aracıyla herhangi bir sayfanın indeks durumunu kontrol edebilirsiniz.',
          'Yeni yayınlanan içeriklerin indexlenmesi genellikle birkaç gün ile birkaç hafta arasında sürer. Google Search Console\'dan "URL\'yi İndeksle" talebi göndererek bu süreci hızlandırabilirsiniz; ancak bu garanti değildir.'],
      },
      {
        h: "Google'ın Sıralama Algoritması: 200+ Faktörün Özeti",
        p: ["Google, sıralama kararları için 200'ü aşkın faktör kullandığını açıklamıştır. Bu faktörler üç ana kategoride incelenebilir: sayfa içi faktörler (içerik kalitesi, anahtar kelime alakası, başlık optimizasyonu), sayfa dışı faktörler (backlink profili, marka sinyalleri, sosyal amplifikasyon) ve teknik faktörler (sayfa hızı, mobil uyumluluk, Core Web Vitals).",
          "En önemli sıralama faktörleri arasında şunlar yer alır: İçerik kalitesi ve kullanıcı niyetiyle uyum, backlink profili (kalite ve alaka düzeyi), teknik sağlık (hız, crawlability), E-E-A-T sinyalleri ve kullanıcı deneyimi metrikleri (bounce rate, dwell time, CTR).",
          "Google algoritması sabit değildir; yılda yüzlerce güncelleme yapılır. Büyük güncellemeler (Core Updates, Helpful Content Updates) sıralama profillerini önemli ölçüde değiştirebilir. Bu nedenle SEO stratejisi, belirli taktiklere değil temel prensiplere dayalı olmalıdır."],
      },
      {
        h: "E-E-A-T Nedir? (Deneyim, Uzmanlık, Otorite, Güven)",
        p: ["E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), Google\'ın Search Quality Rater Guidelines\'ında tanımladığı içerik kalite değerlendirme çerçevesidir. Sıralama algoritmasına doğrudan bir girdi olmasa da, Google\'ın içerik kalitesini değerlendirdiği şeyleri ortaya koyması nedeniyle kritik önem taşır.",
          "Deneyim (Experience): İçerik üreticisinin konuyla birinci elden deneyiminin olması. Uzmanlık (Expertise): Konuya hakim, eğitimli veya deneyimli bir yazarın katkısı. Otorite (Authoritativeness): Sektörde tanınan, güvenilir bir kaynak olarak konumlandırma. Güven (Trustworthiness): Şeffaf, doğrulanabilir bilgilerle güven inşası.",
          "E-E-A-T sinyallerini güçlendirmek için: yazar biyografileri ve LinkedIn profilleri ekleyin, sektör medyasında yer alın, araştırma ve özgün veri yayınlayın, kurumsal bilgileri şeffaf biçimde paylaşın ve müşteri yorumlarını sergileyin."],
      },
      {
        h: "Core Web Vitals ve Sayfa Deneyimi Sinyalleri",
        p: ["Core Web Vitals, Google\'ın 2021\'den itibaren resmi sıralama sinyali olarak kabul ettiği kullanıcı deneyimi metrikleridir. Üç temel metrikten oluşur: LCP (Largest Contentful Paint — yükleme hızı, hedef: <2.5 saniye), INP (Interaction to Next Paint — etkileşim hızı, hedef: <200ms) ve CLS (Cumulative Layout Shift — görsel kararlılık, hedef: <0.1).",
          "LCP'yi etkileyen başlıca faktörler: sunucu yanıt süresi, render-blocking kaynaklar ve görsel optimizasyonu. INP için ana thread blokajı ve third-party script yükleme stratejisi kritiktir. CLS için görsellere boyut vermek ve dinamik içerik için alan rezervasyonu yapmak gereklidir.",
          "Core Web Vitals\'ı ölçmek için Google Search Console (alan verisi), PageSpeed Insights (lab + alan verisi) ve Chrome DevTools (geliştirici testleri) kullanılabilir. Bu metrikler hem sıralama hem de kullanıcı deneyimi açısından kritik olduğundan, teknik SEO\'nun ayrılmaz parçası haline gelmiştir."],
      },
    ],
  },
  {
    id: 'anahtar-kelime', no: '03', baslik: 'Anahtar Kelime Araştırması',
    alt: [
      {
        h: 'Anahtar Kelime Nedir ve Türleri Nelerdir? (Head, Body, Long-Tail)',
        p: ['Anahtar kelimeler, kullanıcıların arama motorlarına yazdığı kelime ve kelime öbekleridir. SEO açısından üç ana kategoride incelenir: Head keywords (1 kelime, örn: "SEO") yüksek hacim + yüksek rekabet içerir. Body keywords (2-3 kelime, örn: "SEO nasıl yapılır") orta hacim + orta rekabet sunar. Long-tail keywords (3+ kelime, örn: "e-ticaret sitesi için SEO rehberi") düşük hacim + düşük rekabet + yüksek niyet netliği ile gelir.',
          'Long-tail kelimeler toplamda tüm aramaların %70\'ini oluşturur ve dönüşüm oranı genellikle head kelimelerden çok daha yüksektir. Yeni bir site için long-tail kelimelerle başlamak hem daha hızlı sıralama hem de daha nitelikli trafik sağlar.',
          'Ayrıca anahtar kelimeler arama niyetine göre de sınıflandırılır: Informational (bilgi arama), Navigational (belirli site arama), Commercial (ürün/hizmet araştırma) ve Transactional (satın alma). Bu sınıflandırma, hangi içerik türünün hazırlanacağını belirler.'],
      },
      {
        h: "Arama Niyeti (Search Intent) Neden Her Şeyden Önce Gelir?",
        p: ["Arama niyeti, bir kullanıcının sorguyu yazarken gerçekte ne istediğidir. Google, 'en alakalı içerik' yerine 'niyetle en iyi örtüşen içerik' kavramına evrilmiştir. Bu nedenle arama niyetini yanlış okumak, mükemmel teknik SEO yapılmış bir içeriğin hiç sıralanmamasına yol açabilir.",
          "'En iyi laptop' araması yapan biri karşılaştırma makalesi bekler, ürün sayfası değil. 'Laptop nasıl temizlenir' araması yapan biri adım adım rehber ister. 'MacBook Pro fiyat' araması yapan biri ürün sayfası veya fiyat listesi bekler. Her biri farklı içerik formatı gerektirir.",
          "Niyet analizi için en basit yöntem: hedef anahtar kelimenizi Google\'a yazın ve ilk 5-10 organik sonucu inceleyin. Tümü blog mu? Ürün sayfası mı? Video mu? Listicle mi? Bu analiz, içeriğinizin formatını ve derinliğini belirlemenin en güvenilir yoludur."],
      },
      {
        h: "Anahtar Kelime Araştırması Nasıl Yapılır? Adım Adım Süreç",
        p: ["Adım 1 — Seed keywords belirleyin: İşletmenizle ilgili 5-10 temel kavramı listeleyin. Bunlar aramanızın başlangıç noktasıdır. Adım 2 — Araç kullanın: Google Keyword Planner, Ahrefs Keywords Explorer veya SEMrush\'a seed kelimelerinizi girin. Hacim, zorluk (KD) ve tıklama verilerini not alın.",
          "Adım 3 — Rakip analizi yapın: En güçlü rakibinizin sitesini araç içinde analiz edin. Hangi kelimelerde organik trafik alıyor? Bu kelimelerin hangilerinde siz yoksunuz? Bu boşluklar, en hızlı kazanım fırsatlarınızdır. Adım 4 — Arama niyetini eşleştirin: Her kelime için niyet türünü belirleyin (informational, commercial, transactional) ve içerik türünü buna göre planlayın.",
          "Adım 5 — Anahtar kelime haritası oluşturun: Her sayfaya bir birincil hedef kelime ve 3-5 destekleyici kelime atayın. İki farklı sayfa aynı kelimeyi hedeflememeli; bu 'keyword cannibalization' sorununa yol açar. Adım 6 — Önceliklendirin: Düşük zorluk + orta hacim + yüksek ticari niyet — bu üçlünün kesiştiği kelimeler en hızlı kazanım sunar."],
      },
      {
        h: "En İyi Ücretsiz ve Ücretli Anahtar Kelime Araçları",
        p: ["Ücretsiz araçlar: Google Search Console (mevcut sıralamalarınız için en değerli kaynak), Google Keyword Planner (arama hacmi tahminleri), Google Trends (mevsimsellik analizi), Google Search Suggest & People Also Ask (uzun kuyruk kelimeler için altın maden) ve Ubersuggest (sınırlı ücretsiz kullanım).",
          "Ücretli araçlar: Ahrefs — backlink analizi ve anahtar kelime araştırmasında sektör standardı. SEMrush — reklam + organik karma analiz için kapsamlı. Moz Pro — DA/PA metrikleri ve SERP analizi. SE Ranking — küçük ve orta bütçeler için güçlü alternatif. Bir araçla başlamak istiyorsanız Ahrefs veya SEMrush'ı öneririm.",
          "Araç seçiminde şu soruyu sorun: Hangi veriyi en sık kullanacaksınız? Backlink analizi için Ahrefs, reklam verisiyle karşılaştırma için SEMrush, bütçe dostu çözüm için SE Ranking veya Mangools daha uygun olabilir. Araç başarıyı garantilemez; onu kullanan SEO uzmanı fark yaratır."],
      },
      {
        h: "Rakip Anahtar Kelime Analizi: Boşlukları Nasıl Bulursunuz?",
        p: ["Rakip anahtar kelime analizi (keyword gap analizi), rakiplerinizin organik trafik aldığı ama sizin henüz sıralanmadığınız kelimeleri tespit etme sürecidir. Ahrefs'te 'Content Gap', SEMrush'ta 'Keyword Gap' aracıyla yapılır.",
          "Süreç şöyle işler: (1) 3-5 ana rakibinizi belirleyin. (2) Araçta rakip domainleri girin. (3) Rakiplerin aldığı ama sizin almadığınız kelimeleri filtreleyin. (4) Bu listeyi hacim, zorluk ve ticari niyet değerlerine göre sıralayın. (5) En değerli boşlukları içerik planınıza ekleyin.",
          "Rakip analizi yaparken dikkat edilmesi gereken nokta: Her rekabetçi anahtar kelime hedeflenmemeli. Domain otoriteniz rakibinizden çok düşükse, onların güçlü olduğu head kelimeleri değil, onların zayıf kaldığı long-tail segmentleri hedeflemek daha akıllıcadır."],
      },
      {
        h: "Anahtar Kelime Haritası (Keyword Map) Oluşturma Rehberi",
        p: ["Anahtar kelime haritası, sitenizdeki her sayfaya hangi hedef kelimenin atandığını gösteren belgedir. Bu harita olmadan, farklı sayfalar aynı kelimeyi hedefler (cannibalization) veya değerli kelimeler hiç hedeflenmez.",
          "İdeal bir keyword map şunları içerir: Sayfa URL'si, Birincil hedef kelime (1 adet), Destekleyici kelimeler (3-5 adet), Arama niyeti türü, Hedef içerik formatı (blog, ürün, kategori, açılış sayfası). Google Sheets veya Notion'da basit bir tablo yeterlidir.",
          "Keyword map oluştururken pillar-cluster yapısını göz önünde bulundurun: Ana konu sayfaları (pillar) geniş head kelimeleri hedeflerken, alt sayfalar (cluster) daha spesifik long-tail kelimeleri hedeflemelidir. Bu yapı hem kullanıcı navigasyonunu hem topical authority'yi güçlendirir."],
      },
    ],
  },
  {
    id: 'teknik-seo', no: '04', baslik: 'Teknik SEO',
    alt: [
      {
        h: "Site Hızı Optimizasyonu: Core Web Vitals Nasıl İyileştirilir?",
        p: ["Sayfa hızı hem resmi bir sıralama faktörü hem de kullanıcı deneyiminin kritik bileşenidir. 1 saniyelik gecikme, mobil dönüşümlerde %20 düşüşe yol açar. Hedef: 2.5 saniyenin altında LCP, 200ms altında INP ve 0.1'den düşük CLS.",
          "Teknik hız optimizasyon checklist'i: Görüntüleri WebP formatına dönüştürün ve lazy load uygulayın. CSS ve JavaScript dosyalarını minify edin. Render-blocking kaynakları azaltın veya ertelemek için async/defer kullanın. HTTP/2 veya HTTP/3 protokolüne geçin. İyi bir CDN (Cloudflare, Fastly) kullanın. Sunucu yanıt süresini (TTFB) 600ms altında tutun.",
          "LCP için en kritik adım: Hero görselini <link rel='preload'> ile önceden yükleyin. Bu tek adım, LCP skorunu dramatik biçimde iyileştirebilir. CLS için tüm görsellere width ve height attribute verin. INP için üçüncü taraf script'leri (chat, analytics) lazy load edin."],
      },
      {
        h: "Mobil Uyumluluk ve Mobile-First İndeksleme",
        p: ["Google, 2019'dan itibaren Mobile-First Indexing uyguluyor. Bu, Google'ın sitenizi değerlendirmek için masaüstü versiyonu değil, mobil versiyonu kullandığı anlamına gelir. Mobil versiyonunuz eksik içerik veya yapısal veriye sahipse, masaüstü performansınız ne kadar iyi olursa olsun sıralamada geride kalabilirsiniz.",
          "Mobil uyumluluğu sağlamak için: Responsive design kullanın (farklı ekranlar için CSS adaptasyonu). Minimum 16px font boyutu ve tıklanabilir öğeler arası 48px boşluk standartlarına uyun. Viewport meta tag'ini doğru yapılandırın. Tap target'larının yeterince büyük olduğundan emin olun.",
          "Google Search Console'daki 'Mobil Kullanılabilirlik' raporu, mobil sorunları tespit etmenin en hızlı yoludur. Ayrıca Google'ın Mobile-Friendly Test aracıyla herhangi bir URL'yi test edebilirsiniz."],
      },
      {
        h: "XML Sitemap ve Robots.txt Dosyası Nasıl Yapılandırılır?",
        p: ["XML Sitemap, arama motorlarına sitenizdeki önemli URL'leri bildiren bir rehber dosyasıdır. Sitemap'te yalnızca indexlenmesini istediğiniz, canonical, 200 status kodu döndüren sayfaları bulundurun. Noindex veya yönlendirilen sayfaları sitemap'e eklemeyin. WordPress'te Yoast SEO, Next.js'te dinamik sitemap route'larıyla otomatik olarak oluşturulabilir.",
          "Robots.txt, arama motoru botlarına hangi alanları tarayıp tarayamayacaklarını bildiren metin dosyasıdır. Site kök dizininde (/robots.txt) yer alır. Yanlış yapılandırılmış bir robots.txt, tüm sitenizin taranmasını engelleyebilir. Staging ve geliştirme ortamlarında 'Disallow: /' kullanarak bu ortamların indexlenmesini mutlaka engelleyin.",
          "Sitemap'i Google Search Console'dan submit etmek, indexleme sürecini hızlandırır. Büyük siteler için sitemap index dosyası ve bölünmüş sitemaplar kullanılması önerilir (50.000 URL/sitemap sınırı vardır). Görsel içerik için ayrı görsel sitemap, video içerik için video sitemap oluşturulabilir."],
      },
      {
        h: "Canonical Tag, 301 Yönlendirme ve Duplicate Content",
        p: ["Duplicate content — aynı veya çok benzer içeriğin birden fazla URL'de bulunması — Google'ın hangi versiyonu sıralayacağı konusunda kafa karışıklığına yol açar ve link değerini böler. E-ticaret filtre URL'leri, session ID parametreleri, HTTP/HTTPS farkları ve www/non-www varyasyonları yaygın duplicate content kaynaklarıdır.",
          "Canonical tag (<link rel='canonical'>), birden fazla URL'de benzer içerik bulunduğunda 'tercih edilen' versiyonu arama motorlarına bildiren HTML elementidir. Her sayfa kendine canonical göstermeli; yinelenen sayfalar ise orijinal versiyona canonical yönlendirmeli.",
          "301 Yönlendirme (kalıcı yönlendirme), bir sayfanın kalıcı olarak taşındığını belirtir ve link değerinin ~90-99'unu aktarır. Site migrasyonlarında, URL yapısı değişikliklerinde ve silinen sayfalar için kritiktir. 302 (geçici yönlendirme) link değeri aktarmadığından, kalıcı değişikliklerde asla kullanılmamalıdır."],
      },
      {
        h: "Schema Markup (Yapısal Veri) ile Zengin Sonuçlar Kazanmak",
        p: ["Schema markup (JSON-LD formatında yapısal veri), arama motorlarına sayfanızın içeriği hakkında makine-okunabilir bağlam sağlar. Bu bilgiler, SERP'te zengin sonuçlar (rich results) olarak kullanıcılara gösterilebilir: yıldız derecelendirmeleri, SSS accordion'ları, nasıl yapılır adımları, etkinlik tarihleri ve fiyat bilgileri.",
          "En değerli schema türleri: Article (blog yazıları için), FAQPage (sık sorulan sorular), HowTo (adım adım rehberler), Product (ürün sayfaları), LocalBusiness (yerel işletmeler), Review/AggregateRating (değerlendirmeler). AI Overview döneminde FAQPage ve Article schema, AI kaynağı seçilme olasılığını artırır.",
          "Schema markup doğruluğunu Google'ın Rich Results Test aracıyla kontrol edin. Schema.org sitesi tüm mevcut schema türlerini ve gerekli alanları listeler. Schema hataları zengin sonuçlardan dışlanmanıza neden olabilir; bu nedenle implementasyon sonrası doğrulama zorunludur."],
      },
      {
        h: "HTTPS, Güvenlik ve Teknik SEO Denetimi (Audit) Nasıl Yapılır?",
        p: ["HTTPS, 2014'ten itibaren resmi Google sıralama sinyalidir. SSL sertifikası olmayan (HTTP) siteler, modern tarayıcılarda 'Güvenli Değil' uyarısı gösterir ve kullanıcı güvenini zedeler. Let's Encrypt ile ücretsiz SSL sertifikası edinebilir, cPanel/hosting panelinden kolayca aktif edebilirsiniz.",
          "Kapsamlı bir teknik SEO denetimi (audit) için kullanılacak araçlar: Screaming Frog (kapsamlı site crawl, kırık linkler, duplicate content), Ahrefs Site Audit (teknik sorunlar ve backlink profili), Google Search Console (Google'ın gördüğü sorunlar), PageSpeed Insights (hız ve CWV) ve GTmetrix (waterfall analizi).",
          "Teknik audit öncelik sırası: (1) İndeksleme sorunları — indexlenmeyen önemli sayfalar. (2) Kırık linkler (404) — özellikle yüksek trafik alan sayfalarda. (3) Yönlendirme zincirleri — birden fazla yönlendirme performansı düşürür. (4) Core Web Vitals sorunları. (5) Duplicate content ve canonical sorunları. (6) Yapısal veri hataları."],
      },
    ],
  },
  {
    id: 'icerik-seo', no: '05', baslik: 'İçerik & On-Page SEO',
    alt: [
      {
        h: "Başlık Etiketi (Title Tag) ve Meta Açıklama Nasıl Yazılır?",
        p: ["Title tag, SERP'te mavi linkli başlık olarak görünen ve tıklama oranını (CTR) en fazla etkileyen on-page SEO elementidir. İdeal title tag: 50-60 karakter, birincil hedef kelimeyi başa yakın içermeli, net değer önerisi veya merak uyandırıcı bir unsur barındırmalı. Google zaman zaman title tag'i görmezden gelerek H1 başlığından snippet oluşturabilir.",
          "Meta description, SERP'te başlığın altında görünen açıklamadır. Doğrudan sıralama faktörü olmamasına rağmen CTR'yi önemli ölçüde etkiler. İdeal uzunluk: 120-160 karakter. Her sayfaya benzersiz meta description yazın; hedef kelimeyi doğal biçimde içersin, güçlü bir eylem çağrısı (CTA) ile bitsin.",
          "Yaygın hatalar: Title tag'de hedef kelimeyi gereksiz yere tekrarlamak (stuffing). Her sayfaya aynı meta description yazmak (duplicate). Title tag'i 60 karakterin çok üzerinde tutmak (SERP'te kesilir). Meta description'ı çok kısa veya çok uzun yazmak. Bu hataların tümü aracılık CTR ve sıralama performansını olumsuz etkiler."],
      },
      {
        h: "H1–H6 Başlık Hiyerarşisi ve Doğru Kullanımı",
        p: ["Başlık hiyerarşisi, içeriğin hem kullanıcılar hem arama motorları için mantıksal yapısını belirler. Her sayfada yalnızca bir H1 kullanılmalıdır; bu başlık sayfanın ana konusunu özetlemeli ve birincil hedef kelimeyi içermelidir. H2 başlıkları ana bölümleri, H3 alt bölümleri, H4-H6 daha derin kategorizasyonu ifade eder.",
          "SEO açısından en değerli başlık türleri H1 ve H2'dir. H2 başlıklarına destekleyici anahtar kelimeleri (LSI keywords) dahil etmek, sayfanın semantik zenginliğini artırır. Başlıkları salt anahtar kelime doldurma amaçlı değil, içeriği gerçekten özetleyecek biçimde yazın.",
          "Sık yapılan hatalar: H1 başlığı kullanmamak veya logo/banner içine gömmek. Birden fazla H1 kullanmak. Başlık hiyerarşisini atlamak (H1'den H4'e geçmek). Başlıkları görsel amaca hizmet ettirip anlamsal değerini yok saymak. Doğru başlık yapısı hem accessibility hem SEO için temeldir."],
      },
      {
        h: "SEO Uyumlu İçerik Nasıl Yazılır? İçerik Uzunluğu ve Derinliği",
        p: ["SEO uyumlu içerik yazmak, anahtar kelime yerleştirmek değil; kullanıcı sorusunu en eksiksiz ve güvenilir biçimde yanıtlamaktır. Temel prensip şudur: Google'ın sıralamak istediği içerik, kullanıcının aradığını bulmasını sağlayan içeriktir.",
          "İçerik uzunluğu konusunda 'ne kadar uzun olmalı?' sorusuna doğru yanıt şudur: hedef anahtar kelimenin SERP'inde üst sıralarda yer alan içeriklerin ortalama uzunluğuna bakın ve benzer bir derinlik hedefleyin. Informational sorgular için 1500-3000 kelime idealdir; ancak kısa ama mükemmel bir yanıt, uzun ama yüzeysel içerikten daima daha değerlidir.",
          "Okunabilirlik için: kısa paragraflar (2-4 cümle), bullet list ve tablolar, açıklayıcı alt başlıklar, güçlü ve net giriş paragrafı, içindekiler tablosu (uzun içerikler için) kullanın. E-E-A-T için: orijinal veri, uzman alıntıları, kişisel deneyim ve güvenilir dış kaynak atıfları ekleyin."],
      },
      {
        h: "Görsel SEO: Alt Etiket, Dosya Adı ve WebP Optimizasyonu",
        p: ["Görseller, sayfanın boyutunu en çok artıran unsurlardan biridir ve yanlış yönetildiğinde sayfa hızını ciddi biçimde düşürür. Görsel SEO\'nun temel unsurları: Dosya adı (ürün-kirmizi-ayakkabi.jpg yerine kirmizi-kadin-spor-ayakkabi.webp gibi açıklayıcı), Alt text (görselin içeriğini tarif eden, hedef kelimeyi doğal biçimde içeren metin), boyut optimizasyonu (gereksiz büyük görselleri sıkıştırın) ve modern format (WebP, AVIF).",
          "Lazy loading, görünür alandaki dışındaki görsellerin sayfa yüklenirken hemen yüklenmemesini sağlar. <img loading='lazy'> attribute\'u ile kolayca uygulanır; ancak LCP elemanı olan hero görseline asla lazy loading uygulanmamalıdır.",
          "Google Görseller'den trafik almak için: görsel site haritası oluşturun, görselleri içerikle alakalı sayfalara yerleştirin, caption kullanın ve büyük medyaya başvurulacak orijinal görsel üretin. Stok fotoğraf yerine özgün görsel içerik, hem SEO hem E-E-A-T açısından avantajlıdır."],
      },
      {
        h: "İç Linkleme Stratejisi: Silo Yapısı ve Pillar-Cluster Modeli",
        p: ["İç linkleme, sitenizin sayfaları arasında kurduğunuz bağlantıların stratejik yönetimidir. İyi bir iç linkleme yapısı; PageRank değerini önemli sayfalara yönlendirir, Googlebot'un siteyi daha verimli taramasını sağlar ve kullanıcıların ilgili içeriklere ulaşmasını kolaylaştırır.",
          "Pillar-cluster modeli: Pillar sayfası — bir ana konuyu kapsamlı ele alan geniş içerik. Cluster sayfaları — pillar konusunun alt başlıklarını derinlemesine işleyen sayfalar. Her cluster, pillar'a link verir; pillar ise tüm cluster'lara. Bu yapı hem topical authority hem de kullanıcı deneyimini güçlendirir.",
          "İç linkleme best practice'leri: Anchor text olarak hedef sayfanın konusuyla alakalı kelimeler kullanın ('buraya tıklayın' değil). Önemli sayfaların çok sayıda iç link almasını sağlayın. Orphan page'leri (hiç iç link almayan sayfaları) elimine edin. Footer ve header linkleri değerli sayfalara yönlendirin. Her içerik parçasına 3-5 alakalı iç link ekleyin."],
      },
      {
        h: "İçerik Güncellemesi: Eski Yazıları SEO ile Yeniden Canlandırın",
        p: ["Yeni içerik üretmek kadar önemli — hatta bazen daha önemli — olan şey, mevcut içerikleri güncel tutmaktır. Google, düzenli güncellenen içerikleri 'taze' olarak değerlendirir. Bir yaşını dolduran içeriklerin periyodik olarak revize edilmesi, sıralama kaybını önler ve zaman zaman önemli sıralama kazanımları sağlar.",
          "İçerik güncelleme sürecinde nelere bakılmalı: Güncel olmayan istatistik ve verileri yenileyin. Yeni arama sorularını (People Also Ask) ekleyin. Rakipler tarafından ele alınan ama sizin kaçırdığınız alt başlıkları ekleyin. Kırık dış linkleri güncelleyin. Görselleri optimize edin ve yenileyin. Dahili link yapısını geliştirin.",
          "Öncelik için Google Search Console'u kullanın: Son 6-12 ayda sıralama kaybeden ama henüz ilk 3 sayfada olan sayfaları tespit edin. Bu 'low hanging fruit' içerikler, güncellemeyle en hızlı sonuç veren adaylarıdır."],
      },
    ],
  },
  {
    id: 'off-page-seo', no: '06', baslik: 'Off-Page SEO & Backlink',
    alt: [
      {
        h: "Backlink Nedir ve Google İçin Neden Bu Kadar Değerlidir?",
        p: ["Backlink (geri bağlantı), başka bir web sitesinin sayfanıza verdiği bağlantıdır. Google, bu bağlantıları 'güven oyu' olarak yorumlar: bir site size link verdiğinde, içeriğinizin değerli olduğunu onaylamış olur. Backlinkler, on yılı aşkın süredir en önemli 3 sıralama faktöründen biri olmaya devam etmektedir.",
          "Tüm backlinkler eşit değildir. Bir linkin değerini belirleyen faktörler: linki veren sitenin domain otoritesi (DR/DA), linki veren sayfanın içerikle alakası, linkin sayfadaki konumu (body text > footer > sidebar), anchor text kalitesi ve dofollow/nofollow durumu. 10 yüksek kaliteli link, 1000 düşük kaliteli linkten çok daha değerlidir.",
          "Google'ın Penguin güncellemesi (2012-2016), spam link profillerini tespit etmek ve cezalandırmak için tasarlandı. Bugün hâlâ aktif olan bu algoritma, link satın alma, link çiftlikleri ve manipülatif anchor text örüntülerini tespit eder. Bu nedenle backlink stratejisi daima etik ve sürdürülebilir olmalıdır."],
      },
      {
        h: "Kaliteli Backlink Nasıl Kazanılır? 7 Kanıtlanmış Yöntem",
        p: ["1. Orijinal araştırma ve veri yayınlama: Sektöre özgü anket veya araştırma sonuçları yayınlayın. Gazeteciler ve blog yazarları, istatistiksel verilere atıfta bulunmak için sürekli kaynak arar. 2. Broken link building: Rakip sitelerdeki kırık dış linkleri tespit edin (Ahrefs, Check My Links), aynı konuda içerik oluşturun ve site sahibine bildirin. 3. Guest posting: Sektörünüzle ilgili otoriter bloglara konuk yazı teklifi yapın. Kalite odaklı, düşük hacimli bir yaklaşım benimseyın.",
          "4. Skyscraper tekniği: Çok link alan rakip içerikleri bulun, daha kapsamlı ve güncel versiyonunu üretin, o içeriğe link veren sitelere ulaşın. 5. HARO ve Qwoted: Gazetecilerin kaynak aradığı platformlarda uzmanlığınızı paylaşın, medya backlinkleri kazanın. 6. Dijital PR: Sektörde konuşulan haberler veya kampanyalar oluşturun. 7. Resource page link building: Nişinizdeki 'en iyi kaynaklar' sayfalarını bulun ve eklenmelerini talep edin.",
          "Ortak hata: Hızlı link kazanmak için PBN, link exchange veya forum profil spam gibi taktiklere başvurmak. Bu taktikler kısa vadede işe yarasa da, Google'ın düzenli algoritmik güncellemelerinde değer kaybeder veya ceza getirir. Sabır, kaliteli içerik ve outreach — kalıcı backlink inşasının tek formülü budur."],
      },
      {
        h: "Dijital PR ile Doğal Link Edinimi",
        p: ["Dijital PR, geleneksel PR tekniklerini SEO ile birleştiren güçlü bir stratejidir. Amacı; medya yayınları, blog yazarları ve sektör influencer'larının organik olarak sitenize link vermesini sağlamaktır. Bu yöntemle kazanılan editoryal linkler, Google için en değerli sinyal kategorisindedir.",
          "Dijital PR kampanyası için içerik fikirleri: Sektör verilerini içeren yıllık araştırma raporu. Tartışmalı ama kanıtlanmış bir görüş (opinion piece). Görsel veri (infografik, interaktif harita). Trend analizleri ve öngörüler. Ünlü markaların SEO stratejilerini analiz eden içerikler.",
          "Outreach stratejisi: Gazeteciları ve blog yazarlarını konu bazında araştırın. Onların daha önce yazdıklarıyla örtüşen bir teklif hazırlayın. Kişiselleştirilmiş, kısa (3-4 cümle) bir e-posta gönderin. Bir haftada yanıt gelmezse nazikçe hatırlatın. Kitlesel, otomatik e-posta gönderimleri çalışmaz; kişiselleşme başarının anahtarıdır."],
      },
      {
        h: "Zararlı Linkleri Tespit Etme ve Disavow Dosyası Oluşturma",
        p: ["Toksik backlinkler; spam siteleri, link çiftlikleri, alakasız nişler veya manipülatif anchor text örüntülerinden gelen backlinklerdir. Ahrefs veya SEMrush'ın toxicity / spam score filtreleri bu linkleri tespit etmenize yardımcı olur.",
          "Toksik link tespitinde dikkat edilmesi gerekenler: Çok düşük DR (<10) ve yüksek spam score, tamamen alakasız nişten gelen linkler, 100% exact match anchor text örüntüsü, link çiftliği veya article spinning siteleri, ani ve açıklanamaz link hacmi artışı (negative SEO saldırısı).",
          "Google Disavow Tool, zararlı linkleri Google'a bildirmenizi sağlar. Ancak bu araç son çare olmalıdır — önce link kaldırma talepleri gönderin. Disavow dosyası domain: veya URL: formatında oluşturulur ve Search Console'dan upload edilir. Yanlış kullanım değerli linkleri de devre dışı bırakabilir; dikkatli kullanılmalıdır."],
      },
      {
        h: "Domain Rating (DR) ve Domain Authority (DA) Nasıl Artar?",
        p: ["DR (Ahrefs) ve DA (Moz), bir sitenin backlink profilinin güçlüğünü tahmin eden 1-100 arası metriklerdir. Her iki metrik de Google'ın resmi ölçümleri değildir; ancak site otoritesini karşılaştırmanın pratik göstergeleri olarak kullanılır.",
          "DR/DA artırmak için: Otoriter ve alakalı sitelerden backlink kazanın. Düşük kaliteli ve toksik linkleri disavow edin. Kırık linkleri düzeltin. Büyük portföylü ve yüksek DR'lı sitelerle misafir yazarlık yapın. Paylaşılmaya değer özgün içerik üretin.",
          "Önemli uyarı: DR/DA artışı hedefe değil, araca odaklanmak demektir. Asıl hedef, gerçek otoriteli kaynaklardan link kazanarak Google\'ın sitenize duyduğu güveni artırmaktır. Düşük kaliteli sitelerden alınan sağlıksız link alışverişleriyle ölçüm araçlarında görünen artışlar gerçek SEO faydası sağlamaz."],
      },
    ],
  },
  {
    id: 'yerel-seo', no: '07', baslik: 'Yerel SEO',
    alt: [
      { h: "Google Business Profile Nasıl Optimize Edilir?", p: ["Google Business Profile (GBP), yerel aramalarda harita paketinde görünmenin temel gereksinimidir. İyi optimize edilmiş bir GBP; işletmenizin adını, adresini, telefon numarasını, çalışma saatlerini, web sitesini, fotoğraflarını ve kategorisini içerir. Eksik veya hatalı bilgiler, yerel sıralamayı doğrudan olumsuz etkiler.", "GBP optimizasyonu için adımlar: İşletme adını gerçek adla birebir eşleştirin (keyword stuffing yapmayın). Birincil ve ikincil kategorileri doğru seçin. Yüksek kaliteli fotoğraflar yükleyin (iç mekan, dış mekan, ürün, ekip). Google Posts ile düzenli güncellemeler paylaşın. Kullanıcı sorularını hızla yanıtlayın. Müşterileri yorum bırakmaya teşvik edin.", "GBP'ye düzenli bilgi girişi ve aktif etkileşim, Google'a işletmenizin aktif ve güvenilir olduğunu gösterir. Bu, yerel 3-pack'te (Google Maps ilk 3 sonucu) görünmenin en önemli faktörlerinden biridir."] },
      { h: "NAP Tutarlılığı ve Yerel Atıf (Citation) Stratejisi", p: ["NAP (Name, Address, Phone Number — Ad, Adres, Telefon), yerel SEO'nun temel bileşenidir. Bu bilgilerin tüm online platformlarda (GBP, web sitesi, Yemeksepeti, Foursquare, sektör rehberleri) birebir aynı olması zorunludur. Küçük farklılıklar bile (kısaltmalar, farklı telefon formatları) yerel sıralamayı olumsuz etkiler.", "Yerel atıf (citation), işletme bilgilerinizin başka bir web sitesinde yer almasıdır. Doğru ve tutarlı citation'lar yerel otoriteyi güçlendirir. Türkiye'de öncelikli citation kaynakları: Google Business Profile, Yelp, Foursquare, işletmenizin sektörüne ait dernek veya platform rehberleri.", "Citation denetimi için Moz Local, BrightLocal veya Whitespark araçları kullanılabilir. Bu araçlar tutarsız citation'ları tespit eder ve düzeltme önerileri sunar."] },
      { h: "Yerel Anahtar Kelime Araştırması ve 'Yakınımdaki' Aramaları", p: ["Yerel SEO'da hedef kelimeler, coğrafi modifiyerler içerir: 'İstanbul SEO ajansı', 'Kadıköy diş kliniği', 'Beşiktaş avukat'. Ayrıca 'yakınımdaki SEO ajansı' gibi 'near me' aramaları giderek artmaktadır. Google bu aramalarda kullanıcının konumunu kullanarak sonuçları kişiselleştirir.", "Yerel anahtar kelime araştırması için: Google'ın otomatik önerileri ve People Also Ask bölümünü inceleyin. Ahrefs veya SEMrush'ta 'by country' ve 'by city' filtrelerini kullanın. Rakiplerin GBP'lerindeki review metinlerini okuyun; müşterilerin kullandığı doğal dil en değerli anahtar kelime kaynağıdır.", "Şehir bazlı açılış sayfaları, birden fazla şehirde hizmet veren işletmeler için güçlü bir stratejidir. Her şehir için benzersiz içerik içeren ayrı sayfalar oluşturun; şehir adını title, H1 ve içeriğe doğal biçimde dahil edin."] },
      { h: "Yorumlar ve Rating: Yerel SEO'daki Rolü", p: ["Google yorumları, yerel sıralamada doğrudan etkisi kanıtlanmış en önemli faktörlerden biridir. Yorum sayısı, ortalama puan ve yanıt oranı — üçü de yerel pack görünürlüğünü etkiler. Ayrıca potansiyel müşterilerin %93'ü satın almadan önce yerel yorumları okuyor.", "Müşteri yorumu artırma stratejileri: Satın alma veya hizmet sonrası otomatik SMS/e-posta ile yorum daveti gönderin. Google'dan aldığınız kısa link'i (g.page/r/) web sitenize, makbuzlara ve e-posta imzanıza ekleyin. Yorumları bırakacak müşteriyi sayfaya yönlendirmeyi kolaylaştırın.", "Negatif yorumlara mutlaka yanıt verin — hem yapıcı hem profesyonel biçimde. Yanıtsız kalan negatif yorum, yanıtlanmış bir yorumdan çok daha fazla zarar verir. Yanıt verirken işletme adı ve şehri doğal biçimde dahil etmek, yerel SEO sinyali üretir."] },
    ],
  },
  {
    id: 'olcumleme', no: '08', baslik: 'SEO Ölçümleme & Analiz',
    alt: [
      { h: "Google Search Console Kurulumu ve Temel Raporlar", p: ["Google Search Console (GSC), Google'ın sitenizi nasıl gördüğünü anlatan ücretsiz ve vazgeçilmez bir araçtır. Kurulum için: Search Console hesabına giriş yapın → Mülk ekle → Domain veya URL prefix seçin → DNS TXT kaydı veya HTML tag ile doğrulayın. Sonra sitemap'inizi submit edin.", "GSC'nin en değerli raporları: Performans Raporu — hangi sorgularda, kaç gösterim ve tıklamayla sıralandığınızı gösterir. URL İnceleme — spesifik bir sayfanın index durumu. Kapsam (Indexing) — indexlenmeyen sayfalar ve nedenleri. Core Web Vitals — alan verisi. Manuel İşlemler — herhangi bir Google cezası var mı.", "Performans raporunda 'Ortalama Konum 4-20' arasındaki sorguları filtreleyin. Bu, 'düşük asılı meyve' segmentidir — küçük iyileştirmelerle CTR artışı ve sıralama yükselişi yaşanabilecek en değerli fırsatlar burada yatmaktadır."] },
      { h: "Google Analytics 4 ile SEO Trafiğini Analiz Etmek", p: ["GA4, web sitesi ziyaretçilerinin davranışlarını analiz etmenin temel platformudur. SEO açısından en değerli GA4 verileri: Organik trafik hacmi (Acquisition > Traffic Acquisition > Organic Search). Landing page performansı — hangi sayfalar en çok organik trafik alıyor? Kullanıcı davranışı — oturum süresi, sayfalar/oturum, bounce rate. Dönüşümler — organik trafikten gelen formlar, satışlar, etkinlikler.", "GA4'te Search Console entegrasyonu zorunludur. Bu entegrasyon, sorgu verisi (GSC) ile kullanıcı davranışı verisini (GA4) birleştirir ve tam bir organik trafik tablosu sunar. GA4 > Raporlar > Reklam > Arama Konsolu bölümünden erişilir.", "Dikkat: GA4 ile UA (Universal Analytics) arasında önemli farklılıklar var. GA4 oturum bazlı değil, olay (event) bazlı çalışır. Metrikler arasında doğrudan karşılaştırma yapmak yanıltıcı olabilir. GA4'te özel raporlar ve Keşif (Exploration) özellikleriyle SEO dashboardları oluşturmak veri yönetimini kolaylaştırır."] },
      { h: "Takip Etmeniz Gereken 10 Temel SEO Metriği", p: ["1. Organik oturumlar (GA4) — aylık bazda büyüme oranı. 2. Anahtar kelime sıralama hareketleri — Ahrefs/SEMrush rank tracker. 3. Organik CTR — GSC Performans raporu. 4. Domain Rating / Authority trendi. 5. Kazanılan backlink sayısı ve kalitesi (Ahrefs).", "6. Indexlenen sayfa sayısı (GSC Kapsam raporu). 7. Core Web Vitals durumu — kaç sayfa 'İyi' alanda? 8. Organik dönüşüm oranı (GA4 + dönüşüm hedefleri). 9. Ortalama oturum süresi — organik trafik segmentinde. 10. Branded vs non-branded sorgu oranı (GSC).", "Bu 10 metriği aylık raporunuza dahil edin ve her birini bir önceki ayla karşılaştırın. Ani düşüşler (özellikle organik oturumlar ve sıralamalar) algoritma güncellemesi, teknik sorun veya rakip içerik atağına işaret eder ve hızla araştırılmalıdır."] },
      { h: "SEO Raporu Nasıl Hazırlanır? Müşteri ve Yönetici İçin", p: ["İyi bir SEO raporu şu bölümlerden oluşur: (1) Yönetici özeti — tek sayfada 3-5 önemli bulgu. (2) Trafik trendi — organik oturumlar, ay/ay ve yıl/yıl karşılaştırma. (3) Sıralama değişimleri — kazanılan ve kaybedilen önemli kelimeler. (4) Teknik güncellemeler — tamamlanan ve devam eden işler. (5) Backlink kazanımları. (6) Bir sonraki dönem planı.", "Müşteri ve yöneticiler için raporu sadelleştirin: veri odaklı değil, sonuç odaklı konuşun. 'Bu ay 3 yeni DR50+ backlink kazandık' yerine 'Organik trafiğimiz %18 arttı, bu da tahmini X TL reklam maliyetinden tasarruf anlamına geliyor' ifadesini tercih edin.", "Görselleştirme araçları: Google Looker Studio (eski Data Studio) — GSC, GA4 ve Ahrefs verilerini otomatik çeken canlı dashboard. Haftalık özet e-postalar için GSC ve GA4 otomatik e-posta raporları da yeterlidir."] },
      { h: "A/B Testi ve SEO Deneyleri: Neyi, Nasıl Test Edersiniz?", p: ["SEO A/B testi, geleneksel web A/B testinden farklıdır. İki versiyon aynı anda test edilemez; bunun yerine bir grubu değiştirip, değiştirilmemiş grup kontrol olarak kullanılır. Google'ın bu tür testleri teşvik ettiği bilinmektedir.", "Test edilebilecek SEO değişkenleri: Title tag formülleri (soruyla başlamak vs rakamla başlamak). Meta description CTA varyasyonları. H1 başlık yapısı. Schema markup eklenmesi. İç linkleme örüntüleri. İçerik uzunluğu ve formatı.", "SEO deney araçları: SplitSignal (SEMrush tarafından), GSC performans raporu (değişiklik öncesi/sonrası segment karşılaştırması), SearchPilot (kurumsal). En basit yöntem: değişiklik yaptığınız tarihi not alın, 4-8 hafta bekleyin ve GSC'de o sayfa için impression/click/position değişimini ölçün."] },
    ],
  },
  {
    id: 'ileri-seviye', no: '09', baslik: 'İleri Seviye SEO Stratejileri',
    alt: [
      { h: "Yapay Zeka ve SEO: Google SGE, AI Overview'lar ve Yeni Arama Deneyimi", p: ["Google'ın AI Overview'ları, arama sonuçları sayfasının üstünde LLM tarafından üretilen özet yanıtlar sunar. Bu değişim, bazı bilgi bazlı sorguların zero-click ile sonuçlanmasına yol açmaktadır. Ancak AI Overview'da kaynak olarak görünmek, sıralama kazanmaktan farklı ama eşit derecede değerli bir fırsattır.", "AI Overview'da kaynak olmak için: Soruya doğrudan ve net yanıt verin. FAQPage ve Article schema kullanın. E-E-A-T sinyallerini güçlendirin. Özet çıkarılabilir, yapılandırılmış içerik üretin. Giriş paragrafını sorgunun yanıtını 2-3 cümlede verecek şekilde yazın.", "GEO (Generative Engine Optimization), ChatGPT Search, Perplexity ve Bing Copilot gibi LLM tabanlı arama motorlarında görünürlük sağlamak için gelişen yeni disiplindir. llms.txt dosyası, entity optimizasyonu ve atıf (citation) mimarisi bu disiplinin teknik temellerini oluşturur."] },
      { h: "Sesli Arama Optimizasyonu: Nasıl Hazırlanmalısınız?", p: ["Sesli aramalar, yazılı aramalardan yapısal olarak farklıdır: daha uzun, daha konuşma dilinde ve genellikle soru formatındadır. 'En iyi SEO ajansı' yerine 'İstanbul'da hangi SEO ajansı iyi?' gibi doğal dil kullanılır. Bu nedenle long-tail, soru bazlı anahtar kelimeler sesli arama optimizasyonunun merkezindedir.", "Sesli arama için içerik stratejisi: SSS (FAQ) bölümleri oluşturun — sesli arama cihazları sıkça bu bölümlerden yanıt çeker. Paragraf uzunluklarını kısaltın. Featured snippet'leri hedefleyin — sesli cihazlar çoğunlukla featured snippet'ten okur. Yerel işletmeler için 'yakınımdaki X' sorguları için GBP'yi optimize edin.", "Sesli arama payı artmaya devam etse de, ses asistanları henüz masaüstü aramanın yerini almaktan uzaktır. Bu nedenle sesli arama için özel bir strateji değil, mevcut içerik stratejinizi konuşma diline daha yakın biçimde optimize etmek daha pratik bir yaklaşımdır."] },
      { h: "Programatik SEO: Büyük Ölçekte İçerik Üretimi", p: ["Programatik SEO, veri odaklı şablonlar kullanarak yüzlerce veya binlerce sayfa otomatik olarak üretme stratejisidir. Hava durumu siteleri (her şehir için ayrı sayfa), iş ilanı platformları (her pozisyon/şehir kombinasyonu için sayfa) ve fiyat karşılaştırma siteleri bu modelin başarılı örnekleridir.", "Programatik SEO'nun başarı koşulları: Her sayfanın gerçek arama talebi karşılığı olmalı (hacim doğrulaması yapın). Şablonlar arasında yeterli içerik farklılığı olmalı — duplicate content riski kritiktir. Her sayfa gerçek kullanıcı değeri sunmalı; 'thin content' sayfalar Helpful Content güncellemeleriyle cezalandırılır.", "Teknik altyapı: Headless CMS veya veritabanı + statik site generator (Next.js, Gatsby) kombinasyonu programatik SEO için ideal mimardir. URL yapısını önceden planlayın; büyük ölçekli URL değişikliklerinin maliyeti çok yüksektir."] },
      { h: "Topical Authority: Konu Otoritesi Nasıl Kurulur?", p: ["Topical authority, bir sitenin belirli bir konuyu kapsamlı biçimde ele alması sonucunda arama motorları tarafından o konunun uzman kaynağı olarak tanınmasıdır. Wikipedia'nın neredeyse her arama sorgusunda üst sıralarda yer alması bunun en belirgin örneğidir.", "Topical authority inşası için pillar-cluster modeli kullanılır: (1) Konunuzu belirleyin ve kapsamlı bir 'pillar' sayfası oluşturun. (2) Ana konunun tüm alt başlıklarını listeleyin. (3) Her alt başlık için ayrı 'cluster' sayfalar üretin. (4) Pillar ↔ Cluster ↔ Cluster arasında yoğun iç link ağı kurun. Bu yapı hem kullanıcı deneyimini hem semantik bütünlüğü güçlendirir.", "Topical authority ölçümü: Hedef konunuzdaki kelime sayısı ve ortalama sıralama pozisyonu zaman içinde nasıl değişiyor? Sektörünüzdeki otoriter siteler sitenize link veriyor mu? Bu iki gösterge, konu otoritenizin büyüme hızını yansıtır."] },
      { h: "Uluslararası SEO: Hreflang ve Çok Dilli Site Yapısı", p: ["Uluslararası SEO, farklı ülke ve dillerdeki kullanıcılara doğru sayfayı sunarken teknik duplicate content sorunlarını önlemeyi kapsar. Üç temel yapılandırma seçeneği vardır: ccTLD (ülkeye özel alan: example.com.tr), subdomain (tr.example.com) veya subdirectory (example.com/tr/).", "Hreflang etiketi, arama motorlarına hangi sayfanın hangi dil/bölge için hazırlandığını bildirir. Doğru implementasyon zorunludur: karşılıklı hreflang (her sayfa diğerini göstermeli), x-default (hedef dil/bölge dışındaki kullanıcılar için varsayılan), doğru dil ve ülke kodları (tr, en-US, de-DE formatları).", "Yaygın uluslararası SEO hataları: Otomatik makine çevirisi (düşük kaliteli içerik = ceza riski), tüm diller için aynı URL kullanımı (canonical çakışması), hreflang'da hata oranı çok yüksek olduğunda arama motorları görmezden gelebilir. Google'ın hreflang doğrulama araçlarıyla implementasyonu düzenli kontrol edin."] },
      { h: "Google Algoritma Güncellemeleri: Tarihçe ve Nasıl Korunursunuz?", p: ["Google'ın önemli algoritma güncelleme tarihi: 2011 — Panda (düşük kaliteli içerik). 2012 — Penguin (spam backlink). 2013 — Hummingbird (semantik arama). 2015 — Mobilegeddon (mobil uyum). 2016 — Penguin 4.0 (gerçek zamanlı). 2017-2019 — Medic (YMYL siteleri). 2021 — Page Experience / Core Web Vitals. 2022 — Helpful Content Update. 2023-2024 — AI Overview, Spam güncellemeleri.", "Algoritma güncellemelerinden korunmanın tek yolu: temel prensiplere sadık kalmak. Kullanıcı odaklı, yüksek kaliteli içerik üretin. Doğal ve edilebilir backlink profili inşa edin. Teknik SEO sağlığını koruyun. E-E-A-T sinyallerini güçlendirin. Manipülatif taktiklerden kaçının.", "Güncelleme sonrası düşüş yaşandığında: Önce GSC'de ne zaman düştüğünü belirleyin. Düşüşün küresel mi yoksa belirli sayfalarda mı olduğunu anlayın. Google'ın güncelleme açıklamasını okuyun. Güncellemenin hedeflediği sorunu sitenizde tespit edin ve çözün. Sabırlı olun — güncelleme sonrası iyileşme genellikle bir sonraki core güncellemeyi bekler."] },
    ],
  },
  {
    id: 'sss', no: '10', baslik: 'Sıkça Sorulan Sorular',
    alt: [
      { h: "SEO öğrenmek ne kadar sürer?", p: ["SEO'nun temelleri (teknik, içerik, backlink temel kavramları) 2-4 haftalık yoğun çalışmayla öğrenilebilir. Orta seviye yetkinlik — bir siteyi bağımsız optimize edebilecek düzey — 3-6 ayda kazanılabilir. Gerçek uzmanlık ise 1-2 yıllık pratik deneyim, sürekli güncel kalma ve farklı sektörlerde test etmeyi gerektirir.", "SEO öğrenmek için en iyi kaynaklar: Google'ın kendi SEO başlangıç kılavuzu (ücretsiz). Ahrefs Blog ve SEMrush Blog (güncel, kanıtlanmış içerikler). Moz Beginner's Guide to SEO. Search Engine Land ve Search Engine Journal (günlük haberler). Ve en önemlisi: kendi sitenizde uygulama."] },
      { h: "SEO sonuçları ne zaman alınır?", p: ["SEO, anlık sonuç vermeyen, birikim yapan bir disiplindir. Genel beklenti çizelgesi: 0-3 ay — teknik iyileştirmeler indexleme ve crawl sağlığını iyileştirir. 3-6 ay — yeni içerikler sıralamaya girmeye başlar, backlink etkisi hissedilir. 6-12 ay — anlamlı organik trafik artışı başlar. 12+ ay — sürdürülebilir, ölçeklenebilir organik büyüme.", "Sonuç süresini etkileyen faktörler: Domain yaşı ve mevcut otorite (yeni site vs yerleşik site), sektör rekabeti, içerik kalitesi ve hacmi, backlink kazanım hızı ve teknik SEO sağlığı. Çok rekabetçi bir sektörde yeni bir siteyle anlamlı sıralamalar 12-18 ay alabilir."] },
      { h: "SEO'yu kendiniz yapabilir misiniz?", p: ["Evet — SEO'nun birçok önemli bileşeni teknik bilgi gerektirmeden öğrenilebilir ve uygulanabilir. Blog içeriği yazmak, Google Search Console'u izlemek, meta etiketleri optimize etmek ve iç linkleme kurmak bu kapsamdadır.", "Ancak bazı alanlarda uzmanlık fark yaratır: Teknik SEO denetimleri (crawlability, Core Web Vitals çözümleme), programatik SEO, backlink outreach kampanyaları ve büyük ölçekli içerik stratejisi. Kendiniz yapmak zaman ve öğrenme eğrisi maliyeti getirir; bir danışmanla çalışmak ise bu süreci önemli ölçüde kısaltır."] },
      { h: "En iyi SEO araçları hangileridir?", p: ["Başlangıç için: Google Search Console (ücretsiz, zorunlu), Google Analytics 4 (ücretsiz, zorunlu), Google Keyword Planner (ücretsiz). İleri seviye için: Ahrefs veya SEMrush (backlink ve anahtar kelime araştırması için en kapsamlı), Screaming Frog (teknik SEO denetimi için), Surfer SEO veya Clearscope (içerik optimizasyonu için).", "Araç seçimi bütçeye ve ihtiyaca göre değişir. Yeni başlayanlar için Google'ın ücretsiz araçlarıyla başlamak ve 6 ay sonra ücretli bir araç eklemek makul bir yoldur."] },
      { h: "SEO mu, Google Ads mi daha etkilidir?", p: ["İkisi farklı zaman dilimlerine ve hedeflere hizmet eder. Google Ads anlık görünürlük sağlar; bütçe kesildiğinde trafik durur. SEO 3-12 ay gerektirir ama sonuçlar bütçeden bağımsız sürer. Uzun vadede SEO'nun toplam sahip olma maliyeti (TCO) Google Ads'ten çok daha düşüktür.", "Pratik strateji: İlk aşamada Google Ads kullanın (hızlı görünürlük + anahtar kelime verisi için), paralelde SEO'ya başlayın. SEO olgunlaştıkça reklam bağımlılığını azaltın. Bu hibrit yaklaşım hem kısa hem uzun vadeli büyümeyi optimize eder."] },
    ],
  },
]

const BOLUMLER_EN = [
  {
    id: 'seo-nedir', no: '01', baslik: 'What is SEO?',
    alt: [
      { h: 'What is SEO? Understanding Search Engine Optimization', p: ['SEO (Search Engine Optimization) encompasses all the technical, content and authority-building work done to make your website appear at the top of organic (unpaid) search results on search engines like Google, Bing and Yandex. The goal of SEO is to appear to the right users, for the right keywords, at the right time.', 'SEO is built on three foundational pillars: (1) Technical SEO — ensuring your site can be crawled and indexed by search engines. (2) Content SEO — creating content with strong E-E-A-T signals that aligns with user intent. (3) Off-Page SEO — earning backlinks and brand signals from other sites. Balanced strengthening of all three pillars delivers sustainable organic growth.', 'SEO doesn\'t produce results overnight; but when done correctly, it\'s an investment that compounds over time unlike ads — costs decrease while returns increase. Organic search accounts for 53% of all web traffic, and more than 70% of purchase decisions begin with a search query.'] },
      { h: "A Brief History of SEO: From the 1990s to Today", p: ["SEO history begins in the mid-1990s, when the web was growing rapidly and the first search engines (AltaVista, Yahoo, Excite) were emerging. In those years, SEO was simply about stuffing pages with keywords — meta keyword stuffing was the symbol of that era.", "In the 2000s, Google's PageRank algorithm was revolutionary. Pages were now evaluated not just by content, but by the number of external links pointing to them. This period was the golden age of link buying and link farms (PBNs).", "With the 2010s, Google began penalizing manipulative tactics with Panda (low-quality content), Penguin (spam backlinks) and Hummingbird (semantic search) updates. The 2023-2025 period saw AI Overview, Helpful Content updates and an E-E-A-T focus define the modern SEO landscape."] },
      { h: "Why is SEO So Important? (With Statistics)", p: ["SEO's importance becomes concrete through numbers: Organic results on Google capture 71% of all clicks. 75% of users never go past the first page. The #1 organic result gets an average of 10x more clicks than the #10 result. The close rate of SEO-acquired leads is 14.6%, compared to just 1.7% for outbound marketing.", "From a cost perspective, SEO offers a much lower customer acquisition cost (CAC) than Google Ads over the long term. Once organic ranking is achieved, it continues generating traffic without ad spend. Research shows SEO delivers average ROI of over 1,000%.", "From a competitive advantage standpoint, a brand that appears on the first page is automatically perceived as trustworthy, expert and important. In the AI Overview era, this perception is amplified — users find brands that appear in AI answers more credible."] },
      { h: "SEO vs SEM vs Social Media Marketing", p: ["SEO (organic search) and SEM (Search Engine Marketing — paid search) are frequently confused. SEM works on a pay-per-click (PPC) model; traffic stops the moment the budget runs out. SEO takes time but is permanent. The most powerful strategy is using both together.", "Social media marketing is designed for brand awareness and community building rather than directly meeting search intent. Social signals (likes, shares) aren't direct ranking factors; however, content spread can indirectly boost backlink acquisition.", "A smart combination of all three channels makes the ideal digital marketing strategy: SEO for long-term organic growth, SEM for rapid visibility and keyword data, social media for brand trust and content amplification."] },
      { h: "White Hat, Black Hat and Gray Hat SEO: What You Should Never Do", p: ["White Hat SEO encompasses all fully Google-guideline-compliant, user-focused and sustainable methods. Producing quality content, earning natural backlinks, and building good technical infrastructure fall in this category. It's the only safe, long-term path.", "Black Hat SEO includes tactics that violate Google rules for short-term gain: keyword stuffing, hidden text, link buying, content scraping, and cloaking. These tactics result in manual penalties or algorithmic devaluation, from which recovery is very difficult.", "Gray Hat SEO sits in the gray area between the two. Certain link exchange arrangements, high-volume guest posting, or exact match domain use may fall into this category. Avoidance is recommended based on your risk tolerance; Google's algorithms are becoming increasingly sophisticated."] },
    ],
  },
  {
    id: 'nasil-calisir', no: '02', baslik: 'How Do Search Engines Work?',
    alt: [
      { h: 'How Does Googlebot Work? Crawl Budget and Crawl Priority', p: ['Googlebot is Google\'s automated crawler program used to discover the web. It continuously traverses the internet to find new and updated pages. When it finds a page, it reads the content, follows the links within it, and moves to new pages this way.', 'Crawl budget is the crawling capacity Google allocates to your site within a specific period. Critical for large sites, low-quality pages (thin content, parameter URLs, session IDs) can consume crawl budget and prevent important pages from being indexed.', 'Crawl priority is determined by page value (internal and external link count), update frequency and crawl success history. You can exclude certain areas from crawling with robots.txt and highlight important pages with XML sitemap.'] },
      { h: "The Indexing Process: How Does Your Page Enter Google?", p: ['After Googlebot crawls a page, it processes the content and adds it to Google\'s massive database (index). In this process, the page is analyzed for title, content, meta tags, links and structured data.', 'For indexing, your page needs to meet several conditions: not blocked by robots.txt, not carrying a noindex tag, canonical tag correctly configured, and not containing very low-quality content. You can check the index status of any page with the URL Inspection tool in Google Search Console.', 'Newly published content typically takes anywhere from a few days to a few weeks to be indexed. You can speed up this process by sending an "Request Indexing" from Google Search Console, though this is not guaranteed.'] },
      { h: "Google's Ranking Algorithm: A Summary of 200+ Factors", p: ["Google has stated it uses more than 200 factors for ranking decisions. These can be examined in three main categories: on-page factors (content quality, keyword relevance, title optimization), off-page factors (backlink profile, brand signals, social amplification) and technical factors (page speed, mobile compatibility, Core Web Vitals).", "The most important ranking factors include: Content quality and alignment with user intent, backlink profile (quality and relevance level), technical health (speed, crawlability), E-E-A-T signals and user experience metrics (bounce rate, dwell time, CTR).", "Google's algorithm isn't static; hundreds of updates are made per year. Major updates (Core Updates, Helpful Content Updates) can significantly change ranking profiles. For this reason, SEO strategy should be based on core principles rather than specific tactics."] },
      { h: "What is E-E-A-T? (Experience, Expertise, Authority, Trust)", p: ["E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is the content quality evaluation framework defined in Google's Search Quality Rater Guidelines. While not a direct input to the ranking algorithm, it's critically important as it reveals what Google evaluates for content quality.", "Experience: The content creator has first-hand experience with the topic. Expertise: A trained or experienced author contributes to the topic. Authoritativeness: Positioning as a recognized, reliable source in the industry. Trustworthiness: Building trust with transparent, verifiable information.", "To strengthen E-E-A-T signals: add author bios and LinkedIn profiles, get featured in industry media, publish research and original data, share corporate information transparently, and showcase customer testimonials."] },
      { h: "Core Web Vitals and Page Experience Signals", p: ["Core Web Vitals are user experience metrics that Google officially accepted as ranking signals from 2021. They consist of three key metrics: LCP (Largest Contentful Paint — loading speed, target: <2.5 seconds), INP (Interaction to Next Paint — interaction speed, target: <200ms) and CLS (Cumulative Layout Shift — visual stability, target: <0.1).", "Key factors affecting LCP: server response time, render-blocking resources and image optimization. Main thread blocking and third-party script loading strategy are critical for INP. Assigning dimensions to images and making space reservations for dynamic content are necessary for CLS.", "For measuring Core Web Vitals: Google Search Console (field data), PageSpeed Insights (lab + field data) and Chrome DevTools (developer testing) can be used. Since these metrics are critical for both rankings and user experience, they've become an inseparable part of technical SEO."] },
    ],
  },
]

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const BOLUMLER = isEn ? BOLUMLER_EN : BOLUMLER_TR
  const [aktifBolum, setAktifBolum] = useState(0)
  const [aktifFaq, setAktifFaq] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) { const idx = BOLUMLER.findIndex(b => b.id === entry.target.id); if (idx !== -1) setAktifBolum(idx) } }) },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    BOLUMLER.forEach(b => { const el = document.getElementById(b.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [BOLUMLER])

  const t = isEn ? {
    badge: 'SEO GUIDE',
    h1: 'SEO Guide: Complete Search Engine Optimization Guide from Beginner to Expert (2025)',
    h1alt: 'What is SEO? Complete SEO Guide from Basics to Advanced',
    desc: 'A comprehensive guide covering everything about SEO: technical SEO, keyword research, content strategy, backlinks and more. Updated for 2025.',
    breadcrumb: ['Home', 'Resources', 'SEO Guide'],
    toc: 'TABLE OF CONTENTS',
    faq_h2: 'Frequently Asked Questions',
    cta_h2: 'Want SEO Consulting?',
    cta_desc: 'Now that you\'ve read this guide, let\'s apply it to your site. Book a free discovery call.',
    cta_btn: 'Book a Free Call →',
    dk: 'min read',
  } : {
    badge: 'SEO REHBERİ',
    h1: 'SEO Rehberi: Sıfırdan Uzmanlığa Kapsamlı Arama Motoru Optimizasyonu Kılavuzu (2025)',
    h1alt: 'SEO Nedir? Başlangıçtan İleri Seviyeye Eksiksiz SEO Rehberi',
    desc: 'SEO hakkında bilmeniz gereken her şeyi kapsayan kapsamlı rehber: teknik SEO, anahtar kelime araştırması, içerik stratejisi, backlinkler ve daha fazlası. 2025 güncellenmiş.',
    breadcrumb: ['Ana Sayfa', 'Kaynaklar', 'SEO Rehberi'],
    toc: 'İÇİNDEKİLER',
    faq_h2: 'Sıkça Sorulan Sorular',
    cta_h2: 'SEO Danışmanlığı İster misiniz?',
    cta_desc: 'Bu rehberi okudunuz, şimdi sitenize uygulayalım. Ücretsiz keşif görüşmesi için hemen randevu alın.',
    cta_btn: 'Ücretsiz Görüşme Başlat →',
    dk: 'dk okuma',
  }

  const canonical = isEn ? 'https://fatihemincakiroglu.com/en/seo-guide' : 'https://fatihemincakiroglu.com/seo-rehberi'

  return (
    <>
      <Head>
        <title>{t.h1} | Fatih Emin Çakıroğlu</title>
        <meta name="description" content={t.desc} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/seo-rehberi" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/seo-guide" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "Article",
          "headline": t.h1, "description": t.desc,
          "author": { "@type": "Person", "name": "Fatih Emin Çakıroğlu", "url": "https://fatihemincakiroglu.com" },
          "publisher": { "@type": "Person", "name": "Fatih Emin Çakıroğlu" },
          "url": canonical, "inLanguage": isEn ? "en" : "tr"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": t.breadcrumb[0], "item": "https://fatihemincakiroglu.com" },
            { "@type": "ListItem", "position": 2, "name": t.breadcrumb[1], "item": `https://fatihemincakiroglu.com/${isEn ? 'en/' : ''}kaynaklar` },
            { "@type": "ListItem", "position": 3, "name": t.breadcrumb[2], "item": canonical },
          ]
        })}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/resources' : '/kaynaklar'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', padding: '3px 10px', border: '1px solid rgba(232,86,10,0.3)', borderRadius: '20px', letterSpacing: '1px' }}>{t.badge}</span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>2025 · {isEn ? '10 sections · ~60 min read' : '10 bölüm · ~60 dk okuma'}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 800, color: '#111', marginBottom: '8px', lineHeight: 1.2 }}>{t.h1}</h1>
            <p style={{ fontSize: '14px', color: 'var(--orange)', fontStyle: 'italic', marginBottom: '12px' }}>{t.h1alt}</p>
            <p style={{ color: '#777', fontSize: '15px', lineHeight: 1.65, maxWidth: '680px', marginBottom: '20px' }}>{t.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '16px', flexShrink: 0 }}>F</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{isEn ? 'SEO Expert · Istanbul' : 'SEO Uzmanı · İstanbul'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 32px 96px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '40px', alignItems: 'start' }}>

          {/* Sticky Sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: 'calc(100vh - var(--nav-h) - 48px)', overflowY: 'auto' }}>
            {/* TOC */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '12px', height: '12px', background: 'var(--orange)', borderRadius: '3px', display: 'inline-block' }}></span>
                <span style={{ fontSize: '11px', color: '#111', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t.toc}</span>
              </div>
              {BOLUMLER.map((b, i) => (
                <a key={i} href={`#${b.id}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', marginBottom: '2px', textDecoration: 'none', background: aktifBolum === i ? 'rgba(232,86,10,0.08)' : 'transparent', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, flexShrink: 0, color: aktifBolum === i ? 'var(--orange)' : '#ccc', minWidth: '24px' }}>{b.no}</span>
                  <span style={{ fontSize: '13px', color: aktifBolum === i ? 'var(--orange)' : '#555', fontWeight: aktifBolum === i ? 600 : 400, lineHeight: 1.3 }}>{b.baslik}</span>
                </a>
              ))}
            </div>
            {/* CTA */}
            <div style={{ background: '#111', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>{isEn ? 'FREE CONSULTING' : 'ÜCRETSİZ DANIŞMA'}</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#fff', marginBottom: '16px', lineHeight: 1.4 }}>{isEn ? 'Want help applying this?' : 'Bunu uygulamak ister misiniz?'}</p>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'block', padding: '11px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                {isEn ? 'Get in Touch →' : 'İletişime Geç →'}
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {BOLUMLER.map((bolum, bi) => (
              <div key={bi} id={bolum.id} style={{ scrollMarginTop: '90px', marginBottom: '64px' }}>
                {/* Bölüm başlığı */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '16px', borderBottom: '2px solid var(--orange)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 900, color: '#f0ede8', lineHeight: 1 }}>{bolum.no}</span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: '#111', margin: 0 }}>{bolum.baslik}</h2>
                </div>

                {/* Alt bölümler */}
                {bolum.id === 'sss' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {bolum.alt.map((soru, si) => (
                      <div key={si} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                        <button onClick={() => setAktifFaq(aktifFaq === si ? null : si)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#111', flex: 1, lineHeight: 1.4, paddingRight: '16px' }}>{soru.h}</span>
                          <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: aktifFaq === si ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                        </button>
                        {aktifFaq === si && (
                          <div style={{ padding: '0 24px 20px', borderTop: '1px solid #f0f0f0' }}>
                            {soru.p.map((p, pi) => (
                              <p key={pi} style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginTop: '16px', marginBottom: 0 }}>{p}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  bolum.alt.map((alt, ai) => (
                    <div key={ai} style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #eee', marginBottom: '16px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '18px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ width: '4px', minHeight: '18px', background: 'var(--orange)', borderRadius: '2px', flexShrink: 0, display: 'inline-block', marginTop: '3px' }}></span>
                        {alt.h}
                      </h3>
                      {alt.p.map((p, pi) => (
                        <p key={pi} style={{ color: '#555', fontSize: '15px', lineHeight: 1.85, marginBottom: pi < alt.p.length - 1 ? '14px' : '0' }}>{p}</p>
                      ))}
                    </div>
                  ))
                )}
              </div>
            ))}

            {/* CTA */}
            <div style={{ background: '#111', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚀</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>{t.cta_h2}</h2>
              <p style={{ color: '#6b7280', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>{t.cta_desc}</p>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'inline-block', padding: '15px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(232,86,10,0.4)' }}>{t.cta_btn}</Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .rehber-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
