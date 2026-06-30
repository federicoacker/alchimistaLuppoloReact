import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './MainLayout.module.css'
import CartOffCanvas from '../components/CartOffCanvas'
import NewsLetterPopup from '../components/NewsLetterPopup'
import Luppolino from '../components/Luppolino'
import { useState } from 'react'


function MainLayout() {
    const [isLuppolinoOpen, setIsLuppolinoOpen] = useState(false);

    return (
        <>
            <Header />
            <main className={styles.mainLayout}>
                <NewsLetterPopup/>
                <CartOffCanvas setIsLuppolinoOpen={setIsLuppolinoOpen}/>
                <Outlet />
            </main>
            <Footer />
            <Luppolino isOpen={isLuppolinoOpen} setIsOpen={setIsLuppolinoOpen}/>
        </>
    )
}

export default MainLayout;