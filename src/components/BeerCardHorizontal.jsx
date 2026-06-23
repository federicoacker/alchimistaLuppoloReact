import { Button } from "react-bootstrap";
import { Link } from "react-router";
import styles from "./BeerCardHorizontal.module.css";

function BeerCardHorizontal({ product }) {
    return (
        <div className={styles["beer-card"]}>
            <div className="d-flex w-100 flex-wrap">
                <div className={styles["beer-card-title"]}>
                    <h5>{product.name}</h5>
                </div>
                <div className={styles["beer-card-details"]}>
                    <p className={styles["beer-card-text"]}>ABV: {product.abv.toFixed(2)}%</p>
                    <p className={styles["beer-card-text"]}>Prezzo: {product.price.toFixed(2).replace(".", ",")} &euro;</p>
                    <p className={styles["beer-card-text"]}>IBU: {product.ibu}</p>
                </div>
                <div className={`d-flex gap-4 justify-content-center ${styles["beer-card-buttons"]}`}>
                    <Button className={styles["beer-button"]}>Ordina</Button>
                    <Link to={`/products/${product.slug}`} className={`btn ${styles["beer-button"]} d-flex flex-column justify-content-center`}>Dettagli</Link>
                </div>

            </div>
        </div>
    )
}

export default BeerCardHorizontal