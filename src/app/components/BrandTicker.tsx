import { motion } from "motion/react";

const brands = [
  "MAISON EDITEUR", "NOIR STUDIO", "VERSO ATELIER", "LUMIÈRE CO.",
  "FORMA HOUSE", "ARCHIPEL", "VESTE COLLECTIVE", "DRAPE PARIS",
  "OBSIDIAN BRAND", "SILHOUETTE LAB", "THREAD & TONE", "CLOS GARMENT",
];

export function BrandTicker() {
  return (
    <div
      className="overflow-hidden relative border-y"
      style={{
        background: "#0D0B0A",
        borderColor: "rgba(196, 189, 182, 0.06)",
      }}
    >
      {/* Top micro-label */}
      <div
        className="flex items-center justify-center gap-3 py-2.5 border-b"
        style={{ borderColor: "rgba(196,189,182,0.05)" }}
      >
        <motion.div
          className="w-1 h-1 rounded-full bg-amber-400/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "8px", color: "rgba(196,189,182,0.25)", letterSpacing: "0.26em" }}>
          BRANDS JOINING THE FOUNDING CIRCLE
        </span>
        <motion.div
          className="w-1 h-1 rounded-full bg-amber-400/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
        />
      </div>

      {/* Scrolling names */}
      <div className="relative py-5">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0D0B0A, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0D0B0A, transparent)" }} />

        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex items-center gap-12">
              <span
                className="text-[#C4BDB6]/20 hover:text-[#C4BDB6]/45 transition-colors duration-300 cursor-default"
                style={{ fontFamily: "var(--font-ui)", fontSize: "10px", letterSpacing: "0.24em", fontWeight: 500 }}
              >
                {brand}
              </span>
              <div className="w-px h-3 bg-[#C4BDB6]/10 flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
