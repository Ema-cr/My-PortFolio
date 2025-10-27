'use client';
import React from 'react';
import styles from './About.module.css';
import { useI18n } from '@/app/context/I18nContext';
import { FaCode, FaServer, FaReact, FaDatabase, FaGitAlt, FaGithub, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiHtml5, SiCss3 } from 'react-icons/si';

export default function AboutPage() {
  const { t } = useI18n();

  const cards = [
    { key: 'backend', title: t('about.backend.title'), text: t('about.backend.description'), icon: <FaServer /> },
    { key: 'frontend', title: t('about.frontend.title'), text: t('about.frontend.description'), icon: <FaCode /> },
    { key: 'database', title: t('about.database.title'), text: t('about.database.description'), icon: <FaDatabase /> },
  ];

  const techs = [
    { name: 'HTML5', icon: <SiHtml5 /> },
    { name: 'CSS3', icon: <SiCss3 /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Express', icon: <SiExpress /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'GitHub', icon: <FaGithub /> },
  ];

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('about title')}</h1>
          <p className={styles.lead}>{t('about me')}</p>
        </header>

        <div className={styles.cards}>
          {cards.map((c) => (
            <article key={c.key} className={styles.card}>
              <div className={styles.cardIcon} aria-hidden>
                <div className={styles.iconInner}>{c.icon}</div>
              </div>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardText}>{c.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.techSection}>
          <h2 className={styles.techTitle}>{t('technologies')}</h2>
          <div className={styles.techList}>
            {techs.map((tch) => (
              <div key={tch.name} className={styles.techBadge}>
                <span className={styles.techIcon}>{tch.icon}</span>
                <span className={styles.techName}>{tch.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}