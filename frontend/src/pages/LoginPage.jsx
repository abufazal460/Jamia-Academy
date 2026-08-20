import SEO from "../shared/seo/SEO";
import { LazyMotion, domAnimation } from "motion/react";
import SpaceBackground from "../shared/components/background/SpaceBackground";
import { LoginCard } from "../features/auth/login/components";
import loginData from "../features/auth/login/data/login.data";

const canonicalUrl = "https://www.jamiaacademy.in/login"; function Login() {
  return (
    <LazyMotion features={domAnimation}>
      <Helmet>
        <title>{loginData.meta.pageTitle}</title>
        <meta name="description" content={loginData.meta.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={loginData.meta.pageTitle} />
        <meta property="og:description" content={loginData.meta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={loginData.meta.pageTitle} />
        <meta property="og:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://www.jamiaacademy.in/og/home.jpg" />
        <meta property="og:site_name" content="Jamia Academy" />
        <meta property="og:locale" content="en_IN" />
      </Helmet>
      <main className="relative flex min-h-svh w-full items-center justify-center overflow-hidden  px-4 py-10 sm:px-6">
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
