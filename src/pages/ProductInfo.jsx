import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./ProductInfo.module.css";

function ProductInfo() {
    const { slug } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:3000/products/${slug}`);
                const data = await response.json();

                console.log(data.result);

                setProduct(data.result);
            } catch (error) {
                console.error("Errore nel recupero del prodotto:", error);
            }
        }

        fetchProduct();
    }, [slug]);

    if (!product) {
        return null;
    }

    return (
        <div className={styles.productInfo}>
            <div className={styles.productImageBox}>
                <img
                    className={styles.productImage}
                    src={`http://localhost:3000/imgs/${product.image.split("/").pop()}`}
                    alt={product.name}
                />
            </div>

            <div className={styles.productContent}>
                <h5 className={styles.productSubtitle}>Scheda alchemica</h5>

                <h1 className={styles.productTitle}>{product.name}</h1>

                <h3 className={styles.productShortDescription}>
                    {product.short_description}
                </h3>

                <p className={styles.productDescription}>
                    {product.description}
                </p>

                <p className={styles.price}>
                    € {Number(product.price).toFixed(2)}
                </p>

                <div className={styles.productDetails}>
                    <p><strong>Origine:</strong> {product.origin}</p>
                    <p><strong>Birrificio:</strong> {product.brewery}</p>
                    <p><strong>Tipologia:</strong> {product.subtype}</p>
                    <p><strong>Colore:</strong> {product.colour}</p>
                    <p><strong>Gradazione:</strong> {product.abv}%</p>
                    <p><strong>IBU:</strong> {product.ibu}</p>
                    <p><strong>Temperatura:</strong> {product.serving_temp}</p>
                    <p><strong>Formato:</strong> {product.size}</p>
                    <p><strong>Bicchiere:</strong> {product.suggested_glass}</p>
                    <p><strong>Ingredienti:</strong> {product.ingredients}</p>
                    <p><strong>Abbinamenti:</strong> {product.pairs_with}</p>
                </div>

                <button className={styles.buttonAction}>
                    Aggiungi al carrello
                </button>
            </div>
        </div>
    );
}
export default ProductInfo;