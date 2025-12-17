import React, { useRef, useState } from "react";
import { motion, useDragControls } from "motion/react";
import {
  Terminal,
  Folder,
  Mail,
  FileText,
  Music,
  Gamepad2,
  MessageCircle,
} from "lucide-react";
import { WindowData, Position, Size } from "@/types";
import { WindowControls } from "./WindowControls";
import { Welcome } from "./windows/Welcome";
import { Credits } from "./windows/Credits";
import { ExplorerContent } from "./windows/ExplorerContent";
import { TerminalContent } from "./windows/TerminalContent";
import { MailContent } from "./windows/MailContent";
import { RockPaperScissors } from "./windows/RockPaperScissors";
import { NotePadApp } from "./windows/NotePadApp";
import { ChatContent } from "./windows/ChatContent";
import { getProjectContent } from "@/constants";

interface AppWindowProps {
  window: WindowData;
  isActive: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, pos: Position) => void;
  onResize: (id: string, size: Size, position?: Position) => void;
}

export const AppWindow: React.FC<AppWindowProps> = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
}) => {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const getWindowContent = () => {
    switch (window.type) {
      case "terminal":
        return <TerminalContent />;
      case "explorer":
        return <ExplorerContent onProjectClick={window.onProjectClick} />;
      case "notepad":
        if (window.id === "credits") {
          return <Credits />;
        }
        if (window.id.startsWith("project-")) {
          const projectId = parseInt(window.id.replace("project-", ""));
          return <NotePadApp text={getProjectContent(projectId)} />;
        }
        return <Welcome />;
      case "mail":
        return <MailContent />;
      case "game":
        return <RockPaperScissors />;
      case "chat":
        return <ChatContent />;
      default:
        return <div className="p-4">Content not found</div>;
    }
  };

  const handleResizeStart = (e: React.PointerEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = window.size.width;
    const startHeight = window.size.height;
    const startPosX = window.position.x;
    const startPosY = window.position.y;

    const handleMouseMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newPosX = startPosX;
      let newPosY = startPosY;

      if (direction.includes("e")) {
        newWidth = Math.max(300, startWidth + deltaX);
      }
      if (direction.includes("s")) {
        newHeight = Math.max(200, startHeight + deltaY);
      }
      if (direction.includes("w")) {
        const potentialWidth = startWidth - deltaX;
        if (potentialWidth >= 300) {
          newWidth = potentialWidth;
          newPosX = startPosX + deltaX;
        }
      }
      if (direction.includes("n")) {
        const potentialHeight = startHeight - deltaY;
        if (potentialHeight >= 200) {
          newHeight = potentialHeight;
          newPosY = startPosY + deltaY;
        }
      }

      onResize(
        window.id,
        { width: newWidth, height: newHeight },
        { x: newPosX, y: newPosY }
      );
    };

    const handleMouseUp = (upEvent: PointerEvent) => {
      setIsResizing(false);
      target.releasePointerCapture(upEvent.pointerId);
      document.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("pointerup", handleMouseUp);
    };

    document.addEventListener("pointermove", handleMouseMove);
    document.addEventListener("pointerup", handleMouseUp);
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!window.isMaximized && !isResizing}
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      onDragEnd={() => {
        // Calculate new position relative to the viewport
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
          onMove(window.id, { x: rect.left, y: rect.top });
        }
      }}
      initial={{
        opacity: 0,
        scale: 0.95,
        x: window.isMaximized ? 0 : window.position.x,
        y: (window.isMaximized ? 0 : window.position.y) + 20,
      }}
      animate={{
        opacity: window.isMinimized ? 0 : 1,
        scale: window.isMinimized ? 0.95 : 1,
        width: window.isMaximized ? "100%" : window.size.width,
        height: window.isMaximized ? "100%" : window.size.height,
        x: window.isMaximized ? 0 : window.position.x,
        y:
          (window.isMaximized ? 0 : window.position.y) +
          (window.isMinimized ? 100 : 0),
        top: 0,
        left: 0,
        borderRadius: window.isMaximized ? 0 : "0.75rem",
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 },
        width: { duration: isResizing ? 0 : 0.2 },
        height: { duration: isResizing ? 0 : 0.2 },
        x: { duration: isResizing ? 0 : 0.2 },
        y: { duration: isResizing ? 0 : 0.2 },
      }}
      style={{
        zIndex: window.zIndex,
        position: "fixed",
      }}
      // GLASSMORPHISM CONTAINER
      className={`flex flex-col overflow-hidden
        bg-gray-900/70 backdrop-blur-2xl border border-white/10 shadow-2xl
        ${
          isActive
            ? "ring-1 ring-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "opacity-90"
        }
      `}
      onPointerDown={() => onFocus(window.id)}
    >
      {/* Resize Handles - Only when not maximized */}
      {!window.isMaximized && (
        <>
          {/* Top Edge */}
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, "n")}
          />
          {/* Bottom Edge */}
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, "s")}
          />
          {/* Left Edge */}
          <div
            className="absolute top-2 bottom-2 left-0 w-1 cursor-ew-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, "w")}
          />
          {/* Right Edge */}
          <div
            className="absolute top-2 bottom-2 right-0 w-1 cursor-ew-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, "e")}
          />

          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50"
            onPointerDown={(e) => handleResizeStart(e, "se")}
          />
        </>
      )}

      {/* Glass Title Bar */}
      <div
        className={`h-10 border-b border-white/10 flex items-center justify-between px-4 select-none shrink-0
          bg-linear-to-r from-white/5 to-transparent
          ${
            window.isMaximized
              ? "cursor-default"
              : "cursor-default sm:cursor-move"
          }
        `}
        onPointerDown={(e) => {
          if (!window.isMaximized) dragControls.start(e);
        }}
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div className="flex items-center gap-3 text-sm text-gray-200 font-medium tracking-wide">
          {window.type === "terminal" && (
            <Terminal size={14} className="text-emerald-400" />
          )}
          {window.type === "explorer" && (
            <Folder size={14} className="text-yellow-400" />
          )}
          {window.type === "notepad" && (
            <FileText size={14} className="text-blue-400" />
          )}
          {window.type === "mail" && (
            <Mail size={14} className="text-purple-400" />
          )}
          {window.type === "music" && (
            <Music size={14} className="text-pink-400" />
          )}
          {window.type === "game" && (
            <Gamepad2 size={14} className="text-red-400" />
          )}
          {window.type === "chat" && (
            <MessageCircle size={14} className="text-cyan-400" />
          )}
          <span className="opacity-90">{window.title}</span>
        </div>
        <WindowControls
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onMaximize={() => onMaximize(window.id)}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-transparent">
        {getWindowContent()}
      </div>
    </motion.div>
  );
};
