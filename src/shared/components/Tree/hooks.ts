import { useState, useCallback, useMemo, useEffect } from 'react';
import { TreeNode, SearchResult } from './types';
import { searchNodes, getVisibleNodes } from './utils';

/**
 * Хук для управления развернутыми узлами
 */
export const useExpandedNodes = (initialExpanded: string[] = []) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialExpanded));

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  const expandNode = useCallback((nodeId: string) => {
    setExpandedIds(prev => new Set([...prev, nodeId]));
  }, []);

  const collapseNode = useCallback((nodeId: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(nodeId);
      return newSet;
    });
  }, []);

  const expandAll = useCallback((nodes: TreeNode[]) => {
    const getAllIds = (nodeList: TreeNode[]): string[] => {
      const ids: string[] = [];
      for (const node of nodeList) {
        if (node.type === 'folder') {
          ids.push(node.id);
          if (node.children) {
            ids.push(...getAllIds(node.children));
          }
        }
      }
      return ids;
    };

    setExpandedIds(new Set(getAllIds(nodes)));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  return {
    expandedIds,
    toggleNode,
    expandNode,
    collapseNode,
    expandAll,
    collapseAll,
    isExpanded: (nodeId: string) => expandedIds.has(nodeId)
  };
};

/**
 * Хук для управления выбранным узлом
 */
export const useSelectedNode = (initialSelected?: string) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelected);

  const selectNode = useCallback((nodeId: string) => {
    setSelectedId(nodeId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedId(undefined);
  }, []);

  return {
    selectedId,
    selectNode,
    clearSelection,
    isSelected: (nodeId: string) => selectedId === nodeId
  };
};

/**
 * Хук для поиска по дереву
 */
export const useTreeSearch = (nodes: TreeNode[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const performSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchNodes(nodes, query.trim());
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [nodes]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    searchResults,
    performSearch,
    clearSearch,
    hasResults: searchResults.length > 0
  };
};

/**
 * Хук для drag and drop функциональности
 */
export const useDragAndDrop = (
  nodes: TreeNode[],
  onDragEnd?: (dragNode: TreeNode, targetNode?: TreeNode) => void
) => {
  const [draggedNode, setDraggedNode] = useState<TreeNode | null>(null);
  const [dragOverNode, setDragOverNode] = useState<TreeNode | null>(null);

  const handleDragStart = useCallback((node: TreeNode) => {
    setDraggedNode(node);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedNode && dragOverNode && onDragEnd) {
      onDragEnd(draggedNode, dragOverNode);
    }
    setDraggedNode(null);
    setDragOverNode(null);
  }, [draggedNode, dragOverNode, onDragEnd]);

  const handleDragOver = useCallback((node: TreeNode) => {
    setDragOverNode(node);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverNode(null);
  }, []);

  return {
    draggedNode,
    dragOverNode,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    isDragging: (nodeId: string) => draggedNode?.id === nodeId,
    isDragOver: (nodeId: string) => dragOverNode?.id === nodeId
  };
};

/**
 * Хук для контекстного меню
 */
export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    node: TreeNode;
  } | null>(null);

  const showContextMenu = useCallback((event: React.MouseEvent, node: TreeNode) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      node
    });
  }, []);

  const hideContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => hideContextMenu();
    const handleScroll = () => hideContextMenu();

    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('scroll', handleScroll);
      };
    }
  }, [contextMenu, hideContextMenu]);

  return {
    contextMenu,
    showContextMenu,
    hideContextMenu
  };
};

/**
 * Хук для виртуализации списка
 */
export const useVirtualization = (
  items: Array<TreeNode & { level: number }>,
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex).map((item, index) => ({
      ...item,
      index: visibleRange.startIndex + index
    }));
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    visibleRange,
    handleScroll,
    offsetY: visibleRange.startIndex * itemHeight
  };
};

/**
 * Хук для управления видимыми узлами с учетом поиска и разворачивания
 */
export const useVisibleNodes = (
  nodes: TreeNode[],
  expandedIds: Set<string>,
  searchQuery: string
) => {
  return useMemo(() => {
    if (searchQuery.trim()) {
      // При поиске показываем все найденные узлы
      const results = searchNodes(nodes, searchQuery.trim());
      return results.map(result => ({ ...result.node, level: 0 }));
    } else {
      // Обычное отображение с учетом развернутых узлов
      return getVisibleNodes(nodes, expandedIds);
    }
  }, [nodes, expandedIds, searchQuery]);
};

/**
 * Хук для обработки клавиатурной навигации
 */
export const useKeyboardNavigation = (
  visibleNodes: Array<TreeNode & { level: number }>,
  selectedId: string | undefined,
  onSelect: (nodeId: string) => void,
  onToggle: (nodeId: string) => void
) => {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (visibleNodes.length === 0) return;

    const currentIndex = selectedId 
      ? visibleNodes.findIndex(node => node.id === selectedId)
      : -1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, visibleNodes.length - 1);
        onSelect(visibleNodes[nextIndex].id);
        break;

      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        onSelect(visibleNodes[prevIndex].id);
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (selectedId) {
          const selectedNode = visibleNodes.find(node => node.id === selectedId);
          if (selectedNode?.type === 'folder') {
            onToggle(selectedId);
          }
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (selectedId) {
          const selectedNode = visibleNodes.find(node => node.id === selectedId);
          if (selectedNode?.type === 'folder') {
            onToggle(selectedId);
          }
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (selectedId) {
          onToggle(selectedId);
        }
        break;
    }
  }, [visibleNodes, selectedId, onSelect, onToggle]);

  return { handleKeyDown };
};