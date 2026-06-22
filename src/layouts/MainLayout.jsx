import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './MainLayout.module.css'


function MainLayout() {

    return (
        <>
            <Header />
            <main className={styles.mainLayout}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout;