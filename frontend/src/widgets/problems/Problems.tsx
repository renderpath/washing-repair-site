import {
    FiDroplet,
    FiPower,
    FiSettings,
    FiThermometer,
} from 'react-icons/fi';
import { MdOutlineVibration } from 'react-icons/md';
import { PiWashingMachine } from 'react-icons/pi';

import { Container } from '@/shared/ui/container/Container';
import { SectionTitle } from '../../shared/ui/section-title/SectionTitle';

import styles from './Problems.module.scss';

const problems = [
    {
        icon: <FiPower />,
        title: 'Не включается',
    },
    {
        icon: <FiDroplet />,
        title: 'Не сливает воду',
    },
    {
        icon: <MdOutlineVibration />,
        title: 'Сильно шумит и вибрирует',
    },
    {
        icon: <FiThermometer />,
        title: 'Не греет воду',
    },
    {
        icon: <PiWashingMachine />,
        title: 'Не отжимает',
    },
    {
        icon: <FiSettings />,
        title: 'Другие неисправности',
    },
];

export const Problems = () => {
    return (
        <section className={styles.problems}>
            <Container>
                <SectionTitle>
                    Какие поломки я устраняю
                </SectionTitle>

                <div className={styles.grid}>
                    {problems.map((item) => (
                        <div className={styles.card} key={item.title}>
                            <div className={styles.icon}>
                                {item.icon}
                            </div>
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>

                <p className={styles.text}>
                    Ремонтирую стиральные машины любых марок и моделей.
                </p>
            </Container>
        </section>
    );
};