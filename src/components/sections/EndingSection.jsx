import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { storyData } from "../../data/storyData";
import { soundManager } from "../../utils/audio";

export default function EndingSection({ onReplay }) {
  const { ending } = storyData;

  const handleReplayClick = () => {
    soundManager.playChime();
    onReplay();
  };

  return (
    <section id="ending" className="relative min-h-screen py-36 px-6 z-10 max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
      <div className="space-y-12">
        {/* Star glyph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#C9A7FF] text-2xl tracking-widest font-serif"
        >
          {ending.symbol}
        </motion.div>

        {/* Narrative lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-2 font-serif text-xl sm:text-2xl text-[#A49CB5] font-light"
        >
          {ending.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </motion.div>

        {/* Second Star */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#C9A7FF] text-2xl tracking-widest font-serif"
        >
          {ending.symbol2}
        </motion.div>

        {/* Climax Birthday Wish */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="space-y-3"
        >
          <p className="font-serif text-2xl sm:text-3xl text-[#E5DFF0] font-light">
            {ending.birthdayLine1}
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F5F1EA] font-normal tracking-tight text-gradient">
            {ending.birthdayName}
          </h2>
          <div className="pt-2 text-xl sm:text-2xl font-serif text-[#C9A7FF] italic font-light space-y-1">
            <p>{ending.birthdayLine2}</p>
            <p>{ending.birthdayLine3}</p>
          </div>
        </motion.div>

        {/* Heart sign */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[#C9A7FF] text-3xl font-serif"
        >
          {ending.heart}
        </motion.div>

        {/* Replay button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-10"
        >
          <button
            onClick={handleReplayClick}
            type="button"
            className="group px-8 py-3.5 rounded-full glass-panel border border-[#C9A7FF]/30 hover:border-[#C9A7FF]/70 text-[#E5DFF0] hover:text-[#FFFFFF] font-serif tracking-widest text-xs uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 mx-auto cursor-pointer shadow-lg hover:shadow-[#C9A7FF]/20 select-none"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C9A7FF] group-hover:-rotate-90 transition-transform duration-500" />
            <span>{ending.replayButton}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
