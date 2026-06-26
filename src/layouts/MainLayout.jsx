import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './MainLayout.module.css'
import CartOffCanvas from '../components/CartOffCanvas'
import NewsLetterPopup from '../components/NewsLetterPopup'


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
        </>
    )
}

export default MainLayout;