import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true, invalidateOnRefresh: true },
        })
      })

      gsap.utils.toArray('[data-reveal-stagger], .gs-stagger').forEach((container) => {
        const items = container.children
        if (!items.length) return
        gsap.from(items, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.07,
          immediateRender: false,
          scrollTrigger: { trigger: container, start: 'top 90%', once: true, invalidateOnRefresh: true },
        })
      })

      ScrollTrigger.refresh()
    })

    const onLoad = () => ScrollTrigger.refresh()
    const t = setTimeout(() => ScrollTrigger.refresh(), 700)
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(t)
      ctx.revert()
    }
  }, [pathname, search])

  return null
}
