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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* BG effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-up">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-xl glow-amber">
            <svg className="w-8 h-8 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.18 7.5 12 10.82 4.82 7.5 12 4.18zM4 8.64l7 3.5V19.5l-7-3.5V8.64zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Yurist AI</h1>
            <p className="text-dark-300 text-sm">Huquqiy yordamchi</p>
          </div>
        </Link>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {mode === "main" ? (
            <>
              <h2 className="text-2xl font-bold text-center text-white mb-2">Xush kelibsiz</h2>
              <p className="text-dark-300 text-center mb-8">Tizimga kirish usulini tanlang</p>

              {/* Google */}
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3.5 px-5 rounded-2xl transition shadow-lg shadow-black/10 mb-4"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google bilan kirish
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent" />
                <span className="text-xs text-dark-400 uppercase tracking-wider">yoki</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent" />
              </div>

              {/* Phone */}
              <button
                onClick={() => setMode("phone")}
                className="w-full flex items-center justify-center gap-3 bg-dark-600 hover:bg-dark-500 text-white font-semibold py-3.5 px-5 rounded-2xl transition border border-dark-500 hover:border-dark-400"
              >
                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Telefon raqam bilan kirish
              </button>
            </>
          ) : !confirmResult ? (
            <>
              <button
                onClick={() => { setMode("main"); setError(""); }}
                className="text-dark-300 hover:text-white mb-6 text-sm flex items-center gap-2 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Orqaga
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">Telefon raqam</h2>
              <p className="text-dark-300 text-sm mb-6">O&apos;zbekiston raqamingizni kiriting</p>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full bg-dark-700 border border-dark-500 rounded-2xl px-5 py-3.5 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition mb-5 text-lg"
              />
              <button
                onClick={sendSMS}
                disabled={sending || phone.length < 9}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-dark-600 disabled:to-dark-600 disabled:text-dark-400 text-dark-900 font-bold py-3.5 rounded-2xl transition shadow-lg shadow-primary-500/20"
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full" />
                    Yuborilmoqda...
                  </span>
                ) : "SMS kod yuborish"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setConfirmResult(null); setCode(""); setError(""); }}
                className="text-dark-300 hover:text-white mb-6 text-sm flex items-center gap-2 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Orqaga
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">Tasdiqlash kodi</h2>
              <p className="text-dark-300 text-sm mb-6">
                <span className="text-primary-400 font-medium">{phone}</span> raqamiga yuborilgan 6 xonali kodni kiriting
              </p>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                maxLength={6}
                className="w-full bg-dark-700 border border-dark-500 rounded-2xl px-5 py-4 text-white text-center text-3xl tracking-[0.5em] font-mono placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition mb-5"
              />
              <button
                onClick={verifyCode}
                disabled={code.length < 6}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-dark-600 disabled:to-dark-600 disabled:text-dark-400 text-dark-900 font-bold py-3.5 rounded-2xl transition shadow-lg shadow-primary-500/20"
              >
                Tasdiqlash
              </button>
            </>
          )}

          {error && (
            <div className="mt-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
        </div>

        <p className="text-center text-dark-400 text-sm mt-8">
          Kirish orqali siz{" "}
          <span className="text-dark-300 underline underline-offset-2 cursor-pointer hover:text-white transition">
            foydalanish shartlari
          </span>
          ga rozilik bildirasiz
        </p>
      </div>

      <div ref={recaptchaRef} />
    </div>
  );
}
