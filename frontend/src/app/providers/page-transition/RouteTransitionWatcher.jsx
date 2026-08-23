import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import usePageTransition from "./usePageTransition";

export default function RouteTransitionWatcher() {
  const location = useLocation();

  const {
    onRouteMounted,
  } = usePageTransition();

  useLayoutEffect(() => {
    onRouteMounted(location.pathname);
  }, [
    location.pathname,
    onRouteMounted,
  ]);

  return null;
}