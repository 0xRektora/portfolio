import React, { useEffect } from "react";
import {
  useEditor,
  EditorContent,
  Editor as TiptapEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

interface EditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  readOnly?: boolean;
}

const MenuBar = ({ editor }: { editor: TiptapEditor | null }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      icon: <Bold className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      label: "Bold",
    },
    {
      icon: <Italic className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      label: "Italic",
    },
    {
      icon: <Code className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      label: "Code",
    },
    {
      icon: <List className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      label: "Bullet List",
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      label: "Ordered List",
    },
    {
      icon: <Quote className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      label: "Quote",
    },
  ];

  return (
    <div className="border-b border-white/10 p-2 flex gap-1 flex-wrap bg-white/5">
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={btn.onClick}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            btn.isActive ? "bg-white/20 text-white" : "text-gray-400"
          }`}
          title={btn.label}
        >
          {btn.icon}
        </button>
      ))}
      <div className="w-px h-6 bg-white/10 mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-1.5 rounded hover:bg-white/10 transition-colors text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-1.5 rounded hover:bg-white/10 transition-colors text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export const Editor = ({
  initialContent = "",
  onChange,
  readOnly = false,
}: EditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: initialContent,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-full p-4 prose-sm sm:prose-base [&_p]:leading-tight [&_p]:mt-0.5 [&_li]:leading-tight [&_li>p]:my-0 [&_ul]:mt-1 [&_ol]:mt-1",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Update content if initialContent changes drastically (optional)
  useEffect(() => {
    // Basic check to prevent infinite loops if onChange updates the prop
    if (editor && initialContent && editor.getHTML() !== initialContent) {
      // Ideally we don't want to reset content on every prop change if the user is typing
      // So we leave this empty or implementing a more robust sync mechanism if needed.
    }
  }, [initialContent, editor]);

  useEffect(() => {
    editor?.setEditable(!readOnly);
  }, [readOnly, editor]);

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-gray-200">
      {!readOnly && <MenuBar editor={editor} />}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
};
