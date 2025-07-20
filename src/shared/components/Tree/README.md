# Tree Component

Полнофункциональный React компонент для отображения файловой структуры в виде интерактивного древовидного списка с функциональностью файлового инспектора.

## Возможности

- ✅ Рекурсивное отображение файловой структуры
- ✅ Разворачивание/сворачивание папок по клику
- ✅ Отображение иконок для файлов и папок
- ✅ Отступы для визуализации уровней вложенности
- ✅ Обработка кликов по элементам
- ✅ Выделение активного элемента
- ✅ TypeScript типизация
- ✅ Стилизация через CSS модули
- ✅ Анимации для плавного разворачивания
- ✅ Контекстное меню по правому клику
- ✅ Drag and drop функциональность
- ✅ Поиск по файлам
- ✅ Виртуализация для больших списков
- ✅ Возможность кастомизации иконок через пропсы
- ✅ Клавиатурная навигация
- ✅ Темная тема
- ✅ Адаптивность

## Установка

```tsx
import { Tree } from '@/shared/components/Tree';
```

## Базовое использование

```tsx
import React from 'react';

import { Tree, TreeNodeType } from '@/shared/components/Tree';

const data: TreeNodeType[] = [
    {
        id: '1',
        name: 'src',
        type: 'folder',
        children: [
            {
                id: '2',
                name: 'components',
                type: 'folder',
                children: [
                    {
                        id: '3',
                        name: 'Button.tsx',
                        type: 'file',
                    },
                ],
            },
            {
                id: '4',
                name: 'utils.ts',
                type: 'file',
            },
        ],
    },
];

function App() {
    return (
        <Tree
            data={data}
            onNodeClick={(node) => console.log('Clicked:', node.name)}
            onNodeSelect={(node) => console.log('Selected:', node.name)}
        />
    );
}
```

## Расширенное использование

```tsx
import React, { useState } from 'react';

import {
    Tree,
    TreeContextMenuAction,
    TreeNodeType,
} from '@/shared/components/Tree';

function AdvancedTreeExample() {
    const [selectedNodeId, setSelectedNodeId] = useState<string>();
    const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>(['1']);

    const data: TreeNodeType[] = [
        // ... ваши данные
    ];

    const contextMenuActions: TreeContextMenuAction[] = [
        {
            id: 'open',
            label: 'Открыть',
            icon: '📂',
            action: (node) => console.log('Opening:', node.name),
        },
        {
            id: 'rename',
            label: 'Переименовать',
            icon: '✏️',
            action: (node) => console.log('Renaming:', node.name),
        },
        {
            id: 'delete',
            label: 'Удалить',
            icon: '🗑️',
            action: (node) => console.log('Deleting:', node.name),
        },
    ];

    const customIcons = {
        folder: '📁',
        folderOpen: '📂',
        file: '📄',
        js: '📜',
        ts: '📜',
        tsx: '⚛️',
        jsx: '⚛️',
    };

    return (
        <Tree
            data={data}
            selectedNodeId={selectedNodeId}
            expandedNodeIds={expandedNodeIds}
            contextMenuActions={contextMenuActions}
            customIcons={customIcons}
            enableDragDrop={true}
            enableVirtualization={true}
            enableSearch={true}
            maxVisibleItems={50}
            itemHeight={32}
            onNodeSelect={(node) => setSelectedNodeId(node.id)}
            onNodeExpand={(node) => {
                setExpandedNodeIds((prev) => [...prev, node.id]);
            }}
            onNodeCollapse={(node) => {
                setExpandedNodeIds((prev) =>
                    prev.filter((id) => id !== node.id)
                );
            }}
            onDragEnd={(dragNode, targetNode) => {
                console.log('Moved:', dragNode.name, 'to:', targetNode?.name);
            }}
        />
    );
}
```

## API

### TreeProps

