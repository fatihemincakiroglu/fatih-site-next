// ─────────────────────────────────────────────────────────────
// Ayrı dosyalarda tutulan blog yazıları.
// lib/blog-icerikler.js içindeki ICERIKLER objesine eklenir; yapı aynıdır
// (baslik_tr/en, meta_desc_tr/en, bolumler_tr/en ...).
//
// Yeni yazı eklemek için: bu klasöre <slug>.js veya <slug>.json dosyası ekleyin, aşağıya
// import edin, ardından lib/content-index.js, lib/blog-meta.js ve
// pages/blog.js → TUM_YAZILAR listelerini güncelleyin.
// ─────────────────────────────────────────────────────────────
import seoAjansiFiyatlari from './seo-ajansi-fiyatlari'
import chatgptMarkaGorunurlugu from './chatgpt-marka-gorunurlugu'
import llmsTxtRehberi from './llms-txt-rehberi'
import seoUzmaniMiSeoAjansiMi from './seo-uzmani-mi-seo-ajansi-mi'
import googleBusinessProfile from './google-business-profile'
// Ekim 2026: JSON biçimindeki yazılar
import tarandi_dizine_eklenmemis from './tarandi-dizine-eklenmemis.json'
import cekirdek_guncelleme_trafik_dususu from './cekirdek-guncelleme-trafik-dususu.json'
import programatik_seo from './programatik-seo.json'
import e_ticaret_altyapisi_seo_karsilastirma from './e-ticaret-altyapisi-seo-karsilastirma.json'
import trendyol_magazasi_mi_kendi_site_mi from './trendyol-magazasi-mi-kendi-site-mi.json'
import avukatlar_icin_seo from './avukatlar-icin-seo.json'
import dis_klinikleri_yerel_seo from './dis-klinikleri-yerel-seo.json'
import google_ai_mode_turkiye from './google-ai-mode-turkiye.json'
import perplexity_kaynak_gosterilme from './perplexity-kaynak-gosterilme.json'
import marka_bahsi_brand_mention from './marka-bahsi-brand-mention.json'
import yoast_mu_rank_math_mi from './yoast-mu-rank-math-mi.json'
import yapay_zeka_icerik_google_politikasi from './yapay-zeka-icerik-google-politikasi.json'
import ga4_yapay_zeka_trafigi from './ga4-yapay-zeka-trafigi.json'
import seo_mu_google_ads_mi from './seo-mu-google-ads-mi.json'
import google_yorumlarina_cevap from './google-yorumlarina-cevap.json'

export const YENI_YAZILAR = {
  'seo-ajansi-fiyatlari': seoAjansiFiyatlari,
  'chatgpt-marka-gorunurlugu': chatgptMarkaGorunurlugu,
  'llms-txt-rehberi': llmsTxtRehberi,
  'seo-uzmani-mi-seo-ajansi-mi': seoUzmaniMiSeoAjansiMi,
  'google-business-profile': googleBusinessProfile,
  'tarandi-dizine-eklenmemis': tarandi_dizine_eklenmemis,
  'cekirdek-guncelleme-trafik-dususu': cekirdek_guncelleme_trafik_dususu,
  'programatik-seo': programatik_seo,
  'e-ticaret-altyapisi-seo-karsilastirma': e_ticaret_altyapisi_seo_karsilastirma,
  'trendyol-magazasi-mi-kendi-site-mi': trendyol_magazasi_mi_kendi_site_mi,
  'avukatlar-icin-seo': avukatlar_icin_seo,
  'dis-klinikleri-yerel-seo': dis_klinikleri_yerel_seo,
  'google-ai-mode-turkiye': google_ai_mode_turkiye,
  'perplexity-kaynak-gosterilme': perplexity_kaynak_gosterilme,
  'marka-bahsi-brand-mention': marka_bahsi_brand_mention,
  'yoast-mu-rank-math-mi': yoast_mu_rank_math_mi,
  'yapay-zeka-icerik-google-politikasi': yapay_zeka_icerik_google_politikasi,
  'ga4-yapay-zeka-trafigi': ga4_yapay_zeka_trafigi,
  'seo-mu-google-ads-mi': seo_mu_google_ads_mi,
  'google-yorumlarina-cevap': google_yorumlarina_cevap,
}
