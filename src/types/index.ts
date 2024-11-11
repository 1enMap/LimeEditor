export type Language = 'en' | 'hi' | 'es' | 'fr' | 'de';

export interface TranslationHistory {
  originalText: string;
  translatedText: string;
  start: number;
  end: number;
}

export interface TranslationResponse {
  translatedText: string;
}