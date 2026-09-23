import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sparkles, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { storyData } from "../../data/storyData";
import { soundManager } from "../../utils/audio";

export default function WishSection() {
  const { wish } = storyData;
  const [userWish, setUserWish] = useState("");
  const [isFlameBlown, setIsFlameBlown] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBlowFlame = () => {
    if (isFlameBlown) return;
    setIsFlameBlown(true);
    soundManager.playCandleBlow();

    // Subtle sparkler burst upon blowing candle
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.5 },
      shapes: ["circle"],
      colors: ["#FFEAA7", "#FFFFFF", "#C9A7FF"],
      scalar: 0.7,
    });
  };

  const handleMakeWish = (e) => {
    e.preventDefault();
    if (!userWish.trim() || isSubmitting) return;

    setIsSubmitting(true);
    soundManager.playWishMagic();

    // Magical star burst
    setTimeout(() => {
      setIsGranted(true);
      setIsSubmitting(false);

      // Celestial star confetti
      confetti({
        particleCount: 140,
        spread: 110,
        origin: { y: 0.6 },
        shapes: ["star"],
        colors: ["#FFEAA7", "#C9A7FF", "#FFFFFF", "#EAD7FF"],
      });
    }, 1400);
  };

  return (
    <section id="wish" className="relative min-h-screen py-32 px-6 z-10 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Radiant Moon and Candle Scene */}
      <div className="relative mb-8 flex flex-col items-center">
        {/* Soft Moon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-[#EAD7FF]/25 blur-3xl scale-150 animate-pulse pointer-events-none" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#E5DFF0] via-[#FBF9FE] to-[#D5C7EE] shadow-[0_0_45px_rgba(234,215,255,0.35)] flex items-center justify-center border border-white/60">
            <Moon className="w-8 h-8 text-[#473B63] fill-[#473B63]/10" />
          </div>
        </motion.div>

        {/* Floating Lantern Animation during submission */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.6 }}
              animate={{ opacity: 1, y: -160, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute z-30 pointer-events-none flex flex-col items-center"
            >
              <div className="p-3 rounded-2xl bg-gradient-to-t from-[#FFD166]/40 to-[#FFEAA7]/90 border border-[#FFF3B0] shadow-[0_0_35px_#FFEAA7] text-xs font-serif text-[#332200] max-w-[200px] truncate">
                ✨ {userWish}
              </div>
              <div className="w-2 h-6 bg-[#FFD166]/60 blur-xs rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Candle */}
        <div
          onClick={handleBlowFlame}
          className="group relative cursor-pointer flex flex-col items-center select-none"
          title={!isFlameBlown ? "Ketuk untuk meniup lilin" : "Lilin sudah ditiup"}
        >
          {/* Flame & Glow */}
          <div className="relative h-12 flex items-center justify-center">
            <AnimatePresence>
              {!isFlameBlown ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.15, 0.95, 1.1, 1],
                    y: [0, -2, 1, -1, 0],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.2,
                    y: -15,
                    filter: "blur(6px)",
                  }}
                  transition={{
                    scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                    y: { repeat: Infinity, duration: 1.4, ease: "easeInOut" },
                    exit: { duration: 0.5 },
                  }}
                  className="relative flex items-center justify-center"
                >
                  {/* Outer warmth aura */}
                  <div className="absolute w-12 h-16 rounded-full bg-[#FFD166]/40 blur-lg" />
                  {/* Flame teardrop */}
                  <div className="w-4 h-7 bg-gradient-to-t from-[#FF9F1C] via-[#FFD166] to-[#FFFFFF] rounded-t-full rounded-b-md shadow-[0_0_20px_#FFD166] transition-transform group-hover:scale-125" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.6, 0], y: -25, x: [0, 4, -4, 2] }}
                  transition={{ duration: 1.8 }}
                  className="w-1.5 h-6 bg-[#C9A7FF]/30 blur-xs rounded-full"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Candle wick */}
          <div className="w-0.5 h-2.5 bg-[#4A3E5C]" />

          {/* Candle Pillar */}
          <div className="w-7 h-14 rounded-t-sm rounded-b-md bg-gradient-to-b from-[#F5F1EA] via-[#E8DEFA] to-[#C9A7FF] shadow-lg border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/40" />
          </div>

          {/* Hint */}
          <p className="mt-3 text-xs font-serif italic text-[#C9A7FF] tracking-wider transition-colors group-hover:text-white">
            {!isFlameBlown ? wish.candlePrompt : wish.candleBlownText}
          </p>
        </div>
      </div>

      {/* Narrative prompt */}
      <div className="space-y-3 mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-base sm:text-lg text-[#A49CB5]"
        >
          {wish.title}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl text-[#F5F1EA] font-normal tracking-wide"
        >
          {wish.prompt}
        </motion.h2>
      </div>

      {/* Wish interaction */}
      <div className="w-full max-w-md">
        {!isGranted ? (
          <motion.form
            onSubmit={handleMakeWish}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="relative group">
              <input
                type="text"
                value={userWish}
                onChange={(e) => setUserWish(e.target.value)}
                placeholder={wish.placeholder}
                maxLength={120}
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-2xl glass-panel border border-[#C9A7FF]/30 text-[#F5F1EA] placeholder-[#8B7AA8] text-sm sm:text-base focus:outline-none focus:border-[#C9A7FF] focus:ring-2 focus:ring-[#C9A7FF]/20 transition-all duration-300 shadow-xl"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A7FF]/50 pointer-events-none" />
            </div>

            <button
              type="submit"
              disabled={!userWish.trim() || isSubmitting}
              className={`w-full py-4 rounded-2xl font-serif text-sm tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                userWish.trim() && !isSubmitting
                  ? "bg-gradient-to-r from-[#C9A7FF] to-[#9D74E8] text-[#120E21] hover:brightness-110 active:scale-98 shadow-[#C9A7FF]/20 hover:shadow-[#C9A7FF]/40 font-medium"
                  : "bg-[#252037]/50 text-[#6B637B] cursor-not-allowed border border-[#3A3250]/40"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#120E21] animate-spin" />
                  <span>menerbangkan harapan ke bintang...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>{wish.button}</span>
                </div>
              )}
            </button>
          </motion.form>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="p-8 sm:p-10 rounded-3xl glass-panel border border-[#C9A7FF]/40 space-y-4 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A7FF]/10 via-transparent to-[#FFEAA7]/10 pointer-events-none" />

              <div className="relative space-y-4">
                <div className="inline-flex p-3 rounded-full bg-[#C9A7FF]/20 text-[#FFEAA7]">
                  <Star className="w-6 h-6 fill-[#FFEAA7]" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1EA] font-normal leading-snug">
                  "{wish.climaxResponse}"
                </h3>

                <p className="text-xs sm:text-sm text-[#C9A7FF] tracking-wider font-light">
                  {wish.subResponse}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
