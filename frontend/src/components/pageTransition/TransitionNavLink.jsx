import { forwardRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import usePageTransition from "./usePageTransition";

// Same as TransitionLink, but supports NavLink's function-based
// className/style props (isActive, isPending) for active-link styling.
const TransitionNavLink = forwardRef(function TransitionNavLink(
  { to, onClick, children, replace, state, target, className, style, ...rest },
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
    <NavLink
      ref={ref}
      to={to}
      onClick={handleClick}
      replace={replace}
      state={state}
      target={target}
      className={className}
      style={style}
      aria-disabled={isTransitioning}
      {...rest}
    >
      {children}
    </NavLink>
  );
});

export default TransitionNavLink;