'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, getDictionary } from '../i18n/index';

type Dictionary = ReturnType<typeof getDictionary>;

interface I18nContextType {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [dictionary, setDictionary] = useState<Dictionary>(getDictionary(defaultLocale));

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDictionary(getDictionary(newLocale));
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'es' || savedLocale === 'en')) {
      Promise.resolve().then(() => setLocale(savedLocale));
    }
  }, []);

  return (
    <I18nContext.Provider value={{ locale, dictionary, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
