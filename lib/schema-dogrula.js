// Schema (JSON-LD) doğrulayıcı: saf mantık (tarayıcıda çalışır, ağa çıkmaz, test edilebilir).
// pages/araclar/schema-dogrulayici.js kullanır. Metinler (TR ve EN) sayfadadır; burada yalnızca kodlar ve parametreler üretilir.
//
// • Girdi: ham JSON, bir ya da daha fazla <script type="application/ld+json"> bloğu ya da tam bir HTML sayfası.
// • JSON kendi ayrıştırıcımızla okunur: her tarayıcıda aynı satır ve sütun bilgisi, sık yapılan hatalara
//   (sondaki virgül, tek tırnak, akıllı tırnak, yorum, tırnaksız anahtar, iki nesnenin yan yana yapıştırılması) özel kod.
// • @context (schema.org), @type, @graph ve iç içe türler kontrol edilir; @id referansları aynı girdi içinde çözülür.
// • Google'ın zengin sonuç galerisinde (Search Central, "Search gallery", Ekim 2026 sürümü) listelenen özellikler için
//   zorunlu ve önerilen alanlar: Article, Breadcrumb, Carousel (ItemList), Course list, Dataset, Discussion forum,
//   Employer aggregate rating, Event, Image metadata, Job posting, Local business, Movie, Organization, Product,
//   Profile page, Q&A, Recipe, Review snippet, Software app, Vacation rental, Video ve site adı (WebSite).
//   Education Q&A ve Math solver gibi dar kapsamlı özellikler yalnızca genel kontrollerden geçer.
// • Zengin sonucu artık gösterilmeyen türler için not: FAQPage (7 Mayıs 2026), HowTo (2023), site içi arama kutusu (2024),
//   ClaimReview, SpecialAnnouncement, Occupation (tahmini maaş) ve araç ilanı (2025). İşaretleme geçerli olabilir ama zengin sonuç üretmez.
// • Değer kontrolleri: tam URL, ISO 8601 tarih ve süre, sayısal fiyat ve ISO 4217 para birimi, puan aralığı, enlem ve boylam, sabit değerler.

// ── JSON ayrıştırıcı ─────────────────────────────────────────

function satirTablosu(metin) {
  const bas = [0]
  for (let i = 0; i < metin.length; i++) if (metin.charCodeAt(i) === 10) bas.push(i + 1)
  return (idx) => {
    let lo = 0
    let hi = bas.length - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (bas[mid] <= idx) lo = mid
      else hi = mid - 1
    }
    const satirSonu = metin.indexOf('\n', bas[lo])
    return { satir: lo + 1, sutun: idx - bas[lo] + 1, satirMetni: metin.slice(bas[lo], satirSonu < 0 ? metin.length : satirSonu).replace(/\r$/, '') }
  }
}

const AKILLI_TIRNAK = /[“”„‟‘’«»]/

/**
 * JSON metnini ayrıştırır. metin: tüm girdi; bas ve son: ayrıştırılacak aralık (HTML içindeki blok için).
 * Dönen: { deger, konumlar: WeakMap(nesne → { idx, anahtarlar: { ad: idx } }), uyarilar } ya da { hata: { kod, idx, karakter? } }
 */
export function jsonAyristir(metin, bas = 0, son = metin.length) {
  const s = metin
  let i = bas
  const konumlar = new WeakMap()
  const uyarilar = []
  const hata = (kod, idx = i, ek = {}) => { const e = new Error(kod); e.jsonHata = { kod, idx, ...ek }; throw e }
  const bosluk = () => {
    while (i < son) {
      const c = s[i]
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '﻿') { i++; continue }
      if (c === '/' && (s[i + 1] === '/' || s[i + 1] === '*')) hata('yorum')
      break
    }
  }
  const bilinmeyen = (c) => {
    if (i >= son) hata('beklenmeyen-son')
    if (c === "'") hata('tek-tirnak')
    if (AKILLI_TIRNAK.test(c)) hata('akilli-tirnak', i, { karakter: c })
    hata('beklenmeyen-karakter', i, { karakter: c })
  }
  const dize = () => {
    const baslangic = i
    i++
    let out = ''
    while (true) {
      if (i >= son) hata('kapanmayan-dize', baslangic)
      const c = s[i]
      if (c === '"') { i++; return out }
      if (c === '\\') {
        const e = s[i + 1]
        const harita = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' }
        if (e in harita) { out += harita[e]; i += 2; continue }
        if (e === 'u' && /^[0-9a-fA-F]{4}$/.test(s.slice(i + 2, i + 6))) { out += String.fromCharCode(parseInt(s.slice(i + 2, i + 6), 16)); i += 6; continue }
        hata('gecersiz-kacis', i, { karakter: `\\${e ?? ''}` })
      }
      if (c.charCodeAt(0) < 0x20) hata('kontrol-karakteri', i)
      out += c
      i++
    }
  }
  const sayiRe = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/y
  const deger = () => {
    bosluk()
    const c = s[i]
    if (c === '{') return nesne()
    if (c === '[') return diziOku()
    if (c === '"') return dize()
    if (c === '-' || (c >= '0' && c <= '9')) {
      sayiRe.lastIndex = i
      const m = sayiRe.exec(s)
      if (!m || m.index !== i || /[0-9.eE]/.test(s[i + m[0].length] || '')) hata('gecersiz-sayi')
      i += m[0].length
      return Number(m[0])
    }
    for (const [k, v] of [['true', true], ['false', false], ['null', null]]) {
      if (s.startsWith(k, i)) { i += k.length; return v }
    }
    const kelime = s.slice(i, son).match(/^[A-Za-z_$][\w$]*/)
    if (kelime) hata('gecersiz-deger', i, { karakter: kelime[0] })
    return bilinmeyen(c)
  }
  const nesne = () => {
    const obj = {}
    const anahtarlar = {}
    konumlar.set(obj, { idx: i, anahtarlar })
    i++
    bosluk()
    if (s[i] === '}') { i++; return obj }
    while (true) {
      bosluk()
      const c = s[i]
      const anahtarIdx = i
      let anahtar
      if (c === '"') anahtar = dize()
      else if (c !== undefined && i < son && /[A-Za-z_$@]/.test(c)) hata('tirnaksiz-anahtar')
      else bilinmeyen(c)
      if (Object.prototype.hasOwnProperty.call(obj, anahtar)) uyarilar.push({ kod: 'yinelenen-anahtar', anahtar, idx: anahtarIdx })
      bosluk()
      if (s[i] !== ':') { if (i >= son) hata('beklenmeyen-son'); hata('iki-nokta-bekleniyor', i, { karakter: s[i] }) }
      i++
      const v = deger()
      Object.defineProperty(obj, anahtar, { value: v, enumerable: true, writable: true, configurable: true })
      anahtarlar[anahtar] = anahtarIdx
      bosluk()
      if (s[i] === ',') {
        const virgul = i
        i++
        bosluk()
        if (s[i] === '}') hata('sondaki-virgul', virgul)
        continue
      }
      if (s[i] === '}') { i++; return obj }
      if (i >= son) hata('beklenmeyen-son')
      hata('virgul-bekleniyor', i, { karakter: s[i] })
    }
  }
  const diziOku = () => {
    const arr = []
    i++
    bosluk()
    if (s[i] === ']') { i++; return arr }
    while (true) {
      arr.push(deger())
      bosluk()
      if (s[i] === ',') {
        const virgul = i
        i++
        bosluk()
        if (s[i] === ']') hata('sondaki-virgul', virgul)
        continue
      }
      if (s[i] === ']') { i++; return arr }
      if (i >= son) hata('beklenmeyen-son')
      hata('virgul-bekleniyor', i, { karakter: s[i] })
    }
  }
  try {
    bosluk()
    if (i >= son) hata('bos')
    const v = deger()
    bosluk()
    if (i < son) hata('fazla-icerik', i, { karakter: s[i] })
    return { deger: v, konumlar, uyarilar }
  } catch (e) {
    if (e.jsonHata) return { hata: e.jsonHata }
    throw e
  }
}

