// ─────────────────────────────────────────────────────────────
// Yerel GEO uzmanı sayfaları — konum verileri
//
// URL: /{slug}-geo-uzmani   (ör. /kartal-geo-uzmani)
// Bu sayfalar bilinçli olarak hiçbir menüye, footer'a veya site içi
// aramaya bağlanmadı; yalnızca TR sitemap'te yer alırlar.
//
// Alanlar:
//   ad       : Görünen ad ("Kartal")
//   loc      : Bulunma hâli ("Kartal'da")
//   gen      : İlgi hâli ("Kartal'ın")
//   baglam   : İlçeye özgü, sayfaya özgün yerel bağlam paragrafı
//   sektorler: Yerel rekabetin yoğun olduğu sektörler
//   tur      : Örnek işletme türü ("hukuk bürosu")
//   isletme  : Örnek AI sorgusundaki işletme ("avukatlık büromuz")
// ─────────────────────────────────────────────────────────────

export const KONUMLAR = [
  {
    slug: 'istanbul', ad: 'İstanbul', loc: "İstanbul'da", gen: "İstanbul'un",
    baglam: "İstanbul dijital rekabetin en yüksek olduğu pazarlardan biridir.",
    sektorler: ['e-ticaret', 'sağlık', 'turizm', 'teknoloji', 'hukuk', 'eğitim', 'danışmanlık', 'üretim', 'finans', 'B2B hizmetler'],
    tur: 'B2B hizmet şirketi', isletme: 'şirketim',
  },
  // ── Anadolu Yakası ──
  {
    slug: 'adalar', ad: 'Adalar', loc: "Adalar'da", gen: "Adalar'ın",
    baglam: "Adalar'da ekonomik hayatın merkezinde turizm ve sezonluk ziyaretçi hareketi yer alıyor. Konaklama, yeme-içme ve organizasyon işletmeleri için ziyaret öncesinde yapılan araştırmalar, rezervasyon kararını doğrudan etkiliyor.",
    sektorler: ['turizm', 'butik otelcilik', 'restoran ve kafe işletmeciliği', 'organizasyon'],
    tur: 'butik otel', isletme: 'butik otelim',
  },
  {
    slug: 'atasehir', ad: 'Ataşehir', loc: "Ataşehir'de", gen: "Ataşehir'in",
    baglam: "Ataşehir, finans merkezi ve yoğun ofis kuleleriyle Anadolu Yakası'nın kurumsal iş merkezlerinden biri. Finans, sigorta ve teknoloji şirketleri burada çoğunlukla kurumsal müşterilere ulaşmaya çalışıyor ve satın alma kararları uzun bir araştırma sürecinden geçiyor.",
    sektorler: ['finans', 'sigorta', 'teknoloji', 'kurumsal danışmanlık', 'perakende'],
    tur: 'fintech şirketi', isletme: 'fintech şirketim',
  },
  {
    slug: 'beykoz', ad: 'Beykoz', loc: "Beykoz'da", gen: "Beykoz'un",
    baglam: "Beykoz, Boğaz hattındaki restoranları, korulukları ve geniş yeşil alanlarıyla turizm, yeme-içme ve konut odaklı bir ilçe. Hafta sonu ziyaretçileri de bölgeye taşınmayı düşünenler de karar vermeden önce kapsamlı bir araştırma yapıyor.",
    sektorler: ['turizm', 'restoran işletmeciliği', 'konaklama', 'gayrimenkul'],
    tur: 'restoran', isletme: 'Boğaz manzaralı restoranım',
  },
  {
    slug: 'cekmekoy', ad: 'Çekmeköy', loc: "Çekmeköy'de", gen: "Çekmeköy'ün",
    baglam: "Çekmeköy, Ömerli ve Taşdelen çevresindeki ormanlık alanlar ile yeni konut projelerinin buluştuğu, genç ailelerin yoğun olduğu bir ilçe. Okul, sağlık ve günlük hizmet arayışlarının önemli bir kısmı artık dijital kanallardan başlıyor.",
    sektorler: ['eğitim', 'sağlık', 'inşaat', 'perakende', 'gayrimenkul'],
    tur: 'özel anaokulu', isletme: 'özel anaokulum',
  },
  {
    slug: 'kadikoy', ad: 'Kadıköy', loc: "Kadıköy'de", gen: "Kadıköy'ün",
    baglam: "Kadıköy; Moda, Yeldeğirmeni ve Bağdat Caddesi çevresindeki kafe, restoran ve butik mağazalarıyla Anadolu Yakası'nın sosyal ve ticari merkezlerinden biri. Kültür, sağlık ve eğitim hizmetlerinin de yoğun olduğu ilçede aynı mahallede onlarca benzer işletme aynı kitleye hitap ediyor.",
    sektorler: ['yeme-içme', 'kültür ve sanat', 'sağlık', 'eğitim', 'butik perakende'],
    tur: 'kafe', isletme: 'kafe zincirim',
  },
  {
    slug: 'kartal', ad: 'Kartal', loc: "Kartal'da", gen: "Kartal'ın",
    baglam: "Kartal; Anadolu Adliyesi çevresindeki hukuk büroları, hastaneleri ve Yakacık-Soğanlık hattındaki sanayi ile kentsel dönüşüm projeleriyle Anadolu Yakası'nın önemli merkezlerinden biri. Profesyonel hizmetlerden üretime kadar farklı sektörler aynı ilçede yan yana rekabet ediyor.",
    sektorler: ['hukuk', 'sağlık', 'sanayi', 'lojistik', 'gayrimenkul'],
    tur: 'hukuk bürosu', isletme: 'avukatlık büromuz',
  },
  {
    slug: 'maltepe', ad: 'Maltepe', loc: "Maltepe'de", gen: "Maltepe'nin",
    baglam: "Maltepe; sahil parkı, üniversitesi, hastaneleri ve Bağdat Caddesi'nin uzantısındaki ticaret alanlarıyla Anadolu Yakası'nda hizmet sektörünün yoğun olduğu bir ilçe. Sağlık ve eğitim gibi güven gerektiren hizmetlerde kullanıcılar seçenekleri dikkatle karşılaştırıyor.",
    sektorler: ['sağlık', 'eğitim', 'perakende', 'gayrimenkul', 'yeme-içme'],
    tur: 'fizik tedavi merkezi', isletme: 'fizik tedavi merkezim',
  },
  {
    slug: 'pendik', ad: 'Pendik', loc: "Pendik'te", gen: "Pendik'in",
    baglam: "Pendik; Sabiha Gökçen Havalimanı, Teknopark İstanbul ve sahil hattındaki marina ile limanıyla havacılık, teknoloji ve denizcilik şirketlerinin bir arada bulunduğu bir ilçe. Bu şirketlerin önemli bir kısmı Türkiye'nin dört bir yanındaki ve yurt dışındaki iş ortaklarına dijital kanallardan ulaşıyor.",
    sektorler: ['teknoloji', 'havacılık', 'denizcilik', 'lojistik', 'sanayi'],
    tur: 'teknoloji girişimi', isletme: 'teknoloji girişimim',
  },
  {
    slug: 'sancaktepe', ad: 'Sancaktepe', loc: "Sancaktepe'de", gen: "Sancaktepe'nin",
    baglam: "Sancaktepe, yeni konut projeleri ve Samandıra çevresindeki sanayi ile ticaret alanlarıyla hızla büyüyen bir ilçe. Yapı, dekorasyon ve küçük üretim işletmeleri hem bireysel hem kurumsal müşterilere ulaşmak için dijital görünürlüğe giderek daha fazla ihtiyaç duyuyor.",
    sektorler: ['inşaat', 'yapı malzemeleri', 'küçük ve orta ölçekli üretim', 'perakende'],
    tur: 'alüminyum doğrama firması', isletme: 'alüminyum doğrama firmam',
  },
  {
    slug: 'sile', ad: 'Şile', loc: "Şile'de", gen: "Şile'nin",
    baglam: "Şile; plajları, butik otelleri ve Şile bezi gibi yerel ürünleriyle turizm ve sezonluk ziyaretçiler etrafında şekillenen bir ekonomiye sahip. Hafta sonu kaçamağı planlayan kullanıcılar konaklama ve yeme-içme seçeneklerini önceden araştırıyor.",
    sektorler: ['turizm', 'pansiyon ve butik otelcilik', 'yeme-içme', 'yerel el sanatları'],
    tur: 'pansiyon', isletme: 'pansiyonum',
  },
  {
    slug: 'sultanbeyli', ad: 'Sultanbeyli', loc: "Sultanbeyli'de", gen: "Sultanbeyli'nin",
    baglam: "Sultanbeyli; yoğun konut dokusu, mahalle ölçeğindeki ticareti ve küçük üretim işletmeleriyle büyük ölçüde yerel müşteriye dayalı bir ekonomiye sahip. Bu yapıda doğru yerel aramalarda görünmek, yeni müşteriye ulaşmanın en kısa yollarından biri.",
    sektorler: ['mobilya ve atölye üretimi', 'perakende', 'inşaat', 'yerel hizmetler'],
    tur: 'mobilya atölyesi', isletme: 'mobilya atölyem',
  },
  {
    slug: 'tuzla', ad: 'Tuzla', loc: "Tuzla'da", gen: "Tuzla'nın",
    baglam: "Tuzla; tersaneleri, kimya ve deri organize sanayi bölgeleri ve üniversiteleriyle sanayi ile B2B ticaretin yoğun olduğu bir ilçe. Buradaki üreticilerin müşterileri çoğu zaman tedarikçi araştırmasını teknik sorularla ve uzun bir karşılaştırma süreciyle yapıyor.",
    sektorler: ['denizcilik', 'kimya', 'sanayi üretimi', 'lojistik', 'eğitim'],
    tur: 'kimya firması', isletme: 'kimya firmam',
  },
  {
    slug: 'umraniye', ad: 'Ümraniye', loc: "Ümraniye'de", gen: "Ümraniye'nin",
    baglam: "Ümraniye; büyük şirket genel müdürlükleri, teknoloji firmaları ve perakende merkezleriyle Anadolu Yakası'nın en hızlı büyüyen iş bölgelerinden biri. Yazılım ve hizmet şirketleri için müşteri kazanımı büyük ölçüde dijital kanallarda başlayan araştırmalara dayanıyor.",
    sektorler: ['teknoloji', 'yazılım', 'kurumsal hizmetler', 'perakende', 'lojistik'],
    tur: 'B2B yazılım firması', isletme: 'B2B yazılım firmam',
  },
  {
    slug: 'uskudar', ad: 'Üsküdar', loc: "Üsküdar'da", gen: "Üsküdar'ın",
    baglam: "Üsküdar; tarihi çarşısı, Boğaz kıyısındaki Kuzguncuk ve Çengelköy gibi semtleri, hastaneleri ve üniversiteleriyle hem yerleşik halka hem ziyaretçilere hizmet veren köklü bir ilçe. Sağlık, eğitim ve danışmanlık gibi güvene dayalı hizmetlerde kullanıcılar karar vermeden önce detaylı sorular soruyor.",
    sektorler: ['sağlık', 'eğitim', 'psikolojik danışmanlık', 'turizm', 'yeme-içme'],
    tur: 'danışmanlık merkezi', isletme: 'psikolojik danışmanlık merkezim',
  },
  // ── Avrupa Yakası ──
  {
    slug: 'arnavutkoy', ad: 'Arnavutköy', loc: "Arnavutköy'de", gen: "Arnavutköy'ün",
    baglam: "İstanbul Havalimanı'na yakınlığı Arnavutköy'ü lojistik, depolama ve havalimanına bağlı hizmetler açısından öne çıkarıyor. Hızla gelişen konut ve sanayi alanları da yeni işletmelerin bölgeye yerleşmesini ve rekabetin artmasını sağlıyor.",
    sektorler: ['lojistik', 'depolama', 'havacılık hizmetleri', 'inşaat', 'gıda üretimi'],
    tur: 'lojistik firması', isletme: 'lojistik firmam',
  },
  {
    slug: 'avcilar', ad: 'Avcılar', loc: "Avcılar'da", gen: "Avcılar'ın",
    baglam: "Avcılar'da üniversite kampüsü çevresinde gelişen eğitim ve öğrenci odaklı hizmetler, sahil hattındaki konut bölgeleri ve E-5 çevresindeki ticaret aksı birlikte yoğun bir yerel rekabet oluşturuyor.",
    sektorler: ['eğitim', 'sağlık', 'perakende', 'gayrimenkul', 'yeme-içme'],
    tur: 'özel eğitim kurumu', isletme: 'özel eğitim kurumum',
  },
  {
    slug: 'bagcilar', ad: 'Bağcılar', loc: "Bağcılar'da", gen: "Bağcılar'ın",
    baglam: "Bağcılar; tekstil ve konfeksiyon atölyeleri, matbaa ve basım tesisleri, medya kuruluşları ve toptan ticaret yapan işletmeleriyle İstanbul'un yoğun üretim ve ticaret ilçelerinden biri. Bu işletmelerin önemli bir kısmı yurt içindeki ve yurt dışındaki toptan alıcılara dijital kanallardan ulaşmaya çalışıyor.",
    sektorler: ['tekstil', 'konfeksiyon', 'matbaacılık', 'medya', 'toptan ticaret'],
    tur: 'matbaa', isletme: 'matbaam',
  },
  {
    slug: 'bahcelievler', ad: 'Bahçelievler', loc: "Bahçelievler'de", gen: "Bahçelievler'in",
    baglam: "Bahçelievler, yoğun nüfusu ve E-5 ile Basın Ekspres arasındaki ticaret aksıyla perakende, sağlık ve eğitim hizmetlerinin yoğunlaştığı bir ilçe. Mahalle ölçeğindeki işletmelerden zincir markalara kadar pek çok firma aynı yerel kitle için yarışıyor.",
    sektorler: ['perakende', 'sağlık', 'eğitim', 'gayrimenkul', 'yerel hizmetler'],
    tur: 'diş kliniği', isletme: 'diş kliniğim',
  },
  {
    slug: 'bakirkoy', ad: 'Bakırköy', loc: "Bakırköy'de", gen: "Bakırköy'ün",
    baglam: "Bakırköy; köklü çarşısı, alışveriş merkezleri, hastaneleri ve adliye çevresindeki hukuk bürolarıyla Avrupa Yakası'nın en canlı hizmet merkezlerinden biri. Profesyonel hizmet arayan kullanıcılar burada uzmanlık ve güvenilirlik sinyallerine özellikle dikkat ediyor.",
    sektorler: ['hukuk', 'sağlık', 'perakende', 'yeme-içme', 'danışmanlık'],
    tur: 'hukuk bürosu', isletme: 'hukuk büromuz',
  },
  {
    slug: 'basaksehir', ad: 'Başakşehir', loc: "Başakşehir'de", gen: "Başakşehir'in",
    baglam: "Başakşehir, İkitelli Organize Sanayi Bölgesi'nin büyük bölümüne ev sahipliği yapması ve şehir hastanesi çevresinde gelişen sağlık ekosistemiyle hem üretim hem hizmet tarafında güçlü bir ilçe. Sanayi firmaları burada çoğunlukla yurt içi ve ihracat pazarındaki kurumsal alıcılara ulaşmaya çalışıyor.",
    sektorler: ['sanayi üretimi', 'makine imalatı', 'sağlık', 'inşaat', 'lojistik'],
    tur: 'makine üreticisi', isletme: 'makine üretim firmam',
  },
  {
    slug: 'bayrampasa', ad: 'Bayrampaşa', loc: "Bayrampaşa'da", gen: "Bayrampaşa'nın",
    baglam: "Bayrampaşa; hal çevresindeki toptan gıda ticareti, ayakkabı ve tekstil üretimi ile küçük sanayi işletmeleriyle ticaret hacmi yüksek bir ilçe. Toptancılar ve üreticiler için yeni alıcıya ulaşmanın yolu giderek daha fazla dijital aramalardan geçiyor.",
    sektorler: ['toptan gıda ticareti', 'ayakkabı üretimi', 'tekstil', 'küçük sanayi'],
    tur: 'ayakkabı üreticisi', isletme: 'ayakkabı üretim firmam',
  },
  {
    slug: 'besiktas', ad: 'Beşiktaş', loc: "Beşiktaş'ta", gen: "Beşiktaş'ın",
    baglam: "Beşiktaş; Levent ve Etiler çevresindeki şirket merkezleri, girişim ekosistemi ve kreatif ajanslarıyla İstanbul'un en rekabetçi iş bölgelerinden biri. Teknoloji ve hizmet şirketleri burada hem yerel hem global pazarlarda görünürlük için yarışıyor.",
    sektorler: ['teknoloji', 'girişimcilik', 'medya ve kreatif hizmetler', 'finans', 'yeme-içme'],
    tur: 'SaaS girişimi', isletme: 'SaaS girişimim',
  },
  {
    slug: 'beylikduzu', ad: 'Beylikdüzü', loc: "Beylikdüzü'nde", gen: "Beylikdüzü'nün",
    baglam: "Beylikdüzü; organize sanayi bölgesi, üniversiteleri ve yeni konut projeleriyle hızla büyüyen bir ilçe. Gayrimenkul, eğitim ve sanayi firmaları aynı coğrafyada farklı müşteri kitlelerine ulaşmaya çalışıyor.",
    sektorler: ['gayrimenkul', 'eğitim', 'sanayi', 'perakende', 'sağlık'],
    tur: 'emlak ofisi', isletme: 'emlak ofisim',
  },
  {
    slug: 'beyoglu', ad: 'Beyoğlu', loc: "Beyoğlu'nda", gen: "Beyoğlu'nun",
    baglam: "Beyoğlu; İstiklal Caddesi, Galata ve Karaköy çevresindeki oteller, galeriler, restoranlar ve kreatif stüdyolarıyla turizmin ve kültür ekonomisinin yoğunlaştığı bir ilçe. Ziyaretçilerin önemli bir kısmı gelmeden önce önerileri dijital kanallardan ve yapay zekâ araçlarından araştırıyor.",
    sektorler: ['turizm', 'otelcilik', 'kültür ve sanat', 'yeme-içme', 'kreatif hizmetler'],
    tur: 'butik otel', isletme: "Galata'daki butik otelim",
  },
  {
    slug: 'buyukcekmece', ad: 'Büyükçekmece', loc: "Büyükçekmece'de", gen: "Büyükçekmece'nin",
    baglam: "Büyükçekmece, göl ve sahil şeridi boyunca uzanan yerleşimi, yazlık konut bölgeleri ve gelişen ticaret alanlarıyla hem yerleşik hem sezonluk bir müşteri kitlesine sahip. İnşaat ve gayrimenkul tarafında rekabet özellikle yoğun.",
    sektorler: ['inşaat', 'gayrimenkul', 'turizm', 'perakende', 'yeme-içme'],
    tur: 'inşaat firması', isletme: 'inşaat firmam',
  },
  {
    slug: 'catalca', ad: 'Çatalca', loc: "Çatalca'da", gen: "Çatalca'nın",
    baglam: "Çatalca; tarım arazileri, çiftlikleri ve kırsal turizm işletmeleriyle İstanbul'un en geniş yüzölçümlü ilçelerinden biri. Buradaki üreticilerin ve işletmelerin önemli bir kısmı müşterilerine şehir merkezinden, hatta Türkiye genelinden çevrim içi olarak ulaşıyor.",
    sektorler: ['tarım', 'gıda üretimi', 'hayvancılık', 'kırsal turizm'],
    tur: 'çiftlik', isletme: 'çiftlik ürünlerini online satan işletmem',
  },
  {
    slug: 'esenler', ad: 'Esenler', loc: "Esenler'de", gen: "Esenler'in",
    baglam: "Esenler; tekstil atölyeleri, küçük ve orta ölçekli üretim işletmeleri ve güçlü ulaşım bağlantılarıyla üretim ile ticaretin iç içe geçtiği bir ilçe. Üreticiler için toptan alıcılara ve iş ortaklarına ulaşmak giderek daha fazla dijital görünürlüğe bağlı.",
    sektorler: ['tekstil', 'metal işleme', 'toptan ticaret', 'ulaşım hizmetleri'],
    tur: 'tekstil atölyesi', isletme: 'tekstil atölyem',
  },
  {
    slug: 'esenyurt', ad: 'Esenyurt', loc: "Esenyurt'ta", gen: "Esenyurt'un",
    baglam: "Esenyurt, İstanbul'un en kalabalık ilçesi olarak konut, inşaat, perakende ve lojistik alanlarında yoğun bir ticari hareketliliğe sahip. Bu büyüklükte bir pazarda aynı hizmeti sunan çok sayıda işletme arasından sıyrılmak kolay değil.",
    sektorler: ['inşaat', 'perakende', 'mobilya', 'lojistik', 'eğitim'],
    tur: 'mobilya mağazası', isletme: 'mobilya mağazam',
  },
  {
    slug: 'eyupsultan', ad: 'Eyüpsultan', loc: "Eyüpsultan'da", gen: "Eyüpsultan'ın",
    baglam: "Eyüpsultan; tarihi Eyüp Sultan çevresindeki inanç turizmi, Göktürk ve Kemerburgaz'daki yeni yaşam alanları ve Alibeyköy'deki ticaret bölgeleriyle çok farklı müşteri profillerini bir arada barındırıyor.",
    sektorler: ['turizm', 'gayrimenkul', 'sağlık', 'perakende', 'veterinerlik ve evcil hayvan hizmetleri'],
    tur: 'veteriner kliniği', isletme: "Göktürk'teki veteriner kliniğim",
  },
  {
    slug: 'fatih', ad: 'Fatih', loc: "Fatih'te", gen: "Fatih'in",
    baglam: "Fatih; Sultanahmet'in tarihi yarımadası, Kapalıçarşı ve Eminönü çarşıları ile Laleli'nin toptan ticaretiyle hem turizmin hem de ticaretin kalbi. Yerli ve yabancı ziyaretçiler ile toptan alıcılar, karar vermeden önce seçenekleri giderek daha sık yapay zekâ araçlarına soruyor.",
    sektorler: ['turizm', 'otelcilik', 'toptan tekstil', 'kuyumculuk', 'hediyelik eşya'],
    tur: 'otel', isletme: "Sultanahmet'teki otelim",
  },
  {
    slug: 'gaziosmanpasa', ad: 'Gaziosmanpaşa', loc: "Gaziosmanpaşa'da", gen: "Gaziosmanpaşa'nın",
    baglam: "Gaziosmanpaşa; yoğun nüfusu, mahalle çarşıları ve tekstil ile küçük üretim işletmeleriyle yerel ticaretin güçlü olduğu bir ilçe. Sağlık ve kişisel hizmetlerde kullanıcılar en yakın ve en güvenilir seçeneği hızla bulmak istiyor.",
    sektorler: ['sağlık', 'perakende', 'tekstil', 'küçük üretim', 'yerel hizmetler'],
    tur: 'diş kliniği', isletme: 'diş kliniğim',
  },
  {
    slug: 'gungoren', ad: 'Güngören', loc: "Güngören'de", gen: "Güngören'in",
    baglam: "Güngören, Merter'in hazır giyim ve tekstil toptancılığıyla Türkiye'nin moda ticaretinde önemli bir merkez. Toptan alıcıların bir kısmı tedarikçi araştırmasını artık yurt dışından ve çevrim içi kanallardan yapıyor.",
    sektorler: ['hazır giyim', 'tekstil toptancılığı', 'moda', 'e-ticaret'],
    tur: 'hazır giyim toptancısı', isletme: 'hazır giyim toptan firmam',
  },
  {
    slug: 'kagithane', ad: 'Kağıthane', loc: "Kağıthane'de", gen: "Kağıthane'nin",
    baglam: "Kağıthane, eski sanayi alanlarının dönüşümüyle yükselen ofis projeleri ve Levent-Maslak aksına yakınlığıyla şirket merkezlerinin giderek arttığı bir ilçe. Teknoloji ve hizmet şirketleri burada çoğunlukla kurumsal müşterilere ulaşmaya çalışıyor.",
    sektorler: ['yazılım', 'kurumsal hizmetler', 'medya', 'inşaat', 'gayrimenkul'],
    tur: 'yazılım şirketi', isletme: 'yazılım şirketim',
  },
  {
    slug: 'kucukcekmece', ad: 'Küçükçekmece', loc: "Küçükçekmece'de", gen: "Küçükçekmece'nin",
    baglam: "Küçükçekmece; Halkalı'daki lojistik ve ulaşım bağlantıları, göl çevresindeki yaşam alanları ve geniş ticaret bölgeleriyle Avrupa Yakası'nın büyük ilçelerinden biri. Nakliye ve lojistikten perakendeye kadar pek çok sektör aynı coğrafyada yoğun rekabet içinde.",
    sektorler: ['lojistik', 'nakliye', 'perakende', 'eğitim', 'sağlık'],
    tur: 'nakliye şirketi', isletme: 'nakliye şirketim',
  },
  {
    slug: 'sariyer', ad: 'Sarıyer', loc: "Sarıyer'de", gen: "Sarıyer'in",
    baglam: "Sarıyer; Maslak'taki plazalar, üniversite kampüsleri ve Boğaz kıyısındaki restoranlarıyla kurumsal iş dünyası ile turizmi aynı ilçede buluşturuyor. Danışmanlık ve profesyonel hizmet firmaları burada uzmanlıklarını kurumsal karar vericilere kanıtlamak zorunda.",
    sektorler: ['kurumsal danışmanlık', 'finans', 'eğitim', 'turizm', 'yeme-içme'],
    tur: 'danışmanlık şirketi', isletme: 'danışmanlık şirketim',
  },
  {
    slug: 'silivri', ad: 'Silivri', loc: "Silivri'de", gen: "Silivri'nin",
    baglam: "Silivri; tarım ve gıda üretimi, sahil boyundaki yazlık bölgeleri ve gelişen sanayi alanlarıyla İstanbul'un batı ucunda kendine özgü bir ekonomik yapıya sahip. Yerel üreticiler ürünlerini giderek daha fazla çevrim içi kanallar üzerinden satıyor.",
    sektorler: ['gıda üretimi', 'süt ürünleri', 'tarım', 'turizm', 'sanayi'],
    tur: 'süt ürünleri üreticisi', isletme: 'süt ürünleri firmam',
  },
  {
    slug: 'sultangazi', ad: 'Sultangazi', loc: "Sultangazi'de", gen: "Sultangazi'nin",
    baglam: "Sultangazi; genç nüfusu, yeni konut alanları ve mahalle ticaretiyle hizmet işletmelerinin yerel görünürlüğe özellikle ihtiyaç duyduğu bir ilçe. Eğitim ve kişisel hizmetlerde aileler seçim yapmadan önce çevrim içi araştırmaya ağırlık veriyor.",
    sektorler: ['eğitim', 'perakende', 'sağlık', 'inşaat', 'yerel hizmetler'],
    tur: 'kurs merkezi', isletme: 'kurs merkezim',
  },
  {
    slug: 'sisli', ad: 'Şişli', loc: "Şişli'de", gen: "Şişli'nin",
    baglam: "Şişli; Mecidiyeköy ve Esentepe'deki ofisleri, Osmanbey'in tekstil ve moda ticareti ve özel hastaneleriyle İstanbul'un en yoğun iş merkezlerinden biri. Sağlık turizminden kurumsal hizmetlere kadar pek çok alanda yerli ve yabancı müşteriler için rekabet ediliyor.",
    sektorler: ['sağlık', 'estetik ve sağlık turizmi', 'moda ve tekstil', 'kurumsal hizmetler', 'perakende'],
    tur: 'estetik kliniği', isletme: 'estetik kliniğim',
  },
  {
    slug: 'zeytinburnu', ad: 'Zeytinburnu', loc: "Zeytinburnu'nda", gen: "Zeytinburnu'nun",
    baglam: "Zeytinburnu; tekstil ve deri sektöründeki köklü geçmişi, toptan satış merkezleri ve sahil hattındaki yeni projeleriyle üretim ve ticaretin bir arada yürüdüğü bir ilçe. Buradaki üreticilerin önemli bir kısmı ihracat pazarlarındaki alıcılara ulaşmaya çalışıyor.",
    sektorler: ['deri ürünleri', 'tekstil', 'toptan ticaret', 'sağlık', 'gayrimenkul'],
    tur: 'deri ürünleri firması', isletme: 'deri ürünleri firmam',
  },
]

export const konumBul = (sayfaSlug) =>
  KONUMLAR.find(k => `${k.slug}-geo-uzmani` === sayfaSlug) || null

export const KONUM_SAYFA_SLUGLARI = KONUMLAR.map(k => `${k.slug}-geo-uzmani`)
