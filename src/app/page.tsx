"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const FEATURES = [
  {
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    title: "O'zbekiston qonunlari",
    desc: "Fuqarolik, jinoyat, mehnat, oila, soliq kodekslari asosida maslahat",
  },
  {
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Jonli suhbat",
    desc: "ChatGPT uslubida qulay chat interfeys, tezkor javoblar",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Ishonchli ma'lumot",
    desc: "Aniq qonun moddalari va professional tavsiyalar",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "24/7 mavjud",
    desc: "Istalgan vaqtda, istalgan joydan huquqiy yordam oling",
  },
];

const STATS = [
  { value: "500+", label: "Qonun moddalari" },
  { value: "24/7", label: "Doim online" },
  { value: "10+", label: "Kodekslar" },
  { value: "Tekin", label: "Boshlash" },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.18 7.5 12 10.82 4.82 7.5 12 4.18zM4 8.64l7 3.5V19.5l-7-3.5V8.64zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Yurist AI</span>
          </div>
          <Link
            href={user ? "/chat" : "/auth"}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-dark-900 font-semibold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40"
          >
            {user ? "Chatga o'tish" : "Boshlash"}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            Sun&apos;iy intellekt yordamida huquqiy maslahat
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="text-white">O&apos;zbekiston</span>
            <br />
            <span className="text-gradient">huquqiy yordamchisi</span>
          </h1>

          <p className="text-lg sm:text-xl text-dark-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fuqarolik, jinoyat, mehnat, oila va boshqa huquq sohalari bo&apos;yicha
            tezkor va aniq yuridik maslahat oling — bepul va 24/7
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={user ? "/chat" : "/auth"}
              className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-dark-900 font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5"
            >
              Bepul boshlash &rarr;
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto text-dark-200 hover:text-white font-medium px-8 py-4 rounded-2xl text-lg border border-dark-600 hover:border-dark-400 transition-all"
            >
              Batafsil
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="relative max-w-3xl mx-auto mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-gradient">{s.value}</div>
              <div className="text-sm text-dark-300 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nima uchun Yurist AI?</h2>
            <p className="text-dark-300 text-lg max-w-xl mx-auto">
              Professional yuridik maslahatni oddiy va qulay qilib berdik
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6 hover:border-primary-500/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hoziroq boshlang
            </h2>
            <p className="text-dark-300 text-lg mb-8">
              Ro&apos;yxatdan o&apos;ting va birinchi yuridik savolingizni bering
            </p>
            <Link
              href={user ? "/chat" : "/auth"}
              className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-dark-900 font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40"
            >
              Bepul ro&apos;yxatdan o&apos;tish
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
              </svg>
            </div>
            <span className="font-semibold text-white">Yurist AI</span>
          </div>
          <p className="text-dark-400 text-sm">&copy; 2026 Yurist AI. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