// ── Girdiden blokları çıkarma ────────────────────────────────

// HTML yorumlarını konumları bozmadan boşlukla değiştirir (yorum içindeki script blokları sayılmasın)
const yorumlariSil = (m) => m.replace(/<!--[\s\S]*?-->/g, (x) => x.replace(/[^\n]/g, ' '))

/**
 * Girdiyi sınıflandırır ve JSON-LD bloklarını bulur.
 * Dönen: { tur: 'bos' | 'json' | 'html', bloklar: [{ bas, son }], mikrodata, rdfa, digerScript }
 */
export function bloklariBul(metin) {
  const ham = String(metin || '')
  const kirpik = ham.trim()
  if (!kirpik) return { tur: 'bos', bloklar: [] }
  if (/^[[{]/.test(kirpik)) return { tur: 'json', bloklar: [{ bas: 0, son: ham.length }] }
  const temiz = yorumlariSil(ham)
  const bloklar = []
  let digerScript = 0
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi
  let m
  while ((m = re.exec(temiz)) !== null) {
    if (!/type\s*=\s*["']?application\/ld\+json/i.test(m[1])) { digerScript++; continue }
    const bas = m.index + m[0].indexOf('>') + 1
    bloklar.push({ bas, son: bas + m[2].length })
  }
  const mikrodata = /\bitemscope\b|\bitemtype\s*=/i.test(temiz)
  const rdfa = /\btypeof\s*=\s*["'][^"']*["']/i.test(temiz) && /\bvocab\s*=|\bproperty\s*=/i.test(temiz)
  if (bloklar.length || /^</.test(kirpik)) return { tur: 'html', bloklar, mikrodata, rdfa, digerScript }
  return { tur: 'json', bloklar: [{ bas: 0, son: ham.length }] }
}

// ── Tür bilgisi ──────────────────────────────────────────────

const LOCAL_BUSINESS_ALT = 'LocalBusiness AnimalShelter ArchiveOrganization AutomotiveBusiness AutoBodyShop AutoDealer AutoPartsStore AutoRental AutoRepair AutoWash GasStation MotorcycleDealer MotorcycleRepair ChildCare Dentist DryCleaningOrLaundry EmergencyService FireStation Hospital PoliceStation EmploymentAgency EntertainmentBusiness AdultEntertainment AmusementPark ArtGallery Casino ComedyClub MovieTheater NightClub FinancialService AccountingService AutomatedTeller BankOrCreditUnion InsuranceAgency FoodEstablishment Bakery BarOrPub Brewery CafeOrCoffeeShop Distillery FastFoodRestaurant IceCreamShop Restaurant Winery GovernmentOffice PostOffice HealthAndBeautyBusiness BeautySalon DaySpa HairSalon HealthClub NailSalon TattooParlor HomeAndConstructionBusiness Electrician GeneralContractor HVACBusiness HousePainter Locksmith MovingCompany Plumber RoofingContractor InternetCafe LegalService Attorney Notary Library LodgingBusiness BedAndBreakfast Campground Hostel Hotel Motel Resort VacationRental MedicalBusiness CommunityHealth Dermatology DietNutrition Emergency Geriatric Gynecologic MedicalClinic Midwifery Nursing Obstetric Oncologic Optician Optometric Otolaryngologic Pediatric Pharmacy Physician Physiotherapy PlasticSurgery Podiatric PrimaryCare Psychiatric PublicHealth ProfessionalService RadioStation RealEstateAgent RecyclingCenter SelfStorage ShoppingCenter SportsActivityLocation BowlingAlley ExerciseGym GolfCourse PublicSwimmingPool SkiResort SportsClub StadiumOrArena TennisComplex Store BikeStore BookStore ClothingStore ComputerStore ConvenienceStore DepartmentStore ElectronicsStore Florist FurnitureStore GardenStore GroceryStore HardwareStore HobbyShop HomeGoodsStore JewelryStore LiquorStore MensClothingStore MobilePhoneStore MovieRentalStore MusicStore OfficeEquipmentStore OutletStore PawnShop PetStore ShoeStore SportingGoodsStore TireShop ToyStore WholesaleStore TelevisionStation TouristInformationCenter TravelAgency'.split(' ')
const ARTICLE_ALT = ['Article', 'NewsArticle', 'BlogPosting', 'Report', 'TechArticle', 'ScholarlyArticle', 'LiveBlogPosting', 'AnalysisNewsArticle', 'OpinionNewsArticle', 'ReportageNewsArticle', 'BackgroundNewsArticle', 'ReviewNewsArticle', 'AskPublicNewsArticle', 'SatiricalArticle', 'AdvertiserContentArticle']
const EVENT_ALT = ['Event', 'BusinessEvent', 'ChildrensEvent', 'ComedyEvent', 'CourseInstance', 'DanceEvent', 'DeliveryEvent', 'EducationEvent', 'EventSeries', 'ExhibitionEvent', 'Festival', 'FoodEvent', 'Hackathon', 'LiteraryEvent', 'MusicEvent', 'PublicationEvent', 'SaleEvent', 'ScreeningEvent', 'SocialEvent', 'SportsEvent', 'TheaterEvent', 'VisualArtsEvent']
const ORGANIZATION_ALT = ['Organization', 'Airline', 'Consortium', 'Corporation', 'EducationalOrganization', 'CollegeOrUniversity', 'ElementarySchool', 'HighSchool', 'MiddleSchool', 'Preschool', 'School', 'FundingScheme', 'GovernmentOrganization', 'LibrarySystem', 'MedicalOrganization', 'NewsMediaOrganization', 'NGO', 'OnlineBusiness', 'OnlineStore', 'PerformingGroup', 'PoliticalParty', 'Project', 'ResearchOrganization', 'SearchRescueOrganization', 'SportsOrganization', 'SportsTeam', 'WorkersUnion']
const SOFTWARE_ALT = ['SoftwareApplication', 'MobileApplication', 'WebApplication', 'VideoGame']
const DIGER_TURLER = 'Thing CreativeWork WebPage WebSite AboutPage ContactPage CollectionPage ItemPage CheckoutPage SearchResultsPage MedicalWebPage RealEstateListing WebPageElement SiteNavigationElement WPHeader WPFooter WPSideBar Person Place PostalAddress GeoCoordinates GeoShape Offer AggregateOffer OfferShippingDetails ShippingDeliveryTime MerchantReturnPolicy UnitPriceSpecification PriceSpecification Demand Brand Rating AggregateRating EmployerAggregateRating Review ListItem ItemList BreadcrumbList HowTo HowToStep HowToSection HowToDirection HowToTip HowToSupply HowToTool FAQPage QAPage Question Answer Comment ImageObject VideoObject AudioObject MediaObject Clip BroadcastEvent SeekToAction InteractionCounter WatchAction LikeAction CommentAction WriteAction ReadAction SearchAction EntryPoint PropertyValue QuantitativeValue MonetaryAmount MonetaryAmountDistribution OpeningHoursSpecification ContactPoint NutritionInformation Recipe Product ProductGroup ProductModel IndividualProduct SomeProducts Vehicle Car Motorcycle Course JobPosting Occupation Dataset DataDownload DataCatalog DiscussionForumPosting SocialMediaPosting ProfilePage Movie Book Episode TVSeries CreativeWorkSeries CreativeWorkSeason Game MusicPlaylist MusicRecording MusicAlbum MusicGroup Quiz MathSolver SolveMathAction LearningResource ClaimReview SpecialAnnouncement VirtualLocation EducationalOccupationalCredential DefinedRegion DefinedTerm DefinedTermSet Country State City AdministrativeArea Accommodation Apartment House Room Suite LocationFeatureSpecification Service Audience PeopleAudience Language SpeakableSpecification Duration DayOfWeek ItemAvailability OfferItemCondition EventStatusType EventAttendanceModeEnum Schedule Trip Flight TouristAttraction TouristDestination LandmarksOrHistoricalBuildings Menu MenuItem MenuSection Order Invoice Ticket Reservation Photograph Map Legislation Article'.split(' ')
const BILINEN_TURLER = new Set([...LOCAL_BUSINESS_ALT, ...ARTICLE_ALT, ...EVENT_ALT, ...ORGANIZATION_ALT, ...SOFTWARE_ALT, ...DIGER_TURLER])
const KUCUK_TURLER = new Map([...BILINEN_TURLER].map(t => [t.toLowerCase(), t]))

const LB = new Set(LOCAL_BUSINESS_ALT)
const ART = new Set(ARTICLE_ALT)
const EVT = new Set(EVENT_ALT)
const ORG = new Set(ORGANIZATION_ALT)
const SW = new Set(SOFTWARE_ALT)

// Zengin sonucu artık gösterilmeyen türler: neden kodu sayfada metne çevrilir
const ZENGIN_YOK = { FAQPage: 'faq', HowTo: 'howto', ClaimReview: 'claimreview', SpecialAnnouncement: 'specialannouncement', Occupation: 'tahmini-maas', Vehicle: 'arac', Car: 'arac', Motorcycle: 'arac' }

// ── Yardımcılar ──────────────────────────────────────────────

const CONTEXT_BILDIRILDI = Symbol('context-bildirildi')

const nesneMi = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const dizi = (v) => (v == null ? [] : Array.isArray(v) ? v : [v])
const tipleri = (n) => (nesneMi(n) ? dizi(n['@type']).filter(x => typeof x === 'string') : [])
const bosMu = (v) => v == null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && v.every(bosMu)) || (nesneMi(v) && Object.keys(v).length === 0)
const yalnizIdMi = (n) => nesneMi(n) && typeof n['@id'] === 'string' && Object.keys(n).every(k => k === '@id')
const enumAd = (v) => String(v || '').trim().replace(/^https?:\/\/schema\.org\//i, '').replace(/^schema:/i, '')

export function contextKontrol(ctx) {
  if (ctx == null) return 'yok'
  const parcalar = dizi(ctx)
  const schemaMi = (x) => typeof x === 'string' && /^https?:\/\/(www\.)?schema\.org\/?$/i.test(x.trim())
  for (const p of parcalar) {
    if (schemaMi(p)) return 'tamam'
    if (nesneMi(p) && schemaMi(p['@vocab'])) return 'tamam'
  }
  return 'yabanci'
}

// Tam URL mi? 'tam' | 'goreli' | 'gecersiz'
export function urlTuru(v) {
  const s = String(v ?? '').trim()
  if (!s) return 'gecersiz'
  if (/^https?:\/\//i.test(s)) {
    if (/\s/.test(s)) return 'gecersiz'
    try { new URL(s); return 'tam' } catch { return 'gecersiz' }
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(s)) return 'gecersiz' // javascript:, data:, mailto: gibi
  return 'goreli'
}

// ISO 8601 tarih: 'tamam' | 'saat-dilimi-yok' | 'gecersiz'
export function tarihTuru(v) {
  const s = String(v ?? '').trim()
  const m = s.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:[.,]\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?)?)?$/)
  if (!m) return 'gecersiz'
  const [, y, ay, gun, sa, dk, sn, dilim] = m
  if (ay && (+ay < 1 || +ay > 12)) return 'gecersiz'
  if (gun) {
    const d = new Date(Date.UTC(+y, +ay - 1, +gun))
    if (d.getUTCMonth() !== +ay - 1 || d.getUTCDate() !== +gun) return 'gecersiz'
  }
  if (sa != null && (+sa > 23 || +dk > 59 || (sn != null && +sn > 59))) return 'gecersiz'
  if (sa != null && !dilim) return 'saat-dilimi-yok'
  return 'tamam'
}

export const sureGecerli = (v) => /^P(?!$)(\d+(?:[.,]\d+)?Y)?(\d+(?:[.,]\d+)?M)?(\d+(?:[.,]\d+)?W)?(\d+(?:[.,]\d+)?D)?(T(?=\d)(\d+(?:[.,]\d+)?H)?(\d+(?:[.,]\d+)?M)?(\d+(?:[.,]\d+)?S)?)?$/.test(String(v ?? '').trim())

// Fiyat: 'tamam' | 'virgul' | 'gecersiz'
export function fiyatTuru(v) {
  if (typeof v === 'number') return Number.isFinite(v) && v >= 0 ? 'tamam' : 'gecersiz'
  const s = String(v ?? '').trim()
  if (/^\d+(\.\d+)?$/.test(s)) return 'tamam'
  if (/^\d{1,3}(\.\d{3})*,\d+$/.test(s) || /^\d+,\d+$/.test(s) || /^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) return 'virgul'
  return 'gecersiz'
}

const PARA_DUZELT = { TL: 'TRY', YTL: 'TRY', '₺': 'TRY', $: 'USD', US$: 'USD', '€': 'EUR', EURO: 'EUR', '£': 'GBP' }
export function paraBirimi(v) {
  const s = String(v ?? '').trim()
  if (/^[A-Z]{3}$/.test(s)) return { tamam: true }
  const oneri = PARA_DUZELT[s.toUpperCase()] || PARA_DUZELT[s] || (/^[a-z]{3}$/i.test(s) ? s.toUpperCase() : null)
  return { tamam: false, oneri }
}

// Puan değeri: sayı, "4.5", "60%", "6/10". Dönen: { sayi, olcek: 'sayi'|'yuzde'|'kesir', virgul } ya da null
export function puanOku(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? { sayi: v, olcek: 'sayi' } : null
  const s = String(v ?? '').trim()
  let m
  if ((m = s.match(/^(\d+(?:\.\d+)?)\s*%$/))) return { sayi: +m[1], olcek: 'yuzde' }
  if ((m = s.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/))) return { sayi: +m[1], ust: +m[2], olcek: 'kesir' }
  if (/^-?\d+(\.\d+)?$/.test(s)) return { sayi: +s, olcek: 'sayi' }
  if (/^\d+,\d+$/.test(s)) return { sayi: +s.replace(',', '.'), olcek: 'sayi', virgul: true }
  return null
}

