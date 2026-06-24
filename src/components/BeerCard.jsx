import { Card, Button, Col, Row } from "react-bootstrap";
import styles from "./BeerCard.module.css";
import { Link } from "react-router";
import { useWishlist } from "../contexts/WishlistContext.jsx"
import useCart from "../hooks/useCart";

function BeerCard({ product }) {
    const {
        toggleWishlist,
        isInWishlist
    } = useWishlist();
    const favorite = isInWishlist(product.slug);
    const {cartItems, addToCart, removeFromCart} = useCart();
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
                        Prezzo: {product.price.toFixed(2).replace(".", ",")} &euro;
                    </Card.Text>
                    <Card.Text className={styles["beer-card-text"]}>
                        IBU: {product.ibu}
                    </Card.Text>
                    <Card.Text className={styles["beer-card-text"]}>
                        ABV: {product.abv.toFixed(2)}%
                    </Card.Text>

                    <Row className="g-2 justify-content-center">
                        <Col xs="auto" className="text-center">
                            <Button className={styles["beer-button"]} onClick={event =>{addToCart(product)}}><i className="bi bi-cart-fill"></i></Button>
                        </Col>
                        <Col xs="auto" className="text-center">
                            <Button className={styles["beer-button"]}
                                onClick={() => toggleWishlist(product.slug)}>
                                { favorite ? ( <i className="bi bi-heart-fill"></i>)
                                         : ( <i className="bi bi-heart"></i>)}
                            </Button>
                
                        <Col xs="auto" className="text-center">
                            <Link to={`/products/${product.slug}`} className={`btn ${styles["beer-button"]}`}>Dettagli</Link>
                             <Button className={styles["beer-button"]} onClick={event =>removeFromCart(product)}>Rimuovi</Button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default BeerCard