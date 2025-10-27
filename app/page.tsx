"use client";

import React from "react";
import styles from "@/app/Home.module.css";
import { useI18n } from "@/app/context/I18nContext";
import Button from "@/app/components/ui/button/Button";


export default function Home() {
  const { t } = useI18n();

  return (
    <main className={styles.hero}>
      <section className={styles.content}>
        <h1 className={styles.intro}>{t("hi message")}</h1>
        <p className={styles.subtitle}>{t("subtitle message")}</p>

        <div className={styles.actions}>
          <Button variant="primary" href="/projects">
            {t("view my work")}
          </Button>
          <Button variant="secondary" href="/contact">
            {t("get in touch")}
          </Button>
        </div>
      </section>
    </main>
  );
}
