import React, { useState, useCallback, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import Toast from './components/Toast';
import StatusBar from './components/StatusBar';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('untitled.txt');
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const [isSaved, setIsSaved] = useState(true);
  const [isAutosaving, setIsAutosaving] = useState(false);
  const [autoSavedContent, setAutoSavedContent] = useState('');

  const handleAutoSave = useDebounce(async () => {
    if (content !== autoSavedContent) {
      setIsAutosaving(true);
      try {
        localStorage.setItem('autosaved_content', content);
        localStorage.setItem('autosaved_filename', fileName);
        setAutoSavedContent(content);
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsSaved(true);
      } finally {
        setIsAutosaving(false);
      }
    }
  }, 700);

  useEffect(() => {
    const savedContent = localStorage.getItem('autosaved_content');
    const savedFileName = localStorage.getItem('autosaved_filename');
    if (savedContent) {
      setContent(savedContent);
      setAutoSavedContent(savedContent);
    }
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }, []);

  useEffect(() => {
    if (content !== autoSavedContent) {
      setIsSaved(false);
      handleAutoSave();
    }
  }, [content, autoSavedContent, handleAutoSave]);

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    setToast({ message: 'File saved successfully', type: 'success' });
    setIsSaved(true);
    setAutoSavedContent(content);
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      const splitContent = doc.splitTextToSize(content, 180);
      doc.text(splitContent, 15, 15);
      doc.save(fileName.replace('.txt', '.pdf'));
      setToast({ message: 'PDF exported successfully', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to export PDF', type: 'error' });
    }
  };

  const handleFileOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/plain') {
      setToast({ message: 'Please select a text file (.txt)', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setContent(text);
        setFileName(file.name);
        setAutoSavedContent(text);
        setToast({ message: 'File opened successfully', type: 'success' });
      }
    };
    reader.onerror = () => {
      setToast({ message: 'Error reading file', type: 'error' });
    };
    reader.readAsText(file);
  };

  const handleTextSelect = useCallback((text: string, start: number, end: number) => {
    setSelectedText(text);
    setSelectionRange({ start, end });
  }, []);

  const handleCopy = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText).then(() => {
        setToast({ message: 'Text copied to clipboard', type: 'success' });
      }).catch(() => {
        setToast({ message: 'Failed to copy text', type: 'error' });
      });
    }
  };

  const getWordCount = () => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  };

  return (
    <div className={`h-screen flex flex-col ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Toolbar 
        isDark={isDark} 
        setIsDark={setIsDark}
        fileName={fileName}
        setFileName={setFileName}
        selectedText={selectedText}
        onCopy={handleCopy}
        onExportPDF={handleExportPDF}
        onFileOpen={handleFileOpen}
        onSave={handleSave}
        isSaved={isSaved}
      />
      <Editor
        isDark={isDark}
        content={content}
        setContent={setContent}
        onSave={handleSave}
        onTextSelect={handleTextSelect}
      />
      <StatusBar
        isDark={isDark}
        characterCount={content.length}
        wordCount={getWordCount()}
        isSaved={isSaved}
        isAutosaving={isAutosaving}
      />
    </div>
  );
}

export default App;