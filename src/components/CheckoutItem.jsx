import styles from "./CheckoutItem.module.css";
import useCart from "../hooks/useCart";

function CheckoutItem({ cartItem }) {

    const { cartProduct, quantity } = cartItem;

    const {
        addToCart,
        removeFromCart,
        setCartItems
    } = useCart();


    const deleteItem = (slug) => {
        setCartItems(current =>
            current.filter(item => item.cartProduct.slug !== slug)
        );
    };

    return (

        <article className={styles.item}>
            <button
                onClick={() => deleteItem(cartProduct.slug)} className={styles.removeButton}>
                <i className="bi bi-x-lg"></i>
            </button>
            <div className={styles.imageWrapper} >
                <img src={cartProduct.image} alt={cartProduct.name} />
            </div>
            <span className={styles.name}>
                {cartProduct.name}
            </span>
            <span className={styles.brewery} className={styles.brewery}>
                {cartProduct.brewery}
            </span >
            <span className={styles.price} >
                € {cartProduct.price.toFixed(2)}
            </span >
            <div className={styles.quantityControls}>
                <button className={styles.iconButton} onClick={() => removeFromCart(cartProduct)}>-</button>
                <div className={styles.price} >{quantity} </div>
                <button className={styles.iconButton} onClick={() => addToCart(cartProduct)}>+</button>
            </div>
            <span className={styles.totPrice}>
                tot. € {(cartProduct.price * quantity).toFixed(2)}
            </span>

        </article >

    );
}

export default CheckoutItem;