import { FC, useState } from 'react';

import styles from './AddBreakpointForm.module.css';

import { Button, Text, TextInput } from '@/shared/components';
import { Breakpoint } from '@/shared/types/PageConfig';

import { text } from './AddBreakpointForm.localization';

export type AddBreakpointFormProps = {
    namePlaceholder: string;
    maxWidthPlaceholder: string;
    onAddBreakpoint: (breakpoint: Breakpoint) => void;
};

export const AddBreakpointForm: FC<AddBreakpointFormProps> = ({
    namePlaceholder,
    maxWidthPlaceholder,
    onAddBreakpoint,
}) => {
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

        onAddBreakpoint(newBreakpoint);
        setNewBreakpointName('');
        setNewBreakpointMaxWidth('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddBreakpoint();
    };

    return (
        <form className={styles.root} onSubmit={handleSubmit}>
            <Text>{text.addFormTitle.en}</Text>
            <TextInput
                label=""
                placeholder={namePlaceholder}
                value={newBreakpointName}
                onChange={(e) => setNewBreakpointName(e.target.value)}
            />
            <TextInput
                label=""
                placeholder={maxWidthPlaceholder}
                value={newBreakpointMaxWidth}
                onChange={(e) => setNewBreakpointMaxWidth(e.target.value)}
            />
            <div className={styles.buttons}>
                <Button
                    type="submit"
                    view="action"
                    disabled={!newBreakpointName || !newBreakpointMaxWidth}
                >
                    {text.addButtonText.en}
                </Button>
            </div>
        </form>
    );
};