const ENUM = {
  availability: ['InStock', 'OutOfStock', 'PreOrder', 'BackOrder', 'Discontinued', 'InStoreOnly', 'LimitedAvailability', 'OnlineOnly', 'SoldOut', 'PreSale', 'MadeToOrder', 'Reserved'],
  itemCondition: ['NewCondition', 'UsedCondition', 'RefurbishedCondition', 'DamagedCondition'],
  eventStatus: ['EventScheduled', 'EventCancelled', 'EventMovedOnline', 'EventPostponed', 'EventRescheduled'],
  eventAttendanceMode: ['OfflineEventAttendanceMode', 'OnlineEventAttendanceMode', 'MixedEventAttendanceMode'],
  employmentType: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'INTERN', 'VOLUNTEER', 'PER_DIEM', 'OTHER'],
}

const URL_OZELLIKLERI = new Set(['url', 'image', 'logo', 'sameAs', 'thumbnailUrl', 'contentUrl', 'embedUrl', 'item', 'mainEntityOfPage', 'acquireLicensePage', 'hasMap', 'discussionUrl', 'installUrl', 'downloadUrl', 'targetUrl', 'urlTemplate', 'license'])
const TARIH_OZELLIKLERI = new Set(['datePublished', 'dateModified', 'dateCreated', 'uploadDate', 'startDate', 'endDate', 'datePosted', 'validThrough', 'validFrom', 'priceValidUntil', 'foundingDate', 'expires', 'previousStartDate', 'birthDate', 'availabilityStarts', 'availabilityEnds', 'releaseDate', 'temporalCoverage'])
const SURE_OZELLIKLERI = new Set(['cookTime', 'prepTime', 'totalTime', 'duration', 'performTime', 'timeRequired'])
const FIYAT_OZELLIKLERI = new Set(['price', 'lowPrice', 'highPrice'])
// Değeri nesne olduğunda @type beklenen özellikler (iç içe türler)
const TIP_BEKLENEN = new Set(['offers', 'author', 'address', 'aggregateRating', 'review', 'reviewRating', 'location', 'publisher', 'hiringOrganization', 'jobLocation', 'geo', 'itemReviewed', 'provider', 'organizer', 'performer', 'brand', 'baseSalary', 'contactPoint', 'openingHoursSpecification', 'nutrition', 'itemListElement', 'mainEntity', 'acceptedAnswer', 'suggestedAnswer', 'priceSpecification', 'shippingDetails', 'hasMerchantReturnPolicy', 'containsPlace', 'creator', 'interactionStatistic', 'hasPart'])
// Değeri ayrı bir zengin sonuç öğesi olarak denetlenen iç içe özellikler
const TAM_DENETIM = new Set(['mainEntity', 'item', 'video', 'subjectOf'])

