import { useInView } from "react-intersection-observer";

const useCountUp = (options = {}) => {
  const { triggerOnce = false, threshold = 0.4 } = options;

  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  return { ref, inView };
};

export default useCountUp;
