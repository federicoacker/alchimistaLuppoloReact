import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../hooks/useCart";
import stripePromise from "../config/stripe";
import Checkout from "../components/Checkout";
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
    const { cartItems, totalPrice } = useCart();

    const [clientSecret, setClientSecret] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function createPaymentIntent() {
            try {
                if (!cartItems || cartItems.length === 0) {
                    setErrorMessage("Carrello vuoto");
                    return;
                }

                const stripeCartItems = cartItems.map(item => ({
                    slug: item.cartProduct?.slug || item.slug,
                    quantity: item.quantity,
                }));

                console.log("stripeCartItems inviati al backend:", stripeCartItems);

                const invalidCartItem = stripeCartItems.find(item => !item.slug || !item.quantity);

                if (invalidCartItem) {
                    setErrorMessage("Prodotto nel carrello non valido");
                    return;
                }

                const response = await fetch("http://localhost:3000/payments/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cartItems: stripeCartItems }),
                });

                const data = await response.json();

                if (!response.ok) {
                    setErrorMessage(data.message || "Errore durante la creazione del pagamento");
                    return;
                }

                setClientSecret(data.clientSecret);
            } catch (error) {
                setErrorMessage("Errore di connessione con il server");
            }
        }

        createPaymentIntent();
    }, [cartItems]);

    if (errorMessage) {
        return (
            <section className={styles.checkoutMessagePage}>
                <div className={styles.checkoutMessageCard}>
                    <div className={styles.messageSymbol}>
                        &#128722;
                    </div>

                    <h5 className={styles.messageSubtitle}>
                        Checkout
                    </h5>

                    <h1 className={styles.messageTitle}>
                        Carrello vuoto
                    </h1>

                    <p className={styles.messageDescription}>
                        Prima di procedere al pagamento, aggiungi almeno una birra al carrello.
                    </p>

                    <a href="/products" className={styles.buttonAction}>
                        Esplora le birre
                    </a>
                </div>
            </section>
        );
    }

    if (!clientSecret) {
        return <p>Caricamento pagamento...</p>;
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Checkout totalPrice={totalPrice} />
        </Elements>
    );
}

export default CheckoutPage;