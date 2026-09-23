import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Sparkles, Feather } from "lucide-react";
import { storyData } from "../../data/storyData";

export default function LetterSection() {
  const { letter } = storyData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);

  // Progressive reveal paragraph by paragraph when section scrolls into view
  useEffect(() => {
    if (!isInView) return;

    if (revealedParagraphs < letter.paragraphs.length) {
      const timer = setTimeout(() => {
        setRevealedParagraphs((prev) => prev + 1);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [isInView, revealedParagraphs, letter.paragraphs.length]);

  return (
    <section
      id="letter"
      ref={ref}
      className="relative min-h-screen py-32 px-6 z-10 max-w-3xl mx-auto flex flex-col items-center justify-center"
    >
      {/* Narrative header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#C9A7FF]/20 text-xs tracking-widest uppercase text-[#C9A7FF]">
          <Mail className="w-3.5 h-3.5" />
          <span>Surat Khusus Untukmu</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F1EA] font-normal">
          Dari Lubuk Hati
        </h2>
        <p className="text-xs sm:text-sm text-[#A49CB5] tracking-wide font-light">
          tarik napas pelan-pelan dan baca perlahan ya...
        </p>
      </motion.div>

      {/* Parchment / Letter Envelope Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full relative p-8 sm:p-12 md:p-16 rounded-3xl glass-panel border border-[#C9A7FF]/25 shadow-2xl overflow-hidden"
      >
        {/* Soft background texture and watermarks */}
        <div className="absolute top-0 right-0 p-8 text-[#C9A7FF]/5 pointer-events-none">
          <Feather className="w-40 h-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C182B]/60 via-[#161424]/80 to-[#100E1C]/90 pointer-events-none" />

        <div className="relative space-y-8 text-left z-10">
          {/* Greeting */}
          <div className="flex items-center justify-between border-b border-[#C9A7FF]/15 pb-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F1EA] font-normal tracking-wide">
              {letter.greeting}
            </h3>
            <Sparkles className="w-4 h-4 text-[#C9A7FF]/60" />
          </div>

          {/* Letter Body - Progressive Reveal */}
          <div className="space-y-6 font-serif text-base sm:text-lg sm:leading-relaxed text-[#E5DFF0] font-light">
            {letter.paragraphs.map((para, index) => {
              const isVisible = index < revealedParagraphs;
              const isCurrentTyping = index === revealedParagraphs - 1;

              return (
                <div key={index} className="min-h-[1.5rem]">
                  {isVisible ? (
                    <motion.p
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="relative"
                    >
                      {para}
                      {isCurrentTyping && revealedParagraphs < letter.paragraphs.length && (
                        <span className="inline-block w-1.5 h-4 bg-[#C9A7FF] ml-1.5 animate-pulse align-middle" />
                      )}
                    </motion.p>
                  ) : (
                    <div className="h-4" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Closing & Signature */}
          {revealedParagraphs >= letter.paragraphs.length && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="pt-6 border-t border-[#C9A7FF]/15 flex flex-col items-end text-right font-serif"
            >
              <p className="text-xs sm:text-sm text-[#A49CB5] italic">
                {letter.closing}
              </p>
              <p className="text-base sm:text-lg text-[#F5F1EA] font-normal pt-1">
                {letter.sender}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
