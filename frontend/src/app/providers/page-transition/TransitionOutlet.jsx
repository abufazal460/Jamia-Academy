import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import usePageTransition from "./usePageTransition";

export default function TransitionOutlet() {
  const location = useLocation();
  const { onRouteMounted } = usePageTransition();

  useLayoutEffect(() => {
    onRouteMounted(location.pathname);
  }, [location.pathname, onRouteMounted]);

  return <Outlet />;
}