// ── Kurallar ─────────────────────────────────────────────────
// Her kural: { id, eslesir(tipler), denetle(n, d) }. d: denetim yardımcıları (aşağıda).

function ozellikVar(d, n, ad) {
  const v = n[ad]
  return !bosMu(v)
}

const KURALLAR = [
  {
    id: 'breadcrumb', eslesir: (t) => t.includes('BreadcrumbList'),
    denetle(n, d) {
      d.zorunlu(n, ['itemListElement'])
      const ogeler = dizi(n.itemListElement).map(x => d.coz(x)).filter(nesneMi)
      if (ogeler.length === 1) d.ekle('uyari', 'breadcrumb-tek')
      ogeler.forEach((o, i) => {
        const son = i === ogeler.length - 1
        const item = d.coz(o.item)
        const ad = !bosMu(o.name) || (nesneMi(item) && !bosMu(item.name))
        if (!tipleri(o).includes('ListItem')) d.ekle('uyari', 'liste-ogesi-tip', { no: i + 1 })
        if (bosMu(o.position)) d.ekle('hata', 'liste-ogesi-eksik', { no: i + 1, ozellik: 'position' })
        else if (Number(o.position) !== i + 1) d.ekle('uyari', 'breadcrumb-sira', { no: i + 1, deger: o.position })
        if (!ad) d.ekle('hata', 'liste-ogesi-eksik', { no: i + 1, ozellik: 'name' })
        const url = typeof item === 'string' ? item : nesneMi(item) ? (item['@id'] || item.url) : null
        if (!url && !son) d.ekle('hata', 'liste-ogesi-eksik', { no: i + 1, ozellik: 'item' })
      })
    },
  },
  {
    id: 'carousel', eslesir: (t) => t.includes('ItemList'),
    denetle(n, d) {
      d.zorunlu(n, ['itemListElement'])
      dizi(n.itemListElement).map(x => d.coz(x)).filter(nesneMi).forEach((o, i) => {
        if (bosMu(o.position)) d.ekle('hata', 'liste-ogesi-eksik', { no: i + 1, ozellik: 'position' })
        if (bosMu(o.url) && bosMu(o.item)) d.ekle('hata', 'liste-ogesi-eksik', { no: i + 1, ozellik: 'url' })
      })
    },
  },
  {
    id: 'article', eslesir: (t) => t.some(x => ART.has(x)),
    denetle(n, d) {
      d.onerilen(n, ['headline', 'image', 'datePublished', 'dateModified', 'author'])
      d.yazarlar(n)
      d.odemeDuvari(n)
    },
  },
  {
    id: 'product', eslesir: (t) => t.includes('Product') || t.includes('ProductGroup') || t.includes('IndividualProduct') || t.includes('ProductModel'),
    denetle(n, d) {
      d.zorunlu(n, ['name'])
      d.birini(n, ['offers', 'review', 'aggregateRating'])
      d.onerilen(n, ['image', 'description', 'brand', 'sku', 'offers', 'aggregateRating', 'review'])
      d.teklifler(n, { zorunlu: true })
      d.puanlar(n)
    },
  },
  {
    id: 'localbusiness', eslesir: (t) => t.some(x => LB.has(x)) && !t.includes('VacationRental'),
    denetle(n, d) {
      d.zorunlu(n, ['name', 'address'])
      d.onerilen(n, ['telephone', 'url', 'image', 'geo', 'openingHoursSpecification', 'priceRange'])
      d.adres(n.address)
      d.konum(n.geo)
      if (ozellikVar(d, n, 'aggregateRating') || ozellikVar(d, n, 'review')) d.ekle('bilgi', 'kendi-yorumu')
      d.puanlar(n)
    },
  },
  {
    id: 'organization', eslesir: (t) => t.some(x => ORG.has(x)),
    denetle(n, d) {
      d.onerilen(n, ['name', 'url', 'logo', 'sameAs', 'description'])
      if (n.address) d.adres(n.address)
      if (ozellikVar(d, n, 'aggregateRating') || ozellikVar(d, n, 'review')) d.ekle('bilgi', 'kendi-yorumu')
    },
  },
  {
    id: 'event', eslesir: (t) => t.some(x => EVT.has(x)),
    denetle(n, d) {
      d.zorunlu(n, ['name', 'startDate', 'location'])
      d.onerilen(n, ['description', 'endDate', 'eventStatus', 'eventAttendanceMode', 'image', 'offers', 'organizer', 'performer'])
      for (const l of dizi(n.location).map(x => d.coz(x)).filter(nesneMi)) {
        const tl = tipleri(l)
        if (tl.includes('VirtualLocation')) { if (bosMu(l.url)) d.ekle('hata', 'ic-zorunlu-eksik', { ust: 'location', ozellik: 'url' }) }
        else { if (bosMu(l.address)) d.ekle('hata', 'ic-zorunlu-eksik', { ust: 'location', ozellik: 'address' }); d.adres(l.address) }
      }
      d.teklifler(n, { zorunlu: false })
    },
  },
  {
    id: 'recipe', eslesir: (t) => t.includes('Recipe'),
    denetle(n, d) {
      d.zorunlu(n, ['name', 'image'])
      d.onerilen(n, ['author', 'datePublished', 'description', 'prepTime', 'cookTime', 'totalTime', 'recipeYield', 'recipeIngredient', 'recipeInstructions', 'recipeCategory', 'recipeCuisine', 'keywords', 'nutrition', 'aggregateRating', 'video'])
      d.puanlar(n)
    },
  },
  {
    id: 'video', eslesir: (t) => t.includes('VideoObject'),
    denetle(n, d) {
      d.zorunlu(n, ['name', 'thumbnailUrl', 'uploadDate'])
      d.onerilen(n, ['description', 'contentUrl', 'embedUrl', 'duration'])
    },
  },
  {
    id: 'jobposting', eslesir: (t) => t.includes('JobPosting'),
    denetle(n, d) {
      d.zorunlu(n, ['title', 'description', 'datePosted', 'hiringOrganization'])
      const uzaktan = dizi(n.jobLocationType).some(x => enumAd(x) === 'TELECOMMUTE')
      if (bosMu(n.jobLocation) && !(uzaktan && !bosMu(n.applicantLocationRequirements))) d.ekle('hata', 'is-konumu-eksik')
      d.onerilen(n, ['validThrough', 'employmentType', 'baseSalary', 'identifier', 'directApply'])
      for (const h of dizi(n.hiringOrganization).map(x => d.coz(x)).filter(nesneMi)) if (bosMu(h.name)) d.ekle('hata', 'ic-zorunlu-eksik', { ust: 'hiringOrganization', ozellik: 'name' })
      for (const l of dizi(n.jobLocation).map(x => d.coz(x)).filter(nesneMi)) {
        const adr = d.coz(l.address)
        if (bosMu(adr)) d.ekle('uyari', 'ic-onerilen-eksik', { ust: 'jobLocation', ozellikler: ['address'] })
        else if (nesneMi(adr) && bosMu(adr.addressCountry)) d.ekle('uyari', 'ic-onerilen-eksik', { ust: 'jobLocation.address', ozellikler: ['addressCountry'] })
      }
    },
  },
  {
    id: 'course', eslesir: (t) => t.includes('Course'),
    denetle(n, d) {
      d.zorunlu(n, ['name', 'description'])
      d.onerilen(n, ['provider'])
    },
  },
  {
    id: 'dataset', eslesir: (t) => t.includes('Dataset'),
    denetle(n, d) {
      d.zorunlu(n, ['name', 'description'])
      d.onerilen(n, ['url', 'sameAs', 'creator', 'license', 'keywords', 'identifier', 'temporalCoverage', 'spatialCoverage', 'distribution'])
      if (typeof n.description === 'string' && n.description.trim() && (n.description.length < 50 || n.description.length > 5000)) d.ekle('uyari', 'dataset-aciklama', { uzunluk: n.description.length })
    },
  },
  {
    id: 'forum', eslesir: (t) => t.includes('DiscussionForumPosting') || t.includes('SocialMediaPosting'),
    denetle(n, d) {
      d.zorunlu(n, ['author', 'datePublished'])
      d.birini(n, ['text', 'image', 'video'])
      d.onerilen(n, ['headline', 'url', 'dateModified'])
      d.yazarlar(n)
    },
  },
  {
    id: 'qa', eslesir: (t) => t.includes('QAPage'),
    denetle(n, d) {
      d.zorunlu(n, ['mainEntity'])
      for (const q of dizi(n.mainEntity).map(x => d.coz(x)).filter(nesneMi)) {
        for (const p of ['name', 'answerCount']) if (bosMu(q[p])) d.ekle('hata', 'ic-zorunlu-eksik', { ust: 'mainEntity', ozellik: p })
        if (bosMu(q.acceptedAnswer) && bosMu(q.suggestedAnswer)) d.ekle('hata', 'ic-zorunlu-eksik', { ust: 'mainEntity', ozellik: 'acceptedAnswer | suggestedAnswer' })
        for (const a of [...dizi(q.acceptedAnswer), ...dizi(q.suggestedAnswer)].map(x => d.coz(x)).filter(nesneMi)) if (bosMu(a.text)) d.ekle('hata', 'ic-zorunlu-eksik', { ust: 'Answer', ozellik: 'text' })
      }
    },
    ic: true, // mainEntity ayrıca denetlenmez
  },
  {
    id: 'profile', eslesir: (t) => t.includes('ProfilePage'),
    denetle(n, d) {
      d.zorunlu(n, ['mainEntity'])
      for (const m of dizi(n.mainEntity).map(x => d.coz(x)).filter(nesneMi)) if (bosMu(m.name)) d.ekle('hata', 'ic-zorunlu-eksik', { ust: 'mainEntity', ozellik: 'name' })
      d.onerilen(n, ['dateCreated', 'dateModified'])
    },
    ic: true,
  },
  {
    id: 'software', eslesir: (t) => t.some(x => SW.has(x)),
    denetle(n, d) {
      d.zorunlu(n, ['name'])
      const teklif = dizi(n.offers).map(x => d.coz(x)).filter(nesneMi)
      if (!teklif.length || teklif.every(o => bosMu(o.price) && bosMu(d.coz(o.priceSpecification)?.price))) d.ekle('hata', 'zorunlu-eksik', { ozellik: 'offers.price' })
      d.birini(n, ['aggregateRating', 'review'])
      d.onerilen(n, ['applicationCategory', 'operatingSystem'])
      d.puanlar(n)
    },
  },
  {
    id: 'employerrating', eslesir: (t) => t.includes('EmployerAggregateRating'),
    denetle(n, d) { d.zorunlu(n, ['itemReviewed', 'ratingValue']); d.birini(n, ['ratingCount', 'reviewCount']) },
  },
  {
    id: 'review', eslesir: (t) => t.includes('Review') && !t.includes('ClaimReview'),
    denetle(n, d) {
      d.zorunlu(n, ['author', 'reviewRating', 'itemReviewed'])
      const r = d.coz(n.reviewRating)
      if (nesneMi(r) && bosMu(r.ratingValue)) d.ekle('hata', 'ic-zorunlu-eksik', { ust: 'reviewRating', ozellik: 'ratingValue' })
      d.onerilen(n, ['datePublished'])
      d.yazarlar(n)
    },
  },
  {
    id: 'aggregaterating', eslesir: (t) => t.includes('AggregateRating'),
    denetle(n, d) { d.zorunlu(n, ['itemReviewed', 'ratingValue']); d.birini(n, ['ratingCount', 'reviewCount']) },
  },
  {
    id: 'movie', eslesir: (t) => t.includes('Movie'),
    denetle(n, d) { d.zorunlu(n, ['name', 'image']); d.onerilen(n, ['aggregateRating', 'dateCreated', 'director', 'review']); d.puanlar(n) },
  },
  {
    id: 'image', eslesir: (t) => t.includes('ImageObject') || t.includes('Photograph'),
    denetle(n, d) {
      d.zorunlu(n, ['contentUrl'])
      d.birini(n, ['creator', 'creditText', 'copyrightNotice', 'license'])
      d.onerilen(n, ['acquireLicensePage'])
    },
  },
  {
    id: 'vacationrental', eslesir: (t) => t.includes('VacationRental'),
    denetle(n, d) {
      d.zorunlu(n, ['name', 'identifier', 'image', 'latitude', 'longitude', 'containsPlace'])
      d.onerilen(n, ['address', 'aggregateRating', 'brand', 'checkinTime', 'checkoutTime', 'description', 'knowsLanguage', 'review'])
      d.konum({ latitude: n.latitude, longitude: n.longitude })
      d.puanlar(n)
    },
  },
  {
    id: 'website', eslesir: (t) => t.includes('WebSite'),
    denetle(n, d) {
      d.zorunlu(n, ['name', 'url'])
      d.onerilen(n, ['alternateName'])
      if (dizi(n.potentialAction).map(x => d.coz(x)).some(a => tipleri(a).includes('SearchAction'))) d.ekle('bilgi', 'arama-kutusu')
    },
  },
]

