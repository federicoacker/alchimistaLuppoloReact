import useCart from "../hooks/useCart"
import Section from "./Section";
import styles from "./CartContainer.module.css";
import CheckoutItem from "./CheckoutItem";

function CartContainer() {
    const { cartItems } = useCart();
    return (
        <Section>
            <h5 className={styles["checkout-title"]}>
                Riepilogo dell'ordine:
            </h5>
            <div >
                {cartItems.map(cartItem => {
                    return (
                        <CheckoutItem
                            key={cartItem.cartProduct.slug}
                            cartItem={cartItem} />
                    )
                })}
            </div>
        </Section>
    )
}

export default CartContainer