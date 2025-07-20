import React, { MouseEventHandler } from 'react';

import { ChevronRight } from '@gravity-ui/icons';

import cn from 'classnames';

import styles from './Chevron.module.css';

export interface ChevronProps {
    isExpanded: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Chevron: React.FC<ChevronProps> = ({ isExpanded, onClick }) => {
    return (
        <button
            className={cn(styles.chevron, { [styles.expanded]: isExpanded })}
            onClick={onClick}
        >
            <ChevronRight className={styles.icon} />
        </button>
    );
};
