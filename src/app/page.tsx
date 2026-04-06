"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function LandingPage() {
  const { user } = useAuth();
  const href = user ? "/chat" : "/auth";

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", color: "#f1f5f9", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        background: "rgba(10,14,26,0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="18" height="18" fill="none" stroke="#0a0e1a" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Yurist AI</span>
          </div>
          <Link href={href} style={{
            background: "#f59e0b", color: "#0a0e1a", fontWeight: 600,
            fontSize: 13, padding: "8px 20px", borderRadius: 8,
            textDecoration: "none", transition: "background 0.2s"
          }}>
            {user ? "Chatga o'tish" : "Kirish"}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 60, textAlign: "center", position: "relative" }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)",
          width: 500, height: 500, background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto", padding: "0 24px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)",
            color: "#fbbf24", fontSize: 12, fontWeight: 500,
            padding: "6px 14px", borderRadius: 20, marginBottom: 28
          }}>
            <span style={{ width: 6, height: 6, background: "#fbbf24", borderRadius: "50%" }} />
            AI yordamida huquqiy maslahat
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#fff" }}>O&apos;zbekiston</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #fbbf24, #fde68a)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>huquqiy yordamchisi</span>
          </h1>

          <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.7, marginBottom: 32, maxWidth: 460, margin: "0 auto 32px" }}>
            Fuqarolik, jinoyat, mehnat, oila huquqi bo&apos;yicha tezkor va aniq maslahat — bepul va 24/7
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href={href} style={{
              background: "#f59e0b", color: "#0a0e1a", fontWeight: 700,
              fontSize: 14, padding: "12px 28px", borderRadius: 12,
              textDecoration: "none", boxShadow: "0 4px 20px rgba(245,158,11,0.2)"
            }}>
              Bepul boshlash
            </Link>
            <a href="#how" style={{
              color: "#94a3b8", fontWeight: 500, fontSize: 14,
              padding: "12px 28px", borderRadius: 12,
              border: "1px solid #243049", textDecoration: "none"
            }}>
              Qanday ishlaydi?
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          maxWidth: 480, margin: "48px auto 0", display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", gap: 8, padding: "0 24px"
        }}>
          {[
            { v: "500+", l: "Qonun moddalari" },
            { v: "24/7", l: "Doim online" },
            { v: "10+", l: "Kodekslar" },
            { v: "Tekin", l: "Boshlash" },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fbbf24" }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #243049, transparent)" }} />
      </div>

      {/* How it works */}
      <section id="how" style={{ padding: "64px 24px", maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 8, color: "#fff" }}>
          Qanday ishlaydi?
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 48 }}>
          Uch oddiy qadam — savolingizga javob tayyor
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {[
            { n: "01", t: "Ro'yxatdan o'ting", d: "Google yoki telefon orqali bir zumda kirish" },
            { n: "02", t: "Savol bering", d: "Yuridik muammoingizni oddiy tilda yozing" },
            { n: "03", t: "Javob oling", d: "Qonun moddalariga asoslangan aniq maslahat" },
          ].map((item) => (
            <div key={item.n} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "rgba(245,158,11,0.15)", marginBottom: 8 }}>{item.n}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{item.t}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #243049, transparent)" }} />
      </div>

      {/* Features */}
      <section style={{ padding: "64px 24px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 8, color: "#fff" }}>
          Nima uchun Yurist AI?
        </h2>
        <p style={{ fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 48 }}>
          Professional yuridik maslahatni oddiy va qulay qilib berdik
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {[
            { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", t: "O'zbekiston qonunlari", d: "Fuqarolik, jinoyat, mehnat, oila, soliq kodekslari asosida maslahat" },
            { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", t: "Jonli suhbat", d: "ChatGPT uslubida qulay interfeys, tezkor javoblar" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", t: "Ishonchli ma'lumot", d: "Aniq qonun moddalari va professional tavsiyalar" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", t: "24/7 mavjud", d: "Istalgan vaqtda, istalgan joydan huquqiy yordam" },
          ].map((f) => (
            <div key={f.t} style={{
              background: "rgba(17,24,39,0.5)", border: "1px solid rgba(36,48,73,0.6)",
              borderRadius: 14, padding: 20, display: "flex", gap: 14, alignItems: "flex-start"
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "rgba(251,191,36,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="18" height="18" fill="none" stroke="#fbbf24" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{f.t}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{
          maxWidth: 480, margin: "0 auto",
          background: "rgba(17,24,39,0.6)", border: "1px solid rgba(36,48,73,0.6)",
          borderRadius: 20, padding: "48px 32px", textAlign: "center", position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at top, rgba(251,191,36,0.04) 0%, transparent 60%)",
            pointerEvents: "none"
          }} />
          <div style={{ position: "relative" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(251,191,36,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <svg width="22" height="22" fill="none" stroke="#fbbf24" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Hoziroq boshlang</h2>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>
              Ro&apos;yxatdan o&apos;ting va birinchi yuridik savolingizni bering
            </p>
            <Link href={href} style={{
              display: "inline-block", background: "#f59e0b", color: "#0a0e1a",
              fontWeight: 700, fontSize: 14, padding: "12px 32px", borderRadius: 12,
              textDecoration: "none", boxShadow: "0 4px 20px rgba(245,158,11,0.2)"
            }}>
              Bepul ro&apos;yxatdan o&apos;tish
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(36,48,73,0.4)", padding: "20px 24px" }}>
        <div style={{
          maxWidth: 960, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="14" height="14" fill="none" stroke="#0a0e1a" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Yurist AI</span>
          </div>
          <p style={{ fontSize: 11, color: "#475569" }}>&copy; 2026 Yurist AI</p>
        </div>
      </footer>
    </div>
  );
}
