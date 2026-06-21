import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const SORULAR_TR = [
  // ARAMA & TEKNİK SEO
  { kategori: 'Arama & Teknik SEO', soru: 'GEO (Generative Engine Optimization) nedir?', cevap: 'GEO, yapay zekâ destekli arama motorlarında (Google AI Overview, Bing Copilot, Perplexity vb.) içeriklerinizin kaynak olarak gösterilmesini ve öne çıkmasını sağlayan optimizasyon sürecidir. Klasik SEO\'nun bir adım ötesinde, LLM tabanlı sistemlerin içeriğinizi anlayıp referans göstermesine odaklanır.' },
  { kategori: 'Arama & Teknik SEO', soru: 'AI SEO nedir, klasik SEO\'dan farkı ne?', cevap: 'AI SEO, yapay zekâ algoritmalarının arama sonuçlarını şekillendirdiği yeni nesil optimizasyon yaklaşımıdır. Klasik SEO anahtar kelime ve link odaklıyken, AI SEO içeriğin anlamsal derinliğine, E-E-A-T sinyallerine ve yapay zekâ modellerinin içeriği nasıl yorumladığına odaklanır.' },
  { kategori: 'Arama & Teknik SEO', soru: 'Core Web Vitals neden bu kadar önemli?', cevap: 'Core Web Vitals, Google\'ın resmi sıralama sinyali olarak kullandığı kullanıcı deneyimi metrikleridir. LCP (yükleme hızı), INP (etkileşim) ve CLS (görsel kararlılık) — bu üç metrikte zayıf performans, teknik açıdan iyi optimize edilmiş bir siteyi bile sıralamada geri düşürebilir.' },
  { kategori: 'Arama & Teknik SEO', soru: 'Crawl bütçesi nedir ve nasıl optimize edilir?', cevap: 'Crawl bütçesi, Googlebot\'un sitenizde belirli bir sürede tarayabileceği URL sayısıdır. Gereksiz parametre URL\'leri, thin content sayfalar ve yinelenen içerikler bu bütçeyi boşa harcatır. robots.txt, canonical tag ve internal link yapısıyla optimize edilir.' },
  { kategori: 'Arama & Teknik SEO', soru: 'Schema markup ne işe yarar?', cevap: 'Schema markup (yapılandırılmış veri), arama motorlarına içeriğinizin ne anlama geldiğini makine-okunabilir formatta anlatır. Doğru schema ile zengin sonuçlar (rich results), AI Overview kaynakları arasında görünme ve Knowledge Graph\'ta yer alma şansınız artar.' },
  { kategori: 'Arama & Teknik SEO', soru: 'Hreflang etiketi ne zaman kullanılır?', cevap: 'Hreflang, çok dilli veya çok bölgeli sitelerde her sayfanın hangi dil ve ülke için hedeflendiğini arama motorlarına bildirir. Yanlış implementasyon duplicate content sorununa ve yanlış sayfaların yanlış ülkelerde sıralanmasına yol açar.' },
  { kategori: 'Arama & Teknik SEO', soru: 'Canonical tag nasıl doğru kullanılır?', cevap: 'Canonical tag, birden fazla URL\'de benzer içerik bulunduğunda tercih edilen sayfayı işaret eder. E-ticaret filtre sayfaları, URL parametreleri ve HTTPS/HTTP varyasyonlarında kritiktir. Her sayfa kendi kendine canonical göstermelidir.' },
  { kategori: 'Arama & Teknik SEO', soru: 'Sayfa hızı SEO\'yu nasıl etkiler?', cevap: 'Sayfa hızı hem doğrudan sıralama faktörü hem de kullanıcı deneyimi metriğidir. Yavaş sayfalar bounce rate\'i artırır, dönüşümü düşürür ve Googlebot\'un daha az sayfa taramasına neden olur. 2.5 saniye altı LCP hedeflenmeli.' },
  { kategori: 'Arama & Teknik SEO', soru: 'XML sitemap oluşturmanın doğru yolu nedir?', cevap: 'XML sitemap, arama motorlarına site yapınızı ve öncelikli sayfalarınızı bildiren bir rehberdir. Dinamik olmalı, yalnızca indexlenmesini istediğiniz URL\'leri içermeli ve Search Console\'a submit edilmeli. 50.000 URL\'yi aşan siteler için bölünmüş sitemaplar gereklidir.' },
  { kategori: 'Arama & Teknik SEO', soru: 'Duplicate content sorunu nasıl tespit edilir?', cevap: 'Duplicate content tespiti için Screaming Frog, Siteliner veya SEMrush Site Audit araçları kullanılır. HTTP/HTTPS, www/non-www, trailing slash farkları ve parametre URL\'leri en yaygın duplicate content kaynaklarıdır.' },
  
  // AI ARAMA
  { kategori: 'AI Arama', soru: 'Google AI Overview\'da nasıl kaynak olunur?', cevap: 'AI Overview\'da kaynak olmak için içeriğin doğrudan soruyu yanıtlayan, özet çıkarılabilir yapıda olması gerekir. Giriş paragrafının soruya net yanıt vermesi, E-E-A-T sinyallerinin güçlü olması ve FAQPage schema kullanımı başlangıç noktalarıdır.' },
  { kategori: 'AI Arama', soru: 'LLMs.txt dosyası ne işe yarar?', cevap: 'LLMs.txt, web sitelerinin yapay zekâ sistemlerine içeriklerini nasıl kullanmalarını istediklerini bildirdiği standart bir dosyadır. robots.txt\'in AI eşdeğeri olarak düşünülebilir. GEO stratejisinin teknik temel taşlarından biridir.' },
  { kategori: 'AI Arama', soru: 'Perplexity\'de görünürlük nasıl artırılır?', cevap: 'Perplexity büyük ölçüde web arama sonuçlarını ve otoriter kaynaklara dayanan RAG mimarisini kullanır. Orijinal araştırma, güncel veri, uzman alıntıları ve net kaynak gösterimleri içeren içerikler Perplexity\'de kaynak seçilme olasılığını artırır.' },
  { kategori: 'AI Arama', soru: 'ChatGPT Search optimizasyonu nasıl yapılır?', cevap: 'ChatGPT Search, Bing indeksini ve web kaynaklarını kullanır. İyi bir Bing SEO, temiz teknik yapı, hızlı yükleme ve net yapılandırılmış içerik ChatGPT Search\'te görünürlüğün temelini oluşturur. Ayrıca OpenAI\'ın GPTBot crawlerine izin verilmesi önemlidir.' },
  { kategori: 'AI Arama', soru: 'Entity SEO nedir?', cevap: 'Entity SEO, arama motorlarının gerçek dünya varlıklarını (kişi, yer, ürün, kavram) tanıması için içeriği ve teknik yapıyı optimize etme pratiğidir. Knowledge Graph\'ta yer almak, AI sistemlerinde kaynak seçilme şansını önemli ölçüde artırır.' },
  { kategori: 'AI Arama', soru: 'Answer Engine Optimization (AEO) nedir?', cevap: 'AEO, yanıt motorlarında (Perplexity, ChatGPT, You.com) içeriklerin kaynak olarak görünmesini sağlayan optimizasyon yaklaşımıdır. Soru-cevap formatındaki içerik yapısı, net tanımlar ve özet çıkarılabilir bölümler AEO\'nun temelidir.' },
  { kategori: 'AI Arama', soru: 'RAG (Retrieval-Augmented Generation) SEO\'yu nasıl etkiliyor?', cevap: 'RAG mimarisi, LLM\'lerin gerçek zamanlı kaynaklara erişerek yanıt ürettiği sistemdir. Bu mimaride içeriğinizin kaynak seçilmesi için otoriter, güvenilir ve yapılandırılmış içerik üretmek kritiktir. Vektör benzerliği açısından semantik derinlik önemlidir.' },
  { kategori: 'AI Arama', soru: 'AI Overview CTR\'yi nasıl etkiliyor?', cevap: 'AI Overview\'un yaygınlaşmasıyla birçok arama sorgusu zero-click sonuçlanmaktadır. Ancak AI Overview kaynaklarına dahil olmak, marka bilinirliği ve otorite açısından değerlidir. Long-tail ve araştırma bazlı sorgularda organik trafik etkisi daha sınırlı kalır.' },
  { kategori: 'AI Arama', soru: 'Grounding nedir, içerik stratejisini nasıl etkiler?', cevap: 'Grounding, LLM\'lerin yanıtlarını doğrulanabilir kaynaklara dayandırma sürecidir. Orijinal veriler, araştırma atıfları, uzman görüşleri ve net kaynak gösterimi içeriklerin grounding kaynağı olarak seçilme olasılığını artırır.' },
  { kategori: 'AI Arama', soru: 'Bing Copilot optimizasyonu nedir?', cevap: 'Bing Copilot, GPT-4 tabanlı yapay zekâ arama deneyimidir. Bing indeksinde iyi sıralanan, Bing Webmaster Tools\'ta doğrulanmış ve temiz teknik yapıya sahip siteler Copilot\'ta kaynak olarak görünme şansına sahiptir.' },
  { kategori: 'AI Arama', soru: 'Yapay zekâ için içerik nasıl yazılmalı?', cevap: 'AI sistemleri için içerik yazarken: net ve doğrudan yanıtlar verin, tanımları eksiksiz yapın, sayısal veriler ve araştırma atıfları ekleyin, soru-cevap formatını kullanın, uzun formlu ve derinlikli içerikler oluşturun ve E-E-A-T sinyallerini güçlendirin.' },

  // E-TİCARET & PLATFORM
  { kategori: 'E-Ticaret & Platform', soru: 'E-ticaret SEO\'su diğerlerinden neden farklı?', cevap: 'E-ticaret SEO\'su ölçek, dinamizm ve dönüşüm odağı nedeniyle farklıdır. Binlerce ürün sayfası, filtreleme URL\'leri, faceted navigation sorunları, varyant URL yönetimi ve stok değişimlerine bağlı içerik tutarsızlıkları özel yaklaşım gerektirir.' },
  { kategori: 'E-Ticaret & Platform', soru: 'Kategori sayfaları nasıl optimize edilir?', cevap: 'Kategori sayfaları SEO değerinin en yüksek olduğu e-ticaret sayfalarıdır. Benzersiz açıklama metinleri, breadcrumb navigasyonu, iç linkleme, ürün filtreleme URL yönetimi ve doğru başlık hiyerarşisi optimizasyonun temelini oluşturur.' },
  { kategori: 'E-Ticaret & Platform', soru: 'Shopify SEO\'su nasıl optimize edilir?', cevap: 'Shopify\'da /collections/ ve /products/ URL yapısı sabittir, canonical yönetimi kritiktir. Tema hızı optimizasyonu, liquid template içerik iyileştirmesi, uygulama şişkinliğinden kaçınma ve blog bölümünün aktif kullanımı temel Shopify SEO stratejileridir.' },
  { kategori: 'E-Ticaret & Platform', soru: 'WooCommerce SEO için en iyi uygulamalar neler?', cevap: 'WooCommerce için: Yoast SEO veya RankMath kurulumu, sayfa hızı optimizasyonu (WP Rocket, WebP görsel dönüşümü), ürün schema markup, review markup entegrasyonu ve XML sitemap optimizasyonu öncelikli adımlardır.' },
  { kategori: 'E-Ticaret & Platform', soru: 'Programatik SEO nedir?', cevap: 'Programatik SEO, şablonlar ve veri kullanarak büyük ölçekte otomatik sayfa üretme stratejisidir. Şehir bazlı hizmet sayfaları, ürün varyantları ve karşılaştırma sayfaları programatik SEO\'nun tipik kullanım alanlarıdır. İçerik kalitesi ve benzersizlik kritik risk noktalarıdır.' },
  { kategori: 'E-Ticaret & Platform', soru: 'Faceted navigation (yönlü navigasyon) sorunu nasıl çözülür?', cevap: 'Faceted navigation, filtreleme parametrelerinin kombinasyonuyla oluşan URL patlaması sorununa yol açar. Çözüm için: JavaScript bazlı filtreleme (URL üretmeden), canonical tag uygulaması, robots.txt ile taramayı engelleme veya noindex kullanımı değerlendirilir.' },
  { kategori: 'E-Ticaret & Platform', soru: 'Ürün görselleri SEO\'ya katkı sağlar mı?', cevap: 'Evet. Doğru dosya adları, alt text optimizasyonu, WebP formatı, lazy loading ve görsel site haritası hem genel SEO\'ya hem Google Görsel arama trafiğine katkı sağlar. Özellikle mobilin ağırlık kazandığı kategorilerde kritiktir.' },
  { kategori: 'E-Ticaret & Platform', soru: 'Stokta olmayan ürün sayfaları nasıl yönetilir?', cevap: 'Stokta olmayan ürünler için kararlar: Kalıcı kaldırıma için 301 yönlendirme, geçici durumlar için noindex veya "yeniden stokta" mesajı, yüksek trafik/bağlantı değeri olan sayfalar için ilgili ürüne yönlendirme stratejisi belirlenir.' },
  { kategori: 'E-Ticaret & Platform', soru: 'Yerel SEO e-ticaret için gerekli mi?', cevap: 'Fiziksel mağaza olan e-ticaret işletmeleri için yerel SEO kritiktir. Google Business Profile optimizasyonu, şehir bazlı açılış sayfaları, NAP (ad-adres-telefon) tutarlılığı ve yerel backlink inşası bu strateji kapsamındadır.' },
  { kategori: 'E-Ticaret & Platform', soru: 'Amazon ürünleri için SEO stratejisi nasıl olmalı?', cevap: 'Amazon SEO (A9/A10 algoritması) için: anahtar kelime araştırması (backend keywords dahil), başlık optimizasyonu, bullet points, A+ content ve yorumların aktif yönetimi kritiktir. External traffic (Google → Amazon) ürün sıralamasını olumlu etkiler.' },
  { kategori: 'E-Ticaret & Platform', soru: 'B2B e-ticaret SEO\'su nasıl farklılaşır?', cevap: 'B2B SEO uzun alım döngüsüne göre şekillenir. Teknik içerik (white paper, vaka çalışmaları), endüstri spesifik anahtar kelimeler, gated content stratejisi ve LinkedIn bağlantılarıyla topical authority inşası B2B SEO\'nun temel bileşenleridir.' },

  // STRATEJI
  { kategori: 'Strateji', soru: 'Topical authority nedir ve neden önemli?', cevap: 'Topical authority, belirli bir konu alanını kapsamlı biçimde ele alan sitenin arama motorları tarafından uzman kaynak olarak tanınmasıdır. Pillar-cluster içerik modeli topical authority inşasının temel metodolojisidir.' },
  { kategori: 'Strateji', soru: 'E-E-A-T sinyalleri nasıl güçlendirilir?', cevap: 'Experience (deneyim): Kişisel deneyim içerikleri. Expertise (uzmanlık): Yazar biyografileri, sertifikalar. Authoritativeness (otorite): Sektör yayınlarında yer alma, backlinkler. Trustworthiness (güven): HTTPS, şeffaf politikalar, iletişim bilgileri.' },
  { kategori: 'Strateji', soru: 'Pillar-cluster içerik modeli nasıl kurulur?', cevap: 'Pillar sayfa: Ana konuyu kapsamlı ele alan tek sayfa. Cluster sayfalar: Alt konuları derinlemesine işleyen sayfalar. Her cluster sayfası pillar\'a linklenmeli, pillar ise cluster\'lara bağlanmalıdır. Bu yapı hem kullanıcı deneyimini hem semantik bağlantıyı güçlendirir.' },
  { kategori: 'Strateji', soru: 'Keyword cannibalization nedir?', cevap: 'Aynı anahtar kelime için birden fazla sayfanın sıralandığı, sayfaların birbiriyle rekabet ettiği durumdur. İç konsolidasyon, canonical tag veya 301 yönlendirme ile çözülür. Screaming Frog ve Search Console ile tespit edilir.' },
  { kategori: 'Strateji', soru: 'SEO için içerik güncellemesi ne sıklıkta yapılmalı?', cevap: 'Hızlı değişen sektörlerde (finans, teknoloji, sağlık) 3-6 ayda bir güncelleme önerilir. Evergreen içerikler için yılda bir kapsamlı revizyon yeterlidir. Search Console\'da trafik düşüşü gösteren sayfalar öncelikle ele alınmalıdır.' },
  { kategori: 'Strateji', soru: 'Arama niyeti (search intent) nasıl analiz edilir?', cevap: '4 temel niyet türü: Informational (bilgi arama), Navigational (site arama), Commercial (karşılaştırma), Transactional (satın alma). SERP sonuçlarını incelemek en güvenilir niyet tespiti yöntemidir. İçerik formatı niyetle uyumlu olmalıdır.' },
  { kategori: 'Strateji', soru: 'Rakip analizi nasıl yapılır?', cevap: 'Rakip analizi: Organik anahtar kelime örtüşmesi (Ahrefs/SEMrush), backlink profili karşılaştırması, içerik boşlukları tespiti, SERP özelliklerinde görünürlük analizi ve teknik SEO karşılaştırması adımlarını kapsar.' },
  { kategori: 'Strateji', soru: 'Yeni bir site için SEO nasıl başlar?', cevap: 'Yeni sitede öncelik sırası: Teknik altyapı (hız, SSL, crawlability), anahtar kelime araştırması ve içerik planı, pillar-cluster yapısının kurulması, Google Search Console ve Analytics entegrasyonu, temel backlink inşası.' },
  { kategori: 'Strateji', soru: 'SEO yatırımının geri dönüşü nasıl ölçülür?', cevap: 'SEO ROI ölçümü için: Organik trafik değeri (ödemeye gerek kalmayan tıklama maliyeti), dönüşüm başına organik maliyet, marka görünürlüğü ve sıralama gelişimi izlenir. GA4 attribution modeli ve Search Console verileri kullanılır.' },
  { kategori: 'Strateji', soru: 'Mevsimsel SEO planlaması nasıl yapılır?', cevap: 'Mevsimsel içerikler için: Google Trends ile arama hacmi döngüsü analizi, kampanya öncesi 3-4 ay içerik üretimi başlatma, geçici sayfalar yerine güncellenen kalıcı sayfalar kullanma ve önceki yıl verilerine göre tahminleme yapılır.' },
  { kategori: 'Strateji', soru: 'Featured snippet nasıl kazanılır?', cevap: 'Featured snippet için: Paragraf, liste veya tablo formatında doğrudan soruya yanıt verin. H2/H3 başlık altında netto yanıt paragrafı oluşturun. 40-60 kelime arası özet içerik en yüksek snippet kazanım oranına sahiptir.' },

  // BACKLINK & OTORİTE
  { kategori: 'Backlink & Otorite', soru: 'Kaliteli backlink nasıl inşa edilir?', cevap: 'Kaliteli backlink stratejileri: Orijinal araştırma ve veri yayınlama (linklenmeye değer içerik), konuk yazarlık, dijital PR, broken link building, rakiplerin kayıp bağlantılarını hedefleme ve sektör rehberlerine kayıt.' },
  { kategori: 'Backlink & Otorite', soru: 'Toksik backlinkler nasıl tespit edilir ve temizlenir?', cevap: 'Toksik backlink tespiti için Ahrefs veya SEMrush toxicity skorları kullanılır. Spam, link farm, alakasız niş siteleri ve manipülatif anchor text örüntüleri işaretlenir. Google Disavow aracıyla reddedilebilir, ancak bu süreç dikkatli yönetilmelidir.' },
  { kategori: 'Backlink & Otorite', soru: 'Dijital PR ve SEO nasıl birleştirilir?', cevap: 'Dijital PR: Orijinal araştırma ve anket verilerini medyaya sunarak editoryal backlinkler kazanma stratejisidir. Türkiye\'de sektör medyası, haber siteleri ve endüstri yayınları hedef alınabilir. Newsworthiness (haber değeri) kritik başarı faktörüdür.' },
  { kategori: 'Backlink & Otorite', soru: 'Anchor text dağılımı nasıl olmalı?', cevap: 'Doğal anchor text dağılımı: Branded (%40-50), Generic (%20-25), Partial match (%15-20), Exact match (%5-10), Naked URL (%5-10). Aşırı exact match anchor text Google Penguin algoritmasını tetikleyebilir.' },
  { kategori: 'Backlink & Otorite', soru: 'Internal link stratejisi nasıl kurulur?', cevap: 'İç link stratejisi: En değerli sayfalara en fazla iç link akışı, breadcrumb navigasyonu, footer ve header linkleme, içerik içi bağlamsal linkler. PageRank\'in değerli sayfaya yönlendirilmesi için pillar sayfalar önceliklendirilir.' },
  { kategori: 'Backlink & Otorite', soru: 'Link değerini ölçmenin yolları neler?', cevap: 'Link değeri için: Domain Rating/Authority (Ahrefs/Moz), trafik miktarı ve kalitesi, kaynak sayfanın konuya alakalılığı, indexlenme durumu, dofollow/nofollow ayrımı ve sitenin genel güven skoru değerlendirilir.' },
  { kategori: 'Backlink & Otorite', soru: 'HARO (Help A Reporter Out) ile backlink kazanımı', cevap: 'HARO, gazetecilerin kaynak aradığı bir platformdur. Uzmanlık alanınızdaki sorulara yanıt vererek otoriter medya kuruluşlarından editoryal backlinkler kazanabilirsiniz. Yanıt hızı ve içerik kalitesi başarının anahtarıdır.' },
  { kategori: 'Backlink & Otorite', soru: 'Backlink satın almak riskli mi?', cevap: 'Google\'ın link satın alma politikasına aykırı olan ücretli backlink alışverişi, Google cezası ve sıralama kaybı riskiyle birlikte gelir. Editoryal kanallar ve değerli içerik üretimi, uzun vadede daha güvenli ve sürdürülebilir alternatiftir.' },
  { kategori: 'Backlink & Otorite', soru: 'Broken link building stratejisi nasıl uygulanır?', cevap: 'Broken link building: Hedef sitede kırık dış linkler tespit edin (Ahrefs), kırık linkin orijinal içeriğine benzer içerik oluşturun, site sahibine hem kırık link bilgisini hem alternatif içeriğinizi bildirin. Yüksek dönüşüm oranı sunar.' },
  { kategori: 'Backlink & Otorite', soru: 'Domain otorite vs. sayfa otoritesi farkı nedir?', cevap: 'Domain Authority (DA): Tüm sitenin bağlantı profiline dayalı genel güç skoru. Page Authority (PA): Belirli bir sayfanın bağlantı gücü. Sıralama tahmininde PA daha spesifik olmakla birlikte, her ikisi de yaklaşık göstergedir.' },
  { kategori: 'Backlink & Otorite', soru: 'Rakip backlink analizi nasıl yapılır?', cevap: 'Ahrefs veya SEMrush ile rakip domain girin → Backlinks raporunu açın → En yüksek DR\'li linkleri filtreleyin → Kaynak sayfaları inceleyin → Aynı kaynaklara ulaşmak için içerik veya PR stratejisi geliştirin.' },

  // RAPORLAMA & ANALİTİK
  { kategori: 'Raporlama & Analitik', soru: 'GA4\'te SEO performansı nasıl takip edilir?', cevap: 'GA4\'te SEO takibi için: Organik trafik segmenti oluşturun, Landing page raporu ile giriş sayfalarını analiz edin, Search Console entegrasyonunu aktif edin, dönüşüm olaylarını yapılandırın ve Custom Report ile SEO KPI dashboard\'u oluşturun.' },
  { kategori: 'Raporlama & Analitik', soru: 'Search Console\'da en önemli raporlar hangileri?', cevap: 'Öncelikli Search Console raporları: Performance (sıralama, tıklama, CTR), Coverage (indexleme hataları), Core Web Vitals, Mobile Usability, Links (iç ve dış linkler) ve Manual Actions (elle ceza kontrolü).' },
  { kategori: 'Raporlama & Analitik', soru: 'SEO için hangi KPI\'lar izlenmeli?', cevap: 'Temel SEO KPI\'ları: Organik trafik (hacim ve kalite), anahtar kelime sıralama hareketleri, organic CTR, bounce rate, sayfa/oturum, dönüşüm oranı, Core Web Vitals skorları ve domain authority değişimi.' },
  { kategori: 'Raporlama & Analitik', soru: 'Organik trafik düşüşünün nedenleri neler olabilir?', cevap: 'Organik düşüş nedenleri: Google algoritma güncellemesi, teknik sorun (crawl hatası, index kaybı), rakip içerik üstünlüğü, arama davranışı değişimi, site migrasyonu hatası veya manual penalty. Search Console Coverage ve Performance raporları ilk bakış noktasıdır.' },
  { kategori: 'Raporlama & Analitik', soru: 'Ahrefs ve SEMrush\'un farkı ne?', cevap: 'Ahrefs: Backlink analizi ve organik sıralama takibinde güçlü, crawler verisi zengin. SEMrush: Reklam verisi, sosyal medya ve rakip analizi araçlarında kapsamlı. Her ikisi de anahtar kelime araştırması ve site audit için kullanılabilir. Bütçeye göre seçim yapılabilir.' },
  { kategori: 'Raporlama & Analitik', soru: 'SEO raporu nasıl hazırlanır?', cevap: 'Etkili SEO raporu: Özet (executive summary), önceki dönem karşılaştırması, organik trafik grafiği, sıralama değişimleri, tamamlanan aksiyonlar, sonraki dönem planı ve öneriler bölümlerini içermeli. Veri görselleştirmesi anlaşılabilirliği artırır.' },
  { kategori: 'Raporlama & Analitik', soru: 'CTR optimizasyonu nasıl yapılır?', cevap: 'Organik CTR artışı için: Title tag\'e rakam ve güçlü kelimeler ekleyin, meta description\'ı CTA ile bitirin, sıralama 4-10 arası sayfalara odaklanın (en yüksek CTR potansiyeli), featured snippet hedefleyin ve rich result için schema markup uygulayın.' },
  { kategori: 'Raporlama & Analitik', soru: 'Sıralama takibi için hangi araçlar kullanılır?', cevap: 'Sıralama takip araçları: SEMrush Position Tracking, Ahrefs Rank Tracker, Google Search Console (ortalama pozisyon), SERPWatcher ve SE Ranking. Mobil/masaüstü ayrımı ve lokasyon bazlı takip önemlidir.' },
  { kategori: 'Raporlama & Analitik', soru: 'Algoritma güncellemelerini takip etmenin yolları neler?', cevap: 'Google algoritma güncellemelerini takip için: Google Search Status Dashboard, Search Engine Roundtable, SEMrush Sensor, Algoroo ve MozCast araçları anlık değişimleri gösterir. Trafik anomalilerini güncelleme tarihleriyle karşılaştırın.' },
  { kategori: 'Raporlama & Analitik', soru: 'Dönüşüm optimizasyonu (CRO) ve SEO ilişkisi nedir?', cevap: 'SEO trafik getirir, CRO bu trafiği dönüştürür. Organik trafik kalitesi (niyet uyumu), açılış sayfası deneyimi, sayfa hızı ve kullanıcı deneyimi her ikisini de etkiler. CRO testleri (A/B) SEO\'dan gelen trafikle en güvenilir sonuçları verir.' },
  { kategori: 'Raporlama & Analitik', soru: 'Yerel SEO raporlaması nasıl yapılır?', cevap: 'Yerel SEO raporlaması: GBP (Google Business Profile) görüntüleme ve tıklama verileri, lokal anahtar kelime sıralamaları, yerel pack görünürlüğü, yorum sayısı ve puanı değişimi, NAP tutarlılık auditi ve rakip yerel görünürlük karşılaştırması.' },
]

