import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "../utils/audio";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    soundManager.toggle();
    soundManager.playChime();
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={handleToggle}
        type="button"
        title={isPlaying ? "Senyapkan musik latar" : "Putar musik latar"}
        aria-label="Toggle background music"
        className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel border border-[#C9A7FF]/20 hover:border-[#C9A7FF]/50 transition-all duration-300 shadow-lg hover:shadow-[#C9A7FF]/10 active:scale-95 cursor-pointer select-none"
      >
        {/* Equalizer animation when playing */}
        {isPlaying ? (
          <div className="flex items-center gap-0.5 h-3.5 px-0.5">
            <span className="w-0.5 bg-[#C9A7FF] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
            <span className="w-0.5 bg-[#EAD7FF] rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-3.5" />
            <span className="w-0.5 bg-[#C9A7FF] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2" />
            <span className="w-0.5 bg-[#8B7AA8] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.1s] h-3" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-[#A49CB5] group-hover:text-[#F5F1EA] transition-colors" />
        )}

        <span className="text-xs font-medium tracking-wider text-[#A49CB5] group-hover:text-[#F5F1EA] transition-colors uppercase">
          {isPlaying ? "musik aktif" : "musik senyap"}
        </span>

        {isPlaying && (
          <Volume2 className="w-3.5 h-3.5 text-[#C9A7FF] animate-pulse" />
        )}
      </button>
    </div>
  );
}
