import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ôn Tập Phỏng Vấn IT — 1280+ Câu Hỏi Phỏng Vấn Lập Trình'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TECH_TAGS = [
  { label: 'React', color: '#61DAFB', bg: '#1a2f3a' },
  { label: 'JavaScript', color: '#F7DF1E', bg: '#3a3520' },
  { label: 'TypeScript', color: '#3178C6', bg: '#1a2540' },
  { label: 'Node.js', color: '#68A063', bg: '#1a3020' },
  { label: 'Golang', color: '#00ADD8', bg: '#0a2530' },
  { label: 'System Design', color: '#A78BFA', bg: '#2a1a40' },
  { label: 'AWS', color: '#FF9900', bg: '#3a2510' },
  { label: 'DevOps', color: '#06B6D4', bg: '#0a2a30' },
  { label: 'Next.js', color: '#FFFFFF', bg: '#2a2a2a' },
  { label: 'Kafka', color: '#E0E0E0', bg: '#252525' },
  { label: 'Redis', color: '#DC382D', bg: '#301515' },
  { label: 'Database', color: '#4FC3F7', bg: '#152535' },
  { label: 'Design Patterns', color: '#CE93D8', bg: '#2a1530' },
  { label: 'Security', color: '#EF5350', bg: '#301818' },
]

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(145deg, #0a0a0b 0%, #0f1729 40%, #0a0a0b 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-40px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-60px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
            padding: '0 60px',
            position: 'relative',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '100px',
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(59,130,246,0.3)',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
              }}
            />
            <span
              style={{
                color: '#93c5fd',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              1280+ Câu Hỏi Phỏng Vấn
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize: '56px',
                fontWeight: 700,
                color: '#fafafa',
                textAlign: 'center',
                lineHeight: 1.15,
                letterSpacing: '-1px',
              }}
            >
              Ôn Tập Phỏng Vấn IT
            </span>
            <span
              style={{
                fontSize: '22px',
                color: '#a1a1aa',
                textAlign: 'center',
                lineHeight: 1.5,
                maxWidth: '700px',
              }}
            >
              Đáp án chi tiết &bull; Song ngữ Việt-Anh &bull; Frontend &bull; Backend &bull; Fullstack
            </span>
          </div>

          {/* Tech tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              maxWidth: '900px',
              marginTop: '8px',
            }}
          >
            {TECH_TAGS.map((tag) => (
              <div
                key={tag.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: tag.bg,
                  border: `1px solid ${tag.color}25`,
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: tag.color,
                    display: 'flex',
                  }}
                />
                <span
                  style={{
                    color: tag.color,
                    fontSize: '15px',
                    fontWeight: 500,
                  }}
                >
                  {tag.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              color: '#71717a',
              fontSize: '16px',
              fontWeight: 400,
            }}
          >
            luyenphongvan.online
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
