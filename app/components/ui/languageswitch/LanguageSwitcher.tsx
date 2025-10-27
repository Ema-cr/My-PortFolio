'use client';

import React from 'react';
import styles from './LanguageSwitcher.module.css';
import { useI18n } from '@/app/context/I18nContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const toggle = () => setLocale(locale === 'es' ? 'en' : 'es');

  return (
    <label className={styles.langSwitch}>
      <input
        aria-label="Toggle language"
        type="checkbox"
        checked={locale === 'en'}
        onChange={toggle}
      />
      <span className={styles.track}>
        <span className={styles.knob}>{locale.toUpperCase()}</span>
      </span>
    </label>
  );
}