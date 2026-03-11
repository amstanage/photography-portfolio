import { useState, useEffect, useRef } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "BelAir",
    category: "Automotive",
    images: [
      "BelAir/A7401660.jpg",
      "BelAir/A7401661.jpg",
      "BelAir/A7401662.jpg",
      "BelAir/A7401663.jpg",
      "BelAir/A7401665.jpg",
      "BelAir/A7401666.jpg",
    ],
    color: "#080808",
  },
  {
    id: 2,
    title: "Eruption Green EcoBoost",
    category: "Automotive",
    images: [
      "Eruption Green EcoBoost/A7401604.jpg",
      "Eruption Green EcoBoost/A7401605.jpg",
      "Eruption Green EcoBoost/A7401606.jpg",
      "Eruption Green EcoBoost/A7401607.jpg",
      "Eruption Green EcoBoost/A7401610.jpg",
      "Eruption Green EcoBoost/A7401614.jpg",
      "Eruption Green EcoBoost/A7401621.jpg",
    ],
    color: "#0a0a0a",
  },
  {
    id: 3,
    title: "Pontiac GTO",
    category: "Automotive",
    images: [
      "Pontiac GTO/A7401645.jpg",
      "Pontiac GTO/A7401647.jpg",
      "Pontiac GTO/A7401648.jpg",
      "Pontiac GTO/A7401649.jpg",
      "Pontiac GTO/A7401650.jpg",
      "Pontiac GTO/A7401651.jpg",
      "Pontiac GTO/A7401652.jpg",
      "Pontiac GTO/A7401653.jpg",
      "Pontiac GTO/A7401655.jpg",
      "Pontiac GTO/A7401656.jpg",
    ],
    color: "#0a0a0a",
  },
  {
    id: 4,
    title: "Pontiac Le Mans",
    category: "Automotive",
    images: [
      "Pontiac Le Mans/A7401622.jpg",
      "Pontiac Le Mans/A7401623.jpg",
      "Pontiac Le Mans/A7401624.jpg",
      "Pontiac Le Mans/A7401625.jpg",
      "Pontiac Le Mans/A7401626.jpg",
      "Pontiac Le Mans/A7401627.jpg",
      "Pontiac Le Mans/A7401628.jpg",
      "Pontiac Le Mans/A7401630.jpg",
      "Pontiac Le Mans/A7401631.jpg",
      "Pontiac Le Mans/A7401632.jpg",
      "Pontiac Le Mans/A7401634.jpg",
      "Pontiac Le Mans/A7401636.jpg",
      "Pontiac Le Mans/A7401637.jpg",
      "Pontiac Le Mans/A7401639.jpg",
      "Pontiac Le Mans/A7401640.jpg",
    ],
    color: "#0c0c0c",
  },
  {
    id: 5,
    title: "Detroit Institute of Art",
    category: "Architecture",
    images: [
      "Detroit Institute of Art/DIA (1 of 13).jpg",
      "Detroit Institute of Art/DIA (2 of 13).jpg",
      "Detroit Institute of Art/DIA (3 of 13).jpg",
      "Detroit Institute of Art/DIA (4 of 13).jpg",
      "Detroit Institute of Art/DIA (5 of 13).jpg",
      "Detroit Institute of Art/DIA (6 of 13).jpg",
      "Detroit Institute of Art/DIA (7 of 13).jpg",
      "Detroit Institute of Art/DIA (8 of 13).jpg",
      "Detroit Institute of Art/DIA (9 of 13).jpg",
      "Detroit Institute of Art/DIA (10 of 13).jpg",
      "Detroit Institute of Art/DIA (11 of 13).jpg",
      "Detroit Institute of Art/DIA (12 of 13).jpg",
      "Detroit Institute of Art/DIA (13 of 13).jpg",
    ],
    color: "#0a0a10",
  },
  {
    id: 6,
    title: "Michigan Central Station",
    category: "Architecture",
    images: [
      "Michigan Central Station/MCS (1 of 1).jpg",
      "Michigan Central Station/MCS (1 of 8).jpg",
      "Michigan Central Station/MCS (2 of 8).jpg",
      "Michigan Central Station/MCS (3 of 8).jpg",
      "Michigan Central Station/MCS (4 of 8).jpg",
      "Michigan Central Station/MCS (5 of 8).jpg",
      "Michigan Central Station/MCS (6 of 8).jpg",
      "Michigan Central Station/MCS (7 of 8).jpg",
      "Michigan Central Station/MCS (8 of 8).jpg",
    ],
    color: "#08080e",
  },
];