| Prop                   | Type                                                  | Default | Description                 |
| ---------------------- | ----------------------------------------------------- | ------- | --------------------------- |
| `data`                 | `TreeNode[]`                                          | -       | Данные дерева               |
| `onNodeClick`          | `(node: TreeNode) => void`                            | -       | Обработчик клика по узлу    |
| `onNodeDoubleClick`    | `(node: TreeNode) => void`                            | -       | Обработчик двойного клика   |
| `onNodeSelect`         | `(node: TreeNode) => void`                            | -       | Обработчик выбора узла      |
| `onNodeExpand`         | `(node: TreeNode) => void`                            | -       | Обработчик разворачивания   |
| `onNodeCollapse`       | `(node: TreeNode) => void`                            | -       | Обработчик сворачивания     |
| `onDragStart`          | `(node: TreeNode) => void`                            | -       | Начало перетаскивания       |
| `onDragEnd`            | `(dragNode: TreeNode, targetNode?: TreeNode) => void` | -       | Конец перетаскивания        |
| `selectedNodeId`       | `string`                                              | -       | ID выбранного узла          |
| `expandedNodeIds`      | `string[]`                                            | `[]`    | Массив ID развернутых узлов |
| `searchQuery`          | `string`                                              | -       | Внешний поисковый запрос    |
| `contextMenuActions`   | `TreeContextMenuAction[]`                             | `[]`    | Действия контекстного меню  |
| `customIcons`          | `TreeCustomIcons`                                     | -       | Кастомные иконки            |
| `enableDragDrop`       | `boolean`                                             | `false` | Включить drag & drop        |
| `enableVirtualization` | `boolean`                                             | `false` | Включить виртуализацию      |
| `enableSearch`         | `boolean`                                             | `true`  | Включить поиск              |
| `maxVisibleItems`      | `number`                                              | `100`   | Макс. видимых элементов     |
| `itemHeight`           | `number`                                              | `28`    | Высота элемента в пикселях  |
| `className`            | `string`                                              | -       | CSS класс                   |
| `style`                | `React.CSSProperties`                                 | -       | Inline стили                |

### TreeNode

```tsx
interface TreeNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children?: TreeNode[];
    path?: string;
    size?: number;
    modified?: Date;
    icon?: string;
}
```

### TreeContextMenuAction

```tsx
interface TreeContextMenuAction {
    id: string;
    label: string;
    icon?: string;
    action: (node: TreeNode) => void;
    disabled?: boolean;
}
```

### TreeCustomIcons

```tsx
interface TreeCustomIcons {
    folder?: string;
    folderOpen?: string;
    file?: string;
    [key: string]: string | undefined;
}
```

## Хуки

Компонент предоставляет несколько хуков для управления состоянием:

### useExpandedNodes

```tsx
const {
    expandedIds,
    toggleNode,
    expandNode,
    collapseNode,
    expandAll,
    collapseAll,
    isExpanded,
} = useExpandedNodes(['initial-expanded-id']);
```

### useSelectedNode

```tsx
const { selectedId, selectNode, clearSelection, isSelected } = useSelectedNode(
    'initial-selected-id'
);
```

### useTreeSearch

```tsx
const { searchQuery, searchResults, performSearch, clearSearch, hasResults } =
    useTreeSearch(treeData);
```

## Утилиты

Компонент также экспортирует полезные утилиты:

```tsx
import {
    findNodeById,
    formatDate,
    formatFileSize,
    getFileIcon,
    getNodePath,
    searchNodes,
    sortNodes,
} from '@/shared/components/Tree';
```

## Стилизация

Компонент использует CSS модули и CSS переменные для кастомизации:

```css
.tree {
    --text-primary: #333;
    --text-secondary: #666;
    --bg-primary: #fff;
    --bg-secondary: #f8f9fa;
    --border-color: #e0e0e0;
    --hover-bg: #f5f5f5;
    --selected-bg: #e3f2fd;
    --selected-text: #1976d2;
    --primary-color: #007bff;
}

/* Темная тема */
.tree.dark {
    --text-primary: #e0e0e0;
    --text-secondary: #b0b0b0;
    --bg-primary: #1e1e1e;
    --bg-secondary: #2d2d2d;
    --border-color: #404040;
    --hover-bg: #333;
    --selected-bg: #264f78;
    --selected-text: #ffffff;
    --primary-color: #0078d4;
}
```

## Клавиатурная навигация

- `↑/↓` - Навигация по элементам
- `←/→` - Сворачивание/разворачивание папок
- `Enter/Space` - Переключение состояния папки
- `Escape` - Очистка выбора

## Производительность

- Виртуализация для больших списков (>100 элементов)
- Мемоизация компонентов и вычислений
- Оптимизированные обработчики событий
- Ленивая загрузка дочерних элементов

## Доступность

- Поддержка клавиатурной навигации
- ARIA атрибуты
- Семантическая разметка
- Поддержка скринридеров