const SORULAR_EN = [
  { kategori: 'Search & Technical SEO', soru: 'What is GEO (Generative Engine Optimization)?', cevap: 'GEO is the practice of optimizing your content to appear as a cited source in AI-powered search engines like Google AI Overview, Bing Copilot, and Perplexity. It goes beyond classic SEO by focusing on how LLM-based systems understand and reference your content.' },
  { kategori: 'Search & Technical SEO', soru: 'What is the difference between AI SEO and classic SEO?', cevap: 'AI SEO focuses on semantic depth, E-E-A-T signals, and how AI models interpret content, while classic SEO emphasizes keywords, backlinks, and technical optimization. The most effective approach combines both disciplines for maximum visibility.' },
  { kategori: 'Search & Technical SEO', soru: 'Why are Core Web Vitals so important?', cevap: 'Core Web Vitals are official Google ranking signals measuring user experience: LCP (loading performance), INP (interactivity), and CLS (visual stability). Poor scores can drag down rankings even for technically well-optimized sites.' },
  { kategori: 'Search & Technical SEO', soru: 'What is crawl budget and how do you optimize it?', cevap: 'Crawl budget is the number of pages Googlebot crawls on your site within a given timeframe. Unnecessary parameter URLs, thin content, and duplicate pages waste this budget. It\'s optimized through robots.txt, canonical tags, and clean internal link architecture.' },
  { kategori: 'Search & Technical SEO', soru: 'How does schema markup help SEO?', cevap: 'Schema markup provides machine-readable context about your content to search engines. With proper schema, you increase your chances of appearing in rich results, being cited in AI Overview, and gaining a presence in the Knowledge Graph.' },
  { kategori: 'Search & Technical SEO', soru: 'When should hreflang tags be used?', cevap: 'Hreflang tags tell search engines which language and region each page targets on multilingual or multi-regional sites. Incorrect implementation leads to duplicate content issues and wrong pages ranking in the wrong countries.' },
  { kategori: 'Search & Technical SEO', soru: 'How do you properly use canonical tags?', cevap: 'Canonical tags point to the preferred URL when similar content exists across multiple URLs. They\'re critical for e-commerce filter pages, URL parameters, and HTTP/HTTPS variations. Every page should self-reference as canonical.' },
  { kategori: 'Search & Technical SEO', soru: 'How does page speed affect SEO?', cevap: 'Page speed is both a direct ranking factor and a user experience signal. Slow pages increase bounce rates, reduce conversions, and cause Googlebot to crawl fewer pages. Target an LCP under 2.5 seconds for optimal performance.' },
  { kategori: 'Search & Technical SEO', soru: 'What is the correct way to create an XML sitemap?', cevap: 'An XML sitemap guides search engines through your site structure and priority pages. It should be dynamic, include only URLs you want indexed, and be submitted to Search Console. Sites exceeding 50,000 URLs need split sitemaps.' },
  { kategori: 'Search & Technical SEO', soru: 'How do you detect duplicate content issues?', cevap: 'Detect duplicate content with Screaming Frog, Siteliner, or SEMrush Site Audit. The most common sources are HTTP/HTTPS differences, www/non-www variations, trailing slashes, and parameter URLs.' },
  { kategori: 'AI Search', soru: 'How do you become a source in Google AI Overview?', cevap: 'To appear in AI Overview, your content needs to directly answer the query in a summarizable structure. A clear opening paragraph, strong E-E-A-T signals, and FAQPage schema markup are the starting points.' },
  { kategori: 'AI Search', soru: 'What does an LLMs.txt file do?', cevap: 'LLMs.txt is a standard file that tells AI systems how a website wants its content used — think of it as robots.txt for AI. It\'s one of the foundational technical elements of a GEO strategy.' },
  { kategori: 'AI Search', soru: 'How do you increase visibility in Perplexity?', cevap: 'Perplexity relies heavily on web search results and a RAG architecture based on authoritative sources. Original research, current data, expert citations, and clearly attributed sources increase the likelihood of being selected as a Perplexity source.' },
  { kategori: 'AI Search', soru: 'How do you optimize for ChatGPT Search?', cevap: 'ChatGPT Search uses the Bing index and web sources. Good Bing SEO, clean technical structure, fast loading, and clearly structured content form the foundation of ChatGPT Search visibility. Allowing OpenAI\'s GPTBot crawler is also important.' },
  { kategori: 'AI Search', soru: 'What is Entity SEO?', cevap: 'Entity SEO is the practice of optimizing your content and technical structure so search engines recognize real-world entities (people, places, products, concepts). Appearing in the Knowledge Graph significantly increases your chances of being cited in AI systems.' },
  { kategori: 'AI Search', soru: 'What is Answer Engine Optimization (AEO)?', cevap: 'AEO ensures your content appears as a source in answer engines like Perplexity, ChatGPT, and You.com. Question-and-answer formatted content, clear definitions, and summarizable sections are the cornerstones of AEO.' },
  { kategori: 'AI Search', soru: 'How is RAG affecting SEO?', cevap: 'RAG (Retrieval-Augmented Generation) is the architecture where LLMs access real-time sources to generate responses. Having your content selected as a source requires authoritative, reliable, and well-structured content. Semantic depth matters for vector similarity.' },
  { kategori: 'AI Search', soru: 'How does AI Overview affect CTR?', cevap: 'As AI Overview spreads, many searches result in zero-click outcomes. However, being included as an AI Overview source is valuable for brand recognition and authority. The traffic impact is more limited for long-tail and research-based queries.' },
  { kategori: 'AI Search', soru: 'What is grounding and how does it affect content strategy?', cevap: 'Grounding is the process of LLMs basing their responses on verifiable sources. Original data, research citations, expert opinions, and clear source attribution increase the probability of your content being selected as a grounding source.' },
  { kategori: 'AI Search', soru: 'How do you write content for AI systems?', cevap: 'When writing for AI systems: provide clear and direct answers, write complete definitions, include numerical data and research citations, use question-and-answer format, create long-form and in-depth content, and strengthen E-E-A-T signals.' },
  { kategori: 'E-Commerce & Platform', soru: 'Why is e-commerce SEO different from other types?', cevap: 'E-commerce SEO differs due to scale, dynamism, and conversion focus. Thousands of product pages, filtering URLs, faceted navigation issues, variant URL management, and content inconsistencies tied to stock changes all require specialized approaches.' },
  { kategori: 'E-Commerce & Platform', soru: 'How do you optimize category pages?', cevap: 'Category pages carry the highest SEO value in e-commerce. Unique description texts, breadcrumb navigation, internal linking, product filter URL management, and correct heading hierarchy form the foundation of optimization.' },
  { kategori: 'E-Commerce & Platform', soru: 'How do you optimize Shopify SEO?', cevap: 'Shopify\'s /collections/ and /products/ URL structure is fixed, making canonical management critical. Theme speed optimization, liquid template content improvements, avoiding app bloat, and active use of the blog section are core Shopify SEO strategies.' },
  { kategori: 'E-Commerce & Platform', soru: 'What are the best practices for WooCommerce SEO?', cevap: 'For WooCommerce: Install Yoast SEO or RankMath, optimize page speed (WP Rocket, WebP image conversion), add product schema markup, integrate review markup, and optimize XML sitemaps as priority steps.' },
  { kategori: 'E-Commerce & Platform', soru: 'What is programmatic SEO?', cevap: 'Programmatic SEO is a strategy for generating pages at scale using templates and data. City-based service pages, product variants, and comparison pages are typical use cases. Content quality and uniqueness are critical risk points.' },
  { kategori: 'E-Commerce & Platform', soru: 'How do you solve faceted navigation problems?', cevap: 'Faceted navigation creates URL explosion from filter parameter combinations. Solutions include: JavaScript-based filtering (without generating URLs), canonical tag implementation, blocking crawling with robots.txt, or using noindex.' },
  { kategori: 'E-Commerce & Platform', soru: 'Do product images contribute to SEO?', cevap: 'Yes. Proper file names, alt text optimization, WebP format, lazy loading, and image sitemaps contribute to both general SEO and Google Image search traffic. Especially critical in categories where mobile is dominant.' },
  { kategori: 'E-Commerce & Platform', soru: 'How do you manage out-of-stock product pages?', cevap: 'For out-of-stock products: 301 redirect for permanent removal, noindex or "back in stock" messaging for temporary situations, and redirect to a related product for high-traffic/high-link-value pages.' },
  { kategori: 'E-Commerce & Platform', soru: 'Is local SEO necessary for e-commerce?', cevap: 'For e-commerce businesses with physical stores, local SEO is critical. Google Business Profile optimization, city-based landing pages, NAP (name-address-phone) consistency, and local backlink building fall within this strategy.' },
  { kategori: 'E-Commerce & Platform', soru: 'What should an Amazon product SEO strategy look like?', cevap: 'For Amazon SEO (A9/A10 algorithm): keyword research (including backend keywords), title optimization, bullet points, A+ content, and active review management are critical. External traffic (Google → Amazon) positively impacts product rankings.' },
  { kategori: 'Strategy', soru: 'What is topical authority and why does it matter?', cevap: 'Topical authority is when a site comprehensively covers a subject area and is recognized by search engines as an expert source. The pillar-cluster content model is the foundational methodology for building topical authority.' },
  { kategori: 'Strategy', soru: 'How do you strengthen E-E-A-T signals?', cevap: 'Experience: Personal experience content. Expertise: Author bios, certifications. Authoritativeness: Industry publication mentions, backlinks. Trustworthiness: HTTPS, transparent policies, contact information.' },
  { kategori: 'Strategy', soru: 'How do you build a pillar-cluster content model?', cevap: 'Pillar page: A comprehensive single page on the main topic. Cluster pages: Pages that cover subtopics in depth. Each cluster page should link to the pillar, and the pillar should link to all clusters. This structure strengthens both user experience and semantic connections.' },
  { kategori: 'Strategy', soru: 'What is keyword cannibalization?', cevap: 'Keyword cannibalization is when multiple pages rank for the same keyword, competing with each other. It\'s resolved through internal consolidation, canonical tags, or 301 redirects. Detected with Screaming Frog and Search Console.' },
  { kategori: 'Strategy', soru: 'How often should content be updated for SEO?', cevap: 'In fast-changing sectors (finance, technology, health), updates every 3-6 months are recommended. Evergreen content needs comprehensive revision annually. Pages showing traffic drops in Search Console should be addressed first.' },
  { kategori: 'Strategy', soru: 'How do you analyze search intent?', cevap: '4 basic intent types: Informational (seeking information), Navigational (looking for a site), Commercial (comparison), Transactional (purchase). Analyzing SERP results is the most reliable intent detection method.' },
  { kategori: 'Strategy', soru: 'How do you conduct competitor analysis?', cevap: 'Competitor analysis: Organic keyword overlap (Ahrefs/SEMrush), backlink profile comparison, content gap identification, SERP feature visibility analysis, and technical SEO benchmarking.' },
  { kategori: 'Strategy', soru: 'How does SEO start for a new site?', cevap: 'Priority order for a new site: Technical infrastructure (speed, SSL, crawlability), keyword research and content plan, building pillar-cluster structure, Google Search Console and Analytics integration, foundational backlink building.' },
  { kategori: 'Strategy', soru: 'How is SEO ROI measured?', cevap: 'SEO ROI measurement: Organic traffic value (click cost saved), cost per organic conversion, brand visibility and ranking improvements. GA4 attribution model and Search Console data are used.' },
  { kategori: 'Strategy', soru: 'How do you plan seasonal SEO?', cevap: 'For seasonal content: Analyze search volume cycles with Google Trends, start content production 3-4 months before campaigns, use updated permanent pages rather than temporary ones, and forecast based on previous year data.' },
  { kategori: 'Strategy', soru: 'How do you win featured snippets?', cevap: 'For featured snippets: Provide a direct answer to the query in paragraph, list, or table format. Create a clean answer paragraph under an H2/H3 heading. Content between 40-60 words has the highest snippet acquisition rate.' },
  { kategori: 'Backlink & Authority', soru: 'How do you build quality backlinks?', cevap: 'Quality backlink strategies: Publishing original research and data (link-worthy content), guest posting, digital PR, broken link building, targeting competitor lost links, and registering in industry directories.' },
  { kategori: 'Backlink & Authority', soru: 'How do you detect and clean toxic backlinks?', cevap: 'Use Ahrefs or SEMrush toxicity scores for toxic backlink detection. Spam, link farms, irrelevant niche sites, and manipulative anchor text patterns are flagged. They can be rejected with Google\'s Disavow tool, but this process requires careful management.' },
  { kategori: 'Backlink & Authority', soru: 'How do you combine digital PR and SEO?', cevap: 'Digital PR is a strategy for earning editorial backlinks by presenting original research and survey data to media outlets. Industry media, news sites, and trade publications are viable targets. Newsworthiness is the critical success factor.' },
  { kategori: 'Backlink & Authority', soru: 'What should anchor text distribution look like?', cevap: 'Natural anchor text distribution: Branded (40-50%), Generic (20-25%), Partial match (15-20%), Exact match (5-10%), Naked URL (5-10%). Excessive exact match anchor text can trigger Google\'s Penguin algorithm.' },
  { kategori: 'Backlink & Authority', soru: 'How do you build an internal link strategy?', cevap: 'Internal link strategy: Maximum link flow to most valuable pages, breadcrumb navigation, footer and header linking, contextual in-content links. Pillar pages are prioritized to direct PageRank to valuable pages.' },
  { kategori: 'Reporting & Analytics', soru: 'How do you track SEO performance in GA4?', cevap: 'For SEO tracking in GA4: Create an organic traffic segment, analyze landing pages with the Landing Page report, activate Search Console integration, configure conversion events, and create a Custom Report for an SEO KPI dashboard.' },
  { kategori: 'Reporting & Analytics', soru: 'What are the most important Search Console reports?', cevap: 'Priority Search Console reports: Performance (rankings, clicks, CTR), Coverage (indexing errors), Core Web Vitals, Mobile Usability, Links (internal and external), and Manual Actions (manual penalty check).' },
  { kategori: 'Reporting & Analytics', soru: 'What KPIs should be tracked for SEO?', cevap: 'Core SEO KPIs: Organic traffic (volume and quality), keyword ranking movements, organic CTR, bounce rate, pages/session, conversion rate, Core Web Vitals scores, and domain authority changes.' },
  { kategori: 'Reporting & Analytics', soru: 'What can cause organic traffic drops?', cevap: 'Organic drop causes: Google algorithm update, technical issue (crawl error, index loss), competitor content superiority, search behavior changes, site migration error, or manual penalty. Search Console Coverage and Performance reports are the first checkpoint.' },
]

