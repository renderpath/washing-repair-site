import { TbSettingsCog } from 'react-icons/tb';

import { Container } from '../../shared/ui/container/Container';

import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <TbSettingsCog />
                    </div>

                    <div>
                        <strong>Ремонт стиральных машин</strong>
                        <span>Частный мастер</span>
                    </div>
                </div>

                <p>© 2026 Все права защищены.</p>
            </Container>
        </footer>
    );
};