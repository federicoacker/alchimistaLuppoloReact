import { Button } from "react-bootstrap";
import { Link } from "react-router";
import styles from "./BeerCardHorizontal.module.css";
import { useWishlist } from "../contexts/WishlistContext";
import useCart from "../hooks/useCart";

function BeerCardHorizontal({ product }) {
    const {
        toggleWishlist,
        isInWishlist
    } = useWishlist();
    const favorite = isInWishlist(product.slug);
    const { cartItems, addToCart, removeFromCart } = useCart();
    const thisItem = cartItems.find(cartItem => cartItem.cartProduct.slug === product.slug);

    return (
        <div className="d-flex w-100 justify-content-center">
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
                                    <Button className={`${styles["icon-button"]} ${styles["beer-button"]} `} onClick={() => { addToCart(product) }}><i className="bi bi-cart-fill"></i></Button>
                            }
                        <Button className={`${styles["icon-button"]} ${styles["beer-button"]} `}
                            onClick={() => toggleWishlist(product.slug)}>
                            {favorite ? (<i className="bi bi-heart-fill"></i>)
                                : (<i className="bi bi-heart"></i>)}
                        </Button>
                        <Link to={`/products/${product.slug}`} className={`btn ${styles["beer-button"]} ${styles["text-button"]}`}>Dettagli</Link>
                    </div>



                </div>
            </div>

        </div>
    )
}

export default BeerCardHorizontal