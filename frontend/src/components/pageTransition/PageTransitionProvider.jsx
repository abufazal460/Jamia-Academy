import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransitionContext from "./TransitionContext";
import PageTransition from "./PageTransition";

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

  const finishTransition = useCallback(() => {
    if (!transitionRef.current) {
      lockRef.current = false;
      pendingTargetRef.current = null;
      unlockScroll();
      if (isMountedRef.current) setIsTransitioning(false);
      return;
    }

    transitionRef.current
      .playReveal()
      .catch(() => {})
      .finally(() => {
        lockRef.current = false;
        pendingTargetRef.current = null;
        unlockScroll();
        if (isMountedRef.current) setIsTransitioning(false);
      });
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
      // Route changed outside of TransitionLink (back/forward, programmatic nav).
      if (transitionRef.current) {
        transitionRef.current
          .playCover()
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