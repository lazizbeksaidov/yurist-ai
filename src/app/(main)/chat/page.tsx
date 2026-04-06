"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { signOut, auth } from "@/lib/firebase";
import ChatInterface from "@/components/ChatInterface";

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen flex flex-col bg-dark-900">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 glass border-b border-dark-700/50 z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white leading-tight">Yurist AI</h1>
            <p className="text-[11px] text-dark-400 -mt-0.5">Huquqiy yordamchi</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-dark-700 transition"
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full ring-2 ring-dark-600" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-sm font-bold text-dark-900">
                {(user.displayName?.[0] || user.phoneNumber?.[4] || "U").toUpperCase()}
              </div>
            )}
            <span className="hidden sm:block text-sm text-dark-200 max-w-[120px] truncate">
              {user.displayName || user.phoneNumber}
            </span>
            <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl p-2 shadow-2xl z-20 animate-fade-up">
                <div className="px-3 py-2 border-b border-dark-600/50 mb-1">
                  <p className="text-sm text-white font-medium truncate">{user.displayName || "Foydalanuvchi"}</p>
                  <p className="text-xs text-dark-400 truncate">{user.email || user.phoneNumber}</p>
                </div>
                <button
                  onClick={() => { signOut(auth); setMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Chiqish
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
