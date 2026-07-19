/**
 * CourseModules
 *
 * course.details.modules array ko dynamically render karta hai — chahe
 * ek module ho ya das, ye component bina badle sabko handle kar leta hai.
 * Module number (Module 1, Module 2...) bhi array index se generate hota
 * hai, data me hardcode nahi karna padta.
 *
 * Props:
 * - modules: [{ title: string, topics: string[] }]
 */
export default function CourseModules({ modules }) {
  if (!modules || modules.length === 0) return null;

  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Course Modules
      </h3>

      <div className="flex flex-col gap-3">
        {modules.map((module, index) => (
          <div key={module.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium text-purple-300">Module {index + 1}</p>
            <h4 className="mt-1 text-sm font-semibold text-white sm:text-base">{module.title}</h4>

            {module.topics?.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400 sm:text-sm">
                {module.topics.map((topic) => (
                  <li key={topic} className="before:mr-1.5 before:text-purple-400 before:content-['•']">
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
