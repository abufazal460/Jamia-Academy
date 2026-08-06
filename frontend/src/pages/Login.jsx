import { LazyMotion, domAnimation } from "motion/react";
import SpaceBackground from "../../components/contactBackground/SpaceBackground";
import { LoginCard } from "../../components/login";

/**
 * Login
 * Page-level component. Existing SpaceBackground ko as-is behind the
 * card render karta hai — background ko dobara banaya ya modify nahi
 * kiya gaya hai, jaisa spec me mention tha.
 *
 * Authentication/API/Redux/Context/JWT/Firebase — kuch bhi implement
 * nahi hai, current scope sirf UI tak hai.
 */
function Login() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#05070d] px-4 py-10 sm:px-6">
        {/* Existing project background — do not modify */}
        <SpaceBackground />

        <div className="relative z-10 flex w-full justify-center">
          <LoginCard />
        </div>
      </main>
    </LazyMotion>
  );
}

export default Login;
