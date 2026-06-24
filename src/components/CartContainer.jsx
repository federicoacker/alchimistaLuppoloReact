import useCart from "../hooks/useCart"
import BeerCardHorizontal from "./BeerCardHorizontal";
import Section from "./Section";
import styles from "./CartContainer.module.css";

function CartContainer() {
    const { cartItems } = useCart();
    return (
        <Section>
            <h5 className={styles["checkout-title"]}>
                Riepilogo dell'ordine:
            </h5>
            <div className="d-flex flex-column w-100 justify-content-center align-items-center row-gap-2 mb-4 ">
                {cartItems.map(cartItem => {
                    return (
                        <BeerCardHorizontal key={cartItem.cartProduct.slug} product={cartItem.cartProduct} quantity={cartItem.quantity} isCart={false} />
                    )
                })}
            </div>
        </Section>
    )
}

export default CartContainer