'use client';

import { FC } from 'react';

import styles from './HomePage.module.css';

import { Button, Icon, Text } from '@/shared/components';

import { text } from './HomePage.localization';

export type HomePageProps = {
    onGetStarted?: () => void;
    onLearnMore?: () => void;
};

export const HomePage: FC<HomePageProps> = ({ onGetStarted, onLearnMore }) => {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.title}>
                        <Text variant="title">{text.title.ru}</Text>
                    </div>

                    <div className={styles.subtitle}>
                        <Text variant="caption">{text.subtitle.ru}</Text>
                    </div>

                    <div className={styles.description}>
                        <Text variant="body">{text.description.ru}</Text>
                    </div>

                    <div className={styles.actions}>
                        <Button
                            href="/auth"
                            view="action"
                            onClick={onGetStarted}
                        >
                            {text.getStarted.ru}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.featuresContainer}>
                    <div className={styles.featuresTitle}>
                        <Text variant="caption">{text.features.ru}</Text>
                    </div>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Icon size="l">🎯</Icon>
                            </div>
                            <div className={styles.featureTitle}>
                                <Text variant="body">
                                    {text.dragAndDrop.ru}
                                </Text>
                            </div>
                            <div className={styles.featureDescription}>
                                <Text variant="secondary">
                                    {text.dragAndDropDesc.ru}
                                </Text>
                            </div>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Icon size="l">📱</Icon>
                            </div>
                            <div className={styles.featureTitle}>
                                <Text variant="body">{text.responsive.ru}</Text>
                            </div>
                            <div className={styles.featureDescription}>
                                <Text variant="secondary">
                                    {text.responsiveDesc.ru}
                                </Text>
                            </div>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Icon size="l">🎨</Icon>
                            </div>
                            <div className={styles.featureTitle}>
                                <Text variant="body">
                                    {text.customizable.ru}
                                </Text>
                            </div>
                            <div className={styles.featureDescription}>
                                <Text variant="secondary">
                                    {text.customizableDesc.ru}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <Text variant="secondary">
                    © 2025 UI Builder. Создано с ❤️ для разработчиков.
                </Text>
            </footer>
        </div>
    );
};
