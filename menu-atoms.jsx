// Photo placeholder + small UI atoms for Bar Bacioi menu

function PhotoPlaceholder({ label, seed = 0, accent, ratio = '4 / 3', tall = false }) {
  // Deterministic stripe variation
  const hueShift = (seed * 37) % 360;
  const angle = 30 + (seed * 17) % 90;
  const id = 'ph' + seed;
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: tall ? '3 / 4' : ratio,
      borderRadius: 14,
      overflow: 'hidden',
      background: '#1a1416',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, display: 'block' }} preserveAspectRatio="none">
        <defs>
          <pattern id={id} patternUnits="userSpaceOnUse" width="14" height="14" patternTransform={`rotate(${angle})`}>
            <rect width="14" height="14" fill="#1a1416" />
            <rect width="7" height="14" fill="#221a1d" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <rect width="100%" height="100%" fill={accent} opacity="0.08" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
        padding: 10,
      }}>
        <span style={{
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          background: 'rgba(0,0,0,0.45)',
          padding: '3px 6px', borderRadius: 4,
          backdropFilter: 'blur(4px)',
        }}>{label}</span>
      </div>
    </div>
  );
}

function HouseTag({ accent, label }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
      color: accent,
      padding: '3px 7px',
      border: `1px solid ${accent}`,
      borderRadius: 999,
      lineHeight: 1,
    }}>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent, display: 'inline-block' }} />
      {label}
    </span>
  );
}

// Animated mirror-ball-y header backdrop — pure CSS, not a hand-drawn SVG
function HeaderBackdrop({ accent, accent2 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        top: '-30%', left: '-10%',
        width: '80%', height: '120%',
        background: `radial-gradient(circle, ${accent}55 0%, transparent 60%)`,
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%', right: '-20%',
        width: '90%', height: '120%',
        background: `radial-gradient(circle, ${accent2}44 0%, transparent 60%)`,
        filter: 'blur(50px)',
      }} />
      {/* film grain */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'overlay' }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.4 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

window.PhotoPlaceholder = PhotoPlaceholder;
window.HouseTag = HouseTag;
window.HeaderBackdrop = HeaderBackdrop;
