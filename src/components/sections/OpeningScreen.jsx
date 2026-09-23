import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Headphones } from "lucide-react";
import { storyData } from "../../data/storyData";
import { soundManager } from "../../utils/audio";

export default function OpeningScreen({ onEnter }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const sequence = storyData.opening.sequence;

  useEffect(() => {
    // Step through the introductory phrases slowly
    if (currentLineIndex < sequence.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, sequence.length]);

  const handleEnterClick = () => {
    soundManager.playChime();
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6 text-center bg-[#0F0F14]/90 backdrop-blur-md select-none"
    >
      <div className="max-w-md w-full flex flex-col items-center space-y-10">
        {/* Animated sparkling star glyph */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-[#C9A7FF]/30 blur-xl animate-pulse" />
          <Sparkles className="w-8 h-8 text-[#C9A7FF] relative z-10" />
        </motion.div>

        {/* Cinematic sequence lines */}
        <div className="min-h-[140px] flex flex-col items-center justify-center space-y-3">
          <AnimatePresence mode="sync">
            {sequence.slice(0, currentLineIndex + 1).map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`font-serif tracking-wide ${
                  index === sequence.length - 1
                    ? "text-2xl sm:text-3xl text-[#F5F1EA] font-normal"
                    : "text-lg sm:text-xl text-[#A49CB5] font-light"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        {/* Enter button & experience recommendation */}
        <AnimatePresence>
          {currentLineIndex === sequence.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 pt-4"
            >
              <button
                onClick={handleEnterClick}
                type="button"
                className="group relative px-8 py-3.5 rounded-full overflow-hidden glass-panel border border-[#C9A7FF]/30 hover:border-[#C9A7FF]/80 text-[#F5F1EA] font-serif tracking-widest text-sm uppercase transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-[#C9A7FF]/10 hover:shadow-[#C9A7FF]/30 cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A7FF]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative flex items-center gap-2">
                  <span>{storyData.opening.buttonText}</span>
                </span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-[#8B7AA8] tracking-wider pt-2">
                <Headphones className="w-3.5 h-3.5 text-[#C9A7FF]/70" />
                <span>{storyData.opening.hint}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
