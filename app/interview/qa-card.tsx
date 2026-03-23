'use client'

import { memo } from 'react'
import type { QAItem } from './interview-data'
import { LEVEL_CONFIG } from './interview-data'

interface QACardProps {
  item: QAItem
  isBookmarked: boolean
  isLearned: boolean
  isOpen: boolean
  onToggleAnswer: (id: number) => void
  onToggleBookmark: (id: number) => void
  onToggleLearned: (id: number) => void
}

export const QACard = memo(function QACard({
  item, isBookmarked, isLearned, isOpen,
  onToggleAnswer, onToggleBookmark, onToggleLearned,
}: QACardProps) {
  const levelStyle = LEVEL_CONFIG[item.level]

  return (
    <div
      className="qa-card"
      data-bookmarked={isBookmarked || undefined}
      data-learned={isLearned || undefined}
    >
      <div className="qa-question" onClick={() => onToggleAnswer(item.id)}>
        <span className="qa-num">#{item.id}</span>
        <span className="qa-text">{item.q}</span>
        <div className="qa-meta">
          <span
            className="qa-level"
            style={{ background: levelStyle.bg, color: levelStyle.color }}
          >
            {levelStyle.label}
          </span>
          <div className="qa-actions">
            <button
              className={`qa-action-btn ${isBookmarked ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleBookmark(item.id) }}
              title="Lưu"
              aria-label="Đánh dấu"
            >
              &#9733;
            </button>
            <button
              className={`qa-action-btn ${isLearned ? 'learned-active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleLearned(item.id) }}
              title="Đã học"
              aria-label="Đánh dấu đã học"
            >
              &#10003;
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="qa-answer">
          {item.a
            ? <span dangerouslySetInnerHTML={{ __html: formatAnswer(item.a) }} />
            : <em style={{ color: 'var(--ink-faint)' }}>Đang cập nhật đáp án...</em>
          }
        </div>
      )}
    </div>
  )
})

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function applyInlineFormat(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

function formatAnswer(text: string): string {
  const escaped = escapeHtml(text)

  // Split sentences that describe list items after a colon or period
  // Pattern: "Main sentence: item1, item2. Another sentence."
  // Or: "Sentence. Another sentence. Yet another."
  const sentences = escaped.split(/(?<=\.)\s+/)
  if (sentences.length <= 1) return applyInlineFormat(escaped)

  // First sentence = summary, rest = detail points
  const summary = applyInlineFormat(sentences[0])
  const points = sentences.slice(1)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => `<li>${applyInlineFormat(s)}</li>`)
    .join('')

  return `<p class="qa-summary">${summary}</p><ul class="qa-points">${points}</ul>`
}
