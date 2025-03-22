import { atom } from 'jotai/index';

import {
    DefaultPageHeight,
    DefaultPageName,
    DefaultPageWidth,
} from '@/shared/constants/defaultPageParams';

export const pageIdAtom = atom<string>('');

export const pageNameAtom = atom<string>(DefaultPageName);

export const pageWidthAtom = atom<number>(DefaultPageWidth);

export const pageMinHeightAtom = atom<number>(DefaultPageHeight);
