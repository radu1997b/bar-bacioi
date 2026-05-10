// Bar Bacioi — disco-bar menu app (mobile-first, RO/RU)

const { useState, useEffect, useRef, useMemo } = React;

const THEMES = {
  magenta: {
    name: 'Magenta',
    bg: '#0d0709',
    surface: '#140b0e',
    surface2: '#1c1115',
    text: '#f5ecec',
    muted: 'rgba(245,236,236,0.55)',
    line: 'rgba(245,236,236,0.08)',
    accent: '#ff2d87',
    accent2: '#e8b86b',
  },
  cyan: {
    name: 'Cyan',
    bg: '#06090d',
    surface: '#0b1016',
    surface2: '#11171f',
    text: '#eef3f7',
    muted: 'rgba(238,243,247,0.55)',
    line: 'rgba(238,243,247,0.08)',
    accent: '#39e0ff',
    accent2: '#b893ff',
  },
  ember: {
    name: 'Ember',
    bg: '#0a0707',
    surface: '#120c0a',
    surface2: '#1a1310',
    text: '#f6efe8',
    muted: 'rgba(246,239,232,0.55)',
    line: 'rgba(246,239,232,0.08)',
    accent: '#ff7a3a',
    accent2: '#f2c14e',
  },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "magenta",
  "density": "comfortable",
  "showPhotos": true,
  "showDescriptions": true
}/*EDITMODE-END*/;

// scroll offset (px) used by sticky chrome — recomputed per category
const CHROME_BASE = 168;       // header + main rail
const CHROME_WITH_SUBS = 218;  // + sub-rail

