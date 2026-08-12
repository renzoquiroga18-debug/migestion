import { useEffect, useRef, useState, type FormEvent } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { getBotResponse } from '../../lib/chatbot'
import type { ChatMessage } from '../../types'

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'bot',
  text: '¡Hola! Soy el asistente de MiGestion. Preguntame por ejemplo "¿cuánto stock tengo de Arroz?" o "¿qué productos están en alerta?".',
  timestamp: Date.now(),
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function handleSend(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: 'user', text, timestamp: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      const reply = getBotResponse(text)
      setMessages((prev) => [
        ...prev,
        { id: `b${Date.now()}`, role: 'bot', text: reply, timestamp: Date.now() },
      ])
    }, 350)
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 bg-brand-600 px-4 py-3 text-white">
            <Sparkles size={18} />
            <div className="flex-1">
              <p className="text-sm font-semibold">Asistente MiGestion</p>
              <p className="text-xs text-brand-100">Consulta tu stock al instante</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 hover:bg-white/10 cursor-pointer"
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4 dark:bg-slate-950">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-brand-600 text-white'
                      : 'rounded-bl-sm bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-slate-200 p-2.5 dark:border-slate-800"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu consulta..."
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            <button
              type="submit"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700 cursor-pointer"
              aria-label="Enviar"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-transform hover:scale-105 cursor-pointer sm:right-6"
        aria-label="Abrir chat de ayuda"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  )
}
