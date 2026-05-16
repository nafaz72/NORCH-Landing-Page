import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const words = [
  "The", "image", "is", "the", "product.", "We", "built", "NORCH", "because",
  "every", "brand", "—", "from", "a", "bedroom", "studio", "to", "a", "global",
  "house", "—", "deserves", "a", "campaign", "that", "matches", "its", "vision.",
];

export function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const [range, setRange] = [{ current: [2000, 3200] as [number, number] }, null];
  const y = useTransform(scrollY, [2000, 3200], ["-3%", "3%"]);

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative py-32 lg:py-52 overflow-hidden"
      style={{ background: "#0D0B0A" }}
    >
      {/* Horizontal rules top & bottom */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(196,189,182,0.08)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(196,189,182,0.08)" }} />

      {/* Faint issue number left edge */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "9px",
          color: "rgba(196,189,182,0.12)",
          letterSpacing: "0.24em",
          writingMode: "vertical-rl",
          transform: "rotate(180deg) translateY(50%)",
        }}
      >
        NORCH MANIFESTO — 2026
      </div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-16 lg:mb-20"
        >
          <div className="h-px w-8 bg-[#C4BDB6]/30" />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.35)", letterSpacing: "0.24em" }}>
            WHAT WE BELIEVE
          </span>
        </motion.div>

        {/* Word-by-word animated headline */}
        <div
          className="max-w-[1100px]"
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(36px, 4.8vw, 72px)",
            fontWeight: 300,
            lineHeight: "1.15",
            color: "#F5F2EE",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "inline-block",
                marginRight: word === "—" ? "0.3em" : "0.28em",
                color: word === "NORCH" ? "#C9A462" : word === "vision." ? "rgba(196,189,182,0.5)" : undefined,
                fontStyle: word === "every" || word === "deserves" ? "italic" : undefined,
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Bottom rule + attribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 lg:mt-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        >
          <div className="h-px flex-1 max-w-md" style={{ background: "rgba(196,189,182,0.12)" }} />
          <div className="flex items-center gap-8">
            {[
              { value: "£9,400", label: "avg. savings\nper campaign" },
              { value: "8 sec", label: "avg. generation\ntime" },
              { value: "4K", label: "editorial\noutput grade" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 1.5 + [0, 0.1, 0.2][["£9,400", "8 sec", "4K"].indexOf(stat.value)] }}
                className="text-right"
              >
                <div
                  style={{
                    fontFamily: "var(--font-editorial)",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 300,
                    color: "#F5F2EE",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "9px",
                    color: "rgba(196,189,182,0.3)",
                    letterSpacing: "0.12em",
                    marginTop: "4px",
                    whiteSpace: "pre-line",
                    lineHeight: "1.4",
                  }}
                >
                  {stat.label.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
