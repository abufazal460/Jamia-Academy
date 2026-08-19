import { useContext } from "react";
import TransitionContext from "./TransitionContext";

export default function usePageTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }

  return context;
}