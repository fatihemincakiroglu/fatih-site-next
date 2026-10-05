import Image from 'next/image'

// Yazar fotoğrafı: yazar kutuları, hero ve hakkımda sayfasında kullanılır.
// Kaynak: public/images/fatih-emin-cakiroglu.jpg (512×512, kare kırpım).
// next/image istenen boyuta göre küçültüp AVIF/WebP olarak sunar.
export const YAZAR_FOTO = '/images/fatih-emin-cakiroglu.jpg'

export default function YazarFoto({ size = 44, style, priority = false }) {
  return (
    <Image
      src={YAZAR_FOTO}
      alt="Fatih Emin Çakıroğlu"
      width={size}
      height={size}
      priority={priority}
      style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0, display: 'block', ...style }}
    />
  )
}
