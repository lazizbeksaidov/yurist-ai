"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  auth,
  googleProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/lib/firebase";
import { ConfirmationResult } from "firebase/auth";
import { useAuth } from "@/lib/auth-context";

const s = {
  page: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    padding: "40px 20px", background: "#0a0e1a", position: "relative" as const, overflow: "hidden" as const,
  },
  glow: {
    position: "absolute" as const, top: "20%", left: "50%", transform: "translateX(-50%)",
    width: 400, height: 400, background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)",
    pointerEvents: "none" as const,
  },
  wrapper: { position: "relative" as const, width: "100%", maxWidth: 400 },
  logoWrap: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
    marginBottom: 40, textDecoration: "none",
  },
  logoIcon: {
    width: 52, height: 52, borderRadius: 16,
    background: "linear-gradient(135deg, #fbbf24, #d97706)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 0 30px rgba(251,191,36,0.15)",
  },
  card: {
    background: "rgba(17,24,39,0.7)", backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 24, padding: "36px 32px",
  },
  title: { fontSize: 22, fontWeight: 700, textAlign: "center" as const, color: "#fff", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#64748b", textAlign: "center" as const, marginBottom: 32 },
  googleBtn: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    background: "#fff", color: "#1f2937", fontWeight: 600, fontSize: 14,
    padding: "14px 20px", borderRadius: 14, border: "none", cursor: "pointer",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)", marginBottom: 0,
  },
  divider: {
    display: "flex", alignItems: "center", gap: 16, margin: "24px 0",
  },
  dividerLine: { flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #334155, transparent)" },
  dividerText: { fontSize: 11, color: "#475569", textTransform: "uppercase" as const, letterSpacing: 2 },
  phoneBtn: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    background: "#1a2236", color: "#fff", fontWeight: 600, fontSize: 14,
    padding: "14px 20px", borderRadius: 14, border: "1px solid #243049", cursor: "pointer",
  },
  backBtn: {
    background: "none", border: "none", color: "#64748b", fontSize: 13,
    cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 24, padding: 0,
  },
  input: {
    width: "100%", background: "#1a2236", border: "1px solid #243049",
    borderRadius: 14, padding: "14px 18px", color: "#fff", fontSize: 16,
    outline: "none", marginBottom: 20, boxSizing: "border-box" as const,
  },
  codeInput: {
    width: "100%", background: "#1a2236", border: "1px solid #243049",
    borderRadius: 14, padding: "16px 18px", color: "#fff", fontSize: 28,
    textAlign: "center" as const, letterSpacing: "0.4em", fontFamily: "monospace",
    outline: "none", marginBottom: 20, boxSizing: "border-box" as const,
  },
  submitBtn: {
    width: "100%", background: "#f59e0b", color: "#0a0e1a", fontWeight: 700,
    fontSize: 14, padding: "14px 20px", borderRadius: 14, border: "none",
    cursor: "pointer", boxShadow: "0 4px 20px rgba(245,158,11,0.2)",
  },
  disabledBtn: {
    width: "100%", background: "#1a2236", color: "#475569", fontWeight: 700,
    fontSize: 14, padding: "14px 20px", borderRadius: 14, border: "none",
    cursor: "not-allowed",
  },
  error: {
    marginTop: 20, padding: "14px 16px", background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.15)", borderRadius: 12,
    color: "#f87171", fontSize: 13, display: "flex", alignItems: "flex-start", gap: 8,
  },
  footer: { textAlign: "center" as const, color: "#475569", fontSize: 13, marginTop: 32 },
};

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"main" | "phone">("main");
  const [phone, setPhone] = useState("+998");
  const [code, setCode] = useState("");
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && user) router.push("/chat");
  }, [user, loading, router]);

  const handleGoogle = async () => {
    try {
      setError("");
      await signInWithPopup(auth, googleProvider);
      router.push("/chat");
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("popup-closed")) return;
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    }
  };

  const sendSMS = async () => {
    try {
      setError("");
      setSending(true);
      if (!recaptchaRef.current) return;
      const verifier = new RecaptchaVerifier(auth, recaptchaRef.current, { size: "invisible" });
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmResult(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "SMS yuborishda xatolik");
    } finally {
      setSending(false);
    }
  };

  const verifyCode = async () => {
    try {
      setError("");
      if (!confirmResult) return;
      await confirmResult.confirm(code);
      router.push("/chat");
    } catch {
      setError("Kod noto'g'ri. Qayta urinib ko'ring.");
    }
  };

  if (loading) {
    return (
      <div style={{ ...s.page, fontFamily: "'Inter', sans-serif" }}>
        <div style={{ width: 32, height: 32, border: "2px solid #fbbf24", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ ...s.page, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={s.glow} />

      <div style={s.wrapper}>
        {/* Logo */}
        <Link href="/" style={s.logoWrap}>
          <div style={s.logoIcon}>
            <svg width="24" height="24" fill="none" stroke="#0a0e1a" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Yurist AI</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>Huquqiy yordamchi</div>
          </div>
        </Link>

        {/* Card */}
        <div style={s.card}>
          {mode === "main" ? (
            <>
              <h2 style={s.title}>Xush kelibsiz</h2>
              <p style={s.subtitle}>Tizimga kirish usulini tanlang</p>

              <button onClick={handleGoogle} style={s.googleBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google bilan kirish
              </button>

              <div style={s.divider}>
                <div style={s.dividerLine} />
                <span style={s.dividerText}>yoki</span>
                <div style={s.dividerLine} />
              </div>

              <button onClick={() => setMode("phone")} style={s.phoneBtn}>
                <svg width="18" height="18" fill="none" stroke="#fbbf24" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Telefon raqam bilan kirish
              </button>
            </>
          ) : !confirmResult ? (
            <>
              <button onClick={() => { setMode("main"); setError(""); }} style={s.backBtn}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Orqaga
              </button>
              <h2 style={{ ...s.title, textAlign: "left" }}>Telefon raqam</h2>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>O&apos;zbekiston raqamingizni kiriting</p>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                style={s.input}
              />
              <button
                onClick={sendSMS}
                disabled={sending || phone.length < 9}
                style={(sending || phone.length < 9) ? s.disabledBtn : s.submitBtn}
              >
                {sending ? "Yuborilmoqda..." : "SMS kod yuborish"}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { setConfirmResult(null); setCode(""); setError(""); }} style={s.backBtn}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Orqaga
              </button>
              <h2 style={{ ...s.title, textAlign: "left" }}>Tasdiqlash kodi</h2>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>
                <span style={{ color: "#fbbf24", fontWeight: 500 }}>{phone}</span> raqamiga yuborilgan 6 xonali kodni kiriting
              </p>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                maxLength={6}
                style={s.codeInput}
              />
              <button
                onClick={verifyCode}
                disabled={code.length < 6}
                style={code.length < 6 ? s.disabledBtn : s.submitBtn}
              >
                Tasdiqlash
              </button>
            </>
          )}

          {error && (
            <div style={s.error}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
        </div>

        <p style={s.footer}>
          Kirish orqali siz <span style={{ color: "#94a3b8", textDecoration: "underline", cursor: "pointer" }}>foydalanish shartlari</span>ga rozilik bildirasiz
        </p>
      </div>

      <div ref={recaptchaRef} />
    </div>
  );
}
