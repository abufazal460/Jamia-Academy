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
  useNavigate,
} from "react-router-dom";
import { getLenisInstance } from "../SmoothScroll";

import TransitionContext from "./TransitionContext";
import PageTransition from "./PageTransition";

import { TRANSITION_TIMING } from "./transitionPaths";

const wait = (seconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

// Safety cap for "wait for the new route to actually mount" — protects
// against a lazy chunk that fails to load / hangs, so the curtain never
// gets stuck covering the screen forever.
const ROUTE_READY_TIMEOUT = 4000;

export default function PageTransitionProvider({
  children,
}) {
  const location = useLocation();
  const navigate = useNavigate();

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
   *
   * This blocker is the ONLY thing that drives the transition. Do not
   * add a second, independent "cover -> navigate -> reveal" path
   * elsewhere (e.g. by calling navigate() again from inside a helper) —
   * that second navigate() call would itself get intercepted by this
   * same blocker, and since the helper already marked itself as
   * "running", nobody would ever call blocker.proceed() for it. The
   * navigation would get stuck permanently in the "blocked" state.
   */
  const blocker = useBlocker(true);

  const transitionRef = useRef(null);

  const mountedRef = useRef(false);
  const runningRef = useRef(false);

  const previousBodyOverflowRef = useRef("");
  const previousHtmlOverflowRef = useRef("");

  // Resolves the promise a running transition is awaiting once the new
  // route has actually mounted (RouteTransitionWatcher calls
  // onRouteMounted). This replaces a blind fixed-duration wait, so slow
  // networks / lazy chunks don't get revealed before the new page is
  // actually ready.
  const routeReadyResolverRef = useRef(null);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  /*
   * Prevent the page from scrolling while a transition is running.
   * Locks both <html> and <body> so behavior is consistent regardless
   * of which element the page's own CSS uses for scrolling.
   */
  const lockScroll = useCallback(() => {
    previousBodyOverflowRef.current = document.body.style.overflow;
    previousHtmlOverflowRef.current =
      document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    getLenisInstance()?.stop(); // Lenis ka apna rAF loop bhi rokna zaroori hai

  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow =
      previousBodyOverflowRef.current || "";
    document.documentElement.style.overflow =
      previousHtmlOverflowRef.current || "";
    getLenisInstance()?.start();

  }, []);

  const waitForRouteReady = useCallback(
    (timeoutMs = ROUTE_READY_TIMEOUT) =>
      new Promise((resolve) => {
        routeReadyResolverRef.current = resolve;

        setTimeout(() => {
          if (routeReadyResolverRef.current === resolve) {
            routeReadyResolverRef.current = null;
            resolve();
          }
        }, timeoutMs);
      }),
    []
  );

  const onRouteMounted = useCallback(() => {
    if (routeReadyResolverRef.current) {
      routeReadyResolverRef.current();
      routeReadyResolverRef.current = null;
    }
  }, []);

  /*
   * Initial page load.
   *
   * Page starts underneath the curtain.
   *
   * This fixes direct URL / refresh flash.
   *
   * Written to be safe under React 18 StrictMode's dev-mode double
   * effect invocation: every step checks `cancelled` / `mountedRef`
   * before continuing, and cleanup kills/resets the transition instead
   * of letting a stale async chain keep running into the next mount.
   */
  useLayoutEffect(() => {
    mountedRef.current = true;

    if (!transitionRef.current) {
      return undefined;
    }

    let cancelled = false;

    transitionRef.current.setCovered();
    lockScroll();

    const run = async () => {
      await new Promise((resolve) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(resolve)
        )
      );

      if (cancelled || !mountedRef.current) return;

      getLenisInstance()?.scrollTo(0, { immediate: true });

      await wait(TRANSITION_TIMING.holdDuration);

      if (cancelled || !mountedRef.current) return;

      if (transitionRef.current) {
        await transitionRef.current.playReveal();
      }
    };

    run().finally(() => {
      if (!cancelled) {
        unlockScroll();
      }
    });

    return () => {
      mountedRef.current = false;
      cancelled = true;

      if (transitionRef.current) {
        transitionRef.current.reset();
      }

      unlockScroll();
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
   * NEW PAGE (awaits a real "mounted" signal, not a fixed timer)
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

    const nextLocation = blocker.location;

    const isSameRoute =
      nextLocation &&
      nextLocation.pathname === location.pathname &&
      nextLocation.search === location.search;

    // Navigating to the exact same route (e.g. clicking the active
    // nav link again) shouldn't play the curtain at all — just let it
    // through immediately. This is handled once, here, for every entry
    // point (Link, NavLink, navigate(), back/forward) instead of being
    // duplicated per call site.
    if (isSameRoute) {
      blocker.proceed();
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
        const readyPromise = waitForRouteReady();

        blocker.proceed();

        /*
         * 3. Wait for the NEW route to actually mount (signalled by
         * RouteTransitionWatcher -> onRouteMounted) instead of a blind
         * fixed wait. This is what makes slow-network / lazy-loaded
         * pages reveal onto real content instead of a blank Suspense
         * fallback. Falls back to a timeout so a broken/never-loading
         * chunk can't leave the curtain stuck forever.
         */
        await readyPromise;

        /*
         * 4. Reset scroll while screen is covered.
         */
        window.scrollTo(0, 0);

        /*
         * 5. Reveal NEW page.
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
    location,
    lockScroll,
    unlockScroll,
    waitForRouteReady,
  ]);

  /*
   * Thin wrapper around navigate(). Deliberately does NOT run its own
   * cover/reveal sequence — the navigate() call below gets intercepted
   * by the blocker above (useBlocker(true) blocks everything), and
   * that single blocker effect is what drives cover -> navigate ->
   * reveal for every kind of navigation. Having two independent
   * drivers was the root cause of the "double navigation" bug: this
   * function's own navigate() call would re-enter the blocker while
   * runningRef was already true, so the blocker would bail out and
   * nobody would ever call blocker.proceed() — leaving the navigation
   * permanently stuck.
   */
  const navigateWithTransition = useCallback(
    (to, options = {}) => {
      if (!to) return;
      if (to === location.pathname) return;

      navigate(to, options);
    },
    [navigate, location.pathname]
  );

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
