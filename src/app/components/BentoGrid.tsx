import { useRef } from "react";
import { motion, useInView } from "motion/react";

const features = [
  {
    id: "models",
    title: "200+ AI Model Archetypes",
    desc: "Choose from a diverse range of AI-generated models representing different ethnicities, body types, heights, and styling aesthetics.",
    tag: "DIVERSITY",
    span: "lg:col-span-2",
    size: "large",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 19c0-3.866 3.134-7 7-7h2c3.866 0 7 3.134 7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "lighting",
    title: "Studio Lighting Presets",
    desc: "From golden hour to harsh editorial flash — 40+ cinematic lighting configurations.",
    tag: "LIGHTING",
    span: "",
    size: "medium",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M11 3V1M11 21v-2M3 11H1M21 11h-2M5.05 5.05L3.64 3.64M18.36 18.36l-1.41-1.41M5.05 16.95l-1.41 1.41M18.36 3.64l-1.41 1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "batch",
    title: "Batch Generation",
    desc: "Upload your entire collection and generate a full lookbook in one pass.",
    tag: "EFFICIENCY",
    span: "",
    size: "medium",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <rect x="13" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <rect x="3" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <rect x="13" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "backgrounds",
    title: "Intelligent Backgrounds",
    desc: "Studio white, outdoor environments, architectural spaces — AI matches setting to garment context.",
    tag: "ENVIRONMENT",
    span: "",
    size: "medium",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 14l4-4 3 3 4-5 7 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "resolution",
    title: "4K Commercial Output",
    desc: "Every image exports at print-ready 4K resolution with full commercial licensing included.",
    tag: "QUALITY",
    span: "",
    size: "medium",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M7 14L3 18M3 18H7M3 18V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 8l4-4M19 4h-4M19 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8l6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "api",
    title: "Developer API & Integrations",
    desc: "Connect directly to Shopify, WooCommerce, or build custom workflows via our REST API.",
    tag: "INTEGRATION",
    span: "lg:col-span-2",
    size: "large",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M8 6l-4 5 4 5M14 6l4 5-4 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 4l2 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 overflow-hidden" style={{ background: "#0F0D0C" }} id="features">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#C4BDB6]/40" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(196,189,182,0.5)", letterSpacing: "0.22em" }}>
              CAPABILITIES
            </span>
          </div>
          <h2
            className="text-[#F5F2EE]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(38px, 4.5vw, 62px)",
              fontWeight: 300,
              lineHeight: "1.1",
            }}
          >
            Built for the
            <br />
            <em className="text-[#C4BDB6]" style={{ fontStyle: "italic" }}>fashion industry.</em>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden ${feature.span}`}
              style={{
                background: "rgba(28, 26, 24, 0.6)",
                border: "1px solid rgba(196, 189, 182, 0.1)",
                borderRadius: "3px",
                padding: feature.size === "large" ? "32px 32px 40px" : "28px",
                transition: "border-color 0.4s ease, background 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(196,189,182,0.25)";
                e.currentTarget.style.background = "rgba(32, 30, 28, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(196,189,182,0.1)";
                e.currentTarget.style.background = "rgba(28,26,24,0.6)";
              }}
            >
              {/* Subtle corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at top right, rgba(196,189,182,0.06) 0%, transparent 70%)",
                }}
              />

              <div className="text-[#C4BDB6]/50 mb-5 group-hover:text-[#C4BDB6]/80 transition-colors duration-300">
                {feature.icon}
              </div>

              <div className="mb-3">
                <div
                  className="px-2 py-0.5 inline-block mb-3"
                  style={{
                    border: "1px solid rgba(196,189,182,0.12)",
                    borderRadius: "1px",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "8px", color: "rgba(196,189,182,0.35)", letterSpacing: "0.18em" }}>
                    {feature.tag}
                  </span>
                </div>
                <h3
                  className="text-[#F5F2EE]"
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: feature.size === "large" ? "26px" : "21px",
                    fontWeight: 400,
                    lineHeight: "1.2",
                  }}
                >
                  {feature.title}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "13px",
                  color: "rgba(196,189,182,0.45)",
                  lineHeight: "1.7",
                  fontWeight: 300,
                }}
              >
                {feature.desc}
              </p>

              {feature.id === "api" && (
                <div className="mt-6 flex items-center gap-2">
                  {["Shopify", "WooCommerce", "REST API", "Webhooks"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1"
                      style={{
                        border: "1px solid rgba(196,189,182,0.15)",
                        borderRadius: "1px",
                        fontFamily: "var(--font-ui)",
                        fontSize: "9px",
                        color: "rgba(196,189,182,0.4)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
