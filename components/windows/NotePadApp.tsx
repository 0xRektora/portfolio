import React from "react";
import { Editor } from "../RichTextEditor";
import { CODENAME } from "@/constants";

interface NotePadAppProps {
  text?: string;
}

export const NotePadApp: React.FC<NotePadAppProps> = ({ text = "" }) => (
  <div className="h-full flex flex-col text-gray-200">
    <div className="flex-1 overflow-hidden">
      <Editor initialContent={text} />
    </div>
    <div className="border-t border-white/10 p-1 px-3 text-xs text-gray-500 bg-white/5 flex justify-between select-none">
      <span>UTF-8</span>
      <span>{CODENAME}</span>
    </div>
  </div>
);
