import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './MainLayout.module.css'
import CartOffCanvas from '../components/CartOffCanvas'
import NewsLetterPopup from '../components/NewsLetterPopup'
import Luppolino from '../components/Luppolino'


function MainLayout() {
    
    return (
        <>
            <Header />
            <main className={styles.mainLayout}>
                <NewsLetterPopup/>
                <CartOffCanvas/>
                <Outlet />
            </main>
            <Footer />
            <Luppolino/>
        </>
    )
}

export default MainLayout;