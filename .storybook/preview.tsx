import React from 'react';

import '../src/app/globals.css';
import '../src/app/variables.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/nextjs-vite';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo',
        },

        themes: {
            default: 'system',
            list: [
                { name: 'System', class: 'theme_system', color: '#6366f1' },
                { name: 'Light', class: 'theme_light', color: '#f8fafc' },
                { name: 'Dark', class: 'theme_dark', color: '#0f172a' },
            ],
        },
    },

    decorators: [
        withThemeByClassName({
            themes: {
                system: 'theme_system',
                light: 'theme_light',
                dark: 'theme_dark',
            },
            defaultTheme: 'system',
        }),
        (Story) => (
            <div
                style={{
                    padding: '1rem',
                    background: 'var(--background-main)',
                    color: 'var(--text-color-main)',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export default preview;
