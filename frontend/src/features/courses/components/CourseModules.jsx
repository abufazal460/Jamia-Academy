
export default function CourseModules({ modules }) {
  if (!modules || modules.length === 0) return null;

  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Course highlight
      </h3>

      <div className="flex flex-col gap-3">
        {modules.map((module) => (
          <div key={module.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h4 className="mt-1 text-sm font-semibold text-white sm:text-base">{module.title}</h4>
            {module.topics?.length > 0 && (
              <ul className="mt-2 flex flex-col flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400 sm:text-sm">
                {module.topics.map((topic) => (
                  <li key={topic} className="before:mr-1.5 before:content-['➤'] before:bg-gradient-to-r before:from-red-500 before:via-blue-500 before:to-white before:bg-clip-text before:text-transparent">
                    {topic}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
