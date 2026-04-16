import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WORKS = [
  {
    id: 1,
    title: 'Automotive Motion',
    category: 'Film',
    year: '2024',
    span: 7,
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Urban Architecture',
    category: 'Photography',
    year: '2024',
    span: 5,
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Human Perspective',
    category: 'Portrait',
    year: '2023',
    span: 5,
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Brand Identity',
    category: 'Branding',
    year: '2023',
    span: 7,
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop',
  },
]

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-10 lg:px-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-2">Selected Works</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-primary">
            Recent <em className="italic">Projects</em>
          </h2>
        </motion.div>

        <motion.a
          href="#contact"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:inline-flex text-xs tracking-[0.15em] uppercase text-muted hover:text-text-primary transition-colors duration-200"
          onClick={e => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          View All →
        </motion.a>
      </div>

      {/* Bento grid — 12 cols */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        {WORKS.map((work, i) => (
          <motion.div
            key={work.id}
            className="relative overflow-hidden rounded-2xl group cursor-pointer"
            style={{ gridColumn: `span ${work.span}` } as React.CSSProperties}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.12 }}
          >
            {/* Image */}
            <div
              className="aspect-[4/3] w-full bg-surface"
              style={{
                aspectRatio: work.span >= 7 ? '16/9' : '4/3',
              }}
            >
              <img
                src={work.img}
                alt={work.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Halftone overlay */}
            <div className="absolute inset-0 halftone opacity-[0.05] pointer-events-none" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* Label pill — animated gradient border */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="gradient-border rounded-full px-4 py-2 backdrop-blur-sm bg-bg/60">
                <span className="text-xs font-medium tracking-[0.1em] uppercase text-text-primary">
                  {work.title}
                </span>
              </div>
              <div className="gradient-border rounded-full px-3 py-2 backdrop-blur-sm bg-bg/60">
                <span className="text-xs text-muted tracking-[0.1em]">{work.category}</span>
              </div>
            </div>

            {/* Year badge */}
            <div className="absolute top-4 right-4 text-xs text-muted tracking-[0.12em]">
              {work.year}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
