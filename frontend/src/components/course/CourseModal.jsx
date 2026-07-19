import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import CourseDetails from "./CourseDetails";
import CourseModules from "./CourseModules";

// Content stagger — modal panel khulne ke baad andar ka content thoda
// der se, ek-ek karke fade+slide hota hai. Excessive nahi rakha —
// halka stagger hi "premium" feel deta hai, zyada distract karta hai.
const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

/**
 * CourseModal
 *
 * Full-screen premium gaming-style details modal. GSAP timeline poora
 * open/close sequence control karta hai (Motion React sirf andar ke
 * content stagger ke liye use hota hai) — modal jaisi precise, reversible
 * sequencing GSAP timelines me cleanest tarike se milti hai.
 *
 * Props:
 * - course:   active course object (null/undefined ho to kuch render nahi hota)
 * - isOpen:   modal open/close control
 * - onClose:  X button / ESC / backdrop click par call hota hai
 * - onEnroll: "Enroll Now" click par call hota hai (course, sath me) —
 *             WhatsApp message-building logic yahan nahi hai, parent handle karega
 */
export default function CourseModal({ course, isOpen, onClose, onEnroll }) {
  // Modal ko turant unmount nahi kar sakte jab close ho — pehle GSAP ki
  // reverse animation complete honi chahiye. Isliye ek alag "shouldRender"
  // state jo sirf animation khatam hone ke baad hi false hoti hai.
  const [shouldRender, setShouldRender] = useState(isOpen);

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const timelineRef = useRef(null);
  const titleId = useId();

  // Body scroll lock tab tak rehta hai jab tak modal DOM me hai —
  // close animation ke dauraan bhi background freeze rehna chahiye.
  useLockBodyScroll(shouldRender);

  // isOpen prop change ko GSAP action me translate karna
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return;
    }

    // Close request aayi — agar timeline maujood hai to use reverse karo,
    // reverse complete hone par hi actual unmount hoga (neeche wale effect me).
    if (timelineRef.current) {
      timelineRef.current.reverse();
    } else {
      setShouldRender(false);
    }
  }, [isOpen]);

  // shouldRender true hote hi (fresh mount) open timeline banao aur chalao
  useEffect(() => {
    if (!shouldRender || !overlayRef.current || !panelRef.current) return;

    const timeline = gsap.timeline({
      onReverseComplete: () => setShouldRender(false),
    });

    timeline
      .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.85, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
        "-=0.15"
      );

    timelineRef.current = timeline;

    // Cleanup — agar component achanak unmount ho (route change waghera),
    // running tween ko kill karo taaki orphaned animation/memory leak na ho.
    return () => {
      timeline.kill();
      timelineRef.current = null;
    };
  }, [shouldRender]);

  // ESC se close — listener sirf tab attach hota hai jab modal actually
  // render ho raha ho, taaki band modal ke liye bhi document listener na lage.
  useEffect(() => {
    if (!shouldRender) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose?.();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender, onClose]);

  if (!shouldRender || !course) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 opacity-0 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        // Sirf backdrop pe click hone par close — panel ke andar click bubble
        // hoke yahan tak na pahunche taaki accidental close na ho.
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={twMerge(
          // Mobile: full-screen, no rounding, halka blur (perf ke liye).
          // Desktop (sm+): centered card, bada border-radius, deep blur.
          "relative flex h-full w-full max-h-none flex-col overflow-hidden border-0 bg-neutral-950/95 opacity-0 backdrop-blur-md",
          "sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-2xl sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-[0_0_60px_rgba(168,85,247,0.25)] sm:backdrop-blur-xl"
        )}
      >
        {/* Neon gradient hairline border — static gradient (rotation nahi),
            isliye ye ek cheap absolutely-positioned layer hai, koi per-frame cost nahi. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden rounded-[inherit] p-px opacity-40 [background:linear-gradient(135deg,#ec4899,#a855f7,#22d3ee)] [mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] sm:block"
        />

        {/* Header */}
        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
          <h2 id={titleId} className="font-orbitron text-lg font-semibold text-white sm:text-xl">
            {course.title}
          </h2>

          {/* Close button — normal state simple X, hover pe rotate + scale + glow,
              default browser focus ring hataya, keyboard users ke liye custom
              focus-visible ring rakha (accessibility ke liye zaroori). */}
          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close course details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-all duration-300 hover:rotate-90 hover:scale-110 hover:border-purple-400/50 hover:text-white hover:shadow-[0_0_18px_rgba(168,85,247,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content area. Page ke peeche kabhi scroll nahi hota
            (body already useLockBodyScroll se locked hai) — sirf ye internal
            area scroll hota hai, custom gradient scrollbar ke saath. */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className={twMerge(
            "relative flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6",
            "[&::-webkit-scrollbar]:w-1.5",
            "[&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,#ec4899,#a855f7,#22d3ee)]"
          )}
        >
          <motion.div variants={itemVariants}>
            <img
              src={course.image?.hero ?? course.image?.thumbnail}
              alt={`${course.title} course banner`}
              loading="lazy"
              decoding="async"
              className="mb-6 h-40 w-full rounded-xl object-cover sm:h-56"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <CourseDetails course={course} />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6">
            <CourseModules modules={course.details?.modules} />
          </motion.div>

          {course.details?.skills?.length > 0 && (
            <motion.div variants={itemVariants} className="mt-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Skills You&apos;ll Gain
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.details.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enrollment Section — WhatsApp message-building logic ka data
              (fees, batch, duration...) waise hi course object me hai, lekin
              actual message-generation kaam parent (onEnroll) ka hai. */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-neutral-400">
              Fees:{" "}
              <span className="font-semibold text-white">
                {course.fees?.amount} {course.fees?.currency}
              </span>
            </p>
            <button
              type="button"
              onClick={() => onEnroll?.(course)}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              Enroll Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>,
    document.body
  );
}
