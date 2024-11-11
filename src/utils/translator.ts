import type { Language } from '../types';

const TRANSLATION_API_URL = 'https://libretranslate.com/translate';

interface TranslationPayload {
  q: string;
  source: 'auto';
  target: Language;
}

export async function translateText(text: string, targetLang: Language): Promise<string> {
  if (!text?.trim()) {
    throw new Error('No text selected for translation');
  }

  const payload: TranslationPayload = {
    q: text,
    source: 'auto',
    target: targetLang,
  };

  try {
    const response = await fetch(TRANSLATION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Translation failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.translatedText) {
      throw new Error('Invalid translation response');
    }

    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    if (error instanceof Error) {
      throw new Error(`Translation failed: ${error.message}`);
    }
    throw new Error('Translation service unavailable');
  }
}