/**
 * Типы иконок, поддерживаемые компонентом Tree
 */
export type TreeIconType =
    | 'text' // Текстовые файлы (txt, md)
    | 'document' // Документы (pdf, doc, docx, rtf)
    | 'code' // Файлы кода (js, ts, html, css, json и т.д.)
    | 'image' // Изображения (jpg, png, gif, svg и т.д.)
    | 'video' // Видео файлы (mp4, avi, mov и т.д.)
    | 'audio' // Аудио файлы (mp3, wav, flac и т.д.)
    | 'archive' // Архивы (zip, rar, 7z и т.д.)
    | 'file'; // Файл по умолчанию

/**
 * Узел дерева - основная структура данных для представления элементов в древовидной структуре
 */
export interface TreeNode {
    /** Уникальный идентификатор узла */
    id: string;
    /** Отображаемое имя узла */
    name: string;
    /** Тип узла - файл или папка */
    type: 'file' | 'folder';
    /** Дочерние узлы (только для папок) */
    children?: TreeNode[];
    /** Полный путь к узлу */
    path?: string;
    /** Размер файла в байтах (только для файлов) */
    size?: number;
    /** Дата последнего изменения */
    modified?: Date;
    /** Кастомная иконка для узла (тип иконки или строка для кастомной иконки) */
    icon?: TreeIconType | string;
}

/**
 * Действие контекстного меню для узла дерева
 */
export interface TreeContextMenuAction {
    /** Уникальный идентификатор действия */
    id: string;
    /** Текст действия, отображаемый в меню */
    label: string;
    /** Иконка действия */
    icon?: string;
    /** Функция, выполняемая при выборе действия */
    action: (node: TreeNode) => void;
    /** Флаг отключения действия */
    disabled?: boolean;
}

/**
 * Настройки кастомных иконок для разных типов узлов
 */
export interface TreeCustomIcons {
    /** Иконка для закрытой папки */
    folder?: string;
    /** Иконка для открытой папки */
    folderOpen?: string;
    /** Иконка для файла по умолчанию */
    file?: string;
    /** Дополнительные иконки по ключу (например, по расширению файла) */
    [key: string]: string | undefined;
}

/**
 * Пропсы основного компонента Tree
 */
export interface TreeProps {
    /** Массив узлов дерева для отображения */
    data: TreeNode[];
    /** Обработчик клика по узлу */
    onNodeClick?: (node: TreeNode) => void;
    /** Обработчик двойного клика по узлу */
    onNodeDoubleClick?: (node: TreeNode) => void;
    /** Обработчик выбора узла */
    onNodeSelect?: (node: TreeNode) => void;
    /** Обработчик раскрытия узла */
    onNodeExpand?: (node: TreeNode) => void;
    /** Обработчик сворачивания узла */
    onNodeCollapse?: (node: TreeNode) => void;
    /** Обработчик начала перетаскивания */
    onDragStart?: (node: TreeNode) => void;
    /** Обработчик окончания перетаскивания */
    onDragEnd?: (node: TreeNode, targetNode?: TreeNode) => void;
    /** ID выбранного узла */
    selectedNodeId?: string;
    /** Массив ID раскрытых узлов */
    expandedNodeIds?: string[];
    /** Поисковый запрос для фильтрации узлов */
    searchQuery?: string;
    /** Действия контекстного меню */
    contextMenuActions?: TreeContextMenuAction[];
    /** Кастомные иконки */
    customIcons?: TreeCustomIcons;
    /** Включить функциональность drag & drop */
    enableDragDrop?: boolean;
    /** Включить виртуализацию для больших списков */
    enableVirtualization?: boolean;
    /** Включить поиск */
    enableSearch?: boolean;
    /** Максимальное количество видимых элементов при виртуализации */
    maxVisibleItems?: number;
    /** Высота одного элемента в пикселях */
    itemHeight?: number;
    /** CSS класс для корневого элемента */
    className?: string;
    /** Инлайн стили для корневого элемента */
    style?: React.CSSProperties;
}

/**
 * Пропсы компонента TreeNode для отдельного узла дерева
 */
export interface TreeNodeProps {
    /** Данные узла */
    node: TreeNode;
    /** Уровень вложенности узла (для отступов) */
    level: number;
    /** Флаг раскрытого состояния узла */
    isExpanded: boolean;
    /** Флаг выбранного состояния узла */
    isSelected: boolean;
    /** Обработчик переключения раскрытия/сворачивания */
    onToggle: (nodeId: string) => void;
    /** Обработчик выбора узла */
    onSelect: (node: TreeNode) => void;
    /** Обработчик клика по узлу */
    onClick?: (node: TreeNode) => void;
    /** Обработчик двойного клика по узлу */
    onDoubleClick?: (node: TreeNode) => void;
    /** Обработчик контекстного меню */
    onContextMenu?: (event: React.MouseEvent, node: TreeNode) => void;
    /** Обработчик начала перетаскивания */
    onDragStart?: (event: React.DragEvent, node: TreeNode) => void;
    /** Обработчик окончания перетаскивания */
    onDragEnd?: (event: React.DragEvent, node: TreeNode) => void;
    /** Обработчик наведения при перетаскивании */
    onDragOver?: (event: React.DragEvent, node: TreeNode) => void;
    /** Обработчик сброса при перетаскивании */
    onDrop?: (event: React.DragEvent, node: TreeNode) => void;
    /** Кастомные иконки */
    customIcons?: TreeCustomIcons;
    /** Включить функциональность drag & drop */
    enableDragDrop?: boolean;
    /** Поисковый запрос для подсветки совпадений */
    searchQuery?: string;
}

/**
 * Пропсы компонента контекстного меню
 */
export interface ContextMenuProps {
    /** Координата X для позиционирования меню */
    x: number;
    /** Координата Y для позиционирования меню */
    y: number;
    /** Узел, для которого открыто контекстное меню */
    node: TreeNode;
    /** Список доступных действий */
    actions: TreeContextMenuAction[];
    /** Обработчик закрытия меню */
    onClose: () => void;
}

/**
 * Пропсы компонента виртуализированного списка для оптимизации производительности
 */
export interface VirtualizedListProps {
    /** Массив элементов с информацией об уровне вложенности */
    items: Array<TreeNode & { level: number }>;
    /** Высота одного элемента в пикселях */
    itemHeight: number;
    /** Максимальное количество видимых элементов */
    maxVisibleItems: number;
    /** Функция рендеринга отдельного элемента */
    renderItem: (
        item: TreeNode & { level: number },
        index: number
    ) => React.ReactNode;
}

/**
 * Результат поиска по дереву
 */
export interface SearchResult {
    /** Найденный узел */
    node: TreeNode;
    /** Полный путь к узлу */
    path: string;
    /** Количество совпадений в узле */
    matches: number;
}
