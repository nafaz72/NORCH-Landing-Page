import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const SPOTS_TOTAL = 500;

const tiers = [
  {
    id: "studio",
    name: "Studio Founder",
    tag: "INDEPENDENT LABEL",
    spotsTotal: 300,
    spotsClaimed: 214,
    perks: [
      "Early access to all features",
      "Studio plan at 40% off — forever",
      "Founding brand badge & certificate",
      "Priority onboarding call",
      "Shape the product roadmap",
    ],
    highlight: false,
    color: "rgba(196,189,182,0.06)",
    borderColor: "rgba(196,189,182,0.12)",
  },
  {
    id: "pro",
    name: "Pro Founder",
    tag: "GROWING BRAND",
    spotsTotal: 150,
    spotsClaimed: 118,
    perks: [
      "Everything in Studio Founder",
      "Pro plan at 40% off — forever",
      "Direct line to founding team",
      "Co-creation & beta feature access",
      "Featured in NORCH editorial",
      "Founder credits at launch",
    ],
    highlight: true,
    color: "rgba(232,213,163,0.04)",
    borderColor: "rgba(232,213,163,0.25)",
  },
  {
    id: "enterprise",
    name: "Enterprise Founder",
    tag: "FASHION HOUSE · BY APPLICATION",
    spotsTotal: 50,
    spotsClaimed: 15,
    perks: [
      "White-glove onboarding",
      "Custom model training from day one",
      "Enterprise plan at 30% off — forever",
      "Revenue share consideration",
      "Advisory seat opportunity",
      "Custom API integration support",
    ],
    highlight: false,
    color: "rgba(196,189,182,0.06)",
    borderColor: "rgba(196,189,182,0.12)",
  },
];

type TierId = "studio" | "pro" | "enterprise";

