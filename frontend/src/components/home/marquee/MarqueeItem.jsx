import { memo, useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { imageRevealVariants, menuItemVariants } from './marqueeVariants';

// Scrolling text row ke liye kitni baar "title • description" repeat
// karna hai. Even number chahiye taaki -50% translate loop seamless
// dikhe — marquee.css ka comment dekho.
const DUPLICATE_COUNT = 4;

// Original Codrops demo mein `.menu__item-link` aur `.marquee span` dono
// EXACT same `--item-font-size` use karte the. Hum bhi ek hi clamp()
// value dono jagah reuse karte hain (DRY, no magic-number duplication).
const ITEM_FONT_SIZE = 'clamp(2rem,6vw,5rem)';

/**
 * MarqueeItem
 * -----------------------------------------------------------------------
 * Ek single course link — hover/focus par:
 *  1. Course title fade OUT hota hai (fast, 100ms — original timing).
 *  2. Uske peeche wala scrolling marquee text fade IN hota hai (slow,
 *     400ms) aur infinite horizontal scroll shuru ho jaata hai (animation
 *     PURELY marquee.css se aati hai — koi Tailwind `animate-[...]` class
 *     ya duplicate JS-driven animation nahi).
 *  3. Side mein course ki preview image reveal hoti hai (Framer Motion:
 *     opacity + rotate + slight scale, original translate3d math ke
 *     saath).
 * Hover khatam hone par sab kuch symmetrically reverse hota hai.
 *
 * Text-fade aur marquee-fade dono PURE CSS se driven hain (marquee.css:
 * `.menu__item:hover`/`:focus-within` descendant selectors) — isliye in
 * dono ke liye koi React state/re-render nahi chahiye. Sirf image ke
 * Framer Motion animate ke liye ek chhota sa `isActive` state rakha hai,
 * kyunki image par pointer-events none hai (wo khud hover detect nahi
 * kar sakti).
 * -----------------------------------------------------------------------
 */
const MarqueeItem = memo(function MarqueeItem({ course, prefersReducedMotion }) {
	const [isActive, setIsActive] = useState(false);

	const activate = useCallback(() => setIsActive(true), []);
	const deactivate = useCallback(() => setIsActive(false), []);

	const marqueeText = `${course.title} • ${course.description}`;

	return (
		<motion.li variants={menuItemVariants} className="menu__item relative w-full">
			<button
				type="button"
				className="relative w-full inline-block cursor-pointer bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b19e7f] focus-visible:ring-offset-4"
				onMouseEnter={activate}
				onMouseLeave={deactivate}
				onFocus={activate}
				onBlur={deactivate}
				aria-label={`${course.title} course`}
			>
				<span
					className="menu__item-link relative z-10 w-full inline-block whitespace-nowrap px-[1vw] font-[900] leading-[1.6] text-transparent transition-opacity duration-150 [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1.5px_#111]"
					style={{ fontSize: ITEM_FONT_SIZE }}
				>
					{course.title}
				</span>
			</button>

			{course.image && (
				<motion.img
					src={course.image}
					alt={course.alt || `${course.title} course preview`}
					width={500}
					height={360}
					loading="lazy"
					decoding="async"
					aria-hidden="true"
					className="pointer-events-none absolute left-full top-1/2 z-10 hidden bg-transparent object-contain will-change-transform md:block"
					style={{
						height: 'clamp(240px, 50vh, 400px)',
						width: 'auto',
						
					}}
					initial="rest"
					animate={isActive ? 'active' : 'rest'}
					variants={imageRevealVariants}
					transition={prefersReducedMotion ? { duration: 0 } : undefined}
				/>
			)}

			<div
				aria-hidden="true"
				className="pointer-events-none absolute left-0 top-0 z-0 w-full inset-0 overflow-hidden [mix-blend-mode:color-burn]"
			>
				<div
					className="marquee__inner relative flex w-max shrink-0 whitespace-nowrap font-[900] italic leading-[1.15]"
					style={{ fontSize: ITEM_FONT_SIZE , lineHeight:1.1}}
				>
					{Array.from({ length: DUPLICATE_COUNT }).map((_, index) => (
						<span
							key={`${course.id}-marquee-${index}`}
							className="bg-gradient-to-br from-[#3f2610] via-[#2f1c0c] to-[#472b13] bg-clip-text px-[1vw] text-transparent [-webkit-text-fill-color:transparent]"
						>
							{marqueeText}
						</span>
					))}
				</div>
			</div>
		</motion.li>
	);
});

export default MarqueeItem;
