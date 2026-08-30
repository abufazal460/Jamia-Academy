import { twMerge } from "tailwind-merge";
import { openWhatsApp } from "../../../shared/utils/whatsapp";

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
        "group/enroll relative overflow-hidden rounded-lg  border border-transparent px-5 py-2.5 text-xs font-semibold tracking-wide text-white",
        "bg-gradient-to-r from-pink-500/90 via-purple-500/90  to-cyan-500/90 backdrop-blur-md",
        "shadow-none transition-[box-shadow,transform] duration-300  ease-out",
        "hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(168,85,247,0.5)]",
        className
      )}
    >
      
      <span className="relative block h-4 overflow-hidden ">
        <span className="block transition-transform duration-300  ease-out group-hover/enroll:-translate-y-full">
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
