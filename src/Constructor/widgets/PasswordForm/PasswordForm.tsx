'use client';

import {
    FC,
    FormEventHandler,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react';

import styles from './PasswordForm.module.css';

import confirmSessionServerAction from '@/app/actions/sessions/confirm-session';
import createSessionServerAction from '@/app/actions/sessions/create-session';

import { Button, Text, TextInput } from '@/shared/components';
import { SolidLoader } from '@/shared/components/SolidLoader';

import { text } from './PasswordForm.localization';

export type PasswordFormProps = {
    defaultCode?: string; // Дефолтное значение кода авторизации (например, из query параметров)
};

export const PasswordForm: FC<PasswordFormProps> = ({ defaultCode = '' }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState(defaultCode);

    const onButtonClick: MouseEventHandler<HTMLButtonElement> = async (
        event
    ) => {
        event.preventDefault();
        event.stopPropagation();

        setIsLoading(true);

        await createSessionServerAction();

        setIsLoading(false);

        if (inputRef.current) inputRef.current.focus();
    };

    const auth = async (password: string) => {
        setIsLoading(true);

        const confirmResult = await confirmSessionServerAction({ password });

        if (confirmResult?.code === 'ERROR') {
            alert('Incorrect code');
            setIsLoading(false);
        }
    };

    const onSubmitButtonClick: FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();
        event.stopPropagation();

        await auth(password);
    };

    // Если есть default-ный код, то сразу пытаемся авторизоваться
    useEffect(
        () => {
            if (!defaultCode) return;

            auth(defaultCode);
        },
        [defaultCode] //eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <form onSubmit={onSubmitButtonClick} className={styles.root}>
            <SolidLoader isLoading={isLoading} className={styles.inputWrapper}>
                <Text variant="title">{text.authorization.en}</Text>

                <TextInput
                    ref={inputRef}
                    autoFocus
                    value={password}
                    label="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Button fullWidth view="action" type="submit">
                    {text.submit.en}
                </Button>
                <Button
                    fullWidth
                    view="outlined"
                    onClick={onButtonClick}
                    type="button"
                >
                    {text.getAuthCodeButtonText.en}
                </Button>
            </SolidLoader>
        </form>
    );
};
