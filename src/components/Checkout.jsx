import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Section from './Section';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCart from '../hooks/useCart';
import { BASE_API_URL } from '../data/apiConstants';
import validateForm from "../data/validation/validateForm.js";
import styles from "./Checkout.module.css";
import CartContainer from './CartContainer.jsx';

const templateForm = {
    first_name: "",
    last_name: "",
    city: "",
    address_line_1: "",
    postal_code: "",
    email: "",
    phone: "",
    date_of_birth: "",
    total_price: 0,
    shipping_price: 0,
    products_price: 0,
    status: "pending",
    products: []
}

function Checkout({ totalPrice }) {
    const { cartItems, shippingPrice, productsPrice } = useCart();
    const [orderError, setOrderError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState("");
    const [formData, setFormData] = useState(templateForm);

    const [validated, setValidated] = useState(false);


    const handleChange = () => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const mappedCartItems = cartItems.map(cartItem => {
            return {
                "product_slug": cartItem.cartProduct.slug,
                "quantity": cartItem.quantity
            };
        });
        const newOrder = {
            ...formData,
            products: mappedCartItems,
            total_price: totalPrice,
            shipping_price: shippingPrice,
            products_price: productsPrice
        }

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(validateForm(newOrder));

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newOrder)
        };

        fetch(`${BASE_API_URL}/orders`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nella creazione dell'ordine");
                }
                return response.json();
            })
            .then(async () => {
                if (!stripe || !elements) {
                    return;
                }

                window.localStorage.removeItem("cartItems");
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: "http://localhost:5173/",
                    },
                });

                if (error) {
                    setPaymentError(error.message);
                }

            })
            .catch(error => {
                setOrderError(error.message)
            })
    };

    return (
        <Section>
            <div>
                <CartContainer />
                <div className="text-end">
                    {totalPrice && (
                        <>
                            <p className={styles.summaryRow}>
                                Totale prodotti: € {productsPrice.toFixed(2).replace(".", ",")}
                            </p>

                            <p className={styles.summaryRow}>
                                Spedizione:{" "}
                                {shippingPrice === 0
                                    ? "Gratuita"
                                    : `€ ${shippingPrice.toFixed(2).replace(".", ",")}`}
                            </p>

                            <h2 className={styles.totalPrice}>
                                Totale da pagare: € {totalPrice.toFixed(2).replace(".", ",")}
                            </h2>
                        </>
                    )}
                </div>
            </div>
            <Section>
                <Form noValidate data-bs-theme="dark" validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label >Nome</Form.Label>
                            <Form.Control
                                className={styles.formInput}
                                required
                                type="text"
                                name="first_name"
                                placeholder="Nome"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                className={styles.formInput}
                                required
                                type="text"
                                name="last_name"
                                placeholder="Cognome"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Città</Form.Label>
                            <Form.Control className={styles.formInput} type="text" placeholder="Città" required value={formData.city} name="city" onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">
                                Per favore inserisci una città esistente.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control className={styles.formInput} type="text" placeholder="Indirizzo" required value={formData.address_line_1} name="address_line_1" onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">
                                Per favore inserisci un indirizzo valido.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>CAP</Form.Label>
                            <Form.Control className={styles.formInput} type="text" placeholder="CAP" required value={formData.postal_code} name="postal_code" onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">
                                Per faore inserisci un CAP valido.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Indirizzo email</Form.Label>
                            <Form.Control className={styles.formInput} type="email" placeholder="Inserisci email" required name="email" value={formData.email} onChange={handleChange} />
                            <Form.Text className={styles["text-cream"]}>
                                Non condivideremo mai la tua email con nessun'altro oltre a Stripe.
                            </Form.Text>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationPhone">
                            <Form.Label>Numero di Telefono</Form.Label>
                            <Form.Control
                                className={styles.formInput}
                                required
                                type="tel"
                                placeholder="Inserisci numero di telefono"
                                value={formData.phone}
                                name="phone"

                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Per favore inserisci un numero di telefono valido
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="validationDate">
                            <Form.Label>Data di nascita</Form.Label>
                            <Form.Control
                                className={styles.formInput}
                                required
                                type="date"

                                value={formData.date_of_birth}
                                name="date_of_birth"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Per favore inserisci una data di nascita valida.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>



                    <div className="mb-3">
                        <PaymentElement />
                    </div>

                    {paymentError && (
                        <p className="text-danger">{paymentError}</p>
                    )}

                    <button className={styles.paymentButton} type="submit" disabled={!stripe}>
                        Paga
                    </button>

                </Form>
            </Section>
        </Section>
    )
}

export default Checkout;