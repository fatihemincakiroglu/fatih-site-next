import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';

const BOLUMLER_TR = [
  {
    id: 'geo-nedir', no: '01', baslik: 'GEO Nedir?',
    alt: [
      {
        h: 'GEO Nedir? Generative Engine Optimization\'ı Anlamak',
        p: ['Generative Engine Optimization (GEO), yapay zekâ destekli arama motorlarında ve yanıt sistemlerinde içeriklerinizin kaynak olarak alıntılanmasını sağlayan yeni nesil optimizasyon pratiğidir. Google AI Overview, ChatGPT Search, Perplexity, Bing Copilot ve Gemini gibi sistemler kullanıcı sorgularını LLM (Large Language Model) tabanlı özet yanıtlarla karşılarken kaynak olarak gösterilen siteler olmak — işte GEO\'nun hedefi budur.',
          'GEO, SEO\'nun evrimini temsil eder. Klasik SEO\'da hedef; Google\'ın 10 mavi linkinden birinde yer almaktır. GEO\'da hedef ise LLM\'nin ürettiği yanıtın doğrudan içinde veya kaynak panelinde görünmektir. Bu iki hedef birbirini dışlamaz — aksine tamamlar.',
          'GEO\'nun önemi 2024-2025\'te dramatik biçimde arttı: Google AI Overview\'lar tüm aramaların %46\'sında gösterilmektedir. Perplexity AI aylık 100 milyonu aşkın sorguya yanıt üretmektedir. ChatGPT\'nin haftalık aktif kullanıcı sayısı 100 milyonu geçmiştir. Bu sistemlerde kaynak olarak görünmek, geleneksel SERP sıralamasından bağımsız bir görünürlük kazanımı sunar.'],
      },
      {
        h: 'GEO\'nun Kısa Tarihi: Arama Nasıl Dönüştü?',
        p: ['GEO\'nun tarihi 2022\'de ChatGPT\'nin kamuya açılmasıyla başlar. Bu tarihe kadar arama deneyimi neredeyse değişmemişti: kullanıcı bir sorgu yazar, mavi linkler görünür, tıklar ve sayfaya gider. ChatGPT ile birlikte doğrudan diyalog tabanlı bilgi erişimi mümkün hale geldi.',
          '2023\'te Google, SGE (Search Generative Experience) adıyla AI destekli arama deneyimini test etmeye başladı. 2024\'te bu özellik AI Overview adıyla tüm ABD kullanıcılarına, ardından küresel ölçekte açıldı. Perplexity AI aynı dönemde "yanıt motoru" kavramını yaygınlaştırdı ve aylık ziyaretçi sayısı 10 katına çıktı.',
          '2025 itibarıyla GEO artık niş bir uzmanlık alanı olmaktan çıkmış, her dijital pazarlama stratejisinin ayrılmaz parçası haline gelmiştir. Arama motorlarında sıfır tıklama (zero-click) oranı artarken, AI sistemlerinde kaynak görünürlüğü yeni "ilk sayfa" haline geldi.'],
      },
      {
        h: 'GEO Neden Bu Kadar Önemlidir? (İstatistikler)',
        p: ['AI arama büyümesi rakamlarla konuşuyor: Google AI Overview\'lar ABD\'deki aramaların %46\'sında görünmektedir (2025 Q1). Perplexity AI\'ın yıllık büyüme oranı %1.000\'in üzerindedir. ChatGPT Search, Bing\'in pazar payını tek haneli yüzdeden anlamlı bir düzeye taşıdı. 18-34 yaş kullanıcıların %67\'si bilgi sorguları için AI sistemleri tercih etmektedir.',
          'GEO\'nun marka etkisi de kanıtlandı: AI Overview\'da kaynak olarak görünen markaların brand recall oranı ortalama 3.5x artmaktadır. AI sistemlerinde kaynak seçilen içeriklere yönelen referral trafik, 2024\'te bir önceki yıla göre %287 büyümüştür. Bu, AI sistemlerinin salt bilgi sunan değil, aynı zamanda trafik yönlendiren platformlara dönüştüğüne işaret eder.',
          'SEO\'nun yeterli olmadığı durumlar artmaktadır: Kullanıcı AI sistemini tercih ettiğinde geleneksel SERP görünmez. Bilgilendirici sorgularda AI yanıtı kullanıcıyı tatmin ettiğinde tıklama gerçekleşmez. Bu nedenle GEO, mevcut SEO stratejisini tamamlayan değil, onsuz eksik kalan bir disipline dönüşmüştür.'],
      },
      {
        h: 'GEO ile SEO Arasındaki Temel Farklar',
        p: ['SEO ve GEO farklı hedeflere hizmet eder. SEO: Google\'ın organik sıralama sisteminde üst sıralarda yer almak. GEO: LLM tabanlı yanıt sistemlerinde kaynak olarak alıntılanmak. SEO\'da başarı "1. sayfada sıralama" ile ölçülürken, GEO\'da başarı "AI yanıtında kaynak görünürlüğü" ile ölçülür.',
          'Teknik farklılıklar da önemlidir. SEO\'da backlink, PageRank ve keyword density kritik sinyallerdir. GEO\'da ise E-E-A-T, entity otorite, yapılandırılmış içerik ve grounding kalitesi öne çıkar. SEO içerikleri anahtar kelime odaklıyken, GEO içerikleri "soruya doğrudan, özet çıkarılabilir yanıt" formatında olmalıdır.',
          'İkisi çelişmez — birbirini güçlendirir. Güçlü bir SEO temeli (teknik sağlık, backlink profili, domain otoritesi) GEO başarısının altyapısını hazırlar. Ancak GEO optimizasyonu, SEO dışında kendi özgün gereksinimleri olan ayrı bir pratik alanıdır.'],
      },
      {
        h: 'White Hat GEO: Neleri Yapmalı, Nelerden Kaçınmalı?',
        p: ['White Hat GEO, AI sistemlerinin güvenilir kaynak olarak seçeceği içerik üretme prensibine dayanır: orijinal, doğrulanabilir, yüksek E-E-A-T sinyalli ve yapılandırılmış içerik. Kullanıcı niyetiyle örtüşen, gerçek değer sunan bu içerikler LLM\'lerin uzun vadeli tercihleridir.',
          'Kaçınılması gerekenler: AI sistemlerini manipüle etmeye yönelik içerik çiftlikleri (AI-generated spam). Sahte atıf ve uydurma kaynak gösterimi. LLM\'leri aldatmaya çalışan prompt injection taktikleri. Düşük kaliteli, hızla üretilmiş içeriklerin toplu yayını. Bu taktikler kısa vadede işe yarasa da AI sistemleri giderek daha sofistike filtreler geliştirmektedir.',
          'En önemli uzun vadeli GEO prensibi: AI sistemlerini değil insanları kazanın. İnsan okuyucusunu tatmin eden, gerçek uzmanlık sergileyen içerik, LLM\'lerin de tercih ettiği içeriktir. "AI için yaz" değil, "insanlar için yaz, AI için yapılandır" en sağlıklı GEO yaklaşımıdır.'],
      },
    ],
  },
  {
    id: 'ai-sistemleri', no: '02', baslik: 'AI Arama Motorları Nasıl Çalışır?',
    alt: [
      {
        h: 'RAG (Retrieval-Augmented Generation) Nedir?',
        p: ['RAG, Retrieval-Augmented Generation\'ın kısaltmasıdır. AI arama motorlarının büyük çoğunluğunun kullandığı bu mimari, iki aşamadan oluşur: (1) Retrieval — kullanıcının sorgusuna yanıt verebilecek ilgili belgelerin web veya dahili indeksten alınması. (2) Generation — bu belgelere dayanarak LLM\'nin bir yanıt üretmesi.',
          'RAG\'ın SEO ile kesişimi kritiktir: sisteme "alınan" belgeler arasında sizin içeriğinizin yer alması, kaynak seçilmenizin ön koşuludur. Bu da şu anlama gelir: teknik olarak erişilebilir, semantik olarak ilgili ve güvenilirlik sinyalleri güçlü içerikler RAG sistemlerinde öncelikli seçilir.',
          'RAG tabanlı sistemlerde içerik seçimi için üç filtre işler: Retrieval filtresi — içerik taranabilir ve indexlenebilir mi? Relevance filtresi — içerik sorguyla semantik olarak örtüşüyor mu? Trust filtresi — içeriğin güvenilirliği doğrulanabilir mi? Bu üç filtreyi geçmek GEO\'nun teknik altyapısını oluşturur.'],
      },
      {
        h: 'Google AI Overview Nasıl Kaynak Seçer?',
        p: ['Google AI Overview, Google\'ın mevcut arama indeksini kullanır; ancak kaynak seçimi standart organik sıralamadan farklı kriterlere göre yapılır. Araştırmalar, AI Overview\'da görünen sayfaların %74\'ünün o sorgu için ilk 10\'da da sıralandığını göstermektedir — ancak bu oran %100 değildir.',
          'AI Overview kaynak seçim kriterleri: (1) İçeriğin soruya doğrudan ve net yanıt vermesi. (2) Giriş paragrafının sorgu niyetiyle örtüşmesi. (3) FAQPage, Article veya HowTo schema varlığı. (4) Güçlü E-E-A-T sinyalleri (yazar otoritesi, kurumsal güvenilirlik). (5) İçeriğin özet çıkarılabilir yapıda olması.',
          'AI Overview\'da görünmenin en güvenilir yolu: Hedef sorgunuzu Google\'a yazın. İlk 5 sonucu inceleyin — AI Overview\'da hangi içerik formatı kullanılmış? Bu formatı model alarak kendi içeriğinizi üretin. Featured snippet kazanmak ile AI Overview\'da kaynak olmak arasında güçlü bir korelasyon vardır.'],
      },
      {
        h: 'Perplexity AI Kaynak Seçim Mantığı',
        p: ['Perplexity AI, birden fazla web kaynağını gerçek zamanlı olarak tarayan ve bu kaynaklara dayanan yanıtlar üreten bir "yanıt motoru"dur. Bing arama indeksini ve kendi tarayıcısını kullanır. Kaynak seçimi, klasik arama sıralamasından çok semantik alaka ve güvenilirlik sinyallerine dayanır.',
          'Perplexity\'de kaynak seçilmenin temel faktörleri: Orijinal araştırma ve birincil veri — Perplexity, istatistik ve veri içeren sayfalara güçlü öncelik tanır. Atıfta bulunulan kaynaklar — akademik veya otoriter kaynaklara atıfta bulunan içerikler tercih edilir. Sayfa erişilebilirliği — Perplexity\'nin tarayıcısına robots.txt üzerinden izin verilmiş olması gerekir.',
          'Perplexity için pratik optimizasyon: İçeriğinize doğrulanabilir istatistikler ve araştırma bulguları ekleyin. Her iddianın kaynağını açık biçimde belirtin. İçerik yapısını "soru — doğrudan yanıt — destekleyici kanıtlar" formatında düzenleyin. Perplexitybot\'un sitenizi taramasına robots.txt\'de izin verin.'],
      },
      {
        h: 'ChatGPT Search ve Bing Copilot Nasıl Çalışır?',
        p: ['ChatGPT Search, OpenAI\'ın GPT-4o modeline dayanan ve gerçek zamanlı web araması yapabilen bir özelliktir. Bing\'in arama indeksini ve OpenAI\'ın kendi GPTBot tarayıcısını kullanır. Bu nedenle ChatGPT Search optimizasyonu büyük ölçüde Bing SEO optimizasyonuyla örtüşür.',
          'ChatGPT Search için kritik adımlar: Bing Webmaster Tools\'ta sitenizi doğrulayın. Robots.txt dosyasında GPTBot\'a izin verin (User-agent: GPTBot / Allow: /). Bing\'in indeksleme algoritmalarıyla uyumlu temiz teknik yapı kurun. Sayfa hızı ve mobil uyumluluk Bing için de kritiktir. İçerik yapısını ChatGPT\'nin doğrudan alıntılamayı tercih ettiği kısa, net yanıt formatında düzenleyin.',
          'Bing Copilot, Microsoft\'un GPT-4 tabanlı AI asistanıdır ve Bing indeksini kullanır. Copilot\'ta kaynak görünürlüğü için: Bing Webmaster Tools aktif kullanımı, hızlı yüklenen ve temiz yapılandırılmış sayfalar, Bing\'in önem verdiği sosyal sinyaller (LinkedIn paylaşımları) ve açık lisans politikası oluşturun.'],
      },
      {
        h: 'AI Sistemlerinde Entity ve Knowledge Graph',
        p: ['LLM\'ler, dünyayı "entity" (varlık) tabanlı bir bilgi grafiğiyle temsil eder. Markanız, ürününüz veya sektörünüzle ilgili entity\'lerin bu bilgi grafiğinde doğru biçimde yer alması, GEO\'nun kritik teknik bileşenidir. Google\'ın Knowledge Graph\'ında yer almak, AI Overview kaynak seçiminde güçlü bir avantaj sağlar.',
          'Entity optimizasyonu için adımlar: Wikipedia sayfanızı veya Wikidata kaydınızı oluşturun (mümkünse). Schema markup\'ta Organization, Person veya Product entity\'lerini tanımlayın. Sektör yayınlarında, dernek web sitelerinde ve otoriter kaynaklarda markanızın ismine atıf yapılmasını sağlayın. Bu "citation" sinyalleri, LLM\'lerin markanızı güvenilir bir entity olarak tanımasına yardımcı olur.',
          'Knowledge Graph\'ta yer alma testini şu şekilde yapabilirsiniz: Google\'da marka adınızı arayın. Sağ tarafta bir Knowledge Panel görünüyor mu? Görünüyorsa marka entity\'niz tanınmış demektir. Görünmüyorsa entity oluşturma çalışmalarına başlamak gereklidir.'],
      },
    ],
  },
  {
    id: 'icerik-stratejisi', no: '03', baslik: 'GEO İçin İçerik Stratejisi',
    alt: [
      {
        h: 'LLM\'lerin Tercih Ettiği İçerik Formatları',
        p: ['LLM\'ler tüm içerikleri eşit değerlendirmez. Araştırmalar, şu içerik özelliklerinin AI kaynak seçimini anlamlı biçimde artırdığını ortaya koyuyor: Net ve doğrudan giriş paragrafı (ilk 2-3 cümlede sorunun yanıtlanması). Özet çıkarılabilir yapı (her bölümün bağımsız bir değer taşıması). Sayısal veriler ve araştırma bulguları (doğrulanabilir olgular). Soru-cevap formatı (FAQPage şablonu). Uzman atıfları ve bibliyografya.',
          '"Fluff" içerik (dolgu metin, vaat edip vermeyen girişler, gereksiz uzun bağlam paragrafları) AI sistemleri tarafından ya atlanır ya da kaynak seçiminde olumsuz değerlendirilir. LLM\'ler özet üretmek için içeriği "chunk"lara böler — bu nedenle her paragrafın kendi başına anlam taşıması kritiktir.',
          'Pratik kural: Bir AI sistemi sayfanızdan yalnızca bir paragraf alabilse, bu paragraf soruyu tam yanıtlar mıydı? Eğer yanıt hayırsa, içerik GEO için optimize edilmemiş demektir. Her bölümün bu testten geçmesini sağlayın.'],
      },
      {
        h: 'E-E-A-T Sinyallerini GEO İçin Güçlendirmek',
        p: ['E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), GEO\'da SEO\'dan bile daha kritik bir rol oynar. LLM\'ler, bir içeriği kaynak olarak seçmeden önce güvenilirlik sinyallerini değerlendirir. Yanıltıcı veya güvenilmez kaynak seçimi, AI sistemlerin itibari açısından büyük risk olduğundan, bu sistemler E-E-A-T filtrelerine özellikle önem verir.',
          'GEO için E-E-A-T güçlendirme adımları: Yazar sayfaları oluşturun (ad, fotoğraf, LinkedIn linki, uzmanlık alanları, yayınlar). Schema markup\'ta Person ve Author entity\'lerini tanımlayın. Sektör yayınlarında, podcast\'lerde ve konferanslarda yer alın — bu görünürlük LLM\'lerin "bu kişi gerçek mi?" sorusuna yanıt verir. İçeriklerde kişisel deneyim anlatıları ve birincil veri paylaşın.',
          'Kurumsal güven sinyalleri de önemlidir: About sayfası, ekip bilgileri, adres ve iletişim bilgileri, gizlilik politikası, kullanım koşulları ve SSL sertifikası — bunların tümü LLM\'lerin sitenizin meşruiyetini değerlendirdiği sinyallerdir.'],
      },
      {
        h: 'Otorite İçerik Üretimi: GEO İçin Doğru Format',
        p: ['GEO için en etkili içerik formatı "pillar + otorite" modelidir. Pillar içerik, bir konuyu kapsamlı ele alan uzun formlu (1500-4000 kelime) rehber yazılardır. Otorite içerik ise belirli bir soruya doğrudan, kısa ve net yanıt veren, LLM\'lerin kolayca alıntılayabileceği bölümler içerir.',
          'Her otorite içeriğinde bulunması gerekenler: Başlıkta doğrudan soru formatı veya güçlü anahtar kelime. İlk paragrafta sorunun net yanıtı (featured snippet formatı). Destekleyici kanıtlar: istatistik, araştırma, uzman görüşü. İlgili kavramları açıklayan terim tanımları. Pratik uygulama adımları veya örnekler. Bir SSS bölümü (FAQPage schema ile işaretlenmiş).',
          'İçerik uzunluğu konusunda GEO\'nun SEO\'dan ayrıştığı bir nokta: LLM\'ler kısa ve öz yanıtları daha kolay özetler. Bu nedenle çok uzun içerikler içinde kaybolmuş, özet çıkarılması zor bilgiler yerine iyi yapılandırılmış, orta uzunluktaki içerikler GEO için daha etkili olabilir.'],
      },
      {
        h: 'Arama Niyeti ve GEO: Informational Sorgulara Odaklanmak',
        p: ['GEO\'nun en güçlü olduğu alan informational (bilgi arama) sorgularıdır. "GEO nedir?", "Core Web Vitals nasıl iyileştirilir?", "backlink nasıl kazanılır?" gibi sorgularda AI sistemleri doğrudan yanıt üretir ve kaynak gösterir. Bu sorgu kategorisi, geleneksel SEO\'da çoğu zaman trafiği düşük gelen "üst huni" içeriklere karşılık gelir.',
          'Commercial intent (ticari niyet) sorgularında GEO etkisi daha sınırlıdır — AI sistemleri ürün veya hizmet satışı için tasarlanmamıştır. Ancak "en iyi SEO ajansı özellikleri", "SEO ajansı seçerken nelere dikkat edilmeli?" gibi araştırma bazlı ticari sorgularda AI yanıtları markaları kaynak olarak seçebilir.',
          'GEO içerik planlaması için niyet matrisi: Informational sorgular → doğrudan yanıt içerikleri (en yüksek GEO etkisi). Comparison sorgular → karşılaştırma tabloları ve rehberler (orta GEO etkisi). Commercial sorgular → vaka çalışmaları ve sosyal kanıt içerikleri (düşük ama değerli GEO etkisi).'],
      },
      {
        h: 'Orijinal Araştırma ve Veri ile GEO Avantajı',
        p: ['AI sistemleri için en değerli içerik türü orijinal araştırmadır. Kendi verilerinize dayanan anket sonuçları, sektör analizleri veya vaka çalışmaları; LLM\'lerin defalarca alıntılayabileceği "primary source" (birincil kaynak) niteliği taşır. Bu içerikler ayrıca doğal backlink kazanımı için de ideal zemin oluşturur.',
          'Orijinal araştırma üretme fikirleri: Müşteri anketleri (sektörünüzde yaşanan en büyük zorluklar). Anonim vaka çalışması verileri (sonuç metrikleriyle). Pazar trendleri analizi (kamuya açık verilerden sentezlenmiş). Sektör benchmarkları (kendi proje verilerinizden çıkarılmış). A/B test sonuçları (deneyimlerinizden öğrenimler).',
          'Bu araştırmaları yayınlarken GEO optimizasyonu için: Özet istatistikleri öne çıkarın (ilk paragrafta). Veriyi görselleştirin (tablo, grafik — LLM metni okur ama tablo yapısını da algılar). Metodoloji bölümü ekleyin (güvenilirlik sinyali). Araştırmayı düzenli güncelleyin (taze içerik sinyali).'],
      },
      {
        h: 'İçerik Güncelleme Stratejisi: GEO İçin Tazelik Sinyali',
        p: ['AI sistemleri güncel bilgiyi tercih eder. "2025" veya "güncel" sorgularında LLM\'ler açıkça en taze içeriklere yönelir. Ancak tazelik salt tarih değiştirmekle değil, içeriğin gerçekten güncellenmiş olmasıyla kazanılır.',
          'GEO için içerik güncelleme checklist\'i: İstatistikleri ve verileri güncelleyin (en az yılda bir). Yeni araştırma bulgularını ekleyin. AI sistemlerindeki değişiklikleri yansıtın (bu alan özellikle hızla değişiyor). Kullanıcı sorularına (PAA — People Also Ask) yanıt veren bölümler ekleyin. Güncel tarih damgasını görünür biçimde sayfaya ekleyin.',
          '"Son güncelleme" tarihi şeffaf biçimde göstermek hem kullanıcı güveni hem GEO için değerlidir. Article schema\'sındaki dateModified alanını gerçek güncelleme tarihiyle tutun — LLM\'ler bu veriyi okur ve taze içeriği önceliklendirir.'],
      },
    ],
  },
  {
    id: 'teknik-geo', no: '04', baslik: 'Teknik GEO',
    alt: [
      {
        h: 'llms.txt: AI Sistemlerine Doğru Sinyal',
        p: ['llms.txt, bir web sitesinin yapay zekâ sistemlerine içeriklerini nasıl kullanmaları gerektiğini bildirdiği standart dosyadır. robots.txt\'in AI eşdeğeri olarak düşünülebilir. Site kök dizininde (example.com/llms.txt) yer alır ve hangi içeriklerin AI tarafından işlenebileceğini, hangilerinin dışarıda bırakılması gerektiğini ve içeriklerin nasıl atıflandırılmasını istediğinizi belirtir.',
          'Temel bir llms.txt dosyası şu bölümlerden oluşur: Kısa proje/site tanımı. İzin verilen içerik kategorileri. Önemli sayfaların linkleri (pillar içerikler, hakkımda, iletişim). Atıf tercihleri (nasıl kaynak gösterilmek istiyorsunuz?). Dışarıda bırakılması gereken alanlar (müşteri verileri, özel içerikler).',
          'llms.txt standardı hâlâ olgunlaşma sürecindedir. Anthropic, OpenAI ve Google\'ın bu standarda resmi yaklaşımları gelecekte belirleyici olacaktır. Şimdiden bir llms.txt dosyası oluşturmak, GEO alanında öncü konumu sağlamak açısından değer taşır ve herhangi bir teknik risk içermez.'],
      },
      {
        h: 'Schema Markup: GEO İçin Kritik Yapısal Veri',
        p: ['Schema markup, hem SEO hem GEO\'nun teknik temelini oluşturur. AI sistemleri, sayfanın içeriğini anlama sürecinde schema verilerine büyük ağırlık verir. GEO açısından en değerli schema türleri şunlardır: FAQPage (soru-cevap içerikleri için — AI Overview\'da doğrudan gösterilme şansını artırır), Article (makale ve rehber içerikleri için — datePublished, author, publisher alanlarıyla birlikte), Person (yazar entity\'si — E-E-A-T sinyali), Organization (kurumsal entity) ve HowTo (adım adım rehberler).',
          'AI Overview optimizasyonu için özel schema tavsiyesi: FAQPage ve Article schema\'yı birlikte kullanın. Article schema\'da "author" alanını bir Person entity\'siyle bağlayın (sameAs: LinkedIn profili). dateModified alanını her güncellemede değiştirin. speakable schema property\'si ile AI sesli yanıtlar için optimize edilmiş bölümler işaretleyin.',
          'Schema doğrulaması için Google\'ın Rich Results Test aracını ve Schema Markup Validator\'ı kullanın. Schema hataları, zengin sonuçlardan dışlanmanıza yol açar. Büyük siteler için otomatik schema üretimi (programatik schema injection) zamandan tasarruf sağlar.'],
      },
      {
        h: 'AI Tarayıcılarına Erişim: Robots.txt Optimizasyonu',
        p: ['GEO başarısının önkoşulu, AI tarayıcılarının sitenize erişebilmesidir. Birçok site, genel robot erişimine izin verirken bazı AI tarayıcılarını yanlışlıkla engelliyor. Aşağıdaki tarayıcı listesinin robots.txt\'te "Allow" aldığından emin olun: Googlebot (Google AI Overview için), GPTBot (ChatGPT Search için), PerplexityBot (Perplexity AI için), ClaudeBot (Anthropic\'in Claude için), Bingbot (Bing Copilot için), OAI-SearchBot (OpenAI arama indeksi için).',
          'Dikkatli olunması gereken nokta: Bu tarayıcılara izin vermek içeriğinizin AI eğitim datasına dahil edilmesi anlamına gelebilir (GPTBot ve CCBot için özellikle). Yalnızca AI Search (içerik erişimi) değil, AI Training (model eğitimi) iznini de vermek isteyip istemediğinizi robots.txt\'te ayrı ayrı belirtin.',
          'Önerilen robots.txt yapısı: Tüm kullanıcı ajanlarına genel izin verin (User-agent: * / Allow: /). Ardından özellikle GPTBot, PerplexityBot ve ClaudeBot için "Allow: /" belirtimini ayrıca ekleyin. Admin paneli, müşteri verileri ve gizli alanları her ajan için "Disallow" ile engelleyin.'],
      },
      {
        h: 'Sayfa Hızı ve Teknik Erişilebilirlik',
        p: ['AI tarayıcıları, yavaş yüklenen veya JavaScript render\'a bağımlı sayfaları ya atlayabilir ya da eksik içerikle işleyebilir. Bu nedenle GEO\'da teknik erişilebilirlik, SEO\'da olduğu kadar kritiktir. Hedef: AI tarayıcısının sayfanızı yüklediğinde tüm kritik içeriğe erişebilmesi.',
          'GEO için teknik hazırlık checklist\'i: Server-side rendering (SSR) veya statik site generation (SSG) kullanın — JavaScript bağımlı SPA\'lar AI tarayıcıları için sorunlu olabilir. Sayfa yükleme süresini 3 saniyenin altında tutun. Kritik içeriği JavaScript olmadan da görüntülenebilir biçimde sunun. HTTP 200 durum kodunu kontrol edin — AI tarayıcıları 5xx hatalarını atlayabilir.',
          'İçerik erişilebilirliği için ek adımlar: Metin içeriğini HTML\'de açık biçimde bulundurun (CSS ile gizlenmiş veya dinamik yüklenen içerik AI tarayıcıları için görünmez olabilir). Görsellere anlamlı alt text yazın. Headings hiyerarşisini (H1-H6) doğru yapılandırın — LLM\'ler başlık yapısını içerik organizasyonunu anlamak için kullanır.'],
      },
      {
        h: 'Canonical, Hreflang ve AI için Duplicate Content',
        p: ['Duplicate content, AI sistemleri için de sorun oluşturur — ancak biraz farklı biçimde. LLM\'ler aynı bilgiyi birden fazla kaynakta gördüğünde, en otoriter olanı seçer. Sitenizde duplicate sayfalar varsa, link değeri ve E-E-A-T sinyalleri bölünür; bu da hiçbir versiyonun yeterli otoriteye ulaşamamasına yol açabilir.',
          'GEO için canonical tag doğruluğu: Her sayfanın kendi canonical\'ını göstermesi ve tüm yinelenen sayfaların tercih edilen versiyona işaret etmesi gereklidir. AI Overview\'ın hangi URL\'yi kaynak gösterdiğini test edin — canonical URL ile örtüşüyorsa yapılandırmanız doğrudur.',
          'Hreflang ve çok dilli GEO: Farklı dillerdeki sayfalarınız için hreflang doğru yapılandırıldığında, AI sistemler kullanıcının diline uygun versiyonu kaynak seçebilir. Bu, uluslararası GEO stratejisinin kritik teknik bileşenidir. Hreflang hataları, yanlış dildeki sayfanın kaynak gösterilmesine yol açabilir.'],
      },
    ],
  },
  {
    id: 'platform-optimizasyonu', no: '05', baslik: 'Platform Bazlı GEO Optimizasyonu',
    alt: [
      {
        h: 'Google AI Overview İçin Optimizasyon',
        p: ['Google AI Overview\'da kaynak olmak için iki önkoşul vardır: Google\'ın organik indeksinde yer almak ve E-E-A-T sinyallerinin yeterli güçte olması. Ancak bu ikisi yeterli değildir — içeriğin formatı da AI Overview seçim kriterlerini karşılamalıdır.',
          'AI Overview formatı için kanıtlanmış taktikler: Giriş paragrafında sorunun net yanıtını verin (2-3 cümle). "What is X?", "How to X?" veya "Why X?" sorularını başlıklara dahil edin. Her bölümün bağımsız okunabildiğinden emin olun. FAQPage schema ekleyin. Featured snippet için optimize edin — AI Overview ve featured snippet arasındaki örtüşme %70\'i aşmaktadır.',
          'AI Overview görünürlüğünü test etme: Hedef sorgunuzu Chrome\'da Gizli (Incognito) modda arayın. AI Overview görünüyor mu? Hangi sayfalar kaynak? Bu analiz, rakip içeriklerin hangi formatı kullandığını anlamanın en hızlı yoludur.'],
      },
      {
        h: 'Perplexity AI İçin Optimizasyon',
        p: ['Perplexity, interneti gerçek zamanlı tarayan ve araştırma bazlı yanıtlar üreten bir platform olduğundan, içeriklerinizi "araştırma kaynağı" olarak konumlandırmak en etkili stratejidir. Araştırma makaleleri, özgün veriler, uzman görüşleri ve analitik içerikler Perplexity\'nin tercih ettiği kaynak profilidir.',
          'Perplexity optimizasyonu için özel adımlar: Sayfalarınıza tarih damgası ekleyin (Perplexity taze içeriği önceliklendirir). Her iddianın kaynağını belirtin (Perplexity kaynaklı içerikleri tercih eder). PerplexityBot\'a robots.txt\'te erişim izni verin. İçeriği "Academic" formatta sunun: abstract, metodoloji, bulgular, sonuç.',
          'Perplexity\'de markanızı test edin: Perplexity.ai\'yi açın ve "X konusunda en iyi kaynaklar" veya sektörünüzle ilgili bir araştırma sorusu sorun. Markanız veya içerikleriniz kaynak olarak görünüyor mu? Bu test, GEO görünürlüğünüzün anlık göstergesidir.'],
      },
      {
        h: 'ChatGPT Search İçin Optimizasyon',
        p: ['ChatGPT Search, Bing indeksine dayandığından, Bing SEO optimizasyonu ChatGPT Search görünürlüğünü doğrudan etkiler. Bing Webmaster Tools\'u aktif kullanın, sitenizi Bing\'e submit edin ve Bing\'in önem verdiği sinyallere odaklanın.',
          'ChatGPT Search kaynak seçimi için içerik optimizasyonu: Sorguya doğrudan yanıt veren, kısa ve net içerik bölümleri oluşturun. ChatGPT, uzun ve yüzeysel içerikleri değil kısa ve öz bilgi bloklarını tercih eder. JSON-LD schema ile içerik yapısını makinelere anlatın. Güvenilir dış kaynaklara atıfta bulunun.',
          'Robots.txt\'te GPTBot ve OAI-SearchBot\'a erişim izni verin. Bu botları engelleyen siteler ChatGPT Search\'te görünemez. OpenAI\'ın yayınladığı bot listesini düzenli takip edin — yeni botlar eklendikçe güncelleme gerekebilir.'],
      },
      {
        h: 'Bing Copilot ve Microsoft AI İçin Optimizasyon',
        p: ['Microsoft\'un Bing Copilot\'u, GPT-4 tabanlı yapay zekâ asistanıdır ve Microsoft\'un tüm arama ürünlerinde (Bing, Edge, Microsoft 365 Copilot) yer alır. Copilot için optimizasyon, büyük ölçüde güçlü Bing SEO ile örtüşür.',
          'Bing Copilot için özelleşmiş adımlar: Bing Webmaster Tools\'a sitenizi ekleyin ve doğrulayın. Microsoft Clarity (Bing\'in analitik aracı) entegrasyonu sitenizin Bing ekosistemi içindeki güvenilirlik sinyalini güçlendirir. LinkedIn\'de içerik paylaşımları yapın — Microsoft ekosistemi LinkedIn entegrasyonuyla Bing Copilot\'u besler. Bing\'in "IndexNow" protokolünü kullanarak içerik güncellemelerini anında bildirin.',
          'Microsoft, işletmeler için "Copilot for Microsoft 365" sunar. B2B içerik stratejisi olan markalar için Microsoft ekosisteminde görünürlük, büyük kurumsal müşterilere erişim açısından özellikle değerlidir.'],
      },
      {
        h: 'Gemini ve Google Discover İçin Optimizasyon',
        p: ['Google\'ın Gemini modeli, Google Search, Gmail, Google Docs ve diğer Google ürünlerinde AI özelliklerini güçlendirir. Gemini\'nin arama entegrasyonu, Google\'ın mevcut indeksini kullandığından, güçlü Google SEO temeli Gemini görünürlüğünün de altyapısını oluşturur.',
          'Gemini için ek optimizasyon adımları: Google\'ın E-E-A-T rehberlerine tam uyum sağlayın. Search Console\'daki Core Web Vitals raporunu yeşil bölgede tutun. Google Business Profile\'ı aktif tutun (yerel sorguların AI yanıtlarında şirket bilgisi kullanılır). Google\'ın Structured Data dokümanını takip edin — Gemini için özelleştirilmiş yeni schema türleri gelebilir.',
          'Google Discover, mobil kullanıcılara ilgi alanlarına göre içerik sunan bir feed\'dir. AI ile giderek daha entegre hale gelen Discover, içerik tanınırlığınızı artırabilir. Discover\'a girebilmek için: yüksek kaliteli görseller, E-E-A-T sinyalleri ve güçlü engagement metrikleri (oturum süresi, paylaşım) gereklidir.'],
      },
    ],
  },
  {
    id: 'olcumleme', no: '06', baslik: 'GEO Performansını Ölçme',
    alt: [
      {
        h: 'GEO Metrikleri: Neyi Ölçmeli?',
        p: ['GEO performansı, klasik SEO metriklerinden farklı araçlar ve göstergeler gerektirir. Temel GEO metrikleri şunlardır: AI Overview görünürlük oranı (kaç hedef sorguda AI Overview\'da kaynak olarak gösteriliyorsunuz?), AI kaynaklı referral trafik (GA4\'te AI platformlarından gelen trafik), branded search hacmi değişimi (AI sistemlerinde görünürlüğün en güçlü dolaylı göstergesi), brand mention sayısı (sosyal medya ve web\'de markanızın ne sıklıkla anıldığı).',
          'GEO başarısını doğrulayan dolaylı göstergeler: AI Overview\'da görünen sorgular için CTR artışı (zaten sıralanıyorsanız, AI Overview eşliğinde CTR değişiyor mu?). Direct traffic artışı (AI Overview\'da kaynak olan markalar doğrudan ziyaretçi artışı yaşar). Branded sorgularda impression artışı (Search Console\'da brand keyword performansı).',
          'Uyarı: GEO\'ya özgü araçlar hâlâ olgunlaşma sürecindedir. Semrush\'ın AI Overview Tracker\'ı, Ahrefs\'in ilgili raporları ve özel tracking araçları mevcut olmakla birlikte, bu alandaki araç ekosistemi hızla gelişmektedir. Manuel test hâlâ en güvenilir yöntemdir.'],
      },
      {
        h: 'AI Overview Görünürlüğünü Takip Etme',
        p: ['AI Overview görünürlüğünü takip etmenin pratik yolları: Manuel test — hedef sorgularınızı Chrome Gizli modda arayın. Sonucu not alın: AI Overview var mı? Kaynaklar arasında siteniz var mı? Bu işlemi haftalık düzenli yapın.',
          'Yarı otomatik yöntem: Hedef sorgularınızı bir spreadsheet\'e listeleyin. Her hafta manuel test sonuçlarını kaydedin. Zamanla görünürlük trendi ortaya çıkar. Bu basit yöntem, pahalı araçlara gerek kalmadan GEO performansını izlemenizi sağlar.',
          'Araç destekli takip: SEMrush\'ın AI Overview Tracker özelliği, belirlediğiniz sorgular için AI Overview görünürlüğünü otomatik izler. Ahrefs ve diğer araçlar da bu alanda özellik geliştirmeye devam ediyor. Google Search Console\'daki "Arama özellikleri" filtresi, AI Overview tıklama ve gösterimlerini segment olarak gösterebilir (yavaş yavaş açılıyor).'],
      },
      {
        h: 'GA4 ile AI Kaynaklı Trafiği Analiz Etme',
        p: ['Google Analytics 4\'te AI platformlarından gelen trafiği takip etmek giderek kolaylaşıyor. Perplexity.ai, chatgpt.com ve diğer AI platformları GA4\'te "Referral" kanalında görünür. Bu trafiği izole etmek için GA4\'te özel segmentler veya filtreler oluşturun.',
          'GA4\'te GEO tracking yapılandırması: Exploration\'da yeni bir rapor oluşturun. Boyut olarak "Session source/medium" seçin. Perplexity.ai, chatgpt.com, bing.com/search gibi AI kaynaklarına göre filtreleyin. Bu trafiğin aylık büyümesini takip edin.',
          'ChatGPT Search trafiği genellikle "openai.com" referral olarak görünür; ancak bu sınıflandırma değişebilir. Düzenli olarak GA4 referral raporunuzu kontrol edin ve yeni AI platformlarının kaynak olarak görünüp görünmediğini izleyin. Brand + direct traffic kombinasyonu, GEO başarısının en güçlü toplam göstergesidir.'],
      },
      {
        h: 'GEO Raporu Nasıl Hazırlanır?',
        p: ['Etkili bir GEO raporu şu bölümlerden oluşur: (1) Yönetici özeti — AI görünürlüğündeki değişim ve iş etkisi. (2) AI Overview görünürlük tablosu — hangi sorgularda görünüyoruz, hangilerinde değil. (3) AI kaynaklı trafik trendi — GA4 referral verisi. (4) Branded search büyümesi — GSC\'den brand kelime impression ve tıklama değişimi. (5) Yapılan çalışmalar — schema güncellemeleri, içerik optimizasyonları, teknik iyileştirmeler. (6) Bir sonraki dönem planı.',
          'GEO raporunu yöneticilere sunarken: Teknik GEO jargonundan kaçının. "AI Overview\'da 8 sorguda kaynak olduk" yerine "AI Overview görünürlüğümüz bu ay %40 arttı; bu, arama motoru reklam masrafı olmaksızın elde edilen ek marka görünürlüğüne eşdeğer" gibi bir dil kullanın.',
          'Looker Studio (Google Data Studio) ile GEO dashboard\'u oluşturmak mümkündür. GSC ve GA4 veri kaynaklarını bağlayın, manuel AI Overview takip verilerini manuel giriş olarak ekleyin. Aylık güncellenen bu dashboard, GEO performansını tek ekranda görme imkânı sunar.'],
      },
      {
        h: 'A/B Test ve GEO Deneyleri',
        p: ['GEO\'da A/B test yapmak zorlu olmakla birlikte, bazı pratik deneyler mümkündür. Başlık formatı testi: Aynı içeriğin iki versiyonunu oluşturun — biri soruyla başlayan başlık, biri ifade formatında. Birkaç hafta sonra hangisinin AI Overview\'da daha sık kaynak seçildiğini gözlemleyin.',
          'Schema testi: FAQPage schema\'yı belirli sayfalara ekleyin, diğerlerinde eklemeyin. AI Overview görünürlüğü schema sayfalarında anlamlı biçimde artıyorsa, schema etkisi doğrulanmış olur. Bu tür kontrollü gözlemler, GEO stratejinizi veriyle temellendirmenizi sağlar.',
          'İçerik formatı testi: Aynı konuyu ele alan iki sayfa oluşturun — biri uzun form pillar içerik, diğeri kısa ve öz yanıt formatı. AI Overview hangisini kaynak seçiyor? Bu deney, içerik uzunluğu ile GEO performansı arasındaki ilişkiyi siteniz özelinde ortaya koyar.'],
      },
    ],
  },
  {
    id: 'ileri-geo', no: '07', baslik: 'İleri Seviye GEO Stratejileri',
    alt: [
      {
        h: 'Topical Authority ve GEO: Konu Uzmanı Olmak',
        p: ['Topical authority — belirli bir konuyu kapsamlı biçimde ele alarak arama motorlarınca uzman kaynak olarak tanınmak — GEO\'da SEO\'dan daha kritik bir rol üstlenir. LLM\'ler, hafızalarında (veya retrieval sürecinde) bir konuyu derinlemesine işleyen kaynaklara yüksek güven atfeder.',
          'GEO için topical authority inşa etme adımları: Nişinizi dar tutun — her şeyin uzmanı olmaya çalışmak yerine belirli bir konunun bilinçaltına yerleşin. Pillar sayfası + cluster sayfaları mimarisiyle konuyu tüm boyutlarıyla ele alın. AI sistemlerinin "hangi kaynak X konusunu en iyi kapsar?" sorusuna yanıt olarak sizi seçmesini sağlayın.',
          'GEO topical authority ölçümü: Nişinizdeki temel sorguları AI sistemlerine sorun (ChatGPT, Perplexity, Gemini). Kaç tanesi size ya da içeriklerinize referans veriyor? Bu oran, topical authority\'nizin AI hafızasındaki ağırlığını gösterir.'],
      },
      {
        h: 'Uluslararası GEO: Çok Dilli AI Görünürlüğü',
        p: ['GEO uluslararası stratejisinde en kritik konu, her dil için bağımsız içerik üretmektir. Makine çevirisi kullanmak hem kalite hem güvenilirlik açısından risklidir — AI sistemleri düşük kaliteli çeviri içerikleri kolayca tespit eder.',
          'Her dilde native içerik üretmek mümkün değilse önceliklendirme yapın: Hedef pazarınızdaki en yüksek arama hacmine sahip dili birinci öncelik olarak belirleyin. O dil için gerçek anlamda yerelleştirilmiş (çevrilmiş değil) içerik üretin. Hreflang doğru yapılandırıldığında AI sistemleri dile uygun versiyonu kaynak seçebilir.',
          'Çok dilli GEO için ek adımlar: Her dilde ayrı Google Search Console mülkü oluşturun. Dil bazında AI Overview görünürlüğünü ayrı ayrı takip edin. Farklı ülkelerdeki AI platformu kullanım alışkanlıklarını araştırın — bazı pazarlarda Bing Copilot, diğerlerinde Perplexity önde olabilir.'],
      },
      {
        h: 'Programatik GEO: Büyük Ölçekte AI Görünürlüğü',
        p: ['Programatik GEO, şablonlar ve veri kullanarak çok sayıda AI-optimize edilmiş sayfayı verimli biçimde üretme stratejisidir. Programatik SEO\'nun GEO uyarlamasıdır. Ancak önemli bir uyarı: AI sistemleri düşük kaliteli, tekrarlayan içerikleri tespit etme konusunda giderek daha iyi hale geliyor.',
          'GEO için güvenli programatik strateji: Her sayfa gerçek veri farklılığı içermeli (farklı şehirler, farklı ürünler, farklı sorgular için gerçek farklılıklar). Template\'ler AI tarafından kolayca sentezlenebilir, yapılandırılmış formatta olmalı. Her sayfaya FAQPage schema otomatik enjekte edin. İçerik kalite filtresi — düşük kalite eşiğinin altındaki sayfaları otomatik noindex edin.',
          'Programatik GEO en iyi sonucu şu kategorilerde verir: Şehir + hizmet kombinasyonları (\"İstanbul SEO danışmanlığı\"). Ürün karşılaştırma sayfaları. Endüstri istatistik sayfaları (veri farklılığı yüksek). Soru-cevap arşivleri (forum veya SSS veritabanlarından oluşturulan).'],
      },
      {
        h: 'AI Citation Mimarisi: Atıf Ağı Oluşturma',
        p: ['AI sistemleri kaynak seçiminde "güvenilirlik ağı"nı değerlendirir. Bir sayfaya otoriter kaynaklardan çok sayıda dış link (backlink) geliyorsa ve sayfa başka otoriter kaynaklara atıfta bulunuyorsa, LLM\'lerin bu sayfayı kaynak seçme olasılığı artar. Bu konsepte "citation mimarisi" diyoruz.',
          'Citation mimarisi oluşturma adımları: Sektörünüzdeki akademik yayınlar, araştırma kurumları ve otoriter kaynaklara içeriklerinizden atıfta bulunun. Kendi araştırmalarınızı bu kaynaklara gönderin (dijital PR). Wikipedia ve Wikidata kayıtlarında markanıza atıf yapılmasını sağlayın. Reddit, Quora ve sektör forumlarında uzman olarak görünün — LLM\'ler bu platformları güçlü kaynak olarak değerlendirir.',
          'Citation mimarisini ölçmek: Ahrefs ve SEMrush\'ta referral alan domain çeşitliliğine bakın. Yüksek DR\'lı akademik, medya ve kurum siteleri sitenize link veriyor mu? Bu metrik, hem SEO hem GEO için domain otoritesinin en güvenilir göstergesidir.'],
      },
      {
        h: 'Gelecek: GEO 2025 ve Sonrası',
        p: ['GEO\'nun geleceğini şekillendirecek trendler: (1) AI arama kullanımının artması — 2026\'ya kadar tüm arama sorgularının %30\'undan fazlasının AI sistemleri üzerinden yapılması bekleniyor. (2) Multimodal AI araması — metin, görsel ve sesli aramanın entegrasyonu GEO\'yu daha karmaşık ama daha fırsatlı hale getirecek. (3) Kişiselleştirilmiş AI yanıtları — kullanıcıya özel yanıtlar, kaynak seçimini de kişiselleştirebilir.',
          'Markaların hazırlıklı olması gereken gelişmeler: AI sistemlerinin "abonelik" veya "onaylı kaynak" modeline geçmesi (premium kaynaklar için ayrıcalıklı erişim). Entity-based ranking\'in ağırlık kazanması — Knowledge Graph\'ta iyi konumlanan markalar avantajlı olacak. Kullanıcı doğrudan soru soran değil, AI ile diyalog kuran olduğunda, içerik formatları tamamen dönüşecek.',
          'Genel ilke: GEO, SEO\'nun yerini almıyor; onunla birlikte evrimleşiyor. Bugün en iyi GEO stratejisi, mükemmel SEO temelini korurken AI sistemlerinin tercih ettiği içerik, teknik ve güven sinyallerini katman katman inşa etmektir.'],
      },
    ],
  },
  {
    id: 'sss', no: '08', baslik: 'Sıkça Sorulan Sorular',
    alt: [
      { h: "GEO ile SEO aynı anda yapılmalı mı?", p: ["Evet — en etkili yaklaşım her ikisini birlikte yürütmektir. Güçlü SEO temeli (teknik sağlık, backlink profili, domain otoritesi) GEO başarısının altyapısını hazırlar. Ancak GEO optimizasyonu, SEO dışında kendi özgün gereksinimleri olan ayrı bir pratik alandır. Biri olmadan diğeri eksik kalır."] },
      { h: "GEO için ne kadar sürede sonuç alınır?", p: ["Schema markup ve llms.txt gibi teknik GEO iyileştirmeleri 4-8 haftada etkisini gösterebilir. İçerik optimizasyonunun AI Overview kaynak seçimine yansıması 2-3 ay sürebilir. Marka entity\'si oluşturma ve topical authority inşası 6-12 ay gerektiren uzun vadeli çalışmalardır. GEO, SEO'ya benzer şekilde birikim yapan bir disiplindir."] },
      { h: "Küçük bir site GEO'da büyük sitelerle rekabet edebilir mi?", p: ["Evet — özellikle niş konularda. AI sistemleri domain büyüklüğünden çok içerik kalitesi ve alaka düzeyini önemser. Belirli bir konuda derinlemesine, güvenilir içerik üreten küçük bir site, o konudaki sorgularda büyük siteleri geride bırakabilir. Topical authority odağı, küçük sitelerin GEO'da büyük rakipleriyle rekabet edebileceği en etkili stratejidir."] },
      { h: "AI sistemleri içerik kalitesini nasıl değerlendiriyor?", p: ["LLM'ler içerik kalitesini birkaç boyutta değerlendirir: Doğruluk (olgusal hata içeriyor mu?), bütünlük (konuyu yeterince kapsıyor mu?), güvenilirlik (E-E-A-T sinyalleri güçlü mü?), yapı (özet çıkarılabilir mi?) ve tazelik (güncel mi?). Bu kriterler, Google'ın insan kalite değerlendiricilerinin kullandığı E-E-A-T çerçevesiyle büyük ölçüde örtüşür."] },
      { h: "GEO başarısını nasıl kanıtlarım?", p: ["GEO başarısını kanıtlamak için şu verileri birlikte kullanın: AI Overview görünürlük oranı (manuel veya araç destekli), AI platformlarından gelen referral trafik (GA4), branded search hacmi büyümesi (GSC), brand mention artışı (Ahrefs veya Mention gibi araçlarla). Bu dört metriğin aynı dönemde pozitif yönde hareket etmesi, GEO stratejisinin işe yaradığının güçlü göstergesidir."] },
      { h: "AI içeriği GEO için kullanılabilir mi?", p: ["AI ile üretilen içerik GEO için kullanılabilir, ancak kritik koşullar vardır: İnsan editöryel denetiminden geçmeli, orijinal veri ve uzman içgörüsüyle zenginleştirilmeli, E-E-A-T sinyalleri (yazar, kaynak, deneyim) eklenmeli. Saf AI üretimi, düşük kaliteli ve tekrarlayan içerik hem Google'ın Helpful Content güncellemeleri hem de AI sistemlerinin filtreleri tarafından değer düşürülmeye adaydır."] },
    ],
  },
]

