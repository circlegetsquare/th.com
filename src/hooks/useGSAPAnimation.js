import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const useGSAPAnimation = (animationCallback, dependencies = []) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const ctx = gsap.context(() => {
        animationCallback(ref.current)
      }, ref)

      return () => ctx.revert()
    }
  }, dependencies)

  return ref
}