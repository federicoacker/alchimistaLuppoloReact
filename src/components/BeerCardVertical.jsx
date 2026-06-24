import { Card, Button, Col, Row } from "react-bootstrap";
import styles from "./BeerCardVertical.module.css";
import { useWishlist } from "../contexts/WishlistContext";
import useCart from "../hooks/useCart";
import { Link } from "react-router";

function BeerCardVertical({ product }) {
    const {
        toggleWishlist,
        isInWishlist
    } = useWishlist();
    const favorite = isInWishlist(product.slug);
    const { cartItems, addToCart} = useCart();
    console.log(cartItems);

    return (
        <Col md={6} lg={4} xl={4} xxl={4}>
            <Card className={styles["beer-card"]}>
                <Card.Header className={`d-flex flex-column align-items-center ${styles["beer-card-header"]}`}>
                    <Card.Img loading="lazy" variant="top" src={product.image} className={styles["beer-img"]} />
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
                        <Col xs="auto" lg={3} className="text-center">
                            <Button className={`${styles["icon-button"]} ${styles["beer-button"]} `} onClick={() => { addToCart(product) }}><i className="bi bi-cart-fill"></i></Button>
                        </Col>
                        <Col xs="auto" lg={3} className="text-center">
                            <Button className={`${styles["icon-button"]} ${styles["beer-button"]} `}
                                onClick={() => toggleWishlist(product.slug)}>
                                {favorite ? (<i className="bi bi-heart-fill"></i>)
                                    : (<i className="bi bi-heart"></i>)}
                            </Button>
                        </Col>
                        <Col xs="auto" lg={6} className="text-center">
                            <Link to={`/products/${product.slug}`} className={`btn ${styles["beer-button"]} ${styles["text-button"]}`}>Dettagli</Link>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default BeerCardVertical