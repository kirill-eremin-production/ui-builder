import { atom } from 'jotai/index';

export const pageIdAtom = atom<string>('');

export const pageNameAtom = atom<string>('');

export const pageWidthAtom = atom<number>(1024);

export const pageMinHeightAtom = atom<number>(1024);
