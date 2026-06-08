import { useState, useEffect } from 'react'

/**
 * Debounce a value by `delay` ms.
 * Useful for search inputs, API call throttling, etc.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 400)
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
