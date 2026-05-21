import { Header } from '../../widgets/header/Header';
import { Hero } from '../../widgets/hero/Hero';
import { Problems } from '../../widgets/problems/Problems';
import { Benefits } from '../../widgets/benefits/Benefits';
import { Steps } from '../../widgets/steps/Steps';
import { RequestForm } from '../../widgets/request-form/RequestForm';
import { Footer } from '../../widgets/footer/Footer';

import styles from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <main className={styles.page}>
            <Header />
            <Hero />
            <Problems />
            <Benefits />
            <Steps />
            <RequestForm />
            <Footer />
        </main>
    );
};