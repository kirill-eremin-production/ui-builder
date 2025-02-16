'use server';

import styles from './page.module.css';

import { PageConfig } from '@/shared/types/PageConfig';

import { Renderer } from '@/Renderer';

export default async function Render() {
    const config: PageConfig = {
        unitSize: 16,
        ui: {
            el1: {
                id: 'el1',
                type: 'Container',
                text: 'Hello, world!',
                x: 160,
                y: 160,
                width: 160,
                height: 160,
                isMoving: false,
            },
        },
    };

    return (
        <div className={styles.root}>
            <Renderer config={config} />
        </div>
    );
}
