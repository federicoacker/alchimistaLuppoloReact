import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import styles from "./AboutUsSection.module.css";
import Section from "./Section";
function AboutUsSection() {
    return (
        <Section className={styles["heroSection"]}>
            <Container fluid>
                <Row className="align-items-center">
                    <Col xs={12} lg={7}>
                        <h5 className={styles.heroSubtitle}>La nostra missione</h5>
                        <h1 className={styles.heroTitle}>Una passione che nasce <br /> dalla tradizione</h1>
                        <p className={styles.heroDescription}>
                            La nostra passione per le birre artigianali
                            è ancorata alla tradizione. Vieni a scoprire di più
                            sulla nostra missione
                        </p>
                        <div className={styles.heroActions}>
                            <Link to="/birre" className={styles.buttonAction}>
                                <i className="bi bi-search"></i> Scopri di più
                            </Link>
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
        </Section>
    )
}

export default AboutUsSection