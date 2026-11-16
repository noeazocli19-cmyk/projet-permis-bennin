import * as React from "react"

const MOBILE_BREAKPOINT = 768

function subscribe(callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

/**
 * Returns whether the viewport is below the mobile breakpoint (768px).
 *
 * Uses `useSyncExternalStore` so there is no `setState` inside an effect
 * (avoids the `react-hooks/set-state-in-effect` lint rule and cascading
 * renders). SSR-safe: returns `false` on the server, reconciles on the client.
 */
export function useIsMobile() {
  const isMobile = React.useSyncExternalStore(
    subscribe,
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false,
  )
  return isMobile
}
