import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Check, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { storyData } from "../../data/storyData";
import { soundManager } from "../../utils/audio";

export default function GiftSection() {
  const [isOpen, setIsOpen] = useState(false);
  const { gift } = storyData;

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Play unwrap sparkle chime
    soundManager.playUnwrapSparkle();

    // Fire aesthetic star & lavender confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#C9A7FF", "#F5F1EA", "#E0C8FF", "#FFEAA7", "#9D74E8"],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section id="gift" className="relative min-h-screen py-32 px-6 z-10 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Narrative header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-14 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#C9A7FF]/20 text-xs tracking-widest uppercase text-[#C9A7FF]">
          <Gift className="w-3.5 h-3.5" />
          <span>Kotak Kejutan</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F1EA] font-normal">
          {gift.heading}
        </h2>
        <p className="text-xs sm:text-sm text-[#A49CB5] tracking-wider uppercase">
          {!isOpen ? gift.subheading : gift.unwrappedTag}
        </p>
      </motion.div>

      {/* Gift Box Container */}
      <div className="relative w-full flex flex-col items-center justify-center">
        {!isOpen ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenGift}
            className="group relative cursor-pointer select-none"
          >
            {/* Pulsing aura */}
            <div className="absolute inset-0 rounded-3xl bg-[#C9A7FF]/20 blur-2xl group-hover:bg-[#C9A7FF]/35 transition-all duration-500 animate-pulse" />

            {/* Gift Box Body */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl glass-panel border-2 border-[#C9A7FF]/40 flex flex-col items-center justify-center p-6 shadow-2xl transition-all duration-300 group-hover:border-[#C9A7FF]">
              {/* Vertical Ribbon */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-[#C9A7FF] to-[#8B7AA8] shadow-md flex items-center justify-center">
                <div className="w-[1px] h-full bg-white/40" />
              </div>

              {/* Horizontal Ribbon */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-[#C9A7FF] to-[#8B7AA8] shadow-md flex items-center justify-center">
                <div className="h-[1px] w-full bg-white/40" />
              </div>

              {/* Ribbon Bow in center */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#EAD7FF] text-[#1E1435] flex items-center justify-center shadow-lg border border-white/60 group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "8s" }} />
              </div>

              <span className="absolute -bottom-10 text-xs font-serif italic text-[#C9A7FF] tracking-wider animate-bounce">
                klik untuk buka kado ✦
              </span>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-lg p-8 sm:p-10 rounded-3xl glass-panel border border-[#C9A7FF]/40 shadow-2xl relative overflow-hidden"
            >
              {/* Internal radiant glow */}
              <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#C9A7FF]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-[#8B7AA8]/20 blur-3xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A7FF]/15 border border-[#C9A7FF]/30 text-xs text-[#C9A7FF]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Kado Terbuka</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F1EA] font-normal leading-snug">
                  {gift.message.title}
                </h3>

                <div className="w-12 h-[1px] bg-[#C9A7FF]/50 mx-auto" />

                <p className="font-serif text-base sm:text-lg text-[#E0D8ED] leading-relaxed italic">
                  "{gift.message.body}"
                </p>

                <div className="pt-3 flex items-center justify-center gap-2 text-sm text-[#C9A7FF] font-serif">
                  <Heart className="w-4 h-4 fill-[#C9A7FF]" />
                  <span>{gift.message.signature}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
