
import { useParams } from "react-router";
import styles from "./ProductInfo.module.css";
import useProduct from "../hooks/useProduct";
import useCart from "../hooks/useCart";
import { useWishlist } from "../contexts/WishlistContext.jsx";
import { Navigate } from "react-router";

function ProductInfo() {
    const { slug } = useParams();

    const { product, loading, error } = useProduct(slug);
    const { cartItems, addToCart, removeFromCart } = useCart();
    const thisItem = cartItems.find(cartItem => cartItem.cartProduct.slug === product.slug);
    const { toggleWishlist, isInWishlist } = useWishlist();
    const favorite = isInWishlist(product.slug);

    if (error) {
        return <Navigate to="/404" />
    }
    return (
        !loading && !error &&
        <div className={styles.productInfo}>
            <div className={styles.productImageBox}>
                <img
                    className={styles.productImage}
                    src={product.image}
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
                    &euro; {Number(product.price).toFixed(2).replace(".", ",")}
                </p>

                <div className={styles.productDetails}>
                    <p><strong>Origine:</strong> {product.origin}</p>
                    <p><strong>Birrificio:</strong> {product.brewery}</p>
                    <p><strong>Tipologia:</strong> {product.subtype}</p>
                    <p className={styles.colour}><strong>Colore:</strong> {product.colour}</p>
                    <p><strong>Gradazione:</strong> {product.abv}%</p>
                    <p><strong>IBU:</strong> {product.ibu}</p>
                    <p><strong>Temperatura:</strong> {product.serving_temp}</p>
                    <p><strong>Formato:</strong> {product.size}cl</p>
                    <p><strong>Bicchiere:</strong> {product.suggested_glass}</p>
                    <p><strong>Ingredienti:</strong> {product.ingredients}</p>
                    <p><strong>Abbinamenti:</strong> {product.pairs_with}</p>
                </div>
                <div className={`d-flex gap-4 ${styles["button-container"]}`}>
                    <button className={styles.buttonWishlist}
                        onClick={() => toggleWishlist(product.slug)}>
                        {favorite ? (<i className="bi bi-heart-fill"></i>)
                            : (<i className="bi bi-heart"></i>)}
                    </button>
                    {
                        thisItem ? <div className={styles["button-wrapper"]}>
                            <button
                                className={styles["btn-quantity-action"]}
                                onClick={() => removeFromCart(product)}
                            >
                                -
                            </button>

                            <span className={styles["quantity-display"]}>{thisItem.quantity}</span>

                            <button
                                className={styles["btn-quantity-action"]}
                                onClick={() => addToCart(product)}
                            >
                                +
                            </button>
                        </div> :
                            <button className={styles.buttonAction} onClick={() => addToCart(product)}>
                                Aggiungi al carrello
                            </button>
                    }
                </div>
            </div>
        </div>
    );
}
export default ProductInfo;