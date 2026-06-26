import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import styles from "./CartProductDisplay.module.css";

function CartProductDisplay({ productItem }) {

    const { addToCart, removeFromCart } = useContext(CartContext);

    const product = productItem.cartProduct;
    const quantity = productItem.quantity;

    const itemTotalPrice = (product.price * quantity).toFixed(2);
    const itemSinglePrice = product.price.toFixed(2);
    return (
        <>
            <h4>{product.name}</h4>
            
            <p>Prezzo singolo: {itemSinglePrice} €</p>

            <div className="cart-buttons-wrapper">
                <button
                    className={styles["btn-quantity-action"]}
                    onClick={() => removeFromCart(product)}
                >
                    -
                </button>
                
                <span className="quantity-display">{quantity}</span>
                
                <button
                    className={styles["btn-quantity-action"]}
                    onClick={() => addToCart(product)}
                >
                    +
                </button>
            </div>

            <p>Totale parziale: {itemTotalPrice} €</p>
        </>
    )
}

export default CartProductDisplay;