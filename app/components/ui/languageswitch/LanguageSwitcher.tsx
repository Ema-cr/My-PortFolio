import es from '@/app/i18n/locales/es.json';
import en from '@/app/i18n/locales/en.json';

export type Locale = 'es' | 'en' ;

export const locales: Locale[] = ['es', 'en'];

export const defaultLocale: Locale = 'es';

export const dictionaries = {
  es,
  en,
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] || dictionaries[defaultLocale];
};

export const getLocaleDisplayName = (locale: Locale): string => {
  const names: Record<Locale, string> = {
    es: 'Español',
    en: 'English',
  };
  return names[locale];
};