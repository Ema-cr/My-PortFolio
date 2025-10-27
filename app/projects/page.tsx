'use client';
import React from 'react';
import { useI18n } from '@/app/context/I18nContext';
import styles from './Projects.module.css';
import { CardProjects } from '@/app/components/ui/card/CardProjects';

export default function ProjectsPage() {
  const { t } = useI18n();

  return (
    <div className={styles.projects}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('projects title')}</h1>
          <p className={styles.lead}>{t('projects paragraph')}</p>
        </header>
        
        <div className={styles.grid}>
          <CardProjects
            title={t('projects 1 title')}
            description={t('projects 1 description')}
            image="/TechNova.png"
            technologies={['React', 'Node.js', 'MongoDB']}
            githubUrl="https://github.com/Ema-cr/TechNova"
            demoUrl="https://tech-nova-ruby.vercel.app/"
          />
          <CardProjects
            title={t('projects 2 title')}
            description={t('projects 2 description')}
            image="/Library.png"
            technologies={['Next.js', 'TypeScript', 'Tailwind']}
            githubUrl="https://github.com/Ema-cr/Library"
            demoUrl="https://library-kappa-two.vercel.app/"
          />
          <CardProjects
            title={t('projects 3 title')}
            description={t('projects 3 description')}
            image="/ChatWebSocket.png"
            technologies={['React', 'Express', 'PostgreSQL']}
            githubUrl="https://github.com/Ema-cr/ChatWebSocket-v2"
            demoUrl="https://chatwebsocket-v2.onrender.com/"
          />
        </div>
      </div>
    </div>
  );
}