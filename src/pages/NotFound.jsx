import { Link } from "react-router";
import styles from "./NotFound.module.css";

function NotFound() {
    return (
        <main className={styles.notFound}>
            <div className={styles.backgroundLogo}></div>
            <div className="container text-center">
                <div className={styles.symbols}>☉ ✦ △ ✦ ☽</div>
                <h1 className={styles.code}>404</h1>
                <h2 className={styles.title}>Pagina Non Trovata</h2>
                <p className={styles.text}>
                    Anche il miglior alchimista ogni tanto perde una ricetta. Questa pagina non è stata trovata
                </p>
                <Link to="/" className={styles.button}> Torna alla Home </Link>
            </div>
        </main>
    );
}

export default NotFound;