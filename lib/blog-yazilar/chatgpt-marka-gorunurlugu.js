// Blog: Markanız ChatGPT'de Nasıl Görünüyor?
// Teknik bilgiler (OpenAI tarayıcıları, utm_source=chatgpt.com) Ekim 2026 itibarıyla
// doğrulandı. OpenAI bot belgeleri değişirse güncellenmeli.

export default {
  baslik_tr: `Markanız ChatGPT'de Nasıl Görünüyor? Adım Adım Ücretsiz Test Yöntemi`,
  baslik_en: `How Does Your Brand Appear in ChatGPT? A Free Step-by-Step Test Method`,
  meta_baslik_tr: `Markanız ChatGPT'de Nasıl Görünüyor? Ücretsiz Test`,
  meta_baslik_en: `How Does Your Brand Appear in ChatGPT? Free Test`,
  meta_desc_tr: `Markanızın ChatGPT yanıtlarında görünüp görünmediğini ücretsiz test edin: soru seti hazırlama, puanlama, kaynak analizi, robots.txt kontrolü ve ChatGPT trafiğini GA4'te ölçme.`,
  meta_desc_en: `Test for free whether your brand appears in ChatGPT answers: building a question set, scoring, source analysis, robots.txt checks and measuring ChatGPT traffic in GA4.`,
  etiket: 'GEO', sure: '15',

  bolumler_tr: [
    { baslik: null, paragraflar: [
      `Müşterileriniz artık yalnızca Google'da arama yapmıyor. "İstanbul'da güvenilir bir muhasebe bürosu önerir misin?" veya "X markası mı Y markası mı daha iyi?" gibi soruları doğrudan ChatGPT'ye soruyorlar. ChatGPT'nin bu sorulara verdiği cevapta markanız yoksa, karşılaştırma daha başlamadan dışarıda kalıyorsunuz.`,
      `İşin zor tarafı şu: Google'daki sıralamanızı Search Console'dan görebilirsiniz, ama ChatGPT'nin markanız hakkında ne söylediğini gösteren resmî bir panel yok. Bu yüzden ölçümü kendiniz yapmanız gerekiyor.`,
      `Bu rehberde **markanızın ChatGPT'de nasıl göründüğünü** ücretli bir araç kullanmadan, tekrarlanabilir bir yöntemle nasıl test edeceğinizi adım adım anlatıyoruz. Yöntemin sonunda elinizde şunlar olacak:`,
      {liste: [
        `markanızın hangi sorularda göründüğü,`,
        `nasıl tanımlandığı,`,
        `hangi rakiplerle birlikte anıldığı,`,
        `ChatGPT'nin hangi kaynaklara dayandığı,`,
        `ve ilk olarak neyi düzeltmeniz gerektiği.`,
      ]},
    ] },

    { baslik: `ChatGPT Markanız Hakkındaki Bilgiyi Nereden Alır?`, paragraflar: [
      `Testi doğru yorumlamak için önce ChatGPT'nin cevaplarını nasıl oluşturduğunu anlamak gerekir. ChatGPT iki farklı bilgi kaynağı kullanır.`,
      {alt: `1. Modelin eğitim verisi`},
      `Model, eğitimi sırasında gördüğü metinlerden öğrendiği genel bilgiyle cevap verebilir. Bu bilgi belirli bir tarihe kadar günceldir ve sizin doğrudan değiştirebileceğiniz bir şey değildir. Markanız uzun süredir internette tutarlı biçimde anılıyorsa model sizi "tanıyor" olabilir.`,
      {alt: `2. Canlı web araması`},
      `ChatGPT, güncel bilgi gerektiren sorularda web'de arama yapar ve cevabın altında kaynak bağlantıları gösterir. Ticari ve yerel sorgularda bu mod sık devreye girer. Sizin için asıl fırsat buradadır, çünkü web aramasıyla gelen cevaplar sitenizdeki ve hakkınızda yazılan güncel içeriklere dayanır.`,
      {alt: `OpenAI'ın tarayıcı botları`},
      `OpenAI, siteleri farklı amaçlarla ziyaret eden üç ayrı bot kullanır. Bunları birbirinden ayırmak, özellikle robots.txt ayarlarında kritiktir:`,
      {tablo: {
        basliklar: ['Bot', 'Görevi', 'Engellerseniz ne olur?'],
        satirlar: [
          ['OAI-SearchBot', 'ChatGPT aramasının dizinini oluşturur', 'ChatGPT arama cevaplarında kaynak olarak gösterilmezsiniz'],
          ['ChatGPT-User', 'Kullanıcı bir sayfayı açmasını istediğinde o sayfayı getirir', 'Kullanıcının istediği anlık sayfa okuma çalışmayabilir'],
          ['GPTBot', 'Model eğitimi için içerik toplar', 'Eğitim verisinden çıkarsınız; ChatGPT aramasından değil'],
        ],
      }},
      {alinti: `Sık yapılan hata: "Yapay zekâ içeriğimizi kullanmasın" diye GPTBot'u engellemek ChatGPT aramasındaki görünürlüğü etkilemez. Ama OAI-SearchBot'u engellemek, ChatGPT'nin sizi kaynak olarak göstermesini engeller.`},
    ] },

    { baslik: `Teste Başlamadan Önce: Doğru Test Ortamını Kurun`, paragraflar: [
      `ChatGPT'nin cevapları kişiye, zamana ve sohbet geçmişine göre değişebilir. Güvenilir sonuç almak için testi her seferinde aynı koşullarda yapmalısınız.`,
      {liste: [
        `**Geçici sohbet (Temporary Chat) kullanın:** Hafıza ve önceki sohbetler cevapları etkileyebilir. Geçici sohbet bu etkiyi azaltır.`,
        `**Kendi markanızdan bahsetmeyin:** "Fatih Emin Çakıroğlu'yu tanıyor musun?" diye başlamak yerine, gerçek bir müşterinin soracağı tarafsız soruları sorun.`,
        `**Aynı dili ve konumu koruyun:** Türkçe sorular ile İngilizce sorular farklı sonuçlar verebilir. Hangi pazarı test ettiğinizi baştan belirleyin.`,
        `**Her soruyu birden fazla kez çalıştırın:** Aynı soru farklı zamanlarda farklı cevaplar üretebilir. Her soruyu en az 3 kez sorun.`,
        `**Tarih ve sürümü kaydedin:** ChatGPT düzenli olarak güncellenir. Test tarihini not almak, sonraki ölçümlerle karşılaştırma yapmanızı sağlar.`,
      ]},
    ] },

    { baslik: `Adım 1: Soru Setinizi Oluşturun`, paragraflar: [
      `Testin kalitesi, sorduğunuz soruların kalitesine bağlıdır. Müşterilerinizin satın alma yolculuğunun farklı aşamalarını kapsayan 20–40 soruluk bir set hazırlayın. Soruları beş gruba ayırmanızı öneririz:`,
      {tablo: {
        basliklar: ['Soru tipi', 'Amacı', 'Örnek'],
        satirlar: [
          ['Marka sorguları', 'ChatGPT sizi nasıl tanımlıyor?', '"[Marka adı] ne iş yapar?"'],
          ['Öneri sorguları', 'Kategori sorularında anılıyor musunuz?', '"İstanbul\'da kurumsal SEO danışmanı önerir misin?"'],
          ['Karşılaştırma sorguları', 'Rakiplerle kıyaslandığınızda ne söyleniyor?', '"[Marka] ile [Rakip] arasındaki fark nedir?"'],
          ['Problem sorguları', 'Sorununuzu çözen çözüm olarak görülüyor musunuz?', '"E-ticaret sitemin trafiği düştü, kimden destek almalıyım?"'],
          ['Yerel sorgular', 'Bölgenizde görünüyor musunuz?', '"Kadıköy\'de en iyi diş kliniği hangisi?"'],
        ],
      }},
      `Soruları yazarken müşterilerinizin gerçekten kullandığı dili kullanın. Satış ekibinize, müşteri hizmetlerine ve Search Console'daki uzun sorgulara bakmak iyi bir başlangıç noktasıdır. Yapay zekâ sohbetlerinde sorular genellikle Google aramalarından daha uzun ve daha bağlamlıdır.`,
    ] },

    { baslik: `Adım 2: Soruları Çalıştırın ve Kaydedin`, paragraflar: [
      `Her soruyu geçici sohbette çalıştırın ve sonucu bir tabloya kaydedin. Basit bir tablo yeterlidir; önemli olan her test turunda aynı sütunları doldurmaktır.`,
      {tablo: {
        basliklar: ['Sütun', 'Ne yazılacak?'],
        satirlar: [
          ['Tarih', 'Testin yapıldığı gün'],
          ['Soru', 'Sorunun tam metni'],
          ['Tekrar no', '1, 2, 3'],
          ['Marka geçti mi?', 'Evet / Hayır'],
          ['Sırası', 'Listede kaçıncı sırada anıldı'],
          ['Tanım doğru mu?', 'Doğru / Kısmen / Yanlış'],
          ['Ton', 'Olumlu / Nötr / Olumsuz'],
          ['Kaynak bağlantısı', 'Sitenize link verildi mi, hangi sayfaya?'],
          ['Diğer kaynaklar', 'Hangi siteler kaynak gösterildi?'],
          ['Anılan rakipler', 'Cevapta geçen diğer markalar'],
        ],
      }},
      `Cevabın tam metnini de ayrı bir sütuna kopyalayın. Birkaç ay sonra yapacağınız karşılaştırmada bu metinler çok değerli olacak.`,
    ] },

    { baslik: `Adım 3: Sonuçları Puanlayın`, paragraflar: [
      `Topladığınız verileri birkaç basit metrikle özetleyin. Bu metrikler her test turunda aynı şekilde hesaplanmalıdır.`,
      {alt: `Görünme oranı`},
      `Markanızın geçtiği cevap sayısının toplam cevap sayısına oranıdır. Örneğin 30 soruyu üçer kez sordunuz (90 cevap) ve markanız 18 cevapta geçti; görünme oranınız %20'dir.`,
      {alt: `Kaynak gösterilme oranı`},
      `Markanızın geçtiği cevapların kaçında sitenize bağlantı verildiğini gösterir. Anılmak ile kaynak gösterilmek farklı şeylerdir: kaynak bağlantısı trafik getirir.`,
      {alt: `Ses payı (share of voice)`},
      `Aynı soru grubunda sizin ve rakiplerinizin kaç kez anıldığını karşılaştırır. Örneğin öneri sorgularında rakibiniz 40 kez, siz 12 kez anılıyorsanız, kategori içindeki görünürlüğünüz rakibinizin yaklaşık üçte biri kadardır.`,
      {alt: `Doğruluk skoru`},
      `ChatGPT'nin markanız hakkında söylediklerinin ne kadarının doğru olduğunu gösterir. Yanlış hizmet bilgisi, eski adres veya hatalı fiyat gibi hatalar, görünmemekten bile daha zararlı olabilir.`,
    ] },

    { baslik: `Adım 4: ChatGPT'nin Kaynaklarını İnceleyin`, paragraflar: [
      `Testin en değerli kısmı, ChatGPT'nin hangi kaynaklara dayandığını görmektir. Web aramasıyla oluşturulan cevaplarda kaynak bağlantıları görünür. Bu kaynakları üç gruba ayırın:`,
      {liste: [
        `**Sizin siteniz:** Hangi sayfalarınız kaynak gösteriliyor? Hizmet sayfaları mı, blog yazıları mı?`,
        `**Üçüncü taraf siteler:** Sektör listeleri, karşılaştırma yazıları, haber siteleri, rehber siteleri.`,
        `**Rakiplerin siteleri:** Rakipleriniz kendi sitelerinde hangi içeriklerle kaynak oluyor?`,
      ]},
      `Rakipleriniz görünüp siz görünmüyorsanız, genellikle cevap burada saklıdır. Belki rakibiniz sorulan soruyu doğrudan yanıtlayan bir sayfaya sahiptir. Belki de ChatGPT'nin sık başvurduğu bir sektör listesinde yer alıyordur.`,
      {alinti: `Pratik ipucu: Kaynak gösterilen üçüncü taraf sitelerin listesini çıkarın. Bu liste, dijital PR ve iş birliği çalışmalarınız için hazır bir hedef listesidir.`},
    ] },

    { baslik: `Adım 5: Teknik Engelleri Kontrol Edin`, paragraflar: [
      `İçeriğiniz ne kadar iyi olursa olsun, ChatGPT'nin tarayıcıları sitenize erişemiyorsa kaynak olarak gösterilemezsiniz. Aşağıdaki kontrolleri yapın:`,
      {alt: `robots.txt dosyanız`},
      `Sitenizin robots.txt dosyasını açın (siteniz.com/robots.txt) ve OAI-SearchBot'un engellenmediğinden emin olun. ChatGPT aramasında görünmek ama model eğitimine içerik vermemek istiyorsanız şöyle bir yapı kullanabilirsiniz:`,
      {kod: `User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /`},
      `robots.txt'deki değişikliklerin ChatGPT aramasına yansıması yaklaşık bir gün sürebilir.`,
      {alt: `CDN ve güvenlik duvarı ayarları`},
      `robots.txt'niz doğru olsa bile CDN veya güvenlik duvarınız yapay zekâ botlarını engelliyor olabilir. Cloudflare, 2025 ortasından itibaren yeni sitelerde yapay zekâ tarayıcılarını varsayılan olarak engellemeye başladı. Cloudflare kullanıyorsanız bot ayarlarınızı mutlaka kontrol edin.`,
      {alt: `Sunucu logları`},
      `Sunucu loglarınızda "OAI-SearchBot" ve "ChatGPT-User" geçen istekleri arayın. Bu botlar sitenizi hiç ziyaret etmiyorsa veya 403 hatası alıyorsa sorun teknik taraftadır.`,
      {alt: `İçeriğin HTML'de görünmesi`},
      `Önemli içerikleriniz yalnızca JavaScript ile yükleniyorsa bazı tarayıcılar bu içeriği göremeyebilir. Sayfanın kaynak kodunda (sağ tık → Sayfa kaynağını görüntüle) ana metninizin bulunduğundan emin olun.`,
    ] },

    { baslik: `Adım 6: ChatGPT'den Gelen Trafiği Ölçün`, paragraflar: [
      `Görünürlüğün işe yarayıp yaramadığını anlamanın en net yolu, ChatGPT'den gelen ziyaretçileri ölçmektir. ChatGPT, cevaplardaki kaynak bağlantılarına genellikle **utm_source=chatgpt.com** parametresini ekler. Bu sayede trafiği Google Analytics 4'te ayırabilirsiniz.`,
      {alt: `GA4'te ChatGPT trafiğini görmek`},
      {liste: [
        `Raporlar → Edinme → Trafik edinme raporunu açın.`,
        `Boyutu "Oturum kaynağı / aracı" olarak değiştirin.`,
        `Arama kutusuna "chatgpt" yazın.`,
        `Aynı yöntemle "perplexity", "gemini" ve "copilot" kaynaklarını da kontrol edin.`,
      ]},
      `Daha düzenli takip için GA4'te "Yapay zekâ platformları" adlı özel bir kanal grubu oluşturabilir ve bu kaynakları tek bir satırda toplayabilirsiniz.`,
      {alinti: `Not: Kullanıcı ChatGPT'deki bir adresi kopyalayıp tarayıcıya yapıştırırsa veya mobil uygulamadan gelirse, bu ziyaret "doğrudan" trafik olarak görünebilir. GA4'teki ChatGPT trafiği gerçek etkinin alt sınırıdır.`},
      `Bu trafiğin hangi sayfalara geldiğine ve dönüşüm oranına da bakın. Yapay zekâ platformlarından gelen ziyaretçiler genellikle araştırmasını büyük ölçüde tamamlamış, karar aşamasına yakın kullanıcılardır.`,
    ] },

    { baslik: `Sonuçları Nasıl Yorumlamalısınız?`, paragraflar: [
      `Test sonuçlarınız genellikle aşağıdaki dört senaryodan birine uyar. Her senaryonun önceliği farklıdır.`,
      {tablo: {
        basliklar: ['Durum', 'Muhtemel neden', 'İlk adım'],
        satirlar: [
          ['Hiç görünmüyorsunuz', 'Teknik engel veya zayıf dijital varlık', 'robots.txt ve CDN kontrolü, ardından temel içerikler'],
          ['Görünüyorsunuz ama bilgi yanlış', 'Tutarsız veya eski bilgiler', 'Site, Google Business Profile ve rehber kayıtlarını eşitleyin'],
          ['Rakipler sizden çok önde', 'Rakipler daha fazla kaynakta anılıyor', 'Kaynak gösterilen üçüncü taraf siteleri hedefleyin'],
          ['Anılıyorsunuz ama link yok', 'Bilgi modelden geliyor, sayfanız kaynak değil', 'Soruyu doğrudan yanıtlayan sayfalar oluşturun'],
        ],
      }},
    ] },

    { baslik: `ChatGPT'de Görünürlüğü Artırmak İçin Ne Yapmalı?`, paragraflar: [
      `Test sonuçlarına göre önceliklendirebileceğiniz başlıca iyileştirme alanları şunlardır:`,
      {alt: `1. Erişimi garanti altına alın`},
      `OAI-SearchBot'un sitenize erişebildiğinden emin olun. Bu, listedeki her şeyin ön koşuludur.`,
      {alt: `2. Marka bilgilerinizi her yerde tutarlı hale getirin`},
      `İşletme adınız, hizmetleriniz, adresiniz ve uzmanlık alanlarınız sitenizde, sosyal profillerinizde, rehber sitelerinde ve [Google Business Profile](/blog/google-business-profile) kaydınızda aynı olmalıdır. Tutarsız bilgi, yanlış tanımlanmanın en yaygın nedenidir.`,
      {alt: `3. Soruları doğrudan yanıtlayan sayfalar oluşturun`},
      `Test setinizdeki soruların her biri için sitenizde net bir cevap var mı? "Ne iş yapıyorsunuz?", "Kimlere hizmet veriyorsunuz?", "Fiyatlarınız neye göre belirleniyor?", "Rakiplerinizden farkınız ne?" gibi soruların açık cevapları sitenizde yer almalıdır.`,
      {alt: `4. Üçüncü taraf kaynaklarda yer alın`},
      `ChatGPT, bir markayı önerirken yalnızca o markanın kendi sitesine güvenmez. Sektör yayınları, karşılaştırma içerikleri, müşteri yorumları ve haberler önemli sinyallerdir. Adım 4'te çıkardığınız kaynak listesi bu çalışma için yol haritanızdır.`,
      {alt: `5. Testi düzenli tekrarlayın`},
      `Aynı soru setini her ay veya üç ayda bir çalıştırın. Görünürlükteki değişimi ancak düzenli ölçümle görebilirsiniz.`,
      `Bu çalışmaların stratejik çerçevesini [GEO rehberimizde](/geo-rehberi) ayrıntılı olarak ele aldık. Profesyonel destek düşünüyorsanız [GEO uzmanı](/geo-uzmani) sayfamıza veya [GEO ajansı nasıl seçilir](/blog/geo-ajansi-nasil-secilir) rehberimize göz atabilirsiniz.`,
    ] },

    { baslik: `Yöntemi Diğer Yapay Zekâ Platformlarına Uyarlamak`, paragraflar: [
      `Aynı soru setini diğer platformlarda da çalıştırabilirsiniz. Her platformun kendine özgü bir yanı vardır:`,
      {liste: [
        `**Google AI Overviews ve AI Mode:** Google'ın normal arama sistemleri üzerine kuruludur. Google, bu özelliklerde görünmek için ayrı bir teknik gereklilik olmadığını, temel SEO uygulamalarının geçerli olduğunu belirtiyor. Search Console'daki performans verileri bu özelliklerden gelen tıklamaları da içerir.`,
        `**Gemini:** Google'ın ekosistemine bağlı olduğu için Google Business Profile ve Haritalar verileri yerel sorgularda öne çıkabilir.`,
        `**Perplexity:** Kaynak göstermeye çok odaklı bir platformdur ve neredeyse her cevapta bağlantı verir. Kaynak analizi için en kolay platformdur.`,
        `**Claude ve Copilot:** Kendi arama ve tarama altyapılarını kullanırlar. robots.txt kontrolünü bu platformların botları için de yapın.`,
      ]},
      `Platformlar arasında karşılaştırma yaparken aynı soru setini, aynı dili ve aynı tarih aralığını kullanmaya dikkat edin.`,
    ] },

    { baslik: `Hızlı Başlangıç Kontrol Listesi`, paragraflar: [
      `Bu hafta yapabileceğiniz ilk test için aşağıdaki listeyi kullanın:`,
      {kontrol: [
        `Müşteri dilinde 20–40 soruluk bir set hazırlayın (5 soru tipinden)`,
        `Her soruyu geçici sohbette 3 kez çalıştırın`,
        `Sonuçları sabit sütunlu bir tabloya kaydedin`,
        `Görünme oranı, kaynak gösterilme oranı ve ses payını hesaplayın`,
        `Kaynak gösterilen üçüncü taraf siteleri listeleyin`,
        `robots.txt'de OAI-SearchBot'un açık olduğunu kontrol edin`,
        `CDN/güvenlik duvarı bot ayarlarını kontrol edin`,
        `GA4'te chatgpt.com kaynağından gelen trafiği bulun`,
        `Bir sonraki test tarihini takvime ekleyin`,
      ]},
    ] },

    { baslik: `Sık Sorulan Sorular`, paragraflar: [
      {alt: `ChatGPT'de markamın önerilmesini garanti edebilir miyim?`},
      `Hayır. ChatGPT'nin cevapları kullanıcıya, soruya ve zamana göre değişir ve hiçbir yöntem belirli bir cevapta yer almayı garanti etmez. Yapabileceğiniz şey, markanızın doğru ve tutarlı bilgilerle, güvenilir kaynaklarda yer almasını sağlayarak görünme olasılığını artırmaktır.`,
      {alt: `GPTBot'u engellersem ChatGPT'de görünmez olur muyum?`},
      `Hayır. GPTBot model eğitimi için içerik toplar. ChatGPT aramasındaki görünürlüğü OAI-SearchBot belirler. GPTBot'u engelleyip OAI-SearchBot'a izin verebilirsiniz.`,
      {alt: `Test için ücretli bir araç gerekli mi?`},
      `Hayır. Bu rehberdeki yöntem tamamen ücretsizdir. Ücretli araçlar testleri otomatikleştirir ve daha büyük soru setlerini takip etmeyi kolaylaştırır. Ama küçük ve orta ölçekli bir işletme için elle yapılan aylık bir test çoğu zaman yeterlidir.`,
      {alt: `Testi ne sıklıkla tekrarlamalıyım?`},
      `Aktif bir GEO çalışması yürütüyorsanız aylık, yürütmüyorsanız üç ayda bir tekrarlamak yeterlidir. Önemli olan her seferinde aynı soru setini ve aynı koşulları kullanmaktır.`,
      {alt: `ChatGPT markam hakkında yanlış bilgi veriyorsa ne yapmalıyım?`},
      `Önce yanlış bilginin kaynağını bulmaya çalışın. Cevaptaki kaynak bağlantıları genellikle ipucu verir. Ardından kendi sitenizdeki, Google Business Profile kaydınızdaki ve rehber sitelerdeki bilgileri güncelleyin ve tutarlı hale getirin. Değişikliklerin cevaplara yansıması zaman alabilir.`,
      {alt: `llms.txt dosyası ChatGPT'de görünmemi sağlar mı?`},
      `Mevcut veriler, llms.txt'nin yapay zekâ görünürlüğüne ölçülebilir bir etkisi olduğunu göstermiyor. Ayrıntılar için [llms.txt rehberimize](/blog/llms-txt-rehberi) bakabilirsiniz.`,
    ] },
  ],

  bolumler_en: [
    { baslik: null, paragraflar: [
      `Your customers no longer search only on Google. They ask ChatGPT directly: "Can you recommend a reliable accounting firm in Istanbul?" or "Is brand X or brand Y better?" If your brand is missing from ChatGPT's answer, you're out before the comparison even starts.`,
      `The hard part: you can see your Google rankings in Search Console, but there is no official dashboard showing what ChatGPT says about your brand. You have to measure it yourself.`,
      `This guide shows step by step how to test **how your brand appears in ChatGPT** with a repeatable method and no paid tools. By the end you will know:`,
      {liste: [
        `which questions your brand appears in,`,
        `how it is described,`,
        `which competitors it is mentioned alongside,`,
        `which sources ChatGPT relies on,`,
        `and what to fix first.`,
      ]},
    ] },

    { baslik: `Where Does ChatGPT Get Information About Your Brand?`, paragraflar: [
      `To interpret the test correctly, you first need to understand how ChatGPT builds answers. It uses two different sources.`,
      {alt: `1. The model's training data`},
      `The model can answer from general knowledge learned during training. That knowledge is current only up to a certain date, and you can't change it directly. If your brand has been mentioned consistently online for a long time, the model may "know" you.`,
      {alt: `2. Live web search`},
      `For questions that need current information, ChatGPT searches the web and shows source links under its answer. This mode kicks in often for commercial and local queries. This is where your real opportunity lies, because search-based answers rely on current content on your site and about you.`,
      {alt: `OpenAI's crawlers`},
      `OpenAI uses three separate bots for different purposes. Telling them apart is critical, especially in robots.txt:`,
      {tablo: {
        basliklar: ['Bot', 'Purpose', 'If you block it'],
        satirlar: [
          ['OAI-SearchBot', 'Builds the index behind ChatGPT search', 'You won\'t be shown as a source in ChatGPT search answers'],
          ['ChatGPT-User', 'Fetches a page when a user asks ChatGPT to open it', 'On-demand page reading may fail'],
          ['GPTBot', 'Collects content for model training', 'You opt out of training data — not ChatGPT search'],
        ],
      }},
      {alinti: `Common mistake: blocking GPTBot so "AI can't use our content" does not affect ChatGPT search visibility. But blocking OAI-SearchBot prevents ChatGPT from citing you as a source.`},
    ] },

    { baslik: `Before You Start: Set Up a Proper Test Environment`, paragraflar: [
      `ChatGPT's answers can vary by person, time and chat history. For reliable results, run the test under the same conditions every time.`,
      {liste: [
        `**Use Temporary Chat:** memory and previous chats can influence answers; Temporary Chat reduces this.`,
        `**Don't mention your brand:** instead of asking "Do you know [brand]?", ask the neutral questions a real customer would.`,
        `**Keep language and location constant:** Turkish and English questions can produce different results. Decide which market you are testing.`,
        `**Run each question several times:** the same question can produce different answers. Ask each at least 3 times.`,
        `**Record the date:** ChatGPT is updated regularly. Noting the test date lets you compare future rounds.`,
      ]},
    ] },

    { baslik: `Step 1: Build Your Question Set`, paragraflar: [
      `The test is only as good as its questions. Prepare a set of 20–40 questions covering different stages of your customers' buying journey, split into five groups:`,
      {tablo: {
        basliklar: ['Question type', 'Purpose', 'Example'],
        satirlar: [
          ['Brand queries', 'How does ChatGPT describe you?', '"What does [brand] do?"'],
          ['Recommendation queries', 'Are you mentioned for category questions?', '"Can you recommend a corporate SEO consultant in Istanbul?"'],
          ['Comparison queries', 'What is said when you are compared?', '"What is the difference between [brand] and [competitor]?"'],
          ['Problem queries', 'Are you seen as the solution?', '"My e-commerce traffic dropped — who should I get help from?"'],
          ['Local queries', 'Do you appear in your area?', '"Which is the best dental clinic in Kadıköy?"'],
        ],
      }},
      `Write the questions in the language your customers actually use. Your sales team, customer service and long queries in Search Console are good starting points. Questions in AI chats tend to be longer and more contextual than Google searches.`,
    ] },

    { baslik: `Step 2: Run and Record the Questions`, paragraflar: [
      `Run each question in Temporary Chat and log the result in a table. A simple sheet is enough; what matters is filling the same columns every round.`,
      {tablo: {
        basliklar: ['Column', 'What to record'],
        satirlar: [
          ['Date', 'Day of the test'],
          ['Question', 'Full question text'],
          ['Run #', '1, 2, 3'],
          ['Brand mentioned?', 'Yes / No'],
          ['Position', 'Where in the list it appeared'],
          ['Description accurate?', 'Accurate / Partly / Wrong'],
          ['Tone', 'Positive / Neutral / Negative'],
          ['Source link', 'Was your site linked, and which page?'],
          ['Other sources', 'Which sites were cited?'],
          ['Competitors mentioned', 'Other brands in the answer'],
        ],
      }},
      `Also paste the full answer into a separate column. These texts will be very valuable when you compare results months later.`,
    ] },

    { baslik: `Step 3: Score the Results`, paragraflar: [
      `Summarize the data with a few simple metrics, calculated the same way every round.`,
      {alt: `Mention rate`},
      `The share of answers that mention your brand. For example, you asked 30 questions three times each (90 answers) and your brand appeared in 18: your mention rate is 20%.`,
      {alt: `Citation rate`},
      `How many of the answers that mention you also link to your site. Being mentioned and being cited are different: a citation link brings traffic.`,
      {alt: `Share of voice`},
      `Compares how often you and your competitors are mentioned in the same question group. If a competitor is mentioned 40 times in recommendation queries and you 12 times, your category visibility is roughly a third of theirs.`,
      {alt: `Accuracy score`},
      `How much of what ChatGPT says about you is correct. Errors like wrong services, an old address or incorrect pricing can be more damaging than not appearing at all.`,
    ] },

    { baslik: `Step 4: Analyze ChatGPT's Sources`, paragraflar: [
      `The most valuable part of the test is seeing which sources ChatGPT relies on. Search-based answers show source links. Group them into three:`,
      {liste: [
        `**Your own site:** which pages are cited — service pages or blog posts?`,
        `**Third-party sites:** industry lists, comparison articles, news sites, directories.`,
        `**Competitors' sites:** which content earns your competitors citations?`,
      ]},
      `If competitors appear and you don't, the answer is usually here. Perhaps a competitor has a page that directly answers the question, or appears on an industry list ChatGPT often relies on.`,
      {alinti: `Practical tip: list the third-party sites that get cited. That list is a ready-made target list for your digital PR and partnership work.`},
    ] },

    { baslik: `Step 5: Check for Technical Barriers`, paragraflar: [
      `However good your content is, you can't be cited if ChatGPT's crawlers can't reach your site. Run these checks:`,
      {alt: `Your robots.txt`},
      `Open your robots.txt (yoursite.com/robots.txt) and make sure OAI-SearchBot is not blocked. If you want to appear in ChatGPT search but not feed model training, you can use:`,
      {kod: `User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /`},
      `Changes to robots.txt can take about a day to be reflected in ChatGPT search.`,
      {alt: `CDN and firewall settings`},
      `Even with a correct robots.txt, your CDN or firewall may be blocking AI bots. Since mid-2025, Cloudflare blocks AI crawlers by default on new sites. If you use Cloudflare, check your bot settings.`,
      {alt: `Server logs`},
      `Search your server logs for requests containing "OAI-SearchBot" and "ChatGPT-User". If these bots never visit or receive 403 errors, the problem is technical.`,
      {alt: `Content visible in HTML`},
      `If key content loads only via JavaScript, some crawlers may not see it. Make sure your main text is present in the page source (right-click → View page source).`,
    ] },

    { baslik: `Step 6: Measure Traffic from ChatGPT`, paragraflar: [
      `The clearest way to know whether visibility pays off is to measure visitors from ChatGPT. ChatGPT usually appends **utm_source=chatgpt.com** to source links in its answers, so you can isolate the traffic in Google Analytics 4.`,
      {alt: `Finding ChatGPT traffic in GA4`},
      {liste: [
        `Open Reports → Acquisition → Traffic acquisition.`,
        `Change the dimension to "Session source / medium".`,
        `Type "chatgpt" into the search box.`,
        `Check "perplexity", "gemini" and "copilot" the same way.`,
      ]},
      `For ongoing tracking, create a custom channel group in GA4 called "AI platforms" to group these sources in one row.`,
      {alinti: `Note: if a user copies a URL from ChatGPT into the browser or comes from the mobile app, the visit may appear as "direct" traffic. ChatGPT traffic in GA4 is a lower bound of the real impact.`},
      `Also check which pages this traffic lands on and how it converts. Visitors from AI platforms have often done most of their research and are close to a decision.`,
    ] },

    { baslik: `How to Interpret the Results`, paragraflar: [
      `Results usually fit one of four scenarios, each with different priorities.`,
      {tablo: {
        basliklar: ['Situation', 'Likely cause', 'First step'],
        satirlar: [
          ['You never appear', 'Technical barrier or weak digital presence', 'Check robots.txt and CDN, then core content'],
          ['You appear but info is wrong', 'Inconsistent or outdated information', 'Align your site, Google Business Profile and directories'],
          ['Competitors far ahead', 'Competitors are mentioned in more sources', 'Target the cited third-party sites'],
          ['Mentioned but not linked', 'Info comes from the model; your pages aren\'t sources', 'Create pages that directly answer the questions'],
        ],
      }},
    ] },

    { baslik: `How to Improve Visibility in ChatGPT`, paragraflar: [
      `Based on the results, these are the main areas to prioritize:`,
      {alt: `1. Guarantee access`},
      `Make sure OAI-SearchBot can reach your site. This is the prerequisite for everything else.`,
      {alt: `2. Make brand information consistent everywhere`},
      `Your business name, services, address and areas of expertise should match on your site, social profiles, directories and [Google Business Profile](/en/blog/google-business-profile). Inconsistency is the most common cause of being described wrongly.`,
      {alt: `3. Create pages that answer the questions directly`},
      `Does your site clearly answer each question in your test set? Questions like "What do you do?", "Who do you serve?", "How is your pricing determined?" and "How are you different?" should have clear answers on your site.`,
      {alt: `4. Appear in third-party sources`},
      `When recommending a brand, ChatGPT doesn't rely only on that brand's own site. Industry publications, comparisons, customer reviews and news are important signals. The source list from Step 4 is your roadmap.`,
      {alt: `5. Repeat the test regularly`},
      `Run the same question set monthly or quarterly. You can only see changes in visibility through regular measurement.`,
      `We cover the strategic framework in detail in our [GEO guide](/en/geo-guide). If you're considering professional support, see our [GEO consulting](/en/geo-consulting) page or our guide on [how to choose a GEO agency](/en/blog/geo-ajansi-nasil-secilir).`,
    ] },

    { baslik: `Adapting the Method to Other AI Platforms`, paragraflar: [
      `You can run the same question set on other platforms. Each has its own characteristics:`,
      {liste: [
        `**Google AI Overviews and AI Mode:** built on Google's regular search systems. Google says there are no additional technical requirements to appear in these features; fundamental SEO best practices apply. Search Console performance data includes clicks from these features.`,
        `**Gemini:** tied to Google's ecosystem, so Google Business Profile and Maps data may stand out in local queries.`,
        `**Perplexity:** strongly citation-focused, linking sources in almost every answer — the easiest platform for source analysis.`,
        `**Claude and Copilot:** use their own search and crawling infrastructure. Check robots.txt for their bots too.`,
      ]},
      `When comparing platforms, use the same question set, language and date range.`,
    ] },

    { baslik: `Quick-Start Checklist`, paragraflar: [
      `Use this list for your first test this week:`,
      {kontrol: [
        `Prepare 20–40 questions in customer language (across the 5 types)`,
        `Run each question 3 times in Temporary Chat`,
        `Log results in a fixed-column table`,
        `Calculate mention rate, citation rate and share of voice`,
        `List the cited third-party sites`,
        `Confirm OAI-SearchBot is allowed in robots.txt`,
        `Check CDN/firewall bot settings`,
        `Find chatgpt.com traffic in GA4`,
        `Put the next test date in your calendar`,
      ]},
    ] },

    { baslik: `Frequently Asked Questions`, paragraflar: [
      {alt: `Can I guarantee ChatGPT will recommend my brand?`},
      `No. ChatGPT's answers vary by user, question and time, and no method guarantees inclusion in a given answer. What you can do is increase the likelihood by making sure your brand appears with accurate, consistent information in trustworthy sources.`,
      {alt: `If I block GPTBot, will I disappear from ChatGPT?`},
      `No. GPTBot collects content for model training. Visibility in ChatGPT search is determined by OAI-SearchBot. You can block GPTBot while allowing OAI-SearchBot.`,
      {alt: `Do I need a paid tool to test?`},
      `No. The method in this guide is entirely free. Paid tools automate testing and make larger question sets easier to track, but for small and mid-sized businesses a manual monthly test is often enough.`,
      {alt: `How often should I repeat the test?`},
      `Monthly if you are running active GEO work, otherwise quarterly. What matters is using the same question set and conditions every time.`,
      {alt: `What should I do if ChatGPT gives wrong information about my brand?`},
      `First try to find the source of the wrong information; source links in the answer often give a clue. Then update and align the information on your site, Google Business Profile and directories. Changes can take time to show in answers.`,
      {alt: `Will an llms.txt file make me visible in ChatGPT?`},
      `Current data does not show a measurable effect of llms.txt on AI visibility. See our [llms.txt guide](/en/blog/llms-txt-rehberi) for details.`,
    ] },
  ],
}
