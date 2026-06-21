import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './Header.module.css';
import { useState } from 'react';

function Header() {
    const [active, setActive] = useState("home");

    return (
        <>

            <Navbar expand="lg" className={styles.customNavbar} variant="dark">
                <Container>
                    <Navbar.Brand href="/" className={styles.logoContainer}>
                        <div className={styles.logoGlow}></div>
                        <img src="/imgs/logo-semplice.png" alt="L'Alchimista del Luppolo" className={styles.navbarLogo} />
                    </Navbar.Brand>
                    <a href="/carrello" className={styles.cartIconMobile}><i className="bi bi-cart3"></i> </a>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home"
                                active={active === "home"}
                                className={active === "home" ? styles.activeLink : ''} onClick={() => setActive("home")}>
                                Home</Nav.Link>
                            <Nav.Link href="#birre" active={active === "birre"}
                                className={active === "birre" ? styles.activeLink : ''} onClick={() => setActive("birre")}>
                                Birre</Nav.Link>
                            <Nav.Link href="#novità" active={active === "novità"}
                                className={active === "novità" ? styles.activeLink : ''} onClick={() => setActive("novità")}>
                                Novità</Nav.Link>
                            <Nav.Link href='#contatti' active={active === "contatti"}
                                className={active === "contatti" ? styles.activeLink : ''} onClick={() => setActive("contatti")}>
                                Contatti</Nav.Link>
                        </Nav>
                        <a href="/carrello" className={styles.cartIconDesktop}><i className="bi bi-cart3"></i></a>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Header;