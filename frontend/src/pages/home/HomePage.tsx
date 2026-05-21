import styles from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <p className={styles.label}>Ремонт стиральных машин</p>

                        <h1 className={styles.title}>
                            Ремонт стиральных машин на дому
                        </h1>

                        <p className={styles.text}>
                            Быстро, качественно и с гарантией до 2 лет на все виды работ
                        </p>

                        <div className={styles.actions}>
                            <a href="tel:+74951234567" className={styles.primaryButton}>
                                Позвонить
                            </a>

                            <a href="#request" className={styles.secondaryButton}>
                                Написать
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};