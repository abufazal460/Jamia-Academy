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
// ============================================================
// DESKTOP image (md aur upar) — link ke SIDE mein float hoti hai.
// ============================================================
export const imageRevealVariants = {
	rest: {
		opacity: 0,       // shuru mein invisible
		scale: 0.95,      // ⬆ badhao (e.g. 0.99) = entrance subtle hoga
		                   // ⬇ ghatao (e.g. 0.7)  = entrance dramatic "zoom-in" hoga
		rotate: 0,
		x: 'calc(-100% - 6vw)',
		// ye value image ki apni KHUD ki width ke against anchor karti hai
		// (link ki width ke against nahi) — isiliye title chahe chhota ho
		// ya bada, image kabhi bhi viewport se bahar nahi jaati.
		// `6vw` ⬆ badhao = image aur DUR (left) chali jaayegi link se
		// `6vw` ⬇ ghatao = image link ke aur PAAS/overlap hogi
		y: 'calc(-30% + 20px)',
		// rest state mein image thodi "neeche" se settle hoti hai (20px)
		// ⬆ 20px badhao (e.g. 60px) = image zyada dur se slide-in karegi (dramatic)
		// ⬇ 0 kar do = koi settle-motion nahi, sirf fade+scale hoga
	},
	active: {
		opacity: 1,
		scale: 1,
		rotate: 4,
		// tilt angle (degrees). ⬆ badhao (e.g. 10) = zyada tedhi/dramatic
		// ⬇ ghatao (e.g. 1) = subtle, professional look
		// negative karo (e.g. -4) = OPPOSITE direction tilt
		x: 'calc(-100% - 6vw)', // rest jaisa hi — position fix rehti hai
		y: '-30%',
		// vertical anchor. -30% ka matlab: image apni KHUD ki height ka
		// 30% upar shift. -50% karoge = perfectly vertical-center.
		// 0% karoge = image ka top edge link ke center se align hoga.
		transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
		// duration ⬆ badhao (e.g. 0.8) = reveal slow/buttery smooth hoga
		// duration ⬇ ghatao (e.g. 0.15) = reveal snappy/turant hoga
	},
};

// ============================================================
// MOBILE image (md se neeche) — title ke UPAR, center mein dikhti hai.
// Koi x/side-anchor math nahi chahiye kyunki horizontal centering
// MarqueeItem.jsx ka static wrapper div karega (Framer isse touch
// nahi karta, isliye conflict nahi hota).
// ============================================================
export const imageRevealVariantsMobile = {
	rest: {
		opacity: 0,
		scale: 0.92,       // desktop wale jaisa hi effect, chhota range rakha
		                    // hai kyunki mobile par image already choti hai
		rotate: 0,
		y: 16,
		// "settle" offset — ⬆ badhao (e.g. 40) = neeche se zyada dur se
		// slide-in aayegi. ⬇ 0 kar do = sirf fade+scale, koi slide nahi.
	},
	active: {
		opacity: 1,
		scale: 1,
		rotate: -2,
		// mobile tilt — desktop se ULTA sign (-2) rakha hai taaki dono
		// visually thoda alag feel den. Sign badal doge (2) = same
		// direction ho jaayegi jaise desktop.
		y: 0,
		transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
	},
};

// CTA button ke andar text jo hover par upar slide hota hai aur naya
// text neeche se enter karta hai.
export const ctaTextVariants = {
	rest: { y: 0 },
	active: { y: '-50%' },
};
