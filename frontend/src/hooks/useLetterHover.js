/**
 * useLetterHover
 * --------------
 * Description paragraphs mein har letter ko hover karne pe jo animation
 * chahiye (scale up + halka upar move), uska reusable variant config ye
 * hook return karta hai — taaki HeroDescription (ya future mein kahin
 * aur bhi) ye same behaviour bina duplicate object likhe use kar sake.
 *
 * IMPORTANT DESIGN DECISION (No Layout Shift):
 * Hum yahan literal font-weight nahi badal rahe. Font-weight change karne
 * se glyph ki actual width change hoti hai, jisse letter ke box ki width
 * badhti/ghatti hai aur baaju wale letters shift ho jaate hain (CLS/layout
 * shift create hota hai — jo brief mein explicitly mana kiya gaya hai).
 * Iski jagah hum "scale" transform use kar rahe hain, jo GPU-accelerated
 * hai (compositor layer pe chalta hai, reflow trigger nahi karta) aur
 * visually letter ko "bold/prominent" hone ka illusion bhi de deta hai.
 */
export function useLetterHover() {
  const variants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -2,
      transition: { type: "spring", stiffness: 350, damping: 12 },
    },
  };

  return { variants };
}
