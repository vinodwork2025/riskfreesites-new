import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: '20+', label: 'Years Experience', desc: 'Crafting visuals that move people and brands forward.' },
  { value: '95+', label: 'Projects Done',    desc: 'From editorial campaigns to feature film direction.' },
  { value: '200%', label: 'Satisfied Clients', desc: 'Going beyond what was asked, every single time.' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-15%' })

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-10 lg:px-16 border-t border-stroke">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stroke rounded-2xl overflow-hidden">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-bg px-8 md:px-10 py-12 md:py-16 flex flex-col gap-4"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.15 }}
          >
            <span className="font-display text-5xl md:text-6xl lg:text-7xl text-text-primary leading-none">
              {stat.value}
            </span>
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">{stat.label}</p>
              <p className="text-xs text-muted leading-relaxed">{stat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
