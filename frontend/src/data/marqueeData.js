import basicComputerImg from '../assets/marquee/img-1.jpeg';
import advanceComputerImg from '../assets/marquee/img-2.jpeg';
import fullStackImg from '../assets/marquee/img-4.jpeg';
import dataAnalyticsImg from '../assets/marquee/img-5.png';
import graphicDesignImg from '../assets/marquee/img-8.png';

/**
 * @typedef {Object} MarqueeCourse
 * @property {string} id          - Stable unique key (React list ke liye)
 * @property {string} slug        - Route/DOM-safe identifier
 * @property {string} title       - Display title
 * @property {string} description - Marquee scroll-text ke liye short highlights
 * @property {string} image       - Imported image asset
 * @property {string} alt         - Alt text
 */

/** @type {MarqueeCourse[]} */
export const marqueeCourses = [
	{
		id: 'basic-computer-course',
		slug: 'basic-computer-course',
		title: 'Basic Computer Course',
		description: 'MS Office • Internet • Typing • Certification',
		image: basicComputerImg,
		alt: 'Students learning basic computer course at Jamia Academy',
	},
	{
		id: 'advance-computer-course',
		slug: 'advance-computer-course',
		title: 'Advance Computer Course',
		description: 'Tally • Excel • Networking • Certification',
		image: advanceComputerImg,
		alt: 'Advance computer course classroom at Jamia Academy',
	},
	{
		id: 'full-stack-web-development',
		slug: 'full-stack-web-development',
		title: 'Full Stack Web Development',
		description: 'React • Node.js • MongoDB • Projects • Placement Assistance',
		image: fullStackImg,
		alt: 'Full stack web development course preview',
	},
	{
		id: 'data-analyst',
		slug: 'data-analyst',
		title: 'Data Analyst',
		description: 'Excel • SQL • Power BI • Python • Projects',
		image: dataAnalyticsImg,
		alt: 'Data analyst course preview',
	},
	{
		id: 'graphic-design',
		slug: 'graphic-design',
		title: 'Graphic Design',
		description: 'Photoshop • Illustrator • Canva • Portfolio',
		image: graphicDesignImg,
		alt: 'Graphic design course preview',
	},
];

export const MARQUEE_CTA_ROUTE = '/course';
export const MARQUEE_CTA_LABEL = 'Explore Courses';
