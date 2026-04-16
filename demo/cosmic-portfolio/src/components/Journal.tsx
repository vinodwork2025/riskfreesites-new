import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const POSTS = [
  {
    id: 1,
    title: 'The Language of Light: How Cinematographers Speak Through Shadow',
    category: 'Film Theory',
    readTime: '6 min read',
    date: 'Apr 2024',
    img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Brutalism in the Digital Age: Architecture as User Interface',
    category: 'Design',
    readTime: '4 min read',
    date: 'Mar 2024',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'On Restraint: Why Less Color Creates More Emotion',
    category: 'Color Theory',
    readTime: '5 min read',
    date: 'Feb 2024',
    img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Movement as Narrative: What Slow Motion Really Tells Us',
    category: 'Motion',
    readTime: '7 min read',
    date: 'Jan 2024',
    img: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=400&q=80&auto=format&fit=crop',
  },
]

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section id="journal" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-10 lg:px-16 border-t border-stroke">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-muted mb-2">Journal</p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-primary">
          Thoughts & <em className="italic">Perspectives</em>
        </h2>
      </motion.div>

      {/* Pill entries */}
      <div className="flex flex-col gap-4">
        {POSTS.map((post, i) => (
          <motion.article
            key={post.id}
            className="group flex items-center gap-6 rounded-[40px] border border-stroke hover:border-[#89AACC]/40 px-6 py-5 transition-colors duration-300 cursor-pointer bg-surface/30 hover:bg-surface/60"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
          >
            {/* Thumbnail */}
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-surface">
              <img
                src={post.img}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-1">
                {post.category}
              </p>
              <h3 className="text-sm md:text-base font-medium text-text-primary leading-snug line-clamp-1 group-hover:text-text-primary transition-colors duration-200">
                {post.title}
              </h3>
            </div>

            {/* Meta */}
            <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0 text-right">
              <span className="text-xs text-muted">{post.date}</span>
              <span className="text-[10px] tracking-[0.12em] uppercase text-muted/60">
                {post.readTime}
              </span>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:border-[#89AACC]/40 group-hover:text-text-primary transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
