import { TreeContextMenuAction, TreeCustomIcons, TreeNode } from '../types';

// Пример данных файловой структуры
export const sampleData: TreeNode[] = [
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
                        name: 'Button',
                        type: 'folder',
                        children: [
                            {
                                id: '4',
                                name: 'Button.tsx',
                                type: 'file',
                                size: 2048,
                                modified: new Date('2024-01-15'),
                            },
                            {
                                id: '5',
                                name: 'Button.module.css',
                                type: 'file',
                                size: 1024,
                                modified: new Date('2024-01-14'),
                            },
                            {
                                id: '6',
                                name: 'index.ts',
                                type: 'file',
                                size: 128,
                                modified: new Date('2024-01-13'),
                            },
                        ],
                    },
                    {
                        id: '7',
                        name: 'Tree',
                        type: 'folder',
                        children: [
                            {
                                id: '8',
                                name: 'Tree.tsx',
                                type: 'file',
                                size: 8192,
                                modified: new Date('2024-01-20'),
                            },
                            {
                                id: '9',
                                name: 'TreeNode.tsx',
                                type: 'file',
                                size: 4096,
                                modified: new Date('2024-01-19'),
                            },
                            {
                                id: '10',
                                name: 'types.ts',
                                type: 'file',
                                size: 2048,
                                modified: new Date('2024-01-18'),
                            },
                        ],
                    },
                ],
            },
            {
                id: '11',
                name: 'utils',
                type: 'folder',
                children: [
                    {
                        id: '12',
                        name: 'helpers.ts',
                        type: 'file',
                        size: 1536,
                        modified: new Date('2024-01-12'),
                    },
                    {
                        id: '13',
                        name: 'constants.ts',
                        type: 'file',
                        size: 512,
                        modified: new Date('2024-01-11'),
                    },
                ],
            },
            {
                id: '14',
                name: 'App.tsx',
                type: 'file',
                size: 3072,
                modified: new Date('2024-01-21'),
            },
            {
                id: '15',
                name: 'index.tsx',
                type: 'file',
                size: 256,
                modified: new Date('2024-01-10'),
            },
        ],
    },
    {
        id: '16',
        name: 'public',
        type: 'folder',
        children: [
            {
                id: '17',
                name: 'favicon.ico',
                type: 'file',
                size: 4096,
                modified: new Date('2024-01-01'),
            },
            {
                id: '18',
                name: 'logo.png',
                type: 'file',
                size: 16384,
                modified: new Date('2024-01-02'),
            },
        ],
    },
    {
        id: '19',
        name: 'package.json',
        type: 'file',
        size: 1024,
        modified: new Date('2024-01-22'),
    },
    {
        id: '20',
        name: 'README.md',
        type: 'file',
        size: 2048,
        modified: new Date('2024-01-23'),
    },
];

// Генерация больших данных для виртуализации
export const generateLargeData = (): TreeNode[] => {
    const data: TreeNode[] = [];

    for (let i = 1; i <= 10; i++) {
        const folder: TreeNode = {
            id: `folder-${i}`,
            name: `Папка ${i}`,
            type: 'folder',
            children: [],
        };

        for (let j = 1; j <= 50; j++) {
            folder.children!.push({
                id: `file-${i}-${j}`,
                name: `Файл ${i}-${j}.txt`,
                type: 'file',
                size: Math.floor(Math.random() * 10000),
                modified: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
            });
        }

        data.push(folder);
    }

    return data;
};

// Действия контекстного меню
export const contextMenuActions: TreeContextMenuAction[] = [
    {
        id: 'open',
        label: 'Открыть',
        icon: '📂',
        action: (node) => {
            console.log('Opening:', node.name);
            alert(`Открываем файл: ${node.name}`);
        },
    },
    {
        id: 'rename',
        label: 'Переименовать',
        icon: '✏️',
        action: (node) => {
            const newName = prompt('Новое имя:', node.name);
            if (newName) {
                console.log('Renaming:', node.name, 'to:', newName);
            }
        },
    },
    {
        id: 'copy',
        label: 'Копировать',
        icon: '📋',
        action: (node) => {
            console.log('Copying:', node.name);
            navigator.clipboard.writeText(node.name);
        },
    },
    {
        id: 'delete',
        label: 'Удалить',
        icon: '🗑️',
        action: (node) => {
            if (confirm(`Удалить ${node.name}?`)) {
                console.log('Deleting:', node.name);
            }
        },
    },
];

// Пользовательские иконки
export const customIcons: TreeCustomIcons = {
    folder: '📁',
    folderOpen: '📂',
    file: '📄',
    tsx: '⚛️',
    jsx: '⚛️',
    ts: '📜',
    js: '📜',
    css: '🎨',
    json: '📋',
    md: '📝',
    png: '🖼️',
    jpg: '🖼️',
    ico: '🖼️',
};

// Стили для декораторов
export const treeDecoratorStyles = {
    width: '400px',
    height: '500px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
};

export const compactDecoratorStyles = {
    width: '300px',
    height: '400px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
};