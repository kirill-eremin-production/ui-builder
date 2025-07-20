# Tree Stories - Декомпозированная структура

Этот каталог содержит декомпозированные истории Storybook для компонента Tree. Оригинальный монолитный файл `Tree.stories.tsx` был разделен на несколько специализированных файлов для лучшей организации и поддержки.

## Структура файлов

### Основные файлы

- **`Tree.stories.ts`** - Основная мета-конфигурация Storybook с описанием компонента и его параметров
- **`Tree.stories.tsx`** - Индексный файл, который экспортирует все истории и служит точкой входа
- **`data.ts`** - Общие данные, утилиты и константы, используемые во всех историях

### Файлы историй

- **`Basic.stories.tsx`** - Базовые истории:

    - `Default` - Стандартная конфигурация с поиском
    - `WithoutSearch` - Простое дерево без поиска
    - `Compact` - Компактная версия с уменьшенной высотой элементов

- **`Advanced.stories.tsx`** - Продвинутые истории:

    - `Advanced` - Полнофункциональная версия с drag&drop, контекстным меню и пользовательскими иконками

- **`Virtualized.stories.tsx`** - Истории виртуализации:

    - `Virtualized` - Базовая виртуализация для больших списков
    - `LargeDataset` - Оптимизированная виртуализация для очень больших наборов данных
    - `CompactVirtualized` - Компактная виртуализированная версия

- **`DragDrop.stories.tsx`** - Истории drag & drop:

    - `WithDragDrop` - Drag & drop с поиском
    - `DragDropOnly` - Только drag & drop без дополнительных функций

- **`ContextMenu.stories.tsx`** - Истории контекстного меню:

    - `WithContextMenu` - Контекстное меню с пользовательскими иконками
    - `WithCustomIcons` - Только пользовательские иконки
    - `ContextMenuOnly` - Только контекстное меню

- **`Search.stories.tsx`** - Истории поиска:
    - `WithExternalSearch` - Внешнее поле поиска
    - `WithBuiltInSearch` - Встроенный поиск
    - `WithPresetSearch` - Предустановленный поисковый запрос

## Использование

### Импорт всех историй

```typescript
import * as TreeStories from './Tree.stories';
```

### Импорт конкретных историй

```typescript
import { Advanced } from './Advanced.stories';
import { Compact, Default } from './Basic.stories';
import { Virtualized } from './Virtualized.stories';
```

### Импорт данных и утилит

```typescript
import { contextMenuActions, customIcons, sampleData } from './data';
```

## Преимущества декомпозиции

1. **Лучшая организация** - Каждый файл отвечает за конкретную функциональность
2. **Упрощенная поддержка** - Легче найти и изменить конкретную историю
3. **Переиспользование** - Общие данные и утилиты вынесены в отдельный файл
4. **Масштабируемость** - Легко добавлять новые истории без загромождения основного файла
5. **Читаемость** - Каждый файл фокусируется на конкретном аспекте компонента

## Добавление новых историй

Для добавления новой истории:

1. Создайте новый файл `[Category].stories.tsx` в этом каталоге
2. Импортируйте необходимые зависимости из `data.ts` и `Tree.stories.ts`
3. Добавьте экспорт в `Tree.stories.tsx` (индексный файл)

Пример:

```typescript
// NewFeature.stories.tsx
import type { StoryObj } from '@storybook/react';

import { Tree } from '../Tree';

import meta from './Tree.stories';
import { sampleData, treeDecoratorStyles } from './data';

type Story = StoryObj<typeof meta>;

export const NewFeature: Story = {
    args: {
        data: sampleData,
        // ваши параметры
    },
    // ваша реализация
};

export default {
    title: 'Shared/Tree/NewFeature',
};
```

Затем добавьте в `Tree.stories.tsx`:

```typescript
// Истории новой функции
export * from './NewFeature.stories';
```
