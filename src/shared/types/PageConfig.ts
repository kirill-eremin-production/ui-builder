import { RequestsAPI } from './RequestsAPI';
import { UiComponents } from './UiComponents';

export type PageConfig = {
    id?: string;
    name: string;
    width: number;
    minHeight: number;
    // Размер 1 единицы измерения страницы
    unitSize: number;
    ui: UiComponents;
    requests: RequestsAPI;
};
