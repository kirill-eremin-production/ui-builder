import { WidgetType } from '@/Renderer/dist/components/widgetType';

export type UiComponentCommonProps = {
    id: string;
    name?: string;
    description?: string;
};

export type ContainerComponent = UiComponentCommonProps & {
    type: WidgetType;
    text: string;
    children?: UiComponents;
};

export type UiComponent = ContainerComponent;

export type UiComponents = Record<string, UiComponent>;
