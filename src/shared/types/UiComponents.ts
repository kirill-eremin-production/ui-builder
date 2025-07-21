import { CustomHtmlProps } from '@/Renderer/dist/components/CustomHtml';

export type UiComponentCommonProps = {
    id: string;
    name?: string;
    description?: string;

    // Перемещаем ли элемент по холсту
    isMoving: boolean;

    // Положение элемента на холсте
    x: number; // процент от ширины канваса (0-100)
    y: number; // значение в rem

    // Размеры элемента на холсте
    width: number; // процент от ширины канваса
    height: number; // значение в rem
};

export type ContainerComponent = UiComponentCommonProps & {
    type: 'Container';
    text?: string;
    children?: UiComponents;
};

export type CustomHTMLComponent = UiComponentCommonProps & {
    type: 'CustomHTML';
    params: CustomHtmlProps;
};

export type UiComponent = ContainerComponent | CustomHTMLComponent;

export type UiComponents = Record<string, UiComponent>;
