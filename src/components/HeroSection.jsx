import Section from "./Section";
import { Container, Row, Col, Button} from 'react-bootstrap'
function HeroSection() {

    return (
        <Section className="hero-section">
            <Row className="align-items-center">
                <Col md={7}>
                    <h5>registro della birra</h5>
                    <h1>Birre leggendarie tra mana e malto</h1>
                    <Button variant="warning">Esplora le nostre birre</Button>
                    <Button variant="danger">Scopri le nuove Birre</Button>
                </Col>
                <Col md={5}>
                    <div className="hero-seal-panel">
                        <div className="hero-seal-circle"></div>
                        <img  className = "img-fluid" src="/imgs/logo.png" alt="logo pagina" />
                        <p className="hero-seal-caption">
                            Sigillo autorizzato dei cantinieri arcani del vecchio ponte
                        </p>
                    </div>
                </Col>
            </Row>
        </Section>
    )
}

export default HeroSection;