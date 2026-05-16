import norchLogo from "../../imports/OFFICIAL_NORCH_LOGO.png";

export function Footer() {
  const links = {
    Platform: ["Features", "Gallery", "Studio", "Manifesto", "Waitlist"],
    Company: ["About", "Journal", "Careers", "Press", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"],
  };

  return (
    <footer
      className="py-16 lg:py-20 border-t"
      style={{ background: "#0A0908", borderColor: "rgba(196,189,182,0.08)" }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                style={{
                  width: 30,
                  height: 30,
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
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "12px",
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
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "13px", color: "rgba(196,189,182,0.35)", lineHeight: "1.7", fontWeight: 300, maxWidth: "220px" }}>
              AI fashion photography for every brand. Launching 2026 — founding access open now.
            </p>
            <a
              href="#waitlist"
              className="inline-block mt-5 px-4 py-2 transition-opacity duration-300 hover:opacity-80"
              style={{
                border: "1px solid rgba(232,213,163,0.25)",
                fontFamily: "var(--font-ui)",
                fontSize: "9px",
                color: "rgba(232,213,163,0.5)",
                letterSpacing: "0.18em",
              }}
            >
              JOIN THE WAITLIST →
            </a>
            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              {["Instagram", "LinkedIn", "X"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.3)", letterSpacing: "0.16em" }}
                  className="hover:text-[#C4BDB6]/70 transition-colors duration-300"
                >
                  {social.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div
                className="mb-5"
                style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(196,189,182,0.3)", letterSpacing: "0.2em" }}
              >
                {category.toUpperCase()}
              </div>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-[#C4BDB6]/60 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-ui)", fontSize: "13px", color: "rgba(196,189,182,0.28)", fontWeight: 300 }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(196,189,182,0.07)" }}
        >
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(196,189,182,0.2)", letterSpacing: "0.06em" }}>
            © 2026 Norch Ltd. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(196,189,182,0.22)", letterSpacing: "0.1em" }}>
                LAUNCHING 2026
              </span>
            </div>
            <div className="w-px h-3 bg-[#C4BDB6]/10" />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(196,189,182,0.18)", letterSpacing: "0.1em" }}>
              347 / 500 FOUNDING SPOTS CLAIMED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}