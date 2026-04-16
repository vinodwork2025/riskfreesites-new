import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useHLS } from '../hooks/useHLS'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

interface HeroProps {
  ready: boolean
}

export default function Hero({ ready }: HeroProps) {
  const videoRef = useHLS(HLS_SRC)
  const nameRef  = useRef<HTMLHeadingElement>(null)
  const blurRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!ready) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (nameRef.current) {
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      )
    }

    if (blurRefs.current.length) {
      tl.fromTo(
        blurRefs.current,
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        '-=0.8'
      )
    }
  }, [ready])

  const addBlurRef = (el: HTMLElement | null) => {
    if (el && !blurRefs.current.includes(el)) blurRefs.current.push(el)
  }

  function scrollDown() {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-bg/60" />

      {/* Halftone overlay */}
      <div className="absolute inset-0 halftone opacity-[0.06] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p
          ref={addBlurRef}
          className="blur-in text-xs tracking-[0.35em] uppercase text-muted mb-6"
        >
          Creative Director & Visual Storyteller
        </p>

        <h1
          ref={nameRef}
          className="name-reveal font-display text-5xl md:text-7xl lg:text-8xl xl:text-[96px] text-text-primary leading-[0.95] mb-6"
        >
          Michael
          <br />
          <em className="italic">Smith</em>
        </h1>

        <p
          ref={addBlurRef}
          className="blur-in text-sm md:text-base text-muted max-w-md leading-relaxed mb-10"
        >
          Crafting visual narratives that bridge the space between
          imagination and reality.
        </p>

        {/* CTA buttons */}
        <div ref={addBlurRef} className="blur-in flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
            className="gradient-border rounded-full px-7 py-3 text-xs font-medium tracking-[0.12em] uppercase text-text-primary hover:bg-surface transition-colors duration-300"
          >
            View Work
          </button>
          <a
            href="mailto:hello@michaelsmith.com"
            className="rounded-full px-7 py-3 text-xs font-medium tracking-[0.12em] uppercase text-bg bg-text-primary hover:opacity-90 transition-opacity duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-text-primary transition-colors duration-300"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-muted/60 to-transparent animate-[scroll-down_1.4s_ease-in-out_infinite]" />
      </button>
    </section>
  )
}
