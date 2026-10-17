// ─────────────────────────────────────────────────────────────
// Ayrı dosyalarda tutulan blog yazıları.
// lib/blog-icerikler.js içindeki ICERIKLER objesine eklenir; yapı aynıdır
// (baslik_tr/en, meta_desc_tr/en, bolumler_tr/en ...).
//
// Yeni yazı eklemek için: bu klasöre <slug>.js dosyası ekleyin, aşağıya
// import edin, ardından lib/content-index.js, lib/blog-meta.js ve
// pages/blog.js → TUM_YAZILAR listelerini güncelleyin.
// ─────────────────────────────────────────────────────────────
import seoAjansiFiyatlari from './seo-ajansi-fiyatlari'
import chatgptMarkaGorunurlugu from './chatgpt-marka-gorunurlugu'
import llmsTxtRehberi from './llms-txt-rehberi'
import seoUzmaniMiSeoAjansiMi from './seo-uzmani-mi-seo-ajansi-mi'
import googleBusinessProfile from './google-business-profile'

export const YENI_YAZILAR = {
  'seo-ajansi-fiyatlari': seoAjansiFiyatlari,
  'chatgpt-marka-gorunurlugu': chatgptMarkaGorunurlugu,
  'llms-txt-rehberi': llmsTxtRehberi,
  'seo-uzmani-mi-seo-ajansi-mi': seoUzmaniMiSeoAjansiMi,
  'google-business-profile': googleBusinessProfile,
}
