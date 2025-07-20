import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Tree } from './Tree';
import { TreeContextMenuAction, TreeCustomIcons, TreeNode } from './types';

// Пример данных файловой структуры
const sampleData: TreeNode[] = [
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
const generateLargeData = (): TreeNode[] => {
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

const contextMenuActions: TreeContextMenuAction[] = [
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

const customIcons: TreeCustomIcons = {
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

const meta: Meta<typeof Tree> = {
    title: 'Shared/Tree',
    component: Tree,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Компонент Tree для отображения иерархической структуры файлов и папок с поддержкой поиска, drag&drop, контекстного меню и виртуализации.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        data: {
            description: 'Массив узлов дерева',
            control: false,
        },
        selectedNodeId: {
            description: 'ID выбранного узла',
            control: 'text',
        },
        expandedNodeIds: {
            description: 'Массив ID развернутых узлов',
            control: false,
        },
        searchQuery: {
            description: 'Поисковый запрос (внешний)',
            control: 'text',
        },
        enableDragDrop: {
            description: 'Включить drag & drop',
            control: 'boolean',
        },
        enableVirtualization: {
            description: 'Включить виртуализацию для больших списков',
            control: 'boolean',
        },
        enableSearch: {
            description: 'Включить встроенный поиск',
            control: 'boolean',
        },
        maxVisibleItems: {
            description:
                'Максимальное количество видимых элементов для виртуализации',
            control: { type: 'number', min: 10, max: 100, step: 10 },
        },
        itemHeight: {
            description: 'Высота элемента в пикселях',
            control: { type: 'number', min: 20, max: 50, step: 2 },
        },
        contextMenuActions: {
            description: 'Действия контекстного меню',
            control: false,
        },
        customIcons: {
            description: 'Пользовательские иконки',
            control: false,
        },
        onNodeClick: { action: 'nodeClick' },
        onNodeDoubleClick: { action: 'nodeDoubleClick' },
        onNodeSelect: { action: 'nodeSelect' },
        onNodeExpand: { action: 'nodeExpand' },
        onNodeCollapse: { action: 'nodeCollapse' },
        onDragStart: { action: 'dragStart' },
        onDragEnd: { action: 'dragEnd' },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '400px',
                    height: '500px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
    args: {
        data: sampleData,
        enableSearch: true,
        enableDragDrop: false,
        enableVirtualization: false,
    },
};

// Расширенная история с полным функционалом
export const Advanced: Story = {
    args: {
        data: sampleData,
        contextMenuActions,
        customIcons,
        enableDragDrop: true,
        enableVirtualization: false,
        enableSearch: true,
        maxVisibleItems: 50,
        itemHeight: 32,
    },
    render: (args) => {
        const [selectedNodeId, setSelectedNodeId] = useState<string>();
        const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([
            '1',
            '2',
        ]);

        return (
            <Tree
                {...args}
                selectedNodeId={selectedNodeId}
                expandedNodeIds={expandedNodeIds}
                onNodeSelect={(node) => {
                    setSelectedNodeId(node.id);
                    args.onNodeSelect?.(node);
                }}
                onNodeExpand={(node) => {
                    setExpandedNodeIds((prev) => [...prev, node.id]);
                    args.onNodeExpand?.(node);
                }}
                onNodeCollapse={(node) => {
                    setExpandedNodeIds((prev) =>
                        prev.filter((id) => id !== node.id)
                    );
                    args.onNodeCollapse?.(node);
                }}
            />
        );
    },
};

// История с виртуализацией
export const Virtualized: Story = {
    args: {
        data: generateLargeData(),
        enableVirtualization: true,
        maxVisibleItems: 20,
        itemHeight: 28,
        enableSearch: true,
        enableDragDrop: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Пример с виртуализацией для отображения больших списков файлов (500+ элементов).',
            },
        },
    },
};

// История с drag & drop
export const WithDragDrop: Story = {
    args: {
        data: sampleData,
        enableDragDrop: true,
        enableSearch: true,
        enableVirtualization: false,
    },
    render: (args) => {
        const [selectedNodeId, setSelectedNodeId] = useState<string>();
        const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([
            '1',
            '2',
            '3',
        ]);

        return (
            <Tree
                {...args}
                selectedNodeId={selectedNodeId}
                expandedNodeIds={expandedNodeIds}
                onNodeSelect={(node) => {
                    setSelectedNodeId(node.id);
                    args.onNodeSelect?.(node);
                }}
                onNodeExpand={(node) => {
                    setExpandedNodeIds((prev) => [...prev, node.id]);
                    args.onNodeExpand?.(node);
                }}
                onNodeCollapse={(node) => {
                    setExpandedNodeIds((prev) =>
                        prev.filter((id) => id !== node.id)
                    );
                    args.onNodeCollapse?.(node);
                }}
                onDragEnd={(dragNode, targetNode) => {
                    console.log(
                        'Moved:',
                        dragNode.name,
                        'to:',
                        targetNode?.name || 'root'
                    );
                    args.onDragEnd?.(dragNode, targetNode);
                }}
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Пример с включенным drag & drop. Попробуйте перетащить файлы и папки.',
            },
        },
    },
};

// История с контекстным меню
export const WithContextMenu: Story = {
    args: {
        data: sampleData,
        contextMenuActions,
        customIcons,
        enableSearch: true,
        enableDragDrop: false,
        enableVirtualization: false,
    },
    render: (args) => {
        const [selectedNodeId, setSelectedNodeId] = useState<string>();
        const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>([
            '1',
            '2',
        ]);

        return (
            <Tree
                {...args}
                selectedNodeId={selectedNodeId}
                expandedNodeIds={expandedNodeIds}
                onNodeSelect={(node) => {
                    setSelectedNodeId(node.id);
                    args.onNodeSelect?.(node);
                }}
                onNodeExpand={(node) => {
                    setExpandedNodeIds((prev) => [...prev, node.id]);
                    args.onNodeExpand?.(node);
                }}
                onNodeCollapse={(node) => {
                    setExpandedNodeIds((prev) =>
                        prev.filter((id) => id !== node.id)
                    );
                    args.onNodeCollapse?.(node);
                }}
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Пример с контекстным меню и пользовательскими иконками. Кликните правой кнопкой мыши на элементе.',
            },
        },
    },
};

