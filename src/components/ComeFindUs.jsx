import { Container, Row, Col } from "react-bootstrap";
import styles from "./ComeFindUs.module.css";
function ComeFindUs() {
    return (
        <Container fluid="lg">
            <h5 className={styles.comeFindUsSubtitle}>Vieni a trovarci</h5>
            <h2 className={styles.comeFindUsTitle}>Vieni a trovarci alla nostra sede <br /> e vedi dove la <strong>magia</strong> avviene </h2>
            <Row className="row-gap-4">
                <Col xs={12} md={12} lg={6} className="d-flex flex-colum justify-content-center">
                    <img src="/imgs/fakemap.png" className={styles.comeFindUsLogo} />
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <div className={styles.contactInfo}>
                        <h5 className="text-center">Laboratorio</h5>
                        <ul className={styles.contactList}>
                            <li className="text-center"><i className="bi bi-geo-alt-fill"></i>Piazza del Mastro Birraio, 7<br />10122 Torino (TO)</li>
                            <li className="text-center"><i className="bi bi-telephone-fill"></i>+39 011 777 4200</li>
                            <li className="text-center"><i className="bi bi-envelope-fill"></i> info@alchimistadelluppolo.it</li>
                        </ul>
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default ComeFindUs