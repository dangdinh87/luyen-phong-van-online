import { ThemeToggle } from './components/theme-toggle'
import { LanguageSwitcher } from './components/language-switcher'
import { CVContent } from './components/cv-content'

export default function Page() {
  return (
    <>
      <div className="floating-controls">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      <CVContent />
    </>
  )
}
