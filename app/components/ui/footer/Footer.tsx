'use client';
import { useI18n } from '@/app/context/I18nContext';
import styles from './Footer.module.css';
import Link from 'next/link';
import { FaGithub, FaLinkedin, } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const { t } = useI18n();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>

          <nav className={styles.nav}>
            <Link href="/" className={styles.link}>
              {t('home')}
            </Link>
            <Link href="/aboutme" className={styles.link}>
              {t('about')}
            </Link>
            <Link href="/projects" className={styles.link}>
              {t('projects')}
            </Link>
            <Link href="/contact" className={styles.link}>
              {t('contact')}
            </Link>
          </nav>

          <div className={styles.social}>
            <a
              href="https://github.com/Ema-cr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/emanuel-gaviria-aa6b96286/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/Ema__24"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="Twitter"
            >
              <FaXTwitter />
            </a>
          </div>

          <div className={styles.copyright}>
            {t('footer text')}
            <div className={styles.riwi}>
              <span className={styles.riwiName}>Riwi</span>Coder
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
