import { memo } from "react";
import { motion } from "motion/react";
import { floatingBlob, floatingBlobSlow, noMotion } from "../../animations/floatingVariants";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

// Fixed ambient background — mount ek baar, form state change se re-render nahi hota
const ContactBackground = () => {
  const reducedMotion = usePrefersReducedMotion();
  const blobVariant = reducedMotion ? noMotion : floatingBlob;
  const blobVariantSlow = reducedMotion ? noMotion : floatingBlobSlow;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F7F3E9]"
      aria-hidden="true"
    >
      {/* Animated gradient blob — top right */}
      <motion.div
        variants={blobVariant}
        animate="animate"
        className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #E63946, #F4A261 60%, transparent 80%)",
        }}
      />
      {/* Animated gradient blob — bottom left */}
      <motion.div
        variants={blobVariantSlow}
        animate="animate"
        className="absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #2A9D8F, #264653 65%, transparent 85%)",
        }}
      />
      {/* Subtle grid texture for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2B2D42 1px, transparent 1px), linear-gradient(90deg, #2B2D42 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
};

export default memo(ContactBackground);
