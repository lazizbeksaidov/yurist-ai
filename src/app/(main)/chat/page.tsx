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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0e1a" }}>
        <div style={{ width: 32, height: 32, border: "2px solid #fbbf24", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0e1a", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <header style={{
        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 20px", background: "rgba(10,14,26,0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)", zIndex: 10,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #fbbf24, #d97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" fill="none" stroke="#0a0e1a" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Yurist AI</div>
            <div style={{ fontSize: 11, color: "#475569" }}>Huquqiy yordamchi</div>
          </div>
        </Link>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "6px 12px",
              borderRadius: 12, border: "none", background: "transparent", cursor: "pointer",
            }}
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt="" style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #243049" }} />
            ) : (
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "linear-gradient(135deg, #f59e0b, #b45309)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#0a0e1a",
              }}>
                {(user.displayName?.[0] || user.phoneNumber?.[4] || "U").toUpperCase()}
              </div>
            )}
            <span style={{ fontSize: 13, color: "#cbd5e1", maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.displayName || user.phoneNumber}
            </span>
            <svg width="14" height="14" fill="none" stroke="#475569" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setMenuOpen(false)} />
              <div style={{
                position: "absolute", right: 0, top: "100%", marginTop: 8, width: 220,
                background: "rgba(17,24,39,0.95)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 8,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)", zIndex: 20,
              }}>
                <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 4 }}>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{user.displayName || "Foydalanuvchi"}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{user.email || user.phoneNumber}</div>
                </div>
                <button
                  onClick={() => { signOut(auth); setMenuOpen(false); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px", borderRadius: 10, border: "none",
                    background: "transparent", color: "#f87171", fontSize: 13,
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <main style={{ flex: 1, overflow: "hidden" }}>
        <ChatInterface />
      </main>
    </div>
  );
}
