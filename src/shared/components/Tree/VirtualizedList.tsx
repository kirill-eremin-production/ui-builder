import React, { useMemo } from 'react';

import styles from './Tree.module.css';

import { useVirtualization } from './hooks';
import { VirtualizedListProps } from './types';

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
    items,
    itemHeight,
    maxVisibleItems,
    renderItem,
}) => {
    const containerHeight = maxVisibleItems * itemHeight;

    const { visibleItems, totalHeight, handleScroll, offsetY } =
        useVirtualization(items, itemHeight, containerHeight);

    const containerStyle = useMemo(
        () => ({
            height: containerHeight,
            overflow: 'auto',
        }),
        [containerHeight]
    );

    const contentStyle = useMemo(
        () => ({
            height: totalHeight,
            position: 'relative' as const,
        }),
        [totalHeight]
    );

    return (
        <div
            className={styles.virtualizedContainer}
            style={containerStyle}
            onScroll={handleScroll}
        >
            <div style={contentStyle}>
                {visibleItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={styles.virtualizedItem}
                        style={{
                            top: offsetY + index * itemHeight,
                            height: itemHeight,
                        }}
                    >
                        {renderItem(item, item.index)}
                    </div>
                ))}
            </div>
        </div>
    );
};
