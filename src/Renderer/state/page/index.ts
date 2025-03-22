import { atom } from 'jotai';

import { DefaultPageUnitSize } from '@/shared/constants/defaultPageParams';

export const pageUnitSizeAtom = atom<number>(DefaultPageUnitSize);
