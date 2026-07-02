import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Newsletter from "./Newsletter"
import styles from "./NewsLetterPopup.module.css";
import Section from "./Section";

function NewsLetterPopup() {
    const [show, setShow] = useState(false);
    const [visited, setVisited] = useState(localStorage.getItem("hasVisited"));
    const handleClose = () => setShow(false);

    if (!visited) {
        setShow(true);
        localStorage.setItem("hasVisited", true);
        setVisited(true);
    }


    return (
        <>
            <Modal show={show} onHide={handleClose} className={styles["modal"]}>
                <Modal.Header closeButton closeVariant="white" className={styles["modal-header"]}>
                    <Modal.Title className={styles["modal-title"]}>Benvenuto!</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles["modal-body"]}>
                    <Section>
                        <Newsletter handleClose = {handleClose}/>
                    </Section>
                </Modal.Body>
                <Modal.Footer className={styles["modal-footer"]}>
                    <Button variant="secondary" onClick={handleClose} className={styles["close-button"]}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewsLetterPopup