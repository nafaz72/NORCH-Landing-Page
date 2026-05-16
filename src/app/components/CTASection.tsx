import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const CTA_IMG = "https://images.unsplash.com/photo-1764627511537-61f5fb030d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbW9kZWwlMjB3aGl0ZSUyMGRyZXNzJTIwc3R1ZGlvfGVufDF8fHx8MTc3ODE2NjMxNHww&ixlib=rb-4.1.0&q=80&w=1080";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [range, setRange] = useState<[number, number]>([3000, 4800]);
  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const top = ref.current.offsetTop;
        const height = ref.current.offsetHeight;
        setRange([top - window.innerHeight, top + height]);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, range, ["-6%", "6%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "#0A0908" }}>
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 h-[115%] -top-[7.5%]">
        <ImageWithFallback
          src={CTA_IMG}
          alt="Luxury fashion editorial"
          className="w-full h-full object-cover opacity-20"
        />
      </motion.div>

      {/* Gradient overlay — strong left fade */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, rgba(10,9,8,0.98) 0%, rgba(10,9,8,0.80) 50%, rgba(10,9,8,0.45) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(10,9,8,0.5) 100%)" }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(196,189,182,0.07)" }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16 py-32 lg:py-48 w-full">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px w-8 bg-[#C4BDB6]/30" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.4)", letterSpacing: "0.24em" }}>
              THE FOUNDING CIRCLE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#F5F2EE] mb-8"
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(46px, 5.8vw, 84px)",
              fontWeight: 300,
              lineHeight: "1.03",
              letterSpacing: "-0.02em",
            }}
          >
            The waitlist
            <br />
            is growing.
            <br />
            <em style={{ fontStyle: "italic", color: "#C4BDB6" }}>Yours is next.</em>
          </motion.h2>

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.28 }}
            className="mb-12 max-w-sm"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "14px",
              color: "rgba(196,189,182,0.45)",
              lineHeight: "1.8",
              fontWeight: 300,
            }}
          >
            Founding brands get lifetime discounts, direct product access, and the chance to co-create something the fashion industry has never seen. The founding circle is limited to 500 brands worldwide.
          </motion.p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex items-stretch"
                >
                  <input
                    type="email"
                    placeholder="your@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full sm:w-72 px-5 py-4 bg-transparent outline-none transition-colors duration-300"
                    style={{
                      border: "1px solid rgba(196,189,182,0.18)",
                      borderRight: "none",
                      fontFamily: "var(--font-ui)",
                      fontSize: "13px",
                      color: "#F5F2EE",
                      letterSpacing: "0.04em",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(196,189,182,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(196,189,182,0.18)")}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-7 py-4 flex-shrink-0 text-[#0A0908] hover:opacity-90 transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #E8D5A3 0%, #C9A462 55%, #A67C3A 100%)",
                      fontFamily: "var(--font-ui)",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      fontWeight: 600,
                    }}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="inline-block w-1 h-1 rounded-full bg-[#0A0908]/50"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </span>
                    ) : (
                      "JOIN NOW"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="flex items-center gap-4 py-4"
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(232,213,163,0.35)", borderRadius: "50%" }}
                  >
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4.5L4 7.5L11 1" stroke="#C9A462" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-editorial)", fontSize: "20px", fontWeight: 300, color: "#F5F2EE" }}>
                      You're on the list.
                    </div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(196,189,182,0.35)", letterSpacing: "0.08em", marginTop: "2px" }}>
                      We'll be in touch before launch.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            {[
              "No card required",
              "Founding access guaranteed",
              "500 spots worldwide",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#C4BDB6]/30" />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(196,189,182,0.3)", letterSpacing: "0.1em" }}>
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating right card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-16 bottom-20 hidden xl:block"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "rgba(14, 12, 10, 0.92)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(196,189,182,0.14)",
              borderRadius: "2px",
              padding: "24px 28px",
              minWidth: "220px",
            }}
          >
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "8px", color: "rgba(196,189,182,0.35)", letterSpacing: "0.18em", marginBottom: "10px" }}>
              AVG. SAVINGS PER CAMPAIGN
            </div>
            <div style={{ fontFamily: "var(--font-editorial)", fontSize: "48px", color: "#F5F2EE", fontWeight: 300, lineHeight: 1 }}>
              £9,400
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.28)", marginTop: "8px", letterSpacing: "0.08em" }}>
              vs. traditional photography
            </div>
            <div
              className="mt-5 pt-5"
              style={{ borderTop: "1px solid rgba(196,189,182,0.08)" }}
            >
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "8px", color: "rgba(196,189,182,0.25)", letterSpacing: "0.16em", marginBottom: "8px" }}>
                GENERATION TIME
              </div>
              <div style={{ fontFamily: "var(--font-editorial)", fontSize: "32px", color: "rgba(245,242,238,0.6)", fontWeight: 300, lineHeight: 1 }}>
                8 sec
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
