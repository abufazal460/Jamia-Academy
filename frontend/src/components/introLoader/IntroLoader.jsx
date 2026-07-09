import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Letter from './Letter';
import Shine from './Shine';
import { WORD_ONE, WORD_TWO, buildExplosionVector, LUXURY_EASE } from './animationConfig';
import './introLoader.css';

const STORAGE_KEY = 'jamia:intro-played';

// Timeline constants (ms) — drive the orchestration without setTimeout drift
// by anchoring everything to onAnimationComplete callbacks where possible,
// and to explicit waits only where the spec calls for a fixed pause.
const LOGO_SETTLE_DELAY = 1650; // after last letter's delay+duration roughly resolves
const POST_SHINE_PAUSE = 500; // 400–600ms per spec
const EXPLOSION_DURATION = 620; // 500–700ms per spec

/**
 * IntroLoader
 * Orchestrates: letters in -> logo settle -> shine -> pause -> explode -> shutter exit.
 * Unmounts permanently once played. Waits for BOTH the timeline to finish
 * AND the `appReady` signal before exiting.
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

  const [stage, setStage] = useState(
    alreadyPlayed ? 'done' : 'entering'
  ); // entering -> settled -> shining -> pausing -> exploding -> exiting -> done
  const [timelineComplete, setTimelineComplete] = useState(alreadyPlayed);
  const timers = useRef([]);

  const wordOneLetters = useMemo(
    () => WORD_ONE.map((l, i) => ({ ...l, key: `w1-${i}` })),
    []
  );
  const wordTwoLetters = useMemo(
    () => WORD_TWO.map((l, i) => ({ ...l, key: `w2-${i}` })),
    []
  );

  const explosionVectors = useMemo(() => {
    const all = [...wordOneLetters, ...wordTwoLetters];
    return all.map((_, i) => buildExplosionVector(i));
  }, [wordOneLetters, wordTwoLetters]);

  const clearAllTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    if (alreadyPlayed) return undefined;

    if (prefersReducedMotion) {
      // Simple fade path: skip choreography entirely.
      const t = setTimeout(() => setStage('shutter-ready'), 400);
      timers.current.push(t);
      return clearAllTimers;
    }

    // Letters arrive, then settle as a whole logo.
    const t1 = setTimeout(() => setStage('settled'), LOGO_SETTLE_DELAY);
    timers.current.push(t1);
    return clearAllTimers;
  }, [alreadyPlayed, prefersReducedMotion]);

  useEffect(() => {
    if (stage !== 'settled') return undefined;
    // Kick off the shine shortly after the logo-level settle fade/blur/scale resolves.
    const t = setTimeout(() => setStage('shining'), 550);
    timers.current.push(t);
    return clearAllTimers;
  }, [stage]);

  const handleShineComplete = () => {
    setStage('pausing');
    const t = setTimeout(() => setStage('exploding'), POST_SHINE_PAUSE);
    timers.current.push(t);
  };

  useEffect(() => {
    if (stage !== 'exploding') return undefined;
    const t = setTimeout(() => setStage('shutter-ready'), EXPLOSION_DURATION);
    timers.current.push(t);
    return clearAllTimers;
  }, [stage]);

  useEffect(() => {
    if (stage === 'shutter-ready') {
      setTimelineComplete(true);
    }
  }, [stage]);

  // Only exit once BOTH the timeline has finished AND the app has signaled ready.
  useEffect(() => {
    if (timelineComplete && appReady && stage !== 'exiting' && stage !== 'done') {
      setStage('exiting');
    }
  }, [timelineComplete, appReady, stage]);

  const handleExitComplete = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* sessionStorage unavailable — non-fatal, loader will just replay */
    }
    setStage('done');
  };

  useEffect(() => clearAllTimers, []);

  const isExploding = stage === 'exploding' || stage === 'shutter-ready' || stage === 'exiting';
  const logoSettled = stage !== 'entering';

  return (
    <>
      {/* Website renders underneath immediately — the overlay only reveals it. */}
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
                    duration={l.duration}
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
                    duration={l.duration}
                    phase={isExploding ? 'exploding' : 'enter'}
                    explosionVector={explosionVectors[wordOneLetters.length + i]}
                    reducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>

              <div className="intro-shine-mask" aria-hidden="true">
                <Shine
                  play={stage === 'shining' || stage === 'pausing' || isExploding}
                  onComplete={handleShineComplete}
                  reducedMotion={prefersReducedMotion}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}