const KATEGORILER_TR = ['Tümü', 'Arama & Teknik SEO', 'AI Arama', 'E-Ticaret & Platform', 'Strateji', 'Backlink & Otorite', 'Raporlama & Analitik']
const KATEGORILER_EN = ['All', 'Search & Technical SEO', 'AI Search', 'E-Commerce & Platform', 'Strategy', 'Backlink & Authority', 'Reporting & Analytics']

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const SORULAR = isEn ? SORULAR_EN : SORULAR_TR
  const KATEGORILER = isEn ? KATEGORILER_EN : KATEGORILER_TR

  const [aktifKat, setAktifKat] = useState(isEn ? 'All' : 'Tümü')
  const [arama, setArama] = useState('')
  const [aciklar, setAciklar] = useState({})

  const filtered = SORULAR.filter(s => {
    const katMatch = aktifKat === (isEn ? 'All' : 'Tümü') || s.kategori === aktifKat
    const aramaMatch = !arama || s.soru.toLowerCase().includes(arama.toLowerCase()) || s.cevap.toLowerCase().includes(arama.toLowerCase())
    return katMatch && aramaMatch
  })

  const gruplar = {}
  filtered.forEach(s => {
    if (!gruplar[s.kategori]) gruplar[s.kategori] = []
    gruplar[s.kategori].push(s)
  })

  const toggle = (key) => setAciklar(prev => ({ ...prev, [key]: !prev[key] }))

  const t = {
    title: isEn ? 'FAQ | Fatih Emin Çakıroğlu' : 'SSS | Fatih Emin Çakıroğlu',
    badge: isEn ? 'SSS' : 'SSS',
    h1: isEn ? 'Frequently Asked Questions' : 'Sıkça sorulan sorular',
    desc: isEn
      ? 'Filter by category, jump to a letter on the A–Z strip, or search within questions and answers.'
      : 'Kategori seçerek daraltın, bölüm şeridinden atlayın veya arama kutusuyla soru ve yanıt metninde arayın.',
    count: isEn ? `${SORULAR.length} questions · AI search, technical & classic SEO` : `${SORULAR.length} soru-cevap · GEO, AI araması ve klasik SEO`,
    placeholder: isEn ? 'Search questions and answers... (e.g. "canonical", "AI Overview", "SERP")' : 'Soru veya yanıt içinde ara... (ör: "canonical", "AI Overview", "SERP")',
    breadcrumb: isEn ? ['Home', 'Resources', 'FAQ'] : ['Ana Sayfa', 'Kaynaklar', 'SSS'],
    noResult: isEn ? 'No results found.' : 'Sonuç bulunamadı.',
  }

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={isEn ? `${SORULAR_EN.length}+ frequently asked questions about SEO, GEO and AI search consulting.` : `${SORULAR_TR.length}+ soru-cevap: SEO, GEO ve AI arama danışmanlığı hakkında her şey.`} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/faq' : 'https://fatihemincakiroglu.com/sss'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/sss" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/faq" />
        <script type="application/ld+json">{JSON.stringify({ "@context":"https://schema.org","@type":"FAQPage","mainEntity": filtered.slice(0,10).map(s => ({"@type":"Question","name":s.soru,"acceptedAnswer":{"@type":"Answer","text":s.cevap}})) })}</script>
      </Head>
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#faf9f7' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link><span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/resources' : '/kaynaklar'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link><span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', padding: '3px 10px', border: '1px solid #eee', borderRadius: '20px', letterSpacing: '1px' }}>{t.badge}</span>
                <span style={{ fontSize: '12px', color: '#aaa' }}>{t.count}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{t.h1}</h1>
              <p style={{ color: '#777', fontSize: '14px', maxWidth: '600px', lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '24px 32px 96px' }}>
          {/* Filter box */}
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px 24px', marginBottom: '32px' }}>
            {/* Kategori filtreleri */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {KATEGORILER.map(k => (
                <button key={k} onClick={() => setAktifKat(k)} style={{ padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: aktifKat === k ? 'var(--orange)' : '#f5f5f5', color: aktifKat === k ? '#fff' : '#555', fontSize: '13px', fontWeight: aktifKat === k ? 700 : 500, fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>{k}</button>
              ))}
            </div>
            {/* Arama */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #eee', borderRadius: '10px', padding: '11px 16px', background: '#faf9f7' }}>
              <span style={{ color: '#bbb' }}>🔍</span>
              <input type="text" placeholder={t.placeholder} value={arama} onChange={e => { setArama(e.target.value); setAktifKat(isEn ? 'All' : 'Tümü') }}
                style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%', color: '#333' }} />
            </div>
          </div>

          {/* Sonuç */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <div style={{ fontSize: '16px' }}>{t.noResult}</div>
            </div>
          ) : (
            Object.entries(gruplar).map(([kat, sorular]) => (
              <div key={kat} style={{ marginBottom: '32px' }}>
                {/* Kategori başlığı */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '10px', borderBottom: '2px solid var(--orange)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', margin: 0 }}>{kat}</h2>
                  <span style={{ fontSize: '12px', color: '#aaa', background: '#f5f5f5', padding: '2px 8px', borderRadius: '10px' }}>{sorular.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sorular.map((s, i) => {
                    const key = `${kat}-${i}`
                    return (
                      <div key={key} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden', transition: 'box-shadow 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                        <button onClick={() => toggle(key)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                          <span style={{ fontSize: '15px', fontWeight: 600, color: '#111', flex: 1, lineHeight: 1.4, paddingRight: '16px' }}>{s.soru}</span>
                          <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: aciklar[key] ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                        </button>
                        {aciklar[key] && (
                          <div style={{ padding: '0 24px 20px', borderTop: '1px solid #f0f0f0' }}>
                            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, paddingTop: '16px', margin: 0 }}>{s.cevap}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}

          {/* CTA */}
          <div style={{ background: '#111', borderRadius: '16px', padding: '48px', textAlign: 'center', marginTop: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>
              {isEn ? 'Have another question?' : 'Başka sorunuz mu var?'}
            </h2>
            <p style={{ color: '#6b6b6b', marginBottom: '24px' }}>
              {isEn ? 'Book a free call and ask directly.' : 'Ücretsiz görüşme ayarlayın ve doğrudan sorun.'}
            </p>
            <Link href={isEn ? '/en/contact' : '/iletisim'}>
              <button style={{ padding: '14px 32px', borderRadius: '8px', background: 'var(--orange)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                {isEn ? 'Get in Touch →' : 'İletişime Geç →'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
