import { Card, Button, Col, Row } from "react-bootstrap";
import styles from "./BeerCard.module.css";
import { Link } from "react-router";
import useCart from "../hooks/useCart";

function BeerCard({ product }) {
    const {cartItems, addToCart} = useCart();
    console.log(cartItems);
    
    return (
        <Col md={6} lg={4} xl={3} xxl={2}>
            <Card className={styles["beer-card"]}>
                <Card.Header className={`d-flex flex-column align-items-center ${styles["beer-card-header"]}`}>
                    <Card.Img variant="top" src={product.image} className={styles["beer-img"]} />
                    <Card.Title className={styles["beer-title"]}>
                        {product.name}
                    </Card.Title>
                </Card.Header>
                <Card.Body className={styles["beer-card-body"]}>
                    <Card.Text className={styles["beer-description"]}>
                        {product.short_description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className={styles["beer-card-footer"]}>
                    <Card.Text className={styles["beer-card-text"]}>
                        Prezzo: {product.price.toFixed(2).replace(".",",")} &euro;
                    </Card.Text>
                    <Card.Text className={styles["beer-card-text"]}>
                        IBU: {product.ibu}
                    </Card.Text>
                    <Card.Text className={styles["beer-card-text"]}>
                        ABV: {product.abv.toFixed(2)}%
                    </Card.Text>
                    <Row className="g-2 justify-content-around">
                        <Col xs={12} md={4} xxl={6} className="text-center">
                            <Button className={styles["beer-button"]} onClick={event =>{addToCart(product)}}>Ordina</Button>
                        </Col>
                        <Col xs={12} md={4} xxl={6} className="text-center">
                            <Link to={`/products/${product.slug}`} className={`btn ${styles["beer-button"]}`}>Dettagli</Link>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default BeerCard