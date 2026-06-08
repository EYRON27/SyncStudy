import { useEffect } from 'react'

/**
 * Calls `callback` when a click occurs outside of `ref`.
 * Useful for dismissing dropdowns, modals, etc.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, callback])
}
