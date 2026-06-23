import { Link } from "react-router";
import { useWishlist } from "../contexts/WishlistContext";
import styles from "./WishlistItem.module.css";

function WishlistItem({ product }) {

    const { removeFromWishlist } = useWishlist();

    return (

        <article className={styles.item}>

            <button
                onClick={() => removeFromWishlist(product.slug)}
                className={styles.removeButton}>
                <i className="bi bi-x-lg"></i>
            </button>

            <div className={styles.productInfo}>
                <div className={styles.imageWrapper}>
                    <img src={product.image} alt={product.name} />
                </div>
                <div>
                    <Link to={`/products/${product.slug}`}>
                        {product.name}
                    </Link>
                </div>
            </div>

            <div className={styles.price}>
                € {product.price.toFixed(2)}
            </div>

            <div className={styles.actions}>
                <button>
                    <i className="bi bi-cart-fill"></i>
                </button>
            </div>
        </article>

    );
}

export default WishlistItem;