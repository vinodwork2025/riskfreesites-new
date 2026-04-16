import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export function useHLS(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls({ startLevel: -1, autoStartLoad: true })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {/* autoplay blocked — no-op */})
      })
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS (Safari)
      video.src = src
      video.play().catch(() => {})
    }
  }, [src])

  return videoRef
}
