import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../hooks/useCart";
import stripePromise from "../config/stripe";
import Checkout from "../components/Checkout";

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
        return <p className="text-danger">{errorMessage}</p>;
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