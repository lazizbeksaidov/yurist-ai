"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", text: "Mehnat shartnomasi qanday tuziladi?" },
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", text: "Uy-joy sotib olishda qanday hujjatlar kerak?" },
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "Iste'molchi huquqlari buzilsa nima qilish kerak?" },
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", text: "Ajrashish jarayoni qanday bo'ladi?" },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    if (inputRef.current) inputRef.current.style.height = "48px";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Server xatosi");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("Stream mavjud emas");

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const { text: t } = JSON.parse(data);
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: updated[updated.length - 1].content + t,
              };
              return updated;
            });
          } catch {}
        }
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Xatolik yuz berdi";
      setMessages((prev) => [...prev, { role: "assistant", content: `Xatolik: ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const newChat = () => { setMessages([]); setInput(""); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {messages.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100%", padding: "60px 20px 40px" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 28, boxShadow: "0 0 40px rgba(251,191,36,0.15)",
            }}>
              <svg width="30" height="30" fill="none" stroke="#0a0e1a" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Savolingizni bering</h2>
            <p style={{ fontSize: 14, color: "#64748b", textAlign: "center", marginBottom: 36, maxWidth: 380, lineHeight: 1.6 }}>
              O&apos;zbekiston qonunchiligi bo&apos;yicha istalgan savolni yozing — aniq javob oling
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, maxWidth: 520, width: "100%" }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.text}
                  onClick={() => sendMessage(s.text)}
                  style={{
                    textAlign: "left", padding: "16px 18px",
                    background: "rgba(17,24,39,0.5)", border: "1px solid rgba(36,48,73,0.6)",
                    borderRadius: 14, cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(36,48,73,0.6)"; e.currentTarget.style.transform = "none"; }}
                >
                  <svg width="18" height="18" fill="none" stroke="#fbbf24" strokeWidth={1.5} viewBox="0 0 24 24" style={{ marginBottom: 8 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                  <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>{s.text}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px" }}>
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === "user" ? (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                    <div style={{
                      maxWidth: "80%", background: "rgba(251,191,36,0.1)",
                      border: "1px solid rgba(251,191,36,0.15)",
                      borderRadius: "18px 18px 4px 18px", padding: "14px 18px",
                    }}>
                      <p style={{ color: "#f1f5f9", whiteSpace: "pre-wrap", lineHeight: 1.6, margin: 0, fontSize: 14 }}>{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                    <div style={{
                      flexShrink: 0, width: 32, height: 32, borderRadius: 10,
                      background: "linear-gradient(135deg, #fbbf24, #d97706)",
                      display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                    }}>
                      <svg width="14" height="14" fill="none" stroke="#0a0e1a" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 600, marginBottom: 6, letterSpacing: 0.5 }}>YURIST AI</div>
                      <div className="prose-chat" style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                        {loading && i === messages.length - 1 && !msg.content && (
                          <div style={{ display: "flex", gap: 6, padding: "8px 0" }}>
                            {[0, 150, 300].map((d) => (
                              <span key={d} style={{ width: 8, height: 8, background: "#fbbf24", borderRadius: "50%", animation: `bounce 1.4s ease-in-out ${d}ms infinite` }} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,14,26,0.9)", backdropFilter: "blur(16px)",
        padding: "16px 20px",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            {messages.length > 0 && (
              <button
                onClick={newChat}
                title="Yangi suhbat"
                style={{
                  flexShrink: 0, width: 48, height: 48, borderRadius: 14,
                  border: "1px solid #243049", background: "#111827",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#64748b",
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
            <div style={{ flex: 1, position: "relative" }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Yuridik savolingizni yozing..."
                rows={1}
                style={{
                  width: "100%", background: "#111827", border: "1px solid #243049",
                  borderRadius: 14, padding: "14px 52px 14px 18px",
                  color: "#fff", fontSize: 14, resize: "none",
                  outline: "none", minHeight: 48, maxHeight: 140,
                  lineHeight: 1.5, boxSizing: "border-box",
                  fontFamily: "'Inter', -apple-system, sans-serif",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#f59e0b"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#243049"; }}
                onInput={(e) => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "48px";
                  t.style.height = Math.min(t.scrollHeight, 140) + "px";
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  position: "absolute", right: 6, bottom: 6, width: 36, height: 36,
                  borderRadius: 10, border: "none", cursor: "pointer",
                  background: (!input.trim() || loading) ? "#1a2236" : "#f59e0b",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: (!input.trim() || loading) ? "none" : "0 2px 12px rgba(245,158,11,0.2)",
                }}
              >
                {loading ? (
                  <span style={{ width: 14, height: 14, border: "2px solid #0a0e1a", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", display: "block" }} />
                ) : (
                  <svg width="16" height="16" fill="none" stroke={(!input.trim()) ? "#475569" : "#0a0e1a"} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: "#334155", marginTop: 10 }}>
            Yurist AI maslahat beradi, lekin professional yurist o&apos;rnini bosmaydi
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%,80%,100% { transform: scale(0) } 40% { transform: scale(1) } }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
