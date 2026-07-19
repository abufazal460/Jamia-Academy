import { twMerge } from "tailwind-merge";
import { openWhatsApp } from "../../utils/whatsapp";

/**
 * EnrollButton
 *
 * Course object props se leta hai (koi bhi CourseCard/CourseModal/kahin
 * bhi se render ho sakta hai) — isliye button khud koi course-specific
 * data nahi jaanta, sirf jo props me diya jaaye wahi use karta hai.
 * Isi wajah se ye component fully reusable hai.
 *
 * Props:
 * - course:   WhatsApp message ke liye zaroori course object
 * - onClick:  optional — agar parent ko enroll-click track/observe karna ho
 *             (analytics, modal close waghera), to WhatsApp khulne se
 *             pehle ye call hota hai
 * - className
 */
export default function EnrollButton({ course, onClick, className = "" }) {
  const handleClick = () => {
    onClick?.(course);
    openWhatsApp(course);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Enroll now for ${course?.title ?? "this course"} via WhatsApp`}
      className={twMerge(
        "group/enroll relative overflow-hidden rounded-lg border border-transparent px-5 py-2.5 text-xs font-semibold tracking-wide text-white",
        // Glassy gradient background — premium gaming feel, default me koi shadow nahi
        "bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-cyan-500/90 backdrop-blur-md",
        "shadow-none transition-[box-shadow,transform] duration-300 ease-out",
        // Hover: neon glow + halka scale — dono transform/opacity-friendly properties hain
        "hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(168,85,247,0.5)]",
        // Default browser focus ring hataya, keyboard accessibility ke liye custom ring rakha
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        className
      )}
    >
      {/* Text-swap animation: "Enroll Now" aur "Join Course" ek hi fixed-height
          box ke andar stacked hain. Hover pe purani text upar slide karke
          gayab hoti hai, nayi neeche se aa jaati hai — sirf transform/opacity
          animate ho raha hai, koi layout shift nahi. */}
      <span className="relative block h-4 overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover/enroll:-translate-y-full">
          Enroll Now
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover/enroll:translate-y-0"
        >
          Join Course
        </span>
      </span>
    </button>
  );
}
