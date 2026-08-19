import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import usePageTransition from "./usePageTransition";

// Place this INSIDE the same <Suspense> boundary as your <Routes>.
// Its effect only commits after the lazy page chunk has loaded and
// rendered, which is exactly when we want the curtain to open.
export default function RouteTransitionWatcher() {
  const location = useLocation();
  const { onRouteMounted } = usePageTransition();

  useLayoutEffect(() => {
    onRouteMounted(location.pathname);
  }, [location.pathname, onRouteMounted]);

  return null;
}