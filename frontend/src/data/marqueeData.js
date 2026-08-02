/**
 * marqueeData.js
 * -----------------------------------------------------------------------
 * Ye file "Popular Courses" marquee ke liye single source of truth hai.
 * Koi bhi text ya image JSX mein hardcode nahi hai — sab kuch is file se
 * automatically derive hota hai.
 *
 * SCALING RULE (bahut important):
 * Naya course add karna ho (jaise "AutoCAD") to sirf ye karna hai:
 *   1. src/assets/marquee/autocad/ folder banao
 *   2. Usme 1.png, 2.png, 3.jpg (ya .jpeg/.webp) daalo
 * Bas. Koi JSX ya component file touch karne ki zaroorat nahi — Vite ka
 * import.meta.glob() automatically naya folder detect karke UI update
 * kar dega.
 * -----------------------------------------------------------------------
 */

// Vite build-time glob: "src/assets/marquee" ke andar har course-folder
// ki har image ko eagerly import karta hai. `eager: true` isliye taaki
// production build mein async chunk-splitting ka overhead na aaye —
// ye images already lightweight hain aur home page ke first fold ke
// paas hi use hote hain.
const courseImageModules = import.meta.glob('/src/assets/marquee/*/*.{png,jpg,jpeg,webp}', {
	eager: true,
	import: 'default',
});

// "basic-computer-course" -> "Basic Computer Course"
// Folder naam se human-readable title banane ke liye utility.
const slugToTitle = (slug) =>
	slug
		.split('-')
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

// Har image path se uska course-slug aur filename nikalte hain, taaki
// unko sahi course ke andar group aur sort kiya ja sake.
const PATH_PATTERN = /\/marquee\/([^/]+)\/([^/]+)$/;

const groupedBySlug = Object.entries(courseImageModules).reduce((acc, [path, src]) => {
	const match = PATH_PATTERN.exec(path);
	if (!match) return acc;

	const [, slug, filename] = match;

	if (!acc[slug]) acc[slug] = [];
	acc[slug].push({ filename, src });

	return acc;
}, {});

// Predefined display order — sirf initial 5 courses ke liye. Nayi
// course (jaise AutoCAD) is list mein na ho to wo automatically list
// ke end mein alphabetically add ho jayegi — koi crash ya missing
// course nahi hoga.
const DISPLAY_ORDER = [
	'basic-computer-course',
	'advance-computer-course',
	'full-stack-web-development',
	'data-analyst',
	'graphic-design',
];

const orderWeight = (slug) => {
	const index = DISPLAY_ORDER.indexOf(slug);
	return index === -1 ? DISPLAY_ORDER.length : index;
};

/**
 * @typedef {Object} MarqueeCourse
 * @property {string} id      - Stable unique key (React list ke liye)
 * @property {string} slug    - Folder-name se derive hua slug
 * @property {string} title   - Display title
 * @property {string[]} images - Sorted image URLs (1.png -> 2.png -> 3.jpg...)
 */

/** @type {MarqueeCourse[]} */
export const marqueeCourses = Object.entries(groupedBySlug)
	.map(([slug, images]) => ({
		id: slug,
		slug,
		title: slugToTitle(slug),
		images: images
			.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
			.map((image) => image.src),
	}))
	.sort((a, b) => {
		const weightDiff = orderWeight(a.slug) - orderWeight(b.slug);
		return weightDiff !== 0 ? weightDiff : a.title.localeCompare(b.title);
	});

// CTA button ke liye route — ek hi jagah se control hota hai.
export const MARQUEE_CTA_ROUTE = '/course';
export const MARQUEE_CTA_LABEL = 'Explore Courses';
