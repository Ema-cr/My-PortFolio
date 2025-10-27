'use client';

import React from 'react';
import styles from '@/app/components/ui/button/Button.module.css';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
};

export default function Button({ children, variant = 'primary', href }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
  };

  return (
    <button className={`${styles.btn} ${styles[variant]}`} onClick={handleClick}>
      {children}
    </button>
  );
}