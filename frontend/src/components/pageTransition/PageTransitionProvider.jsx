import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransitionContext from "./TransitionContext";
import PageTransition from "./PageTransition";
import { TRANSITION_TIMING } from "./transitionPaths";

const wait = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export default function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const transitionRef = useRef(null);
  const lockRef = useRef(false);
  const pendingTargetRef = useRef(null);
  const isMountedRef = useRef(true);
  const initialMountRef = useRef(true);
  const previousOverflowRef = useRef("");

  const [isTransitioning, setIsTransitioning] = useState(false);

  useLayoutEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const lockScroll = useCallback(() => {
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = previousOverflowRef.current || "";
  }, []);

 const finishTransition = useCallback(async () => {
    if (!transitionRef.current) {
      // Even without the SVG ref, still reset scroll so the new page
      // never opens mid-way down (e.g. where the Footer used to be).
      window.scrollTo(0, 0);
      lockRef.current = false;
      pendingTargetRef.current = null;
      unlockScroll();
      if (isMountedRef.current) setIsTransitioning(false);
      return;
    }

    try {
      // Screen is fully covered right now — safe to snap scroll to top
      // without the user ever seeing the jump.
      window.scrollTo(0, 0);
      // Let the new page paint for a beat before uncovering — avoids
      // revealing a half-rendered frame and feels far smoother.
      await wait(TRANSITION_TIMING.holdDuration);
      await transitionRef.current.playReveal();
    } catch {
      // no-op — still clean up below
    } finally {
      lockRef.current = false;
      pendingTargetRef.current = null;
      unlockScroll();
      if (isMountedRef.current) setIsTransitioning(false);
    }
  }, [unlockScroll]);

  const navigateWithTransition = useCallback(
    async (to, options = {}) => {
      if (!to) return;
      if (lockRef.current) return;
      if (to === location.pathname) return;

      lockRef.current = true;
      pendingTargetRef.current = to;
      if (isMountedRef.current) setIsTransitioning(true);
      lockScroll();

      try {
        if (transitionRef.current) {
          await transitionRef.current.playCover();
          // Hold at full coverage briefly before navigating — this is
          // what makes the cut feel intentional instead of instant.
          await wait(TRANSITION_TIMING.holdDuration);
        }
      } catch {
        // Proceed with navigation even if the animation fails.
      }

      if (!isMountedRef.current) return;

      navigate(to, options);
    },
    [navigate, location.pathname, lockScroll]
  );

  const onRouteMounted = useCallback(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }

    if (!lockRef.current) {
      // Route changed outside of TransitionLink (native Link, direct
      // useNavigate(), or browser back/forward). We still animate so
      // it never looks broken, but if you're seeing "page loads then
      // animation plays", THIS branch is firing — meaning something
      // is navigating without going through navigateWithTransition.
      // Audit your Links/useNavigate() calls (see Step 1 above).
     if (transitionRef.current) {
        transitionRef.current
          .playCover()
          .then(() => {
            window.scrollTo(0, 0);
            return wait(TRANSITION_TIMING.holdDuration);
          })
          .then(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                transitionRef.current && transitionRef.current.playReveal();
              });
            });
          })
          .catch(() => {});
      }
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        finishTransition();
      });
    });
  }, [finishTransition]);

  const value = useMemo(
    () => ({
      isTransitioning,
      navigateWithTransition,
      onRouteMounted,
    }),
    [isTransitioning, navigateWithTransition, onRouteMounted]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <PageTransition ref={transitionRef} />
    </TransitionContext.Provider>
  );
}