import type { Metadata } from 'next'
import { InterviewClient } from './interview-client'
import './interview.css'

export const metadata: Metadata = {
  title: '1000+ Câu Hỏi Phỏng Vấn Frontend — Nguyễn Đăng Đình',
  description: 'Tổng hợp 1000+ câu hỏi phỏng vấn Frontend Developer từ cơ bản đến nâng cao. HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Database, Golang.',
}

export default function InterviewPage() {
  return <InterviewClient />
}
