import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './Button';

const meta: Meta<typeof Button> = {
    title: 'Shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        view: {
            control: 'select',
            options: [
                'action',
                'success',
                'flat',
                'flat-danger',
                'flat-action',
                'flat-success',
                'default',
                'danger',
                'outlined',
                'outlined-danger',
                'outlined-success',
            ],
        },
        textAlign: {
            control: 'select',
            options: ['left', 'center'],
        },
        children: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Button',
        view: 'default',
    },
};

export const Action: Story = {
    args: {
        children: 'Action Button',
        view: 'action',
    },
};

export const Success: Story = {
    args: {
        children: 'Success Button',
        view: 'success',
    },
};

export const Danger: Story = {
    args: {
        children: 'Danger Button',
        view: 'danger',
    },
};

export const Flat: Story = {
    args: {
        children: 'Flat Button',
        view: 'flat',
    },
};

export const Outlined: Story = {
    args: {
        children: 'Outlined Button',
        view: 'outlined',
    },
};

export const FullWidth: Story = {
    args: {
        children: 'Full Width Button',
        view: 'action',
        fullWidth: true,
    },
    decorators: [
        (Story: React.ComponentType) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Disabled: Story = {
    args: {
        children: 'Disabled Button',
        view: 'action',
        disabled: true,
    },
};

export const WithHref: Story = {
    args: {
        children: 'Navigate to /edit',
        view: 'action',
        href: '/edit',
    },
};

export const WithHrefBlank: Story = {
    args: {
        children: 'Open in new tab',
        view: 'outlined',
        href: 'https://example.com',
        target: '_blank',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '200px',
            }}
        >
            <Button view="default">Default</Button>
            <Button view="action">Action</Button>
            <Button view="success">Success</Button>
            <Button view="danger">Danger</Button>
            <Button view="outlined">Outlined</Button>
            <Button view="outlined-success">Outlined Success</Button>
            <Button view="outlined-danger">Outlined Danger</Button>
            <Button view="flat">Flat</Button>
            <Button view="flat-action">Flat Action</Button>
            <Button view="flat-success">Flat Success</Button>
            <Button view="flat-danger">Flat Danger</Button>
        </div>
    ),
};
