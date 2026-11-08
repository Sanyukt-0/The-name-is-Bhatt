import { useEffect, useRef } from 'react'
import gsap from '../lib/gsap'
import { allowedElem } from '../data/allowedCursor'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const innerCursorRef = useRef(null)

  useEffect(() => {
    // Disable on touch devices to prevent lag and tap blocking
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const handleMouseMove = e => {
      const target = e.target
      const isAllowed = target && target.closest ? target.closest(allowedElem.join(',')) : false

      if (isAllowed) {
        gsap.to(cursorRef.current, {
          scale: 0,
          duration: 0.35,
          ease: 'power3.out'
        })
        gsap.to(innerCursorRef.current, {
          scale: 6,
          duration: 0.25,
          ease: 'power3.out'
        })
      } else {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'expo.out'
        })
        gsap.to(innerCursorRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'expo.out'
        })
      }

      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'sine.out'
      })

      gsap.to(innerCursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        ease: 'none'
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className='outer-cursor' aria-hidden='true'></div>
      <div ref={innerCursorRef} className='inner-cursor' aria-hidden='true'></div>
    </>
  )
}

export default CustomCursor

