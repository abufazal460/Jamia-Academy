import { memo } from "react";
import { motion } from "motion/react";
import { floatingBlob, floatingBlobSlow, noMotion } from "../../../shared/motion/floating.motion";
import { usePrefersReducedMotion } from "../../../shared/hooks/usePrefersReducedMotion";

// Fixed ambient background — mount ek baar, form state change se re-render nahi hota
const ContactBackground = () => {
  const reducedMotion = usePrefersReducedMotion();
  const blobVariant = reducedMotion ? noMotion : floatingBlob;
  const blobVariantSlow = reducedMotion ? noMotion : floatingBlobSlow;

  return (
    <>
    </>
  );
};

export default memo(ContactBackground);
