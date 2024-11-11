import React from 'react';

interface StatusBarProps {
  isDark: boolean;
  characterCount: number;
  wordCount: number;
  isSaved: boolean;
  isAutosaving: boolean;
}

export default function StatusBar({
  isDark,
  characterCount,
  wordCount,
  isSaved,
  isAutosaving,
}: StatusBarProps) {
  const getSaveStatus = () => {
    if (isAutosaving) {
      return (
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          </span>
          <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Auto Saving...</span>
        </span>
      );
    }
    return <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>All changes saved</span>;
  };

  return (
    <div className={`px-4 py-2 text-sm transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-800 text-gray-400 border-t border-gray-700' 
        : 'bg-gray-50 text-gray-600 border-t border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>{characterCount} characters</span>
          <span>•</span>
          <span>{wordCount} words</span>
        </div>
        <div className="flex items-center gap-2">
          {getSaveStatus()}
        </div>
      </div>
    </div>
  );
}