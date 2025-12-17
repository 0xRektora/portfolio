import React from "react";
import { motion } from "motion/react";
import { AppData } from "@/types";

interface TaskbarItemProps {
  app: AppData;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
}

export const TaskbarItem: React.FC<TaskbarItemProps> = ({
  app,
  isOpen,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`
      h-full px-3 flex items-center gap-2 transition-all relative group
      ${!isActive && "hover:bg-white/5"}
    `}
  >
    {/* Active Window Background Highlight */}
    {isActive && (
      <motion.div
        layoutId="taskbar-active-bg"
        className="absolute inset-0 bg-white/10 rounded-lg"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}

    {/* Open Indicator Line */}
    {isOpen && (
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
        transition={{ duration: 0.2 }}
      />
    )}

    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`transition-transform duration-200 relative z-10`}
    >
      <app.icon size={20} className={app.color} />
    </motion.div>
    <span
      className={`hidden sm:inline text-xs font-medium transition-colors relative z-10 ${
        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
      }`}
    >
      {app.title.split(".")[0]}
    </span>
  </button>
);

