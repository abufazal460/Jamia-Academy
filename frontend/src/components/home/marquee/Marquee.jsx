import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { marqueeCourses } from '../../../data/marqueeData';
import MarqueeItem from './MarqueeItem';
import ExploreCoursesCTA from './ExploreCoursesCTA';
import { menuContainerVariants } from './marqueeVariants';
import './marquee.css';

/**
 * Marquee (Popular Courses section)
 * -----------------------------------------------------------------------
 * Home page ka section jo Hero ke turant neeche baithta hai. Poora
 * content (heading ke alawa) src/data/marqueeData.js se aata hai —
 * yaha koi course-name ya image path hardcode nahi hai.
 *
 * Layout:
 *   1. "Popular Courses" heading
 *   2. Interactive marquee list (hover/focus par image + scroll text)
 *   3. Centered "Explore Courses" CTA -> /course
 * -----------------------------------------------------------------------
 */
const Marquee = () => {
	const headingId = useId();
	const prefersReducedMotion = useReducedMotion();

	if (marqueeCourses.length === 0) return null;

	return (
		<section
			aria-labelledby={headingId}
			className="relative overflow-hidden bg-[var(--color-bg,#f8ecde)] px-[5vw] py-[8vh] text-[var(--color-text,#111)] sm:py-[10vh]"
		>
			<h2
				id={headingId}
				className="text-center font-orbitron font-bold tracking-tight text-[#111]"
				style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
			>
				Popular Courses
			</h2>

			<motion.ul
				role="list"
				initial={prefersReducedMotion ? 'visible' : 'hidden'}
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={menuContainerVariants}
				className="menu m-0 flex list-none flex-col items-center gap-1 p-0 py-[6vh] sm:gap-2"
			>
				{marqueeCourses.map((course) => (
					<MarqueeItem key={course.id} course={course} prefersReducedMotion={prefersReducedMotion} />
				))}
			</motion.ul>

			<div className="flex justify-center">
				<ExploreCoursesCTA />
			</div>
		</section>
	);
};

export default Marquee;
