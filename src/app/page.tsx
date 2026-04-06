"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const FEATURES = [
  {
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    title: "O'zbekiston qonunlari",
    desc: "Fuqarolik, jinoyat, mehnat, oila, soliq kodekslari asosida professional maslahat olasiz",
  },
  {
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Jonli suhbat",
    desc: "ChatGPT uslubida qulay interfeys — savolingizni yozing, tezkor javob oling",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Ishonchli ma'lumot",
    desc: "Har bir javobda aniq qonun moddalari va professional tavsiyalar beriladi",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "24/7 mavjud",
    desc: "Kechasi-kunduz, dam olish kunlarida ham — istalgan vaqtda murojaat qiling",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Ro'yxatdan o'ting", desc: "Google yoki telefon raqam orqali bir zumda kirish" },
  { step: "02", title: "Savol bering", desc: "Yuridik muammoingizni oddiy tilda yozing" },
  { step: "03", title: "Javob oling", desc: "Qonun moddalariga asoslangan aniq maslahat" },
];

export default function LandingPage() {
  const { user } = useAuth();
  const href = user ? "/chat" : "/auth";

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-dark-900" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Yurist AI</span>
          </div>
          <Link
            href={href}
            className="bg-primary-500 hover:bg-primary-600 text-dark-900 font-semibold text-sm px-5 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-primary-500/20"
          >
            {user ? "Chatga o'tish" : "Kirish"}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/[0.07] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
            AI yordamida huquqiy maslahat
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-5 tracking-tight">
            <span className="text-white">O&apos;zbekiston</span>
            <br />
            <span className="text-gradient">huquqiy yordamchisi</span>
          </h1>

          <p className="text-base sm:text-lg text-dark-200 max-w-lg mx-auto mb-8 leading-relaxed">
            Fuqarolik, jinoyat, mehnat, oila huquqi bo&apos;yicha
            tezkor va aniq maslahat — bepul va 24/7
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={href}
              className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-dark-900 font-bold px-7 py-3 rounded-xl text-sm transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5"
            >
              Bepul boshlash
            </Link>
            <a
              href="#how"
              className="w-full sm:w-auto text-dark-200 hover:text-white font-medium px-7 py-3 rounded-xl text-sm border border-dark-600 hover:border-dark-400 transition-all"
            >
              Qanday ishlaydi?
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="relative max-w-lg mx-auto mt-14 sm:mt-20 grid grid-cols-4 gap-3">
          {[
            { value: "500+", label: "Qonun moddalari" },
            { value: "24/7", label: "Doim online" },
            { value: "10+", label: "Kodekslar" },
            { value: "Tekin", label: "Boshlash" },
          ].map((s) => (
            <div key={s.label} className="text-center py-3">
              <div className="text-lg sm:text-xl font-bold text-primary-400">{s.value}</div>
              <div className="text-[11px] sm:text-xs text-dark-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent" />
      </div>

      {/* How it works */}
      <section id="how" className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Qanday ishlaydi?</h2>
          <p className="text-dark-300 text-center text-sm sm:text-base mb-12 max-w-md mx-auto">
            Uch oddiy qadam — savolingizga javob tayyor
          </p>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-3xl font-extrabold text-primary-500/20 mb-3">{item.step}</div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-dark-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent" />
      </div>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Nima uchun Yurist AI?</h2>
          <p className="text-dark-300 text-center text-sm sm:text-base mb-12 max-w-md mx-auto">
            Professional yuridik maslahatni oddiy va qulay qilib berdik
          </p>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-dark-800/50 border border-dark-700/60 rounded-xl p-5 sm:p-6 hover:border-primary-500/20 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/15 transition">
                    <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
                    <p className="text-dark-300 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-xl mx-auto bg-gradient-to-br from-dark-800 to-dark-800/50 border border-dark-700/60 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.03] to-transparent pointer-events-none" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Hoziroq boshlang
            </h2>
            <p className="text-dark-300 text-sm mb-6">
              Ro&apos;yxatdan o&apos;ting va birinchi yuridik savolingizni bering
            </p>
            <Link
              href={href}
              className="inline-block bg-primary-500 hover:bg-primary-600 text-dark-900 font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30"
            >
              Bepul ro&apos;yxatdan o&apos;tish
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700/40 py-6 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-dark-900" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">Yurist AI</span>
          </div>
          <p className="text-dark-400 text-xs">&copy; 2026 Yurist AI. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
