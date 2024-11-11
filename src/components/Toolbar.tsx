import React from 'react';
import { Moon, Sun, Save, FileUp, Copy, FileText } from 'lucide-react';

interface ToolbarProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  fileName: string;
  setFileName: (name: string) => void;
  selectedText: string;
  onCopy: () => void;
  onExportPDF: () => void;
  onFileOpen: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isSaved: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  isDark,
  setIsDark,
  fileName,
  setFileName,
  selectedText,
  onCopy,
  onExportPDF,
  onFileOpen,
  onSave,
  isSaved,
}) => {
  return (
    <div className={`p-4 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className={`px-2 py-1 border rounded ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".txt"
              onChange={onFileOpen}
              className="hidden"
            />
            <FileUp className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          </label>
          <button
            onClick={onExportPDF}
            className={`p-1 rounded hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''}`}
            title="Export as PDF"
          >
            <FileText className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={onSave}
            className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onCopy}
            disabled={!selectedText}
            className={`p-1 rounded ${
              selectedText ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
            } ${isDark ? 'hover:bg-gray-700' : ''}`}
            title={selectedText ? 'Copy selected text' : 'Select text to copy'}
          >
            <Copy className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-1 rounded hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''}`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;