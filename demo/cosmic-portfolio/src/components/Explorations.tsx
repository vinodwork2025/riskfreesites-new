import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    id: 1,
    title: 'Chromatic Drift',
    sub: 'Color study in motion',
    img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Negative Space',
    sub: 'Form through absence',
    img: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Peripheral Vision',
    sub: 'Edge-aware composition',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Signal & Noise',
    sub: 'Texture as language',
    img: 'https://images.unsplash.com/photo-1533158628620-7e4f8f9b8a6f?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Liminal Hours',
    sub: 'Light between states',
    img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Depth Field',
    sub: 'Focus as narrative',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&auto=format&fit=crop',
  },
]

export default function Explorations() {
  const sectionRef  = useRef<HTMLElement>(null)
  const pinRef      = useRef<HTMLDivElement>(null)
  const col1Ref     = useRef<HTMLDivElement>(null)
  const col2Ref     = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<null | typeof ITEMS[0]>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      if (!section || !col1Ref.current || !col2Ref.current) return

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        pinSpacing: false,
      })

      // Col 1 scrolls up, col 2 scrolls down for parallax
      gsap.to(col1Ref.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to(col2Ref.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const left  = ITEMS.filter((_, i) => i % 2 === 0)
  const right = ITEMS.filter((_, i) => i % 2 !== 0)

  return (
    <>
      <section
        id="explorations"
        ref={sectionRef}
        className="relative min-h-[300vh] border-t border-stroke"
      >
        {/* Sticky panel */}
        <div
          ref={pinRef}
          className="sticky top-0 h-screen overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 md:px-10 lg:px-16 pt-20 pb-8 flex-shrink-0">
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-2">Explorations</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-primary">
              Visual <em className="italic">Experiments</em>
            </h2>
          </div>

          {/* Two-column grid */}
          <div className="flex-1 overflow-hidden px-6 md:px-10 lg:px-16 pb-8">
            <div className="grid grid-cols-2 gap-5 h-full">
              {/* Left column */}
              <div ref={col1Ref} className="flex flex-col gap-5">
                {left.map(item => (
                  <ExploreCard key={item.id} item={item} onClick={() => setLightbox(item)} />
                ))}
              </div>

              {/* Right column — offset down */}
              <div ref={col2Ref} className="flex flex-col gap-5 mt-12">
                {right.map(item => (
                  <ExploreCard key={item.id} item={item} onClick={() => setLightbox(item)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9000] bg-bg/95 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.img}
                alt={lightbox.title}
                className="w-full rounded-2xl"
              />
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <p className="text-base font-medium text-text-primary">{lightbox.title}</p>
                  <p className="text-xs text-muted mt-0.5">{lightbox.sub}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-xs tracking-[0.2em] uppercase text-muted hover:text-text-primary transition-colors duration-200"
                >
                  Close ×
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ExploreCard({
  item,
  onClick,
}: {
  item: typeof ITEMS[0]
  onClick: () => void
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/3]">
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-xs font-medium text-text-primary">{item.title}</p>
        <p className="text-[10px] text-muted mt-0.5">{item.sub}</p>
      </div>
    </div>
  )
}
