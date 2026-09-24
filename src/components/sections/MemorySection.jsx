import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Calendar, Maximize2 } from "lucide-react";
import { storyData } from "../../data/storyData";
import { soundManager } from "../../utils/audio";

export default function MemorySection() {
  const { memories, memoriesHeader } = storyData;
  const [activeMemory, setActiveMemory] = useState(null);

  const handleOpenMemory = (memory) => {
    soundManager.playChime();
    setActiveMemory(memory);
  };

  return (
    <section id="memories" className="relative min-h-screen py-28 px-6 z-10 max-w-4xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-24 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#C9A7FF]/20 text-xs tracking-widest uppercase text-[#C9A7FF]">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A7FF]" />
          <span>{memoriesHeader?.badge || "Tentang Dirimu ✦"}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F1EA] font-normal">
          {memoriesHeader?.title || "Di Setiap Sudut Pandang"}
        </h2>
        <p className="text-sm sm:text-base text-[#A49CB5] max-w-lg mx-auto italic font-serif leading-relaxed">
          {memoriesHeader?.subtitle || "catatan kecil tentang betapa keren, hebat, dan mengagumkannya kamu di mataku."}
        </p>
      </motion.div>

      {/* Memory items - staggered, progressive editorial flow */}
      <div className="space-y-36">
        {memories.map((memory, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={memory.id}
              initial={{
                opacity: 0,
                y: 50,
                filter: "blur(8px)",
                scale: 0.96,
                rotate: 0,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                rotate: memory.rotation,
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-14`}
            >
              {/* Photo Frame */}
              <div
                onClick={() => handleOpenMemory(memory)}
                className="relative group w-full md:w-3/5 max-w-md cursor-pointer"
                title="Klik untuk melihat cerita lengkap"
              >
                {/* Ambient glow behind card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#C9A7FF]/15 to-[#8B7AA8]/5 blur-2xl group-hover:opacity-100 opacity-60 transition-opacity duration-700 pointer-events-none" />

                {/* Polaroid / Editorial Canvas */}
                <div className="relative p-3.5 sm:p-4 rounded-2xl glass-panel border border-[#C9A7FF]/20 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#171622]">
                    <img
                      src={memory.image}
                      alt={`Kenangan ${memory.number}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14]/70 via-transparent to-transparent pointer-events-none" />

                    {/* View overlay icon */}
                    <div className="absolute bottom-3 right-3 p-2 rounded-full bg-[#0F0F14]/60 backdrop-blur-md text-[#C9A7FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Corner aesthetic pin / star */}
                  <div className="absolute top-2 right-2 text-[#C9A7FF]/40 group-hover:text-[#C9A7FF] transition-colors">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Memory Story & Caption */}
              <div
                className={`w-full md:w-2/5 flex flex-col ${
                  isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"
                } text-center space-y-3`}
              >
                <span className="font-serif text-3xl sm:text-4xl text-[#C9A7FF]/60 font-light tracking-widest">
                  {memory.number}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1EA] font-normal leading-snug">
                  "{memory.caption}"
                </h3>

                {memory.subCaption && (
                  <p className="text-xs sm:text-sm text-[#A49CB5] tracking-wide font-light">
                    {memory.subCaption}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => handleOpenMemory(memory)}
                  className="pt-1 text-xs text-[#C9A7FF] hover:text-white underline underline-offset-4 tracking-wider uppercase font-sans cursor-pointer transition-colors"
                >
                  buka cerita ✦
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F0F14]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-lg w-full rounded-3xl glass-panel border border-[#C9A7FF]/30 p-6 sm:p-8 shadow-2xl space-y-5"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveMemory(null)}
                aria-label="Tutup cerita kenangan"
                className="absolute top-4 right-4 p-2 rounded-full bg-[#1C182B] text-[#A49CB5] hover:text-white transition-colors cursor-pointer border border-[#3A334E]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Expanded Image */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#161423] border border-[#C9A7FF]/20">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Story Details */}
              <div className="space-y-2 text-left">
                {activeMemory.date && (
                  <div className="flex items-center gap-1.5 text-xs text-[#C9A7FF] tracking-wider uppercase">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeMemory.date}</span>
                  </div>
                )}

                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1EA] font-normal">
                  "{activeMemory.caption}"
                </h3>

                <p className="font-serif text-sm sm:text-base text-[#D4CDE0] leading-relaxed italic font-light pt-1">
                  {activeMemory.fullStory || activeMemory.subCaption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
