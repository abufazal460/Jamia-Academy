import { motion } from "framer-motion";
import { formConfig } from "../../data/contactData";
import { scaleInVariant, viewportOnce } from "../../animations/contactVariants";
import { useContactForm } from "../../hooks/useContactForm";
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import SubmitButton from "./SubmitButton";

const ContactForm = () => {
  const { values, errors, status, handleChange, handleSubmit } = useContactForm();

  return (
    <motion.div
      id="contact-form"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={scaleInVariant}
      className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/40 p-6 shadow-2xl backdrop-blur-2xl sm:p-10"
    >
      {/* Ambient gradient accent inside the glass panel */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "linear-gradient(135deg, #E63946, #2A9D8F)" }}
        aria-hidden="true"
      />

      <div className="relative mb-8">
        <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-bold text-[#2B2D42]">
          {formConfig.heading}
        </h2>
        <p className="mt-1.5 text-sm text-[#2B2D42]/60 sm:text-base">
          {formConfig.description}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative flex flex-col gap-5"
        aria-label={formConfig.heading}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {formConfig.fields.map((field) => (
            <div key={field.id} className={field.name === "fullName" ? "sm:col-span-2" : ""}>
              <FormField
                field={field}
                value={values[field.name]}
                error={errors[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <FormSelect
          field={formConfig.selectField}
          value={values[formConfig.selectField.name]}
          error={errors[formConfig.selectField.name]}
          onChange={handleChange}
        />

        <FormField
          field={formConfig.messageField}
          value={values[formConfig.messageField.name]}
          error={errors[formConfig.messageField.name]}
          onChange={handleChange}
        />

        <div className="mt-2">
          <SubmitButton status={status} />
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
