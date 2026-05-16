import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const HERO_MODEL_IMG = "https://images.unsplash.com/photo-1764627511537-61f5fb030d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbW9kZWwlMjB3aGl0ZSUyMGRyZXNzJTIwc3R1ZGlvfGVufDF8fHx8MTc3ODE2NjMxNHww&ixlib=rb-4.1.0&q=80&w=1080";
const FLAT_LAY_IMG = "https://images.unsplash.com/photo-1691053318576-4bf08315e877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwY2xvdGhpbmclMjBmbGF0JTIwbGF5JTIwZ2FybWVudCUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzgxNjYzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const FOUNDING_SPOTS_TOTAL = 500;
const FOUNDING_SPOTS_TAKEN = 347;

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], ["0%", "20%"]);
  const opacity = useTransform(scrollY, [0, 540], [1, 0]);
  const badgeY = useTransform(scrollY, [0, 900], [0, -30]);
  const [processingStep, setProcessingStep] = useState(0);
  const [spotsLeft] = useState(FOUNDING_SPOTS_TOTAL - FOUNDING_SPOTS_TAKEN);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingStep((s) => (s + 1) % 4);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const steps = ["Analyzing garment...", "Generating model...", "Applying lighting...", "Rendering complete."];
  const progressPct = (FOUNDING_SPOTS_TAKEN / FOUNDING_SPOTS_TOTAL) * 100;

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0A0908]" id="platform">
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Content */}
        <div className="relative flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 lg:pt-0 order-2 lg:order-1">
          {/* Vertical rule */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C4BDB6]/15 to-transparent" />

          {/* Pre-launch badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <div
              className="flex items-center gap-2.5 px-3.5 py-1.5"
              style={{
                border: "1px solid rgba(232,213,163,0.3)",
                background: "rgba(232,213,163,0.05)",
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#E8D5A3" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "9px",
                  color: "rgba(232,213,163,0.7)",
                  letterSpacing: "0.2em",
                }}
              >
                FOUNDING ACCESS · OPEN NOW
              </span>
            </div>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(196,189,182,0.2)" }} />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-[#F5F2EE] mb-6"
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(50px, 5.8vw, 88px)",
                fontWeight: 300,
                lineHeight: "1.03",
                letterSpacing: "-0.02em",
              }}
            >
              Your garment.
              <br />
              <em style={{ fontStyle: "italic", color: "#C4BDB6" }}>Any model.</em>
              <br />
              Instantly.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9 }}
            className="mb-10 max-w-[380px]"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "14px",
              color: "rgba(196,189,182,0.5)",
              lineHeight: "1.8",
              fontWeight: 300,
            }}
          >
            Upload any garment. AI generates cinematic, campaign-ready fashion photography — studio-lit, editorial, in seconds. We're launching soon. Join the founding circle.
          </motion.p>

          {/* Upload mockup card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative mb-8 overflow-hidden"
              style={{
                background: "rgba(22, 20, 18, 0.9)",
                border: "1px solid rgba(196, 189, 182, 0.12)",
                borderRadius: "2px",
                maxWidth: "440px",
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#C4BDB6]/8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8D5A3]/40" />
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.4)", letterSpacing: "0.18em" }}>
                    GARMENT UPLOAD — NORCH STUDIO
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C4BDB6]/15" />
                  ))}
                </div>
              </div>

              {/* Image area */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={FLAT_LAY_IMG}
                  alt="Clothing flat lay"
                  className="w-full h-full object-cover object-center opacity-60"
                />
                <div className="absolute inset-3 border border-dashed border-[#C4BDB6]/20 flex items-end justify-end p-3">
                  <div
                    className="px-3 py-1.5"
                    style={{
                      background: "rgba(196,189,182,0.85)",
                      fontFamily: "var(--font-ui)",
                      fontSize: "8px",
                      letterSpacing: "0.14em",
                      color: "#0A0908",
                    }}
                  >
                    DROP FILE OR BROWSE
                  </div>
                </div>
              </div>

              {/* Processing */}
              <div className="px-5 py-3 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-[#E8D5A3]/60"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.22 }}
                    />
                  ))}
                </div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.5)", letterSpacing: "0.1em" }}>
                  {steps[processingStep]}
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex items-center gap-5 flex-wrap mb-10"
          >
            <a
              href="#waitlist"
              className="px-8 py-4 text-[#0A0908] hover:opacity-90 transition-all duration-300 hover:scale-[0.98] inline-block"
              style={{
                background: "linear-gradient(135deg, #E8D5A3 0%, #C9A462 55%, #A67C3A 100%)",
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                fontWeight: 600,
              }}
            >
              SECURE FOUNDING ACCESS
            </a>
            <a
              href="#gallery"
              className="flex items-center gap-2.5 hover:gap-3.5 transition-all duration-300"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                color: "rgba(196,189,182,0.5)",
                letterSpacing: "0.12em",
              }}
            >
              SEE EXAMPLES
              <span style={{ color: "rgba(196,189,182,0.4)" }}>→</span>
            </a>
          </motion.div>

          {/* Founding spots counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="max-w-[440px]"
          >
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.4)", letterSpacing: "0.14em" }}>
                FOUNDING SPOTS
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(232,213,163,0.6)", letterSpacing: "0.1em" }}>
                {FOUNDING_SPOTS_TAKEN} / {FOUNDING_SPOTS_TOTAL} CLAIMED
              </span>
            </div>
            <div className="h-px w-full bg-[#C4BDB6]/10 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{ background: "linear-gradient(90deg, #E8D5A3, #C9A462)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${progressPct}%` }}
                transition={{ delay: 1.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.3)", letterSpacing: "0.1em" }}>
                {spotsLeft} spots remaining worldwide
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.25)", letterSpacing: "0.1em" }}>
                FREE TO JOIN
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: Model image */}
        <div className="relative overflow-hidden lg:h-screen order-1 lg:order-2 h-[55vw] min-h-[320px]">
          <motion.div style={{ y }} className="absolute inset-0 h-[115%] -top-[7.5%]">
            <ImageWithFallback
              src={HERO_MODEL_IMG}
              alt="AI-generated fashion model"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908] via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/90 via-transparent to-transparent lg:opacity-0 opacity-70" />
          </motion.div>

          {/* Floating AI badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            style={{ y: badgeY }}
            className="absolute bottom-16 right-6 lg:right-10 z-30"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="px-4 py-3.5"
              style={{
                background: "rgba(10, 9, 8, 0.88)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(232,213,163,0.2)",
                borderRadius: "2px",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#E8D5A3" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "8px", color: "rgba(232,213,163,0.6)", letterSpacing: "0.16em" }}>
                  AI RENDER COMPLETE
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-editorial)", fontSize: "22px", color: "#F5F2EE", fontWeight: 300 }}>
                Ready
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.4)", letterSpacing: "0.1em", marginTop: "2px" }}>
                7.3 SECONDS
              </div>
            </motion.div>
          </motion.div>

          {/* Grade badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute top-24 right-6 lg:right-10 z-30"
          >
            <div
              className="px-3 py-1.5"
              style={{
                background: "rgba(10,9,8,0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(196,189,182,0.12)",
                borderRadius: "2px",
              }}
            >
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.4)", letterSpacing: "0.16em" }}>
                4K · EDITORIAL GRADE
              </span>
            </div>
          </motion.div>

          {/* Issue number — editorial detail */}
          <div
            className="absolute bottom-6 left-6 z-30 hidden lg:block"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "9px",
              color: "rgba(196,189,182,0.2)",
              letterSpacing: "0.18em",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            NORCH — VOL. I — 2026
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-2"
      >
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "8px", color: "rgba(196,189,182,0.3)", letterSpacing: "0.2em" }}>
          SCROLL
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#C4BDB6]/30 to-transparent"
          animate={{ scaleY: [1, 0.3, 1], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