// История с внешним поиском
export const WithExternalSearch: Story = {
    render: (args) => {
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedNodeId, setSelectedNodeId] = useState<string>();
        const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>(['1']);

        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{ marginBottom: '16px', padding: '0 16px' }}>
                    <input
                        type="text"
                        placeholder="Поиск файлов..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px',
                        }}
                    />
                </div>

                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <Tree
                        data={sampleData}
                        searchQuery={searchQuery}
                        enableSearch={false}
                        selectedNodeId={selectedNodeId}
                        expandedNodeIds={expandedNodeIds}
                        onNodeSelect={(node) => {
                            setSelectedNodeId(node.id);
                            args.onNodeSelect?.(node);
                        }}
                        onNodeExpand={(node) => {
                            setExpandedNodeIds((prev) => [...prev, node.id]);
                            args.onNodeExpand?.(node);
                        }}
                        onNodeCollapse={(node) => {
                            setExpandedNodeIds((prev) =>
                                prev.filter((id) => id !== node.id)
                            );
                            args.onNodeCollapse?.(node);
                        }}
                    />
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Пример с внешним поиском. Встроенный поиск отключен, используется внешнее поле ввода.',
            },
        },
    },
};

// История без поиска
export const WithoutSearch: Story = {
    args: {
        data: sampleData,
        enableSearch: false,
        enableDragDrop: false,
        enableVirtualization: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Простое дерево без встроенного поиска.',
            },
        },
    },
};

// Компактная версия
export const Compact: Story = {
    args: {
        data: sampleData,
        enableSearch: true,
        enableDragDrop: false,
        enableVirtualization: false,
        itemHeight: 24,
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '300px',
                    height: '400px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                }}
            >
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'Компактная версия дерева с уменьшенной высотой элементов.',
            },
        },
    },
};
