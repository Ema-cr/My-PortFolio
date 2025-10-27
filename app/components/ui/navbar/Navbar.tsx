'use client';

import Logo from "@/app/components/ui/logo/Logo";
import React from "react";
import styles from "@/app/components/ui/navbar/Navbar.module.css";
import LanguageSwitcher from "@/app/components/ui/languageswitch/LanguageSwitcher";
import ThemeSwitch from "@/app/components/ui/theme/ThemeSwitch";
import { useI18n } from "@/app/context/I18nContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const navItems: { key: string; label: string; href: string }[] = [
    { key: "home", label: t("home"), href: "/" },
    { key: "about", label: t("about"), href: "/aboutme" },
    { key: "projects", label: t("projects"), href: "/projects" },
    { key: "contact", label: t("contact"), href: "/contact" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Logo />
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <button
                key={item.key}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                onClick={() => router.push(item.href)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className={styles.controls}>
          <ThemeSwitch />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
