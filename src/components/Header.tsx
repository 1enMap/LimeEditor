import React from 'react';
import { Save, FileText, Copy, Trash, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  fileName: string;
  setFileName: (name: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onCopy: () => void;
  onClear: () => void;
  onSave: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Header({
  fileName,
  setFileName,
  isDark,
  onThemeToggle,
  onCopy,
  onClear,
  onSave,
  onFileSelect,
}: HeaderProps) {
  return (
    <div className={`p-4 border-b transition-colors duration-300 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".txt"
              onChange={onFileSelect}
              className="hidden"
            />
            <FileText className={`w-5 h-5 ${isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'}`} />
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className={`px-2 py-1 rounded border transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-gray-200' 
                : 'bg-gray-50 border-gray-200 text-gray-800'
            }`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-full hover:bg-opacity-80 transition-colors duration-300 ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button
            onClick={onCopy}
            className={`p-2 rounded-full hover:bg-opacity-80 transition-colors duration-300 ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Copy className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={onClear}
            className={`p-2 rounded-full hover:bg-opacity-80 transition-colors duration-300 ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Trash className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={onSave}
            className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors duration-300 ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}