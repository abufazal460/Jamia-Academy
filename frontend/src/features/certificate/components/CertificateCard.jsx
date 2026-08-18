import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassContainer } from "./GlassContainer";
import { FormFields } from "./FormFields";
import { VerifyButton } from "./VerifyButton";
import {
  INITIAL_FORM_STATE,
  STATUS_MESSAGES,
} from "../data/certificate.data";
import { validateCertificateField, validateCertificateForm, isCertificateFormValid, sanitizeCertificateFormData } from "../utils/validation";
import { handleCertificateVerification } from "../../../shared/utils/futureApi";
import { certCardVariants } from "../motion/certificate.motion";

/**
 * CertificateCard
 * Form state, validation aur submit flow yahi centralize hai. UI ke andar
 * koi API/business logic embed nahi hai — sab utils/futureApi.js se aata
 * hai, taaki backend aane par sirf woh ek file replace karni pade.
 */
export function CertificateCard() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus(null);
  }, []);

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setErrors((prev) => {
      const message = validateCertificateField(name, value);
      if (!message) {
        const { [name]: _omit, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: message };
    });
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const validationErrors = validateCertificateForm(formData);
      setErrors(validationErrors);

      if (!isCertificateFormValid(validationErrors)) {
        setStatus("error");
        return;
      }

      setIsSubmitting(true);
      setStatus(null);

      try {
        const cleanData = sanitizeCertificateFormData(formData);
        const response = await handleCertificateVerification(cleanData);
        setStatus(response?.success ? "success" : "error");
      } catch {
        setStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  return (
    <motion.div
      variants={certCardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[440px]"
    >
      <GlassContainer className="p-7 sm:p-9">
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FormFields
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />

          <VerifyButton isSubmitting={isSubmitting} disabled={false} />

          <AnimatePresence mode="wait">
            {status && (
              <motion.p
                key={status}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className={`text-center text-sm font-medium ${
                  status === "success" ? "text-[#2A9D8F]" : "text-[#E63946]"
                }`}
              >
                {status === "success"
                  ? STATUS_MESSAGES.successBody
                  : STATUS_MESSAGES.errorBody}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </GlassContainer>
    </motion.div>
  );
}
