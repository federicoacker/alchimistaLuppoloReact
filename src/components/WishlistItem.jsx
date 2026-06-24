import { Link } from "react-router";
import { useWishlist } from "../contexts/WishlistContext";
import styles from "./WishlistItem.module.css";
import { Button } from "react-bootstrap";
import useCart from "../hooks/useCart";
function WishlistItem({ product }) {

    const { removeFromWishlist } = useWishlist();
    const { cartItems, addToCart } = useCart();
    console.log(cartItems);
    return (

        <article className={styles.item}>
            <button
                onClick={() => removeFromWishlist(product.slug)}
                className={styles.removeButton}>
                <i className="bi bi-x-lg"></i>
            </button>
            <div className={styles.imageWrapper} >
                <img src={product.image} alt={product.name} />
            </div>
            <Link to={`/products/${product.slug}`} className={styles.name}>
                {product.name}
            </Link>
            <span className={styles.brewery} className={styles.brewery}>
                {product.brewery}
            </span >
            <span className={styles.price} >
                € {product.price.toFixed(2)}
            </span >

            <Button onClick={()=>{addToCart(product)}} className={`${styles["beer-button"]} ${styles["icon-button"]}`}>
                <i className="bi bi-cart3"></i>
            </Button>

        </article >

    );
}

export default WishlistItem;