// Zengin sonuç özelliği olan türleri içeren tek kurala eşler (ilk eşleşen). LocalBusiness, Organization'dan önce gelir.
export function kuralBul(tipler) {
  const sira = ['breadcrumb', 'carousel', 'product', 'localbusiness', 'vacationrental', 'event', 'recipe', 'video', 'jobposting', 'course', 'dataset', 'forum', 'qa', 'profile', 'software', 'employerrating', 'aggregaterating', 'review', 'movie', 'image', 'article', 'organization', 'website']
  for (const id of sira) {
    const k = KURALLAR.find(x => x.id === id)
    if (k.eslesir(tipler)) return k
  }
  return null
}

// ── Ana doğrulama ────────────────────────────────────────────

/**
 * dogrula(metin) → {
 *   tur, genel: [bulgu], bloklar: [{ no, satir, hata, varliklar: [rapor] }], ozet: { blok, varlik, hata, uyari, uygun: [kural id] }
 * }
 * rapor: { tipler, yol, satir, ad, kural, durum: 'uygun' | 'eksik' | 'zengin-yok' | 'ozellik-yok' | 'tipsiz', neden?, bulgular, icTurler }
 * bulgu: { seviye: 'hata' | 'uyari' | 'bilgi', kod, satir?, ...parametreler }
 */