const CATEGORIES = ["All", "Automotive", "Architecture"];

function opt(src, size) {
  const lastDot = src.lastIndexOf('.');
  return 'optimized/' + src.substring(0, lastDot) + '-' + size + '.webp';
}

const ALL_IMAGES = (() => {
  const result = [];
  const maxLen = Math.max(...PROJECTS.map(p => p.images.length));
  for (let i = 0; i < maxLen; i++) {
    for (const p of PROJECTS) {
      if (i < p.images.length) result.push(p.images[i]);
    }
  }
  return result;
})();

// ─── Hooks ──────────────────────────────────────────────────────────────────
function useInView(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12, ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav({ scrolled, currentSection, onNavigate }) {
  const links = [
    { label: "Work", target: "work" },
    { label: "About", target: "about" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 52,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(20px, 5vw, 80px)",
      background: scrolled ? "rgba(0,0,0,0.82)" : "transparent",
      backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
    }}>
      <a onClick={() => onNavigate("hero")} style={{
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em",
        color: "#f5f5f7", textDecoration: "none", cursor: "pointer",
      }}>
        LENS<span style={{ color: "#555", fontWeight: 300 }}>/</span>FRAME
      </a>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {links.map((l) => (
          <a key={l.target} onClick={() => onNavigate(l.target)} style={{
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: 13, textDecoration: "none", cursor: "pointer",
            color: currentSection === l.target ? "#f5f5f7" : "#999",
            transition: "color 0.2s", letterSpacing: "0.01em",
          }}
            onMouseEnter={e => e.target.style.color = "#f5f5f7"}
            onMouseLeave={e => e.target.style.color = currentSection === l.target ? "#f5f5f7" : "#999"}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [layerA, setLayerA] = useState(opt(ALL_IMAGES[0], '1600w'));
  const [layerB, setLayerB] = useState(opt(ALL_IMAGES[0], '1600w'));
  const [aVisible, setAVisible] = useState(true);
  const counter = useRef(0);
  const aVisRef = useRef(true);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = setInterval(() => {
      counter.current = (counter.current + 1) % ALL_IMAGES.length;
      const nextSrc = opt(ALL_IMAGES[counter.current], '1600w');
      const img = new Image();
      img.src = nextSrc;
      img.onload = () => {
        if (aVisRef.current) {
          setLayerB(nextSrc);
        } else {
          setLayerA(nextSrc);
        }
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            aVisRef.current = !aVisRef.current;
            setAVisible(aVisRef.current);
          });
        });
      };
    }, 5000);
    return () => clearInterval(timer);
  }, [loaded]);

  return (
    <section id="hero" style={{
      position: "relative", height: "100vh", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center", background: "#000",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        opacity: loaded ? 0.5 : 0, transition: "opacity 1.8s ease",
      }}>
        <img src={layerB} alt="" decoding="async" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
        }} />
        <img src={layerA} alt="" decoding="async" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          opacity: aVisible ? 1 : 0, transition: "opacity 1.5s ease",
        }} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)",
      }} />
      <div style={{
        position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, padding: "0 24px",
      }}>
        <h1 style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(48px, 10vw, 96px)", fontWeight: 700,
          letterSpacing: "-0.04em", lineHeight: 1.0, color: "#f5f5f7", margin: 0,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
        }}>
          Automotive.<br />Architecture.
        </h1>
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, sans-serif",
          fontSize: "clamp(16px, 2.2vw, 24px)", fontWeight: 400,
          color: "#a1a1a6", marginTop: 20, letterSpacing: "-0.01em", lineHeight: 1.4,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 0.6s, transform 1s ease 0.6s",
        }}>
          Capturing form. Framing motion.
        </p>
      </div>
      {/* scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        zIndex: 2, opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s",
      }}>
        <div style={{
          width: 24, height: 40, borderRadius: 12, border: "2px solid rgba(255,255,255,0.3)",
          display: "flex", justifyContent: "center", paddingTop: 8,
        }}>
          <div style={{
            width: 3, height: 8, borderRadius: 2, background: "rgba(255,255,255,0.5)",
            animation: "scrollPulse 2s ease infinite",
          }} />
        </div>
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 1; transform: translateY(0); }
            50% { opacity: 0.3; transform: translateY(6px); }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─── Horizontal Scroll Gallery ──────────────────────────────────────────────
function HorizontalGallery({ images, active, inView, onImageClick }) {
  const scrollRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false, lastX: 0, lastTime: 0, velocity: 0 });
  const momentumRef = useRef(null);

  useEffect(() => {
    if (inView && !mounted) setMounted(true);
  }, [inView]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setScrollPos(el.scrollLeft);
      setMaxScroll(el.scrollWidth - el.clientWidth);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [active]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.35, behavior: "smooth" });
  };

  const onMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    if (momentumRef.current) { cancelAnimationFrame(momentumRef.current); momentumRef.current = null; }
    drag.current = { active: true, startX: e.pageX, scrollLeft: el.scrollLeft, moved: false, lastX: e.pageX, lastTime: Date.now(), velocity: 0 };
    setDragging(true);
  };

  const onMouseMove = (e) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const now = Date.now();
    const dt = now - drag.current.lastTime;
    const dx = e.pageX - drag.current.lastX;
    if (dt > 0) drag.current.velocity = dx / dt;
    drag.current.lastX = e.pageX;
    drag.current.lastTime = now;
    const walk = e.pageX - drag.current.startX;
    if (Math.abs(walk) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - walk;
  };

  const onMouseUp = () => {
    const velocity = drag.current.velocity;
    drag.current.active = false;
    setDragging(false);
    if (Math.abs(velocity) > 0.3) {
      const el = scrollRef.current;
      if (!el) return;
      let v = -velocity * 1000;
      const friction = 0.975;
      const step = () => {
        v *= friction;
        if (Math.abs(v) < 0.5) return;
        el.scrollLeft += v / 60;
        momentumRef.current = requestAnimationFrame(step);
      };
      momentumRef.current = requestAnimationFrame(step);
    }
  };

  const handleImageClick = (src) => {
    if (!drag.current.moved) onImageClick(src);
  };

  const progress = maxScroll > 0 ? scrollPos / maxScroll : 0;

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 3,
      opacity: active ? 1 : 0, pointerEvents: active ? "auto" : "none",
      transition: "opacity 0.5s ease", display: "flex", flexDirection: "column",
    }}>
      <div ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
        flex: 1, display: "flex", gap: 3, overflowX: "auto", overflowY: "hidden",
        scrollbarWidth: "none", cursor: dragging ? "grabbing" : "grab", userSelect: "none",
      }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {mounted && images.map((src, i) => (
          <div key={i} style={{
            flex: "0 0 60%", minWidth: "60%",
            position: "relative", overflow: "hidden",
          }}>
            <img
              src={opt(src, '1600w')}
              srcSet={`${opt(src, '800w')} 800w, ${opt(src, '1600w')} 1600w, ${opt(src, '3200w')} 3200w`}
              sizes="60vw"
              alt="" loading="lazy" decoding="async" draggable={false}
              onClick={() => handleImageClick(src)}
              style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
            }} />
          </div>
        ))}
      </div>

      {scrollPos > 10 && (
        <button onClick={() => scroll(-1)} aria-label="Previous" style={{
          position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
          background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 20,
          backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.85)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
        >‹</button>
      )}
      {scrollPos < maxScroll - 10 && (
        <button onClick={() => scroll(1)} aria-label="Next" style={{
          position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
          background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 20,
          backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.85)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
        >›</button>
      )}

      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        width: 120, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.15)",
      }}>
        <div style={{
          width: `${((1 / images.length) * 100) + (progress * (1 - 1 / images.length) * 100)}%`,
          height: "100%", borderRadius: 2, background: "#f5f5f7",
          transition: "width 0.15s ease",
        }} />
      </div>

      <div style={{
        position: "absolute", bottom: 16, right: 24,
        fontFamily: "'SF Pro Text', -apple-system, sans-serif",
        fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em",
      }}>
        {Math.min(Math.round(progress * (images.length - 1)) + 1, images.length)} / {images.length}
      </div>
    </div>
  );
}

// ─── Project Section ────────────────────────────────────────────────────────
function ProjectSection({ project, index, onImageClick }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", width: "100%", height: "40vh", minHeight: 250,
        overflow: "hidden", background: project.color, cursor: "default",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(50px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
        willChange: "transform, opacity", contentVisibility: "auto",
        containIntrinsicSize: "auto 250px",
      }}
    >
      {/* cover */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        opacity: hovered ? 0 : 1, transition: "opacity 0.5s ease",
      }}>
        <img src={opt(project.images[0], '800w')} alt="" loading="lazy" decoding="async" style={{
          width: "100%", height: "100%", objectFit: "cover", opacity: 0.45,
        }} />
      </div>

      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: isEven
          ? "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)"
          : "linear-gradient(225deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
        opacity: hovered ? 0 : 1, transition: "opacity 0.5s ease", pointerEvents: "none",
      }} />

      {/* text overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", alignItems: "center",
        padding: "0 clamp(24px, 6vw, 80px)",
        justifyContent: isEven ? "flex-start" : "flex-end",
        opacity: hovered ? 0 : 1, transform: hovered ? "translateY(-10px)" : "translateY(0)",
        transition: "opacity 0.4s ease, transform 0.4s ease", pointerEvents: "none",
      }}>
        <div style={{ maxWidth: 520 }}>
          <p style={{
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: 12, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "#2997ff", margin: "0 0 10px",
          }}>{project.category}</p>
          <h3 style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 700,
            letterSpacing: "-0.04em", lineHeight: 1.05, color: "#f5f5f7", margin: 0,
          }}>{project.title}</h3>
          <p style={{
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: 15, color: "#86868b", marginTop: 14, letterSpacing: "-0.01em",
          }}>Hover to explore project →</p>
        </div>
      </div>

      {/* gallery */}
      <HorizontalGallery images={project.images} active={hovered} inView={inView} onImageClick={onImageClick} />

      {/* badge on hover */}
      <div style={{
        position: "absolute", top: 20, left: 24, zIndex: 4,
        opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s", pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "'SF Pro Text', -apple-system, sans-serif",
          fontSize: 13, fontWeight: 600, color: "#f5f5f7",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)",
          padding: "6px 16px", borderRadius: 980, letterSpacing: "-0.01em",
        }}>{project.category} — {project.title}</span>
      </div>
    </article>
  );
}