export function WaitlistSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedTier, setSelectedTier] = useState<TierId>("pro");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalClaimed = tiers.reduce((a, t) => a + t.spotsClaimed, 0);
  const totalPct = (totalClaimed / SPOTS_TOTAL) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xkoydenk", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          brand,
          tier: selectedTier,
        }),
      });

      if (response.ok) {
        setTimeout(() => {
          setSubmitting(false);
          setSubmitted(true);
          setEmail("");
          setBrand("");
        }, 1400);
      } else {
        setSubmitting(false);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section ref={ref} id="waitlist" className="py-32 lg:py-52 overflow-hidden" style={{ background: "#0A0908" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#C4BDB6]/30" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.4)", letterSpacing: "0.24em" }}>
              FOUNDING ACCESS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(40px, 5vw, 68px)",
                  fontWeight: 300,
                  lineHeight: "1.08",
                  color: "#F5F2EE",
                }}
              >
                Be among the first
                <br />
                <em style={{ fontStyle: "italic", color: "#C4BDB6" }}>to shape NORCH.</em>
              </h2>
            </div>

            {/* Global progress */}
            <div className="lg:w-64">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.35)", letterSpacing: "0.14em" }}>
                  FOUNDING SPOTS CLAIMED
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(232,213,163,0.55)", letterSpacing: "0.1em" }}>
                  {totalClaimed}/{SPOTS_TOTAL}
                </span>
              </div>
              <div className="h-px w-full bg-[#C4BDB6]/10 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{ background: "linear-gradient(90deg, #E8D5A3, #C9A462)" }}
                  initial={{ width: "0%" }}
                  animate={inView ? { width: `${totalPct}%` } : {}}
                  transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-2">
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.25)", letterSpacing: "0.1em" }}>
                  {SPOTS_TOTAL - totalClaimed} spots remaining · free to join
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">

          {/* Tier cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier, i) => {
              const spotsPct = (tier.spotsClaimed / tier.spotsTotal) * 100;
              const spotsLeft = tier.spotsTotal - tier.spotsClaimed;
              const isSelected = selectedTier === tier.id;

              return (
                <motion.button
                  key={tier.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedTier(tier.id as TierId)}
                  className="relative flex flex-col text-left transition-all duration-400"
                  style={{
                    background: isSelected ? tier.color : "rgba(14, 12, 10, 0.6)",
                    border: `1px solid ${isSelected ? tier.borderColor : "rgba(196,189,182,0.08)"}`,
                    padding: "28px 24px 32px",
                    cursor: "pointer",
                    outline: "none",
                    borderRadius: "2px",
                    transform: isSelected ? "translateY(-2px)" : "none",
                  }}
                >
                  {tier.highlight && isSelected && (
                    <div
                      className="absolute -top-px left-0 right-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, #C9A462, transparent)" }}
                    />
                  )}

                  {/* Tier tag */}
                  <div
                    className="mb-5"
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "8px",
                      color: isSelected && tier.highlight ? "rgba(232,213,163,0.55)" : "rgba(196,189,182,0.3)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    {tier.tag}
                  </div>

                  {/* Tier name */}
                  <div
                    className="mb-6"
                    style={{
                      fontFamily: "var(--font-editorial)",
                      fontSize: "24px",
                      fontWeight: 300,
                      color: isSelected ? "#F5F2EE" : "rgba(245,242,238,0.45)",
                      lineHeight: 1.1,
                    }}
                  >
                    {tier.name}
                  </div>

                  {/* Perks */}
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <div
                          className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: isSelected && tier.highlight ? "rgba(232,213,163,0.5)" : "rgba(196,189,182,0.25)" }}
                        />
                        <span
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: "12px",
                            color: isSelected ? "rgba(196,189,182,0.55)" : "rgba(196,189,182,0.25)",
                            lineHeight: "1.5",
                            fontWeight: 300,
                          }}
                        >
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Spots bar */}
                  <div>
                    <div className="h-px w-full bg-[#C4BDB6]/8 relative overflow-hidden mb-1.5">
                      <div
                        className="absolute left-0 top-0 h-full transition-all duration-1000"
                        style={{
                          width: `${spotsPct}%`,
                          background: tier.highlight
                            ? "linear-gradient(90deg, rgba(232,213,163,0.6), rgba(201,164,98,0.6))"
                            : "rgba(196,189,182,0.3)",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "8px",
                        color: isSelected ? "rgba(196,189,182,0.35)" : "rgba(196,189,182,0.18)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {spotsLeft} of {tier.spotsTotal} spots left
                    </span>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{
                        background: tier.highlight
                          ? "linear-gradient(90deg, transparent, rgba(201,164,98,0.5), transparent)"
                          : "rgba(196,189,182,0.2)",
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Signup form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-28"
          >
            <div
              style={{
                background: "rgba(18, 16, 14, 0.95)",
                border: "1px solid rgba(196,189,182,0.12)",
                borderRadius: "2px",
                padding: "36px 32px 40px",
              }}
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      className="mb-2"
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "9px",
                        color: "rgba(196,189,182,0.35)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      SECURE YOUR SPOT
                    </div>
                    <div
                      className="mb-8"
                      style={{
                        fontFamily: "var(--font-editorial)",
                        fontSize: "28px",
                        fontWeight: 300,
                        color: "#F5F2EE",
                        lineHeight: "1.1",
                      }}
                    >
                      {tiers.find((t) => t.id === selectedTier)?.name}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <label
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: "9px",
                            color: "rgba(196,189,182,0.35)",
                            letterSpacing: "0.18em",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          BRAND / COMPANY NAME
                        </label>
                        <input
                          type="text"
                          placeholder="Maison Éditeur"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          className="w-full px-4 py-3.5 bg-transparent outline-none transition-colors duration-300"
                          style={{
                            border: "1px solid rgba(196,189,182,0.14)",
                            fontFamily: "var(--font-ui)",
                            fontSize: "13px",
                            color: "#F5F2EE",
                            letterSpacing: "0.04em",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(196,189,182,0.35)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(196,189,182,0.14)")}
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: "9px",
                            color: "rgba(196,189,182,0.35)",
                            letterSpacing: "0.18em",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          WORK EMAIL
                        </label>
                        <input
                          type="email"
                          placeholder="creative@yourbrand.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3.5 bg-transparent outline-none transition-colors duration-300"
                          style={{
                            border: "1px solid rgba(196,189,182,0.14)",
                            fontFamily: "var(--font-ui)",
                            fontSize: "13px",
                            color: "#F5F2EE",
                            letterSpacing: "0.04em",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(196,189,182,0.35)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(196,189,182,0.14)")}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 mt-2 text-[#0A0908] hover:opacity-90 transition-all duration-300 disabled:opacity-60"
                        style={{
                          background: "linear-gradient(135deg, #E8D5A3 0%, #C9A462 55%, #A67C3A 100%)",
                          fontFamily: "var(--font-ui)",
                          fontSize: "10px",
                          letterSpacing: "0.2em",
                          fontWeight: 600,
                        }}
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="inline-block w-1 h-1 rounded-full bg-[#0A0908]/60"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.16 }}
                              />
                            ))}
                          </span>
                        ) : (
                          "CLAIM FOUNDING SPOT"
                        )}
                      </button>
                    </form>

                    <div className="mt-6 flex flex-col gap-2">
                      {["No payment required", "Early access guaranteed", "Cancel anytime before launch"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#C4BDB6]/25 flex-shrink-0" />
                          <span
                            style={{
                              fontFamily: "var(--font-ui)",
                              fontSize: "10px",
                              color: "rgba(196,189,182,0.28)",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="py-8 text-center"
                  >
                    <div
                      className="w-10 h-10 mx-auto mb-6 flex items-center justify-center"
                      style={{ border: "1px solid rgba(232,213,163,0.3)", borderRadius: "50%" }}
                    >
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path d="M1 6L5.5 10.5L15 1" stroke="#C9A462" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div
                      className="mb-3"
                      style={{ fontFamily: "var(--font-editorial)", fontSize: "26px", fontWeight: 300, color: "#F5F2EE" }}
                    >
                      You're in.
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "12px",
                        color: "rgba(196,189,182,0.4)",
                        lineHeight: "1.7",
                        fontWeight: 300,
                      }}
                    >
                      Your founding spot is secured. We'll reach out with early access details as we approach launch.
                    </p>
                    <div
                      className="mt-6 pt-6 border-t"
                      style={{ borderColor: "rgba(196,189,182,0.1)" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "9px",
                          color: "rgba(232,213,163,0.4)",
                          letterSpacing: "0.18em",
                        }}
                      >
                        FOUNDING {tiers.find((t) => t.id === selectedTier)?.name.toUpperCase()} · CONFIRMED
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
