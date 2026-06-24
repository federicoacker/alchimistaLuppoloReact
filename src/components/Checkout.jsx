import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Section from './Section';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";


function Checkout({ totalPrice }) {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState("");

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

        if (!stripe || !elements) {
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/payment-success",
            },
        });

        if (error) {
            setPaymentError(error.message);
        }
    };

    return (
        <Section>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            defaultValue=""
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            defaultValue=""
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="State" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" placeholder="Zip" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationPhone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            required
                            type="tel"
                            placeholder="Enter number phone"
                            defaultValue=""
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid phone number.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="validationDate">
                        <Form.Label>Date of birthday</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            defaultValue=""
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid date of birth.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                {totalPrice && (
                    <p>Totale da pagare: € {totalPrice}</p>
                )}

                <div className="mb-3">
                    <PaymentElement />
                </div>

                {paymentError && (
                    <p className="text-danger">{paymentError}</p>
                )}

                <button type="submit" disabled={!stripe}>
                    Paga
                </button>

            </Form>
        </Section>
    )
}

export default Checkout;