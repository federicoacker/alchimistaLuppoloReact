import { useNavigate } from "react-router";
import { useWishlist } from "../contexts/WishlistContext";
import styles from "./WishlistItem.module.css";
function WishlistItem({ product }) {

    const { removeFromWishlist } = useWishlist();
    const navigate = useNavigate();

    const handleClick = (e) => {
        const id = e.target.id;
        if(id === `remove-${product.slug}`){
            removeFromWishlist(product.slug);
        }
        else {
            navigate(`/products/${product.slug}`);
        }
    }

    return (

        <div onClick={handleClick} className={styles.name}>
            <article className={styles.item}>
                <button
                    className={styles.removeButton}>
                    <i id={`remove-${product.slug}`} className="bi bi-x-lg"></i>
                </button>
                <div className={styles.imageWrapper} >
                    <img src={product.image} alt={product.name} />
                </div>
                {product.name}
                <span className={styles.brewery} className={styles.brewery}>
                    {product.brewery}
                </span >
                <span className={styles.price} >
                    € {product.price.toFixed(2)}
                </span >

            </article >
        </div>

    );
}

export default WishlistItem;