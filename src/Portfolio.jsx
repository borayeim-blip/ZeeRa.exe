import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Github,
  Mail,
  MessageCircle,
  Server,
  Code2,
  Boxes,
  ChevronDown,
  ExternalLink,
  CircleDot,
} from "lucide-react";

const AVATAR_SRC = "data:image/jpeg;base64,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";

// ---------------------------------------------------------------------------
// EDIT ME: swap in your own details. Nothing below this block needs touching
// unless you want to restructure the page.
// ---------------------------------------------------------------------------
const CONFIG = {
  name: "ZeeRa.Exe",
  title: "Backend & Game Server Developer",
  tagline:
    "I build the systems that keep servers running \u2014 FiveM resources, Minecraft plugins, and the web tools around them.",
  bio: "I'm a developer who lives in the space between game servers and the web. Most days that means writing Lua for FiveM economies and jobs, Java/Kotlin plugins for Minecraft, and the dashboards, APIs, and bots that tie a community's server together. I care about code that survives a restart, a raid, and 200 concurrent players at once.",
  email: "borayeim@gmail.com",
  github: "https://github.com/borayeim-blip",
  discord: "zeera.exe",
  location: "Remote",
  bootLines: [
    { text: "$ ./run.sh", tag: "shell" },
    { text: "[ 0.014s] Starting FXServer, version 1.0.0.11xxx", tag: "fivem" },
    { text: "[ 0.512s] Resource es_extended started.", tag: "fivem" },
    { text: "[ 0.890s] Resource hitmarker started.", tag: "fivem" },
    { text: "[ 1.203s] Starting minecraft server version 1.20.4", tag: "mc" },
    { text: "[ 4.771s] Preparing level \"world\"", tag: "mc" },
    { text: "[ 6.098s] Plugin JRCore v2.3.1 enabled", tag: "mc" },
    { text: "[ 6.601s] Done! For help, type \"help\"", tag: "mc" },
    { text: "$ status --all", tag: "shell" },
    { text: "\u2713 all systems online", tag: "ok" },
  ],
  skillGroups: [
    {
      icon: "server",
      label: "Game Servers",
      items: ["FiveM / Lua", "ESX & QBCore", "Minecraft / Java", "Kotlin", "Bukkit · Spigot · Paper"],
    },
    {
      icon: "code",
      label: "Web & Backend",
      items: ["TypeScript", "React & Next.js", "Node.js", "REST & WebSockets", "PostgreSQL · MongoDB"],
    },
    {
      icon: "boxes",
      label: "Infra & Tooling",
      items: ["Docker", "Linux server admin", "Git & CI", "Redis", "Discord.js"],
    },
  ],
  projects: [
    {
      name: "hitmarker",
      platform: "FiveM",
      version: "v1.0.1",
      status: "online",
      desc: "A modular hitmarker & economy resource for ESX & QBCore servers \u2014 crafting chains, payouts, and an admin panel for tuning wages without a restart.",
      tags: ["Lua", "MySQL", "ESX", "QBCore"],
    },
    {
      name: "combat",
      platform: "Minecraft",
      version: "v1.4.0",
      status: "online",
      desc: "A Paper plugin suite covering land claims, custom mob loot tables, and a lightweight economy \u2014 built for a 200+ player SMP.",
      tags: ["Kotlin", "Paper API", "SQLite"],
    },
    {
      name: "Server Ops Dashboard",
      platform: "Web",
      version: "v1.0.2",
      status: "beta",
      desc: "A React + Node dashboard that pulls live player counts, restart schedules, and logs from both a FiveM and a Minecraft server into one view.",
      tags: ["React", "Node.js", "WebSockets"],
    },
    {
      name: "queue-bot",
      platform: "Discord",
      version: "v0.9.5",
      status: "online",
      desc: "A Discord bot that manages server whitelist requests, queue position, and ban appeals \u2014 synced against both game servers.",
      tags: ["discord.js", "Node.js", "Postgres" , "discord.py" ,"Payment API"],
    },
  ],
};

const ICONS = { server: Server, code: Code2, boxes: Boxes };

const TAG_COLOR = {
  shell: "var(--muted)",
  fivem: "var(--accent-2)",
  mc: "var(--accent)",
  ok: "var(--accent)",
};

