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

const ROUTE_READY_TIMEOUT = 4000;

export default function PageTransitionProvider({
  children,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const blocker = useBlocker(true);

  const transitionRef = useRef(null);

  const mountedRef = useRef(false);
  const runningRef = useRef(false);

  const previousBodyOverflowRef = useRef("");
  const previousHtmlOverflowRef = useRef("");

  const routeReadyResolverRef = useRef(null);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const lockScroll = useCallback(() => {
    previousBodyOverflowRef.current = document.body.style.overflow;
    previousHtmlOverflowRef.current =
      document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    getLenisInstance()?.stop();

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
    if (isSameRoute) {
      blocker.proceed();
      return;
    }

    runningRef.current = true;

    setIsTransitioning(true);

    lockScroll();

    const runNavigation = async () => {
      try {

        if (transitionRef.current) {
          await transitionRef.current.playCover();

          await wait(
            TRANSITION_TIMING.holdDuration
          );
        }
        const readyPromise = waitForRouteReady();

        blocker.proceed();

        await readyPromise;
        window.scrollTo(0, 0);
        if (transitionRef.current) {
          await transitionRef.current.playReveal();
        }
      } catch (error) {

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
