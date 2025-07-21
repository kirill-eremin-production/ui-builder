import { FC, useState } from 'react';

import { Pencil, Plus, TrashBin } from '@gravity-ui/icons';

import { useAtom } from 'jotai';

import styles from './BreakpointsSettings.module.css';

import { Button, Icon, Text, TextInput } from '@/shared/components';
import { Breakpoint } from '@/shared/types/PageConfig';

import {
    activeBreakpointIndexAtom,
    breakpointsAtom,
} from '@/Constructor/state/breakpoints';

import { text } from './BreakpointsSettings.localization';

export type BreakpointsSettingsProps = Record<string, never>;

export const BreakpointsSettings: FC<BreakpointsSettingsProps> = () => {
    const [breakpoints, setBreakpoints] = useAtom(breakpointsAtom);
    const [activeBreakpointIndex, setActiveBreakpointIndex] = useAtom(
        activeBreakpointIndexAtom
    );
    const [newBreakpointName, setNewBreakpointName] = useState('');
    const [newBreakpointMaxWidth, setNewBreakpointMaxWidth] = useState('');

    const handleAddBreakpoint = () => {
        if (!newBreakpointName || !newBreakpointMaxWidth) return;

        const maxWidth = parseInt(newBreakpointMaxWidth, 10);
        if (isNaN(maxWidth)) return;

        const newBreakpoint: Breakpoint = {
            name: newBreakpointName,
            maxWidth,
            config: {},
        };

        // Добавляем и сортируем по maxWidth от большего к меньшему
        const updatedBreakpoints = [...breakpoints, newBreakpoint].sort(
            (a, b) => b.maxWidth - a.maxWidth
        );

        setBreakpoints(updatedBreakpoints);
        setNewBreakpointName('');
        setNewBreakpointMaxWidth('');
    };

    const handleRemoveBreakpoint = (index: number) => {
        const updatedBreakpoints = breakpoints.filter((_, i) => i !== index);
        setBreakpoints(updatedBreakpoints);
    };

    return (
        <div className={styles.root}>
            <Text variant="title">{text.title.ru}</Text>

            {/* Показываем активный брейкпоинт */}
            <div className={styles.activeBreakpoint}>
                <Text variant="caption">
                    Активный брейкпоинт:{' '}
                    {activeBreakpointIndex === null
                        ? 'Базовая конфигурация'
                        : breakpoints[activeBreakpointIndex]?.name ||
                          'Не выбран'}
                </Text>
            </div>

            <div className={styles.breakpointsList}>
                {/* Кнопка для базовой конфигурации */}
                <div className={styles.breakpointItem}>
                    <div className={styles.breakpointInfo}>
                        <Text variant="body">Базовая конфигурация</Text>
                        <div className={styles.maxWidth}>
                            <Text variant="caption">По умолчанию</Text>
                        </div>
                    </div>
                    <Button
                        view={
                            activeBreakpointIndex === null
                                ? 'action'
                                : 'outlined'
                        }
                        onClick={() => setActiveBreakpointIndex(null)}
                    >
                        <Icon size="s">
                            <Pencil />
                        </Icon>
                    </Button>
                </div>

                {breakpoints.length === 0 ? (
                    <div className={styles.emptyText}>
                        <Text variant="body" color="default">
                            {text.noBreakpoints.ru}
                        </Text>
                    </div>
                ) : (
                    breakpoints.map((breakpoint, index) => (
                        <div key={index} className={styles.breakpointItem}>
                            <div className={styles.breakpointInfo}>
                                <Text variant="body">{breakpoint.name}</Text>
                                <div className={styles.maxWidth}>
                                    <Text variant="caption">
                                        ≤ {breakpoint.maxWidth}px
                                    </Text>
                                </div>
                            </div>
                            <div className={styles.breakpointActions}>
                                <Button
                                    view={
                                        activeBreakpointIndex === index
                                            ? 'action'
                                            : 'outlined'
                                    }
                                    onClick={() =>
                                        setActiveBreakpointIndex(index)
                                    }
                                >
                                    <Icon size="s">
                                        <Pencil />
                                    </Icon>
                                </Button>
                                <Button
                                    view="flat-danger"
                                    onClick={() =>
                                        handleRemoveBreakpoint(index)
                                    }
                                >
                                    <Icon size="s">
                                        <TrashBin />
                                    </Icon>
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className={styles.addBreakpoint}>
                <TextInput
                    label=""
                    placeholder={text.namePlaceholder.ru}
                    value={newBreakpointName}
                    onChange={(e) => setNewBreakpointName(e.target.value)}
                />
                <TextInput
                    label=""
                    placeholder={text.maxWidthPlaceholder.ru}
                    value={newBreakpointMaxWidth}
                    onChange={(e) => setNewBreakpointMaxWidth(e.target.value)}
                />
                <Button
                    view="action"
                    onClick={handleAddBreakpoint}
                    disabled={!newBreakpointName || !newBreakpointMaxWidth}
                >
                    <Icon size="s">
                        <Plus />
                    </Icon>
                </Button>
            </div>

            <div className={styles.hint}>
                <Text variant="caption">{text.hint.ru}</Text>
            </div>
        </div>
    );
};
