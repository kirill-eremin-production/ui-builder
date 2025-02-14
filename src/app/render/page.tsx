import { PageCanvas } from '@/components/PageCanvas';

import styles from './page.module.css';

export default function Render() {
    return (
        <div className={styles.root}>
            <PageCanvas width={1024} />
        </div>
    );
}