export function dogrula(metin) {
  const ham = String(metin || '')
  const konumBul = satirTablosu(ham)
  const bul = bloklariBul(ham)
  const genel = []
  const sonuc = { tur: bul.tur, genel, bloklar: [], ozet: { blok: 0, varlik: 0, hata: 0, uyari: 0, uygun: [] } }
  if (bul.tur === 'bos') return sonuc
  if (bul.tur === 'html') {
    if (!bul.bloklar.length) genel.push({ seviye: 'hata', kod: 'blok-yok' })
    if (bul.mikrodata || bul.rdfa) genel.push({ seviye: 'bilgi', kod: 'mikrodata' })
  }

  // 1) Ayrıştır
  const ayrik = bul.bloklar.map((b, i) => {
    const r = jsonAyristir(ham, b.bas, b.son)
    const ilk = ham.slice(b.bas, b.son).search(/\S/)
    const blok = { no: i + 1, satir: konumBul(ilk < 0 ? b.bas : b.bas + ilk).satir, hata: null, uyarilar: [], varliklar: [] }
    if (r.hata) {
      if (r.hata.kod === 'bos') blok.bos = true
      else blok.hata = { ...r.hata, ...konumBul(r.hata.idx) }
    } else {
      blok.deger = r.deger
      blok.konumlar = r.konumlar
      blok.uyarilar = r.uyarilar.map(u => ({ seviye: 'uyari', kod: u.kod, anahtar: u.anahtar, satir: konumBul(u.idx).satir }))
    }
    return blok
  })

  // 2) @id dizini (tüm bloklar)
  const idler = new Map()
  const idTopla = (v) => {
    if (Array.isArray(v)) return v.forEach(idTopla)
    if (!nesneMi(v)) return
    if (typeof v['@id'] === 'string' && !yalnizIdMi(v) && !idler.has(v['@id'])) idler.set(v['@id'], v)
    for (const k of Object.keys(v)) idTopla(v[k])
  }
  ayrik.forEach(b => b.deger !== undefined && idTopla(b.deger))
  const coz = (v) => (yalnizIdMi(v) && idler.has(v['@id']) ? idler.get(v['@id']) : v)

  // 3) Varlıkları denetle
  for (const blok of ayrik) {
    sonuc.bloklar.push(blok)
    if (blok.deger === undefined) continue
    const konumlar = blok.konumlar
    const satirOf = (n, anahtar) => {
      const k = konumlar.get(n)
      if (!k) return null
      const idx = anahtar && k.anahtarlar[anahtar] != null ? k.anahtarlar[anahtar] : k.idx
      return konumBul(idx).satir
    }

    // Üst düzey öğeler: dizi, @graph ya da tek nesne. @context üst düzeyden alt öğelere geçer.
    const ustler = []
    const topla = (v, yol, ctx) => {
      if (Array.isArray(v)) return v.forEach((x, i) => topla(x, `${yol}[${i}]`, ctx))
      if (!nesneMi(v)) { blok.uyarilar.push({ seviye: 'hata', kod: 'nesne-degil', yol }); return }
      const c = v['@context'] !== undefined ? v['@context'] : ctx
      if (Array.isArray(v['@graph'])) {
        // @context yoksa blok için bir kez bildirilir; @graph öğeleri aynı hatayı tekrar etmez
        if (c === undefined) blok.uyarilar.push({ seviye: 'hata', kod: 'context-yok', satir: satirOf(v) })
        v['@graph'].forEach((x, i) => topla(x, `${yol ? `${yol} › ` : ''}@graph[${i}]`, c === undefined ? CONTEXT_BILDIRILDI : c))
        return
      }
      ustler.push({ n: v, yol: yol || '', ctx: c })
    }
    topla(blok.deger, '', undefined)

    const raporlar = []
    const denetle = (n, yol, ctx, icMi) => {
      const tipler = tipleri(n)
      const rapor = { tipler, yol, satir: satirOf(n), ad: typeof n.name === 'string' ? n.name : (typeof n.headline === 'string' ? n.headline : null), kural: null, durum: 'ozellik-yok', bulgular: [], icTurler: [] }
      raporlar.push(rapor)
      const ekle = (seviye, kod, p = {}, satir = null) => rapor.bulgular.push({ seviye, kod, satir: satir ?? p.satir ?? rapor.satir, ...p })

      if (!icMi && ctx !== CONTEXT_BILDIRILDI) {
        const cd = contextKontrol(ctx)
        if (cd === 'yok') ekle('hata', 'context-yok')
        else if (cd === 'yabanci') ekle('uyari', 'context-yabanci', { deger: typeof ctx === 'string' ? ctx : JSON.stringify(ctx).slice(0, 80) })
      }
      if (n['@type'] !== undefined && !tipler.length) ekle('hata', 'tip-gecersiz')
      if (!tipler.length) {
        if (yalnizIdMi(n)) { rapor.durum = 'referans'; return rapor }
        if (n['@type'] === undefined) ekle('hata', 'tip-yok')
        rapor.durum = 'tipsiz'
      }
      for (const t of tipler) {
        if (BILINEN_TURLER.has(t)) continue
        const dogru = KUCUK_TURLER.get(t.toLowerCase()) || KUCUK_TURLER.get(enumAd(t).toLowerCase())
        // Google tür adlarını büyük ve küçük harfe duyarlı eşler: "localBusiness" tanınmaz
        if (dogru && dogru !== t) ekle(enumAd(t) === dogru ? 'bilgi' : 'hata', enumAd(t) === dogru ? 'tip-onekli' : 'tip-harf', { deger: t, dogru })
        else if (!dogru) ekle('bilgi', 'tip-bilinmeyen', { deger: t })
      }
      const tiplerNormal = tipler.map(t => KUCUK_TURLER.get(enumAd(t).toLowerCase()) || t)

      const kural = tiplerNormal.length ? kuralBul(tiplerNormal) : null
      const zorunluSet = new Set()
      const yardimci = {
        coz,
        ekle,
        zorunlu(nd, liste) {
          for (const p of liste) { zorunluSet.add(p); if (bosMu(nd[p])) ekle('hata', 'zorunlu-eksik', { ozellik: p }) }
        },
        birini(nd, liste) {
          if (liste.every(p => bosMu(nd[p]))) ekle('hata', 'zorunlu-birini', { ozellikler: liste })
        },
        onerilen(nd, liste) {
          const eksik = liste.filter(p => bosMu(nd[p]))
          if (eksik.length) ekle('uyari', 'onerilen-eksik', { ozellikler: eksik })
        },
        yazarlar(nd) {
          for (const a of dizi(nd.author).map(x => coz(x))) {
            if (typeof a === 'string') ekle('uyari', 'yazar-metin', { deger: a, satir: satirOf(nd, 'author') })
            else if (nesneMi(a) && bosMu(a.name) && !yalnizIdMi(a)) ekle('uyari', 'ic-onerilen-eksik', { ust: 'author', ozellikler: ['name'], satir: satirOf(a) })
          }
        },
        adres(a0) {
          const a = coz(a0)
          if (typeof a === 'string' && a.trim()) ekle('uyari', 'adres-metin', { deger: a.slice(0, 80) })
          else if (nesneMi(a) && !yalnizIdMi(a)) {
            const eksik = ['streetAddress', 'addressLocality', 'postalCode', 'addressCountry'].filter(p => bosMu(a[p]))
            if (eksik.length) ekle('uyari', 'ic-onerilen-eksik', { ust: 'address', ozellikler: eksik, satir: satirOf(a) })
          }
        },
        konum(g0) {
          const g = coz(g0)
          if (!nesneMi(g)) return
          const enlem = Number(String(g.latitude ?? '').replace(',', '.'))
          const boylam = Number(String(g.longitude ?? '').replace(',', '.'))
          if (g.latitude != null && (!Number.isFinite(enlem) || Math.abs(enlem) > 90)) ekle('uyari', 'konum-gecersiz', { ozellik: 'latitude', deger: g.latitude })
          if (g.longitude != null && (!Number.isFinite(boylam) || Math.abs(boylam) > 180)) ekle('uyari', 'konum-gecersiz', { ozellik: 'longitude', deger: g.longitude })
        },
        teklifler(nd, { zorunlu }) {
          for (const o of dizi(nd.offers).map(x => coz(x)).filter(nesneMi)) {
            if (yalnizIdMi(o)) continue
            const t = tipleri(o)
            const ps = coz(o.priceSpecification)
            const satir = satirOf(o)
            if (t.includes('AggregateOffer')) {
              for (const p of ['lowPrice', 'priceCurrency']) if (bosMu(o[p])) ekle(zorunlu ? 'hata' : 'uyari', zorunlu ? 'ic-zorunlu-eksik' : 'ic-onerilen-eksik', zorunlu ? { ust: 'offers', ozellik: p, satir } : { ust: 'offers', ozellikler: [p], satir })
              const eksik = ['highPrice', 'offerCount'].filter(p => bosMu(o[p]))
              if (eksik.length) ekle('uyari', 'ic-onerilen-eksik', { ust: 'offers', ozellikler: eksik, satir })
            } else {
              const fiyat = !bosMu(o.price) || (nesneMi(ps) && !bosMu(ps.price))
              const para = !bosMu(o.priceCurrency) || (nesneMi(ps) && !bosMu(ps.priceCurrency))
              if (zorunlu) {
                if (!fiyat) ekle('hata', 'ic-zorunlu-eksik', { ust: 'offers', ozellik: 'price', satir })
                if (fiyat && !para) ekle('hata', 'ic-zorunlu-eksik', { ust: 'offers', ozellik: 'priceCurrency', satir })
                if (bosMu(o.availability)) ekle('uyari', 'ic-onerilen-eksik', { ust: 'offers', ozellikler: ['availability'], satir })
              } else {
                const eksik = ['price', 'priceCurrency', 'availability', 'url', 'validFrom'].filter(p => p === 'price' ? !fiyat : p === 'priceCurrency' ? !para : bosMu(o[p]))
                if (eksik.length) ekle('uyari', 'ic-onerilen-eksik', { ust: 'offers', ozellikler: eksik, satir })
              }
            }
          }
        },
        puanlar(nd) {
          const ar = coz(nd.aggregateRating)
          if (nesneMi(ar) && !yalnizIdMi(ar)) {
            if (bosMu(ar.ratingValue)) ekle('hata', 'ic-zorunlu-eksik', { ust: 'aggregateRating', ozellik: 'ratingValue', satir: satirOf(ar) })
            if (bosMu(ar.ratingCount) && bosMu(ar.reviewCount)) ekle('hata', 'ic-zorunlu-eksik', { ust: 'aggregateRating', ozellik: 'ratingCount | reviewCount', satir: satirOf(ar) })
          }
          for (const r of dizi(nd.review).map(x => coz(x)).filter(nesneMi)) {
            if (yalnizIdMi(r)) continue
            if (bosMu(r.author)) ekle('hata', 'ic-zorunlu-eksik', { ust: 'review', ozellik: 'author', satir: satirOf(r) })
            const rr = coz(r.reviewRating)
            if (bosMu(rr)) ekle('hata', 'ic-zorunlu-eksik', { ust: 'review', ozellik: 'reviewRating', satir: satirOf(r) })
            else if (nesneMi(rr) && bosMu(rr.ratingValue)) ekle('hata', 'ic-zorunlu-eksik', { ust: 'review.reviewRating', ozellik: 'ratingValue', satir: satirOf(rr) })
          }
        },
        odemeDuvari(nd) {
          const v = nd.isAccessibleForFree
          if (v === false || String(v).toLowerCase() === 'false') {
            const parca = dizi(nd.hasPart).map(x => coz(x)).filter(nesneMi)
            if (!parca.some(p => (p.isAccessibleForFree === false || String(p.isAccessibleForFree).toLowerCase() === 'false') && !bosMu(p.cssSelector))) ekle('uyari', 'odeme-duvari')
          }
        },
      }

      const zy = tiplerNormal.find(t => ZENGIN_YOK[t])
      if (zy) {
        rapor.durum = 'zengin-yok'
        rapor.neden = ZENGIN_YOK[zy]
        ekle('bilgi', 'zengin-sonuc-yok', { tip: zy, neden: ZENGIN_YOK[zy] })
        if (zy === 'FAQPage') {
          const sorular = dizi(n.mainEntity).map(x => coz(x)).filter(nesneMi)
          if (!sorular.length) ekle('uyari', 'zorunlu-eksik', { ozellik: 'mainEntity' })
          sorular.forEach((q, i) => {
            if (bosMu(q.name)) ekle('uyari', 'liste-ogesi-eksik', { no: i + 1, ozellik: 'name', satir: satirOf(q) })
            const a = coz(q.acceptedAnswer)
            if (!nesneMi(a) || bosMu(a.text)) ekle('uyari', 'liste-ogesi-eksik', { no: i + 1, ozellik: 'acceptedAnswer.text', satir: satirOf(q) })
          })
        }
      } else if (kural) {
        rapor.kural = kural.id
        kural.denetle(n, yardimci)
      }

      // Değer kontrolleri ve iç içe türler (iç öğeleri gez, ayrıca denetlenecek iç öğelere girme)
      const gez = (v, ozellik, ust, derinlik) => {
        if (derinlik > 12) return
        if (Array.isArray(v)) { v.forEach(x => gez(x, ozellik, ust, derinlik)); return }
        if (nesneMi(v)) {
          if (derinlik > 0) {
            const tl = tipleri(v)
            if (TAM_DENETIM.has(ozellik) && tl.length && !(kural && kural.ic && ozellik === 'mainEntity') && (kuralBul(tl.map(t => KUCUK_TURLER.get(enumAd(t).toLowerCase()) || t)) || tl.some(t => ZENGIN_YOK[t]))) {
              rapor.icTurler.push(...tl)
              denetle(v, `${yol ? `${yol} › ` : ''}${ozellik}`, ctx, true)
              return
            }
            if (tl.length) rapor.icTurler.push(...tl)
            else if (TIP_BEKLENEN.has(ozellik) && !yalnizIdMi(v) && typeof v['@value'] === 'undefined') ekle('uyari', 'ic-tip-yok', { ozellik, satir: satirOf(v) })
            if (v['@context'] !== undefined && contextKontrol(v['@context']) === 'yabanci') ekle('uyari', 'context-yabanci', { deger: (typeof v['@context'] === 'string' ? v['@context'] : JSON.stringify(v['@context'])).slice(0, 80), satir: satirOf(v) })
          }
          const tl = tipleri(v)
          // Puan
          if (tl.some(t => /Rating$/.test(t))) {
            const deger = v.ratingValue
            if (deger != null && deger !== '') {
              const p = puanOku(deger)
              const enIyi = v.bestRating != null ? Number(v.bestRating) : 5
              const enKotu = v.worstRating != null ? Number(v.worstRating) : 1
              if (!p) ekle('hata', 'puan-gecersiz', { deger, satir: satirOf(v, 'ratingValue') })
              else {
                if (p.virgul) ekle('uyari', 'puan-virgul', { deger, satir: satirOf(v, 'ratingValue') })
                if (p.olcek === 'sayi' && Number.isFinite(enIyi) && Number.isFinite(enKotu)) {
                  if (enIyi <= enKotu) ekle('hata', 'puan-olcek', { enIyi, enKotu, satir: satirOf(v, 'bestRating') })
                  else if (p.sayi < enKotu || p.sayi > enIyi) ekle('hata', 'puan-aralik', { deger, enKotu, enIyi, satir: satirOf(v, 'ratingValue') })
                }
                if (p.olcek === 'yuzde' && p.sayi > 100) ekle('hata', 'puan-aralik', { deger, enKotu: '0%', enIyi: '100%', satir: satirOf(v, 'ratingValue') })
                if (p.olcek === 'kesir' && (p.sayi > p.ust || p.ust === 0)) ekle('hata', 'puan-aralik', { deger, enKotu: 0, enIyi: p.ust, satir: satirOf(v, 'ratingValue') })
              }
            }
            for (const c of ['ratingCount', 'reviewCount']) {
              if (v[c] == null || v[c] === '') continue
              const sayi = Number(v[c])
              if (!Number.isInteger(sayi) || sayi < 0) ekle('uyari', 'sayi-gecersiz', { ozellik: c, deger: v[c], satir: satirOf(v, c) })
              else if (sayi === 0) ekle('uyari', 'sayi-sifir', { ozellik: c, satir: satirOf(v, c) })
            }
          }
          for (const k of Object.keys(v)) {
            if (k.startsWith('@')) continue
            const x = v[k]
            const zorunluMu = derinlik === 0 && zorunluSet.has(k)
            const sat = satirOf(v, k)
            if (typeof x === 'string' && !x.trim() && !zorunluMu) ekle('uyari', 'bos-deger', { ozellik: k, satir: sat })
            if (URL_OZELLIKLERI.has(k) && !(k === 'license' && !/^(https?:|\/|www\.)/i.test(String(x)))) {
              for (const u of dizi(x)) {
                if (typeof u !== 'string' || !u.trim()) continue
                const tu = urlTuru(u)
                if (tu === 'goreli') ekle('uyari', 'url-goreli', { ozellik: k, deger: u, satir: sat })
                else if (tu === 'gecersiz') ekle(zorunluMu ? 'hata' : 'uyari', 'url-gecersiz', { ozellik: k, deger: u, satir: sat })
              }
            }
            if (TARIH_OZELLIKLERI.has(k) && k !== 'temporalCoverage') {
              for (const u of dizi(x)) {
                if (typeof u !== 'string' || !u.trim()) continue
                const tt = tarihTuru(u)
                if (tt === 'gecersiz') ekle(zorunluMu ? 'hata' : 'uyari', 'tarih-gecersiz', { ozellik: k, deger: u, satir: sat })
                else if (tt === 'saat-dilimi-yok') ekle('bilgi', 'tarih-saat-dilimi', { ozellik: k, deger: u, satir: sat })
              }
            }
            if (SURE_OZELLIKLERI.has(k)) for (const u of dizi(x)) if (typeof u === 'string' && u.trim() && !sureGecerli(u)) ekle('uyari', 'sure-gecersiz', { ozellik: k, deger: u, satir: sat })
            if (FIYAT_OZELLIKLERI.has(k) && x != null && x !== '') {
              const ft = fiyatTuru(x)
              if (ft === 'virgul') ekle('uyari', 'fiyat-virgul', { ozellik: k, deger: x, satir: sat })
              else if (ft === 'gecersiz') ekle('hata', 'fiyat-gecersiz', { ozellik: k, deger: x, satir: sat })
            }
            if ((k === 'priceCurrency' || (k === 'currency' && tl.includes('MonetaryAmount'))) && typeof x === 'string' && x.trim()) {
              const pb = paraBirimi(x)
              if (!pb.tamam) ekle('hata', 'para-birimi-gecersiz', { deger: x, oneri: pb.oneri, satir: sat })
            }
            if (ENUM[k]) {
              for (const u of dizi(x)) {
                if (typeof u !== 'string') continue
                if (!ENUM[k].includes(enumAd(u))) ekle('uyari', 'deger-bilinmeyen', { ozellik: k, deger: u, gecerli: ENUM[k], satir: sat })
              }
            }
            if (k === 'telephone' && typeof x === 'string' && x.trim() && !x.trim().startsWith('+')) ekle('bilgi', 'telefon-ulke', { deger: x, satir: sat })
            gez(x, k, v, derinlik + 1)
          }
        }
      }
      gez(n, '', null, 0)
      rapor.icTurler = [...new Set(rapor.icTurler)]

      if (rapor.durum !== 'zengin-yok' && rapor.durum !== 'tipsiz') {
        if (kural) rapor.durum = rapor.bulgular.some(b => b.seviye === 'hata') ? 'eksik' : 'uygun'
        else rapor.durum = 'ozellik-yok'
      }
      return rapor
    }

    for (const u of ustler) denetle(u.n, u.yol, u.ctx, false)
    blok.varliklar = raporlar
  }

  // 4) Özet
  const say = (seviye) => { if (seviye === 'hata') sonuc.ozet.hata++; else if (seviye === 'uyari') sonuc.ozet.uyari++ }
  for (const b of sonuc.bloklar) {
    if (b.hata) say('hata')
    if (b.bos) say('uyari')
    for (const u of b.uyarilar) say(u.seviye)
    for (const v of b.varliklar) {
      sonuc.ozet.varlik++
      for (const x of v.bulgular) say(x.seviye)
      if (v.durum === 'uygun' && !sonuc.ozet.uygun.includes(v.kural)) sonuc.ozet.uygun.push(v.kural)
    }
    // Ayrıştırıcı yardımcıları sonuçta tutulmaz (JSON'a çevrilebilir kalsın)
    delete b.konumlar
    delete b.deger
  }
  sonuc.ozet.blok = sonuc.bloklar.length
  for (const g of genel) say(g.seviye)
  return sonuc
}

