import {
    FiClock,
    FiShield,
    FiPhone,
    FiMessageCircle,
} from 'react-icons/fi';
import { TbRosetteDiscountCheck } from 'react-icons/tb';

import { Button } from '@/shared/ui/button/Button';
import { Container } from '@/shared/ui/container/Container';

import styles from './Hero.module.scss';

const benefits = [
    {
        icon: <FiClock />,
        text: 'Выезд и диагностика — бесплатно',
    },
    {
        icon: <TbRosetteDiscountCheck />,
        text: 'Ремонт в день обращения',
    },
    {
        icon: <FiShield />,
        text: 'Гарантия до 2 лет',
    },
    {
        icon: <TbRosetteDiscountCheck />,
        text: 'Честные цены без переплат',
    },
];

export const Hero = () => {
    return (
        <section className={styles.hero}>
            <Container>
                <div className={styles.content}>
                    <h1>Ремонт стиральных машин на дому</h1>

                    <p>
                        Быстро, качественно и с гарантией до 2 лет на все виды работ
                    </p>

                    <ul>
                        {benefits.map((item) => (
                            <li key={item.text}>
                                <span>{item.icon}</span>
                                {item.text}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.actions}>
                        <Button href="tel:+74951234567">
                            <FiPhone />
                            Позвонить
                        </Button>

                        <Button href="#request" variant="secondary">
                            <FiMessageCircle />
                            Написать
                        </Button>
                    </div>
                </div>

                <div className={styles.image}>
                    <img
                        src="/images/master.png"
                        alt="Мастер ремонтирует стиральную машину"
                    />
                </div>
            </Container>
        </section>
    );
};