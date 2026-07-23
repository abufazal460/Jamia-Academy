import { forwardRef, useCallback } from "react";
import { Link } from "react-router-dom";
import usePageTransition from "./usePageTransition";

const TransitionLink = forwardRef(function TransitionLink(
  { to, onClick, children, replace, state, target, ...rest },
  ref
) {
  const { navigateWithTransition, isTransitioning } = usePageTransition();

  const handleClick = useCallback(
    (event) => {
      if (onClick) onClick(event);
      if (event.defaultPrevented) return;

      const isModifiedClick =
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

      if (isModifiedClick || target === "_blank") {
        return;
      }

      event.preventDefault();

      if (isTransitioning) return;

      const href = typeof to === "string" ? to : to?.pathname ?? "";
      navigateWithTransition(href, { replace, state });
    },
    [onClick, to, isTransitioning, navigateWithTransition, replace, state, target]
  );

  return (
    <Link
      ref={ref}
      to={to}
      onClick={handleClick}
      replace={replace}
      state={state}
      target={target}
      aria-disabled={isTransitioning}
      {...rest}
    >
      {children}
    </Link>
  );
});

export default TransitionLink;