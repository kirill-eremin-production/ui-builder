import React, { useCallback, useMemo, useRef } from 'react';

import { FilePlus, FolderPlus } from '@gravity-ui/icons';

import styles from './Tree.module.css';

import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import TextInput from '../TextInput/TextInput';

import { text } from './Tree.localization';
import { TreeNode as TreeNodeComponent } from './TreeNode';
import { VirtualizedList } from './VirtualizedList';
import {
    useContextMenu,
    useDragAndDrop,
    useExpandedNodes,
    useKeyboardNavigation,
    useSelectedNode,
    useTreeSearch,
    useVisibleNodes,
} from './hooks';
import { TreeNode, TreeProps } from './types';
import { ContextMenu } from './ui/ContextMenu';
import { canDropNode, findNodeById, sortNodes } from './utils';

export const Tree: React.FC<TreeProps> = ({
    data,
    onNodeClick,
    onNodeDoubleClick,
    onNodeSelect,
    onNodeExpand,
    onNodeCollapse,
    onDragStart,
    onDragEnd,
    onAddFile,
    onAddFolder,
    selectedNodeId,
    expandedNodeIds = [],
    searchQuery: externalSearchQuery,
    contextMenuActions = [],
    customIcons,
    enableDragDrop = false,
    enableVirtualization = false,
    enableSearch = true,
    maxVisibleItems = 100,
    itemHeight = 28,
    className,
    style,
}) => {
    const treeRef = useRef<HTMLDivElement>(null);

    // Сортируем данные
    const sortedData = useMemo(() => sortNodes(data), [data]);

    // Управление развернутыми узлами
    const { expandedIds, toggleNode, isExpanded } =
        useExpandedNodes(expandedNodeIds);

    // Управление выбранным узлом
    const { selectedId, selectNode, isSelected } =
        useSelectedNode(selectedNodeId);

    // Поиск
    const { searchQuery, performSearch, clearSearch } =
        useTreeSearch(sortedData);

    // Используем внешний поисковый запрос, если он передан
    const currentSearchQuery = externalSearchQuery || searchQuery;

    // Drag and Drop
    const { draggedNode, handleDragStart, handleDragEnd, handleDragOver } =
        useDragAndDrop(sortedData, onDragEnd);

    // Контекстное меню
    const { contextMenu, showContextMenu, hideContextMenu } = useContextMenu();

    // Видимые узлы с учетом поиска и разворачивания
    const visibleNodes = useVisibleNodes(
        sortedData,
        expandedIds,
        currentSearchQuery
    );

    // Клавиатурная навигация
    const { handleKeyDown } = useKeyboardNavigation(
        visibleNodes,
        selectedId,
        selectNode,
        toggleNode
    );

    // Обработчики событий
    const handleNodeToggle = useCallback(
        (nodeId: string) => {
            const wasExpanded = isExpanded(nodeId);
            toggleNode(nodeId);

            if (wasExpanded) {
                onNodeCollapse?.(findNodeById(sortedData, nodeId)!);
            } else {
                onNodeExpand?.(findNodeById(sortedData, nodeId)!);
            }
        },
        [toggleNode, isExpanded, onNodeExpand, onNodeCollapse, sortedData]
    );

    const handleNodeSelect = useCallback(
        (node: TreeNode) => {
            selectNode(node.id);
            onNodeSelect?.(node);
        },
        [selectNode, onNodeSelect]
    );

    const handleNodeClick = useCallback(
        (node: TreeNode) => {
            onNodeClick?.(node);
        },
        [onNodeClick]
    );

    const handleNodeDoubleClick = useCallback(
        (node: TreeNode) => {
            if (node.type === 'folder') {
                handleNodeToggle(node.id);
            }
            onNodeDoubleClick?.(node);
        },
        [handleNodeToggle, onNodeDoubleClick]
    );

    const handleDragStartInternal = useCallback(
        (event: React.DragEvent, node: TreeNode) => {
            handleDragStart(node);
            onDragStart?.(node);
        },
        [handleDragStart, onDragStart]
    );

    const handleDragEndInternal = useCallback(() => {
        handleDragEnd();
    }, [handleDragEnd]);

    const handleDragOverInternal = useCallback(
        (event: React.DragEvent, node: TreeNode) => {
            if (draggedNode && canDropNode(draggedNode, node, sortedData)) {
                handleDragOver(node);
            }
        },
        [draggedNode, handleDragOver, sortedData]
    );

    const handleDropInternal = useCallback(
        (event: React.DragEvent, node: TreeNode) => {
            event.preventDefault();
            if (draggedNode && canDropNode(draggedNode, node, sortedData)) {
                onDragEnd?.(draggedNode, node);
            }
            handleDragEnd();
        },
        [draggedNode, onDragEnd, handleDragEnd, sortedData]
    );

    const handleSearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const query = event.target.value;
            performSearch(query);
        },
        [performSearch]
    );

    const handleSearchClear = useCallback(() => {
        clearSearch();
    }, [clearSearch]);

    // Рендер узла для виртуализации
    const renderVirtualizedNode = useCallback(
        (node: TreeNode & { level: number }) => {
            return (
                <TreeNodeComponent
                    key={node.id}
                    node={node}
                    level={node.level}
                    isExpanded={isExpanded(node.id)}
                    isSelected={isSelected(node.id)}
                    onToggle={handleNodeToggle}
                    onSelect={handleNodeSelect}
                    onClick={handleNodeClick}
                    onDoubleClick={handleNodeDoubleClick}
                    onContextMenu={showContextMenu}
                    onDragStart={handleDragStartInternal}
                    onDragEnd={handleDragEndInternal}
                    onDragOver={handleDragOverInternal}
                    onDrop={handleDropInternal}
                    customIcons={customIcons}
                    enableDragDrop={enableDragDrop}
                    searchQuery={currentSearchQuery}
                />
            );
        },
        [
            isExpanded,
            isSelected,
            handleNodeToggle,
            handleNodeSelect,
            handleNodeClick,
            handleNodeDoubleClick,
            showContextMenu,
            handleDragStartInternal,
            handleDragEndInternal,
            handleDragOverInternal,
            handleDropInternal,
            customIcons,
            enableDragDrop,
            currentSearchQuery,
        ]
    );

    // Рендер обычного списка узлов
    const renderNodeList = useCallback(() => {
        if (visibleNodes.length === 0) {
            return (
                <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>📁</div>
                    <div className={styles.emptyStateText}>
                        {currentSearchQuery
                            ? 'Ничего не найдено'
                            : 'Папка пуста'}
                    </div>
                    <div className={styles.emptyStateSubtext}>
                        {currentSearchQuery
                            ? `По запросу "${currentSearchQuery}" ничего не найдено`
                            : 'Добавьте файлы или папки'}
                    </div>
                </div>
            );
        }

        return (
            <ul className={styles.treeList}>
                {visibleNodes.map((node) => (
                    <li key={node.id}>
                        {renderVirtualizedNode(node)}
                        {node.type === 'folder' &&
                            node.children &&
                            isExpanded(node.id) && (
                                <div
                                    className={`${styles.nodeChildren} ${styles.expanded} ${styles.animating}`}
                                >
                                    {/* Дочерние элементы уже включены в visibleNodes */}
                                </div>
                            )}
                    </li>
                ))}
            </ul>
        );
    }, [visibleNodes, currentSearchQuery, renderVirtualizedNode, isExpanded]);

    const treeClasses = [styles.tree, className].filter(Boolean).join(' ');

    return (
        <div
            ref={treeRef}
            className={treeClasses}
            style={style}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            onClick={hideContextMenu}
        >
            <div className={styles.title}>
                <div>
                    <Text isUppercase variant="caption">
                        {text.title.en}
                    </Text>
                </div>

                <div className={styles.titleEndContent}>
                    {onAddFolder && (
                        <Button view="default" isIcon onClick={onAddFolder}>
                            <Icon size="s">
                                <FolderPlus />
                            </Icon>
                        </Button>
                    )}

                    {onAddFile && (
                        <Button view="default" isIcon onClick={onAddFile}>
                            <Icon size="s">
                                <FilePlus />
                            </Icon>
                        </Button>
                    )}
                </div>
            </div>

            {enableSearch && !externalSearchQuery && (
                <div className={styles.searchContainer}>
                    <TextInput
                        label=""
                        value={searchQuery}
                        placeholder="Поиск файлов и папок..."
                        onChange={handleSearchChange}
                    />

                    {searchQuery && (
                        <button
                            className={styles.searchClearButton}
                            onClick={handleSearchClear}
                            aria-label="Очистить поиск"
                        >
                            ✕
                        </button>
                    )}
                </div>
            )}

            <div className={styles.treeContainer}>
                {enableVirtualization &&
                visibleNodes.length > maxVisibleItems ? (
                    <VirtualizedList
                        items={visibleNodes}
                        itemHeight={itemHeight}
                        maxVisibleItems={maxVisibleItems}
                        renderItem={renderVirtualizedNode}
                    />
                ) : (
                    renderNodeList()
                )}
            </div>

            {contextMenu && contextMenuActions.length > 0 && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    node={contextMenu.node}
                    actions={contextMenuActions}
                    onClose={hideContextMenu}
                />
            )}
        </div>
    );
};
