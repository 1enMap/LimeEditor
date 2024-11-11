import React, { useCallback, useEffect, useRef } from 'react';

interface EditorProps {
  isDark: boolean;
  content: string;
  setContent: (content: string) => void;
  onSave: () => void;
  onTextSelect: (text: string, start: number, end: number) => void;
}

const Editor: React.FC<EditorProps> = ({
  isDark,
  content,
  setContent,
  onSave,
  onTextSelect,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSave();
    }
  }, [onSave]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (selectedText) {
      onTextSelect(selectedText, start, end);
      // Add highlight effect
      textarea.style.setProperty('--selection-bg', isDark ? '#3b82f680' : '#60a5fa80');
    }
  };

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <style>
        {`
          .editor-textarea::selection {
            background-color: var(--selection-bg, ${isDark ? '#3b82f680' : '#60a5fa80'});
            color: inherit;
          }
        `}
      </style>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onSelect={handleSelect}
        className={`w-full h-full p-4 rounded-lg resize-none focus:outline-none focus:ring-2 editor-textarea
          ${
            isDark
              ? 'bg-gray-800 text-gray-100 focus:ring-blue-500/50'
              : 'bg-white text-gray-800 focus:ring-blue-500'
          }`}
        placeholder="Start typing..."
      />
    </div>
  );
};

export default Editor;