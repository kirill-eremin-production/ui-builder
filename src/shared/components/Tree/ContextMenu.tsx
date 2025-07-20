import React from 'react';

import styles from './Tree.module.css';

import { ContextMenuProps } from './types';

export const ContextMenu: React.FC<ContextMenuProps> = ({
    x,
    y,
    node,
    actions,
    onClose,
}) => {
    const handleActionClick = (action: (typeof actions)[0]) => {
        if (!action.disabled) {
            action.action(node);
            onClose();
        }
    };

    return (
        <div
            className={styles.contextMenu}
            style={{ left: x, top: y }}
            onClick={(e) => e.stopPropagation()}
        >
            {actions.map((action) => (
                <div
                    key={action.id}
                    className={`${styles.contextMenuItem} ${action.disabled ? styles.disabled : ''}`}
                    onClick={() => handleActionClick(action)}
                >
                    {action.icon && (
                        <div className={styles.contextMenuIcon}>
                            {action.icon}
                        </div>
                    )}
                    {action.label}
                </div>
            ))}
        </div>
    );
};
