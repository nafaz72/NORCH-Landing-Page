import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const BEFORE_IMG = "https://images.unsplash.com/photo-1591746299519-92ce25344a48?w=1080&q=80";
const AFTER_IMG = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1080&q=80";

export function BeforeAfterSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [sliderPos, setSliderPos] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const getPos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 4), 96);
    setSliderPos(pct);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); getPos(e.clientX); };
  const onTouchStart = (e: React.TouchEvent) => { setIsDragging(true); getPos(e.touches[0].clientX); };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging) getPos(e.clientX); };
    const onTouchMove = (e: TouchEvent) => { if (isDragging) getPos(e.touches[0].clientX); };
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, getPos]);

  // Auto demo animation
  useEffect(() => {
    if (!inView || hasInteracted) return;
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / 2400, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setSliderPos(40 + ease * 25);
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    const timeout = setTimeout(() => { frame = requestAnimationFrame(animate); }, 1200);
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, [inView, hasInteracted]);

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 overflow-hidden" style={{ background: "#F5F2EE" }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#8A7B6A]/50" />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "#8A7B6A", letterSpacing: "0.22em" }}>
                TRANSFORMATION
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
              The before.
              <br />
              <em className="text-[#8A7B6A]" style={{ fontStyle: "italic" }}>The after.</em>
            </h2>
          </div>
          <p
            className="max-w-xs"
            style={{ fontFamily: "var(--font-ui)", fontSize: "14px", color: "#8A7B6A", lineHeight: "1.7", fontWeight: 300 }}
          >
            Drag the slider to witness the transformation from product shot to luxury editorial campaign.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={containerRef}
            className="relative overflow-hidden cursor-ew-resize select-none"
            style={{ borderRadius: "3px", aspectRatio: "16/9" }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            {/* After (right / full) */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={AFTER_IMG}
                alt="AI-generated model wearing sunglasses"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 25%" }}
              />
              {/* After label */}
              <div className="absolute top-8 right-5">
                <div
                  className="px-3 py-1.5 flex items-center gap-2"
                  style={{
                    background: "rgba(10,9,8,0.75)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(196,189,182,0.2)",
                    borderRadius: "2px",
                  }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#C4BDB6]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.7)", letterSpacing: "0.14em" }}>
                    AI GENERATED
                  </span>
                </div>
              </div>
            </div>

            {/* Before (left clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <ImageWithFallback
                src={BEFORE_IMG}
                alt="Original sunglasses product shot"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 25%" }}
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-[#F5F2EE]/10" />
              {/* Before label */}
              <div className="absolute top-5 left-5">
                <div
                  className="px-3 py-1.5"
                  style={{
                    background: "rgba(245,242,238,0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(138,123,106,0.3)",
                    borderRadius: "2px",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "#8A7B6A", letterSpacing: "0.14em" }}>
                    PRODUCT UPLOAD
                  </span>
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-px z-20 pointer-events-none"
              style={{
                left: `${sliderPos}%`,
                background: "rgba(245,242,238,0.9)",
                boxShadow: "0 0 20px rgba(245,242,238,0.3)",
              }}
            />

            {/* Drag handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%) translateY(-50%)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center gap-1"
                style={{
                  background: "#F5F2EE",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5 8L2 5M2 5L5 2M2 5H14M11 8L14 5M14 5L11 2M14 5H2M2 11H14M5 14L2 11M11 14L14 11" stroke="#1C1A18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Interaction hint */}
            {!hasInteracted && (
              <motion.div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div
                  className="px-4 py-2"
                  style={{
                    background: "rgba(10,9,8,0.75)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(196,189,182,0.2)",
                    borderRadius: "2px",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.7)", letterSpacing: "0.14em" }}>
                    ← DRAG TO COMPARE →
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
