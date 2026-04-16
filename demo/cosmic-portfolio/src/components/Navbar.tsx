import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Work',         href: '#work'         },
  { label: 'Journal',      href: '#journal'      },
  { label: 'Explorations', href: '#explorations' },
  { label: 'Contact',      href: '#contact'      },
]

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-16 h-[68px] transition-all duration-500 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-stroke/60'
          : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col leading-none group"
      >
        <span className="text-sm font-semibold tracking-[0.12em] text-text-primary uppercase">
          Michael Smith
        </span>
        <span className="text-[10px] text-muted tracking-[0.22em] uppercase mt-0.5">
          Creative Director
        </span>
      </button>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8">
        {LINKS.map(link => (
          <li key={link.href}>
            <button
              onClick={() => scrollTo(link.href)}
              className="text-xs font-medium tracking-[0.14em] uppercase text-muted hover:text-text-primary transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px accent-gradient group-hover:w-full transition-all duration-300" />
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="mailto:hello@michaelsmith.com"
        className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium tracking-[0.1em] uppercase text-text-primary border border-stroke hover:border-[#89AACC] transition-colors duration-300 gradient-border"
      >
        Hire Me
      </a>

      {/* Mobile hamburger placeholder */}
      <button className="md:hidden flex flex-col gap-[5px] p-1" aria-label="Menu">
        <span className="block w-5 h-px bg-text-primary" />
        <span className="block w-5 h-px bg-text-primary" />
      </button>
    </motion.nav>
  )
}
