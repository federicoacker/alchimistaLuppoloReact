import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import styles from "./CartProductDisplay.module.css";
import Section from "./Section";

function CartProductDisplay({ productItem }) {

    const { addToCart, removeFromCart } = useContext(CartContext);

    const product = productItem.cartProduct;
    const quantity = productItem.quantity;

    const itemTotalPrice = (product.price * quantity).toFixed(2).replace(".", ",");
    const itemSinglePrice = product.price.toFixed(2).replace(".", ",");
    
    return (
        <Section className={styles["product-cart"]}>
            <div className="d-flex">
                <h4 className={styles["color-title"]}>{product.name}</h4>
                <div className={styles["button-wrapper"]}>
                    <button
                        className={styles["btn-quantity-action"]}
                        onClick={() => removeFromCart(product)}
                    >
                        -
                    </button>

                    <span className={styles["quantity-display"]}>{quantity}</span>

                    <button
                        className={styles["btn-quantity-action"]}
                        onClick={() => addToCart(product)}
                    >
                        +
                    </button>
                </div>

            </div>
            <div className={styles["price-wrapper"]}>
                <table className={styles["price-table"]}>
                    <tbody>
                        <tr>
                            <td className={`${styles["color-text"]} ${styles["table-main-row"]}`}>Prezzo Singolo:</td>
                            <td className={styles["color-text"]}> {itemSinglePrice} &euro;</td>
                        </tr>
                        <tr>
                            <td className={`${styles["color-text"]} ${styles["table-main-row"]}`}>Totale Parziale:</td>
                            <td className={`${styles["color-text"]} ${styles["main-price"]}`}> {itemTotalPrice} &euro;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    )
}

export default CartProductDisplay;