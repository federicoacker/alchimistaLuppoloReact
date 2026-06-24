
import useCart from "../hooks/useCart"
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router";
import BeerCardHorizontal from "./BeerCardHorizontal";
import styles from "./CartOffCanvas.module.css";


function CartOffCanvas() {
    const { cartItems, show, handleClose, productsPrice, shippingPrice, totalPrice } = useCart();
    console.log(cartItems);
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className={`${styles["cart-offcanvas"]} ${styles["section-frame"]}`}>
            <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title className={styles["cart-title"]}>Carrello</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <section className={styles["cart-section"]}>
                    <div className="d-flex flex-column">
                        {cartItems.map((cartItem) => {
                            return <BeerCardHorizontal key={cartItem.cartProduct.slug} product={cartItem.cartProduct} quantity={cartItem.quantity} />
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
                                        <th colspan={2} className={styles["cart-tag"]}>
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
                                        <td colspan={2} className={styles["cart-tag"]}>
                                            &euro; {totalPrice.toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/checkout" className={`my-2 d-block mx-auto btn ${styles["beer-button"]} ${styles["text-button"]}`}>Vai al checkout</Link>
                        </div>
                    }
                </section>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default CartOffCanvas