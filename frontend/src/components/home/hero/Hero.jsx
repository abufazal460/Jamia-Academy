import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import HeroBadge from "./HeroBadge";
import HeroHeading from "./HeroHeading";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import HeroPillars from "./HeroPillars";
import { useTypewriter } from "../../../hooks/useTypewriter";
import {
  heroTypewriter,
  heroIsoText,
  heroOrphanText,
  heroDescriptions,
} from "../../../data/heroData";
import { staggerContainer, fadeInUp } from "../../../utils/motionVariants";
import LiquidEther from "../LiquidEther";

/**
 * Hero.jsx
 * --------
 * Home page ka sabse important, pehla section. Original HTML ka structure
 * (badge -> heading -> typewriter subtitle -> ISO line -> orphan-free line
 * -> descriptions -> buttons -> stats -> pillars) yahan HUBAHU preserved
 * hai — bas ab har piece apna alag, reusable, testable component hai, aur
 * saara text heroData.js se aa raha hai (koi hardcoded string nahi).
 *
 * PATCH NOTES (production audit):
 *  1. Import ab "motion/react" se hai, "framer-motion" se nahi — project
 *     ka documented stack Motion React hai, isliye consistency zaroori thi.
 *  2. Root content wrapper `motion.main` se `motion.div` kar diya hai —
 *     ye <section> ke andar nested tha, jo invalid/duplicate <main>
 *     landmark bana raha tha (SEO aur screen-reader navigation dono ke
 *     liye galat). Page-level layout mein already ek <main> hona chahiye.
 *  3. `prefers-reduced-motion` support add kiya hai — typewriter loop ab
 *     us case mein poora static text turant dikha deta hai (koi flashing
 *     nahi).
 *  4. Typewriter subtitle ab ek sr-only full-text span + aria-hidden
 *     animated span mein split hai, taaki screen readers/SEO crawlers ko
 *     hamesha COMPLETE sentence mile, partial typed fragment nahi.
 *  5. "100% FREE" orphan line ka animation bug fix kiya — pehle usme
 *     `variants` aur ek literal `animate={{...}}` object dono the, jo
 *     Motion mein ek dusre ko override kar dete hain (parent stagger se
 *     entrance disconnect ho sakta tha). Ab dono ek hi variant mein merge
 *     hain.
 *
 * LIQUID BACKGROUND:
 * LiquidEther background component is deliverable ka part nahi hai, isliye
 * yahan sirf ek placeholder gradient layer rakha hai jiski jagah aap
 * `<LiquidEther />` import karke laga sakte hain. Do cheezein pakki rakhi
 * hain:
 *   1. Background layer `pointer-events-none` hai — kabhi bhi content ke
 *      clicks/hover ko block nahi karega.
 *   2. Content layer `z-10` pe hai — hamesha LiquidEther ke UPAR dikhega.
 *
 * STAGGER ANIMATION:
 * Poora content ek staggerContainer variant ke andar hai — isliye jab
 * page load hota hai, har section (badge, heading, subtitle...) ek ke
 * baad ek smoothly reveal hota hai, ek saath sab kuch pop nahi karta
 * (premium, polished entrance feel).
 */
