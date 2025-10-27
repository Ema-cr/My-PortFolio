import es from './locales/es.json';
import en from './locales/en.json';

export type Locale = 'es' | 'en';
export const defaultLocale: Locale = 'es';

export const dictionaries: Record<Locale, Record<string, string>> = {
  es,
  en,
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
};

export const getLocaleDisplayName = (locale: Locale): string => {
  const names: Record<Locale, string> = {
    es: 'Español',
    en: 'English',
  };
  return names[locale] ?? locale;
};