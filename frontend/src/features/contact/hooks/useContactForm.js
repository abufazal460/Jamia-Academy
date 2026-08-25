import { useState, useCallback, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { formConfig } from "../data/contact.data";
import { emailjsConfig } from "../config/emailjs.config";
import { validateField } from "../../../shared/utils/validation";

const buildInitialState = () => {
  const state = {};
  formConfig.fields.forEach((f) => (state[f.name] = ""));
  state[formConfig.selectField.name] = "";
  state[formConfig.messageField.name] = "";
  return state;
};

// Status machine: idle -> submitting -> success (auto resets to idle) | error (auto resets to idle)
export const useContactForm = (onSuccess) => {
  const [values, setValues] = useState(buildInitialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const resetTimeoutRef = useRef(null);
  const isSubmittingRef = useRef(false); // duplicate-submit guard, state se independent (no re-render lag)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const handleChange = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: null } : prev));
  }, []);

  const validateAll = useCallback(() => {
    const nextErrors = {};

    formConfig.fields.forEach((field) => {
      const isValid = validateField(field.validation, values[field.name]);
      if (!isValid) nextErrors[field.name] = field.errorMessage;
    });

    if (!values[formConfig.selectField.name]) {
      nextErrors[formConfig.selectField.name] = formConfig.selectField.errorMessage;
    }

    const msgField = formConfig.messageField;
    if (!validateField(msgField.validation, values[msgField.name])) {
      nextErrors[msgField.name] = msgField.errorMessage;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmittingRef.current) return; // double-click / double-submit guard
      if (!validateAll()) return;

      isSubmittingRef.current = true;
      setStatus("submitting");

      try {
        await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          {
            from_name: values.fullName,
            phone: values.phone,
            email: values.email,
            course: values.course,
            message: values.message,
          },
          { publicKey: emailjsConfig.publicKey }
        );

        setStatus("success");
        onSuccess?.();
        resetTimeoutRef.current = setTimeout(() => {
          setStatus("idle");
          setValues(buildInitialState());
          isSubmittingRef.current = false;
        }, 2200);
      } catch {
        setStatus("error");
        isSubmittingRef.current = false; // retry allowed, values kept as-is
        resetTimeoutRef.current = setTimeout(() => setStatus("idle"), 2500);
      }
    },
    [validateAll, values, onSuccess]
  );

  return { values, errors, status, handleChange, handleSubmit };
};
