import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { MARQUEE_CTA_LABEL, MARQUEE_CTA_ROUTE } from '../../../data/marqueeData';
import { ctaTextVariants } from './marqueeVariants';

// react-router ke Link ko motion-enabled banaya — isse whileHover/
// whileFocus seedha anchor element par lagte hain (koi group-hover
// hack nahi chahiye).
const MotionLink = motion.create(Link);

/**
 * ExploreCoursesCTA
 * -----------------------------------------------------------------------
 * Premium "gaming" style pill button. Hover/focus par label upar slide
 * karke gayab hota hai aur neeche se wahi label dubara enter karta hai
 * (classic slide-reveal button effect) — sirf transform use hota hai,
 * isliye smooth aur GPU-friendly hai.
 * -----------------------------------------------------------------------
 */
const ExploreCoursesCTA = () => {
	const prefersReducedMotion = useReducedMotion();
	const activeState = prefersReducedMotion ? undefined : 'active';

	return (
		<MotionLink
			to={MARQUEE_CTA_ROUTE}
			initial="rest"
			whileHover={activeState}
			whileFocus={activeState}
			whileTap={{ scale: 0.97 }}
			className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-[#b19e7f]/60 bg-[#111] px-10 font-orbitron text-sm font-bold uppercase tracking-[0.2em] text-[#f8ecde] shadow-[0_0_0_0_rgba(177,158,127,0.6)] transition-shadow duration-300 hover:shadow-[0_0_32px_4px_rgba(177,158,127,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b19e7f] focus-visible:ring-offset-4"
			aria-label={MARQUEE_CTA_LABEL}
		>
			{/* Decorative shine sweep — purely visual, screen readers ke liye hidden */}
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-gradient-to-r from-transparent via-[#b19e7f]/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
			/>

			<span className="relative block h-[1.2em] overflow-hidden">
				<motion.span variants={ctaTextVariants} transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }} className="flex flex-col">
					<span className="block h-[1.2em] leading-[1.2em]">{MARQUEE_CTA_LABEL}</span>
					<span aria-hidden="true" className="block h-[1.2em] leading-[1.2em]">
						{MARQUEE_CTA_LABEL}
					</span>
				</motion.span>
			</span>
		</MotionLink>
	);
};

export default ExploreCoursesCTA;