function Hero() {
  // Reduced-motion preference — OS/browser level setting. Isko poore
  // component mein use karte hain taaki auto-playing infinite loops
  // (typewriter, glow pulse) motion-sensitive users ke liye disable ho
  // jayein, bina hover/tap se trigger hone waale micro-interactions ko
  // touch kiye (wo user-initiated hain, WCAG concern nahi).
  const prefersReducedMotion = useReducedMotion();

  // Typewriter hook — subtitle line ke liye letter-by-letter type/delete loop.
  // `disabled` pass kiya hai taaki reduced-motion users ke liye hook khud
  // hi turant poora text return kare, koi setTimeout loop chale hi nahi
  // (motion-safe + CPU/battery friendly dono).
  const typedSubtitle = useTypewriter(heroTypewriter.text, {
    typingSpeed: heroTypewriter.typingSpeed,
    deletingSpeed: heroTypewriter.deletingSpeed,
    pauseAfterTyping: heroTypewriter.pauseAfterTyping,
    pauseAfterDeleting: heroTypewriter.pauseAfterDeleting,
    disabled: prefersReducedMotion,
  });

  // ORPHAN LINE FIX: "100% FREE" line ke liye local variant — fadeInUp
  // jaisa hi entrance spring hai, lekin "visible" state ke ANDAR hi
  // textShadow ka infinite pulse bhi included hai. Pehle ye do alag props
  // (`variants` + literal `animate` object) ke through the, jo Motion
  // mein conflict karte hain — ek explicit `animate` target object parent
  // se propagate hone waale variant ko override kar deta hai, isliye line
  // ka apna entrance fade kabhi reliably fire nahi hota tha. Ab sab kuch
  // ek hi "visible" variant ke andar hai, isliye parent staggerContainer
  // se properly connected rehta hai.
  const orphanLineVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: prefersReducedMotion
        ? "0 0 14px rgba(250,204,21,0.35)"
        : [
            "0 0 10px rgba(250,204,21,0.25)",
            "0 0 22px rgba(250,204,21,0.5)",
            "0 0 10px rgba(250,204,21,0.25)",
          ],
      transition: {
        opacity: { type: "spring", stiffness: 120, damping: 16 },
        y: { type: "spring", stiffness: 120, damping: 16 },
        textShadow: prefersReducedMotion
          ? { duration: 0 }
          : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
      },
    },
  };

  return (
    <section
      aria-labelledby="hero-heading"
      // RESPONSIVE CONTAINER + SAFE AREA:
      // - px yahan clamp() se fluid hai (320px mini-phone se 4K tak same
      //   utility kaam karti hai, koi sudden breakpoint jump nahi hota).
      // - env(safe-area-inset-*) iPhone notch / landscape mode mein content
      //   ko screen ke rounded corners/notch ke peeche jaane se bachata hai.
      // - py bhi clamp() se fluid hai taaki chhoti height wali screens
      //   (landscape mobile) pe content crop na ho, aur bade screens pe
      //   khaali white-space bhi zyada na lage.
      className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center py-[clamp(3rem,10vh,6rem)] px-[max(1rem,env(safe-area-inset-left))]"
    >
      {/* ============ BACKGROUND LAYER (z-0) ============ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(160deg, #05081A 0%, #102060 60%, #151A30 100%)",
        }}
      >
        <LiquidEther 
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#5227FF"
          color1="#FF9FFC"
          color2="#B497CF"
        />
        {/* <LiquidEther /> -- yahan mount karein jab component ready ho.
            Tab tak yahi static gradient fallback background ki tarah kaam karega. */}
      </div>

      {/* ============ CONTENT LAYER (z-10) ============ */}
      {/* motion.div — pehle motion.main tha, jo <section> ke andar nested
          hone ki wajah se duplicate/invalid <main> landmark bana raha tha.
          Page-level <main> ka role yahan nahi hona chahiye. */}
      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate="visible"
        // CONTAINER SYSTEM:
        // max-w step by step badhta hai (mobile -> tablet -> laptop ->
        // large desktop -> 4K) taaki bade monitors pe text line-length
        // bahut lambi na ho jaaye (readability ke liye ek cap zaroori hai),
        // lekin phir bhi screen ka use ho — 4K pe max-w-6xl chhota reh
        // jaata, isliye 2xl/3xl steps add kiye hain.
        // px bhi breakpoint ke hisaab se badhta hai — mobile pe tight,
        // desktop pe zyada breathing room.
        className="relative z-10 mx-auto w-full max-w-xl text-center sm:max-w-2xl sm:px-2 md:max-w-4xl md:px-4 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl"
      >
        {/* 1. Badge */}
        <motion.div variants={fadeInUp}>
          <HeroBadge />
        </motion.div>

        {/* 2. Main heading — JAMIA ACADEMY */}
        <motion.div variants={fadeInUp}>
          <HeroHeading />
        </motion.div>

        {/* 3. Typewriter subtitle — normal white color, gradient hataya hai jaisa maanga tha */}
        <motion.h2
          variants={fadeInUp}
          // FLUID TYPOGRAPHY: clamp(min, preferred, max) use kiya hai taaki
          // font-size 320px se 3840px tak ek continuous curve pe smoothly
          // scale ho — Tailwind ke fixed text-lg/text-2xl steps mein 768px
          // pe achanak "jump" mehsoos hota tha, clamp() se wo khatam ho gaya.
          // min-h bhi clamp() hai — chhoti screens pe 2-line text ke liye
          // kam height reserve, badi screens pe zyada — isse typing/deleting
          // ke time layout shift (CLS) kabhi nahi hota, kisi bhi screen pe.
          className="mx-auto mb-3 max-w-[90%] px-2 text-[clamp(1rem,3.2vw,1.5rem)] font-semibold leading-relaxed text-white sm:max-w-2xl sm:px-0 md:mb-4 md:max-w-4xl min-h-[clamp(3rem,9vw,4.5rem)]"
        >
          {/* min-h fix rakha hai taaki typing/deleting ke time text ki
              line-height/height change hone se layout shift (CLS) na ho */}
          {/* SR-ONLY FULL TEXT: screen readers aur SEO crawlers ko hamesha
              COMPLETE subtitle sentence milna chahiye, chahe visual mein
              abhi typewriter effect ki wajah se sirf partial text dikh
              raha ho. Neeche waala visible span aria-hidden hai isliye
              screen reader use ignore karega (warna user ko har letter
              change pe garbled partial announcements sunayi dete). */}
          <span className="sr-only">{heroTypewriter.text}</span>
          <span aria-hidden="true">
            {typedSubtitle}
            {!prefersReducedMotion && (
              <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse align-middle bg-sky-300" />
            )}
          </span>
        </motion.h2>

        {/* 4. ISO certification line — realistic (non-neon) green + halka glow */}
        <motion.p
          variants={fadeInUp}
          // clamp() se font-size fluid hai — mini phones (320px) pe bhi
          // text crop/overflow nahi hota, aur 4K pe bhi bahut chhota nahi
          // dikhta. mb bhi do steps mein scale hoti hai (mobile vs md+).
          className="mb-4 px-3 text-[clamp(0.8125rem,2.4vw,1.125rem)] font-bold transition-[filter] duration-300 hover:brightness-125 sm:px-0 md:mb-6"
          style={{ color: "#34d399", textShadow: "0 0 12px rgba(52,211,153,0.35)" }}
        >
          {heroIsoText.text}
        </motion.p>

        {/* 5. Orphan free courses line — premium yellow, pulsing glow, underline animation */}
        <motion.p
          variants={orphanLineVariant}
          // Fluid clamp() typography + horizontal padding taaki 320px pe
          // "Professional & Technical Courses" jaisa lamba phrase kisi
          // bhi word ko mid-word crop na kare, balanced wrap ho.
          className="mb-6 px-3 text-[clamp(1rem,3.6vw,1.5rem)] font-bold text-yellow-400 sm:px-0 md:mb-8"
        >
          {heroOrphanText.prefix}{" "}
          <span className="underline decoration-yellow-400 underline-offset-4 hover:brightness-125 transition-[filter] duration-200">
            {heroOrphanText.highlight}
          </span>{" "}
          {heroOrphanText.suffix}
        </motion.p>

        {/* 6. Description paragraphs — heroDescriptions array pe map(), reusable component */}
        <motion.div
          variants={fadeInUp}
          className="mx-auto mb-8 max-w-3xl space-y-2 px-3 sm:px-4 md:mb-10"
        >
          {heroDescriptions.map((desc) => (
            <HeroDescription key={desc.id} text={desc.text} tone={desc.tone} />
          ))}
        </motion.div>

        {/* 7. CTA Buttons */}
        <motion.div variants={fadeInUp}>
          <HeroButtons />
        </motion.div>

        {/* hr ka margin fluid clamp() hai — chhoti screens pe sections ke
            beech itni jagah nahi chahiye jitni bade desktop pe */}
        <hr className="my-[clamp(1.5rem,4vw,2rem)] border-slate-800/80" />

        {/* 8. Stats grid */}
        <motion.div variants={fadeInUp}>
          <HeroStats />
        </motion.div>

        {/* 9. Academy pillars */}
        <motion.div variants={fadeInUp}>
          <HeroPillars />
        </motion.div>
      </motion.div>
    </section>
  );
}

// React.memo — agar Hero ke parent (Home page) mein koi unrelated state
// change ho aur re-render trigger ho, to Hero khud ko re-render nahi
// karega jab tak iske apne props change na hon (yahan koi props hi nahi
// hain, isliye ye effectively static-rendered rahega)
export default memo(Hero);