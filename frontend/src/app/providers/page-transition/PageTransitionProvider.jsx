import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useBlocker,
  useLocation,
} from "react-router-dom";

import TransitionContext from "./TransitionContext";
import PageTransition from "./PageTransition";

import { TRANSITION_TIMING } from "./transitionPaths";

const wait = (seconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

export default function PageTransitionProvider({
  children,
}) {
  const location = useLocation();

   useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);
  /*
   * IMPORTANT:
   *
   * true means every React Router navigation
   * will first pass through this provider.
   *
   * This includes:
   *
   * Navbar
   * Buttons
   * navigate()
   * Back
   * Forward
   */
  const blocker = useBlocker(true);

  const transitionRef = useRef(null);

  const mountedRef = useRef(false);
  const runningRef = useRef(false);

  const previousOverflowRef = useRef("");

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  /*
   * Prevent browser from showing the page while
   * transition is running.
   */
  const lockScroll = useCallback(() => {
    previousOverflowRef.current =
      document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow =
      previousOverflowRef.current || "";
      document.documentElement.style.overflow = "";
  }, []);

  /*
   * Initial page load.
   *
   * Page starts underneath the curtain.
   *
   * This fixes direct URL / refresh flash.
   */
  useLayoutEffect(() => {
    mountedRef.current = true;

    if (!transitionRef.current) {
      return;
    }

    transitionRef.current.setCovered();

    lockScroll();

    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        try {
          window.scrollTo(0, 0);

          await wait(
            TRANSITION_TIMING.holdDuration
          );

          await transitionRef.current.playReveal();
        } finally {
          unlockScroll();
        }
      });
    });

    return () => {
      mountedRef.current = false;
    };
  }, [lockScroll, unlockScroll]);

  /*
   * GLOBAL NAVIGATION HANDLER
   *
   * This is the actual fix.
   *
   * React Router first blocks the navigation.
   *
   * Then:
   *
   * CURRENT PAGE
   *      ↓
   * COVER
   *      ↓
   * NAVIGATION
   *      ↓
   * NEW PAGE
   *      ↓
   * REVEAL
   */
  useEffect(() => {
    if (blocker.state !== "blocked") {
      return;
    }

    if (runningRef.current) {
      return;
    }

    runningRef.current = true;

    setIsTransitioning(true);

    lockScroll();

    const runNavigation = async () => {
      try {
        /*
         * 1. Cover CURRENT page.
         */
        if (transitionRef.current) {
          await transitionRef.current.playCover();

          await wait(
            TRANSITION_TIMING.holdDuration
          );
        }

        /*
         * 2. Allow React Router navigation.
         *
         * This is the critical part.
         *
         * Browser Back/Forward also reaches here.
         */
        blocker.proceed();

        /*
         * Give React time to commit the new route.
         */
        await new Promise((resolve) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(resolve)
          )
        );

        /*
         * 3. Reset scroll while screen is covered.
         */
        window.scrollTo(0, 0);

        /*
         * 4. Reveal NEW page.
         */
        if (transitionRef.current) {
          await transitionRef.current.playReveal();
        }
      } catch (error) {
        /*
         * Never leave the application stuck.
         */
        try {
          if (blocker.state === "blocked") {
            blocker.proceed();
          }
        } catch {
          // ignore
        }
      } finally {
        runningRef.current = false;

        unlockScroll();

        if (mountedRef.current) {
          setIsTransitioning(false);
        }
      }
    };

    runNavigation();
  }, [
    blocker,
    lockScroll,
    unlockScroll,
  ]);

  const navigateWithTransition = useCallback(
    () => {
      /*
       * Navigation is now handled globally by
       * useBlocker().
       *
       * Keep this function for compatibility with
       * existing components.
       */
    },
    []
  );

  const onRouteMounted = useCallback(() => {
    /*
     * No transition logic here.
     *
     * IMPORTANT:
     *
     * Do NOT call playCover() here.
     *
     * The navigation blocker already handled
     * the transition BEFORE route change.
     */
  }, []);

  const value = useMemo(
    () => ({
      isTransitioning,
      navigateWithTransition,
      onRouteMounted,
    }),
    [
      isTransitioning,
      navigateWithTransition,
      onRouteMounted,
    ]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}

      <PageTransition
        ref={transitionRef}
        initialCovered={true}
      />
    </TransitionContext.Provider>
  );
}