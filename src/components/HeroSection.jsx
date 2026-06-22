import Section from "./Section";
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./HeroSection.module.css";
import { Link } from "react-router";

function HeroSection() {

    return (
        <Section className={styles.heroSection}>
            <Container fluid>
                <Row className="align-items-center">
                    <Col xs={12} lg={7}>
                        <h5 className={styles.heroSubtitle}>Registro della Birra</h5>
                        <h1 className={styles.heroTitle}>Birre leggendarie <br /> create tra mana e malto</h1>
                        <p className={styles.heroDescription}>
                            Birre artigianali selezionate,
                            cronache brassicole e formule
                            degne dei migliori alchimisti.
                        </p>
                        <div className={styles.heroActions}>
                            <Link to="/products" className={styles.buttonAction}>Esplora le Birre </Link>
                            <a href="#new-beers"className={styles.buttonAction}>Nuove Formule</a>
                        </div>
                    </Col>
                    <Col xs={12} lg={5}>
                        <div className={styles.heroSealPanel}>
                            <div className={styles.logoGlow}></div>
                            <img className={styles.heroLogo} src="/imgs/logo.png" alt="logo pagina" />

                        </div>
                    </Col>
                </Row>
            </Container>
        </Section >
    )
}

export default HeroSection;