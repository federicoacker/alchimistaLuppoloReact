import { Button } from "react-bootstrap";
import { Link } from "react-router";
import styles from "./BeerCardHorizontal.module.css";
import { useWishlist } from "../contexts/WishlistContext";
import useCart from "../hooks/useCart";

function BeerCardHorizontal({ product, quantity, isCart = false }) {
    const {
        toggleWishlist,
        isInWishlist
    } = useWishlist();
    const favorite = isInWishlist(product.slug);
    const { addToCart, removeFromCart } = useCart();

    return (
        <div className="d-flex">
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
                    {!quantity &&
                        <div className={`d-flex gap-4 justify-content-center ${styles["beer-card-buttons"]}`}>
                            <Button className={`${styles["icon-button"]} ${styles["beer-button"]} `} onClick={() => { addToCart(product) }}><i className="bi bi-cart-fill"></i></Button>
                            <Button className={`${styles["icon-button"]} ${styles["beer-button"]} `}
                                onClick={() => toggleWishlist(product.slug)}>
                                {favorite ? (<i className="bi bi-heart-fill"></i>)
                                    : (<i className="bi bi-heart"></i>)}
                            </Button>
                            <Link to={`/products/${product.slug}`} className={`btn ${styles["beer-button"]} ${styles["text-button"]}`}>Dettagli</Link>
                        </div>
                    }
                    {quantity && 
                        <div className="d-flex align-items-center justify-content-center w-100">
                            <button onClick={()=>{removeFromCart(product)}} className={`${styles["icon-button"]} ${styles["beer-button"]} `}>
                                <i className="bi bi-dash-circle"></i>
                            </button>
                            <h5 className={styles[`quantity-text`]}>
                                {quantity}
                            </h5>
                            <button onClick={()=>{addToCart(product)}} className={`${styles["icon-button"]} ${styles["beer-button"]} `}>
                                <i className="bi bi-plus-circle"></i>
                            </button>
                        </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default BeerCardHorizontal