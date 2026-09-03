import { useEffect, useState } from 'react';

export default function useAppReady() {
  const [ready, setReady] = useState(
    typeof document !== 'undefined' && document.readyState === 'complete'
  );

  useEffect(() => {
    if (ready) return undefined;

    const handleLoad = () => setReady(true);
    window.addEventListener('load', handleLoad);

    if (document.readyState === 'complete') setReady(true);

    return () => window.removeEventListener('load', handleLoad);
  }, [ready]);

  return ready;
}