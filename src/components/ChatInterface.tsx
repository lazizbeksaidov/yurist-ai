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
  { icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", text: "Soliq to'lash tartibi qanday?" },
  { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", text: "Mehnat ta'tili necha kun?" },
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

    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = "52px";

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

  const newChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          /* Welcome screen */
          <div className="flex flex-col items-center justify-center min-h-full px-4 py-10">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-2xl glow-amber mb-8">
              <svg className="w-10 h-10 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.18 7.5 12 10.82 4.82 7.5 12 4.18zM4 8.64l7 3.5V19.5l-7-3.5V8.64zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Savolingizni bering</h2>
            <p className="text-dark-300 text-center mb-10 max-w-md">
              O&apos;zbekiston qonunchiligi bo&apos;yicha istalgan savolni yozing — aniq javob oling
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl w-full">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.text}
                  onClick={() => sendMessage(s.text)}
                  className="group text-left p-4 glass rounded-2xl hover:border-primary-500/30 transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 text-primary-400 mb-2 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                  </svg>
                  <p className="text-sm text-dark-200 group-hover:text-white transition leading-relaxed">{s.text}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat messages */
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
            {messages.map((msg, i) => (
              <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 30}ms` }}>
                {msg.role === "user" ? (
                  /* User message */
                  <div className="flex justify-end mb-4">
                    <div className="max-w-[85%] bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/20 rounded-2xl rounded-tr-md px-5 py-3.5">
                      <p className="text-dark-50 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  /* AI message */
                  <div className="flex gap-3 mb-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mt-1 shadow-lg shadow-primary-500/20">
                      <svg className="w-4 h-4 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-primary-400 font-medium mb-1.5">Yurist AI</div>
                      <div className="prose-chat text-dark-100 text-[15px]">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                        {loading && i === messages.length - 1 && !msg.content && (
                          <div className="flex gap-1.5 py-2">
                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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

      {/* Input bar */}
      <div className="border-t border-dark-700/50 bg-dark-900/90 backdrop-blur-xl px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end">
            {messages.length > 0 && (
              <button
                onClick={newChat}
                title="Yangi suhbat"
                className="flex-shrink-0 w-[52px] h-[52px] rounded-2xl border border-dark-600 hover:border-dark-400 bg-dark-800 hover:bg-dark-700 flex items-center justify-center transition text-dark-300 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Yuridik savolingizni yozing..."
                rows={1}
                className="w-full bg-dark-800 border border-dark-600 focus:border-primary-500 rounded-2xl pl-5 pr-14 py-3.5 text-white placeholder-dark-400 resize-none focus:outline-none focus:ring-1 focus:ring-primary-500/50 transition text-[15px] leading-relaxed"
                style={{ minHeight: "52px", maxHeight: "140px" }}
                onInput={(e) => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "52px";
                  t.style.height = Math.min(t.scrollHeight, 140) + "px";
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="absolute right-2 bottom-2 w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-dark-600 disabled:to-dark-600 flex items-center justify-center transition shadow-lg shadow-primary-500/20 disabled:shadow-none"
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full" />
                ) : (
                  <svg className="w-4 h-4 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <p className="text-center text-[11px] text-dark-500 mt-3">
            Yurist AI maslahat beradi, lekin professional yurist o&apos;rnini bosmaydi
          </p>
        </div>
      </div>
    </div>
  );
}
