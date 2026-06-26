import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Section from './Section';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCart from '../hooks/useCart';
import { BASE_API_URL } from '../data/apiConstants';
import validateForm, { useValidateForm } from "../hooks/useValidateForm.js";
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
    const [needsValidation, setNeedsValidation] = useState(false)

    const isFormValidated = useValidateForm(formData, needsValidation);
    let validated;
    let errors;
    if (isFormValidated) {
        validated = isFormValidated.validated;
        errors = isFormValidated.errors;
    }

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
        if (!needsValidation) {
            setNeedsValidation(true);
            return;
        }

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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Text className={styles["text-cream-title"]}>*Tutti i campi sono obbligatori</Form.Text>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="first_name"
                                placeholder="Nome"
                                value={formData.first_name}
                                onChange={handleChange}
                                isValid={errors?.first_name === ""}
                                isInvalid={errors?.first_name !== ""}
                            />
                            <Form.Control.Feedback type="invalid">{errors?.first_name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="last_name"
                                placeholder="Cognome"
                                value={formData.last_name}
                                onChange={handleChange}
                                isValid={errors?.last_name === ""}
                                isInvalid={errors?.last_name !== ""}
                            />
                            <Form.Control.Feedback type="invalid">{errors?.last_name}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Città</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Città" 
                            required 
                            value={formData.city} 
                            name="city" 
                            onChange={handleChange} 
                            isValid={errors?.city === ""}
                            isInvalid={errors?.city !== ""}
                            />
                            <Form.Control.Feedback type="invalid">{errors?.city}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Indirizzo"
                            required value={formData.address_line_1} 
                            name="address_line_1" 
                            onChange={handleChange} 
                            isValid={errors?.address_line_1 === ""}
                            isInvalid={errors?.address_line_1 !== ""}
                            />
                            <Form.Control.Feedback type="invalid">{errors?.address_line_1}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>CAP</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="CAP" 
                            required 
                            value={formData.postal_code} 
                            name="postal_code" 
                            onChange={handleChange} 
                            isValid={errors?.postal_code === ""}
                            isInvalid={errors?.postal_code !== ""}
                            />
                            <Form.Control.Feedback type="invalid">{errors?.postal_code}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Indirizzo email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci email"
                                required name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isValid={errors?.email === ""}
                                isInvalid={errors?.email !== ""}
                            />
                            <Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationPhone">
                            <Form.Label>Numero di Telefono</Form.Label>
                            <Form.Control
                                required
                                type="tel"
                                placeholder="Inserisci numero di telefono"
                                value={formData.phone}
                                name="phone"
                                isValid={errors?.phone === ""}
                                isInvalid={errors?.phone !== ""}
                                onChange={handleChange}
                                
                            />
                            <Form.Control.Feedback type="invalid">{errors?.phone}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="validationDate">
                            <Form.Label>Data di nascita</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                isValid={errors?.date_of_birth === ""}
                                isInvalid={errors?.date_of_birth !== ""}
                                value={formData.date_of_birth}
                                name="date_of_birth"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">{errors?.date_of_birth}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>



                    <div className="mb-3">
                        <PaymentElement />
                    </div>

                    {paymentError && (
                        <p className="text-danger">{paymentError}</p>
                    )}

                    <button className={styles.paymentButton} type="submit" disabled={!stripe}>
                        {!needsValidation ? "Valida i dati" : "Paga"}
                    </button>

                </Form>
            </Section>
        </Section>
    )
}

export default Checkout;