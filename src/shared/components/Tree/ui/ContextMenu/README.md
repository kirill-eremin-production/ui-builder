# ContextMenu

Компонент контекстного меню для узлов дерева. Отображает всплывающее меню с доступными действиями для выбранного узла дерева.

## Описание

ContextMenu - это UI-компонент, который показывает список доступных действий при клике правой кнопкой мыши на узел дерева. Меню позиционируется абсолютно по координатам клика и автоматически закрывается после выбора действия.

## Использование

```tsx
import { ContextMenu } from './ui/ContextMenu';

const contextMenuActions = [
    {
        id: 'rename',
        label: 'Переименовать',
        icon: '✏️',
        action: (node) => console.log('Rename', node),
        disabled: false,
    },
    {
        id: 'delete',
        label: 'Удалить',
        icon: '🗑️',
        action: (node) => console.log('Delete', node),
        disabled: false,
    },
];

<ContextMenu
    x={100}
    y={200}
    node={selectedNode}
    actions={contextMenuActions}
    onClose={() => setContextMenu(null)}
/>;
```

## Props

| Prop      | Type                      | Обязательный | Описание                                           |
| --------- | ------------------------- | ------------ | -------------------------------------------------- |
| `x`       | `number`                  | ✅           | Координата X для позиционирования меню             |
| `y`       | `number`                  | ✅           | Координата Y для позиционирования меню             |
| `node`    | `TreeNode`                | ✅           | Узел дерева, для которого открыто контекстное меню |
| `actions` | `TreeContextMenuAction[]` | ✅           | Список доступных действий                          |
| `onClose` | `() => void`              | ✅           | Обработчик закрытия меню                           |

## TreeContextMenuAction

```tsx
interface TreeContextMenuAction {
    id: string; // Уникальный идентификатор действия
    label: string; // Текст действия, отображаемый в меню
    icon?: string; // Иконка действия (опционально)
    action: (node: TreeNode) => void; // Функция, выполняемая при выборе действия
    disabled?: boolean; // Флаг отключения действия
}
```

## Особенности

- **Абсолютное позиционирование**: Меню позиционируется по переданным координатам `x` и `y`
- **Автоматическое закрытие**: Меню закрывается после выбора любого действия
- **Поддержка отключенных действий**: Действия с флагом `disabled: true` отображаются серым цветом и не выполняются
- **Предотвращение всплытия**: Клики по меню не всплывают к родительским элементам
- **Поддержка иконок**: Каждое действие может иметь иконку

## Стили

Компонент использует CSS-модули для стилизации. Основные классы:

- `.contextMenu` - контейнер меню
- `.contextMenuItem` - элемент меню
- `.contextMenuItem.disabled` - отключенный элемент меню
- `.contextMenuIcon` - контейнер для иконки действия

## Пример с различными действиями

```tsx
const actions = [
    {
        id: 'open',
        label: 'Открыть',
        icon: '📂',
        action: (node) => openNode(node),
    },
    {
        id: 'rename',
        label: 'Переименовать',
        icon: '✏️',
        action: (node) => startRename(node),
    },
    {
        id: 'copy',
        label: 'Копировать',
        icon: '📋',
        action: (node) => copyNode(node),
    },
    {
        id: 'delete',
        label: 'Удалить',
        icon: '🗑️',
        action: (node) => deleteNode(node),
        disabled: node.type === 'system', // Системные файлы нельзя удалять
    },
];
```

## Интеграция с Tree

Компонент автоматически интегрируется с основным компонентом Tree через пропс `contextMenuActions`:

```tsx
<Tree
    data={treeData}
    contextMenuActions={contextMenuActions}
    // ... другие пропсы
/>
```
