import {Container, Row, Col} from "react-bootstrap";
import styles from "./ComeFindUs.module.css";
function ComeFindUs() {
    return (
        <Container fluid="lg">
            <h5 className={styles.comeFindUsSubtitle}>Vieni a trovarci</h5>
            <h2 className={styles.comeFindUsTitle}>Vieni a trovarci alla nostra sede <br /> e vedi dove la <strong>magia</strong> avviene </h2>
            <Row className="row-gap-4">
                <Col xs={12} md={12} lg={6} className="d-flex flex-colum justify-content-center">
                <img src="/public/imgs/fakemap.png" className={styles.comeFindUsLogo}/>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <div className={styles.comeFindUsDescriptionBox}>
                        <p className={styles.comeFindUsDescripion}>
                            Telefono: +39 011 777 4200<br/>
                            Email: info@alchimistadelluppolo.it<br/>
                            Indirizzo: Piazza del Mastro Birraio, 7<br/>
                            Città: Torino 10122 (To)
                        </p>
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default ComeFindUs