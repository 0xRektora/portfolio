import React, { useState } from "react";
import { Construction } from "lucide-react";
import { TextRoll } from "@/components/motion-primitives/text-roll";

export const ChatContent = () => {
  const [key, setKey] = useState(0);

  const handleAnimationComplete = () => {
    // Small delay before restarting the animation
    setTimeout(() => {
      setKey((prev) => prev + 1);
    }, 500);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 p-8 bg-black/20">
      <Construction
        size={120}
        className="text-yellow-400 drop-shadow-lg animate-pulse"
      />
      <TextRoll
        key={key}
        className="overflow-clip text-4xl md:text-5xl font-bold text-white text-center"
        variants={{
          enter: {
            initial: { y: 0 },
            animate: { y: 40 },
          },
          exit: {
            initial: { y: -40 },
            animate: { y: 0 },
          },
        }}
        duration={0.3}
        getEnterDelay={(i) => i * 0.05}
        getExitDelay={(i) => i * 0.05 + 0.05}
        transition={{
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        In construction...
      </TextRoll>
    </div>
  );
};
