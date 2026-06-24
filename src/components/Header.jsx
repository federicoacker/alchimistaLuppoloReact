import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css';
import { Link, NavLink } from 'react-router';

function Header() {

    return (
        <>

            <Navbar expand="lg" className={styles.customNavbar} variant="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to="/" className={styles.logoContainer}>
                        <div className={styles.logoGlow}></div>
                        <img src="/imgs/logo-semplice.png" alt="L'Alchimista del Luppolo" className={styles.navbarLogo} />
                    </Navbar.Brand>
                    <div className={styles.iconGroupMobile}>
                        <NavLink to="/wishlist" className={styles.cartIconDesktop}><i className="bi bi-heart"></i></NavLink>
                        <NavLink to="/carrello" className={styles.cartIconMobile}><i className="bi bi-cart3"></i> </NavLink>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink
                                to="/"
                                end
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
                            <NavLink to="/cart" className={styles.cartIconDesktop}><i className="bi bi-cart3"></i></NavLink>
                            <NavLink to="/wishlist" className={styles.cartIconDesktop}><i className="bi bi-heart"></i></NavLink>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Header;