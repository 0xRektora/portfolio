import React from "react";

interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export const WindowControls: React.FC<WindowControlsProps> = ({
  onClose,
  onMinimize,
  onMaximize,
}) => (
  <div className="flex items-center gap-2 group">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onMinimize();
      }}
      className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors shadow-inner"
    />
    <button
      onClick={(e) => {
        e.stopPropagation();
        onMaximize();
      }}
      className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors shadow-inner hidden sm:block"
    />
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors shadow-inner"
    />
  </div>
);

