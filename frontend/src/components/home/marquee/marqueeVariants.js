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
// Original Codrops demo ka exact transform-math:
//   rest:   translate3d(calc(-100% - 6vw), -30%, 0) translate3d(0, 20px, 0)
//   active: translate3d(calc(-100% - 6vw), -30%, 0) rotate3d(0, 0, 1, 4deg)
// (do consecutive translate3d() sirf ek combined translate ke barabar hain
// kyunki translations commute — isliye x/y yaha single values mein likhe
// hain.) x hamesha same rehta hai — ye hi wo cheez hai jo image ko kabhi
// bhi link-width ya viewport ke hisaab se overflow nahi hone deti, kyunki
// ye apni khud ki width ke against anchor hoti hai, link ki nahi.
export const imageRevealVariants = {
	rest: { opacity: 0, scale: 0.95, rotate: 0, x: 'calc(-100% - 6vw)', y: 'calc(-30% + 20px)' },
	active: {
		opacity: 1,
		scale: 1,
		rotate: 4,
		x: 'calc(-100% - 6vw)',
		y: '-30%',
		transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
	},
};

// CTA button ke andar text jo hover par upar slide hota hai aur naya
// text neeche se enter karta hai.
export const ctaTextVariants = {
	rest: { y: 0 },
	active: { y: '-50%' },
};
