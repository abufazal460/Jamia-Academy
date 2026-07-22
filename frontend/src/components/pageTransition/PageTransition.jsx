import { forwardRef, memo, useImperativeHandle, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { buildCurtainPath, TRANSITION_TIMING } from "./transitionPaths";

const PageTransition = forwardRef(function PageTransition(_, ref) {
  const pathRef = useRef(null);
  const progressRef = useRef({ value: 0 });
  const tweenRef = useRef(null);
  const ctxRef = useRef(null);

  useLayoutEffect(() => {
    ctxRef.current = gsap.context(() => {});

    if (pathRef.current) {
      pathRef.current.setAttribute("d", buildCurtainPath(0));
    }

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, []);

  const updatePath = () => {
    if (pathRef.current) {
      pathRef.current.setAttribute("d", buildCurtainPath(progressRef.current.value));
    }
  };

  const runTween = (from, to, duration) =>
    new Promise((resolve) => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      progressRef.current.value = from;
      updatePath();

      tweenRef.current = gsap.to(progressRef.current, {
        value: to,
        duration,
        ease: TRANSITION_TIMING.ease,
        onUpdate: updatePath,
        onComplete: () => {
          tweenRef.current = null;
          resolve();
        },
      });
    });

  useImperativeHandle(
    ref,
    () => ({
      playCover: () => runTween(0, 1, TRANSITION_TIMING.coverDuration),
      playReveal: () => runTween(1, 2, TRANSITION_TIMING.revealDuration),
      reset: () => {
        if (tweenRef.current) {
          tweenRef.current.kill();
          tweenRef.current = null;
        }
        progressRef.current.value = 0;
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
        <path ref={pathRef} d={buildCurtainPath(0)} className="fill-[#0f172a]" />
      </svg>
    </div>
  );
});

export default memo(PageTransition);