const BOLUMLER_EN = [
  {
    id: 'geo-nedir', no: '01', baslik: 'What is GEO?',
    alt: [
      { h: 'What is GEO? Understanding Generative Engine Optimization', p: ['Generative Engine Optimization (GEO) is the next-generation optimization practice of ensuring your content is cited as a source in AI-powered search engines and answer systems. Google AI Overview, ChatGPT Search, Perplexity, Bing Copilot and Gemini present user queries with LLM-based summary answers — appearing as a cited source in these answers is GEO\'s goal.', 'GEO represents the evolution of SEO. In classic SEO, the goal is to rank in one of Google\'s 10 blue links. In GEO, the goal is to appear directly within the LLM\'s generated answer or in the source panel. These two goals don\'t exclude each other — they complement each other.', 'GEO\'s importance grew dramatically in 2024-2025: Google AI Overviews appear in 46% of all searches (2025 Q1). Perplexity AI answers over 100 million queries monthly. ChatGPT\'s weekly active users exceed 100 million. Appearing as a source in these systems offers visibility gains independent of traditional SERP rankings.'] },
      { h: 'A Brief History of GEO: How Search Transformed', p: ['The history of GEO begins in 2022 with the public launch of ChatGPT. Until this date, the search experience had barely changed: a user types a query, blue links appear, they click and land on a page. ChatGPT made direct dialogue-based information access possible.', 'In 2023, Google began testing AI-assisted search experience under the name SGE (Search Generative Experience). In 2024, this feature launched to all US users as AI Overview, then expanded globally. Perplexity AI popularized the concept of "answer engine" in the same period, with monthly visitors growing 10x.', 'By 2025, GEO has moved beyond being a niche specialty and become an integral part of every digital marketing strategy. As zero-click rates in search engines increase, AI system source visibility has become the new "first page."'] },
      { h: 'Why is GEO So Important? (Statistics)', p: ['AI search growth speaks through numbers: Google AI Overviews appear in 46% of US searches (2025 Q1). Perplexity AI\'s annual growth rate exceeds 1,000%. ChatGPT Search pushed Bing\'s market share from single-digit percentages to meaningful levels. 67% of 18-34 year old users prefer AI systems for information queries.', 'GEO\'s brand impact has also been proven: brands appearing as sources in AI Overview see brand recall rates increase by an average of 3.5x. Referral traffic directed to content selected as AI system sources grew 287% in 2024 compared to the previous year. This signals that AI systems are transforming from platforms that merely provide information to platforms that also direct traffic.', 'Situations where SEO alone is insufficient are growing: when a user prefers an AI system, traditional SERPs become invisible. When an AI answer satisfies the user for informational queries, no click occurs. This is why GEO has become a discipline that doesn\'t just complement the existing SEO strategy — it\'s incomplete without it.'] },
      { h: 'Key Differences Between GEO and SEO', p: ['SEO and GEO serve different goals. SEO: ranking high in Google\'s organic ranking system. GEO: being cited as a source in LLM-based answer systems. While success in SEO is measured by "ranking on page 1," success in GEO is measured by "source visibility in AI answers."', 'Technical differences are also important. In SEO, backlinks, PageRank and keyword density are critical signals. In GEO, E-E-A-T, entity authority, structured content and grounding quality come to the fore. While SEO content is keyword-focused, GEO content should be in a format that "directly and summarizably answers the query."', 'They don\'t conflict — they reinforce each other. A strong SEO foundation (technical health, backlink profile, domain authority) prepares the infrastructure for GEO success. However, GEO optimization is a separate practical area with its own unique requirements beyond SEO.'] },
      { h: 'White Hat GEO: What to Do and What to Avoid', p: ['White Hat GEO is based on the principle of producing content that AI systems will select as a reliable source: original, verifiable, high E-E-A-T signal, structured content. This content that aligns with user intent and delivers real value is what LLMs prefer in the long run.', 'What to avoid: content farms designed to manipulate AI systems (AI-generated spam). False citations and fabricated source attribution. Prompt injection tactics trying to deceive LLMs. Bulk publication of low-quality, rapidly produced content. Even if these tactics work short-term, AI systems are developing increasingly sophisticated filters.', 'The most important long-term GEO principle: win humans, not AI systems. Content that satisfies human readers and demonstrates genuine expertise is also what LLMs prefer. "Write for AI" is not "write for humans, structure for AI" — the latter is the healthiest GEO approach.'] },
    ],
  },
  {
    id: 'ai-sistemleri', no: '02', baslik: 'How AI Search Engines Work',
    alt: [
      { h: 'What is RAG (Retrieval-Augmented Generation)?', p: ['RAG stands for Retrieval-Augmented Generation. This architecture, used by the vast majority of AI search engines, consists of two stages: (1) Retrieval — obtaining relevant documents from the web or an internal index that can answer the user\'s query. (2) Generation — the LLM generating an answer based on these documents.', 'RAG\'s intersection with SEO is critical: for your content to be among the "retrieved" documents fed to the system, it\'s a prerequisite for being selected as a source. This means: content that is technically accessible, semantically relevant and has strong credibility signals is prioritized in RAG systems.', 'Three filters operate for content selection in RAG-based systems: Retrieval filter — is the content crawlable and indexable? Relevance filter — does the content semantically overlap with the query? Trust filter — can the content\'s credibility be verified? Passing all three filters forms the technical infrastructure of GEO.'] },
      { h: 'How Does Google AI Overview Select Sources?', p: ['Google AI Overview uses Google\'s existing search index; however, source selection follows different criteria than standard organic rankings. Research shows that 74% of pages appearing in AI Overview also rank in the top 10 for that query — but that rate isn\'t 100%.', 'AI Overview source selection criteria: (1) Content directly and clearly answering the question. (2) Opening paragraph aligning with query intent. (3) Presence of FAQPage, Article or HowTo schema. (4) Strong E-E-A-T signals (author authority, institutional credibility). (5) Content being in a summarizable structure.', 'The most reliable way to appear in AI Overview: type your target query into Google. Examine the first 5 results — what content format is used in the AI Overview? Model your own content after that format. There\'s a strong correlation between winning featured snippets and being a source in AI Overview.'] },
      { h: 'Perplexity AI Source Selection Logic', p: ['Perplexity AI is an "answer engine" that scans multiple web sources in real time and produces answers based on these sources. It uses Bing\'s search index and its own crawler. Source selection is based more on semantic relevance and credibility signals than classic search rankings.', 'Key factors for being selected as a source in Perplexity: Original research and primary data — Perplexity gives strong priority to pages containing statistics and data. Cited sources — content that cites academic or authoritative sources is preferred. Page accessibility — Perplexity\'s crawler must be allowed access via robots.txt.', 'Practical optimization for Perplexity: Add verifiable statistics and research findings to your content. Clearly specify the source of every claim. Structure content in "question — direct answer — supporting evidence" format. Allow PerplexityBot to crawl your site in robots.txt.'] },
      { h: 'How ChatGPT Search and Bing Copilot Work', p: ['ChatGPT Search is a feature based on OpenAI\'s GPT-4o model that can perform real-time web searches. It uses Bing\'s search index and OpenAI\'s own GPTBot crawler. Therefore, ChatGPT Search optimization largely overlaps with Bing SEO optimization.', 'Critical steps for ChatGPT Search: Verify your site in Bing Webmaster Tools. Allow GPTBot access in robots.txt (User-agent: GPTBot / Allow: /). Build a clean technical structure compatible with Bing\'s indexing algorithms. Page speed and mobile compatibility are critical for Bing as well. Structure content in the short, clear answer format that ChatGPT prefers for direct citations.', 'Bing Copilot is Microsoft\'s GPT-4 based AI assistant and uses Bing\'s index. For Copilot source visibility: active use of Bing Webmaster Tools, fast-loading and cleanly structured pages, social signals Bing values (LinkedIn shares) and an open licensing policy.'] },
      { h: 'Entity and Knowledge Graph for AI Systems', p: ['LLMs represent the world with an entity-based knowledge graph. Your brand, product or industry-related entities being correctly placed in this knowledge graph is a critical technical component of GEO. Appearing in Google\'s Knowledge Graph provides a strong advantage in AI Overview source selection.', 'Steps for entity optimization: Create your Wikipedia page or Wikidata record (if possible). Define Organization, Person or Product entities in schema markup. Ensure your brand name is cited in industry publications, association websites and authoritative sources. These "citation" signals help LLMs recognize your brand as a trustworthy entity.', 'You can test Knowledge Graph inclusion: Search your brand name on Google. Is a Knowledge Panel appearing on the right? If yes, your brand entity is recognized. If not, entity creation work needs to begin.'] },
    ],
  },
]

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const BOLUMLER = isEn ? BOLUMLER_EN : BOLUMLER_TR
  const [aktifBolum, setAktifBolum] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const [aktifFaq, setAktifFaq] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = BOLUMLER.findIndex(b => b.id === entry.target.id)
            if (idx !== -1) setAktifBolum(idx)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    BOLUMLER.forEach(b => { const el = document.getElementById(b.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [BOLUMLER])

  const t = isEn ? {
    badge: 'GEO GUIDE',
    title: 'Complete GEO Guide (2025) | Fatih Emin Çakıroğlu',
    h1: 'GEO Guide: Complete Generative Engine Optimization Guide from Beginner to Expert (2025)',
    h1alt: 'What is GEO? Complete Guide: How to Appear in ChatGPT, Perplexity and Google AI Overview',
    desc: 'Everything you need to know about GEO: how AI search engines work, content strategy, technical optimization and platform-specific tactics. Updated for 2025.',
    breadcrumb: ['Home', 'Resources', 'GEO Guide'],
    toc: 'TABLE OF CONTENTS',
    cta_h2: 'Want GEO Consulting?',
    cta_desc: 'Let\'s apply what you learned in this guide to your site. Book a free discovery call.',
    cta_btn: 'Book a Free Call →',
  } : {
    badge: 'GEO REHBERİ',
    title: 'Kapsamlı GEO Rehberi (2025) | Fatih Emin Çakıroğlu',
    h1: 'GEO Rehberi: Sıfırdan Uzmanlığa Kapsamlı Generative Engine Optimization Kılavuzu (2025)',
    h1alt: 'GEO Nedir? ChatGPT, Perplexity ve Google AI Overview\'da Nasıl Görünürsünüz?',
    desc: 'GEO hakkında bilmeniz gereken her şey: AI arama motorları nasıl çalışır, içerik stratejisi, teknik optimizasyon ve platform bazlı taktikler. 2025 güncellenmiş.',
    breadcrumb: ['Ana Sayfa', 'Kaynaklar', 'GEO Rehberi'],
    toc: 'İÇİNDEKİLER',
    cta_h2: 'GEO Danışmanlığı İster misiniz?',
    cta_desc: 'Bu rehberde öğrendiklerinizi sitenize uygulayalım. Ücretsiz keşif görüşmesi için hemen randevu alın.',
    cta_btn: 'Ücretsiz Görüşme Başlat →',
  }

  const canonical = isEn ? 'https://fatihemincakiroglu.com/en/geo-guide' : 'https://fatihemincakiroglu.com/geo-rehberi'

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.desc} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/geo-rehberi" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/geo-guide" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"Article",
          "headline": t.h1,"description": t.desc,
          "author":{"@type":"Person","name":"Fatih Emin Çakıroğlu","url":"https://fatihemincakiroglu.com"},
          "publisher":{"@type":"Person","name":"Fatih Emin Çakıroğlu"},
          "url": canonical,"inLanguage": isEn ? "en" : "tr"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"FAQPage",
          "mainEntity": (isEn ? [] : BOLUMLER_TR.find(b=>b.id==='sss')?.alt || []).map(f=>({
            "@type":"Question","name":f.h,"acceptedAnswer":{"@type":"Answer","text":f.p.join(' ')}
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"BreadcrumbList",
          "itemListElement":[
            {"@type":"ListItem","position":1,"name":t.breadcrumb[0],"item":"https://fatihemincakiroglu.com"},
            {"@type":"ListItem","position":2,"name":t.breadcrumb[1],"item":`https://fatihemincakiroglu.com/${isEn?'en/':''}kaynaklar`},
            {"@type":"ListItem","position":3,"name":t.breadcrumb[2],"item":canonical}
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
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1045 100%)', borderBottom: '1px solid #1f2937', padding: '48px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#a5b4fc', padding: '3px 10px', border: '1px solid rgba(165,180,252,0.3)', borderRadius: '20px', letterSpacing: '1px' }}>{t.badge}</span>
              <span style={{ fontSize: '12px', color: '#4b5563' }}>{isEn ? '8 sections · 2025 · ~45 min read' : '8 bölüm · 2025 · ~45 dk okuma'}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3.2vw, 38px)', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: 1.2 }}>{t.h1}</h1>
            <p style={{ fontSize: '14px', color: 'var(--orange)', fontStyle: 'italic', marginBottom: '12px' }}>{t.h1alt}</p>
            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.65, maxWidth: '680px', marginBottom: '20px' }}>{t.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '16px', flexShrink: 0 }}>F</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#e5e7eb' }}>Fatih Emin Çakıroğlu</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{isEn ? 'SEO & GEO Expert · Istanbul' : 'SEO & GEO Uzmanı · İstanbul'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="rehber-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 96px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }}>

          {/* Sticky Sidebar */}
          <div className="rehber-sidebar" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: 'calc(100vh - var(--nav-h) - 48px)', overflowY: 'auto' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '12px', height: '12px', background: '#6366f1', borderRadius: '3px', display: 'inline-block' }}></span>
                <span style={{ fontSize: '11px', color: '#111', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{t.toc}</span>
              </div>
              {BOLUMLER.map((b, i) => (
                <a key={i} href={`#${b.id}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', marginBottom: '2px', textDecoration: 'none', background: aktifBolum === i ? 'rgba(99,102,241,0.08)' : 'transparent', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, flexShrink: 0, color: aktifBolum === i ? '#6366f1' : '#ccc', minWidth: '24px' }}>{b.no}</span>
                  <span style={{ fontSize: '13px', color: aktifBolum === i ? '#6366f1' : '#555', fontWeight: aktifBolum === i ? 600 : 400, lineHeight: 1.3 }}>{b.baslik}</span>
                </a>
              ))}
            </div>
            <div style={{ background: '#0f0c29', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid rgba(99,102,241,0.2)' }}>
              <div style={{ fontSize: '10px', color: 'var(--orange)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>{isEn ? 'FREE GEO AUDIT' : 'ÜCRETSİZ GEO ANALİZİ'}</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#e5e7eb', marginBottom: '16px', lineHeight: 1.4 }}>
                {isEn ? 'See how your brand appears in AI search' : 'Markanızın AI aramalarındaki görünürlüğünü görmek ister misiniz?'}
              </p>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'block', padding: '11px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                {isEn ? 'Get Free GEO Audit →' : 'Ücretsiz GEO Analizi →'}
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {BOLUMLER.map((bolum, bi) => (
              <div key={bi} id={bolum.id} style={{ scrollMarginTop: '90px', marginBottom: '64px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '16px', borderBottom: '2px solid #6366f1' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 900, color: '#ede8e0', lineHeight: 1 }}>{bolum.no}</span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: '#111', margin: 0 }}>{bolum.baslik}</h2>
                </div>

                {bolum.id === 'sss' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {bolum.alt.map((soru, si) => (
                      <div key={si} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                        <button onClick={() => setAktifFaq(aktifFaq === si ? null : si)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#111', flex: 1, lineHeight: 1.4, paddingRight: '16px' }}>{soru.h}</span>
                          <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: aktifFaq === si ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
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
                        <span style={{ width: '4px', minHeight: '18px', background: '#6366f1', borderRadius: '2px', flexShrink: 0, display: 'inline-block', marginTop: '3px' }}></span>
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

            <div style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1045 100%)', borderRadius: '20px', padding: '48px', textAlign: 'center', border: '1px solid rgba(99,102,241,0.3)' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>✦</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>{t.cta_h2}</h2>
              <p style={{ color: '#6b7280', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>{t.cta_desc}</p>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ display: 'inline-block', padding: '15px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(232,86,10,0.4)' }}>{t.cta_btn}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
