import SEO from "../shared/seo/SEO";
import { LazyMotion, domAnimation } from "motion/react";
import SpaceBackground from "../shared/components/background/SpaceBackground";
import { LoginCard } from "../features/auth/login/components";
import loginData from "../features/auth/login/data/login.data";

function Login() {
  return (
    <>
      <SEO
        title={loginData.meta.pageTitle}
        description={loginData.meta.description}
        path="/login"
        robots="noindex, follow"
        imageAlt="Jamia Academy student login"
      />
      <LazyMotion features={domAnimation}>
        <main className="relative flex min-h-svh w-full items-center justify-center overflow-hidden  px-4 py-10 sm:px-6">
          <SpaceBackground />
          <div className="relative z-10 flex w-full justify-center">
            <LoginCard />
          </div>
        </main>
      </LazyMotion>
    </>
  );
}

export default Login;
