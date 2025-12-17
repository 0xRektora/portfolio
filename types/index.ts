import { LucideIcon } from "lucide-react";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowData {
  id: string;
  title: string;
  type: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: Position;
  size: Size;
  content?: string;
  onProjectClick?: (projectId: number) => void;
}

export interface AppData {
  id: string;
  title: string;
  icon: LucideIcon;
  type: string;
  color: string;
}
