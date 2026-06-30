import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css';
import { NavLink } from 'react-router';
import useCart from '../hooks/useCart';


function Header() {
    const { handleShow, cartItems } = useCart();
    const quantity = cartItems.reduce((acc, current) => {
        const currentQuantity = current.quantity;
        acc += currentQuantity;
        return acc;
    }, 0);
    return (
        <header className={styles.sticky}>

            <Navbar expand="xl" className={styles.customNavbar} variant="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to="/#hero" className={styles.logoContainer}>
                        <div className={styles.logoGlow}></div>
                        <img src="/imgs/logo-semplice.png" alt="L'Alchimista del Luppolo" className={styles.navbarLogo} />
                    </Navbar.Brand>
                    <div className={styles.iconGroupMobile}>
                        <NavLink to="/wishlist" className={styles.cartIconDesktop}><i className="bi bi-heart"></i></NavLink>
                        <button onClick={handleShow} className={styles.cartIconDesktop}>
                            {cartItems.length > 0 && (<label className={styles["cart-item-label"]}> {quantity} </label>)}
                            <i className="bi bi-cart3"></i>
                        </button>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink
                                to="/"
                                end
                                onClick={() => {
                                    document.documentElement.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Home
                            </NavLink>
                            <span className={styles.alchemySeparator}> ✦</span>

                            <NavLink
                                to="/products"
                                end
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Birre
                            </NavLink>
                            <span className={styles.alchemySeparator}> ✦</span>

                            <NavLink
                                to="/news"
                                end
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Le Cronache Della Birra
                            </NavLink>
                            <span className={styles.alchemySeparator}> ✦</span>

                            <NavLink
                                to="/contacts"
                                end
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Contatti
                            </NavLink>
                            <span className={styles.alchemySeparator}> ✦</span>

                            <NavLink
                                to="/about-us"
                                end
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                La nostra missione
                            </NavLink>


                        </Nav>
                        <div className={styles.iconGroupDesktop}>
                            <NavLink to="/wishlist" className={styles.cartIconDesktop}><i className="bi bi-heart"></i></NavLink>
                            <button onClick={handleShow} className={styles.cartIconDesktop}>
                                {cartItems.length > 0 && <label className={styles["cart-item-label"]}>{quantity}</label>}
                                <i className="bi bi-cart3"></i>
                            </button>

                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header;