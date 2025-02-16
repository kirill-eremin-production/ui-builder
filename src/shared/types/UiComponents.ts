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
    type: WidgetType;
    text: string;
    children?: UiComponents;
};

export type UiComponent = ContainerComponent;

export type UiComponents = Record<string, UiComponent>;