function BacioiMenu() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState('ro');
  const [activeCat, setActiveCat] = useState(MENU_DATA[0].id);
  const [activeSub, setActiveSub] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const theme = THEMES[tweaks.theme] || THEMES.magenta;
  const t = UI_STRINGS[lang];
  const dense = tweaks.density === 'compact';
  const showPhotos = tweaks.showPhotos;
  const showDesc = tweaks.showDescriptions;

  const scrollerRef = useRef(null);
  const sectionRefs = useRef({});       // catId -> el
  const subRefs = useRef({});           // `${catId}/${subId}` -> el
  const railRefs = useRef({});
  const subRailRefs = useRef({});

  const activeCategory = MENU_DATA.find((c) => c.id === activeCat) || MENU_DATA[0];
  const hasSubs = !!(activeCategory.subs && activeCategory.subs.length);

  // Track which section / subsection is in view
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const onScroll = () => {
      setScrolled(root.scrollTop > 40);
      const offset = 240;
      let curCat = MENU_DATA[0].id;
      let curSub = null;
      for (const cat of MENU_DATA) {
        const el = sectionRefs.current[cat.id];
        if (!el) continue;
        if (el.offsetTop - offset <= root.scrollTop) curCat = cat.id;
      }
      const cat = MENU_DATA.find((c) => c.id === curCat);
      if (cat && cat.subs) {
        curSub = cat.subs[0].id;
        for (const sub of cat.subs) {
          const el = subRefs.current[`${cat.id}/${sub.id}`];
          if (!el) continue;
          if (el.offsetTop - offset <= root.scrollTop) curSub = sub.id;
        }
      }
      setActiveCat(curCat);
      setActiveSub(curSub);
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-center the active rail chips
  useEffect(() => {
    const chip = railRefs.current[activeCat];
    if (chip && chip.parentElement) {
      chip.parentElement.scrollTo({
        left: chip.offsetLeft - chip.parentElement.clientWidth / 2 + chip.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeCat]);

  useEffect(() => {
    if (!activeSub) return;
    const chip = subRailRefs.current[activeSub];
    if (chip && chip.parentElement) {
      chip.parentElement.scrollTo({
        left: chip.offsetLeft - chip.parentElement.clientWidth / 2 + chip.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeSub]);

  const scrollToCat = (id) => {
    const el = sectionRefs.current[id];
    const root = scrollerRef.current;
    if (!el || !root) return;
    const cat = MENU_DATA.find((c) => c.id === id);
    const offset = cat && cat.subs ? CHROME_WITH_SUBS : CHROME_BASE;
    root.scrollTo({ top: el.offsetTop - offset + 4, behavior: 'smooth' });
  };

  const scrollToSub = (catId, subId) => {
    const el = subRefs.current[`${catId}/${subId}`];
    const root = scrollerRef.current;
    if (!el || !root) return;
    root.scrollTo({ top: el.offsetTop - CHROME_WITH_SUBS + 4, behavior: 'smooth' });
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      background: theme.bg, color: theme.text,
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <Chrome
        theme={theme} t={t}
        lang={lang} setLang={setLang}
        scrolled={scrolled}
        cats={MENU_DATA} activeCat={activeCat} activeSub={activeSub}
        onPickCat={scrollToCat}
        onPickSub={scrollToSub}
        railRefs={railRefs}
        subRailRefs={subRailRefs}
      />

      <div ref={scrollerRef} style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
      }}>
        <Hero theme={theme} t={t} lang={lang} />

        {MENU_DATA.map((cat, i) => (
          <section
            key={cat.id}
            ref={(el) => (sectionRefs.current[cat.id] = el)}
            style={{ padding: '32px 20px 8px' }}
          >
            <CategoryHeader cat={cat} lang={lang} theme={theme} index={i} />
            <CategoryBody
              cat={cat} lang={lang} theme={theme}
              showPhotos={showPhotos} showDesc={showDesc} dense={dense}
              t={t} catIndex={i}
              subRefs={subRefs}
            />
          </section>
        ))}

        <Footer theme={theme} t={t} lang={lang} />
      </div>
    </div>
  );
}

function Chrome({ theme, t, lang, setLang, scrolled, cats, activeCat, activeSub, onPickCat, onPickSub, railRefs, subRailRefs }) {
  const activeCategory = cats.find((c) => c.id === activeCat) || cats[0];
  const hasSubs = !!(activeCategory.subs && activeCategory.subs.length);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5,
      background: scrolled ? `${theme.bg}ee` : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
      borderBottom: scrolled ? `1px solid ${theme.line}` : '1px solid transparent',
      transition: 'all 240ms ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '64px 20px 10px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0)' : 'translateY(-4px)',
          transition: 'all 200ms ease',
        }}>
          <img src="assets/bb-logo-trans.png" alt="Bar Bacioi"
            style={{
              width: 36, height: 36,
              objectFit: 'contain',
            }}
          />
        </div>
        <LangToggle lang={lang} setLang={setLang} theme={theme} />
      </div>

      {/* primary rail */}
      <div style={{
        display: 'flex', overflowX: 'auto', overflowY: 'hidden',
        gap: 8, padding: '6px 20px 10px',
      }} className="no-scrollbar">
        {cats.map((cat) => {
          const active = cat.id === activeCat;
          return (
            <button
              key={cat.id}
              ref={(el) => (railRefs.current[cat.id] = el)}
              onClick={() => onPickCat(cat.id)}
              style={{
                flex: '0 0 auto',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
                letterSpacing: '0.02em',
                padding: '8px 14px',
                borderRadius: 999,
                border: `1px solid ${active ? theme.accent : theme.line}`,
                background: active ? theme.accent : 'transparent',
                color: active ? '#0d0709' : theme.text,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 180ms ease',
              }}
            >
              {cat.name[lang]}
            </button>
          );
        })}
      </div>

      {/* sub-rail (only when active cat has subs) */}
      <div style={{
        maxHeight: hasSubs ? 50 : 0,
        overflow: 'hidden',
        transition: 'max-height 240ms ease',
        borderTop: hasSubs ? `1px solid ${theme.line}` : '1px solid transparent',
      }}>
        <div style={{
          display: 'flex', overflowX: 'auto', overflowY: 'hidden',
          gap: 6, padding: '8px 20px 10px',
        }} className="no-scrollbar">
          {hasSubs && activeCategory.subs.map((sub) => {
            const active = sub.id === activeSub;
            return (
              <button
                key={sub.id}
                ref={(el) => (subRailRefs.current[sub.id] = el)}
                onClick={() => onPickSub(activeCategory.id, sub.id)}
                style={{
                  flex: '0 0 auto',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  color: active ? theme.accent : theme.muted,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  borderBottom: active ? `1px solid ${theme.accent}` : '1px solid transparent',
                  transition: 'all 160ms ease',
                }}
              >
                {sub.name[lang]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LangToggle({ lang, setLang, theme }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: 3,
      borderRadius: 999,
      border: `1px solid ${theme.line}`,
      background: theme.surface,
    }}>
      {['ro', 'ru'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
            padding: '6px 11px',
            borderRadius: 999,
            border: 'none',
            background: lang === l ? theme.accent : 'transparent',
            color: lang === l ? '#0d0709' : theme.muted,
            cursor: 'pointer',
            transition: 'all 160ms ease',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Hero({ theme, t, lang }) {
  return (
    <div style={{
      position: 'relative',
      padding: '170px 20px 36px',
      borderBottom: `1px solid ${theme.line}`,
      overflow: 'hidden',
    }}>
      <HeaderBackdrop accent={theme.accent} accent2={theme.accent2} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: theme.accent, marginBottom: 14,
        }}>
        </div>
        <img src="assets/bb-logo-trans.png" alt="Bar Bacioi"
          style={{
            display: 'block',
            width: 260, maxWidth: '82%', height: 'auto',
            margin: '0 auto',
            filter: 'drop-shadow(0 0 30px rgba(232,184,107,0.35))',
          }}
        />
        <div style={{
          marginTop: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          fontSize: 12, color: theme.muted,
        }}>
        </div>
        <div style={{
          marginTop: 28,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 10, letterSpacing: '0.18em',
          color: theme.muted,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{ flex: '0 0 14px', height: 1, background: theme.muted, opacity: 0.4 }} />
          {t.scrollHint.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

function CategoryHeader({ cat, lang, theme, index }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 10,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: theme.muted,
      }}>
        <span style={{ color: theme.accent }}>{num}</span>
        <span style={{ flex: 1, height: 1, background: theme.line }} />
      </div>
      <h2 style={{
        fontFamily: '"Fraunces", "Times New Roman", serif',
        fontWeight: 400, fontStyle: 'italic',
        fontSize: 42, lineHeight: 1,
        letterSpacing: '-0.025em',
        margin: '14px 0 4px',
      }}>
        {cat.name[lang]}
      </h2>
      <div style={{ fontSize: 12, color: theme.muted }}>{cat.blurb[lang]}</div>
    </div>
  );
}

function SubHeader({ sub, lang, theme }) {
  return (
    <div style={{
      marginTop: 28, marginBottom: 14,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{
        display: 'inline-block', width: 5, height: 5,
        background: theme.accent,
      }} />
      <h3 style={{
        margin: 0,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 11, fontWeight: 600, letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: theme.text,
      }}>
        {sub.name[lang]}
      </h3>
      <span style={{ flex: 1, height: 1, background: theme.line }} />
    </div>
  );
}

function CategoryBody({ cat, lang, theme, showPhotos, showDesc, dense, t, catIndex, subRefs }) {
  const gap = dense ? 14 : 20;

  if (cat.subs && cat.subs.length) {
    return (
      <div style={{ marginTop: 6 }}>
        {cat.subs.map((sub, si) => (
          <div
            key={sub.id}
            ref={(el) => (subRefs.current[`${cat.id}/${sub.id}`] = el)}
          >
            <SubHeader sub={sub} lang={lang} theme={theme} />
            <div style={{ display: 'flex', flexDirection: 'column', gap }}>
              {sub.items.map((item, idx) => (
                <ItemCard
                  key={item.id} item={item} lang={lang} theme={theme}
                  showPhoto={showPhotos} showDesc={showDesc} dense={dense}
                  seed={catIndex * 100 + si * 10 + idx}
                  glassLabel={t.glass} bottleLabel={t.bottle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, marginTop: 18 }}>
      {(cat.items || []).map((item, idx) => (
        <ItemCard
          key={item.id} item={item} lang={lang} theme={theme}
          showPhoto={showPhotos} showDesc={showDesc} dense={dense}
          seed={catIndex * 100 + idx}
          glassLabel={t.glass} bottleLabel={t.bottle}
        />
      ))}
    </div>
  );
}

function ItemCard({ item, lang, theme, showPhoto, showDesc, dense, seed, glassLabel, bottleLabel }) {
  const hasBottle = item.priceBottle != null;
  return (
    <div
      data-screen-label={`item-${item.id}`}
      data-om-validate
      style={{
        display: 'grid',
        gridTemplateColumns: showPhoto ? '88px 1fr' : '1fr',
        gap: 14,
        alignItems: 'flex-start',
      }}
    >
      {showPhoto && (
        <div style={{ width: 88 }}>
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name[lang]}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                borderRadius: 14,
                display: 'block',
              }}
            />
          ) : (
            <PhotoPlaceholder
              label={`${item.id}.jpg`}
              seed={seed}
              accent={theme.accent}
              ratio="1 / 1"
            />
          )}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 10,
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2,
              flexWrap: 'wrap',
            }}>
              <h3 style={{
                fontFamily: 'inherit', fontWeight: 500,
                fontSize: dense ? 15 : 16, lineHeight: 1.2,
                letterSpacing: '-0.005em',
                margin: 0,
              }}>{item.name[lang]}</h3>
              {item.tag && <HouseTag accent={theme.accent} label={item.tag[lang]} />}
            </div>
            {showDesc && item.desc && (
              <p style={{
                margin: '4px 0 0',
                fontSize: 12.5, lineHeight: 1.45,
                color: theme.muted,
              }}>{item.desc[lang]}</p>
            )}
          </div>
          <div style={{
            flex: '0 0 auto',
            textAlign: 'right',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 13, fontWeight: 600,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            color: theme.text,
          }}>
            {hasBottle ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <span>{item.price} <span style={{ fontSize: 9, color: theme.muted }}>MDL · {glassLabel}</span></span>
                <span style={{ fontSize: 12, color: theme.muted }}>{item.priceBottle} <span style={{ fontSize: 9 }}>MDL · {bottleLabel}</span></span>
              </div>
            ) : item.bottleOnly ? (
              <span>{item.price} <span style={{ fontSize: 9, color: theme.muted }}>MDL · {bottleLabel}</span></span>
            ) : (
              <span>{item.price} <span style={{ fontSize: 9, color: theme.muted }}>MDL</span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ theme, t, lang }) {
  return (
    <div style={{
      marginTop: 40,
      padding: '36px 20px 60px',
      borderTop: `1px solid ${theme.line}`,
      background: theme.surface,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{
          fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
          padding: '14px 18px',
          borderRadius: 12,
          border: 'none',
          background: theme.accent, color: '#0d0709',
          cursor: 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>{t.callWaiter}</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 16 }}>→</span>
        </button>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          <FooterTile theme={theme} label={t.wifi} value="bacioi · 2026" />
          <FooterTile theme={theme} label={t.instagram} value="@barbacioi" />
        </div>
      </div>
      <div style={{
        marginTop: 36, paddingTop: 20,
        borderTop: `1px solid ${theme.line}`,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: theme.muted, textAlign: 'center',
      }}>
      </div>
    </div>
  );
}

function FooterTile({ theme, label, value }) {
  return (
    <div style={{
      padding: '12px 14px',
      border: `1px solid ${theme.line}`,
      borderRadius: 12,
      background: theme.surface2,
    }}>
      <div style={{
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: theme.muted, marginBottom: 5,
      }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

window.BacioiMenu = BacioiMenu;
window.THEMES = THEMES;
