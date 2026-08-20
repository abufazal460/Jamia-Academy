// src/app/providers/ErrorBoundary.jsx
import { Component } from "react";

const initialState = {
  error: null,
  hasError: false,
};

function haveResetKeysChanged(previousKeys = [], nextKeys = []) {
  return (
    previousKeys.length !== nextKeys.length ||
    previousKeys.some((key, index) => !Object.is(key, nextKeys[index]))
  );
}

export default class ErrorBoundary extends Component {
  state = initialState;

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    const { onError } = this.props;

    // Production mein yahan Sentry / LogRocket / custom error API connect kar sakte ho.
    onError?.(error, errorInfo);

    if (import.meta.env.DEV) {
      console.error("Unhandled React error:", error, errorInfo);
    }
  }

  componentDidUpdate(previousProps) {
    const { hasError } = this.state;
    const { resetKeys } = this.props;

    if (
      hasError &&
      haveResetKeysChanged(previousProps.resetKeys, resetKeys)
    ) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  renderFallback() {
    const { error } = this.state;
    const { fallback } = this.props;

    if (typeof fallback === "function") {
      return fallback({
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      });
    }

    if (fallback) {
      return fallback;
    }

    return (
      <main
        role="alert"
        aria-live="assertive"
        style={{
          display: "grid",
          minHeight: "100vh",
          placeItems: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <section>
          <h1>Something went wrong</h1>
          <p>
            Please refresh the page. If the problem continues, contact Jamia
            Academy support.
          </p>

          <button
            type="button"
            onClick={this.resetErrorBoundary}
            aria-label="Try loading this page again"
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  render() {
    const { children } = this.props;

    if (this.state.hasError) {
      return this.renderFallback();
    }

    return children;
  }
}