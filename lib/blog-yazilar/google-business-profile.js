// Blog: Google Business Profile Optimizasyonu
// Özellik durumu Ekim 2026 itibarıyla: Soru-Cevap bölümü 2025 sonunda kaldırıldı,
// yerini Gemini destekli "Ask Maps" kademeli olarak alıyor. Google'ın işletme
// profili özellikleri sık değiştiği için yazı en az 6 ayda bir gözden geçirilmeli.

export default {
  baslik_tr: `Google Business Profile Optimizasyonu: 2026 İçin Eksiksiz Rehber`,
  baslik_en: `Google Business Profile Optimization: The Complete 2026 Guide`,
  meta_baslik_tr: `Google Business Profile Optimizasyonu: 2026 Rehberi`,
  meta_baslik_en: `Google Business Profile Optimization: 2026 Guide`,
  meta_desc_tr: `Google Business Profile (Google İşletme Profili) nasıl optimize edilir? Kategori, işletme adı, yorum stratejisi, fotoğraflar, Ask Maps dönemi, ölçüm ve askıya alınma riskleri için 2026 rehberi.`,
  meta_desc_en: `How to optimize Google Business Profile: categories, business name, review strategy, photos, the Ask Maps era, measurement and suspension risks — the complete 2026 guide.`,
  etiket: 'Yerel SEO', sure: '17',

  bolumler_tr: [
    { baslik: null, paragraflar: [
      `"Yakınımdaki diş hekimi", "Kadıköy'de avukat", "Beşiktaş kafe" gibi aramalarda Google'ın en üstte gösterdiği harita ve işletme listesi, yerel işletmeler için en değerli görünürlük alanıdır. Bu alanda görünüp görünmeyeceğinizi büyük ölçüde **Google Business Profile** (Türkçe arayüzde **Google İşletme Profili**) belirler.`,
      `İyi optimize edilmiş bir profil, web sitenizi hiç ziyaret etmeyen bir kullanıcının bile sizi aramasını, yol tarifi almasını ve kapınıza gelmesini sağlar. 2026'da profilinizin önemi bir kat daha arttı: Google'ın yapay zekâ özellikleri ve Gemini, yerel sorulara cevap verirken işletme profillerini birincil bilgi kaynağı olarak kullanıyor.`,
      `Bu rehberde profilinizi sıfırdan kurmaktan, yorum stratejisine, Soru-Cevap bölümünün kalkmasından sonra ne yapmanız gerektiğinden performans ölçümüne kadar tüm adımları ele alıyoruz.`,
    ] },

    { baslik: `Google Business Profile Nedir?`, paragraflar: [
      `Google Business Profile, işletmenizin Google Arama ve Google Haritalar'da nasıl görüneceğini yönettiğiniz ücretsiz bir araçtır. Eski adı **Google My Business** idi. Profilde şu bilgiler yer alır:`,
      {liste: [
        `işletme adı, kategorisi ve açıklaması,`,
        `adres veya hizmet bölgesi,`,
        `telefon, web sitesi ve çalışma saatleri,`,
        `fotoğraflar ve videolar,`,
        `müşteri yorumları ve işletme yanıtları,`,
        `hizmetler, ürünler ve gönderiler.`,
      ]},
      `Fiziksel bir adresi olan işletmeler (mağaza, klinik, restoran, ofis) ve müşterinin adresine giden hizmet işletmeleri (tesisatçı, temizlik şirketi, nakliyeci) profil açabilir. Yalnızca online faaliyet gösteren, müşteriyle yüz yüze temas etmeyen işletmeler ise profil açmaya uygun değildir.`,
    ] },

    { baslik: `Yerel Sıralama Nasıl Belirlenir?`, paragraflar: [
      `Google, yerel sonuçların üç ana faktöre göre belirlendiğini resmi olarak açıklıyor. Optimizasyon çalışmalarının tamamı bu üç faktörü güçlendirmeye yöneliktir.`,
      {tablo: {
        basliklar: ['Faktör', 'Anlamı', 'Etkileyebilir misiniz?'],
        satirlar: [
          ['Alaka (Relevance)', 'Profilinizin aranan şeyle ne kadar örtüştüğü', 'Evet: kategori, hizmetler, açıklama, eksiksiz bilgi'],
          ['Mesafe (Distance)', 'İşletmenin arama yapan kişiye veya aranan konuma uzaklığı', 'Hayır (adresinizi değiştirmediğiniz sürece)'],
          ['Öne çıkma (Prominence)', 'İşletmenin ne kadar bilindiği ve güvenildiği', 'Evet: yorumlar, web sitesi, bağlantılar, internetteki anılmalar'],
        ],
      }},
      `Mesafeyi kontrol edemezsiniz. Bu yüzden rakiplerinizle yarışırken asıl kazanabileceğiniz alanlar alaka ve öne çıkmadır.`,
    ] },

    { baslik: `Adım 1: Profili Oluşturun ve Doğrulayın`, paragraflar: [
      `Profiliniz yoksa business.google.com adresinden oluşturabilirsiniz. Önce Google Haritalar'da işletmenizi arayın; daha önce birisi tarafından oluşturulmuş bir kayıt varsa yeni bir profil açmak yerine o kaydın sahipliğini talep edin. Aynı işletme için birden fazla profil, sıralamanızı olumsuz etkileyebilir.`,
      {alt: `Doğrulama yöntemleri`},
      `Google, işletmenin gerçek olduğunu doğrulamadan profili tam olarak yayınlamaz. Doğrulama yöntemi işletmenin türüne ve bölgeye göre Google tarafından belirlenir:`,
      {liste: [
        `**Video ile doğrulama:** İşletmenin konumunu, tabelasını ve işletmeyi yönettiğinizi gösteren kesintisiz bir video kaydı. Günümüzde en yaygın yöntemlerden biridir.`,
        `**Canlı görüntülü görüşme:** Google temsilcisiyle yapılan görüntülü bir görüşme.`,
        `**Telefon veya SMS:** İşletme numarasına gönderilen kod.`,
        `**E-posta:** İşletme alan adındaki e-posta adresine gönderilen kod.`,
        `**Posta kartı:** İşletme adresine gönderilen kod (bazı bölgelerde).`,
      ]},
      {alinti: `Video doğrulama ipucu: Videoyu tek seferde, kesintisiz çekin. Önce sokağı ve tabelayı, ardından işletmenin içini, son olarak da yönetici olduğunuzu gösteren bir şeyi (kasa, ofis anahtarı, iş ekipmanı) gösterin. Doğrulama reddedilirse aynı hatayı tekrarlamamak için nedenini dikkatle okuyun.`},
      {alt: `Sanal ofis ve paylaşımlı adres uyarısı`},
      `Sanal ofis adresleri, posta kutuları ve çalışan bulunmayan adresler Google'ın politikalarına aykırıdır. Bu tür adreslerle açılan profiller doğrulamada reddedilebilir veya sonradan askıya alınabilir.`,
    ] },

    { baslik: `Adım 2: İşletme Adını Doğru Yazın`, paragraflar: [
      `İşletme adı, en sık yapılan ve en riskli hataların yaşandığı alandır. Google'ın kuralı nettir: **İşletme adı, tabelanızda, faturanızda ve müşterilerinizin bildiği gerçek adınız olmalıdır.**`,
      {tablo: {
        basliklar: ['Yanlış', 'Doğru'],
        satirlar: [
          ['Yılmaz Diş Kliniği - Kadıköy En İyi Diş Hekimi İmplant', 'Yılmaz Diş Kliniği'],
          ['ABC Hukuk | Boşanma Avukatı İstanbul', 'ABC Hukuk Bürosu'],
          ['Tesisatçı 7/24 Acil Su Kaçağı Tespiti', '(gerçek işletme adı)'],
        ],
      }},
      `İşletme adına anahtar kelime veya konum eklemek kısa vadede sıralamaya yardımcı olabilir. Ama Google'ın yönergelerine aykırıdır ve profilinizin askıya alınmasının en yaygın nedenlerinden biridir. Rakipleriniz de bu tür ihlalleri Google'a bildirebilir.`,
    ] },

    { baslik: `Adım 3: Kategorileri Stratejik Seçin`, paragraflar: [
      `Kategori seçimi, alaka faktörünü en çok etkileyen ayardır.`,
      {liste: [
        `**Birincil kategori:** İşletmenizi en iyi tanımlayan tek kategoridir ve sıralamada en büyük ağırlığa sahiptir. "Diş Kliniği" ile "Diş Hekimi" veya "Kafe" ile "Kahve Dükkanı" gibi yakın seçenekler arasında, müşterilerinizin en çok aradığı ifadeye en yakın olanı seçin.`,
        `**Ek kategoriler:** Birincil kategoriye ek olarak 9 kategori daha ekleyebilirsiniz. Yalnızca gerçekten sunduğunuz hizmetleri kapsayan kategorileri seçin.`,
      ]},
      {alinti: `Pratik yöntem: Hedeflediğiniz aramayı Google Haritalar'da yapın ve en üstte çıkan 3–5 rakibin birincil kategorisine bakın. Bu, Google'ın o arama için hangi kategoriyi alakalı bulduğuna dair güçlü bir ipucudur.`},
    ] },

    { baslik: `Adım 4: Adres, Hizmet Bölgesi ve Çalışma Saatleri`, paragraflar: [
      {alt: `Adres`},
      `Adresinizi resmi ve tutarlı biçimde yazın. Aynı adres; web sitenizde, sosyal medya profillerinizde ve rehber sitelerinde birebir aynı olmalıdır. Bu tutarlılık, İngilizce kısaltmasıyla **NAP** (Name, Address, Phone: ad, adres, telefon) tutarlılığı olarak bilinir.`,
      {alt: `Hizmet bölgesi işletmeleri`},
      `Müşterilerinize kendi adreslerinde hizmet veriyorsanız ve işyerinizde müşteri kabul etmiyorsanız, adresinizi gizleyip hizmet verdiğiniz bölgeleri (ilçe veya şehir) tanımlamalısınız. Evden çalışan hizmet işletmeleri için bu zorunludur.`,
      {alt: `Çalışma saatleri ve özel günler`},
      `Çalışma saatlerinizi doğru girin ve resmî tatillerde (Ramazan ve Kurban Bayramı, yılbaşı gibi) "özel çalışma saatleri" özelliğini mutlaka kullanın. Kapalı olduğunuz bir günde müşterinin kapınıza gelmesi, olumsuz bir yoruma dönüşebilir.`,
    ] },

    { baslik: `Adım 5: Açıklama, Hizmetler ve Ürünler`, paragraflar: [
      {alt: `İşletme açıklaması`},
      `Açıklama alanında 750 karaktere kadar metin yazabilirsiniz. İlk 250 karakter en önemli kısımdır, çünkü çoğu kullanıcı yalnızca bunu görür. Açıklamada şunları yanıtlayın:`,
      {liste: [
        `Ne yapıyorsunuz?`,
        `Kimlere hizmet veriyorsunuz?`,
        `Hangi bölgede hizmet veriyorsunuz?`,
        `Sizi rakiplerinizden ayıran nedir?`,
      ]},
      `Açıklamaya bağlantı, indirim kampanyası veya abartılı ifadeler ("en iyi", "bir numara") eklemeyin. Anahtar kelimeleri doğal bir dille kullanın.`,
      {alt: `Hizmetler ve ürünler`},
      `Hizmetler bölümüne sunduğunuz her hizmeti ayrı ayrı ekleyin ve her birine kısa bir açıklama yazın. Ürün satan işletmeler, ürünler bölümünde fotoğraflı ürün kartları oluşturabilir. Bu bölümler, kullanıcıların ve Google'ın işletmenizin neler sunduğunu anlamasını kolaylaştırır.`,
      {alt: `Özellikler (attributes)`},
      `"Engelli erişimine uygun", "Otopark var", "Kadın girişimci" veya "Online randevu" gibi özellikleri işaretleyin. Bu özellikler, filtreli aramalarda ve yapay zekâ cevaplarında kullanılır.`,
    ] },

    { baslik: `Adım 6: Fotoğraf ve Videolar`, paragraflar: [
      `Fotoğraflar, kullanıcının işletmenize gelmeden önce edindiği ilk izlenimdir. Düzenli ve gerçek fotoğraf yüklemek, profilinizin aktif olduğunu da gösterir.`,
      {kontrol: [
        `Logo ve kapak fotoğrafı`,
        `Dış cephe (farklı saatlerde, tabela görünecek şekilde)`,
        `İç mekân`,
        `Ekip fotoğrafları`,
        `Ürünler veya hizmet örnekleri`,
        `Kısa tanıtım videoları`,
      ]},
      `Stok fotoğraf kullanmayın. Gerçek, iyi ışıklı ve güncel fotoğraflar hem kullanıcı güveni hem de yapay zekâ özellikleri açısından daha değerlidir. Fotoğrafların EXIF verilerine konum bilgisi eklemenin sıralamaya kanıtlanmış bir etkisi yoktur.`,
    ] },

    { baslik: `Adım 7: Yorum Stratejisi`, paragraflar: [
      `Yorumlar, hem öne çıkma faktörünü hem de kullanıcının karar vermesini en çok etkileyen unsurdur. Yorumların sayısı, puanı, güncelliği ve içeriği önemlidir.`,
      {alt: `Yorum nasıl istenir?`},
      {liste: [
        `Hizmetten memnun kalan müşteriye, hizmetin hemen ardından yorum isteyin.`,
        `Profilinizdeki "Yorum iste" bağlantısını SMS, e-posta veya QR kod ile paylaşın.`,
        `Müşteriden hizmetin hangi yönünden memnun kaldığını kendi cümleleriyle yazmasını rica edin. Hizmet adlarının geçtiği doğal yorumlar alaka sinyalini güçlendirir.`,
      ]},
      {alt: `Kesinlikle yapılmaması gerekenler`},
      {liste: [
        `**Yorum karşılığında indirim, hediye veya ödül vermek.**`,
        `**Yalnızca memnun müşterilerden yorum istemek (seçici yorum toplama).** Google, olumsuz yorumları engellemeye yönelik bu uygulamayı yasaklıyor.`,
        `**Sahte yorum satın almak veya çalışanlara yorum yazdırmak.**`,
        `**Toplu yorum kampanyaları:** Kısa sürede gelen çok sayıda yorum, Google'ın spam filtrelerini tetikleyebilir.`,
      ]},
      `Google, 2025 ve 2026'da yorum politikalarını ve yapay zekâ destekli denetimlerini belirgin biçimde sıkılaştırdı. Politika ihlali, yorumların silinmesine ve profilin yeni yorum almasının kısıtlanmasına yol açabilir.`,
      {alt: `Yorumlara yanıt verin`},
      `Olumlu olumsuz tüm yorumlara yanıt verin. Olumsuz yorumlarda savunmaya geçmeden, sorunu kabul eden ve çözüm öneren kısa bir yanıt yazın. Bu yanıtlar yalnızca yorumu yazan kişi için değil, profili inceleyen tüm potansiyel müşteriler için yazılır.`,
    ] },

    { baslik: `Soru-Cevap Kalktı: "Ask Maps" Dönemine Nasıl Hazırlanılır?`, paragraflar: [
      `2026'daki en önemli değişikliklerden biri, Google Business Profile'daki Soru-Cevap (Q&A) bölümünün kaldırılmasıdır.`,
      {liste: [
        `**Kasım 2025:** Soru-Cevap API'si kapatıldı.`,
        `**Aralık 2025:** Herkese açık Soru-Cevap bölümü profillerden kaldırılmaya başlandı.`,
        `**2026:** Yerine Gemini destekli **"Ask Maps"** özelliği kademeli olarak devreye alınıyor. Bu özellik, kullanıcıların işletme hakkında doğal dille soru sormasına ve yapay zekâdan anında cevap almasına olanak tanıyor.`,
      ]},
      `Ask Maps henüz her bölgede ve her işletme kategorisinde kullanılabilir değil. Ancak yön açık: Kullanıcıların işletmeniz hakkındaki sorularını artık siz değil, yapay zekâ cevaplıyor.`,
      {alt: `Yapay zekâ cevaplarını nereden alıyor?`},
      `Ask Maps ve Gemini, cevaplarını oluştururken işletme profilinizdeki bilgileri, müşteri yorumlarını, fotoğrafları ve web sitenizdeki içeriği kullanıyor. Bu da şu anlama geliyor: **Profilinizde eksik bilgi varsa, yapay zekâ tahmin yürütür.**`,
      {alt: `Ne yapmalısınız?`},
      {kontrol: [
        `Müşterilerinizin en sık sorduğu 15–20 soruyu listeleyin`,
        `Operasyonel cevapları (otopark, ödeme yöntemleri, erişilebilirlik) profil özelliklerine girin`,
        `Hizmetlerle ilgili cevapları hizmet açıklamalarına ve web sitenize ekleyin`,
        `Web sitenizde kapsamlı bir SSS sayfası oluşturun`,
        `Yorum yanıtlarınızda sık sorulan konulara doğal biçimde değinin`,
        `Google Haritalar'da kendi profilinizde Ask Maps'i deneyin ve cevapları kontrol edin`,
      ]},
      `Bu yaklaşım, yalnızca Google'ın yapay zekâsı için değil, ChatGPT gibi diğer platformlar için de geçerlidir. Markanızın bu platformlarda nasıl göründüğünü test etmek için [ChatGPT görünürlük testi](/blog/chatgpt-marka-gorunurlugu) rehberimizi kullanabilirsiniz.`,
    ] },

    { baslik: `Adım 8: Gönderiler (Google Posts)`, paragraflar: [
      `Profilinizde güncellemeler, kampanyalar ve etkinlikler paylaşabilirsiniz. Gönderilerin sıralamaya doğrudan etkisi tartışmalı olsa da profilin aktif göründüğünü gösterir ve kullanıcıyı aksiyona yönlendirmek için iyi bir alandır.`,
      {liste: [
        `Ayda en az 2–4 gönderi paylaşın.`,
        `Her gönderide gerçek bir fotoğraf ve net bir eylem çağrısı ("Randevu al", "Ara") kullanın.`,
        `Kampanyalarınız için başlangıç ve bitiş tarihli "Teklif" gönderilerini kullanın.`,
      ]},
    ] },

    { baslik: `Adım 9: Web Sitenizle Bağlantı Kurun`, paragraflar: [
      `Profiliniz ile web siteniz birbirini desteklemelidir. Google, öne çıkma faktörünü değerlendirirken web sitenizi de dikkate alır.`,
      {liste: [
        `**Doğru sayfaya bağlantı verin:** Tek lokasyonlu işletmelerde ana sayfa, çok lokasyonlu işletmelerde her şubenin kendi sayfası.`,
        `**Erişilebilir bir site kullanın:** Google, Eylül 2025'te güncellediği işletme bağlantıları politikasıyla profilde bağlantı verilen sitenin Google'ın tarayıcılarına açık olmasını şart koştu. Bot engelleme, CAPTCHA veya giriş zorunluluğu olan sayfalar sorun yaratabilir.`,
        `**NAP bilgilerini sitede tekrarlayın:** Adres, telefon ve çalışma saatlerini sitenizde de aynı biçimde yazın.`,
        `**LocalBusiness yapılandırılmış verisi ekleyin:** Sitenizde işletme bilgilerinizi schema.org LocalBusiness işaretlemesiyle tanımlayın.`,
        `**Bölgesel sayfalar oluşturun:** Birden fazla bölgeye hizmet veriyorsanız, her bölge için gerçekten özgün bilgi içeren sayfalar hazırlayın. Yalnızca ilçe adını değiştiren şablon sayfalar fayda değil risk yaratır.`,
      ]},
    ] },

    { baslik: `Performansı Nasıl Ölçmelisiniz?`, paragraflar: [
      `Profilinizin performans panelinde şu metrikleri görebilirsiniz:`,
      {tablo: {
        basliklar: ['Metrik', 'Ne gösterir?'],
        satirlar: [
          ['Arama ve Haritalar görüntülemeleri', 'Profilinizin kaç kez görüldüğü'],
          ['Profilinizi bulmak için kullanılan aramalar', 'Hangi sorgularla bulunduğunuz'],
          ['Aramalar (telefon)', 'Profil üzerinden yapılan telefon aramaları'],
          ['Web sitesi tıklamaları', 'Sitenize yönlenen ziyaretçiler'],
          ['Yol tarifi istekleri', 'İşletmenize gelmek isteyen kullanıcılar'],
        ],
      }},
      {alt: `Web sitesi bağlantısına UTM ekleyin`},
      `Profildeki web sitesi bağlantınıza UTM parametresi ekleyerek bu trafiği Google Analytics'te ayırabilirsiniz. Örneğin:`,
      {kod: `https://siteniz.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`},
      `Bu sayede profilden gelen ziyaretçilerin sitenizde ne yaptığını ve ne kadarının müşteriye dönüştüğünü görebilirsiniz.`,
      {alt: `Sıralamayı farklı konumlardan kontrol edin`},
      `Yerel sıralama, arama yapılan konuma göre değişir. Ofisinizin önünde 1. sırada çıkarken iki kilometre ötede görünmüyor olabilirsiniz. Yerel sıralama takip araçları, hizmet bölgenizin farklı noktalarındaki görünürlüğünüzü harita üzerinde gösterir.`,
    ] },

    { baslik: `Profiliniz Askıya Alınırsa Ne Yapmalısınız?`, paragraflar: [
      `Profil askıya alınmalarının en yaygın nedenleri şunlardır:`,
      {liste: [
        `işletme adına anahtar kelime veya konum eklemek,`,
        `sanal ofis veya gerçek olmayan bir adres kullanmak,`,
        `hizmet bölgesi işletmesinin adresini göstermesi,`,
        `kısa sürede çok sayıda kritik bilgiyi (ad, adres, kategori) değiştirmek,`,
        `sahte veya teşvikli yorumlar.`,
      ]},
      `Profiliniz askıya alınırsa paniğe kapılıp yeni bir profil açmayın. Önce ihlalin nedenini bulup düzeltin, ardından Google'ın itiraz formu üzerinden işletmenizin gerçek olduğunu gösteren belgelerle (vergi levhası, tabela fotoğrafı, fatura) itiraz edin.`,
      {alinti: `Önemli: Profilinizde büyük değişiklikler yapmadan önce mevcut bilgilerin ekran görüntüsünü alın. Kritik bilgileri tek seferde değil, gerektiğinde aralıklarla güncelleyin.`},
      {alt: `Rakiplerin spam ihlalleri`},
      `Rakipleriniz işletme adlarına anahtar kelime ekliyor veya sahte profiller açıyorsa, bunu Haritalar'daki "Düzenleme öner" seçeneğiyle veya Google'ın işletme profili şikâyet formuyla bildirebilirsiniz.`,
    ] },

    { baslik: `Birden Fazla Şubesi Olan İşletmeler İçin`, paragraflar: [
      {liste: [
        `Her şube için ayrı bir profil oluşturun; her profil kendi adresi, telefonu ve çalışma saatlerine sahip olmalıdır.`,
        `Tüm şubelerde marka adını tutarlı kullanın.`,
        `Her profili, web sitenizde o şubeye ait özgün içerikli bir sayfaya bağlayın.`,
        `Çok sayıda şubesi olan işletmeler Google'ın toplu doğrulama seçeneğini değerlendirebilir.`,
        `Yorum ve fotoğraf yönetimini her şube için ayrı ayrı takip edin.`,
      ]},
    ] },

    { baslik: `Haftalık ve Aylık Bakım Listesi`, paragraflar: [
      `Profil optimizasyonu bir kerelik bir iş değildir. Aşağıdaki rutin, profilinizi güncel ve güçlü tutar:`,
      {alt: `Her hafta`},
      {kontrol: [
        `Yeni yorumlara yanıt verin`,
        `Profilde kullanıcılar tarafından önerilen düzenlemeleri kontrol edin`,
        `En az bir yeni fotoğraf veya gönderi paylaşın`,
      ]},
      {alt: `Her ay`},
      {kontrol: [
        `Performans metriklerini bir önceki ayla karşılaştırın`,
        `Hizmet, ürün ve özellik bilgilerinin güncel olduğunu kontrol edin`,
        `Yaklaşan bayram ve tatiller için özel çalışma saatlerini girin`,
        `Rakiplerin profillerindeki değişiklikleri inceleyin`,
        `Ask Maps'te (kullanılabiliyorsa) işletmeniz hakkındaki cevapları kontrol edin`,
      ]},
    ] },

    { baslik: `Sık Sorulan Sorular`, paragraflar: [
      {alt: `Google Business Profile ücretli mi?`},
      `Hayır, profil oluşturmak ve yönetmek ücretsizdir. Google'ın yerel reklam ürünleri ise ayrıca ücretlendirilir.`,
      {alt: `Google İşletme Profili ile Google My Business aynı şey mi?`},
      `Evet. Google My Business, 2021'de Google Business Profile olarak yeniden adlandırıldı. Türkçe arayüzde "Google İşletme Profili" olarak geçiyor.`,
      {alt: `Evden çalışan bir işletme profil açabilir mi?`},
      `Müşterilere yüz yüze hizmet veriyorsanız açabilirsiniz. Ancak evinizde müşteri kabul etmiyorsanız adresinizi gizleyip hizmet bölgesi işletmesi olarak profil açmalısınız.`,
      {alt: `Olumsuz bir yorumu silebilir miyim?`},
      `Yalnızca Google'ın politikalarını ihlal eden yorumları (sahte, hakaret içeren, konu dışı) Google'a bildirebilirsiniz. Gerçek bir müşterinin olumsuz deneyimini anlatan yorumlar silinmez. En iyi yaklaşım, profesyonel ve çözüm odaklı bir yanıt vermektir.`,
      {alt: `Profilim neden haritada üst sıralarda çıkmıyor?`},
      `En yaygın nedenler: yanlış birincil kategori, eksik profil bilgileri, rakiplere göre az veya eski yorumlar, zayıf bir web sitesi veya arama yapılan noktaya uzaklık. Önce kategori ve profil bütünlüğünü, ardından yorum stratejinizi gözden geçirin.`,
      {alt: `Soru-Cevap bölümüm neden kayboldu?`},
      `Google, Soru-Cevap bölümünü 2025 sonunda kaldırmaya başladı ve yerine Gemini destekli Ask Maps özelliğini getiriyor. Müşterilerin sık sorduğu soruların cevaplarını artık profil bilgilerinize, hizmet açıklamalarınıza ve web sitenize eklemeniz gerekiyor.`,
      `Yerel SEO çalışmalarınızda profesyonel destek düşünüyorsanız [SEO uzmanı](/seo-uzmani) sayfamızdaki yerel SEO hizmet kapsamına göz atabilirsiniz. Bütçe planlaması için [SEO ajansı fiyatları](/blog/seo-ajansi-fiyatlari) rehberimiz de yardımcı olabilir.`,
    ] },
  ],

  bolumler_en: [
    { baslik: null, paragraflar: [
      `For searches like "dentist near me", "lawyer in Kadıköy" or "café in Beşiktaş", the map and business list Google shows at the top is the most valuable visibility space for local businesses. Whether you appear there is largely decided by your **Google Business Profile**.`,
      `A well-optimized profile lets someone call you, get directions and walk in without ever visiting your website. In 2026 your profile matters even more: Google's AI features and Gemini use business profiles as a primary source when answering local questions.`,
      `This guide covers every step — from setting up your profile to review strategy, what to do now that Q&A has been removed, and measuring performance.`,
    ] },

    { baslik: `What Is Google Business Profile?`, paragraflar: [
      `Google Business Profile is a free tool for managing how your business appears on Google Search and Google Maps. It was formerly called **Google My Business**. A profile includes:`,
      {liste: [
        `business name, category and description,`,
        `address or service area,`,
        `phone, website and opening hours,`,
        `photos and videos,`,
        `customer reviews and owner replies,`,
        `services, products and posts.`,
      ]},
      `Businesses with a physical location customers visit (stores, clinics, restaurants, offices) and service businesses that travel to customers (plumbers, cleaners, movers) can create a profile. Online-only businesses with no face-to-face contact are not eligible.`,
    ] },

    { baslik: `How Local Rankings Are Determined`, paragraflar: [
      `Google officially states that local results are based on three main factors. All optimization work aims to strengthen them.`,
      {tablo: {
        basliklar: ['Factor', 'Meaning', 'Can you influence it?'],
        satirlar: [
          ['Relevance', 'How well your profile matches the search', 'Yes: categories, services, description, complete info'],
          ['Distance', 'How far the business is from the searcher or searched location', 'No (unless you move)'],
          ['Prominence', 'How well known and trusted the business is', 'Yes: reviews, website, links, mentions across the web'],
        ],
      }},
      `You can't control distance, so relevance and prominence are where you can actually beat competitors.`,
    ] },

    { baslik: `Step 1: Create and Verify Your Profile`, paragraflar: [
      `If you don't have a profile, create one at business.google.com. First search for your business on Google Maps; if someone already created a listing, claim it instead of opening a new one. Duplicate profiles for the same business can hurt your rankings.`,
      {alt: `Verification methods`},
      `Google won't fully publish a profile until it verifies the business is real. The method is chosen by Google based on business type and region:`,
      {liste: [
        `**Video verification:** an unedited recording showing the location, signage and proof that you manage the business — one of the most common methods today.`,
        `**Live video call:** a video call with a Google representative.`,
        `**Phone or SMS:** a code sent to the business number.`,
        `**Email:** a code sent to an address on the business domain.`,
        `**Postcard:** a code mailed to the business address (in some regions).`,
      ]},
      {alinti: `Video verification tip: record in one continuous take. Show the street and signage first, then the interior, then something proving you manage it (till, office keys, work equipment). If verification is rejected, read the reason carefully so you don't repeat the mistake.`},
      {alt: `Virtual offices and shared addresses`},
      `Virtual office addresses, PO boxes and unstaffed addresses violate Google's policies. Profiles using them may be rejected at verification or suspended later.`,
    ] },

    { baslik: `Step 2: Get the Business Name Right`, paragraflar: [
      `The business name is where the most common and riskiest mistakes happen. Google's rule is clear: **the name must be your real-world name as it appears on signage, invoices and as customers know it.**`,
      {tablo: {
        basliklar: ['Wrong', 'Right'],
        satirlar: [
          ['Yılmaz Dental Clinic - Best Dentist Implants Kadıköy', 'Yılmaz Dental Clinic'],
          ['ABC Law | Divorce Lawyer Istanbul', 'ABC Law Firm'],
          ['24/7 Emergency Plumber Leak Detection', '(the actual business name)'],
        ],
      }},
      `Adding keywords or locations to the name may help short-term, but it violates Google's guidelines and is one of the most common causes of suspension. Competitors can report such violations too.`,
    ] },

    { baslik: `Step 3: Choose Categories Strategically`, paragraflar: [
      `Category selection is the setting that most affects relevance.`,
      {liste: [
        `**Primary category:** the single category that best describes your business, carrying the most ranking weight. Between close options ("Dental clinic" vs "Dentist", "Café" vs "Coffee shop"), choose the one closest to what customers search most.`,
        `**Additional categories:** you can add up to 9 more. Choose only categories that cover services you actually offer.`,
      ]},
      {alinti: `Practical method: run your target search on Google Maps and look at the primary category of the top 3–5 competitors. It's a strong hint about which category Google finds relevant for that query.`},
    ] },

    { baslik: `Step 4: Address, Service Area and Hours`, paragraflar: [
      {alt: `Address`},
      `Write your address formally and consistently. It should match exactly on your website, social profiles and directories — known as **NAP** (Name, Address, Phone) consistency.`,
      {alt: `Service-area businesses`},
      `If you serve customers at their location and don't receive them at your premises, hide your address and define your service areas (districts or cities). This is mandatory for home-based service businesses.`,
      {alt: `Hours and special days`},
      `Enter accurate opening hours and always use "special hours" for public holidays (in Turkey, Ramadan and Sacrifice Feast holidays, New Year). A customer turning up when you're closed can become a negative review.`,
    ] },

    { baslik: `Step 5: Description, Services and Products`, paragraflar: [
      {alt: `Business description`},
      `You can write up to 750 characters. The first 250 matter most, since that's often all users see. Answer:`,
      {liste: [
        `What do you do?`,
        `Who do you serve?`,
        `Which area do you serve?`,
        `What sets you apart?`,
      ]},
      `Don't include links, discount promotions or superlatives ("the best", "number one"). Use keywords naturally.`,
      {alt: `Services and products`},
      `Add each service separately with a short description. Businesses selling products can create product cards with photos. These sections help users and Google understand what you offer.`,
      {alt: `Attributes`},
      `Mark attributes like "Wheelchair accessible", "Parking available", "Women-led" or "Online appointments". They are used in filtered searches and AI answers.`,
    ] },

    { baslik: `Step 6: Photos and Videos`, paragraflar: [
      `Photos are the first impression before a customer visits. Uploading real photos regularly also shows the profile is active.`,
      {kontrol: [
        `Logo and cover photo`,
        `Exterior (different times of day, signage visible)`,
        `Interior`,
        `Team photos`,
        `Products or examples of work`,
        `Short introductory videos`,
      ]},
      `Avoid stock photos. Real, well-lit, current photos are more valuable for both trust and AI features. Adding location data to photo EXIF has no proven ranking effect.`,
    ] },

    { baslik: `Step 7: Review Strategy`, paragraflar: [
      `Reviews most affect both prominence and the customer's decision. Volume, rating, recency and content all matter.`,
      {alt: `How to ask for reviews`},
      {liste: [
        `Ask satisfied customers right after the service.`,
        `Share your profile's "Ask for reviews" link via SMS, email or QR code.`,
        `Ask customers to describe in their own words what they liked. Natural reviews mentioning services strengthen relevance.`,
      ]},
      {alt: `What never to do`},
      {liste: [
        `**Offer discounts, gifts or rewards for reviews.**`,
        `**Ask only happy customers (review gating).** Google prohibits this practice of discouraging negative reviews.`,
        `**Buy fake reviews or have employees write them.**`,
        `**Run bulk review campaigns:** many reviews in a short time can trigger spam filters.`,
      ]},
      `Google significantly tightened review policies and AI-assisted enforcement in 2025 and 2026. Violations can lead to removed reviews and restrictions on receiving new ones.`,
      {alt: `Reply to reviews`},
      `Reply to every review, positive or negative. For negative ones, don't get defensive: write a short reply that acknowledges the issue and offers a solution. Replies are written for every potential customer reading the profile, not just the reviewer.`,
    ] },

    { baslik: `Q&A Is Gone: Preparing for the "Ask Maps" Era`, paragraflar: [
      `One of the biggest changes of 2026 is the removal of the Q&A section from Google Business Profile.`,
      {liste: [
        `**November 2025:** the Q&A API was shut down.`,
        `**December 2025:** the public Q&A section began disappearing from profiles.`,
        `**2026:** Gemini-powered **"Ask Maps"** is rolling out gradually as the replacement, letting users ask natural-language questions about a business and get instant AI answers.`,
      ]},
      `Ask Maps isn't available in every region or category yet, but the direction is clear: questions about your business are now answered by AI, not by you.`,
      {alt: `Where does the AI get its answers?`},
      `Ask Maps and Gemini use your profile information, customer reviews, photos and website content. That means: **if your profile has gaps, the AI guesses.**`,
      {alt: `What to do`},
      {kontrol: [
        `List the 15–20 questions customers ask most`,
        `Enter operational answers (parking, payment methods, accessibility) as profile attributes`,
        `Add service-related answers to service descriptions and your website`,
        `Create a thorough FAQ page on your website`,
        `Address common topics naturally in review replies`,
        `Try Ask Maps on your own profile in Google Maps and check the answers`,
      ]},
      `This approach applies not only to Google's AI but also to platforms like ChatGPT. To test how your brand appears there, use our [ChatGPT visibility test](/en/blog/chatgpt-marka-gorunurlugu) guide.`,
    ] },

    { baslik: `Step 8: Posts (Google Posts)`, paragraflar: [
      `You can share updates, offers and events on your profile. The direct ranking effect of posts is debated, but they show an active profile and are a good place to drive action.`,
      {liste: [
        `Publish at least 2–4 posts per month.`,
        `Use a real photo and a clear call to action ("Book", "Call") in each.`,
        `Use "Offer" posts with start and end dates for promotions.`,
      ]},
    ] },

    { baslik: `Step 9: Connect Your Website`, paragraflar: [
      `Your profile and website should reinforce each other; Google considers your website when evaluating prominence.`,
      {liste: [
        `**Link to the right page:** the homepage for single-location businesses, each branch's own page for multi-location ones.`,
        `**Use an accessible site:** with its business links policy updated in September 2025, Google requires the linked site to be open to its crawlers. Bot blocking, CAPTCHAs or login walls can cause problems.`,
        `**Repeat NAP on the site:** show address, phone and hours in the same format.`,
        `**Add LocalBusiness structured data:** describe your business with schema.org LocalBusiness markup.`,
        `**Create regional pages:** if you serve several areas, create pages with genuinely unique information for each. Template pages that only swap district names create risk, not value.`,
      ]},
    ] },

    { baslik: `How to Measure Performance`, paragraflar: [
      `Your profile's performance panel shows:`,
      {tablo: {
        basliklar: ['Metric', 'What it shows'],
        satirlar: [
          ['Search and Maps views', 'How many times your profile was seen'],
          ['Searches used to find your profile', 'Which queries found you'],
          ['Calls', 'Phone calls made from the profile'],
          ['Website clicks', 'Visitors sent to your site'],
          ['Direction requests', 'Users wanting to visit'],
        ],
      }},
      {alt: `Add UTM parameters to your website link`},
      `Add UTM parameters to the website link on your profile to isolate this traffic in Google Analytics. For example:`,
      {kod: `https://yoursite.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`},
      `You can then see what profile visitors do on your site and how many convert.`,
      {alt: `Check rankings from different locations`},
      `Local rankings vary by search location. You may rank first outside your office yet be invisible two kilometers away. Local rank-tracking tools show your visibility across your service area on a map.`,
    ] },

    { baslik: `What to Do If Your Profile Is Suspended`, paragraflar: [
      `The most common causes of suspension:`,
      {liste: [
        `adding keywords or locations to the business name,`,
        `using a virtual office or non-genuine address,`,
        `a service-area business displaying its address,`,
        `changing many critical details (name, address, category) in a short time,`,
        `fake or incentivized reviews.`,
      ]},
      `If suspended, don't panic and open a new profile. First find and fix the violation, then appeal via Google's form with documents proving your business is real (tax certificate, signage photo, invoice).`,
      {alinti: `Important: screenshot your current information before making major changes, and update critical details gradually rather than all at once.`},
      {alt: `Competitors' spam violations`},
      `If competitors stuff keywords into names or create fake profiles, report it using "Suggest an edit" on Maps or Google's business profile complaint form.`,
    ] },

    { baslik: `For Businesses with Multiple Locations`, paragraflar: [
      {liste: [
        `Create a separate profile for each location, each with its own address, phone and hours.`,
        `Use the brand name consistently across locations.`,
        `Link each profile to a page with unique content for that location on your website.`,
        `Businesses with many locations can consider Google's bulk verification option.`,
        `Track reviews and photos separately for each location.`,
      ]},
    ] },

    { baslik: `Weekly and Monthly Maintenance Checklist`, paragraflar: [
      `Profile optimization isn't a one-off job. This routine keeps your profile current and strong:`,
      {alt: `Every week`},
      {kontrol: [
        `Reply to new reviews`,
        `Check user-suggested edits on the profile`,
        `Share at least one new photo or post`,
      ]},
      {alt: `Every month`},
      {kontrol: [
        `Compare performance metrics with the previous month`,
        `Confirm services, products and attributes are current`,
        `Enter special hours for upcoming holidays`,
        `Review changes on competitors' profiles`,
        `Check what Ask Maps (if available) says about your business`,
      ]},
    ] },

    { baslik: `Frequently Asked Questions`, paragraflar: [
      {alt: `Is Google Business Profile free?`},
      `Yes, creating and managing a profile is free. Google's local ad products are charged separately.`,
      {alt: `Are Google Business Profile and Google My Business the same?`},
      `Yes. Google My Business was renamed Google Business Profile in 2021.`,
      {alt: `Can a home-based business create a profile?`},
      `Yes, if you serve customers in person. If you don't receive customers at home, hide your address and set up as a service-area business.`,
      {alt: `Can I delete a negative review?`},
      `You can only report reviews that violate Google's policies (fake, abusive, off-topic). Reviews describing a real customer's negative experience won't be removed; the best approach is a professional, solution-focused reply.`,
      {alt: `Why isn't my profile ranking high on the map?`},
      `Common causes: wrong primary category, incomplete profile, fewer or older reviews than competitors, a weak website, or distance from the search point. Review category and profile completeness first, then your review strategy.`,
      {alt: `Why did my Q&A section disappear?`},
      `Google began removing Q&A in late 2025 and is replacing it with Gemini-powered Ask Maps. You now need to put answers to common questions into your profile information, service descriptions and website.`,
      `If you're considering professional help with local SEO, see the local SEO scope on our [SEO consulting](/en/seo-consulting) page. Our [SEO agency pricing](/en/blog/seo-ajansi-fiyatlari) guide can help with budgeting.`,
    ] },
  ],
}
