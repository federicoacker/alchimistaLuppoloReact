import { useEffect, useState, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../contexts/CartContext";
import stripePromise from "../config/stripe";
import Checkout from "../components/Checkout";

function CheckoutPage() {
    const { cartItems } = useContext(CartContext);

    const [clientSecret, setClientSecret] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function createPaymentIntent() {
            try {
                if (!cartItems || cartItems.length === 0) {
                    setErrorMessage("Carrello vuoto");
                    return;
                }

                console.log("cartItems:", cartItems);
                console.log("primo prodotto nel carrello:", cartItems[0]?.cartProduct);

                const stripeCartItems = cartItems.map(item => ({
                    product_id: item.cartProduct.id,
                    quantity: item.quantity,
                }));

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
                setTotalPrice(data.totalPrice);
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