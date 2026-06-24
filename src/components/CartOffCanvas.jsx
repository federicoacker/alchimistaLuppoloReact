
import useCart from "../hooks/useCart"
import { Offcanvas } from "react-bootstrap";
import Section from "./Section";
import BeerCardHorizontal from "./BeerCardHorizontal";
import styles from "./CartOffCanvas.module.css";


function CartOffCanvas() {
    const { cartItems, show, handleClose } = useCart();
    console.log(cartItems);
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className={styles["cart-offcanvas"]}>
            <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title className={styles["cart-title"]}>Carrello</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Section className={styles["cart-section"]}>
                    <div className="d-flex flex-column">
                        {cartItems.map((cartItem) => {
                            return <BeerCardHorizontal key={cartItem.cartProduct.slug} product={cartItem.cartProduct} quantity={cartItem.quantity} />
                        })}
                    </div>
                </Section>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default CartOffCanvas