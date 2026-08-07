import { memo, useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import FloatingInput from "./FloatingInput";
import PasswordInput from "./PasswordInput";
import AnimatedButton from "./AnimatedButton";
import { loginData } from "../../data/loginData";
import { validateEmail, validatePassword } from "../../utils/validation";
import {
  emailLabelEntranceVariants,
  passwordLabelEntranceVariants,
  buttonExpandVariants,
} from "../../utils/animationVariants";

const INITIAL_VALUES = { email: "", password: "" };
const INITIAL_TOUCHED = { email: false, password: false };

/**
 * LoginForm
 * Controlled email + password fields with inline validation.
 * Note (current scope): onSubmit sirf client-side validation run karta
 * hai — koi API/auth call nahi hota (backend integration future phase hai).
 *
 * Props:
 * - onSubmit: (values: { email, password }) => void — optional callback
 *   jab form valid ho aur submit ho jaaye
 */
function LoginForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = useMemo(
    () => ({
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    }),
    [values.email, values.password]
  );

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setTouched({ email: true, password: true });

      if (errors.email || errors.password) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit?.(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [errors.email, errors.password, onSubmit, values]
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={loginData.a11y.formLabel}
      className="flex w-full flex-col gap-5"
    >
      <motion.div variants={emailLabelEntranceVariants}>
        <FloatingInput
          id={loginData.form.email.id}
          name={loginData.form.email.name}
          type="email"
          label={loginData.form.email.label}
          placeholder={loginData.form.email.placeholder}
          autoComplete={loginData.form.email.autoComplete}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          iconLabel={loginData.a11y.emailIconLabel}
        />
      </motion.div>

      <motion.div variants={passwordLabelEntranceVariants}>
        <PasswordInput
          id={loginData.form.password.id}
          name={loginData.form.password.name}
          label={loginData.form.password.label}
          placeholder={loginData.form.password.placeholder}
          autoComplete={loginData.form.password.autoComplete}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
        />
      </motion.div>

      <motion.div variants={buttonExpandVariants} className="pt-1">
        <AnimatedButton
          idleText={loginData.button.idleText}
          hoverText={loginData.button.hoverText}
          loadingText={loginData.button.loadingText}
          isSubmitting={isSubmitting}
        />
      </motion.div>
    </form>
  );
}

export default memo(LoginForm);
