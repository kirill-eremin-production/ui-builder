import { UiComponents } from './UiComponents';

export type PageConfig = {
    id?: string;
    // Размер 1 единицы измерения страницы
    unitSize: number;
    ui: UiComponents;
};
