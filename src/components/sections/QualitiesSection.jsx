import { motion } from "framer-motion";
import { Sparkles, Heart, Smile, Sun, Star, Moon } from "lucide-react";
import { storyData } from "../../data/storyData";
import { soundManager } from "../../utils/audio";

// Icon mapping
const iconMap = {
  Sparkles,
  Heart,
  Smile,
  Sun,
  Star,
  Moon,
};

export default function QualitiesSection() {
  const { qualities } = storyData;

  const handleCardClick = () => {
    soundManager.playChime();
  };

  return (
    <section id="qualities" className="relative min-h-screen py-32 px-6 z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
      {/* Narrative Intro */}
      <div className="text-center mb-20 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#C9A7FF]/20 text-xs tracking-widest uppercase text-[#C9A7FF]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pengingat Kecil</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F1EA] font-normal"
        >
          {qualities.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif italic text-base sm:text-lg text-[#A49CB5] max-w-lg mx-auto"
        >
          "{qualities.subtitle}"
        </motion.p>
      </div>

      {/* Cards Grid / Staggered List */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {qualities.items.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Sparkles;
          const isSpecial = index === qualities.items.length - 1; // "kamu adalah kamu"

          return (
            <motion.div
              key={item.highlight}
              onClick={handleCardClick}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`group relative p-6 sm:p-7 rounded-2xl glass-panel border ${
                isSpecial
                  ? "border-[#C9A7FF]/50 bg-gradient-to-br from-[#1C182B]/80 to-[#2A1E3D]/80 md:col-span-2 shadow-xl shadow-[#C9A7FF]/10"
                  : "border-[#C9A7FF]/15 hover:border-[#C9A7FF]/40"
              } transition-all duration-300 cursor-pointer select-none`}
            >
              {/* Subtle hover gradient glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#C9A7FF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[#262039]/60 border border-[#C9A7FF]/20 text-[#C9A7FF] group-hover:scale-110 group-hover:text-[#F5F1EA] transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A7FF] text-sm">{item.tag}</span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#F5F1EA] font-normal group-hover:text-[#FFFFFF] transition-colors">
                      {item.highlight}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A49CB5] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
