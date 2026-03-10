import { ThemeToggle } from './components/theme-toggle'
import { CVContent } from './components/cv-content'

export default function Page() {
  return (
    <>
      <div className="floating-controls">
        <ThemeToggle />
      </div>
      <CVContent />
    </>
  )
}
