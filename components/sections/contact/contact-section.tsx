"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout";
import { ParticleField } from "@/components/motion";
import { contact, socials } from "@/lib/content";

/**
 * 08 - Contact
 *
 * Interactive 3D glass contact card.
 * Content is driven entirely from `content.ts`.
 */
export function ContactSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, -15]),
    {
      stiffness: 150,
      damping: 20,
    },
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    {
      stiffness: 150,
      damping: 20,
    },
  );

  const orbX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]),
    {
      stiffness: 150,
      damping: 20,
    },
  );

  const orbY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]),
    {
      stiffness: 150,
      damping: 20,
    },
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <Section
      id="contact"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      {/* Background ambience */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParticleField className="size-full opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />
      </div>

      <div
        aria-hidden
        className="signal-glow pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-30"
      />

      {/* 3D Container */}
      <div className="mx-auto w-full max-w-[1400px] px-4 perspective-[2000px] md:px-8">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            rotateY: 60,
            rotateZ: -5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateZ: 0,
          }}
          viewport={{
            once: true,
            margin: "-10%",
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="group relative min-h-[500px] w-full rounded-[2.5rem] transition-transform duration-200 ease-out"
          >
            {/* Glass container + dynamic orb */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-border/50 bg-card/10 shadow-2xl">
              <motion.div
                className="pointer-events-none absolute size-64 rounded-full bg-accent/60 opacity-50 blur-[80px] transition-opacity duration-500 group-hover:opacity-100 lg:size-96"
                style={{
                  left: orbX,
                  top: orbY,
                  x: "-50%",
                  y: "-50%",
                }}
              />

              <div className="absolute inset-0 bg-background/30 backdrop-blur-3xl backdrop-saturate-150" />
            </div>

            {/* Content */}
            <div
              className="relative flex h-full flex-col items-center justify-center p-8 text-center md:p-16"
              style={{ transform: "translateZ(60px)" }}
            >
              <h2 className="mb-6 font-display text-5xl font-black tracking-tighter md:text-7xl">
                Let&apos;s Build
                <br className="md:hidden" />
                <span className="ml-2 text-accent md:ml-0">
                  Something Intelligent.
                </span>
              </h2>

              <p className="mb-12 max-w-lg text-lg text-muted-foreground md:text-xl">
                Have an AI, ML, or Generative AI idea in mind?
                <br className="hidden md:block" />
                Let&apos;s turn it into something real.
              </p>

              <a
                href={`mailto:${contact.email}`}
                className="relative flex h-16 w-full max-w-[320px] items-center justify-center overflow-hidden rounded-full bg-foreground px-8 font-medium text-background transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(var(--accent),0.3)] active:scale-95"
              >
                <span className="mr-2 text-lg">
                  Get in touch
                </span>

                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Social Links */}
              <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center gap-2 text-sm font-mono font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="relative z-10">
                      {social.label}
                    </span>

                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}