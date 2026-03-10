'use client'

import { useLanguage } from '../context/language-context'

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguage()

  return (
    <button
      className="floating-btn"
      onClick={toggleLocale}
      aria-label={`Switch to ${locale === 'en' ? 'Vietnamese' : 'English'}`}
      title={locale === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
    >
      {locale === 'en' ? 'VI' : 'EN'}
    </button>
  )
}
