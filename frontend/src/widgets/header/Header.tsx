import { FiPhone } from 'react-icons/fi';
import { TbSettingsCog } from 'react-icons/tb';

import { Container } from '@/shared/ui/container/Container';

import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
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

                <a href="tel:+74951234567" className={styles.phone}>
                    <FiPhone />
                    <div>
                        <strong>+7 (495) 123-45-67</strong>
                        <span>Ежедневно с 8:00 до 22:00</span>
                    </div>
                </a>
            </Container>
        </header>
    );
};