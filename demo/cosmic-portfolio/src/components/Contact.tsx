import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHLS } from '../hooks/useHLS'

gsap.registerPlugin(ScrollTrigger)

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const MARQUEE_TEXT = 'BUILDING THE FUTURE • '
const MARQUEE_REPEAT = 10

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance',   href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Vimeo',     href: '#' },
]

export default function Contact() {
  const videoRef   = useHLS(HLS_SRC)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  /* ── GSAP infinite marquee ── */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2
    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 22,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
      },
    })

    return () => { tween.kill() }
  }, [])

  return (
    <section id="contact" className="border-t border-stroke">
      {/* Video strip — flipped vertically */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover scale-y-[-1]"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-bg/70" />
        <div className="absolute inset-0 halftone opacity-[0.05] pointer-events-none" />
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="overflow-hidden border-y border-stroke py-4 bg-surface/40"
      >
        <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
          {Array.from({ length: MARQUEE_REPEAT * 2 }).map((_, i) => (
            <span
              key={i}
              className="text-xs md:text-sm tracking-[0.35em] uppercase text-muted px-2 flex-shrink-0"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="px-6 md:px-10 lg:px-16 py-24 md:py-32 flex flex-col items-center text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted mb-4">Let's Work Together</p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-text-primary mb-10 max-w-xl leading-[1.0]">
          Start a <em className="italic">project</em>
        </h2>
        <a
          href="mailto:hello@michaelsmith.com"
          className="gradient-border rounded-full px-10 py-4 text-sm font-medium tracking-[0.15em] uppercase text-text-primary hover:bg-surface transition-colors duration-300"
        >
          hello@michaelsmith.com
        </a>
      </div>

      {/* Footer bar */}
      <div className="border-t border-stroke px-6 md:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Availability */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs text-muted tracking-[0.12em]">Available for projects</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted tracking-[0.1em]">
          © {new Date().getFullYear()} Michael Smith. All rights reserved.
        </p>

        {/* Social links */}
        <nav className="flex items-center gap-6">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              className="text-xs tracking-[0.12em] uppercase text-muted hover:text-text-primary transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
