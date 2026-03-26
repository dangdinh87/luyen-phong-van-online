'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { QA_DATA } from './interview-data'
import { useInterviewStore } from './use-interview-store'
import { QACard } from './qa-card'
import { ContributeForm } from './contribute-form'
import { useTheme } from '../context/theme-context'
import { CATEGORY_GROUPS } from './category-groups'
import { MorphingText } from './components/morphing-text'
import { NumberTicker } from './components/number-ticker'
import './interview.css'

const ITEMS_PER_PAGE = 50
const FONT_KEY = 'iv_font_size'

const FONT_DEFAULT = 16

function loadFontSize(): number {
  if (typeof window === 'undefined') return FONT_DEFAULT
  return parseInt(localStorage.getItem(FONT_KEY) || String(FONT_DEFAULT), 10)
}


export function InterviewClient() {
  const { theme, setTheme, toggleTheme } = useTheme()
  const store = useInterviewStore(QA_DATA)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [contributeOpen, setContributeOpen] = useState(false)
  const [fontSize, setFontSize] = useState(loadFontSize)

  // Persist font size
  useEffect(() => { localStorage.setItem(FONT_KEY, String(fontSize)) }, [fontSize])

  // Reset visible count on filter change
  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE) }, [store.activeCategory, store.activeLevel, store.search, store.showFilter])

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

  // Infinite scroll: auto-load when sentinel enters viewport
  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!hasMore) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  return (
    <div style={{ '--iv-fs': `${fontSize}px` } as React.CSSProperties}>
      {/* Hero */}
      <div className="iv-hero">
        <div className="iv-hero-actions">
          <button className="iv-hover-btn" onClick={() => setContributeOpen(true)} title="Đóng góp câu hỏi & tính năng">
            <span className="iv-hover-btn-dot" />
            <span className="iv-hover-btn-label">Đóng góp</span>
            <span className="iv-hover-btn-reveal">
              <span>Góp ý</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </button>
          <button className="iv-hero-action-btn" onClick={() => setSettingsOpen(!settingsOpen)} title="Cài đặt">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>
        <MorphingText
          className="iv-morphing-title"
          texts={[
            `${QA_DATA.length}+ Câu Hỏi Phỏng Vấn IT`,
            'Luyện Phỏng Vấn Online',
            'Frontend · Backend · DevOps',
          ]}
        />
        <p className="iv-hero-sub">HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Golang, Database, DevOps, Testing, Security, Career & more</p>
        <div className="iv-hero-stats">
          <div className="iv-hero-stat">
            <div className="iv-hero-stat-num"><NumberTicker value={store.progress.total} /></div>
            <div className="iv-hero-stat-label">Câu Hỏi</div>
          </div>
          <div className="iv-hero-stat">
            <div className="iv-hero-stat-num"><NumberTicker value={store.progress.done} /></div>
            <div className="iv-hero-stat-label">Đã Học</div>
          </div>
          <div className="iv-hero-stat">
            <div className="iv-hero-stat-num"><NumberTicker value={store.bookmarks.size} /></div>
            <div className="iv-hero-stat-label">Đã Lưu</div>
          </div>
          <div className="iv-hero-stat">
            <div className="iv-hero-stat-num"><NumberTicker value={CATEGORY_GROUPS.filter(g => (store.groupCounts[g.label] || 0) > 0).length} /></div>
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
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(level => (
            <button
              key={level}
              className={`iv-filter-btn ${store.activeLevel === level ? 'active' : ''}`}
              data-level={level}
              onClick={() => store.setActiveLevel(level)}
            >
              {level === 'all' ? 'Tất cả' : level === 'beginner' ? 'Cơ bản' : level === 'intermediate' ? 'Trung bình' : 'Nâng cao'}
            </button>
          ))}
          <span className="iv-filter-divider" />
          <button
            className={`iv-filter-btn ${store.activeLevel === 'bookmarked' ? 'active' : ''}`}
            onClick={() => store.setActiveLevel(store.activeLevel === 'bookmarked' ? 'all' : 'bookmarked')}
          >
            ★ Đã lưu
          </button>
          <button
            className={`iv-filter-btn ${store.showFilter === 'learned-only' ? 'active' : ''}`}
            onClick={() => store.setShowFilter(store.showFilter === 'learned-only' ? 'all' : 'learned-only')}
          >
            ✓ Đã học
          </button>
        </div>
      </div>

      {/* Settings dialog — uses contribute modal style */}
      {settingsOpen && (
        <>
          <div className="iv-contribute-overlay" onClick={() => setSettingsOpen(false)} />
          <div className="iv-contribute-modal iv-settings-modal">
            <div className="iv-contribute-header">
              <h3>Cài Đặt</h3>
              <button className="iv-contribute-close" onClick={() => setSettingsOpen(false)} aria-label="Đóng">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="iv-settings-body">
              {/* Theme */}
              <div className="iv-settings-section">
                <span className="iv-settings-label">Giao diện</span>
                <div className="iv-settings-chips">
                  {([
                    { mode: 'light' as const, label: 'Sáng', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> },
                    { mode: 'dark' as const, label: 'Tối', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> },
                    { mode: 'system' as const, label: 'Hệ thống', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
                  ]).map(({ mode, label, icon }) => (
                    <button key={mode} className={`iv-settings-chip ${theme === mode ? 'active' : ''}`} onClick={() => setTheme(mode)}>
                      {icon}{label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show all answers */}
              <div className="iv-settings-row">
                <span>Hiện tất cả đáp án</span>
                <button className="iv-settings-toggle" data-active={store.showAll} onClick={() => store.toggleAllAnswers(!store.showAll)}>
                  <span className="iv-settings-toggle-thumb" />
                </button>
              </div>

              {/* Order */}
              <div className="iv-settings-section">
                <span className="iv-settings-label">Thứ tự</span>
                <div className="iv-settings-chips">
                  <button className={`iv-settings-chip ${!store.shuffled ? 'active' : ''}`} onClick={() => { if (store.shuffled) store.toggleShuffle() }}>
                    Theo thứ tự
                  </button>
                  <button className={`iv-settings-chip ${store.shuffled ? 'active' : ''}`} onClick={() => { if (!store.shuffled) store.toggleShuffle() }}>
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
                      <span style={{ fontSize: `${Math.round(size * 0.75)}px` }}>A</span>
                      {size === FONT_DEFAULT && <span className="iv-font-chip-dot" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="iv-settings-section">
                <span className="iv-settings-label">Đặt lại</span>
                <div className="iv-settings-chips">
                  <button className="iv-settings-chip" onClick={() => {
                    if (confirm('Đặt lại toàn bộ cài đặt về mặc định?')) {
                      setFontSize(FONT_DEFAULT)
                      if (store.shuffled) store.toggleShuffle()
                      store.setShowFilter('all')
                      if (store.showAll) store.toggleAllAnswers(false)
                    }
                  }}>
                    Đặt lại cài đặt
                  </button>
                  <button className="iv-settings-chip iv-chip-danger" onClick={() => {
                    if (confirm('Xóa toàn bộ tiến độ học tập (đã học, đã lưu)?')) store.resetProgress()
                  }}>
                    Đặt lại tiến độ
                  </button>
                </div>
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
          <div
            className={`iv-sidebar-item ${store.activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => { store.setActiveCategory('all'); setSidebarOpen(false) }}
          >
            <span>Tất Cả</span>
            <span className="iv-sidebar-count">{QA_DATA.length}</span>
          </div>
          <div className="iv-sidebar-list">
            {CATEGORY_GROUPS.map(group => {
              const count = store.groupCounts[group.label] || 0
              if (count === 0) return null
              const isGroupActive = store.activeCategory === group.label
              const subs = store.subCategoryCounts[group.label] || {}
              const subEntries = Object.entries(subs).sort((a, b) => b[1] - a[1])
              const hasMultipleSubs = subEntries.length > 1
              // Check if a sub-category within this group is active
              const isSubActive = subEntries.some(([cat]) => store.activeCategory === cat)

              return (
                <div key={group.label}>
                  <div
                    className={`iv-sidebar-item iv-sidebar-group ${isGroupActive || isSubActive ? 'active' : ''}`}
                    onClick={() => { store.setActiveCategory(group.label); setSidebarOpen(false) }}
                  >
                    <span><img className="iv-sidebar-icon" src={group.icon} alt="" width={18} height={18} /> {group.label}</span>
                    <span className="iv-sidebar-count">{count}</span>
                  </div>
                  {/* Show sub-categories when group or sub is active */}
                  {hasMultipleSubs && (isGroupActive || isSubActive) && (
                    <div className="iv-sidebar-subs">
                      {subEntries.map(([cat, subCount]) => (
                        <div
                          key={cat}
                          className={`iv-sidebar-item iv-sidebar-sub ${store.activeCategory === cat ? 'active' : ''}`}
                          onClick={() => { store.setActiveCategory(cat); setSidebarOpen(false) }}
                        >
                          <span>{cat}</span>
                          <span className="iv-sidebar-count">{subCount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </aside>

        {/* Content */}
        <main className="iv-content">
          <div className="iv-content-header">
            <div className="iv-content-title">
              {store.activeCategory !== 'all' && (() => {
                const group = CATEGORY_GROUPS.find(g => g.label === store.activeCategory || g.members.includes(store.activeCategory))
                return group ? <img src={group.icon} alt="" width={24} height={24} className="iv-content-title-icon" /> : null
              })()}
              {store.activeCategory === 'all' ? 'Tất Cả Câu Hỏi' : store.activeCategory}
              <span className="iv-content-count">{store.filteredData.length} câu hỏi</span>
              {store.activeCategory === 'all' && (
                <span className="iv-content-count">· {CATEGORY_GROUPS.filter(g => (store.groupCounts[g.label] || 0) > 0).length} nhóm</span>
              )}
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
                <div ref={sentinelRef} className="iv-load-more" style={{ textAlign: 'center', padding: '1rem', opacity: 0.5 }}>
                  Đang tải thêm...
                </div>
              )}
            </>
          )}
        </main>
      </div>
      {contributeOpen && <ContributeForm onClose={() => setContributeOpen(false)} />}

      {/* Footer */}
      <footer className="iv-footer-wrap">
        <div className="iv-footer">
        <div className="iv-footer-left">
          <div className="iv-footer-brand">
            <img src="/icon.svg" alt="" width={24} height={24} className="iv-footer-icon" />
            <span className="iv-footer-logo">Luyện Phỏng Vấn</span>
          </div>
          <p className="iv-footer-slogan">1100+ câu hỏi phỏng vấn IT — nắm vững nền tảng, tự tin trước mọi interviewer</p>
          <span className="iv-footer-copy">&copy; {new Date().getFullYear()} Luyện Phỏng Vấn</span>
        </div>
        <div className="iv-footer-right">
          <span className="iv-footer-label">Liên hệ</span>
          <a href="mailto:nguyendangdinh47@gmail.com" className="iv-footer-email">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            nguyendangdinh47@gmail.com
          </a>
        </div>
        </div>
      </footer>
    </div>
  )
}
