import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const AI_VISUAL = "https://images.unsplash.com/photo-1770062421988-7929b4748e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBlZGl0b3JpYWwlMjBjYW1wYWlnbiUyMGZhc2hpb24lMjBwaG90b2dyYXBoeSUyMGRhcmslMjBtb29kfGVufDF8fHx8MTc3ODcyMjE5MHww&ixlib=rb-4.1.0&q=80&w=1080";

const steps = [
  {
    number: "01",
    title: "Upload Your Garment",
    desc: "Drop any clothing photograph — flat lay, hanger, or ghost mannequin. Our AI analyzes fabric, cut, texture and color with surgical precision.",
    tag: "UPLOAD",
  },
  {
    number: "02",
    title: "Configure Your Vision",
    desc: "Choose model archetype, environment, lighting mood, and editorial style. Or let our AI director compose the perfect campaign automatically.",
    tag: "CONFIGURE",
  },
  {
    number: "03",
    title: "Receive Campaign Imagery",
    desc: "In under 10 seconds, receive 4K editorial-grade fashion photography. Download, license, and publish — instantly.",
    tag: "GENERATE",
  },
];

export function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden" id="workflow" style={{ background: "#0F0D0C" }}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,152,128,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 lg:mb-28"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#C4BDB6]/40" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(196,189,182,0.5)", letterSpacing: "0.22em" }}>
              THE PROCESS
            </span>
          </div>
          <h2
            className="text-[#F5F2EE] max-w-lg"
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(38px, 4.5vw, 62px)",
              fontWeight: 300,
              lineHeight: "1.1",
            }}
          >
            From garment to campaign
            <br />
            <em className="text-[#C4BDB6]" style={{ fontStyle: "italic" }}>in three steps.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Steps */}
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {i < steps.length - 1 && (
                  <div className="absolute left-[23px] top-[52px] bottom-0 w-px bg-gradient-to-b from-[#C4BDB6]/20 to-transparent z-0 h-12" />
                )}
                <div className="flex gap-6 items-start py-8 border-b border-[#C4BDB6]/08 group-hover:border-[#C4BDB6]/20 transition-colors duration-500">
                  <div
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                    style={{ border: "1px solid rgba(196,189,182,0.15)", borderRadius: "2px" }}
                  >
                    <span style={{ fontFamily: "var(--font-editorial)", fontSize: "16px", color: "rgba(196,189,182,0.5)" }}>
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[#F5F2EE]"
                        style={{ fontFamily: "var(--font-editorial)", fontSize: "20px", fontWeight: 400 }}
                      >
                        {step.title}
                      </span>
                      <span
                        className="px-2 py-0.5"
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "8px",
                          letterSpacing: "0.18em",
                          color: "rgba(196,189,182,0.4)",
                          border: "1px solid rgba(196,189,182,0.15)",
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: "14px", color: "rgba(196,189,182,0.5)", lineHeight: "1.7", fontWeight: 300 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "3px", border: "1px solid rgba(196,189,182,0.1)" }}
            >
              <div className="aspect-[3/4] relative">
                <ImageWithFallback
                  src={AI_VISUAL}
                  alt="Luxury editorial campaign result"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #0F0D0C 100%)" }} />
              </div>

              {/* Floating metrics */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-6"
                style={{
                  background: "rgba(10,9,8,0.9)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(196,189,182,0.2)",
                  borderRadius: "3px",
                  padding: "12px 16px",
                }}
              >
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.5)", letterSpacing: "0.14em", marginBottom: "6px" }}>
                  GENERATION SPEED
                </div>
                <div style={{ fontFamily: "var(--font-editorial)", fontSize: "32px", color: "#F5F2EE", fontWeight: 400, lineHeight: 1 }}>
                  8.2<span style={{ fontSize: "14px", color: "rgba(196,189,182,0.5)" }}>s</span>
                </div>
              </motion.div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div style={{ fontFamily: "var(--font-editorial)", fontSize: "24px", color: "#F5F2EE", fontWeight: 300 }}>
                      Intelligent Direction
                    </div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(196,189,182,0.45)", letterSpacing: "0.1em", marginTop: "4px" }}>
                      AI-POWERED CREATIVE DIRECTION
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
