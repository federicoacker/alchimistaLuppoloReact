import { Container, Row, Col } from "react-bootstrap";
import styles from "./Newsletter.module.css";
import validateEmail from "../data/validation/validateEmail";
import { useState } from "react";
import { BASE_API_URL } from "../data/apiConstants";

function Newsletter() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const handleChange = (event) => {
        setEmail(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const validatedEmail = validateEmail(email);
        if(!validatedEmail){
            setError("Email non valida");
            return;
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: validatedEmail })
        };

        fetch(`${BASE_API_URL}/mail`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nell'invio dell'email");
                }
                return response.json();
            })
            .then(result=> {
                if(result.result !== null){
                    setEmail("");
                }
            })
            .catch(error => {
                setError(error.message);
            }
            );
    }
    return (
        <Container fluid="lg">
            <h5 className={styles.newsLetterSubtitle}>Unisciti alla gilda</h5>
            <h2 className={styles.newsLetterTitle}>Registrati alla nostra <strong>newsletter</strong> <br />per ricevere le ultime novità</h2>
            <Row className="row-gap-4">
                <Col xs={12} md={12} lg={6} className="d-flex flex-colum justify-content-center">
                    <div className="d-flex justify-content-center align-items-center position-relative">
                        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                            <input value={email} onChange={handleChange} className={styles.newsLetterInput} type="text" placeholder="Inserisci la tua email"></input>
                            {error && <p>C'è stato un errore: {error}</p>}
                            <button className={`${styles.buttonAction} ${styles.newsLetterButton}`}>Iscriviti</button>
                            <div className={styles.logoGlow}></div>
                        </form>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <div className={styles.newsLetterDescriptionBox}>
                        <p className={styles.newsLetterDescription}>
                            Solo entrando a far parte della nostra newsletter
                            riuscirai a mantenerti aggiornato su tutte le novità,
                            le ultime birre uscite e gli ultimi processi di produzione innovativi</p>
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default Newsletter