'use server';

import styles from './page.module.css';

import { Constructor } from '@/Constructor';

export default async function Edit() {
    return (
        <div className={styles.root}>
            <Constructor />
        </div>
    );
}
