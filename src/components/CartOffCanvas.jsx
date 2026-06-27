
import useCart from "../hooks/useCart"
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router";
import styles from "./CartOffCanvas.module.css";
import CartProductDisplay from "./CartProductDisplay";


function CartOffCanvas() {
    const { cartItems, show, handleClose, productsPrice, shippingPrice, totalPrice } = useCart();

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className={`${styles["cart-offcanvas"]} ${styles["section-frame"]}`}>
            <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title className={styles["cart-title"]}>Carrello</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <section className={styles["cart-section"]}>
                    <div className="d-flex flex-column">
                        {cartItems.map((cartItem) => {
                            return <CartProductDisplay key={cartItem.cartProduct.slug} productItem={cartItem} />
                        })}
                    </div>
                    {cartItems.length > 0 &&
                        <div>
                            <table className={styles["cart-total"]}>
                                <thead>
                                    <tr>
                                        <th className={styles["cart-tag"]}>
                                            Prezzo Prodotti
                                        </th>
                                        <th className={styles["cart-tag"]}>
                                            Prezzo di Shipping
                                        </th>
                                        <th colSpan={2} className={styles["cart-tag"]}>
                                            Totale
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={styles["cart-tag"]}>
                                            &euro; {productsPrice.toFixed(2)}
                                        </td>
                                        <td className={styles["cart-tag"]}>
                                            &euro; {shippingPrice.toFixed(2)}
                                        </td>
                                        <td colSpan={2} className={styles["cart-tag"]}>
                                            &euro; {totalPrice.toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/checkout" className={`my-2 d-block mx-auto btn ${styles["beer-button"]} ${styles["text-button"]}`} onClick={handleClose}>Vai al checkout</Link>
                        </div>
                    }
                </section>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default CartOffCanvas