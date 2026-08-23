import {
  forwardRef,
} from "react";

import {
  Link,
} from "react-router-dom";

const TransitionLink = forwardRef(
  function TransitionLink(
    {
      to,
      children,
      replace,
      state,
      target,
      ...rest
    },
    ref
  ) {
    return (
      <Link
        ref={ref}
        to={to}
        replace={replace}
        state={state}
        target={target}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);

export default TransitionLink;