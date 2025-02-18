import { atom } from 'jotai';

import { Direction } from '@/shared/types/Direction';

import { WidgetType } from '@/Renderer/dist/components/widgetType';

export const widgetTypeToAddOnCanvasAtom = atom<WidgetType | null>(null);

export const widgetResizeDataAtom = atom<{
    widgetId: string;
    direction: Direction;
    initialMousePosition: { x: number; y: number };
    initialWidth: number;
    initialHeight: number;
    initialX: number;
    initialY: number;
} | null>(null);

export const selectedWidgetIdsAtom = atom<string[]>([]);
