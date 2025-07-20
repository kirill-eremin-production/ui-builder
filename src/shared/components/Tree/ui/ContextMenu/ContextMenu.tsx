import React from 'react';

import cn from 'classnames';

import styles from './ContextMenu.module.css';

import { ContextMenuProps } from '../../types';

/**
 * Компонент контекстного меню для узлов дерева
 *
 * Отображает всплывающее меню с доступными действиями для выбранного узла.
 * Позиционируется абсолютно по координатам клика правой кнопкой мыши.
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
    x,
    y,
    node,
    actions,
    onClose,
}) => {
    /**
     * Обработчик клика по элементу меню
     * Выполняет действие, если оно не отключено, и закрывает меню
     */
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
            onClick={(e) => e.stopPropagation()} // Предотвращаем всплытие события
        >
            {actions.map((action) => (
                <div
                    key={action.id}
                    className={cn(styles.contextMenuItem, {
                        [styles.disabled]: action.disabled,
                    })}
                    onClick={() => handleActionClick(action)}
                >
                    {/* Иконка действия (опционально) */}
                    {action.icon && (
                        <div className={styles.contextMenuIcon}>
                            {action.icon}
                        </div>
                    )}
                    {/* Текст действия */}
                    {action.label}
                </div>
            ))}
        </div>
    );
};