// Örnek girdiler (sayfadaki "örnek yükle" düğmeleri). ORNEKLER_EN İngilizce sayfada kullanılır, hataları aynıdır.
export const ORNEKLER = {
  urun: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Seramik Kupa 350 ml",
  "image": "/img/kupa.jpg",
  "brand": { "@type": "Brand", "name": "Atölye" },
  "offers": {
    "@type": "Offer",
    "price": "249,90 TL",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "reviewCount": "37"
  }
}
</script>`,
  makale: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://www.ornek.com/blog/seo-nedir#makale",
      "headline": "SEO nedir?",
      "image": ["https://www.ornek.com/img/seo.jpg"],
      "datePublished": "2026-03-14T09:00:00+03:00",
      "dateModified": "2026-10-02",
      "author": { "@id": "https://www.ornek.com/#yazar" }
    },
    {
      "@type": "Person",
      "@id": "https://www.ornek.com/#yazar",
      "name": "Ayşe Yılmaz",
      "url": "https://www.ornek.com/hakkimda"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Blog", "item": "https://www.ornek.com/blog" },
        { "@type": "ListItem", "position": 2, "name": "SEO nedir?" }
      ]
    }
  ]
}`,
  sss: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Kargo ne kadar sürer?",
    "acceptedAnswer": { "@type": "Answer", "text": "Siparişler 1 ile 3 iş günü içinde kargoya verilir." }
  }]
}
</script>`,
  hatali: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Örnek Diş Kliniği",
  "telephone": "0212 000 00 00",
}`,
}

export const ORNEKLER_EN = {
  urun: ORNEKLER.urun.replace('Seramik Kupa 350 ml', 'Ceramic Mug 350 ml').replace('/img/kupa.jpg', '/img/mug.jpg').replace('Atölye', 'Studio').replace('249,90 TL', '24,90 USD'),
  makale: ORNEKLER.makale
    .replace(/www\.ornek\.com/g, 'www.example.com').replace('/blog/seo-nedir', '/blog/what-is-seo').replace(/SEO nedir\?/g, 'What is SEO?')
    .replace('Ayşe Yılmaz', 'Jane Smith').replace('/hakkimda', '/about').replace(/#yazar/g, '#author').replace(/#makale/g, '#article')
    .replace('2026-03-14T09:00:00+03:00', '2026-03-14T09:00:00+00:00'),
  sss: ORNEKLER.sss.replace('Kargo ne kadar sürer?', 'How long does shipping take?').replace('Siparişler 1 ile 3 iş günü içinde kargoya verilir.', 'Orders ship within 1 to 3 business days.'),
  hatali: ORNEKLER.hatali.replace('Örnek Diş Kliniği', 'Example Dental Clinic').replace('0212 000 00 00', '020 7946 0000'),
}
