import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { duration, easing } from "../../../shared/motion/config";

gsap.registerPlugin(ScrollTrigger);

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.entrance } },
  exit: { opacity: 0, y: -12, transition: { duration: duration.fast, ease: easing.exit } },
};

export default {
  pageTransition,
};
