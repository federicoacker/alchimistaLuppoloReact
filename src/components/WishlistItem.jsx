import { Link } from "react-router";
import { useWishlist } from "../contexts/WishlistContext";
import styles from "./WishlistItem.module.css";
import { NavLink } from 'react-router';

function WishlistItem({ product }) {

    const { removeFromWishlist } = useWishlist();

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
             <span className={styles.brewery} className={styles.name}>
                {product.brewery}
            </span >
            <span className={styles.price} >
                € {product.price.toFixed(2)}
            </span >

            <NavLink to="/cart" className={styles.actions}>
                <i className="bi bi-cart3"></i>
            </NavLink>

        </article >

    );
}

export default WishlistItem;