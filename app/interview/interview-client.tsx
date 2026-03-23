'use client'

import { useState, useEffect, useCallback } from 'react'
import { QA_DATA } from './interview-data'
import { useInterviewStore } from './use-interview-store'
import { QACard } from './qa-card'
import { useTheme } from '../context/theme-context'
import Link from 'next/link'

const ITEMS_PER_PAGE = 50
const FONT_KEY = 'iv_font_size'

const COMPANY_CATEGORIES = ['FPT Software']
const FONT_DEFAULT = 16

function loadFontSize(): number {
  if (typeof window === 'undefined') return FONT_DEFAULT
  return parseInt(localStorage.getItem(FONT_KEY) || String(FONT_DEFAULT), 10)
}

function SidebarTabs({ categoryCounts, activeCategory, totalCount, onSelect }: {
  categoryCounts: Record<string, number>
  activeCategory: string
  totalCount: number
  onSelect: (cat: string) => void
}) {
  const [tab, setTab] = useState<'topic' | 'company'>('topic')
  const companyEntries = Object.entries(categoryCounts).filter(([cat]) => COMPANY_CATEGORIES.includes(cat))
  const topicEntries = Object.entries(categoryCounts).filter(([cat]) => !COMPANY_CATEGORIES.includes(cat))

  return (
    <>
      <div
        className={`iv-sidebar-item ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelect('all')}
      >
        <span>Tất Cả</span>
        <span className="iv-sidebar-count">{totalCount}</span>
      </div>
      <div className="iv-sidebar-tabs">
        <button className={`iv-sidebar-tab ${tab === 'topic' ? 'active' : ''}`} onClick={() => setTab('topic')}>
          Chủ Đề
        </button>
        <button className={`iv-sidebar-tab ${tab === 'company' ? 'active' : ''}`} onClick={() => setTab('company')}>
          Công Ty
        </button>
      </div>
      <div className="iv-sidebar-list">
        {tab === 'topic' ? (
          topicEntries.map(([cat, count]) => (
            <div key={cat} className={`iv-sidebar-item ${activeCategory === cat ? 'active' : ''}`} onClick={() => onSelect(cat)}>
              <span>{cat}</span>
              <span className="iv-sidebar-count">{count}</span>
            </div>
          ))
        ) : (
          companyEntries.length > 0 ? companyEntries.map(([cat, count]) => (
            <div key={cat} className={`iv-sidebar-item ${activeCategory === cat ? 'active' : ''}`} onClick={() => onSelect(cat)}>
              <span>{cat}</span>
              <span className="iv-sidebar-count">{count}</span>
            </div>
          )) : (
            <div className="iv-sidebar-empty">Chưa có dữ liệu công ty</div>
          )
        )}
      </div>
    </>
  )
}

export function InterviewClient() {
  const { theme, toggleTheme } = useTheme()
  const store = useInterviewStore(QA_DATA)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(loadFontSize)

  // Persist font size
  useEffect(() => { localStorage.setItem(FONT_KEY, String(fontSize)) }, [fontSize])

  // Reset visible count on filter change
  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE) }, [store.activeCategory, store.activeLevel, store.search])

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        document.getElementById('searchInput')?.focus()
      }
      if (e.key === 'Escape') {
        ;(document.getElementById('searchInput') as HTMLInputElement)?.blur()
        setSidebarOpen(false)
        setSettingsOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE)
  }, [])

  const visibleData = store.filteredData.slice(0, visibleCount)
  const hasMore = visibleCount < store.filteredData.length

  return (
    <>
      {/* Hero */}
      <div className="iv-hero">
        <h1>1000+ Câu Hỏi Phỏng Vấn Frontend</h1>
        <p className="iv-hero-sub">HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Database & more</p>
        <div className="iv-hero-stats">
          <div className="iv-hero-stat">
            <div className="iv-hero-stat-num">{store.progress.total}</div>
            <div className="iv-hero-stat-label">Câu Hỏi</div>
          </div>
          <div className="iv-hero-stat">
            <div className="iv-hero-stat-num">{store.progress.done}</div>
            <div className="iv-hero-stat-label">Đã Học</div>
          </div>
          <div className="iv-hero-stat">
            <div className="iv-hero-stat-num">{store.bookmarks.size}</div>
            <div className="iv-hero-stat-label">Đã Lưu</div>
          </div>
          <div className="iv-hero-stat">
            <div className="iv-hero-stat-num">{Object.keys(store.categoryCounts).length}</div>
            <div className="iv-hero-stat-label">Chủ Đề</div>
          </div>
        </div>
      </div>

      {/* Topbar */}
      <div className="iv-topbar">
        <button className="iv-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
        <div className="iv-search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            id="searchInput"
            type="text"
            placeholder="Tìm kiếm câu hỏi... (nhấn / để focus)"
            value={store.search}
            onChange={(e) => store.setSearch(e.target.value)}
          />
        </div>
        <div className="iv-filter-group">
          {['all', 'beginner', 'intermediate', 'advanced', 'bookmarked'].map(level => (
            <button
              key={level}
              className={`iv-filter-btn ${store.activeLevel === level ? 'active' : ''}`}
              onClick={() => store.setActiveLevel(level)}
            >
              {level === 'all' ? 'Tất Cả' : level === 'bookmarked' ? 'Đã Lưu' : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
        <button className="iv-theme-toggle" onClick={() => setSettingsOpen(!settingsOpen)} aria-label="Cài đặt">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
      </div>

      {/* Settings dialog */}
      {settingsOpen && (
        <>
          <div className="iv-settings-overlay" onClick={() => setSettingsOpen(false)} />
          <div className="iv-settings-popup">
            <div className="iv-settings-header">
              <div className="iv-settings-title">Cài Đặt</div>
              <button className="iv-settings-close" onClick={() => setSettingsOpen(false)} aria-label="Đóng">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

                {/* Dark mode */}
                <div className="iv-settings-row">
                  <span>Giao diện</span>
                  <button className="iv-settings-toggle" data-active={theme === 'dark'} onClick={toggleTheme}>
                    <span className="iv-settings-toggle-thumb" />
                  </button>
                </div>

                {/* Show all answers */}
                <div className="iv-settings-row">
                  <span>Hiện đáp án</span>
                  <button className="iv-settings-toggle" data-active={store.showAll} onClick={() => store.toggleAllAnswers(!store.showAll)}>
                    <span className="iv-settings-toggle-thumb" />
                  </button>
                </div>

                {/* Show filter */}
                <div className="iv-settings-section">
                  <span className="iv-settings-label">Câu hỏi</span>
                  <div className="iv-settings-chips">
                    {(['all', 'not-learned', 'learned-only'] as const).map(opt => (
                      <button
                        key={opt}
                        className={`iv-settings-chip ${store.showFilter === opt ? 'active' : ''}`}
                        onClick={() => store.setShowFilter(opt)}
                      >
                        {opt === 'all' ? 'Tất cả' : opt === 'not-learned' ? 'Chưa học' : 'Đã học'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order */}
                <div className="iv-settings-section">
                  <span className="iv-settings-label">Thứ tự</span>
                  <div className="iv-settings-chips">
                    <button
                      className={`iv-settings-chip ${!store.shuffled ? 'active' : ''}`}
                      onClick={() => { if (store.shuffled) store.toggleShuffle() }}
                    >
                      Theo thứ tự
                    </button>
                    <button
                      className={`iv-settings-chip ${store.shuffled ? 'active' : ''}`}
                      onClick={() => { if (!store.shuffled) store.toggleShuffle() }}
                    >
                      Xáo trộn
                    </button>
                  </div>
                </div>

                {/* Font size */}
                <div className="iv-settings-section">
                  <span className="iv-settings-label">Cỡ chữ</span>
                  <div className="iv-settings-chips">
                    {[14, 15, 16, 18, 20].map(size => (
                      <button
                        key={size}
                        className={`iv-settings-chip iv-font-chip ${fontSize === size ? 'active' : ''}`}
                        onClick={() => setFontSize(size)}
                      >
                        <span style={{ fontSize: `${size - 2}px` }}>A</span>
                        {size === FONT_DEFAULT && <span className="iv-font-chip-dot" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <div className="iv-settings-section">
                  <span className="iv-settings-label">Đặt lại</span>
                  <div className="iv-settings-chips" style={{ marginTop: 10 }}>
                    <button className="iv-settings-chip" onClick={() => {
                      setFontSize(FONT_DEFAULT)
                      if (store.shuffled) store.toggleShuffle()
                      store.setShowFilter('all')
                      if (store.showAll) store.toggleAllAnswers(false)
                    }}>
                      Cài đặt
                    </button>
                    <button className="iv-settings-chip iv-chip-danger" onClick={() => {
                      if (confirm('Xóa toàn bộ tiến độ học tập?')) store.resetProgress()
                    }}>
                      Tiến độ
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

      {/* Sidebar overlay */}
      {sidebarOpen && <div className="iv-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Layout */}
      <div className="iv-layout">
        {/* Sidebar */}
        <aside className={`iv-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="iv-sidebar-progress">
            <div className="iv-sidebar-progress-label">Tiến Độ Học Tập</div>
            <div className="iv-progress-bar">
              <div className="iv-progress-fill" style={{ width: `${store.progress.pct}%` }} />
            </div>
            <div className="iv-progress-text">
              {store.progress.done} / {store.progress.total} đã học ({store.progress.pct}%)
            </div>
          </div>
          {/* Tabs */}
          <SidebarTabs
            categoryCounts={store.categoryCounts}
            activeCategory={store.activeCategory}
            totalCount={QA_DATA.length}
            onSelect={(cat) => { store.setActiveCategory(cat); setSidebarOpen(false) }}
          />
        </aside>

        {/* Content */}
        <main className="iv-content" style={{ '--iv-fs': `${fontSize}px` } as React.CSSProperties}>
          <div className="iv-content-header">
            <div>
              <div className="iv-content-title">
                {store.activeCategory === 'all' ? 'Tất Cả Câu Hỏi' : store.activeCategory}
              </div>
              <div className="iv-content-count">{store.filteredData.length} câu hỏi</div>
            </div>
          </div>

          {visibleData.length === 0 ? (
            <div className="iv-empty">
              <p>Không tìm thấy câu hỏi nào.</p>
            </div>
          ) : (
            <>
              {visibleData.map(item => (
                <QACard
                  key={item.id}
                  item={item}
                  isBookmarked={store.bookmarks.has(item.id)}
                  isLearned={store.learned.has(item.id)}
                  isOpen={store.openAnswers.has(item.id)}
                  onToggleAnswer={store.toggleAnswer}
                  onToggleBookmark={store.toggleBookmark}
                  onToggleLearned={store.toggleLearned}
                />
              ))}
              {hasMore && (
                <button className="iv-load-more" onClick={loadMore}>
                  Hiển thị thêm {Math.min(ITEMS_PER_PAGE, store.filteredData.length - visibleCount)} câu hỏi
                </button>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}
