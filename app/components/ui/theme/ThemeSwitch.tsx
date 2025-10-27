'use client';
import styles from './ThemeSwitch.module.css';
import { useTheme } from '@/app/context/ThemeContext';

export default function ThemeSwitch() {
  const { isLight, toggle } = useTheme();

  return (
    <label
      className={styles.langSwitch}
      aria-label="Toggle theme"
      title={isLight ? 'Light mode' : 'Dark mode'}
      suppressHydrationWarning
    >
      <input
        type="checkbox"
        checked={isLight}
        onChange={toggle}
      />
      <span className={styles.track}>
        <span className={styles.knob} aria-hidden="true">
          <span className={styles.sun} />
          <span className={styles.moon} />
        </span>
      </span>
    </label>
  );
}
