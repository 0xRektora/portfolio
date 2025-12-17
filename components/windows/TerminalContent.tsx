import React from "react";
import { CODENAME, SKILLS } from "@/constants";

export const TerminalContent = () => (
  <div className="h-full bg-black/40 text-emerald-400 font-vt323 text-lg p-4 overflow-y-auto">
    <div className="mb-4">
      <span className="text-blue-400">visitor@portfolio</span>:
      <span className="text-purple-400">~</span>$ neofetch
    </div>

    <div className="flex flex-col sm:flex-row gap-6 mb-6">
      <div className="hidden sm:block text-pink-500 select-none opacity-80">
        <pre>{`
   .d8888b.  
  d88P  Y88b 
  Y88b.      
   "Y888b.   
      "Y88b. 
        "888 
  Y88b  d88P 
   "Y8888P"  
        `}</pre>
      </div>
      <div className="space-y-1 text-gray-300">
        <div>
          <span className="text-pink-500 font-bold">User</span>: Visitor
        </div>
        <div>
          <span className="text-pink-500 font-bold">Host</span>: {CODENAME}
        </div>
        <div>
          <span className="text-pink-500 font-bold">Uptime</span>: Forever
        </div>
        <div>
          <span className="text-pink-500 font-bold">Shell</span>: Swm 6.7
        </div>
        <div className="flex gap-2 mt-2 opacity-80">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
        </div>
      </div>
    </div>

    <div className="mb-2">
      <span className="text-blue-400">visitor@portfolio</span>:
      <span className="text-purple-400">~</span>$ list-skills
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {SKILLS.map((skillGroup) => (
        <div key={skillGroup.category}>
          <div className="text-yellow-400 mb-1 font-bold bg-white/5 inline-block px-1 rounded">
            ./{skillGroup.category}
          </div>
          {skillGroup.items.map((item) => (
            <div
              key={item}
              className="text-gray-400 ml-4 hover:text-white transition-colors"
            >
              ↳ {item}
            </div>
          ))}
        </div>
      ))}
      <div className="text-gray-400 hover:text-white transition-colors">
        And more... Just ask me!
      </div>
    </div>

    <div className="animate-pulse mt-2">
      <span className="text-blue-400">visitor@portfolio</span>:
      <span className="text-purple-400">~</span>${" "}
      <span className="w-2 h-4 bg-gray-500 inline-block align-middle"></span>
    </div>
  </div>
);
