import { useState, useCallback } from "react";
import { formConfig } from "../data/contactData";
import { validateField } from "../utils/validators";

const buildInitialState = () => {
  const state = {};
  formConfig.fields.forEach((f) => (state[f.name] = ""));
  state[formConfig.selectField.name] = "";
  state[formConfig.messageField.name] = "";
  return state;
};

// Status machine: idle -> submitting -> success (auto resets to idle)
export const useContactForm = (onSuccess) => {
  const [values, setValues] = useState(buildInitialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

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
      if (!validateAll()) return;

      setStatus("submitting");
      try {
        // Actual API integration baad mein yahan aayegi
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setStatus("success");
        onSuccess?.();
        setTimeout(() => {
          setStatus("idle");
          setValues(buildInitialState());
        }, 2200);
      } catch {
        setStatus("idle");
      }
    },
    [validateAll, onSuccess]
  );

  return { values, errors, status, handleChange, handleSubmit };
};
