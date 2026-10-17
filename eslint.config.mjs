// ESLint 9 (flat config) + eslint-config-next.
//
// eslint-config-next 15.x paketi hâlâ eski ".eslintrc" biçiminde yayınlanıyor;
// "eslint-config-next/core-web-vitals" gibi alt yollar flat config olarak
// import edilemiyor (npm run lint bu yüzden ERR_MODULE_NOT_FOUND veriyordu).
// FlatCompat, eski biçimdeki ayarı flat config'e çeviriyor.
//
// Proje tamamen JavaScript olduğu için "next/typescript" eklenmedi.
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __dirname = dirname(fileURLToPath(import.meta.url))
const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts', 'public/**'],
  },
  ...compat.extends('next/core-web-vitals'),
]

export default eslintConfig
