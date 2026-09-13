import React, { useRef, useState } from "react";

import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageOff, GraduationCap, BadgeCheck } from "lucide-react";

import useGSAPAnimation from "../../../shared/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../shared/hooks/usePrefersReducedMotion";

import { cn, safeArray } from "../../../shared/utils/helpers";
import { getImageProps } from "../../../shared/utils/image";

import { faculty } from "../data/about.data";
import { gsapEase } from "../../../shared/motion/config";

gsap.registerPlugin(ScrollTrigger);

const FacultyCard = ({ member, prefersReducedMotion }) => {
  const [imageError, setImageError] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const expertiseList = safeArray(member?.expertise);

  return (
    <motion.div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl",
        "border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_10px_32px_rgba(0,0,0,0.18)]"
      )}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -8,
              scale: 1.03,
              boxShadow: "0 20px 46px rgba(0,0,0,0.3)",
            }
      }
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {/* PROFILE IMAGE */}
      <div className="relative m-4 mb-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#E63946] via-[#F4A261] to-[#2A9D8F] p-[2.5px]">
        <div className="relative overflow-hidden rounded-[14px] bg-white/5">
          {!imageError ? (
            <motion.img
              {...getImageProps(
                member?.image,
                `${member?.name || "Faculty member"} profile photo`,
                false
              )}
              onError={() => setImageError(true)}
              className="aspect-square w-full object-cover"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: isActive ? 1.08 : 1,
                    }
              }
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            />
          ) : (
            <div
              role="img"
              aria-label={`${member?.name || "Faculty"} image unavailable`}
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 bg-white/5 text-white/40"
            >
              <ImageOff size={26} aria-hidden="true" />

              <span className="px-2 text-center text-[11px]">
                Faculty Image Unavailable
              </span>
            </div>
          )}
        </div>
      </div>

      {/* INFORMATION */}
      <div className="flex flex-1 flex-col gap-1.5 p-5 pt-4">
        <h3 className="text-base font-bold text-white sm:text-lg">
          {member?.name || "Faculty Member"}
        </h3>

        <p className="text-xs font-medium text-[#F4A261] sm:text-sm">
          {member?.title || member?.designation || "Faculty"}
        </p>

        {member?.qualification && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/60">
            <GraduationCap
              size={13}
              className="shrink-0"
              aria-hidden="true"
            />

            <span>
              {member.qualification}
              {member?.br && (
                <>
                  <br />
                  {member.br}
                </>
              )}
            </span>
          </div>
        )}

        {member?.experience && (
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <BadgeCheck
              size={13}
              className="shrink-0"
              aria-hidden="true"
            />

            <span>{member.experience} Experience</span>
          </div>
        )}

        {expertiseList.length > 0 && (
          <motion.div
            className="mt-2 overflow-hidden"
            initial={false}
            animate={{
              height:
                isActive || prefersReducedMotion ? "auto" : 0,
              opacity:
                isActive || prefersReducedMotion ? 1 : 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex flex-wrap gap-1.5 pt-2"
                animate={{
                  opacity:
                    isActive || prefersReducedMotion ? 1 : 0,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FacultyGrid = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const safeFaculty = safeArray(faculty);

  const scopeRef = useGSAPAnimation(() => {
    if (!sectionRef.current) return;

    const heading = headingRef.current;
    const description = descriptionRef.current;
    const cards = cardsRef.current
      ? Array.from(cardsRef.current.children)
      : [];

    if (prefersReducedMotion) {
      gsap.set(
        [heading, description, ...cards].filter(Boolean),
        {
          opacity: 1,
          clearProps: "all",
        }
      );

      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
        markers: false,
      },
    });

    if (heading) {
      tl.fromTo(
        heading,
        {
          opacity: 0,
          y: 36,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: gsapEase.heading,
        }
      );
    }

    if (description) {
      tl.fromTo(
        description,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: gsapEase.paragraph,
        },
        "-=0.35"
      );
    }

    /*
     * IMPORTANT:
     * GSAP controls opacity only.
     * Motion controls card transform/hover.
     * This prevents GSAP and Motion from fighting
     * over the same card transform.
     */
    if (cards.length > 0) {
      tl.fromTo(
        cards,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
        },
        "-=0.2"
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        scopeRef.current = node;
      }}
      id="faculty"
      aria-labelledby="faculty-heading"
      className="relative w-full overflow-hidden bg-bg-dark-secondary py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="faculty-heading"
            ref={headingRef}
            className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.75rem]"
          >
            Meet Our Faculty
          </h2>

          <p
            ref={descriptionRef}
            className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base"
          >
            Experienced educators dedicated to academic excellence and
            student growth.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {safeFaculty.length > 0 ? (
            safeFaculty.map((member) => (
              <FacultyCard
                key={member?.id || member?.name}
                member={member}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-sm text-white/50">
              Faculty information coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FacultyGrid;