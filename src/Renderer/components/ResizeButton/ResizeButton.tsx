import { FC, MouseEventHandler } from 'react';

import cn from 'classnames';

import styles from './ResizeButton.module.css';

import { Direction } from '@/shared/types/Direction';

export type ResizeButtonProps = {
    widgetId: string;
    direction: Direction;
    onMouseDown: MouseEventHandler<HTMLButtonElement>;
};

export const ResizeButton: FC<ResizeButtonProps> = ({
    direction,
    onMouseDown,
}) => {
    return (
        <button
            onMouseDown={onMouseDown}
            className={cn(styles.root, {
                [styles[`direction_${direction}`]]: direction,
            })}
        />
    );
};
