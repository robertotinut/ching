import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, MessageCircle, Heart, Sparkles, CheckCircle2, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { storyData } from "../../data/storyData";
import { soundManager } from "../../utils/audio";

export default function DeliverySection() {
  const { delivery } = storyData;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (optionKey) => {
    setSelectedOption(optionKey);

    if (optionKey === "accept") {
      soundManager.playUnwrapSparkle();
      // Soft celebratory sparkles
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#C9A7FF", "#FFEAA7", "#F5F1EA"],
      });
    } else {
      soundManager.playChime();
    }
  };

  const currentOption = selectedOption ? delivery.options[selectedOption] : null;

  return (
    <section id="delivery" className="relative min-h-screen py-32 px-6 z-10 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Decorative ambient parcel glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C9A7FF]/10 blur-[120px] pointer-events-none" />

      {/* Narrative header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-10 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#C9A7FF]/30 text-xs tracking-widest uppercase text-[#C9A7FF]">
          <Package className="w-3.5 h-3.5 text-[#C9A7FF]" />
          <span>{delivery.badge}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F1EA] font-normal tracking-wide">
          {delivery.heading}
        </h2>
      </motion.div>

      {/* Main Delivery Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full relative p-8 sm:p-12 rounded-3xl glass-panel border border-[#C9A7FF]/25 shadow-2xl overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C9A7FF]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative space-y-8">
          {/* Paragraphs */}
          <div className="space-y-4 font-serif text-base sm:text-lg sm:leading-relaxed text-[#E5DFF0] font-light">
            {delivery.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Highlighted Question Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#201A33]/80 to-[#181427]/80 border border-[#C9A7FF]/30 space-y-2">
            <div className="flex items-center justify-center gap-2 text-[#C9A7FF] text-xs uppercase tracking-widest font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>sebuah pertanyaan kecil untukmu</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <p className="font-serif text-lg sm:text-2xl text-[#F5F1EA] font-normal leading-snug">
              "{delivery.question}"
            </p>

            <p className="text-xs sm:text-sm text-[#A49CB5] font-light italic">
              {delivery.subQuestion}
            </p>
          </div>

          {/* Interactive choices */}
          <AnimatePresence mode="wait">
            {!selectedOption ? (
              <motion.div
                key="choices"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
              >
                <button
                  type="button"
                  onClick={() => handleSelect("accept")}
                  className="group relative p-5 rounded-2xl bg-gradient-to-r from-[#C9A7FF]/15 to-[#8B7AA8]/20 border border-[#C9A7FF]/40 hover:border-[#C9A7FF] text-left transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer shadow-lg hover:shadow-[#C9A7FF]/20 select-none"
                >
                  <div className="flex items-center gap-2 text-[#C9A7FF] mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Iya</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#F5F1EA] font-medium group-hover:text-white">
                    {delivery.options.accept.label}
                  </h4>
                  <p className="text-xs text-[#A49CB5] mt-1 font-light">
                    {delivery.options.accept.subLabel}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelect("later")}
                  className="group relative p-5 rounded-2xl bg-[#1C182B]/60 border border-[#3A334E]/60 hover:border-[#C9A7FF]/40 text-left transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer shadow-lg select-none"
                >
                  <div className="flex items-center gap-2 text-[#A49CB5] mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Nanti dulu</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg text-[#F5F1EA] font-medium group-hover:text-white">
                    {delivery.options.later.label}
                  </h4>
                  <p className="text-xs text-[#A49CB5] mt-1 font-light">
                    {delivery.options.later.subLabel}
                  </p>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="response-view"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6 pt-2"
              >
                <div className="p-6 sm:p-8 rounded-2xl bg-[#201A33]/90 border border-[#C9A7FF]/40 space-y-4">
                  <div className="inline-flex items-center gap-2 text-sm text-[#C9A7FF] font-medium">
                    <Heart className="w-4 h-4 fill-[#C9A7FF]" />
                    <span>{currentOption.responseTitle}</span>
                  </div>

                  <p className="font-serif text-base sm:text-lg text-[#F5F1EA] leading-relaxed">
                    {currentOption.responseText}
                  </p>

                  {/* Direct WhatsApp link */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${delivery.whatsappNumber}?text=${encodeURIComponent(
                        currentOption.waMessageTemplate
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-medium text-sm shadow-lg hover:shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{currentOption.waButtonText}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedOption(null)}
                      className="text-xs text-[#A49CB5] hover:text-[#F5F1EA] underline underline-offset-4 transition-colors cursor-pointer py-2 px-3"
                    >
                      ganti jawaban
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
