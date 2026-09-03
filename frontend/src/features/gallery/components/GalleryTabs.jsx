import { memo } from "react";
import { motion } from "motion/react";

const TABS = [
  { key: "all", label: "All" },
  { key: "classroom", label: "Classroom" },
  { key: "event", label: "Event" },
  { key: "tour", label: "Tour" },
];

function GalleryTabsBase({ activeTab, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Gallery categories"
      className="flex w-full flex-wrap items-center justify-center gap-2 rounded-2xl bg-slate-100/80 p-2 backdrop-blur"
    >
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer sm:text-base ${isActive
                ? "text-white"
                : "text-slate-600 hover:bg-white/70 hover:text-slate-900 cursor-pointer"
              }`}
          >
            {isActive && (
              <motion.span
                layoutId="gallery-active-tab-pill"
                className="absolute inset-0 -z-10 rounded-xl bg-slate-900 shadow-lg"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block"
            >
              {tab.label}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}

export const GalleryTabs = memo(GalleryTabsBase);