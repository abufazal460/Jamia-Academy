import { twMerge } from "tailwind-merge";

function InfoChip({ label, value }) {
  if (!value) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export default function CourseDetails({ course }) {
  if (!course) return null;

  const { description, duration, level, details } = course;

  return (
    <div className={twMerge("flex flex-col gap-6")}>
      <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">{description}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <InfoChip label="Duration" value={duration ? `${duration.value} ${duration.unit}` : null} />
        <InfoChip label="Level" value={level?.name} />
      </div>

      {details?.careerOptions?.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Career Options
          </h3>
          <div className="flex flex-wrap gap-2">
            {details.careerOptions.map((option) => (
              <span
                key={option}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200"
              >
                {option}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
