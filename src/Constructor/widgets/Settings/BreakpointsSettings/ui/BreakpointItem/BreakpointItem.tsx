import { FC } from 'react';

import { Pencil, TrashBin } from '@gravity-ui/icons';

import styles from './BreakpointItem.module.css';

import { Button, Icon, Text } from '@/shared/components';

export interface BreakpointItemProps {
    /** Название брейкпоинта */
    name: string;
    /** Подпись под названием (например, "≤ 768px" или "По умолчанию") */
    subtitle: string;
    /** Активен ли данный брейкпоинт */
    isActive: boolean;
    /** Показывать ли кнопку удаления */
    showDeleteButton?: boolean;
    /** Обработчик клика по кнопке редактирования */
    onEdit: () => void;
    /** Обработчик клика по кнопке удаления */
    onDelete?: () => void;
}

export const BreakpointItem: FC<BreakpointItemProps> = ({
    name,
    subtitle,
    isActive,
    showDeleteButton = false,
    onEdit,
    onDelete,
}) => {
    return (
        <div className={styles.breakpointItem}>
            <div className={styles.breakpointInfo}>
                <Text variant="body">{name}</Text>
                <div className={styles.maxWidth}>
                    <Text variant="caption">{subtitle}</Text>
                </div>
            </div>
            {showDeleteButton ? (
                <div className={styles.breakpointActions}>
                    <Button
                        view={isActive ? 'action' : 'outlined'}
                        onClick={onEdit}
                    >
                        <Icon size="s">
                            <Pencil />
                        </Icon>
                    </Button>
                    <Button view="flat-danger" onClick={onDelete}>
                        <Icon size="s">
                            <TrashBin />
                        </Icon>
                    </Button>
                </div>
            ) : (
                <Button
                    view={isActive ? 'action' : 'outlined'}
                    onClick={onEdit}
                >
                    <Icon size="s">
                        <Pencil />
                    </Icon>
                </Button>
            )}
        </div>
    );
};
