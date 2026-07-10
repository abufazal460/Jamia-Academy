import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Letter from './Letter';
import Shine from './Shine';
import { WORD_ONE, WORD_TWO, buildExplosionVector, LUXURY_EASE } from './animationConfig';
import './introLoader.css';

const STORAGE_KEY = 'jamia:intro-played';
const LOGO_SETTLE_DELAY = 2000; // letters finish arriving (~1.8-2s with new config)
const EXPLOSION_DURATION = 650;

/**
 * IntroLoader
 * entering -> settled -> shining(loop, waits on appReady) -> exploding -> exiting -> done
 * Blast NEVER fires until appReady is true — enforced by gating exploding
 * transition strictly behind the ready-check effect below.
 */
export default function IntroLoader({ appReady = true, children }) {
  const prefersReducedMotion = useReducedMotion();
  const [alreadyPlayed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  const [stage, setStage] = useState(alreadyPlayed ? 'done' : 'entering');
  const timers = useRef([]);
  const mounted = useRef(true);

  const wordOneLetters = useMemo(() => WORD_ONE.map((l, i) => ({ ...l, key: `w1-${i}` })), []);
  const wordTwoLetters = useMemo(() => WORD_TWO.map((l, i) => ({ ...l, key: `w2-${i}` })), []);

  const explosionVectors = useMemo(() => {
    const all = [...wordOneLetters, ...wordTwoLetters];
    return all.map((_, i) => buildExplosionVector(i));
  }, [wordOneLetters, wordTwoLetters]);

  const safeSetStage = (next) => {
    if (mounted.current) setStage(next);
  };

  const clearAllTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearAllTimers();
    };
  }, []);

  // entering -> settled -> shining
  useEffect(() => {
    if (alreadyPlayed) return undefined;

    if (prefersReducedMotion) {
      const t = setTimeout(() => safeSetStage('exiting-check'), 400);
      timers.current.push(t);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => safeSetStage('settled'), LOGO_SETTLE_DELAY);
    timers.current.push(t1);
    return () => clearTimeout(t1);
  }, [alreadyPlayed, prefersReducedMotion]);

  useEffect(() => {
    if (stage !== 'settled') return undefined;
    const t = setTimeout(() => safeSetStage('shining'), 400);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [stage]);

  // Gate: blast can ONLY start from 'shining' (or reduced-motion's check stage)
  // AND only once appReady flips true. No fixed timer substitutes for this check.
  useEffect(() => {
    if (!appReady) return undefined;
    if (stage === 'shining') {
      safeSetStage('exploding');
    } else if (stage === 'exiting-check') {
      safeSetStage('shutter-ready');
    }
  }, [appReady, stage]);

  useEffect(() => {
    if (stage !== 'exploding') return undefined;
    const t = setTimeout(() => safeSetStage('shutter-ready'), EXPLOSION_DURATION);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage === 'shutter-ready') {
      safeSetStage('exiting');
    }
  }, [stage]);

  const handleExitComplete = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* non-fatal */
    }
    safeSetStage('done');
  };

  const isExploding = stage === 'exploding' || stage === 'shutter-ready' || stage === 'exiting';
  const logoSettled = stage !== 'entering';
  const isShining = stage === 'shining'; // shine loops only while genuinely waiting

  return (
    <>
      {children}

      <AnimatePresence onExitComplete={handleExitComplete}>
        {stage !== 'done' && (
          <motion.div
            className="intro-overlay"
            role="status"
            aria-live="polite"
            aria-label="Loading Jamia Academy"
            initial={{ y: 0 }}
            animate={{ y: stage === 'exiting' ? '-100%' : 0 }}
            transition={{ duration: 0.95, ease: LUXURY_EASE }}
          >
            <motion.div
              className="intro-logo"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: logoSettled ? 1 : undefined,
                      filter: logoSettled ? 'blur(0px)' : undefined,
                      scale: logoSettled ? 1 : undefined,
                    }
              }
              initial={prefersReducedMotion ? undefined : { opacity: 0.001, filter: 'blur(8px)', scale: 0.98 }}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
            >
              <div className="intro-word intro-word--one">
                {wordOneLetters.map((l, i) => (
                  <Letter
                    key={l.key}
                    char={l.char}
                    from={l.from}
                    blurFrom={l.blurFrom}
                    delay={l.delay}
                    phase={isExploding ? 'exploding' : 'enter'}
                    explosionVector={explosionVectors[i]}
                    reducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
              <div className="intro-word intro-word--two">
                {wordTwoLetters.map((l, i) => (
                  <Letter
                    key={l.key}
                    char={l.char}
                    from={l.from}
                    blurFrom={l.blurFrom}
                    delay={l.delay}
                    phase={isExploding ? 'exploding' : 'enter'}
                    explosionVector={explosionVectors[wordOneLetters.length + i]}
                    reducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>

              <div className="intro-shine-mask" aria-hidden="true">
                <Shine looping={isShining} reducedMotion={prefersReducedMotion} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}