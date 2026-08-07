import React, { memo } from "react";
import { motion } from "framer-motion";
import { usePageTransition } from "../pageTransition";


// ====================================================================
// LoginButton.jsx
// WHY alag component: WhatsAppButton ki tarah Login bhi navLinks array
// se BILKUL ALAG hai. Ye Navbar me separately render hoga.
// WHY navigation folder: Ye navigation-related UI component hai — Navbar
// subfolder sirf Navbar ke direct children ke liye hai.
// ====================================================================

// React.memo: Agar Navbar re-render ho (mobile toggle, scroll) to LoginButton
// tab tak re-render nahi karega jab tak uske props change na ho.
const LoginButton = memo(function LoginButton() {
  // useNavigate: /login route par programmatic navigation ke liye.
  // WHY ye approach: <Link> component button ke andar semantically sahi nahi hota.

  const { navigateWithTransition } = usePageTransition();

  return (
    // ---- OUTER WRAPPER: Entry animation (page load par right se slide-in) ----
    // Ye wrapper entry ke liye hai. Inner button hover variants ke liye hai.
    // WHY alag: ek hi motion element me initial={object} aur initial="string"
    // (variant system) dono ek saath nahi chal sakte — conflict hota hai.
    <motion.div
      // Page load par right side se slide-in (WhatsAppButton jaisa feel)
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.42 }}
    >
      {/* ---- INNER BUTTON: Hover variant system ---- */}
      {/* initial="rest" + whileHover="hover": Framer Motion ye variant
          automatically saare motion children me propagate karta hai.
          Isliye andar ke dono motion.span bhi "rest" aur "hover" state me jaayenge
          bina koi extra prop pass kiye. */}
      <motion.button
        type="button"
        onClick={() => navigateWithTransition("/login")}
        initial="rest"
        whileHover="hover"
        // whileTap: gesture priority me whileHover se upar hota hai, isliye
        // tap karte waqt scale 0.95 apply hoga chahe hover variant me kuch bhi ho.
        whileTap={{ scale: 0.95 }}
        variants={{
          rest: {
            scale: 1,
            // Base glow — subtle, button ko depth deta hai
            boxShadow: "0 4px 18px rgba(99,102,241,0.28)",
          },
          hover: {
            scale: 1.05,
            // Hover par strong glow — gaming feel
            boxShadow: "0 0 28px rgba(99,102,241,0.65), 0 0 55px rgba(139,92,246,0.25)",
          },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label="Login to your account"
        // NO outline, NO ring, NO border — as per requirement.
        // bg-gradient-to-r: Premium indigo-violet gradient, gaming feel deta hai.
        // overflow-hidden: Text clip ke liye zaroori hai (sliding text effect).
        // px-5 py-2: Professional padding — pill shape ke saath balanced spacing.
        // rounded-full: Modern pill/capsule shape.
        className="relative overflow-hidden cursor-pointer rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-bold text-white outline-none"
      >
        {/* ---- TEXT CONTAINER ----
            h-[1.2em] + overflow-hidden: Ye ek fixed height window hai.
            Dono texts (rest + hover) is window ke andar slide karte hai.
            Bahar ka text clip ho jaata hai — smooth reveal effect aata hai.
            min-w-[52px]: Button width consistent rakho taaki size jump na kare. */}
        <span className="relative flex h-[1.6em] min-w-[60px] items-center justify-center overflow-hidden">

          {/* ---- DEFAULT TEXT (resting state) ----
              Hover par: y 0 → "-100%" (upar jaata hai) + opacity 1 → 0 (fade out).
              Framer Motion parent ki "hover" variant milne par ye animate hoga. */}
          <motion.span
            variants={{
              rest: { y: 0, opacity: 1 },
              hover: { y: "-100%", opacity: 0 },
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            // select-none: Text accidentally select na ho hover/click par.
            // whitespace-nowrap: Text wrap na ho agar button thoda chhota ho.
            className="absolute select-none whitespace-nowrap"
          >
            Login
          </motion.span>

          {/* ---- HOVER TEXT (comes from below) ----
              Rest state me: y "100%" (neeche chhupa hua) + opacity 0.
              Hover par: y "100%" → 0 (neeche se aata hai) + opacity 0 → 1.
              Both texts identical hai — sirf animation direction alag hai. */}
          <motion.span
            variants={{
              rest: { y: "100%", opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            // aria-hidden: Screen readers ke liye duplicate text hide karo.
            // Accessibility — sirf ek "LOGIN" sunna chahiye, do nahi.
            aria-hidden="true"
            className="absolute select-none whitespace-nowrap"
          >
            Login
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  );
});

export default LoginButton;
