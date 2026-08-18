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

  const { description, duration, level, batch, fees, eligibility, details } = course;

  return (
    <div className={twMerge("flex flex-col gap-6")}>
      <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">{description}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <InfoChip label="Duration" value={duration ? `${duration.value} ${duration.unit}` : null} />
        <InfoChip label="Level" value={level?.name} />
        <InfoChip label="Batch" value={batch?.name} />
        <InfoChip label="Fees" value={fees ? `${fees.amount} ${fees.currency}` : null} />
      </div>

      {eligibility?.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Eligibility
          </h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-neutral-300">
            {eligibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {details?.certificate && (
        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Certificate
          </h3>
          <p className="text-sm text-neutral-300">{details.certificate}</p>
        </section>
      )}

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
