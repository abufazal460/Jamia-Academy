import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useLockBodyScroll } from "../../../hooks/useLockBodyScroll";
import CourseDetails from "./CourseDetails";
import CourseModules from "./CourseModules";

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function CourseModal({ course, isOpen, onClose, onEnroll }) {

  const [shouldRender, setShouldRender] = useState(isOpen);

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const timelineRef = useRef(null);
  const titleId = useId();

  useLockBodyScroll(shouldRender);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return;
    }

    if (timelineRef.current) {
      timelineRef.current.reverse();
    } else {
      setShouldRender(false);
    }
  }, [isOpen]);

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

    return () => {
      timeline.kill();
      timelineRef.current = null;
    };
  }, [shouldRender]);

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

        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={twMerge(

          "relative flex h-full w-full max-h-none flex-col overflow-hidden border-0 bg-neutral-950/95 opacity-0 backdrop-blur-md",
          "sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-2xl sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-[0_0_60px_rgba(168,85,247,0.25)] sm:backdrop-blur-xl"
        )}
      >
   
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden rounded-[inherit] p-px opacity-40 [background:linear-gradient(135deg,#ec4899,#a855f7,#22d3ee)] [mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] sm:block"
        />

        {/* Header */}
        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
          <h2 id={titleId} className="font-orbitron text-lg font-semibold text-white sm:text-xl">
            {course.title}
          </h2>

          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close course details"
            className="flex h-9 w-9 shrink-0 items-center cursor-pointer justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-all duration-300 hover:rotate-90 hover:scale-110 hover:border-purple-400/50 hover:text-white hover:shadow-[0_0_18px_rgba(168,85,247,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

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

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
           
            <button
              type="button"
              onClick={() => onEnroll?.(course)}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold cursor-pointer text-neutral-950 transition-shadow duration-300 hover:shadow-[0_0_22px_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
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