import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, Volume2, VolumeX } from "lucide-react";

interface MusicTrayControlProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const MusicTrayControl: React.FC<MusicTrayControlProps> = ({
  videoRef,
}) => {
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [showClickMe, setShowClickMe] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(true);

  // Sync state with video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateVolume = () => {
      if (isMuted) {
        video.muted = true;
        return;
      }
      video.muted = false;

      const { currentTime, duration } = video;

      // If duration isn't available yet, just set volume normally
      if (!duration) {
        video.volume = volume / 100;
        return;
      }

      const FADE_DURATION = 2;
      let fadeFactor = 1;

      if (currentTime < FADE_DURATION) {
        // Ease in
        fadeFactor = currentTime / FADE_DURATION;
      } else if (currentTime > duration - FADE_DURATION) {
        // Ease out
        fadeFactor = (duration - currentTime) / FADE_DURATION;
      }

      video.volume = (volume / 100) * Math.max(0, Math.min(1, fadeFactor));
    };

    // Add listener for time updates
    video.addEventListener("timeupdate", updateVolume);

    // Apply immediately
    updateVolume();

    return () => {
      video.removeEventListener("timeupdate", updateVolume);
    };
  }, [volume, isMuted, videoRef]);

  return (
    <>
      {/* Music Control Popup */}
      <AnimatePresence>
        {isMusicOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-4 bg-gray-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl w-64 z-50"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white flex items-center gap-2">
                  <Music size={16} className="text-blue-400" />
                  Music Player
                </span>
                <span className="text-xs text-gray-400">{volume}%</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-300"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => {
                    const newVol = parseInt(e.target.value);
                    setVolume(newVol);
                    if (newVol > 0 && isMuted) setIsMuted(false);
                  }}
                  className="flex-1 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`hidden sm:block hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer relative ${
          isMusicOpen ? "bg-white/10 text-blue-400" : ""
        }`}
        onClick={() => {
          setIsMusicOpen(!isMusicOpen);
          setShowClickMe(false);
          if (!isMusicOpen && isMuted) setIsMuted(false);
        }}
      >
        <Music size={16} />
        <AnimatePresence>
          {showClickMe && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 10, x: "-50%" }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.2 },
              }}
              className="absolute bottom-full left-1/2 mb-3 bg-gray-900/90 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap pointer-events-none flex flex-col items-center"
            >
              Click me!
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 border-r border-b border-white/10 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
