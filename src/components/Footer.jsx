import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router";
import styles from "./Footer.module.css";

function Footer() {

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footerDivider}>
                    <span>🜂</span>
                    <span>🜄</span>
                    <span>🜁</span>
                    <span>🜃</span>
                </div>

                <Row>
                    <Col md={3}>
                        <div className={styles.footerLogoContainer}>
                            <div className={styles.logoGlow}></div>
                            <img src="/imgs/logo.png" alt="L'Alchimista del Luppolo" className={styles.footerLogo} />
                        </div>
                    </Col>

                    <Col md={3} className={styles.footerLink}>
                        <h5>Esplora</h5>
                        <ul>
                            <li> <NavLink to="/products">Birre</NavLink></li>
                            <li><NavLink to="/about-us">La Nostra Missione</NavLink></li>
                            <li> <NavLink to="/news">Le Cronache della Birra</NavLink></li>
                        </ul>
                    </Col>

                    <Col md={3}>
                        <div className={styles.contactInfo}>
                            <h5>Laboratorio</h5>
                            <ul className={styles.contactList}>
                                <li><i className="bi bi-geo-alt-fill"></i>Piazza del Mastro Birraio, 7<br />10122 Torino (TO)</li>
                                <li><i className="bi bi-telephone-fill"></i>+39 011 777 4200</li>
                                <li><i className="bi bi-envelope-fill"></i> info@alchimistadelluppolo.it</li>
                            </ul>
                        </div>
                    </Col>

                    <Col md={3}>
                        <h5 className={styles.social}>Seguici</h5>
                        <div className={styles.socialIcons}>
                            <a  aria-label="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a  aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a  aria-label="Untappd">
                                <i className="bi bi-bookmark-heart"></i>
                            </a>
                        </div>
                    </Col>
                </Row>

                <div className={styles.bottom}>
                    <p className={styles.quote}>
                        "La magia che si beve"
                    </p>

                    <small className={styles.copyright}>
                        © 2026 L'Alchimista del Luppolo
                    </small>
                </div>

            </Container>
        </footer>
    );
}
export default Footer;