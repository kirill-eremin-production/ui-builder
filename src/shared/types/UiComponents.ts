import { CustomHtmlProps } from '@/Renderer/dist/components/CustomHtml';
import { WidgetType } from '@/Renderer/dist/components/widgetType';

export type UiComponentCommonProps = {
    id: string;
    name?: string;
    description?: string;

    // Перемещаем ли элемент по холсту
    isMoving: boolean;

    // Положение элемента на холсте (px)
    x: number;
    y: number;

    // Размеры элемента на холсте (px)
    width: number;
    height: number;
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