// ─── Work ───────────────────────────────────────────────────────────────────
function Work({ onImageClick }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="work" style={{ paddingTop: 40 }}>
      <div style={{ textAlign: "center", padding: "80px 24px 36px" }}>
        <h2 style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700,
          letterSpacing: "-0.04em", lineHeight: 1.05, color: "#f5f5f7", margin: 0,
        }}>Selected Work.</h2>
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, sans-serif",
          fontSize: "clamp(15px, 2vw, 21px)", color: "#86868b",
          marginTop: 12, letterSpacing: "-0.01em",
        }}>Hover a project to explore. Scroll horizontally through each series.</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, padding: "0 24px 48px" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: 14, fontWeight: 500, padding: "8px 22px", borderRadius: 980,
            border: "none", cursor: "pointer",
            background: filter === cat ? "#f5f5f7" : "rgba(255,255,255,0.08)",
            color: filter === cat ? "#1d1d1f" : "#a1a1a6",
            transition: "background 0.3s, color 0.3s",
          }}>{cat}</button>
        ))}
      </div>

      <div>{filtered.map((p, i) => <ProjectSection key={p.id} project={p} index={i} onImageClick={onImageClick} />)}</div>
    </section>
  );
}


// ─── About ──────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={{ padding: "120px 24px 100px" }}>
      <div ref={ref} style={{
        maxWidth: 760, margin: "0 auto",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: 12, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "#2997ff", margin: "0 0 14px",
          }}>About</p>
          <h2 style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700,
            letterSpacing: "-0.03em", lineHeight: 1.1, color: "#f5f5f7", margin: 0,
          }}>Every frame tells a story of<br />engineering and artistry.</h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40,
        }}>
          <div>
            <h3 style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 20, fontWeight: 600, color: "#f5f5f7",
              letterSpacing: "-0.02em", margin: "0 0 12px",
            }}>The Craft</h3>
            <p style={{
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
              fontSize: 16, lineHeight: 1.65, color: "#86868b",
              letterSpacing: "-0.01em", margin: 0,
            }}>
              I specialize in capturing the intersection of human design and raw purpose — 
              where automotive engineering meets the sculptor's hand and architecture 
              transcends shelter to become statement.
            </p>
          </div>
          <div>
            <h3 style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontSize: 20, fontWeight: 600, color: "#f5f5f7",
              letterSpacing: "-0.02em", margin: "0 0 12px",
            }}>The Approach</h3>
            <p style={{
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
              fontSize: 16, lineHeight: 1.65, color: "#86868b",
              letterSpacing: "-0.01em", margin: 0,
            }}>
              Whether it's the haunting curve of a hypercar's flank at golden hour or the 
              geometric precision of a Brutalist façade in monochrome, I seek the moments 
              where light, form, and intent converge. Every shoot begins with research — 
              understanding the designer's vision before interpreting it through the lens.
            </p>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
          marginTop: 56, borderRadius: 16, overflow: "hidden",
          background: "rgba(255,255,255,0.06)",
        }}>
          {[
            { label: "Primary Body", val: "Leica Q3 43" },
            { label: "Go-to Lens", val: "APO-Summicron 43mm F2.0" },
            { label: "Editing Suite", val: "Adobe Lightroom" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "28px 20px", background: "#0a0a0a", textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em",
                color: "#6e6e73", marginBottom: 6,
              }}>{item.label}</div>
              <div style={{
                fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                fontSize: 16, fontWeight: 600, color: "#f5f5f7",
                letterSpacing: "-0.02em",
              }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" style={{
      padding: "100px 24px 120px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div ref={ref} style={{
        maxWidth: 640, margin: "0 auto", textAlign: "center",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, sans-serif",
          fontSize: 12, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "#2997ff", margin: "0 0 14px",
        }}>Contact</p>
        <h2 style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700,
          letterSpacing: "-0.04em", color: "#f5f5f7", margin: "0 0 12px",
        }}>Let's work together.</h2>
        <p style={{
          fontFamily: "'SF Pro Text', -apple-system, sans-serif",
          fontSize: 17, color: "#86868b", margin: "0 0 8px", letterSpacing: "-0.01em",
        }}>
          Available for commercial shoots, editorial commissions, and fine art collaborations.
        </p>
        <p style={{
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontSize: 22, fontWeight: 600, color: "#f5f5f7",
          letterSpacing: "-0.02em", margin: "28px 0 36px",
        }}>Nardussy</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <a href="https://instagram.com/nardussy" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: 17, fontWeight: 500, color: "#f5f5f7",
            background: "#2997ff", padding: "14px 32px", borderRadius: 980,
            textDecoration: "none", letterSpacing: "-0.01em",
            transition: "background 0.3s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
            @nardussy
          </a>
          <a href="mailto:hello@nardussy.com" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: 17, fontWeight: 500, color: "#f5f5f7",
            background: "rgba(255,255,255,0.1)", padding: "14px 32px", borderRadius: 980,
            textDecoration: "none", letterSpacing: "-0.01em",
            transition: "background 0.3s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "scale(1)"; }}
          >Email Me</a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "20px 24px", textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <p style={{
        fontFamily: "'SF Pro Text', -apple-system, sans-serif",
        fontSize: 12, color: "#6e6e73", margin: 0,
      }}>© 2026 Nardussy — LENS/FRAME. All rights reserved.</p>
    </footer>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.92)",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", animation: "lightboxFadeIn 0.3s ease",
    }}>
      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <img src={opt(src, '3200w')} alt="" style={{
        maxWidth: "95vw", maxHeight: "95vh", objectFit: "contain",
      }} />
    </div>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = ["contact", "about", "work", "hero"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          setCurrentSection(id); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavigate = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      background: "#000", color: "#f5f5f7", minHeight: "100vh",
      overflowX: "hidden",
      WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
    }}>
      <Nav scrolled={scrolled} currentSection={currentSection} onNavigate={onNavigate} />
      <Hero />
      <Work onImageClick={setLightboxSrc} />

      <About />
      <Contact />
      <Footer />
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </div>
  );
}
