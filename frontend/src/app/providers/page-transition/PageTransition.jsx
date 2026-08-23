import {
  forwardRef,
  memo,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

import {
  buildCurtainPath,
  TRANSITION_TIMING,
} from "./transitionPaths";

const PageTransition = forwardRef(function PageTransition(
  { initialCovered = false },
  ref
) {
  const pathRef = useRef(null);

  const progressRef = useRef({
    value: initialCovered ? 1 : 0,
  });

  const tweenRef = useRef(null);

  const updatePath = () => {
    if (!pathRef.current) return;

    pathRef.current.setAttribute(
      "d",
      buildCurtainPath(progressRef.current.value)
    );
  };

  useLayoutEffect(() => {
    updatePath();

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, []);

  const runTween = (from, to, duration) =>
    new Promise((resolve) => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }

      progressRef.current.value = from;

      updatePath();

      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        tweenRef.current = null;
        resolve();
      };

      /*
       * Safety net: if GSAP is ever killed externally, throttled by the
       * browser tab, or otherwise never fires onComplete, the caller's
       * await would hang forever (stuck curtain, scroll locked forever).
       * Force-resolve shortly after the tween should have finished.
       */
      const safetyTimer = setTimeout(settle, duration * 1000 + 500);

      tweenRef.current = gsap.to(progressRef.current, {
        value: to,
        duration,
        ease: TRANSITION_TIMING.ease,

        onUpdate: updatePath,

        onComplete: () => {
          clearTimeout(safetyTimer);
          settle();
        },
      });
    });

  useImperativeHandle(
    ref,
    () => ({
      playCover: () =>
        runTween(
          0,
          1,
          TRANSITION_TIMING.coverDuration
        ),

      playReveal: () =>
        runTween(
          1,
          2,
          TRANSITION_TIMING.revealDuration
        ),

      reset: () => {
        if (tweenRef.current) {
          tweenRef.current.kill();
          tweenRef.current = null;
        }

        progressRef.current.value = 0;

        updatePath();
      },

      setCovered: () => {
        if (tweenRef.current) {
          tweenRef.current.kill();
          tweenRef.current = null;
        }

        progressRef.current.value = 1;

        updatePath();
      },
    }),
    []
  );

  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-[9999]"
      aria-hidden="true"
      role="presentation"
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d={buildCurtainPath(
            initialCovered ? 1 : 0
          )}
          className="fill-[#0f172a]"
        />
      </svg>
    </div>
  );
});

export default memo(PageTransition);