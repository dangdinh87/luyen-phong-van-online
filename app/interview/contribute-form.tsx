'use client'

import { useState, useEffect, useCallback } from 'react'
import { CATEGORIES } from './interview-data'
import { useLanguage } from '../context/language-context'

interface FormData {
  name: string
  email: string
  category: string
  question: string
  answer: string
  note: string
  links: string
}

const INITIAL: FormData = { name: '', email: '', category: '', question: '', answer: '', note: '', links: '' }

type ContributeTab = 'question' | 'feature'

export function ContributeForm({ onClose }: { onClose: () => void }) {
  const { locale } = useLanguage()
  const [tab, setTab] = useState<ContributeTab>('question')
  const [form, setForm] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (tab === 'question' && !form.question.trim()) { setErrorMsg(locale === 'en' ? 'Please enter a question' : 'Vui lòng nhập câu hỏi'); return }
    if (tab === 'feature' && !form.question.trim()) { setErrorMsg(locale === 'en' ? 'Please enter a feature description' : 'Vui lòng nhập mô tả tính năng'); return }

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: tab }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm(INITIAL)
      } else {
        setStatus('error')
        setErrorMsg(data.error || (locale === 'en' ? 'Submission failed' : 'Gửi thất bại'))
      }
    } catch {
      setStatus('error')
      setErrorMsg(locale === 'en' ? 'Connection error' : 'Lỗi kết nối')
    }
  }

  return (
    <>
      <div className="iv-contribute-overlay" onClick={onClose} />
      <div className="iv-contribute-modal">
        <div className="iv-contribute-header">
          <h3>{locale === 'en' ? 'Contribute' : 'Đóng Góp'}</h3>
          <button className="iv-contribute-close" onClick={onClose} aria-label={locale === 'en' ? 'Close' : 'Đóng'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="iv-contribute-tabs">
          <button
            className={`iv-contribute-tab ${tab === 'question' ? 'active' : ''}`}
            onClick={() => { setTab('question'); setStatus('idle'); setErrorMsg('') }}
          >
            {locale === 'en' ? 'Question' : 'Câu hỏi'}
          </button>
          <button
            className={`iv-contribute-tab ${tab === 'feature' ? 'active' : ''}`}
            onClick={() => { setTab('feature'); setStatus('idle'); setErrorMsg('') }}
          >
            {locale === 'en' ? 'Feature' : 'Tính năng'}
          </button>
        </div>

        {status === 'success' ? (
          <div className="iv-contribute-success">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--green-ink)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            <p>{locale === 'en' ? 'Thank you for contributing!' : 'Cảm ơn bạn đã đóng góp!'}</p>
            <p className="iv-contribute-sub">{locale === 'en' ? 'Your submission will be reviewed and added.' : 'Câu hỏi sẽ được review và thêm vào bộ sưu tập.'}</p>
            <button className="iv-contribute-btn" onClick={onClose}>{locale === 'en' ? 'Close' : 'Đóng'}</button>
          </div>
        ) : (
          <form className="iv-contribute-form" onSubmit={handleSubmit}>
            {tab === 'question' ? (
              <>
                <div className="iv-contribute-row">
                  <div className="iv-contribute-field">
                    <label>{locale === 'en' ? 'Name' : 'Tên'} <span className="iv-optional">{locale === 'en' ? '(optional)' : '(tùy chọn)'}</span></label>
                    <input type="text" value={form.name} onChange={set('name')} placeholder="Ẩn danh" />
                  </div>
                  <div className="iv-contribute-field">
                    <label>Email <span className="iv-optional">{locale === 'en' ? '(optional)' : '(tùy chọn)'}</span></label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="email@example.com" />
                  </div>
                </div>

                <div className="iv-contribute-field">
                  <label>{locale === 'en' ? 'Topic' : 'Chủ đề'}</label>
                  <select value={form.category} onChange={set('category')}>
                    <option value="">{locale === 'en' ? '-- Select topic --' : '-- Chọn chủ đề --'}</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Khác">{locale === 'en' ? 'Other' : 'Khác'}</option>
                  </select>
                </div>

                <div className="iv-contribute-field">
                  <label>{locale === 'en' ? 'Question' : 'Câu hỏi'} <span className="iv-required">*</span></label>
                  <textarea
                    value={form.question}
                    onChange={set('question')}
                    placeholder={locale === 'en' ? 'Enter a question or knowledge...' : 'Nhập câu hỏi hoặc kiến thức...'}
                    rows={3}
                    required
                  />
                </div>

                <div className="iv-contribute-field">
                  <label>{locale === 'en' ? 'Suggested answer' : 'Gợi ý đáp án'} <span className="iv-optional">{locale === 'en' ? '(optional)' : '(tùy chọn)'}</span></label>
                  <textarea
                    value={form.answer}
                    onChange={set('answer')}
                    placeholder={locale === 'en' ? 'If you have a suggested answer...' : 'Nếu bạn có gợi ý đáp án...'}
                    rows={4}
                  />
                </div>

                <div className="iv-contribute-field">
                  <label>{locale === 'en' ? 'Note' : 'Ghi chú'} <span className="iv-optional">{locale === 'en' ? '(optional)' : '(tùy chọn)'}</span></label>
                  <input type="text" value={form.note} onChange={set('note')} placeholder={locale === 'en' ? 'Source, suggested level...' : 'Nguồn, level gợi ý...'} />
                </div>
              </>
            ) : (
              <>
                <div className="iv-contribute-row">
                  <div className="iv-contribute-field">
                    <label>{locale === 'en' ? 'Name' : 'Tên'} <span className="iv-optional">{locale === 'en' ? '(optional)' : '(tùy chọn)'}</span></label>
                    <input type="text" value={form.name} onChange={set('name')} placeholder="Ẩn danh" />
                  </div>
                  <div className="iv-contribute-field">
                    <label>Email <span className="iv-optional">{locale === 'en' ? '(optional)' : '(tùy chọn)'}</span></label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="email@example.com" />
                  </div>
                </div>

                <div className="iv-contribute-field">
                  <label>{locale === 'en' ? 'Feature description' : 'Mô tả tính năng'} <span className="iv-required">*</span></label>
                  <textarea
                    value={form.question}
                    onChange={set('question')}
                    placeholder={locale === 'en' ? 'What feature would you like? Describe in detail...' : 'Bạn muốn website có thêm tính năng gì? Mô tả chi tiết...'}
                    rows={4}
                    required
                  />
                </div>

                <div className="iv-contribute-field">
                  <label>{locale === 'en' ? 'Reason / Benefits' : 'Lý do / Lợi ích'} <span className="iv-optional">{locale === 'en' ? '(optional)' : '(tùy chọn)'}</span></label>
                  <textarea
                    value={form.answer}
                    onChange={set('answer')}
                    placeholder={locale === 'en' ? 'How would this feature help learning?' : 'Tính năng này giúp ích gì cho việc học/ôn tập?'}
                    rows={3}
                  />
                </div>

                <div className="iv-contribute-field">
                  <label>{locale === 'en' ? 'Reference link' : 'Link tham khảo'} <span className="iv-optional">{locale === 'en' ? '(optional)' : '(tùy chọn)'}</span></label>
                  <textarea
                    value={form.links}
                    onChange={set('links')}
                    placeholder={locale === 'en' ? 'Example links, screenshots...' : 'Link ví dụ từ website khác, ảnh minh họa...'}
                    rows={2}
                  />
                </div>
              </>
            )}

            {errorMsg && <div className="iv-contribute-error">{errorMsg}</div>}

            <div className="iv-contribute-actions">
              <button type="button" className="iv-contribute-btn iv-btn-secondary" onClick={onClose}>{locale === 'en' ? 'Cancel' : 'Hủy'}</button>
              <button type="submit" className="iv-contribute-btn iv-btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? (locale === 'en' ? 'Sending...' : 'Đang gửi...') : (locale === 'en' ? 'Submit' : 'Gửi đóng góp')}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
