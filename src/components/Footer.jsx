import styles from "./Footer.module.css";

function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.footerDivider}>
                <span>🜂</span>
                <span>🜄</span>
                <span>🜁</span>
                <span>🜃</span>
            </div>

            <div className={styles.footerContent}>
                <h5>L'Alchimista del Luppolo</h5>
                <p>Malto + Luppolo + Lievito + Tempo = Magia</p>
            </div>
        </footer>
    );
}
export default Footer;