import styles from '@/app/components/ui/logo/Logo.module.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

export default function Logo() {
  return (
    <span className={`${styles.logo} ${poppins.className}`}>
      EG
    </span>
  );
}
