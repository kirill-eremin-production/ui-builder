import { TreeNode, SearchResult } from './types';

/**
 * Рекурсивно ищет узел по ID
 */
export const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Получает путь к узлу
 */
export const getNodePath = (nodes: TreeNode[], targetId: string, currentPath: string[] = []): string[] | null => {
  for (const node of nodes) {
    const newPath = [...currentPath, node.name];
    
    if (node.id === targetId) {
      return newPath;
    }
    
    if (node.children) {
      const found = getNodePath(node.children, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Рекурсивно собирает все узлы в плоский массив
 */
export const flattenNodes = (nodes: TreeNode[], level: number = 0): Array<TreeNode & { level: number }> => {
  const result: Array<TreeNode & { level: number }> = [];
  
  for (const node of nodes) {
    result.push({ ...node, level });
    if (node.children) {
      result.push(...flattenNodes(node.children, level + 1));
    }
  }
  
  return result;
};

/**
 * Фильтрует узлы по поисковому запросу
 */
export const searchNodes = (nodes: TreeNode[], query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const searchTerm = query.toLowerCase();
  
  const searchRecursive = (nodeList: TreeNode[], path: string[] = []) => {
    for (const node of nodeList) {
      const currentPath = [...path, node.name];
      const nodeName = node.name.toLowerCase();
      
      if (nodeName.includes(searchTerm)) {
        const matches = (nodeName.match(new RegExp(searchTerm, 'gi')) || []).length;
        results.push({
          node,
          path: currentPath.join('/'),
          matches
        });
      }
      
      if (node.children) {
        searchRecursive(node.children, currentPath);
      }
    }
  };
  
  searchRecursive(nodes);
  return results.sort((a, b) => b.matches - a.matches);
};

/**
 * Выделяет совпадения в тексте
 */
export const highlightMatches = (text: string, query: string): string => {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="nodeNameHighlight">$1</mark>');
};

/**
 * Проверяет, является ли узел предком другого узла
 */
export const isAncestor = (nodes: TreeNode[], ancestorId: string, descendantId: string): boolean => {
  const ancestor = findNodeById(nodes, ancestorId);
  if (!ancestor || !ancestor.children) return false;
  
  const checkDescendant = (children: TreeNode[]): boolean => {
    for (const child of children) {
      if (child.id === descendantId) return true;
      if (child.children && checkDescendant(child.children)) return true;
    }
    return false;
  };
  
  return checkDescendant(ancestor.children);
};

/**
 * Получает все развернутые узлы для отображения
 */
export const getVisibleNodes = (
  nodes: TreeNode[], 
  expandedIds: Set<string>, 
  level: number = 0
): Array<TreeNode & { level: number }> => {
  const result: Array<TreeNode & { level: number }> = [];
  
  for (const node of nodes) {
    result.push({ ...node, level });
    
    if (node.children && expandedIds.has(node.id)) {
      result.push(...getVisibleNodes(node.children, expandedIds, level + 1));
    }
  }
  
  return result;
};

/**
 * Получает иконку для файла по расширению
 */
export const getFileIcon = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  const iconMap: Record<string, string> = {
    // Изображения
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'png': '🖼️',
    'gif': '🖼️',
    'svg': '🖼️',
    'webp': '🖼️',
    
    // Документы
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'txt': '📄',
    'md': '📝',
    'rtf': '📝',
    
    // Код
    'js': '📜',
    'ts': '📜',
    'jsx': '⚛️',
    'tsx': '⚛️',
    'html': '🌐',
    'css': '🎨',
    'scss': '🎨',
    'sass': '🎨',
    'less': '🎨',
    'json': '📋',
    'xml': '📋',
    'yaml': '📋',
    'yml': '📋',
    
    // Архивы
    'zip': '📦',
    'rar': '📦',
    '7z': '📦',
    'tar': '📦',
    'gz': '📦',
    
    // Видео
    'mp4': '🎬',
    'avi': '🎬',
    'mov': '🎬',
    'wmv': '🎬',
    'flv': '🎬',
    
    // Аудио
    'mp3': '🎵',
    'wav': '🎵',
    'flac': '🎵',
    'aac': '🎵',
    'ogg': '🎵',
  };
  
  return iconMap[extension || ''] || '📄';
};

/**
 * Сортирует узлы (папки сначала, затем файлы по алфавиту)
 */
export const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
  return [...nodes].sort((a, b) => {
    // Папки всегда идут первыми
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    
    // Внутри одного типа сортируем по алфавиту
    return a.name.localeCompare(b.name, 'ru', { numeric: true });
  });
};

/**
 * Создает уникальный ID для узла
 */
export const generateNodeId = (path: string): string => {
  return btoa(path).replace(/[^a-zA-Z0-9]/g, '');
};

/**
 * Проверяет, можно ли перетащить узел в целевой узел
 */
export const canDropNode = (
  dragNode: TreeNode,
  targetNode: TreeNode,
  allNodes: TreeNode[]
): boolean => {
  // Нельзя перетащить узел в самого себя
  if (dragNode.id === targetNode.id) return false;
  
  // Нельзя перетащить узел в свой дочерний элемент
  if (isAncestor(allNodes, dragNode.id, targetNode.id)) return false;
  
  // Можно перетащить только в папку
  return targetNode.type === 'folder';
};

/**
 * Форматирует размер файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Форматирует дату изменения
 */
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) {
    return 'Сегодня';
  } else if (days === 1) {
    return 'Вчера';
  } else if (days < 7) {
    return `${days} дн. назад`;
  } else {
    return date.toLocaleDateString('ru-RU');
  }
};