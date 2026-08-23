import {
  forwardRef,
} from "react";

import {
  NavLink,
} from "react-router-dom";

const TransitionNavLink = forwardRef(
  function TransitionNavLink(
    {
      to,
      children,
      replace,
      state,
      target,
      className,
      style,
      ...rest
    },
    ref
  ) {
    return (
      <NavLink
        ref={ref}
        to={to}
        replace={replace}
        state={state}
        target={target}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </NavLink>
    );
  }
);

export default TransitionNavLink;