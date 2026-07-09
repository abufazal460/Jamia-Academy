import { useEffect, useState } from 'react';

/**
 * useAppReady
 * Reports true once the document (and therefore critical assets like
 * fonts/images referenced by the initial paint) has finished loading.
 * Swap the body of this hook for your own readiness signal — e.g. a
 * data-fetch completion flag — if "window loaded" isn't the right bar.
 */
export default function useAppReady() {
  const [ready, setReady] = useState(
    typeof document !== 'undefined' && document.readyState === 'complete'
  );

  useEffect(() => {
    if (ready) return undefined;

    const handleLoad = () => setReady(true);
    window.addEventListener('load', handleLoad);

    // Fallback in case 'load' already fired before this effect attached.
    if (document.readyState === 'complete') setReady(true);

    return () => window.removeEventListener('load', handleLoad);
  }, [ready]);

  return ready;
}