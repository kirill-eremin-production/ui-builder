import { atom } from 'jotai';

import { WidgetType } from '@/Renderer/dist/components/widgetType';

export const widgetTypeToAddOnCanvasAtom = atom<WidgetType | null>(null);
