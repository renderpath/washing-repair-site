import { FiPhone, FiSearch, FiShield } from 'react-icons/fi';
import { FaCarSide } from 'react-icons/fa';
import { TbTool } from 'react-icons/tb';

import { Container } from '../../shared/ui/container/Container';
import { SectionTitle } from '../../shared/ui/section-title/SectionTitle';

import styles from './Steps.module.scss';

const steps = [
    {
        icon: <FiPhone />,
        title: 'Вы звоните или оставляете заявку',
        text: 'Рассказываете о проблеме',
    },
    {
        icon: <FaCarSide />,
        title: 'Я приезжаю',
        text: 'В удобное для вас время',
    },
    {
        icon: <FiSearch />,
        title: 'Диагностика',
        text: 'Бесплатно ищу причину поломки',
    },
    {
        icon: <TbTool />,
        title: 'Ремонт',
        text: 'С вашего согласия устраняю неисправность',
    },
    {
        icon: <FiShield />,
        title: 'Проверка и гарантия',
        text: 'Проверяю работу и даю гарантию до 2 лет',
    },
];

export const Steps = () => {
    return (
        <section className={styles.steps}>
            <Container>
                <SectionTitle>Как я работаю</SectionTitle>

                <div className={styles.grid}>
                    {steps.map((item, index) => (
                        <div className={styles.step} key={item.title}>
                            <span className={styles.number}>{index + 1}</span>
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