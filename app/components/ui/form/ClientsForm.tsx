'use client';

import React, { useState } from 'react';
import styles from './ClientsForm.module.css';
import { postUser } from '@/app/services/clients';
import { IClient } from '@/app/services/types';
import { useI18n } from '@/app/context/I18nContext';
import { showSuccess, showError } from '@/app/utils/toast';

export default function ClientsForm() {
	const { t } = useI18n();
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const reset = () => {
		setFullName('');
		setEmail('');
		setMessage('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!fullName || !email) {
					showError(t('form.validation.required'));
					return;
				}
				if (fullName.trim().length < 4) {
					showError(t('form.validation.name_length'));
					return;
				}
				if (!emailRegex.test(email)) {
					showError(t('form.validation.email_invalid'));
					return;
				}

		setLoading(true);
			try {
				const payload: Partial<IClient> = { fullName, email, message };
						await postUser(payload);
						showSuccess(t('form.success'));
				reset();
					} catch (err: unknown) {
						
						const maybeErr = err as { message?: string } | undefined;
						const apiMessage = maybeErr?.message;
						const serverMap: Record<string, string> = {
							'Client already exists.': 'form.client_exists',
							'Full name and email are required.': 'form.validation.required',
							'Full name must be at least 4 characters.': 'form.validation.name_length',
							'Invalid email format.': 'form.validation.email_invalid',
							'Server error': 'form.server_error',
							'Error creating client.': 'form.server_error',
						};

						if (apiMessage && serverMap[apiMessage]) {
							showError(t(serverMap[apiMessage]));
						} else {
							const msg = apiMessage || (err instanceof Error ? err.message : t('form.error'));
							showError(msg);
						}
				} finally {
				setLoading(false);
			}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit} aria-label="contact-form">
			<div className={styles.row}>
				<label className={styles.label} htmlFor="fullName">{t('name')}</label>
				<input
					id="fullName"
					className={styles.input}
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					placeholder={t('name')}
					required
				/>
			</div>

			<div className={styles.row}>
				<label className={styles.label} htmlFor="email">{t('email')}</label>
				<input
					id="email"
					type="email"
					className={styles.input}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={t('email')}
					required
				/>
			</div>

			<div className={styles.row}>
				<label className={styles.label} htmlFor="message">{t('message')}</label>
				<textarea
					id="message"
					className={styles.textarea}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder={t('message')}
					rows={4}
				/>
			</div>

			<div className={styles.actions}>
						<button type="submit" className={styles.button} disabled={loading}>
							{loading ? t('form.sending') : t('button message')}
						</button>
			</div>
		</form>
	);
}
