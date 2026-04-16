import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const WORDS = ['Design', 'Create', 'Inspire']
const DURATION_MS = 2700

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount]         = useState(0)
  const [wordIdx, setWordIdx]     = useState(0)
  const startTimeRef              = useRef<number | null>(null)
  const rafRef                    = useRef<number | null>(null)
  const completedRef              = useRef(false)

  /* ── Counter (requestAnimationFrame, ease-out cubic) ── */
  useEffect(() => {
    const tick = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts
      const progress  = Math.min((ts - startTimeRef.current) / DURATION_MS, 1)
      const eased     = 1 - Math.pow(1 - progress, 3)
      const current   = Math.floor(eased * 100)
      setCount(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCount(100)
        if (!completedRef.current) {
          completedRef.current = true
          setTimeout(onComplete, 400)
        }
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [onComplete])

  /* ── Word cycling every 900 ms ── */
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Top-left label */}
      <motion.p
        className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Portfolio
      </motion.p>

      {/* Center rotating word */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIdx}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {WORDS[wordIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <motion.div
        className="absolute bottom-12 right-8 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none select-none pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {String(count).padStart(3, '0')}
      </motion.div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <motion.div
          className="h-full accent-gradient origin-left"
          style={{
            scaleX: count / 100,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </motion.div>
  )
}
