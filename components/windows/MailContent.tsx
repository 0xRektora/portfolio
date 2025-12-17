import React from "react";
import { Mail, Github, Linkedin, Twitter, Send, X } from "lucide-react";

export const MailContent = () => (
  <div className="h-full flex flex-col text-gray-200">
    <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-purple-500/20 p-2 rounded-full text-purple-300">
          <Mail size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-100">New Message</h3>
          <p className="text-xs text-gray-500">
            To: sadek.walid.mendi@gmail.com
          </p>
        </div>
      </div>
    </div>

    <div className="flex-1 p-6 overflow-y-auto">
      <form
        className="space-y-4 max-w-lg mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="group">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-purple-400 transition-colors">
            Subject
          </label>
          <input
            type="text"
            placeholder="Project Inquiry"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder-gray-600 text-sm"
          />
        </div>

        <div className="group">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 group-focus-within:text-purple-400 transition-colors">
            Message
          </label>
          <textarea
            rows={6}
            placeholder="Hi, I'd like to discuss a project..."
            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none text-sm placeholder-gray-600"
          />
        </div>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex gap-4">
            <a
              href="https://github.com/0xRektora"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/0x-redacted/"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://x.com/primus_walidus"
              className="text-gray-500 hover:text-sky-400 transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-600/30">
            <span>Send</span>
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  </div>
);
