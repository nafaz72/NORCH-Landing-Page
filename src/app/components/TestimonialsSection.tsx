import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const DESIGNER_IMG = "https://images.unsplash.com/photo-1629726343583-d9718b3e8f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjB3b21hbiUyMGNyZWF0aXZlJTIwZGlyZWN0b3IlMjBzdHVkaW98ZW58MXx8fHwxNzc4MTY2MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const MODEL_IMG = "https://images.unsplash.com/photo-1764698072685-f01c10bd2dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdCUyMGRyYW1hdGljJTIwc2hhZG93JTIwc3R1ZGlvfGVufDF8fHx8MTc3ODE2NjMxOXww&ixlib=rb-4.1.0&q=80&w=1080";

const testimonials = [
  {
    quote: "Norch completely transformed how we shoot our seasonal collections. What used to cost £12,000 in model and studio fees now takes 40 minutes and £200. The quality is indistinguishable from a real shoot.",
    name: "Margaux Delacroix",
    title: "Creative Director",
    company: "VERSO ATELIER",
    img: DESIGNER_IMG,
    metric: "94%",
    metricLabel: "Cost Reduction",
  },
  {
    quote: "As a solo designer launching my brand, I could never afford professional photography. Norch gave me campaign-quality imagery from day one. Buyers immediately asked who shot our lookbook.",
    name: "Elara Voss",
    title: "Founder & Designer",
    company: "LUMIÈRE CO.",
    img: MODEL_IMG,
    metric: "12x",
    metricLabel: "Faster Campaigns",
  },
  {
    quote: "We run 3,000+ SKUs per season. Manually photographing every piece was impossible. Now our entire catalog is shot, styled, and published within 48 hours of production completing.",
    name: "Thomas Nakamura",
    title: "Head of E-Commerce",
    company: "FORMA HOUSE",
    img: DESIGNER_IMG,
    metric: "3,400",
    metricLabel: "SKUs/Season",
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const active = testimonials[activeIndex];

  return (
    <section ref={ref} className="py-32 lg:py-48 overflow-hidden" style={{ background: "#F5F2EE" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#8A7B6A]/50" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "#8A7B6A", letterSpacing: "0.22em" }}>
              VOICES FROM THE INDUSTRY
            </span>
          </div>
          <h2
            className="text-[#1C1A18]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(38px, 4.5vw, 62px)",
              fontWeight: 300,
              lineHeight: "1.1",
            }}
          >
            Trusted by those who
            <br />
            <em className="text-[#8A7B6A]" style={{ fontStyle: "italic" }}>define fashion.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Quote area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Big quote mark */}
            <div
              className="mb-6 text-[#C4BDB6]/40"
              style={{ fontFamily: "var(--font-editorial)", fontSize: "80px", lineHeight: 0.8, fontWeight: 400 }}
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
              >
                <p
                  className="text-[#1C1A18] mb-8"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "clamp(20px, 2.2vw, 28px)",
                    fontWeight: 300,
                    lineHeight: "1.5",
                    fontStyle: "italic",
                  }}
                >
                  {active.quote}
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-10 h-10 overflow-hidden rounded-full flex-shrink-0"
                    style={{ border: "1px solid rgba(138,123,106,0.25)" }}
                  >
                    <ImageWithFallback src={active.img} alt={active.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-editorial)", fontSize: "16px", color: "#1C1A18", fontWeight: 500 }}>
                      {active.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "#8A7B6A", letterSpacing: "0.12em" }}>
                      {active.title} · {active.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex items-center gap-3 mt-auto">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "24px" : "8px",
                    height: "2px",
                    background: i === activeIndex ? "#1C1A18" : "rgba(138,123,106,0.3)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Metric + image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 gap-4 h-full"
              >
                {/* Metric card */}
                <div
                  className="flex flex-col justify-center p-8"
                  style={{
                    background: "#1C1A18",
                    borderRadius: "3px",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(48px, 6vw, 80px)", color: "#F5F2EE", fontWeight: 300, lineHeight: 1 }}>
                    {active.metric}
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(196,189,182,0.5)", letterSpacing: "0.16em", marginTop: "8px" }}>
                    {active.metricLabel.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: "var(--font-editorial)", fontSize: "15px", color: "rgba(196,189,182,0.35)", marginTop: "6px", fontStyle: "italic" }}>
                    — {active.company}
                  </div>
                </div>

                {/* Clickable testimonials */}
                <div className="grid grid-cols-3 gap-3">
                  {testimonials.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="relative overflow-hidden text-left transition-all duration-300"
                      style={{
                        borderRadius: "2px",
                        border: `1px solid ${i === activeIndex ? "rgba(138,123,106,0.4)" : "rgba(138,123,106,0.15)"}`,
                        padding: "14px",
                        background: i === activeIndex ? "rgba(138,123,106,0.08)" : "transparent",
                      }}
                    >
                      <div style={{ fontFamily: "var(--font-editorial)", fontSize: "18px", color: "#1C1A18", fontWeight: 400 }}>
                        {t.metric}
                      </div>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: "8px", color: "#8A7B6A", letterSpacing: "0.12em", marginTop: "3px" }}>
                        {t.metricLabel.toUpperCase()}
                      </div>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(138,123,106,0.5)", marginTop: "4px" }}>
                        {t.company}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}