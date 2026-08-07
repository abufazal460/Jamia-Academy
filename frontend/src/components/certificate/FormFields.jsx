import { memo } from "react";
import { motion } from "motion/react";
import { CERTIFICATE_FIELDS } from "../../data/certificateData";
import { fieldsContainerVariants } from "../../utils/animationVariants";
import { AnimatedInput } from "./AnimatedInput";

/**
 * FormFields
 * Purely presentational — CERTIFICATE_FIELDS config ko map karke
 * AnimatedInput render karta hai. Koi field yaha hardcode nahi hai, naya
 * field add karna ho to sirf certificateData.js edit karna hoga.
 */
function FormFieldsBase({ formData, errors, onChange, onBlur, disabled }) {
  return (
    <motion.div
      variants={fieldsContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      {CERTIFICATE_FIELDS.map((field) => (
        <AnimatedInput
          key={field.id}
          field={field}
          value={formData[field.name]}
          error={errors[field.name]}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      ))}
    </motion.div>
  );
}

export const FormFields = memo(FormFieldsBase);
