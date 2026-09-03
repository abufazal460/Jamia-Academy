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
        className="grid min-h-screen place-items-center pb-10 pt-20  bg-gradient-to-br from-gray-50 to-gray-200"
      >
        <section className="bg-white p-12 rounded-2xl shadow-2xl max-w-lg w-full flex justify-center items-center flex-col">

          {/* Error Icon */}
          <div className="text-6xl mb-4 flex justify-center items-center">
            <span role="img" aria-label="Error icon">⚠️</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight text-center">
            Oops! Something Went Wrong
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-4 px-2">
            Please refresh the page to try again. If the problem continues, contact{" "}
            <strong className="text-gray-800">Jamia Academy</strong> support.
          </p>
          
          <div className="bg-gray-50 px-4 py-3 rounded-lg mb-6 text-sm text-gray-600 border-l-4 border-red-500 text-left">
            <span className="font-semibold text-red-500">📝 Report this bug:</span>{" "}
            If you encounter this error, please help us fix it by reporting the issue
            to our support team with details about what you were doing.
          </div>

          <button
            type="button"
            onClick={this.resetErrorBoundary}
            aria-label="Try loading this page again"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-10 rounded-full cursor-pointer text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            Try Again
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