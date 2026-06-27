import { Link, useSearchParams } from "react-router";
import styles from "./PaymentSuccess.module.css";

function PaymentSuccess() {
    const [searchParams] = useSearchParams();

    const redirectStatus = searchParams.get("redirect_status");

    if (!redirectStatus) {
        return (
            <section className={styles.paymentSuccessPage}>
                <div className={styles.successCard}>
                    <div className={styles.symbol}>
                        !
                    </div>

                    <h5 className={styles.subtitle}>Accesso non valido</h5>

                    <h1 className={styles.title}>
                        Nessun pagamento trovato
                    </h1>

                    <p className={styles.description}>
                        Non abbiamo trovato nessun ordine da riepilogare.
                    </p>

                    <Link to="/products" className={styles.buttonAction}>
                        Torna alle birre
                    </Link>
                </div>
            </section>
        );
    }

    if (redirectStatus !== "succeeded") {
        return (
            <section className={styles.paymentSuccessPage}>
                <div className={styles.successCard}>
                    <div className={styles.symbol}>
                        !
                    </div>

                    <h5 className={styles.subtitle}>Pagamento non completato</h5>

                    <h1 className={styles.title}>
                        Ordine non confermato
                    </h1>

                    <p className={styles.description}>
                        Il pagamento non risulta completato.
                    </p>

                    <Link to="/checkout" className={styles.buttonAction}>
                        Torna al checkout
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.paymentSuccessPage}>
            <div className={styles.successCard}>
                <div className={styles.symbol}>
                    &#10004;
                </div>

                <h5 className={styles.subtitle}>Resoconto ordine</h5>

                <h1 className={styles.title}>
                    Pagamento completato
                </h1>

                <p className={styles.description}>
                    Grazie per il tuo ordine. Il pagamento è andato a buon fine.
                </p>

                <div className={styles.infoBox}>
                    <p>
                        <strong>Stato pagamento:</strong> Completato
                    </p>
                </div>

                <Link to="/" className={styles.buttonAction}>
                    Torna alla home
                </Link>
            </div>
        </section>
    );
}

export default PaymentSuccess;