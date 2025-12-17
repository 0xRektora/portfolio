import React from "react";
import { motion } from "motion/react";
import { AppData } from "@/types";

interface DesktopIconProps {
  app: AppData;
  onOpen: (app: AppData) => void;
  index: number;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  app,
  onOpen,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.3 }}
    className="flex flex-col items-center gap-2 p-3 w-28 cursor-pointer hover:bg-white/10 rounded-xl transition-colors duration-200 group"
    onClick={() => onOpen(app)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-white/20 to-white/5 border border-white/20 shadow-xl backdrop-blur-sm group-hover:scale-105 transition-transform`}
    >
      <app.icon size={32} className={`${app.color} drop-shadow-lg`} />
    </div>
    <span className="text-white text-xs font-medium text-center drop-shadow-md select-none bg-black/30 px-3 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
      {app.title}
    </span>
  </motion.div>
);

