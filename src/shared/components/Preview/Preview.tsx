import { FC, useCallback, useState } from 'react';

import cn from 'classnames';

import styles from './Preview.module.css';

export interface PreviewProps {
    url: string;
    className?: string;
}

const Preview: FC<PreviewProps> = ({ url, className }) => {
    const [key, setKey] = useState(0);

    const handleRefresh = useCallback(() => {
        // Обновляем iframe путем изменения ключа
        setKey((prevKey) => prevKey + 1);
    }, []);

    return (
        <div className={cn(styles.root, className)}>
            <div className={styles.browserHeader}>
                <div className={styles.windowControls}>
                    <button
                        className={cn(styles.windowControl, styles.close)}
                        aria-label="Закрыть"
                        type="button"
                    />
                    <button
                        className={cn(styles.windowControl, styles.minimize)}
                        aria-label="Свернуть"
                        type="button"
                    />
                    <button
                        className={cn(styles.windowControl, styles.maximize)}
                        aria-label="Развернуть"
                        type="button"
                    />
                </div>
                <div className={styles.addressBar}>
                    <button
                        className={styles.refreshButton}
                        onClick={handleRefresh}
                        aria-label="Обновить"
                        type="button"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <div className={styles.urlDisplay}>{url}</div>
                </div>
            </div>
            <div className={styles.browserContent}>
                <iframe
                    key={key}
                    src={url}
                    className={styles.iframe}
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
            </div>
        </div>
    );
};

export default Preview;
