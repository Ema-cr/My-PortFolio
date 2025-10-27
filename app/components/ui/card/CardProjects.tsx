'use client';

import React from 'react';
import styles from './CardProjects.module.css';
import Image from 'next/image';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

	type Props = {
		title: string;
		description: string;
		image?: string;
		technologies?: string[];
		githubUrl?: string;
		demoUrl?: string;
	};

export function CardProjects({ title, description, image, technologies = [], githubUrl, demoUrl }: Props) {
	return (
		<>
			<svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
				<defs>
					<linearGradient id="cardAccentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#3b82f6" />
						<stop offset="100%" stopColor="#06b6d4" />
					</linearGradient>
				</defs>
			</svg>

			<article className={styles.card}>
			{image && (
				<div className={styles.media}>
					{typeof image === 'string' && (
						<Image src={image} alt={title} className={styles.image} fill sizes="(max-width: 600px) 100vw, 33vw" />
					)}
					{(githubUrl || demoUrl) && (
						<>
							<div className={styles.overlay}>
								<div className={styles.overlayButtons}>
									{demoUrl && (
										<a href={demoUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayBtnRect} aria-label="Open Demo">
											<span>Demo</span>
											<FaArrowRight />
										</a>
									)}
									{githubUrl && (
										<a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayBtnRect} aria-label="Open Code on GitHub">
											<span>Code</span>
											<FaGithub />
										</a>
									)}
								</div>
							</div>
							<div className={styles.centerIcon} aria-hidden>
								<FaGithub />
							</div>
						</>
					)}
				</div>
			)}
			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>{description}</p>
				<div className={styles.techs}>
					{technologies.map((t) => (
						<span key={t} className={styles.tech}>{t}</span>
					))}
				</div>
			</div>
		</article>
		</>
	);
}

export default CardProjects;
