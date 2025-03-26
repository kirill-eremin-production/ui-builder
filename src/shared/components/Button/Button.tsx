import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    MouseEventHandler,
    forwardRef,
} from 'react';

import cn from 'classnames';
import { useRouter } from 'next/navigation';

import styles from './Button.module.css';

type NativeButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export type ButtonProps = {
    view:
        | 'action'
        | 'success'
        | 'flat'
        | 'flat-danger'
        | 'flat-action'
        | 'flat-success'
        | 'default'
        | 'danger'
        | 'outlined'
        | 'outlined-danger'
        | 'outlined-success';
    isIcon?: boolean;
    fullWidth?: boolean;
    withEllipsis?: boolean;
    textAlign?: 'left' | 'center';
    withoutAnimation?: boolean;
    noPaddings?: boolean;
    href?: string;
    target?: '_blank';
} & Omit<NativeButtonProps, 'className'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            view = 'default',
            fullWidth,
            isIcon,
            withEllipsis,
            textAlign,
            withoutAnimation,
            noPaddings,
            href,
            target,
            ...props
        },
        ref
    ) => {
        const router = useRouter();

        const classNames = cn(styles.root, {
            [styles.action]: view === 'action',
            [styles.success]: view === 'success',
            [styles.flat]: view === 'flat',
            [styles.flatDanger]: view === 'flat-danger',
            [styles.flatAction]: view === 'flat-action',
            [styles.flatSuccess]: view === 'flat-success',
            [styles.default]: view === 'default',
            [styles.danger]: view === 'danger',
            [styles.outlined]: view === 'outlined',
            [styles.outlinedDanger]: view === 'outlined-danger',
            [styles.outlinedSuccess]: view === 'outlined-success',
            [styles.iconButton]: isIcon,
            [styles.fullWidth]: fullWidth,
            [styles.withEllipsis]: withEllipsis,
            [styles[`textAlign_${textAlign}`]]: textAlign,
            [styles.withoutAnimation]: withoutAnimation,
            [styles.noPaddings]: noPaddings,
        });

        const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
            if (href) {
                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    target === '_blank'
                ) {
                    return window.open(href, '_blank');
                }

                return router.push(href);
            }

            if (props.onClick) {
                return props.onClick(event);
            }
        };

        return (
            <button
                ref={ref}
                {...props}
                onClick={onClick}
                className={classNames}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