const STATUS_COLOR = {
  online: "var(--accent)",
  beta: "var(--accent-2)",
};

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function useBootSequence(lines, { charDelay = 14, lineDelay = 260 } = {}) {
  const [renderedLines, setRenderedLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let lineIndex = 0;
    let timer = null;

    setRenderedLines([]);
    setDone(false);

    function typeLine() {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }
      const full = lines[lineIndex].text;
      const tag = lines[lineIndex].tag;
      let charIndex = 0;

      setRenderedLines((prev) => [...prev, { text: "", tag }]);

      timer = setInterval(() => {
        if (cancelled) {
          clearInterval(timer);
          return;
        }
        charIndex += 1;
        setRenderedLines((prev) => {
          const next = [...prev];
          next[next.length - 1] = { text: full.slice(0, charIndex), tag };
          return next;
        });
        if (charIndex >= full.length) {
          clearInterval(timer);
          lineIndex += 1;
          timer = setTimeout(typeLine, lineDelay);
        }
      }, charDelay);
    }

    typeLine();
    return () => {
      cancelled = true;
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [lines, charDelay, lineDelay]);

  return { renderedLines, done };
}

export default function Portfolio() {
  const { renderedLines, done } = useBootSequence(CONFIG.bootLines);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        "--bg": "#0D1117",
        "--surface": "#141A22",
        "--surface-2": "#1B2229",
        "--border": "#242C36",
        "--text": "#E6EDF3",
        "--muted": "#7D8998",
        "--accent": "#3FB950",
        "--accent-2": "#FF7A45",
        fontFamily: "'Inter', sans-serif",
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .mono { font-family: 'JetBrains Mono', monospace; }
        .glow { text-shadow: 0 0 24px rgba(63,185,80,0.35); }
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .cursor { animation: blink 1s step-start infinite; }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(63,185,80,0.55); }
          70% { box-shadow: 0 0 0 8px rgba(63,185,80,0); }
          100% { box-shadow: 0 0 0 0 rgba(63,185,80,0); }
        }
        .pulse-dot { border-radius: 50%; animation: pulseDot 2.2s ease-out infinite; }
        .stagger > * { opacity: 0; animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .skill-tag { transition: border-color 0.15s ease, color 0.15s ease; }
        .skill-tag:hover { border-color: var(--accent); color: var(--accent); }
        .proj-card { transition: transform 0.18s ease, border-color 0.18s ease; }
        .proj-card:hover { transform: translateY(-3px); border-color: var(--accent); }
        .nav-link { transition: color 0.15s ease; }
        .nav-link:hover { color: var(--accent); }
        .btn-primary { transition: opacity 0.15s ease, transform 0.15s ease; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .cursor { animation: none; }
          .pulse-dot { animation: none; }
          .stagger > * { animation: none; opacity: 1; }
          .reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(13,17,23,0.85)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="mono" style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
            <Terminal size={18} color="var(--accent)" />
            <span>{CONFIG.name.split(" ")[0].toLowerCase()}@servers</span>
          </div>
          <nav style={{ display: "flex", gap: 24 }} className="mono">
            {["about", "skills", "projects", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="nav-link"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--muted)",
                  fontSize: 13,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {id}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "72px 24px 56px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
        }}
      >
        <div
          className="mono"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface-2)",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
            <span style={{ marginLeft: 10, fontSize: 12, color: "var(--muted)" }}>server-boot &mdash; 80x24</span>
          </div>
          <div style={{ padding: "20px 20px 24px", fontSize: 13, lineHeight: 1.9, minHeight: 240 }}>
            {renderedLines.map((line, i) => (
              <div key={i} style={{ color: TAG_COLOR[line.tag] || "var(--text)" }}>
                {line.text}
                {i === renderedLines.length - 1 && !done && <span className="cursor">{"\u2588"}</span>}
              </div>
            ))}
            {done && (
              <div style={{ marginTop: 18 }}>
                <h1
                  className="glow"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 800,
                    fontSize: "clamp(28px, 4vw, 40px)",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {CONFIG.name}
                </h1>
                <p style={{ color: "var(--accent)", marginTop: 6, fontSize: 15 }}>{CONFIG.title}</p>
                <p style={{ color: "var(--muted)", marginTop: 14, maxWidth: 560, fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.6 }}>
                  {CONFIG.tagline}
                </p>
                <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
                  <button
                    onClick={() => scrollTo("projects")}
                    className="btn-primary"
                    style={{
                      background: "var(--accent)",
                      color: "#06240E",
                      border: "none",
                      borderRadius: 6,
                      padding: "10px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    View projects
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="btn-primary"
                    style={{
                      background: "transparent",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      padding: "10px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    Get in touch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ChevronDown size={20} color="var(--muted)" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 24px 64px" }}>
        <Reveal>
          <SectionLabel text="about" />
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: "50%",
                  padding: 3,
                  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                }}
              >
                <img
                  src={AVATAR_SRC}
                  alt={CONFIG.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    border: "3px solid var(--bg)",
                  }}
                />
              </div>
              <div
                className="mono"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  justifyContent: "center",
                  marginTop: 10,
                  fontSize: 11,
                  color: "var(--accent)",
                }}
              >
                <CircleDot size={10} color="var(--accent)" className="pulse-dot" />
                online
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text)", maxWidth: 640, margin: 0 }}>{CONFIG.bio}</p>
              <p className="mono" style={{ marginTop: 16, color: "var(--muted)", fontSize: 13 }}>
                based in {CONFIG.location}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 24px 64px" }}>
        <Reveal>
          <SectionLabel text="skills" />
          <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {CONFIG.skillGroups.map((group, gi) => {
              const Icon = ICONS[group.icon] || Code2;
              return (
                <div
                  key={group.label}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 20,
                    animationDelay: `${gi * 90}ms`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <Icon size={18} color="var(--accent)" />
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{group.label}</h3>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="skill-tag mono"
                        style={{
                          fontSize: 12,
                          padding: "5px 10px",
                          borderRadius: 5,
                          border: "1px solid var(--border)",
                          color: "var(--muted)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 24px 64px" }}>
        <Reveal>
          <SectionLabel text="projects" />
          <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {CONFIG.projects.map((p, pi) => (
              <div
                key={p.name}
                className="proj-card"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  animationDelay: `${pi * 80}ms`,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <div className="mono" style={{ fontWeight: 700, fontSize: 15 }}>
                      {p.name}
                    </div>
                    <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                      {p.platform} &middot; {p.version}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <CircleDot
                      size={12}
                      color={STATUS_COLOR[p.status] || "var(--muted)"}
                      className={p.status === "online" ? "pulse-dot" : ""}
                    />
                    <span className="mono" style={{ fontSize: 11, color: STATUS_COLOR[p.status] || "var(--muted)" }}>
                      {p.status}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text)", margin: 0 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="mono"
                      style={{
                        fontSize: 11,
                        padding: "3px 8px",
                        borderRadius: 4,
                        background: "var(--surface-2)",
                        color: "var(--muted)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 24px 96px" }}>
        <Reveal>
          <SectionLabel text="contact" />
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: 28,
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Let's build something that stays online.</h3>
              <p style={{ color: "var(--muted)", marginTop: 8, fontSize: 14, maxWidth: 420 }}>
                Whether it's a FiveM resource, a Minecraft plugin, or the dashboard tying it together{" \u2014 "}I'm open to hearing about it.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="mono">
              <ContactLink icon={<Mail size={16} />} label={CONFIG.email} href={`mailto:${CONFIG.email}`} />
              <ContactLink icon={<Github size={16} />} label="GitHub" href={CONFIG.github} />
              <ContactLink icon={<MessageCircle size={16} />} label={CONFIG.discord} href="#" />
            </div>
          </div>
          <footer style={{ textAlign: "center", marginTop: 48, color: "var(--muted)", fontSize: 12 }} className="mono">
            <ExternalLink size={12} style={{ verticalAlign: "middle", marginRight: 6 }} />
            built with React &middot; {new Date().getFullYear()}
          </footer>
        </Reveal>
      </section>
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
      <span className="mono" style={{ color: "var(--accent)", fontSize: 13 }}>
        //
      </span>
      <h2 className="mono" style={{ margin: 0, fontSize: 13, letterSpacing: 2, color: "var(--muted)", textTransform: "uppercase" }}>
        {text}
      </h2>
      <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

function ContactLink({ icon, label, href }) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "var(--text)",
        fontSize: 13,
        textDecoration: "none",
        border: "1px solid var(--border)",
        borderRadius: 6,
        padding: "8px 12px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {icon}
      {label}
    </a>
  );
}