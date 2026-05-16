import { useRef } from "react";
import { motion, useInView } from "motion/react";

const plans = [
  {
    name: "Studio",
    price: "79",
    period: "/month",
    desc: "For independent designers and small labels.",
    features: [
      "200 generations / month",
      "20 model archetypes",
      "HD 2K output",
      "Basic lighting presets",
      "Commercial license",
      "Email support",
    ],
    cta: "START STUDIO",
    highlight: false,
  },
  {
    name: "Pro",
    price: "249",
    period: "/month",
    desc: "For established brands and creative agencies.",
    features: [
      "Unlimited generations",
      "200+ model archetypes",
      "4K editorial output",
      "40+ lighting configurations",
      "Batch processing (100/run)",
      "API access",
      "Priority rendering",
      "Dedicated account manager",
    ],
    cta: "START PRO",
    highlight: true,
  },
  {
    name: "Norch",
    price: "Custom",
    period: "",
    desc: "For enterprise fashion houses and platforms.",
    features: [
      "Unlimited scale",
      "Custom model training",
      "White-label deployment",
      "Full API + webhook suite",
      "SLA guarantees",
      "On-premise option",
    ],
    cta: "CONTACT US",
    highlight: false,
  },
];

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 lg:py-48 overflow-hidden" id="pricing" style={{ background: "#0A0908" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#C4BDB6]/40" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(196,189,182,0.5)", letterSpacing: "0.22em" }}>
              PRICING
            </span>
            <div className="h-px w-8 bg-[#C4BDB6]/40" />
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
            Transparent pricing for
            <br />
            <em className="text-[#C4BDB6]" style={{ fontStyle: "italic" }}>every ambition.</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col"
              style={{
                background: plan.highlight ? "rgba(245,242,238,0.04)" : "rgba(20, 18, 16, 0.6)",
                border: plan.highlight
                  ? "1px solid rgba(196,189,182,0.35)"
                  : "1px solid rgba(196,189,182,0.1)",
                borderRadius: "3px",
                padding: "36px 32px 40px",
              }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div
                    className="px-4 py-1"
                    style={{
                      background: "linear-gradient(135deg, #E8E4DF 0%, #C4BDB6 100%)",
                      borderRadius: "2px",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "8px", color: "#1C1A18", letterSpacing: "0.18em", fontWeight: 500 }}>
                      MOST POPULAR
                    </span>
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div
                className="mb-2"
                style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(196,189,182,0.45)", letterSpacing: "0.2em" }}
              >
                {plan.name.toUpperCase()}
              </div>

              {/* Price */}
              <div className="mb-4 flex items-end gap-1">
                {plan.price === "Custom" ? (
                  <span style={{ fontFamily: "var(--font-editorial)", fontSize: "40px", color: "#F5F2EE", fontWeight: 300, lineHeight: 1 }}>
                    Custom
                  </span>
                ) : (
                  <>
                    <span style={{ fontFamily: "var(--font-editorial)", fontSize: "14px", color: "rgba(196,189,182,0.5)", marginBottom: "6px" }}>£</span>
                    <span style={{ fontFamily: "var(--font-editorial)", fontSize: "52px", color: "#F5F2EE", fontWeight: 300, lineHeight: 1 }}>
                      {plan.price}
                    </span>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "12px", color: "rgba(196,189,182,0.4)", marginBottom: "8px", letterSpacing: "0.05em" }}>
                      {plan.period}
                    </span>
                  </>
                )}
              </div>

              <p
                className="mb-8 pb-8"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "13px",
                  color: "rgba(196,189,182,0.4)",
                  lineHeight: "1.6",
                  fontWeight: 300,
                  borderBottom: "1px solid rgba(196,189,182,0.1)",
                }}
              >
                {plan.desc}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3.5 flex-1 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-3 h-3 mt-0.5 flex-shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C4BDB6]/50" />
                    </div>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "13px", color: "rgba(196,189,182,0.55)", lineHeight: "1.5", fontWeight: 300 }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3.5 transition-all duration-300"
                style={{
                  background: plan.highlight
                    ? "linear-gradient(135deg, #E8E4DF 0%, #C4BDB6 50%, #A89880 100%)"
                    : "transparent",
                  border: plan.highlight
                    ? "none"
                    : "1px solid rgba(196,189,182,0.25)",
                  color: plan.highlight ? "#1C1A18" : "rgba(196,189,182,0.6)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  fontWeight: 500,
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  if (!plan.highlight) {
                    e.currentTarget.style.borderColor = "rgba(196,189,182,0.5)";
                    e.currentTarget.style.color = "rgba(196,189,182,0.9)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.highlight) {
                    e.currentTarget.style.borderColor = "rgba(196,189,182,0.25)";
                    e.currentTarget.style.color = "rgba(196,189,182,0.6)";
                  }
                }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10"
          style={{ fontFamily: "var(--font-ui)", fontSize: "12px", color: "rgba(196,189,182,0.3)", letterSpacing: "0.06em" }}
        >
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}