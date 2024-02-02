import { RefObject, useEffect, useState } from 'react'

export const useOnScreen = (ref: RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { rootMargin: '50px', threshold: 0 }
    )

    const currentElement = ref.current

    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [ref])

  return isVisible
}
