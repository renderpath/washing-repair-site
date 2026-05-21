import { FiClock, FiShield, FiUser, FiAward } from 'react-icons/fi';
import { BsWallet2 } from 'react-icons/bs';

import { Container } from '../../shared/ui/container/Container';
import { SectionTitle } from '../../shared/ui/section-title/SectionTitle';

import styles from './Benefits.module.scss';

const benefits = [
    {
        icon: <FiUser />,
        title: 'Частный мастер',
        text: 'Работаю один, без посредников',
    },
    {
        icon: <FiShield />,
        title: 'Опыт и профессионализм',
        text: 'Более 7 лет опыта в ремонте',
    },
    {
        icon: <BsWallet2 />,
        title: 'Честные цены',
        text: 'Стоимость работ согласовывается заранее',
    },
    {
        icon: <FiClock />,
        title: 'Быстрый выезд',
        text: 'Приезжаю в удобное для вас время',
    },
    {
        icon: <FiAward />,
        title: 'Гарантия до 2 лет',
        text: 'На запчасти и все виды работ',
    },
];

export const Benefits = () => {
    return (
        <section className={styles.benefits}>
            <Container>
                <SectionTitle>Почему выбирают меня</SectionTitle>

                <div className={styles.grid}>
                    {benefits.map((item) => (
                        <div className={styles.card} key={item.title}>
                            <div className={styles.icon}>{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};