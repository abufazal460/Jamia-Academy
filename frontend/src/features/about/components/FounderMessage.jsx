import React, { useRef, useState } from "react";

import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ImageOff } from "lucide-react";

import useGSAPAnimation from "../../../shared/hooks/useGSAPAnimation";
import usePrefersReducedMotion from "../../../shared/hooks/usePrefersReducedMotion";

import { getImageProps } from "../../../shared/utils/image";

import { gsapEase } from "../../../shared/motion/config";

gsap.registerPlugin(ScrollTrigger);

const FounderMessage = ({ data }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const quoteOpenRef = useRef(null);
  const quoteCloseRef = useRef(null);
  const messageRef = useRef(null);
  const signatureRef = useRef(null);
  const detailsRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [imageError, setImageError] = useState(false);

  const personData = data || {};
  const messageData = personData?.message || {};

  const messageLines = Array.isArray(messageData.body)
    ? messageData.body.filter(Boolean)
    : messageData.body
      ? [messageData.body]
      : [];

  const scopeRef = useGSAPAnimation(
    (scope) => {
      if (!sectionRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(
          [
            sectionRef.current,
            imageRef.current,
            headingRef.current,
            quoteOpenRef.current,
            quoteCloseRef.current,
            messageRef.current?.children,
            signatureRef.current,
            detailsRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            clearProps: "all",
          }
        );

        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          markers: false,
        },
      });

      tl.from(sectionRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (imageRef.current) {
        tl.from(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.88,
            rotate: -4,
            filter: "blur(10px)",
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.15"
        );
      }

      if (headingRef.current) {
        tl.from(
          headingRef.current,
          {
            opacity: 0,
            y: 26,
            filter: "blur(6px)",
            duration: 0.6,
            ease: gsapEase.heading,
          },
          "-=0.5"
        );
      }

      if (quoteOpenRef.current) {
        tl.from(
          quoteOpenRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotate: -12,
            duration: 0.5,
            ease: gsapEase.icon,
          },
          "-=0.3"
        );
      }

      if (messageRef.current) {
        tl.from(
          messageRef.current.children,
          {
            opacity: 0,
            y: 18,
            duration: 0.55,
            ease: gsapEase.paragraph,
            stagger: 0.18,
          },
          "-=0.2"
        );
      }

      if (quoteCloseRef.current) {
        tl.from(
          quoteCloseRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotate: 12,
            duration: 0.5,
            ease: gsapEase.icon,
          },
          "-=0.4"
        );
      }

      if (signatureRef.current) {
        tl.from(
          signatureRef.current,
          {
            opacity: 0,
            y: 14,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.15"
        );
      }

      if (detailsRef.current) {
        tl.from(
          detailsRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.25"
        );
      }
    },
    [prefersReducedMotion]
  );

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        scopeRef.current = node;
      }}
      id={messageData.id || "founder-message"}
      aria-labelledby={`${messageData.id || "founder"}-message-heading`}
      className="relative w-full overflow-hidden bg-[#F7F3E9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] gap-12 lg:gap-16 items-center">
          <div className="order-1 flex justify-center lg:justify-start">
            <div
              ref={imageRef}
              className="relative w-full max-w-xs will-change-transform"
            >
              <div className="rounded-[24px] bg-gradient-to-br from-[#2A9D8F] via-[#F4A261] to-[#E63946] p-[3px] shadow-[0_18px_44px_rgba(43,45,66,0.18)]">
                <div className="relative overflow-hidden rounded-[22px] bg-white/40 backdrop-blur-sm">
                  {!imageError ? (
                    <img
                      {...getImageProps(
                        personData?.image,
                        `${personData?.name || "Founder"} sharing a message`,
                        false
                      )}
                      onError={() => setImageError(true)}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${personData?.name || "Founder"} image unavailable`}
                      className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-[#2B2D42]/5 text-[#2B2D42]/40"
                    >
                      <ImageOff size={28} aria-hidden="true" />
                      <span className="text-xs">
                        Founder Image Unavailable
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="order-2">
            {messageData.label && (
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#2A9D8F]">
                {messageData.label}
              </span>
            )}

            <h2
              id={`${messageData.id || "founder"}-message-heading`}
              ref={headingRef}
              className="mt-3 font-heading text-3xl sm:text-4xl font-extrabold leading-tight text-[#2B2D42]"
            >
              {messageData.heading || "A Message From Our Founder"}
            </h2>

            <div className="relative mt-6 rounded-3xl border border-white/50 bg-white/50 p-6 sm:p-8 shadow-[0_12px_40px_rgba(43,45,66,0.1)] backdrop-blur-xl">

              <div className="pointer-events-none absolute inset-x-1 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#E63946] via-[#F4A261] to-[#2A9D8F]" />

              <span
                ref={quoteOpenRef}
                className="inline-block text-[#E63946]/50"
                aria-hidden="true"
              >
                <Quote size={28} />
              </span>

              <div
                ref={messageRef}
                className="mt-2 flex flex-col gap-4"
              >
                {messageLines.length > 0 ? (
                  messageLines.map((paragraph, index) => (
                    <p
                      key={`message-paragraph-${index}`}
                      className="text-base sm:text-md text-[#2B2D42]/85 text-justify"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-base sm:text-lg leading-relaxed text-[#2B2D42]/85">
                    Our commitment to every student guides everything we build here.
                  </p>
                )}
              </div>

              <span
                ref={quoteCloseRef}
                className="mt-1 inline-block rotate-180 text-[#2A9D8F]/50"
                aria-hidden="true"
              >
                <Quote size={28} />
              </span>

              <div
                ref={signatureRef}
                className="mt-5 border-t border-[#2B2D42]/10 pt-5"
              >
                {messageData.signatureImage ? (
                  <img
                    src={messageData.signatureImage}
                    alt={`${personData?.name || "Founder"}'s signature`}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-auto object-contain"
                  />
                ) : (
                  <p
                    className="text-2xl italic text-[#2B2D42]/70"
                    style={{
                      fontFamily: "'Brush Script MT', cursive",
                    }}
                  >
                    {personData?.name || "Founder Name"}
                  </p>
                )}

                <div
                  ref={detailsRef}
                  className="mt-1"
                >
                  <p className="text-sm font-bold text-[#2B2D42]">
                    {personData?.name || "Founder Name"}
                  </p>

                  <p className="text-xs text-[#2B2D42]/60">
                    {personData?.title ||
                      personData?.designation ||
                      ""}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;