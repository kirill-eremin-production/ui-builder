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

export const widgetDataToMoveAtom = atom<{
    initialX: number;
    initialY: number;
    initialMousePosition: { x: number; y: number };
} | null>(null);

// Признак, который говорит о том, что в данный момент происходит изменение виджета на холсте
export const isCanvasWidgetEditingAtom = atom<boolean>(false);

// Для перемещения
export const selectedWidgetIdsAtom = atom<string[]>([]);

// Для редактирования
export const selectedWidgetIdToEditAtom = atom<string | null>(null);
