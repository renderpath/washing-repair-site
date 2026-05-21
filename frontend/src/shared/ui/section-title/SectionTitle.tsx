import type { PropsWithChildren } from 'react';

import styles from './SectionTitle.module.scss';

export const SectionTitle = ({ children }: PropsWithChildren) => {
    return <h2 className={styles.title}>{children}</h2>;
};