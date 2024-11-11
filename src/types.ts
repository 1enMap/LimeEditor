export type Language = 'hi' | 'es' | 'fr' | 'de';

export interface TranslationHistory {
  originalText: string;
  translatedText: string;
  start: number;
  end: number;
}