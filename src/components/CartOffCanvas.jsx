
import useCart from "../hooks/useCart"
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router";
import styles from "./CartOffCanvas.module.css";
import CartProductDisplay from "./CartProductDisplay";
import { useEffect } from "react";


function CartOffCanvas({setIsLuppolinoOpen}) {
    const { cartItems, show, handleClose, productsPrice, shippingPrice, totalPrice } = useCart();

    useEffect(()=>{
        if(show){
            setIsLuppolinoOpen(false);
        }
    },[show,setIsLuppolinoOpen]);

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className={`${styles["cart-offcanvas"]}`}>
            <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title className={styles["cart-title"]}>Carrello</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <section className={styles["cart-section"]}>
                    <div className="d-flex flex-column row-gap-3">
                        {cartItems.map((cartItem) => {
                            return <CartProductDisplay key={cartItem.cartProduct.slug} productItem={cartItem} />
                        })}
                    </div>
                    {cartItems.length > 0 &&
                        <div>
                            <table className={styles["cart-table"]}>
                                <tbody>
                                    <tr className={styles["cart-row"]}>
                                        <td className={styles["cart-tag"]}>
                                            Prezzo Prodotti:
                                        </td>
                                        <td className={styles["price-tag"]}>
                                            &euro; {productsPrice.toFixed(2).replace(".",",")}
                                        </td>  
                                    </tr>
                                    <tr className={styles["cart-row"]}>
                                        <td className={styles["cart-tag"]}>
                                            Prezzo di Shipping
                                        </td>
                                        <td className={styles["price-tag"]}>
                                            &euro; {shippingPrice.toFixed(2).replace(".",",")}
                                        </td>
                                    </tr>
                                    <tr className={styles["cart-row"]}>
                                        <td  className={styles["cart-total"]}>
                                            Totale
                                        </td>
                                        <td  className={`${styles["price-tag"]} ${styles["total-tag"]}`}>
                                            &euro; {totalPrice.toFixed(2).replace(".",",")}
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