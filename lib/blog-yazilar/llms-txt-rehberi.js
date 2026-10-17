// Blog: llms.txt rehberi
// Veriler Ekim 2026 itibarıyla: Google Search Central (Mayıs 2026 rehberi),
// Gary Illyes (Temmuz 2025), SE Ranking, Otterly, Limy, Originality.ai çalışmaları.
// Google veya büyük yapay zekâ sağlayıcılarının tutumu değişirse güncellenmeli.

export default {
  baslik_tr: `llms.txt Nedir? Nasıl Oluşturulur ve 2026'da Gerçekten İşe Yarıyor mu?`,
  baslik_en: `What Is llms.txt? How to Create It and Does It Actually Work in 2026?`,
  meta_baslik_tr: `llms.txt Nedir? 2026'da Gerçekten İşe Yarıyor mu?`,
  meta_baslik_en: `What Is llms.txt? Does It Actually Work in 2026?`,
  meta_desc_tr: `llms.txt nedir, nasıl oluşturulur? Google'ın resmi açıklamaları ve bağımsız araştırmaların verileriyle llms.txt'nin yapay zekâ görünürlüğüne gerçek etkisi ve doğru kullanım alanları.`,
  meta_desc_en: `What is llms.txt and how do you create one? Its real effect on AI visibility based on Google's official statements and independent research, and where it is actually useful.`,
  etiket: 'GEO', sure: '13',

  bolumler_tr: [
    { baslik: null, paragraflar: [
      `Son iki yılda GEO (Generative Engine Optimization) konuşulan her yerde bir dosya adı sürekli karşımıza çıkıyor: **llms.txt**. Bazı kaynaklar onu "yapay zekâ için robots.txt" diye tanıtıyor, bazıları ise ChatGPT'de görünmenin anahtarı gibi sunuyor.`,
      `Bu rehberde llms.txt'nin ne olduğunu, nasıl oluşturulduğunu ve en önemlisi **gerçekten ne işe yaradığını** ele alıyoruz. Bunu yaparken pazarlama iddialarına değil, Google'ın resmi açıklamalarına ve yüz binlerce siteyi inceleyen bağımsız araştırmalara dayanıyoruz.`,
      {alinti: `Kısa cevap: llms.txt oluşturması kolay, maliyeti düşük bir dosyadır. Ancak Ekim 2026 itibarıyla mevcut veriler, ChatGPT, Google AI Overviews veya diğer yapay zekâ aramalarında görünürlüğe ölçülebilir bir etkisi olduğunu göstermiyor. Asıl değeri, yazılım ve dokümantasyon odaklı sitelerde yapay zekâ ajanlarına düzenli bir içerik haritası sunmasıdır.`},
    ] },

    { baslik: `llms.txt Nedir?`, paragraflar: [
      `llms.txt, Answer.AI'ın kurucularından Jeremy Howard tarafından Eylül 2024'te önerilen bir dosya formatıdır. Önerinin ayrıntıları llmstxt.org adresinde yayımlanmıştır.`,
      `Fikir basittir: Sitenizin kök dizinine (siteniz.com/llms.txt) Markdown formatında bir dosya koyarsınız. Bu dosya, büyük dil modellerine (LLM) sitenizin ne hakkında olduğunu kısaca anlatır ve en önemli sayfalarınızın kısa açıklamalı bir listesini sunar.`,
      `Önerinin çıkış noktası şuydu: Web sayfaları menüler, reklamlar, çerez bildirimleri ve JavaScript ile doludur. Bir yapay zekâ sistemi için asıl içeriği bu kalabalığın içinden ayıklamak zordur. llms.txt ise içeriğin temiz ve düzenli bir haritasını verir.`,
      {alt: `llms.txt resmi bir standart mı?`},
      `Hayır. llms.txt, bir standart kuruluşu tarafından onaylanmış bir protokol değil, bir **öneridir**. robots.txt'nin aksine, büyük arama motorlarının veya yapay zekâ şirketlerinin bu dosyayı okuyacağına dair resmi bir taahhüdü yoktur.`,
    ] },

    { baslik: `llms.txt, robots.txt ve sitemap.xml Arasındaki Fark`, paragraflar: [
      `Bu üç dosya sık karıştırılır ama tamamen farklı işler yapar:`,
      {tablo: {
        basliklar: ['Dosya', 'Görevi', 'Bağlayıcılık'],
        satirlar: [
          ['robots.txt', 'Hangi botun hangi sayfaya erişebileceğini belirler', 'Büyük arama motorları ve yapay zekâ botları uyar'],
          ['sitemap.xml', 'Sitedeki sayfaların listesini arama motorlarına bildirir', 'Arama motorları tarafından kullanılır'],
          ['llms.txt', 'Yapay zekâya içeriğin özet haritasını sunar', 'Resmi destek yok, kullanımı isteğe bağlı'],
        ],
      }},
      `Önemli bir ayrım: **llms.txt erişimi kontrol etmez.** Yapay zekâ botlarının sitenize girip girmeyeceğini robots.txt (ve sunucu/CDN ayarlarınız) belirler. robots.txt'de engellediğiniz bir botu llms.txt ile içeri davet edemezsiniz.`,
      {alt: `llms-full.txt ve Markdown sürümleri`},
      `Öneride iki tamamlayıcı fikir daha vardır. **llms-full.txt**, sitenin tüm önemli içeriğini tek bir uzun Markdown dosyasında toplar. Ayrıca sayfaların sonuna ".md" eklenerek temiz Markdown sürümlerinin sunulması önerilir. Bu sitede de blog yazılarının Markdown sürümleri bu şekilde sunuluyor.`,
    ] },

    { baslik: `Gerçekten İşe Yarıyor mu? Veriler Ne Söylüyor?`, paragraflar: [
      `llms.txt hakkındaki en önemli soru budur. Cevabı iddialarda değil, verilerde aramak gerekir.`,
      {alt: `Google'ın tutumu`},
      {liste: [
        `**Temmuz 2025:** Google'dan Gary Illyes, Search Central Live etkinliğinde Google'ın llms.txt'yi desteklemediğini ve bunu planlamadığını söyledi. John Mueller da dosyayı, arama motorlarının yıllar önce dikkate almayı bıraktığı "keywords meta etiketi"ne benzetti.`,
        `**15 Mayıs 2026:** Google, yapay zekâ özellikleri için ilk resmi optimizasyon rehberini Search Central'da yayımladı. Rehber, AI Overviews ve AI Mode'da görünmek için yeni makine tarafından okunabilir dosyalar, yapay zekâya özel metin dosyaları veya Markdown sürümleri oluşturmanın **gerekmediğini** açıkça belirtiyor. Google'a göre temel SEO uygulamaları bu özellikler için de geçerli.`,
      ]},
      `İlginç bir ayrıntı: Google'ın Lighthouse ekibi, 13.3 sürümünde llms.txt dosyasını varsayılan olarak kontrol etmeye başladı. Yani Google'ın farklı ekipleri farklı sinyaller veriyor. Ancak arama ve yapay zekâ özellikleri açısından bağlayıcı olan, Search Central'ın açıklamasıdır.`,
      {alt: `Bağımsız araştırmalar`},
      {tablo: {
        basliklar: ['Araştırma', 'Kapsam', 'Bulgu'],
        satirlar: [
          ['SE Ranking', '~300.000 alan adı', 'Sitelerin yaklaşık %10\'unda llms.txt var; dosyanın varlığı ile yapay zekâda kaynak gösterilme arasında ilişki bulunamadı'],
          ['Otterly.AI', '90 gün, 62.100+ yapay zekâ bot ziyareti', 'Yalnızca 84 istek llms.txt dosyasına geldi (yaklaşık %0,1)'],
          ['Limy', '90 gün, 500 milyon+ yapay zekâ bot ziyareti', 'Yalnızca 408 istek doğrudan llms.txt\'yi hedefledi'],
          ['Originality.ai', 'Yıl boyu takip (Haziran 2026)', 'Benimseme hızla artıyor, ancak yapay zekâ sistemlerinin dosyayı okuduğuna dair kanıt neredeyse yok'],
        ],
      }},
      `SE Ranking'in çalışmasındaki bir ayrıntı özellikle dikkat çekici: Yapay zekâ yanıtlarında en çok kaynak gösterilen 50 alan adından **yalnızca birinde** llms.txt dosyası vardı.`,
      {alt: `OpenAI ve diğerleri`},
      `OpenAI'ın tarayıcı belgeleri, site sahiplerini yapay zekâ erişimini yönetmek için robots.txt'ye yönlendiriyor ve llms.txt'den bahsetmiyor. ChatGPT, Perplexity ve Claude'un arama botları sayfaların HTML içeriğini okuyor; elimizdeki loglar llms.txt'yi düzenli okuduklarını göstermiyor.`,
      {alinti: `Sonuç: 2026 itibarıyla llms.txt bir sıralama veya görünürlük faktörü değildir. llms.txt'yi "ChatGPT'de görünmenizi sağlayacak" bir hizmet olarak satan birine temkinli yaklaşın.`},
    ] },

    { baslik: `Peki llms.txt Kimler İçin Anlamlı?`, paragraflar: [
      `Yukarıdaki veriler llms.txt'nin tamamen işe yaramaz olduğu anlamına gelmez. Sadece işe yaradığı yer, çoğu kişinin sandığı yer değildir.`,
      {alt: `1. Yazılım ve dokümantasyon siteleri`},
      `Kodlama asistanları ve geliştirici ortamlarındaki yapay zekâ ajanları, bir kütüphanenin veya API'nin belgelerini ararken llms.txt dosyalarını düzenli olarak kullanıyor. API, SDK veya teknik dokümantasyon yayımlıyorsanız, llms.txt (ve özellikle llms-full.txt) gerçekten faydalı olabilir.`,
      {alt: `2. Yapay zekâ ajanlarına hazırlık`},
      `Kullanıcı adına web'de gezinen, form dolduran veya rezervasyon yapan yapay zekâ ajanları yaygınlaşıyor. llms.txt, bu ajanlar için düzenli bir giriş noktası sunabilir. Bugün etkisi sınırlı olsa da maliyeti çok düşük olduğu için ileriye dönük bir hazırlık olarak eklenebilir.`,
      {alt: `3. İçeriğinizi kendiniz özetlemek`},
      `İyi yazılmış bir llms.txt, sitenizin neyi temsil ettiğini net bir dille ifade etmenizi sağlar. Bu düşünme egzersizi, sitenizin genel mesajını netleştirmek için bile değerlidir.`,
      {alt: `Kimler için öncelik değil?`},
      `Yerel işletmeler, küçük kurumsal siteler ve e-ticaret siteleri için llms.txt bir öncelik değildir. Bu siteler için aynı zamanı aşağıda anlattığımız temel çalışmalara ayırmak çok daha verimlidir.`,
    ] },

    { baslik: `llms.txt Dosyası Nasıl Oluşturulur?`, paragraflar: [
      `llms.txt oluşturmaya karar verdiyseniz, öneriye uygun bir dosya hazırlamak oldukça kolaydır.`,
      {alt: `Dosyanın yapısı`},
      `Öneriye göre dosya şu bölümlerden oluşur ve bu sırayla yazılır:`,
      {liste: [
        `**H1 başlık (zorunlu):** Sitenin veya projenin adı.`,
        `**Alıntı bloğu:** Sitenin ne hakkında olduğunu anlatan bir veya iki cümlelik özet.`,
        `**Açıklama paragrafları (isteğe bağlı):** Sitenin nasıl kullanılacağına dair ek bağlam.`,
        `**H2 bölümleri:** Her bölümün altında, bağlantı ve kısa açıklamadan oluşan maddeler.`,
        `**"Optional" bölümü:** Gerekirse atlanabilecek ikincil kaynaklar.`,
      ]},
      {alt: `Örnek bir llms.txt`},
      `Bir danışmanlık sitesi için basit bir örnek:`,
      {kod: `# Örnek Danışmanlık\n\n> Örnek Danışmanlık, İstanbul merkezli bir SEO ve GEO danışmanlığıdır. Teknik SEO, içerik stratejisi ve yapay zekâ arama görünürlüğü alanlarında hizmet verir.\n\n## Hizmetler\n- [SEO Danışmanlığı](https://ornek.com/seo): Teknik SEO, içerik ve otorite çalışmaları\n- [GEO Danışmanlığı](https://ornek.com/geo): Yapay zekâ yanıtlarında görünürlük\n\n## Rehberler\n- [Teknik SEO Rehberi](https://ornek.com/rehber/teknik-seo.md): Tarama, indeksleme ve site mimarisi\n\n## Optional\n- [Hakkımızda](https://ornek.com/hakkimizda): Ekip ve geçmiş`},
      `Bu sitenin kendi llms.txt dosyasını da fatihemincakiroglu.com/llms.txt adresinden inceleyebilirsiniz.`,
      {alt: `Adım adım kurulum`},
      {kontrol: [
        `Sitenizin en önemli 10–30 sayfasını belirleyin (her şeyi eklemeyin)`,
        `Her sayfa için tek cümlelik, tarafsız bir açıklama yazın`,
        `Dosyayı yukarıdaki yapıda Markdown olarak hazırlayın`,
        `Kök dizine yükleyin: siteniz.com/llms.txt`,
        `Tarayıcıda açarak düz metin olarak göründüğünü kontrol edin`,
        `Tüm bağlantıların çalıştığını ve canonical adreslere gittiğini doğrulayın`,
        `Yeni önemli sayfalar eklendikçe dosyayı güncellemeyi iş akışınıza ekleyin`,
      ]},
    ] },

    { baslik: `llms.txt İsteklerini Sunucu Loglarında Kontrol Etmek`, paragraflar: [
      `Dosyanızın gerçekten okunup okunmadığını merak ediyorsanız, en güvenilir kaynak sunucu loglarınızdır. Linux tabanlı bir sunucuda erişim loglarında basit bir arama yapabilirsiniz:`,
      {kod: `grep "GET /llms.txt" access.log | awk -F'"' '{print $6}' | sort | uniq -c | sort -rn`},
      `Bu komut, llms.txt'yi isteyen tarayıcıları (user-agent) sayısına göre listeler. Vercel, Netlify gibi platformlarda aynı bilgiyi platformun log veya analitik panelinden alabilirsiniz.`,
      `Aynı loglarda OAI-SearchBot, ChatGPT-User, PerplexityBot ve Claude-SearchBot gibi botların normal sayfalarınızı ne sıklıkla ziyaret ettiğine de bakın. Muhtemelen bu botların HTML sayfalarınızı llms.txt'den çok daha sık okuduğunu göreceksiniz.`,
    ] },

    { baslik: `Sık Yapılan Hatalar`, paragraflar: [
      {liste: [
        `**llms.txt'yi sıralama faktörü sanmak:** En yaygın ve en pahalı hata. Dosyayı ekleyip görünürlük artışı beklemek, asıl çalışmaların ertelenmesine yol açar.`,
        `**robots.txt ile çelişmek:** llms.txt'de önemli sayfalarınızı listeleyip robots.txt veya CDN ayarlarınızda yapay zekâ botlarını engellemek. Bu durumda dosya hiçbir işe yaramaz.`,
        `**CDN'in varsayılan bot engelini gözden kaçırmak:** Cloudflare, 2025 ortasından itibaren yeni sitelerde yapay zekâ tarayıcılarını varsayılan olarak engelliyor. llms.txt'niz ne kadar iyi olursa olsun, bot sitenize giremiyorsa hiçbir şey okuyamaz.`,
        `**Sitedeki her şeyi listelemek:** llms.txt bir sitemap değildir. Amacı seçici olmaktır.`,
        `**Sayfada olmayan iddialar yazmak:** llms.txt'de sitenizin içeriğiyle uyuşmayan veya abartılı tanımlar kullanmak. Yapay zekâ sistemleri asıl içeriğinizi okur.`,
        `**Güncellememek:** Kırık bağlantılar veya kaldırılmış sayfalar içeren bir dosya, faydadan çok zarar verir.`,
      ]},
    ] },

    { baslik: `Yapay Zekâ Görünürlüğü İçin Asıl Öncelikler`, paragraflar: [
      `Amacınız ChatGPT, Gemini, Perplexity veya Google AI Overviews'da görünmekse, llms.txt'den önce şu adımlara zaman ayırın:`,
      {liste: [
        `**1. Erişim:** robots.txt'de OAI-SearchBot, PerplexityBot ve Claude-SearchBot gibi arama botlarına izin verin. CDN ve güvenlik duvarı ayarlarınızı kontrol edin.`,
        `**2. Okunabilir HTML:** Ana içeriğinizin sayfanın HTML'inde yer aldığından emin olun.`,
        `**3. Soruları doğrudan yanıtlayan içerik:** Müşterilerinizin sorduğu soruların net cevaplarını sitenizde verin.`,
        `**4. Marka tutarlılığı:** Siteniz, Google Business Profile kaydınız, sosyal profilleriniz ve rehber kayıtlarınızdaki bilgileri eşitleyin.`,
        `**5. Üçüncü taraf kaynaklar:** Sektör yayınlarında, karşılaştırmalarda ve güvenilir listelerde yer alın.`,
        `**6. Ölçüm:** Markanızın yapay zekâ yanıtlarında nasıl göründüğünü düzenli olarak test edin.`,
      ]},
      `Son madde için [markanızın ChatGPT'de nasıl göründüğünü test etme rehberimizi](/blog/chatgpt-marka-gorunurlugu) kullanabilirsiniz. GEO'nun genel çerçevesi için [GEO rehberimize](/geo-rehberi), profesyonel destek için [GEO uzmanı](/geo-uzmani) sayfamıza göz atabilirsiniz.`,
    ] },

    { baslik: `Sık Sorulan Sorular`, paragraflar: [
      {alt: `llms.txt dosyası SEO'yu etkiler mi?`},
      `Hayır. Google, llms.txt'yi kullanmadığını ve AI Overviews ile AI Mode için de gerekmediğini resmi olarak açıkladı. Dosyanın Google sıralamalarına bir etkisi yoktur.`,
      {alt: `llms.txt ChatGPT'de görünmemi sağlar mı?`},
      `Mevcut veriler bunu göstermiyor. ChatGPT'nin arama botu sayfalarınızın HTML içeriğini okur. ChatGPT'de görünürlük için robots.txt'de OAI-SearchBot'a izin vermek ve kaliteli içerik sunmak çok daha belirleyicidir.`,
      {alt: `llms.txt eklemenin bir zararı var mı?`},
      `Doğru hazırlanmışsa doğrudan bir zararı yoktur. Asıl risk, dosyayı ekledikten sonra yapay zekâ görünürlüğü konusunda başka bir şey yapmaya gerek kalmadığını düşünmektir.`,
      {alt: `llms.txt ile robots.txt aynı şey mi?`},
      `Hayır. robots.txt botların hangi sayfalara erişebileceğini belirler ve büyük botlar buna uyar. llms.txt ise yalnızca içeriğin özet haritasını sunar ve hiçbir botu kısıtlamaz.`,
      {alt: `llms.txt'yi kimler mutlaka kullanmalı?`},
      `API, SDK veya teknik dokümantasyon yayımlayan yazılım şirketleri. Kodlama asistanları bu dosyaları gerçekten kullanıyor. Diğer siteler için isteğe bağlı, düşük öncelikli bir adımdır.`,
      {alt: `llms.txt'nin durumu ileride değişebilir mi?`},
      `Evet. Yapay zekâ şirketleri ileride bu dosyayı resmi olarak desteklemeye başlayabilir. Bu yazıyı gelişmelere göre güncelleyeceğiz. Şu an için kararlarınızı iddialara değil, verilere göre vermenizi öneriyoruz.`,
    ] },
  ],

  bolumler_en: [
    { baslik: null, paragraflar: [
      `Over the past two years, one file name keeps coming up wherever GEO (Generative Engine Optimization) is discussed: **llms.txt**. Some call it "robots.txt for AI"; others present it as the key to appearing in ChatGPT.`,
      `This guide covers what llms.txt is, how to create it and — most importantly — **what it actually does**. We rely not on marketing claims but on Google's official statements and independent research covering hundreds of thousands of sites.`,
      {alinti: `Short answer: llms.txt is an easy, low-cost file to create. But as of October 2026, available data does not show a measurable effect on visibility in ChatGPT, Google AI Overviews or other AI search. Its real value is giving AI agents a clean content map on software and documentation sites.`},
    ] },

    { baslik: `What Is llms.txt?`, paragraflar: [
      `llms.txt is a file format proposed in September 2024 by Jeremy Howard, co-founder of Answer.AI. The proposal is published at llmstxt.org.`,
      `The idea is simple: you place a Markdown file at your site root (yoursite.com/llms.txt) that briefly tells large language models (LLMs) what your site is about and lists your most important pages with short descriptions.`,
      `The motivation: web pages are full of menus, ads, cookie banners and JavaScript. Extracting the real content from that clutter is hard for an AI system. llms.txt provides a clean, structured map instead.`,
      {alt: `Is llms.txt an official standard?`},
      `No. llms.txt is a **proposal**, not a protocol approved by a standards body. Unlike robots.txt, there is no official commitment from major search engines or AI companies to read it.`,
    ] },

    { baslik: `llms.txt vs robots.txt vs sitemap.xml`, paragraflar: [
      `These three files are often confused but do entirely different jobs:`,
      {tablo: {
        basliklar: ['File', 'Purpose', 'Enforcement'],
        satirlar: [
          ['robots.txt', 'Defines which bot may access which pages', 'Respected by major search engines and AI bots'],
          ['sitemap.xml', 'Lists a site\'s pages for search engines', 'Used by search engines'],
          ['llms.txt', 'Offers AI a summary map of content', 'No official support; optional'],
        ],
      }},
      `A key distinction: **llms.txt does not control access.** Whether AI bots can enter your site is decided by robots.txt (and your server/CDN settings). You can't invite a bot blocked in robots.txt back in via llms.txt.`,
      {alt: `llms-full.txt and Markdown versions`},
      `The proposal includes two complementary ideas. **llms-full.txt** collects all important content into one long Markdown file. It also suggests serving clean Markdown versions of pages by appending ".md" to URLs — this site serves its blog posts that way.`,
    ] },

    { baslik: `Does It Actually Work? What the Data Says`, paragraflar: [
      `This is the most important question about llms.txt, and the answer should come from data, not claims.`,
      {alt: `Google's position`},
      {liste: [
        `**July 2025:** Google's Gary Illyes said at Search Central Live that Google doesn't support llms.txt and has no plans to. John Mueller compared it to the keywords meta tag, which search engines stopped using years ago.`,
        `**May 15, 2026:** Google published its first official optimization guide for AI features on Search Central. It states plainly that you **don't need** to create new machine-readable files, AI text files or Markdown versions to appear in AI Overviews and AI Mode. Fundamental SEO best practices apply.`,
      ]},
      `An interesting detail: Google's Lighthouse team started checking for llms.txt by default in version 13.3, so different Google teams send different signals. For Search and its AI features, Search Central's statement is what counts.`,
      {alt: `Independent research`},
      {tablo: {
        basliklar: ['Study', 'Scope', 'Finding'],
        satirlar: [
          ['SE Ranking', '~300,000 domains', 'About 10% of sites have llms.txt; no relationship found between having it and being cited by AI'],
          ['Otterly.AI', '90 days, 62,100+ AI bot visits', 'Only 84 requests touched llms.txt (about 0.1%)'],
          ['Limy', '90 days, 500M+ AI bot visits', 'Only 408 requests targeted llms.txt directly'],
          ['Originality.ai', 'Year-long tracking (June 2026)', 'Adoption rising fast, but almost no evidence AI systems read the files'],
        ],
      }},
      `One detail from SE Ranking's study stands out: among the 50 domains most cited in AI answers, **only one** had an llms.txt file.`,
      {alt: `OpenAI and others`},
      `OpenAI's crawler documentation directs site owners to robots.txt for managing AI access and does not mention llms.txt. The search bots of ChatGPT, Perplexity and Claude read pages' HTML; available logs do not show them regularly fetching llms.txt.`,
      {alinti: `Bottom line: as of 2026, llms.txt is not a ranking or visibility factor. Be cautious of anyone selling llms.txt as a service that will "make you visible in ChatGPT".`},
    ] },

    { baslik: `So Who Is llms.txt Useful For?`, paragraflar: [
      `The data above doesn't mean llms.txt is useless. It just isn't useful where most people assume.`,
      {alt: `1. Software and documentation sites`},
      `Coding assistants and AI agents in developer tools routinely use llms.txt when looking up a library's or API's documentation. If you publish APIs, SDKs or technical docs, llms.txt (and especially llms-full.txt) can genuinely help.`,
      {alt: `2. Preparing for AI agents`},
      `AI agents that browse, fill in forms or make bookings on users' behalf are spreading. llms.txt can offer them a clean entry point. Its impact today is limited, but the cost is so low that it can be added as forward-looking preparation.`,
      {alt: `3. Summarizing your own content`},
      `A well-written llms.txt forces you to state clearly what your site stands for. That exercise alone helps sharpen your overall message.`,
      {alt: `Who shouldn't prioritize it?`},
      `For local businesses, small corporate sites and e-commerce sites, llms.txt is not a priority. They will get far more from spending that time on the fundamentals below.`,
    ] },

    { baslik: `How to Create an llms.txt File`, paragraflar: [
      `If you decide to create one, a proposal-compliant file is easy to prepare.`,
      {alt: `File structure`},
      `Per the proposal, the file has these sections, in this order:`,
      {liste: [
        `**H1 title (required):** the site or project name.`,
        `**Blockquote:** a one- or two-sentence summary of what the site is about.`,
        `**Descriptive paragraphs (optional):** extra context on how to use the site.`,
        `**H2 sections:** each containing items made of a link and a short description.`,
        `**"Optional" section:** secondary resources that can be skipped.`,
      ]},
      {alt: `Example llms.txt`},
      `A simple example for a consulting site:`,
      {kod: `# Example Consulting\n\n> Example Consulting is an Istanbul-based SEO and GEO consultancy offering technical SEO, content strategy and AI search visibility services.\n\n## Services\n- [SEO Consulting](https://example.com/seo): Technical SEO, content and authority work\n- [GEO Consulting](https://example.com/geo): Visibility in AI answers\n\n## Guides\n- [Technical SEO Guide](https://example.com/guides/technical-seo.md): Crawling, indexing and site architecture\n\n## Optional\n- [About](https://example.com/about): Team and background`},
      `You can also view this site's own file at fatihemincakiroglu.com/llms.txt.`,
      {alt: `Step-by-step setup`},
      {kontrol: [
        `Pick your 10–30 most important pages (don't add everything)`,
        `Write a neutral one-sentence description for each`,
        `Build the file in Markdown using the structure above`,
        `Upload it to the root: yoursite.com/llms.txt`,
        `Open it in a browser to confirm it displays as plain text`,
        `Verify all links work and point to canonical URLs`,
        `Add updating the file to your workflow as key pages are added`,
      ]},
    ] },

    { baslik: `Checking llms.txt Requests in Server Logs`, paragraflar: [
      `If you want to know whether your file is actually read, your server logs are the most reliable source. On a Linux server you can run a simple search over access logs:`,
      {kod: `grep "GET /llms.txt" access.log | awk -F'"' '{print $6}' | sort | uniq -c | sort -rn`},
      `This lists the user agents requesting llms.txt by count. On platforms like Vercel or Netlify, get the same data from the platform's log or analytics panel.`,
      `In the same logs, check how often bots like OAI-SearchBot, ChatGPT-User, PerplexityBot and Claude-SearchBot visit your normal pages. You'll likely find they read your HTML pages far more often than llms.txt.`,
    ] },

    { baslik: `Common Mistakes`, paragraflar: [
      {liste: [
        `**Treating llms.txt as a ranking factor:** the most common and most expensive mistake. Adding the file and waiting for visibility gains delays the real work.`,
        `**Contradicting robots.txt:** listing key pages in llms.txt while blocking AI bots in robots.txt or the CDN. The file then does nothing.`,
        `**Missing the CDN's default bot block:** since mid-2025 Cloudflare blocks AI crawlers by default on new sites. However good your llms.txt, a bot that can't enter reads nothing.`,
        `**Listing everything:** llms.txt is not a sitemap; its purpose is to be selective.`,
        `**Making claims not on the page:** descriptions in llms.txt that don't match or exaggerate your content. AI systems read your actual content.`,
        `**Not maintaining it:** a file with broken links or removed pages does more harm than good.`,
      ]},
    ] },

    { baslik: `The Real Priorities for AI Visibility`, paragraflar: [
      `If your goal is to appear in ChatGPT, Gemini, Perplexity or Google AI Overviews, spend time on these steps before llms.txt:`,
      {liste: [
        `**1. Access:** allow search bots like OAI-SearchBot, PerplexityBot and Claude-SearchBot in robots.txt. Check CDN and firewall settings.`,
        `**2. Readable HTML:** make sure your main content is in the page HTML.`,
        `**3. Content that answers questions directly:** give clear answers to the questions your customers ask.`,
        `**4. Brand consistency:** align information across your site, Google Business Profile, social profiles and directories.`,
        `**5. Third-party sources:** appear in industry publications, comparisons and trusted lists.`,
        `**6. Measurement:** regularly test how your brand appears in AI answers.`,
      ]},
      `For the last point, use our guide to [testing how your brand appears in ChatGPT](/en/blog/chatgpt-marka-gorunurlugu). For the overall GEO framework see our [GEO guide](/en/geo-guide), and for professional support our [GEO consulting](/en/geo-consulting) page.`,
    ] },

    { baslik: `Frequently Asked Questions`, paragraflar: [
      {alt: `Does llms.txt affect SEO?`},
      `No. Google has officially stated that it doesn't use llms.txt and that it isn't needed for AI Overviews or AI Mode. The file has no effect on Google rankings.`,
      {alt: `Will llms.txt make me visible in ChatGPT?`},
      `Current data doesn't show that. ChatGPT's search bot reads your pages' HTML. Allowing OAI-SearchBot in robots.txt and offering quality content matter far more.`,
      {alt: `Is there any harm in adding llms.txt?`},
      `If prepared correctly, no direct harm. The real risk is assuming nothing else needs to be done for AI visibility once it's added.`,
      {alt: `Are llms.txt and robots.txt the same?`},
      `No. robots.txt defines which pages bots may access, and major bots comply. llms.txt only offers a summary map of content and restricts no bot.`,
      {alt: `Who should definitely use llms.txt?`},
      `Software companies publishing APIs, SDKs or technical documentation — coding assistants genuinely use these files. For other sites it is an optional, low-priority step.`,
      {alt: `Could the status of llms.txt change?`},
      `Yes. AI companies may officially support it in the future, and we will update this article as things develop. For now, we recommend basing decisions on data, not claims.`,
    ] },
  ],
}
