import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './Button.module.scss';

type Props = {
    variant?: 'primary' | 'secondary';
};

type ButtonProps =
    Props &
    ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps =
    Props &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

export const Button = (
    props: ButtonProps | LinkProps
) => {
    const {
        variant = 'primary',
        className,
    } = props;

    const classes = clsx(
        styles.button,
        styles[variant],
        className
    );

    if ('href' in props) {
        return (
            <a
                {...props}
                className={classes}
            />
        );
    }

    return (
        <button
            {...props}
            className={classes}
        />
    );
};