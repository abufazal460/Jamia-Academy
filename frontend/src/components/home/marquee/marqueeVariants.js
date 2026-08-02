/**
 * marqueeVariants.js
 * -----------------------------------------------------------------------
 * Sab Framer Motion variants ek jagah centralize kiye hain (Fazal ke
 * existing pattern ke mutabik — variants.js jaisa shared preset file).
 * Sirf transform/opacity properties use ki gayi hain taaki GPU-accelerated
 * rahe aur layout thrashing na ho.
 * -----------------------------------------------------------------------
 */

// Poore <ul> list ke liye — scroll mein aane par stagger ke saath
// children (menu items) ko reveal karta hai.
export const menuContainerVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
			staggerChildren: 0.06,
		},
	},
};

// Har individual menu item (course link) ke liye entrance animation.
export const menuItemVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

// Hover/focus par side mein jo preview image reveal hoti hai uske liye.
// opacity 0->1 aur scale .85->1 — spec ke mutabik.
export const imageRevealVariants = {
	rest: { opacity: 0, scale: 0.85 },
	active: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
	},
};

// CTA button ke andar text jo hover par upar slide hota hai aur naya
// text neeche se enter karta hai.
export const ctaTextVariants = {
	rest: { y: 0 },
	active: { y: '-50%' },
};
