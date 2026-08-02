import { memo, useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { imageRevealVariants, menuItemVariants } from './marqueeVariants';

// Scrolling text row ke liye kitni baar title repeat karna hai. 2 sets
// (yaha DUPLICATE_COUNT/2 each) chahiye taaki -50% translate loop
// seamless dikhe — MarqueeItem CSS (marquee.css) ka comment dekho.
const DUPLICATE_COUNT = 8;

/**
 * MarqueeItem
 * -----------------------------------------------------------------------
 * Ek single course link — hover/focus par:
 *  1. Side mein course ki preview image reveal hoti hai (opacity+scale).
 *  2. Background mein course-title ka horizontal scrolling marquee text
 *     dikhta/chalta hai (jaise original demo mein tha).
 *
 * Poori tarah mouse (hover) aur keyboard (focus) dono se accessible hai.
 * Touch devices ke liye tap bhi toggle karta hai (kyunki hover available
 * nahi hota).
 * -----------------------------------------------------------------------
 */
const MarqueeItem = memo(function MarqueeItem({ course, prefersReducedMotion }) {
	const [isActive, setIsActive] = useState(false);

	const activate = useCallback(() => setIsActive(true), []);
	const deactivate = useCallback(() => setIsActive(false), []);
	const toggleForTouch = useCallback(() => setIsActive((prev) => !prev), []);

	const previewImage = course.images[0];
	const showMotionScroll = !prefersReducedMotion;

	return (
		<motion.li variants={menuItemVariants} className="menu__item relative px-[3vw] py-1 sm:px-[4vw] sm:py-2">
			<button
				type="button"
				className="menu__item-link relative inline-block cursor-pointer bg-transparent p-0 font-[900] leading-[1.1] text-transparent [-webkit-text-stroke:1.5px_#111] transition-opacity duration-300 hover:opacity-70 focus-visible:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b19e7f] focus-visible:ring-offset-4"
				style={{ fontSize: 'clamp(2.25rem, 9vw, 6rem)' }}
				onMouseEnter={activate}
				onMouseLeave={deactivate}
				onFocus={activate}
				onBlur={deactivate}
				onClick={toggleForTouch}
				aria-label={`${course.title} course`}
			>
				{course.title}
			</button>

			{previewImage && (
				<motion.img
					src={previewImage}
					alt={`${course.title} course preview`}
					width={320}
					height={220}
					loading="lazy"
					decoding="async"
					aria-hidden="true"
					className="pointer-events-none absolute left-full top-1/2 hidden h-[38vh] max-h-[280px] w-auto -translate-y-1/2 rounded-2xl object-cover shadow-2xl md:block"
					style={{ marginLeft: '2vw' }}
					initial="rest"
					animate={showMotionScroll && isActive ? 'active' : 'rest'}
					variants={imageRevealVariants}
				/>
			)}

			<div
				aria-hidden="true"
				className={`pointer-events-none absolute inset-0 -z-10 flex items-center overflow-hidden opacity-0 [mix-blend-mode:color-burn] transition-opacity duration-300 ${
					isActive ? 'opacity-100' : ''
				}`}
			>
				<div
					className={`flex w-max shrink-0 gap-[2vw] whitespace-nowrap font-[900] italic ${
						showMotionScroll ? 'animate-[marquee-scroll_16s_linear_infinite]' : ''
					} ${showMotionScroll && isActive ? '[animation-play-state:running]' : '[animation-play-state:paused]'}`}
					style={{ fontSize: 'clamp(2.25rem, 9vw, 6rem)' }}
				>
					{Array.from({ length: DUPLICATE_COUNT }).map((_, index) => (
						<span key={`${course.id}-marquee-${index}`}>{course.title}</span>
					))}
				</div>
			</div>
		</motion.li>
	);
});

export default MarqueeItem;
