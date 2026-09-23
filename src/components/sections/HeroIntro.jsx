import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { storyData } from "../../data/storyData";

export default function HeroIntro() {
  const { intro } = storyData;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10 py-20">
      <div className="max-w-2xl mx-auto flex flex-col items-center space-y-8">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#C9A7FF]/20 text-xs tracking-widest uppercase text-[#C9A7FF]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A7FF]" />
          <span>{intro.preTitle}</span>
        </motion.div>

        {/* Name reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative py-2"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#F5F1EA]">
            {intro.name}
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A7FF]/60 to-transparent" />
        </motion.div>

        {/* Buildup text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-4 pt-2"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#E0D8ED] font-light italic">
            "{intro.line1}"
          </p>
          <p className="font-serif text-xl sm:text-2xl sm:leading-relaxed text-[#F5F1EA] max-w-lg mx-auto">
            {intro.line2}
          </p>
        </motion.div>

        {/* Scroll invitation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="pt-12 flex flex-col items-center gap-2 text-xs text-[#A49CB5] tracking-widest uppercase"
        >
          <span>{intro.subtext}</span>
          <ChevronDown className="w-4 h-4 text-[#C9A7FF] animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
