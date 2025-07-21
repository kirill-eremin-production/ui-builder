import { atom } from 'jotai';

import { UiComponents } from '@/shared/types/UiComponents';

// UI компоненты для базовой конфигурации
export const uiComponentsAtom = atom<UiComponents>({});

// UI компоненты для каждого брейкпоинта
// Ключ - индекс брейкпоинта, значение - UI компоненты для этого брейкпоинта
export const breakpointUiComponentsAtom = atom<Record<number, UiComponents>>({});
