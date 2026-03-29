import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Fasting Tracker — Free Intermittent Fasting Timer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #faf8f5 0%, #e8f0e8 50%, #f0ece4 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '72px' }}>⏱️</span>
        </div>
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: '#2d2a26',
            margin: '0 0 12px 0',
            textAlign: 'center',
          }}
        >
          Fasting Tracker
        </h1>
        <p
          style={{
            fontSize: '28px',
            color: '#5a8a5e',
            margin: '0 0 32px 0',
            fontWeight: '600',
          }}
        >
          Free Intermittent Fasting Timer
        </p>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {['16:8', '18:6', '20:4', 'OMAD'].map((p) => (
            <div
              key={p}
              style={{
                padding: '10px 24px',
                borderRadius: '24px',
                background: '#5a8a5e',
                color: '#fff',
                fontSize: '22px',
                fontWeight: '600',
              }}
            >
              {p}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            fontSize: '18px',
            color: '#8a8478',
          }}
        >
          <span>🔥 Metabolic Phases</span>
          <span>📊 Streak Tracking</span>
          <span>🔒 100% Private</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
