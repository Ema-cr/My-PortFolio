'use client';
import React from 'react';
import { useI18n } from '@/app/context/I18nContext';
import ClientsForm from '@/app/components/ui/form/ClientsForm';
import styles from './Contact.module.css';

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('contact title')}</h1>
          <p className={styles.lead}>{t('contact paragraph')}</p>
        </header>
        <p className={styles.formText}>{t('form text')}</p>
        <ClientsForm />
      </div>
    </div>
  );
}