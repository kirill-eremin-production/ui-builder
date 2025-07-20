import React, { useCallback, useState } from 'react';

import styles from './Tree.module.css';

import { TreeNodeProps } from './types';
import { Chevron } from './ui/Chevron';
import { Icon } from './ui/Icon';
import { canDropNode, highlightMatches } from './utils';

export const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    level,
    isExpanded,
    isSelected,
    onToggle,
    onSelect,
    onClick,
    onDoubleClick,
    onContextMenu,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    customIcons,
    enableDragDrop = false,
    searchQuery = '',
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            onSelect(node);
            onClick?.(node);
        },
        [node, onSelect, onClick]
    );

    const handleDoubleClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            onDoubleClick?.(node);
        },
        [node, onDoubleClick]
    );

    const handleToggle = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            if (node.type === 'folder') {
                onToggle(node.id);
            }
        },
        [node, onToggle]
    );

    const handleContextMenu = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            onContextMenu?.(event, node);
        },
        [node, onContextMenu]
    );

    const handleDragStart = useCallback(
        (event: React.DragEvent) => {
            if (!enableDragDrop) return;

            setIsDragging(true);
            event.dataTransfer.setData('text/plain', node.id);
            event.dataTransfer.effectAllowed = 'move';
            onDragStart?.(event, node);
        },
        [node, enableDragDrop, onDragStart]
    );

    const handleDragEnd = useCallback(
        (event: React.DragEvent) => {
            if (!enableDragDrop) return;

            setIsDragging(false);
            setIsDragOver(false);
            onDragEnd?.(event, node);
        },
        [node, enableDragDrop, onDragEnd]
    );

    const handleDragOver = useCallback(
        (event: React.DragEvent) => {
            if (!enableDragDrop || node.type !== 'folder') return;

            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
            setIsDragOver(true);
            onDragOver?.(event, node);
        },
        [node, enableDragDrop, onDragOver]
    );

    const handleDragLeave = useCallback(
        (event: React.DragEvent) => {
            if (!enableDragDrop) return;

            // Проверяем, что мы действительно покидаем элемент
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;

            if (
                x < rect.left ||
                x > rect.right ||
                y < rect.top ||
                y > rect.bottom
            ) {
                setIsDragOver(false);
            }
        },
        [enableDragDrop]
    );

    const handleDrop = useCallback(
        (event: React.DragEvent) => {
            if (!enableDragDrop || node.type !== 'folder') return;

            event.preventDefault();
            setIsDragOver(false);
            onDrop?.(event, node);
        },
        [node, enableDragDrop, onDrop]
    );

    const renderNodeName = useCallback(() => {
        if (searchQuery) {
            return (
                <span
                    dangerouslySetInnerHTML={{
                        __html: highlightMatches(node.name, searchQuery),
                    }}
                />
            );
        }
        return node.name;
    }, [node.name, searchQuery]);

    const indentStyle = {
        width: level * 20,
    };

    const nodeClasses = [
        styles.treeNode,
        isSelected && styles.selected,
        isDragging && styles.dragging,
        isDragOver && styles.dragOver,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={nodeClasses}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleContextMenu}
            draggable={enableDragDrop}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className={styles.nodeContent}>
                <div className={styles.nodeIndent} style={indentStyle} />

                {node.type === 'folder' && (
                    <Chevron isExpanded={isExpanded} onClick={handleToggle} />
                )}

                <Icon
                    node={node}
                    isExpanded={isExpanded}
                    customIcons={customIcons}
                    className={styles.nodeIcon}
                />

                <div className={styles.nodeName}>{renderNodeName()}</div>
            </div>
        </div>
    );
};
