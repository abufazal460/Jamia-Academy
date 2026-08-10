import { memo } from "react";
import { useMemo } from "react";
import { motion , useReducedMotion } from "motion/react";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import HeroPillars from "./HeroPillars";
import {
  heroIsoText,
  heroOrphanText,
  heroDescriptions,
} from "../../../data/heroData";
import HeroTypewriterSubtitle  from "./HeroTypewriterSubtitle"
import { staggerContainer, fadeInUp } from "../../../utils/motionVariants";
import LiquidEther from "./LiquidEther";

/**
 * Hero.jsx
 * --------
 * Home page ka sabse important, pehla section. Original HTML ka structure
 * (badge -> heading -> typewriter subtitle -> ISO line -> orphan-free line
 * -> descriptions -> buttons -> stats -> pillars) yahan HUBAHU preserved
 * hai — bas ab har piece apna alag, reusable, testable component hai, aur
 * saara text heroData.js se aa raha hai (koi hardcoded string nahi).
 *
 * PATCH NOTES (production audit — semantics/SEO/reduced-motion):
 *  1. Import "motion/react" se hai (project ka documented stack Motion
 *     React hai, "framer-motion" nahi).
 *  2. Root content wrapper `motion.div` hai (pehle galti se `motion.main`
 *     tha) — <section> ke andar nested <main> invalid/duplicate landmark
 *     banata, jo SEO aur screen-reader navigation ke liye galat hai.
 *  3. `prefers-reduced-motion` ka respect kiya gaya hai poore Hero mein.
 *
 * PATCH NOTES (performance audit):
 *  4. TYPEWRITER ISOLATION — `useTypewriter` hook (jo har 25-45ms mein
 *     state update karta hai) PEHLE yahin Hero.jsx ke andar directly call
 *     ho raha tha. Iski wajah se poora Hero component ~30 baar/second
 *     re-render ho raha tha, forever — jisse "100% FREE" line ka infinite
 *     glow animation baar baar restart/glitch hota tha (kyunki uska
 *     variant object har render pe naya reference ban raha tha). FIX:
 *     typing state ab `<HeroTypewriterSubtitle />` naam ke ek chhote,
 *     isolated leaf component mein hai — ab sirf WAHI component har
 *     25-45ms pe re-render hota hai, Hero khud sirf ek baar mount pe
 *     render hota hai.
 *  5. `orphanLineVariant` ab `useMemo` mein hai — is component ke andar
 *     baaki koi state nahi bacha jo baar baar change ho (typewriter hata
 *     diya gaya), lekin `prefersReducedMotion` legitimately kabhi
 *     (rarely) change ho sakta hai — useMemo isliye rakha hai taaki us
 *     ek case mein bhi ye object stable rahe aur infinite textShadow loop
 *     ko spurious "restart" signal na mile.
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
 * (premium, polished entrance feel). Typewriter ab alag file mein hone ke
 * baad bhi Motion ka variants context React Context ke through hi
 * propagate hota hai (tree ke through, file boundary se nahi), isliye
 * stagger sequence mein uski position bilkul same rehti hai.
 */
function Hero() {
  // Reduced-motion preference — OS/browser level setting. Isko poore
  // component mein use karte hain taaki auto-playing infinite loops
  // (glow pulse) motion-sensitive users ke liye disable ho jayein, bina
  // hover/tap se trigger hone waale micro-interactions ko touch kiye.
  const prefersReducedMotion = useReducedMotion();

  // ORPHAN LINE FIX: "100% FREE" line ke liye local variant — fadeInUp
  // jaisa hi entrance spring hai, lekin "visible" state ke ANDAR hi
  // textShadow ka infinite pulse bhi included hai (isse "variants" +
  // separate literal "animate" object ka purana conflict bug fix hota
  // hai). useMemo mein wrap kiya hai taaki reference sirf tab badle jab
  // `prefersReducedMotion` genuinely change ho — Motion ke `repeat:
  // Infinity` wale animation ko baar baar "naya target" na mile.
  const orphanLineVariant = useMemo(
    () => ({
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
            : {
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              },
        },
      },
    }),
    [prefersReducedMotion],
  );

  return (
    <section
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
          background:
            "linear-gradient(160deg, #05081A 0%, #102060 60%, #151A30 100%)",
        }}
      >
        <LiquidEther
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={20}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.9}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
          color0="#FFFFFF"
          color1="#FFFFFF"
          color2="#FFFFFF"
        />
      </div>

      {/* ============ CONTENT LAYER (z-10) ============ */}
      {/* motion.div — <section> ke andar nested duplicate/invalid <main>
          landmark ban gaya tha, isliye motion.main use nahi kar rahe. */}
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

        {/* 3. Typewriter subtitle — PERFORMANCE ISOLATED component. Iske
            andar typing state hai, isliye ye har 25-45ms pe khud
            re-render hota hai, lekin Hero.jsx (ye poora component) ab
            uss chakkar mein bilkul nahi padta — ye khud sirf mount pe ek
            baar render hota hai. Neeche waale saare siblings (buttons,
            stats, pillars) bhi isliye bilkul untouched rehte hain jab
            subtitle type/delete ho raha hota hai. */}
        <HeroTypewriterSubtitle />

        {/* 4. ISO certification line — realistic (non-neon) green + halka glow */}
        <motion.p
          variants={fadeInUp}
          // clamp() se font-size fluid hai — mini phones (320px) pe bhi
          // text crop/overflow nahi hota, aur 4K pe bhi bahut chhota nahi
          // dikhta. mb bhi do steps mein scale hoti hai (mobile vs md+).
          className="mb-4 px-3 text-[clamp(0.8125rem,2.4vw,1.125rem)] font-bold transition-[filter] duration-300 hover:brightness-125 sm:px-0 md:mb-6"
          style={{
            color: "#34d399",
            textShadow: "0 0 12px rgba(52,211,153,0.35)",
          }}
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
