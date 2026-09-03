import { memo } from "react";
import { motion } from "motion/react";
import { CERTIFICATE_FIELDS } from "../data/certificate.data";
import { certFieldsContainerVariants } from "../motion/certificate.motion";
import { AnimatedInput } from "./AnimatedInput";

function FormFieldsBase({ formData, errors, onChange, onBlur, disabled }) {
  return (
    <motion.div
      variants={certFieldsContainerVariants}
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
