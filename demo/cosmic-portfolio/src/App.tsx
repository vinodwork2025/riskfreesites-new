import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SelectedWorks from './components/SelectedWorks'
import Journal from './components/Journal'
import Explorations from './components/Explorations'
import Stats from './components/Stats'
import Contact from './components/Contact'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="bg-bg text-text-primary font-body overflow-x-hidden">
        <Navbar />
        <Hero ready={!isLoading} />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
        <Contact />
      </div>
    </>
  )
}
