import Section from "../components/Section"
import { Container, Row, Col } from "react-bootstrap";
import styles from "./AboutUs.module.css";
function AboutUs() {
    return (
        <>
            <Section className={`${styles.heroSection}`}>
                <Container fluid className="h-100">
                    <Row className="align-items-center">
                        <Col xs={12} xl={7}>
                            <h5 className={styles.heroSubtitle}>La Nostra Missione</h5>
                            <h1 className={styles.heroTitle}>Ogni birra racconta una storia</h1>
                            <p className={styles.heroDescription}>
                                Ogni ricetta nasce dall'incontro tra acqua, malto, luppolo, lievito e tempo. Cinque ingredienti semplici che, combinati con esperienza e passione, danno vita a centinaia di stili diversi.

                                Noi crediamo che ogni birra meriti di essere compresa, non soltanto bevuta.

                                Per questo è nato L'Alchimista del Luppolo.
                            </p>
                        </Col>
                        <Col xs={12} xl={5}>
                            <div className={styles.heroSealPanel}>
                                <div className={styles.logoGlow}></div>
                                <img className={styles.heroLogo} src="/imgs/logo.png" alt="logo pagina" />

                            </div>
                        </Col>
                    </Row>
                </Container>
            </Section >
            <div className="d-flex flex-wrap">

                <Section className={`${styles.heroSection} ${styles.subHeroSection}`}>
                    <Container fluid className="h-100">
                        <Row className="align-items-center">
                            <Col xs={12} xl={7}>
                                <h5 className={styles.heroSubtitle}>La conoscenza è il nostro ingrediente segreto</h5>
                                <p className={styles.heroDescription}>
                                    Troppo spesso acquistare una birra online significa leggere poche righe descrittive e scegliere quasi alla cieca.

                                    Noi vogliamo offrire qualcosa di diverso.

                                    Per ogni bottiglia raccogliamo informazioni dettagliate sullo stile, sui luppoli utilizzati, sui malti, sui lieviti, sui metodi di fermentazione, sul profilo aromatico e sugli abbinamenti gastronomici.

                                    Perché un appassionato non cerca soltanto una buona birra.

                                    Cerca di capire perché quella birra è speciale.
                                </p>
                            </Col>
                            <Col xs={12} xl={5}>
                                <div className={styles.heroSealPanel}>
                                    <div className={styles.logoGlow}></div>
                                    <img className={styles.heroLogo} src="/imgs/newsLetter.png" alt="logo pagina" />

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Section >
                <Section className={`${styles.heroSection} ${styles.subHeroSection}`}>
                    <Container fluid className="h-100">
                        <Row className="align-items-center">
                            <Col xs={12} xl={7}>
                                <h5 className={styles.heroSubtitle}>La nostra promessa</h5>
                                <p className={styles.heroDescription}>
                                    Ogni etichetta presente nel nostro catalogo viene selezionata con attenzione.

                                    Ogni scheda è pensata per essere ricca, chiara e utile.

                                    Ogni acquisto dovrebbe trasformarsi in una nuova scoperta.

                                    Perché crediamo che la vera magia della birra non sia solo nel bicchiere.

                                    È nella storia che c'è dietro.
                                </p>
                            </Col>
                            <Col xs={12} xl={5}>
                                <div className={styles.heroSealPanel}>
                                    <div className={styles.logoGlow}></div>
                                    <img className={styles.beverageLogo} src="/imgs/degustazione.png" alt="logo pagina" />

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Section >
            </div>
            <div className="d-flex flex-wrap">

                <Section className={`${styles.heroSection} ${styles.subHeroSection}`}>
                    <Container fluid className="h-100">
                        <Row className="align-items-center">
                            <Col xs={12} xl={7}>
                                <h5 className={styles.heroSubtitle}>L'alchimia della fermentazione</h5>
                                <p className={styles.heroDescription}>
                                    Nel nostro laboratorio immaginario gli alambicchi sono sostituiti dai fermentatori e gli antichi grimori da ricettari brassicoli.

                                    Ogni fermentazione è una trasformazione.

                                    Ogni lievito è un catalizzatore.

                                    Ogni luppolo aggiunge una nuova sfumatura alla pozione finale.

                                    È questa magia, fatta di tecnica, pazienza e creatività, che vogliamo raccontare.
                                </p>
                            </Col>
                            <Col xs={12} xl={5}>
                                <div className={styles.heroSealPanel}>
                                    <div className={styles.logoGlow}></div>
                                    <img className={styles.beverageLogo} src="/imgs/beverage.png" alt="logo pagina" />

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Section >
                <Section className={`${styles.heroSection} ${styles.subHeroSection}`}>
                    <Container fluid className="h-100">
                        <Row className="align-items-center">
                            <Col xs={12} xl={7}>
                                <h5 className={styles.heroSubtitle}>Per chi vive la birra come una passione</h5>
                                <p className={styles.heroDescription}>
                                    Che tu stia muovendo i primi passi nel mondo della birra artigianale o che sappia distinguere una fermentazione alta da una bassa al primo sorso, il nostro obiettivo è lo stesso:

                                    offrirti gli strumenti per scegliere con consapevolezza.

                                    Non vogliamo semplicemente vendere birre.

                                    Vogliamo aiutarti a scoprirne di nuove.
                                </p>
                            </Col>
                            <Col xs={12} xl={5}>
                                <div className={styles.heroSealPanel}>
                                    <div className={styles.logoGlow}></div>
                                    <img className={styles.beverageLogo} src="/imgs/about-us-1.png" alt="logo pagina" />

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Section >
            </div>
        </>
    )
}

export default AboutUs