import { FC } from 'react';

import { useAtom } from 'jotai';

import styles from './BreakpointsSettings.module.css';

import { Text } from '@/shared/components';
import { Breakpoint } from '@/shared/types/PageConfig';

import {
    activeBreakpointIndexAtom,
    breakpointsAtom,
} from '@/Constructor/state/breakpoints';

import { text } from './BreakpointsSettings.localization';
import { AddBreakpointForm } from './ui/AddBreakpointForm';
import { BreakpointItem } from './ui/BreakpointItem';

export type BreakpointsSettingsProps = Record<string, never>;

export const BreakpointsSettings: FC<BreakpointsSettingsProps> = () => {
    const [breakpoints, setBreakpoints] = useAtom(breakpointsAtom);
    const [activeBreakpointIndex, setActiveBreakpointIndex] = useAtom(
        activeBreakpointIndexAtom
    );

    const handleAddBreakpoint = (newBreakpoint: Breakpoint) => {
        // Добавляем и сортируем по maxWidth от большего к меньшему
        const updatedBreakpoints = [...breakpoints, newBreakpoint].sort(
            (a, b) => b.maxWidth - a.maxWidth
        );

        setBreakpoints(updatedBreakpoints);
    };

    const handleRemoveBreakpoint = (index: number) => {
        const updatedBreakpoints = breakpoints.filter((_, i) => i !== index);
        setBreakpoints(updatedBreakpoints);
    };

    return (
        <div className={styles.root}>
            {/* Показываем активный брейкпоинт */}
            <Text variant="body">
                {text.activeBreakpoint.en}{' '}
                {activeBreakpointIndex === null
                    ? text.baseConfiguration.en
                    : breakpoints[activeBreakpointIndex]?.name ||
                      text.notSelected.en}
            </Text>
            <Text variant="secondary">{text.hint.en}</Text>

            <div className={styles.breakpointsList}>
                {/* Кнопка для базовой конфигурации */}
                <BreakpointItem
                    name={text.baseConfiguration.en}
                    subtitle={text.default.en}
                    isActive={activeBreakpointIndex === null}
                    onEdit={() => setActiveBreakpointIndex(null)}
                />

                {breakpoints.map((breakpoint, index) => (
                    <BreakpointItem
                        key={index}
                        name={breakpoint.name}
                        subtitle={`≤ ${breakpoint.maxWidth}px`}
                        isActive={activeBreakpointIndex === index}
                        showDeleteButton={true}
                        onEdit={() => setActiveBreakpointIndex(index)}
                        onDelete={() => handleRemoveBreakpoint(index)}
                    />
                ))}
            </div>

            <AddBreakpointForm
                namePlaceholder={text.namePlaceholder.en}
                maxWidthPlaceholder={text.maxWidthPlaceholder.en}
                onAddBreakpoint={handleAddBreakpoint}
            />
        </div>
    );
};
