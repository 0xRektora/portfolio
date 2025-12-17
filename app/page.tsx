"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Globe, FileText } from "lucide-react";
import { WindowData, Position, AppData, Size } from "@/types";
import {
  INITIAL_WINDOWS,
  APPS,
  PROJECTS,
  getProjectContent,
} from "@/constants";
import { DesktopIcon } from "@/components/DesktopIcon";
import { AppWindow } from "@/components/AppWindow";
import { TaskbarItem } from "@/components/TaskbarItem";
import { MusicTrayControl } from "@/components/MusicTrayControl";

export default function OS_Portfolio() {
  const [windows, setWindows] = useState<WindowData[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<string>("welcome");
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [maxRows, setMaxRows] = useState(5);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateMaxRows = () => {
      if (!gridRef.current) return;

      const container = gridRef.current;
      const containerHeight = container.clientHeight;
      const padding = 48; // p-6 = 24px top + 24px bottom
      const availableHeight = containerHeight - padding;

      // Estimate: each icon is ~112px tall (icon 56px + gap 8px + text ~24px + padding 24px)
      // Plus gap-6 (24px) between rows
      const iconHeight = 112; // Approximate height of DesktopIcon
      const rowGap = 24; // gap-6
      const rowHeight = iconHeight + rowGap;

      const rows = Math.floor(availableHeight / rowHeight);
      setMaxRows(Math.max(1, rows));
    };

    calculateMaxRows();
    window.addEventListener("resize", calculateMaxRows);
    return () => window.removeEventListener("resize", calculateMaxRows);
  }, []);

  const openWindow = (app: AppData) => {
    const existingWindow = windows.find((w) => w.id === app.id);

    if (existingWindow) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === app.id
            ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 }
            : w
        )
      );
      setActiveWindowId(app.id);
      setMaxZIndex((prev) => prev + 1);
    } else {
      const defaultWidth = 640;
      const width = app.id === "projects" ? defaultWidth * 1.2 : defaultWidth;

      const newWindow: WindowData = {
        id: app.id,
        title: app.title,
        type: app.type,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: maxZIndex + 1,
        position: { x: 50 + windows.length * 30, y: 50 + windows.length * 30 },
        size: { width, height: 480 },
      };
      setWindows([...windows, newWindow]);
      setActiveWindowId(app.id);
      setMaxZIndex((prev) => prev + 1);
    }
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleMinimize = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const newMinimizedState = !w.isMinimized;
          if (!newMinimizedState) {
            setActiveWindowId(id);
          }
          return {
            ...w,
            isMinimized: newMinimizedState,
            zIndex: !newMinimizedState ? maxZIndex + 1 : w.zIndex,
          };
        }
        return w;
      })
    );
    if (windows.find((w) => w.id === id)?.isMinimized) {
      setMaxZIndex((prev) => prev + 1);
    }
  };

  const toggleMaximize = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    focusWindow(id);
  };

  const focusWindow = (id: string) => {
    if (activeWindowId === id) return;
    setActiveWindowId(id);
    setMaxZIndex((prev) => prev + 1);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w))
    );
  };

  const moveWindow = (id: string, newPos: Position) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: newPos } : w))
    );
  };

  const resizeWindow = (id: string, newSize: Size, newPos?: Position) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, size: newSize, position: newPos || w.position }
          : w
      )
    );
  };

  const handleProjectClick = (projectId: number) => {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) return;

    const windowId = `project-${projectId}`;
    const existingWindow = windows.find((w) => w.id === windowId);

    if (existingWindow) {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === windowId
            ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 }
            : w
        )
      );
      setActiveWindowId(windowId);
      setMaxZIndex((prev) => prev + 1);
    } else {
      // Extract company name from project name (before the dash)
      const companyName = project.name.split(" - ")[0];
      const newWindow: WindowData = {
        id: windowId,
        title: `${companyName}.txt`,
        type: "notepad",
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: maxZIndex + 1,
        position: { x: 50 + windows.length * 30, y: 50 + windows.length * 30 },
        size: { width: 800, height: 600 },
        content: getProjectContent(projectId),
      };
      setWindows([...windows, newWindow]);
      setActiveWindowId(windowId);
      setMaxZIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden select-none font-vt323 text-gray-100 relative bg-black">
      {/* Video Background Layer */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110 pointer-events-none select-none"
          src="The Drive.webm"
        />
        {/* Overlay to dim video slightly for readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      </div>

      {/* Desktop Grid */}
      <div
        ref={gridRef}
        className="relative z-10 p-6 grid gap-y-6 gap-x-22 content-start h-[calc(100vh-56px)] w-fit"
        style={{
          gridTemplateRows: `repeat(${maxRows}, minmax(0, max-content))`,
          gridTemplateColumns: "repeat(auto-fill, minmax(0, max-content))",
          gridAutoFlow: "column",
        }}
      >
        {APPS.map((app, i) => (
          <DesktopIcon key={app.id} app={app} onOpen={openWindow} index={i} />
        ))}
      </div>

      {/* Windows Layer */}
      <AnimatePresence>
        {windows.map(
          (window) =>
            !window.isMinimized && (
              <AppWindow
                key={window.id}
                window={{ ...window, onProjectClick: handleProjectClick }}
                isActive={activeWindowId === window.id}
                onClose={closeWindow}
                onMinimize={toggleMinimize}
                onMaximize={toggleMaximize}
                onFocus={focusWindow}
                onMove={moveWindow}
                onResize={resizeWindow}
              />
            )
        )}
      </AnimatePresence>

      {/* Glass Taskbar */}
      <div className="absolute bottom-3 left-3 right-3 h-14 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center px-4 justify-between z-50 shadow-2xl">
        <div className="flex items-center gap-2 h-full">
          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mr-2 p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400 group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Cpu size={24} className="relative z-10" />
          </motion.button>

          <div className="w-px h-6 bg-white/10 mx-2" />

          {/* Running Apps */}
          <div className="flex gap-1 h-full py-2">
            {windows.map((window) => {
              const app = APPS.find((a) => a.id === window.id) || {
                id: window.id,
                title: window.title,
                icon: FileText,
                type: "notepad",
                color: "text-gray-300",
              };
              return (
                <TaskbarItem
                  key={window.id}
                  app={app}
                  isOpen={!window.isMinimized}
                  isActive={activeWindowId === window.id && !window.isMinimized}
                  onClick={() => {
                    if (activeWindowId === window.id && !window.isMinimized) {
                      toggleMinimize(window.id);
                    } else {
                      focusWindow(window.id);
                      if (window.isMinimized) toggleMinimize(window.id);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-4 text-gray-300 text-xs sm:text-sm px-2 relative">
          <MusicTrayControl videoRef={videoRef} />

          <div className="flex gap-2">
            <div
              className="hidden sm:block hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_blank"
                )
              }
            >
              <Globe size={16} />
            </div>
          </div>
          <div className="h-6 w-px bg-white/10 mx-1"></div>
          <div className="flex flex-col items-end leading-none">
            <span className="font-medium text-white">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5">
              {currentTime.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
