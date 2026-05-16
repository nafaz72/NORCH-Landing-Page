import { useEffect, useState } from "react";
import { motion } from "motion/react";
import norchLogo from "../../imports/OFFICIAL_NORCH_LOGO.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled
          ? "rgba(10, 9, 8, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196, 189, 182, 0.12)" : "none",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: 34,
              height: 34,
              flexShrink: 0,
              mixBlendMode: "screen" as const,
            }}
          >
            <img
              src={norchLogo}
              alt="NORCH"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
          <span
            className="tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              background: "linear-gradient(135deg, #E8D5A3 0%, #C9A462 50%, #A67C3A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NORCH
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {[["Platform", "platform"], ["Gallery", "gallery"], ["Studio", "studio"], ["Manifesto", "manifesto"]].map(([label, href]) => (
            <a
              key={label}
              href={`#${href}`}
              className="text-[#C4BDB6]/60 hover:text-[#F5F2EE] transition-colors duration-300"
              style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.14em" }}
            >
              {label.toUpperCase()}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70 animate-pulse" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(196,189,182,0.4)", letterSpacing: "0.12em" }}>
              EARLY ACCESS
            </span>
          </div>
          <a
            href="#waitlist"
            className="px-5 py-2.5 text-[#0A0908] transition-all duration-300 hover:opacity-90 hover:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #E8D5A3 0%, #C9A462 60%, #A67C3A 100%)",
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              letterSpacing: "0.16em",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            JOIN WAITLIST
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-5 h-px bg-[#C4BDB6] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-[#C4BDB6] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#C4BDB6] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0A0908]/95 backdrop-blur-xl border-t border-[#C4BDB6]/10 px-8 py-6 flex flex-col gap-5"
        >
          {[["Platform", "platform"], ["Gallery", "gallery"], ["Studio", "studio"], ["Manifesto", "manifesto"]].map(([label, href]) => (
            <a
              key={label}
              href={`#${href}`}
              className="text-[#C4BDB6]/60 hover:text-[#F5F2EE] transition-colors"
              style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.14em" }}
              onClick={() => setMenuOpen(false)}
            >
              {label.toUpperCase()}
            </a>
          ))}
          <a
            href="#waitlist"
            className="mt-2 px-5 py-3 text-[#0A0908] text-center w-full block"
            style={{
              background: "linear-gradient(135deg, #E8D5A3 0%, #C9A462 60%, #A67C3A 100%)",
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              letterSpacing: "0.16em",
              fontWeight: 600,
            }}
            onClick={() => setMenuOpen(false)}
          >
            JOIN WAITLIST
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}