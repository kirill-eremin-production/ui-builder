import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tree } from '../Tree';

import {
    contextMenuActions,
    customIcons,
    sampleData,
    treeDecoratorStyles,
} from './data';

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
};

export default meta;

type Story = StoryObj<typeof meta>;

// Основная история с полным функционалом
export const Default: Story = {
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
            <div style={treeDecoratorStyles}>
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
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Полнофункциональное дерево с поиском, drag&drop, контекстным меню и пользовательскими иконками. Попробуйте кликнуть правой кнопкой мыши на элементе или перетащить файлы.',
            },
        },
    },
};
