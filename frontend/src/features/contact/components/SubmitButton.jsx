import { memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Check, Loader2 } from "lucide-react";
import { formConfig } from "../../data/contactData";
import { buttonHoverVariant } from "../../animations/hoverVariants";

const STATUS_TEXT = {
  idle: formConfig.submitButton.idleText,
  submitting: formConfig.submitButton.loadingText,
  success: formConfig.submitButton.successText,
};

const SubmitButton = ({ status }) => {
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <motion.button
      type="submit"
      disabled={isSubmitting || isSuccess}
      variants={buttonHoverVariant}
      initial="rest"
      whileHover={!isSubmitting && !isSuccess ? "hover" : "rest"}
      whileTap={!isSubmitting && !isSuccess ? "tap" : "rest"}
      aria-live="polite"
      className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg transition-opacity disabled:cursor-not-allowed sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
      style={{
        background: isSuccess
          ? "#2A9D8F"
          : "linear-gradient(135deg, #E63946, #F4A261)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSuccess && <Check className="h-4 w-4" />}
          {!isSubmitting && !isSuccess && <Send className="h-4 w-4" />}
          {STATUS_TEXT[status]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default memo(SubmitButton);
