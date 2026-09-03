import { useEffect, useRef } from "react";
import gsap from "gsap";

const useGSAPAnimation = (animationCallback, deps = []) => {
  const scope = useRef(null);

  useEffect(() => {
    if (!scope.current || typeof animationCallback !== "function") return undefined;

    const ctx = gsap.context(() => {
      animationCallback(scope);
    }, scope);

    return () => ctx.revert();
  }, deps);

  return scope;
};

export default useGSAPAnimation;
