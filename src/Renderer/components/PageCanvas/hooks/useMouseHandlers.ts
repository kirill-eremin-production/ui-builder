import { useCallback, MouseEventHandler } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { 
    widgetResizeDataAtom,
    isCanvasWidgetEditingAtom,
    widgetDataToMoveAtom,
    selectedWidgetIdToEditAtom
} from '@/Constructor/state/selection';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import { useWidgetResize } from './useWidgetResize';
import { useWidgetMove } from './useWidgetMove';
import { useWidgetAdd } from './useWidgetAdd';

interface UseMouseHandlersProps {
    canvasWidth: number;
}

export const useMouseHandlers = ({ canvasWidth }: UseMouseHandlersProps) => {
    const pageUnitSize = useAtom(pageUnitSizeAtom)[0];
    const setWidgetResizeData = useSetAtom(widgetResizeDataAtom);
    const setIsCanvasWidgetEditing = useSetAtom(isCanvasWidgetEditingAtom);
    const setWidgetDataToMove = useSetAtom(widgetDataToMoveAtom);
    const setSelectedWidgetIdToEdit = useSetAtom(selectedWidgetIdToEditAtom);

    const { handleResize } = useWidgetResize();
    const { handleMove, getNewWidgetPosition, clearNewWidgetPosition } = useWidgetMove();
    const { 
        widgetTypeToAddOnCanvas,
        selectedWidgetIds,
        addNewWidget,
        removeWidget,
        finalizeWidgetPlacement
    } = useWidgetAdd();

    const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();

        const canvasBox = event.currentTarget.getBoundingClientRect();
        const canvasScroll = event.currentTarget.scrollTop;

        // Обработка изменения размера
        if (handleResize(event, pageUnitSize)) {
            return;
        }

        // Обработка перемещения существующего виджета или добавления нового
        if (handleMove(event, canvasBox, canvasScroll, pageUnitSize, canvasWidth)) {
            return;
        }

        // Добавление нового виджета при первом движении мыши
        if (widgetTypeToAddOnCanvas && !selectedWidgetIds.length) {
            addNewWidget();
        }
    }, [
        pageUnitSize, 
        canvasWidth, 
        handleResize, 
        handleMove, 
        widgetTypeToAddOnCanvas, 
        selectedWidgetIds, 
        addNewWidget
    ]);

    const onMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!selectedWidgetIds.length) {
            return;
        }

        // Если виджет еще не размещен (новый виджет), удаляем его
        if (widgetTypeToAddOnCanvas && selectedWidgetIds.length) {
            removeWidget(selectedWidgetIds[0]);
        }
    }, [selectedWidgetIds, widgetTypeToAddOnCanvas, removeWidget]);

    const onMouseUp: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();

        // Сброс состояний редактирования
        setWidgetResizeData(null);
        setIsCanvasWidgetEditing(false);
        setWidgetDataToMove(null);

        // Сброс выбранного виджета для редактирования при клике на канвас
        if (event.currentTarget === event.target) {
            setSelectedWidgetIdToEdit(null);
        }

        // Финализация размещения виджета
        if (selectedWidgetIds.length) {
            const position = getNewWidgetPosition();
            finalizeWidgetPlacement(selectedWidgetIds[0], position);
            clearNewWidgetPosition();
        }
    }, [
        selectedWidgetIds,
        setWidgetResizeData,
        setIsCanvasWidgetEditing,
        setWidgetDataToMove,
        setSelectedWidgetIdToEdit,
        getNewWidgetPosition,
        clearNewWidgetPosition,
        finalizeWidgetPlacement
    ]);

    return {
        onMouseMove,
        onMouseLeave,
        onMouseUp
    };
};