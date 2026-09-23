import { useState, useEffect } from "react";
import { soundManager } from "../utils/audio";

const sections = [
  { id: "hero", label: "Awal" },
  { id: "memories", label: "Kenangan" },
  { id: "qualities", label: "Tentang Kamu" },
  { id: "gift", label: "Kejutan" },
  { id: "letter", label: "Surat" },
  { id: "delivery", label: "Paket Kado" },
  { id: "wish", label: "Harapan" },
  { id: "ending", label: "Penutup" },
];

export default function StoryProgress() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    soundManager.playChime();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-4 sm:left-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none pointer-events-auto">
      {/* Constellation line */}
      <div className="absolute top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[#C9A7FF]/20 to-transparent -z-10" />

      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center gap-3 p-1 cursor-pointer focus:outline-none"
            title={section.label}
            aria-label={`Lompat ke bagian ${section.label}`}
          >
            {/* Dot / Star indicator */}
            <span
              className={`block rounded-full transition-all duration-500 ${
                isActive
                  ? "w-2.5 h-2.5 bg-[#C9A7FF] shadow-[0_0_10px_#C9A7FF] scale-125"
                  : "w-1.5 h-1.5 bg-[#8B7AA8]/40 group-hover:bg-[#C9A7FF]/80 group-hover:scale-110"
              }`}
            />

            {/* Hover Tooltip Label */}
            <span
              className={`absolute left-6 px-2 py-0.5 rounded-md glass-panel border border-[#C9A7FF]/20 text-[11px] font-serif tracking-wider whitespace-nowrap transition-all duration-300 pointer-events-none ${
                isActive
                  ? "opacity-100 translate-x-0 text-[#F5F1EA]"
                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#A49CB5]"
              }`}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
