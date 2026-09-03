import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Home } from "lucide-react";

export default function NotFoundContent() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const numberVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 32,
      scale: shouldReduceMotion ? 1 : 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | Jamia Academy</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to Jamia Academy's homepage to explore our courses, gallery and more."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="relative isolate flex min-h-[calc(100svh-var(--nav-h,0px))] w-full items-center justify-center overflow-hidden bg-[#2B2D42] px-6 py-24 sm:px-8 md:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -left-[10%] -top-[15%] h-[45vmax] w-[45vmax] rounded-full bg-[#E63946]/20 blur-[100px]"
            animate={
              shouldReduceMotion
                ? undefined
                : { x: [0, 30, 0], y: [0, 20, 0] }
            }
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-[20%] -right-[10%] h-[50vmax] w-[50vmax] rounded-full bg-[#2A9D8F]/20 blur-[110px]"
            animate={
              shouldReduceMotion
                ? undefined
                : { x: [0, -25, 0], y: [0, -15, 0] }
            }
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-[8%] top-[10%] h-[22vmax] w-[22vmax] rounded-full bg-[#F4A261]/15 blur-[80px]"
            animate={
              shouldReduceMotion
                ? undefined
                : { x: [0, -15, 0], y: [0, 25, 0] }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.svg
            viewBox="0 0 100 100"
            className="absolute left-[6%] top-[18%] h-16 w-16 text-[#F4A261]/40 sm:h-20 sm:w-20"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              rx="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </motion.svg>

          <motion.svg
            viewBox="0 0 100 100"
            className="absolute bottom-[16%] left-[12%] h-10 w-10 text-[#2A9D8F]/50 sm:h-14 sm:w-14"
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -14, 0], rotate: [0, 15, 0] }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <circle cx="50" cy="50" r="34" fill="currentColor" opacity="0.5" />
          </motion.svg>

          <motion.svg
            viewBox="0 0 100 100"
            className="absolute right-[10%] top-[62%] h-12 w-12 text-[#E63946]/40 sm:h-16 sm:w-16"
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, 14, 0], rotate: [0, -12, 0] }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <path
              d="M50 8 L92 88 L8 88 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex w-full max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-14 text-center shadow-2xl backdrop-blur-xl sm:px-12 sm:py-16"
        >
          <motion.h1
            variants={numberVariants}
            className="font-heading select-none bg-gradient-to-br from-[#E63946] via-[#F4A261] to-[#2A9D8F] bg-clip-text leading-none text-transparent"
            style={{
              fontSize: "clamp(5.5rem, 18vw, 11rem)",
              fontWeight: 800,
            }}
          >
            404
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="font-heading mt-2 text-2xl font-semibold tracking-tight text-[#F7F3E9] sm:text-3xl md:text-4xl"
          >
            Page Not Found
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-md text-balance text-sm leading-relaxed text-[#F7F3E9]/70 sm:text-base"
          >
            The page you're looking for might have been moved, renamed, or
            doesn't exist. Let's get you back on track.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link
                to="/"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#E63946] px-8 py-3 text-sm font-semibold text-[#F7F3E9] shadow-lg shadow-[#E63946]/25 transition-colors duration-200 hover:bg-[#F4A261] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261] sm:text-base"
              >
                <Home
                  className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}