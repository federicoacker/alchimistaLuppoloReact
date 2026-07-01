import { Card, Button, Col } from "react-bootstrap";
import styles from "./BeerCardVertical.module.css";
import { useWishlist } from "../contexts/WishlistContext";
import useCart from "../hooks/useCart";
import { Link } from "react-router";
import CategoryBadge from "./CategoryBadge";

function BeerCardVertical({ product }) {
    const {
        toggleWishlist,
        isInWishlist
    } = useWishlist();
    const favorite = isInWishlist(product.slug);
    const { cartItems, addToCart, removeFromCart } = useCart();
    const thisItem = cartItems.find(cartItem => cartItem.cartProduct.slug === product.slug);


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
                    <div className="d-flex gap-2">
                        {product.categories.map(category => <CategoryBadge key={category.slug} category={category} />)}
                    </div>
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
                    <div className="d-flex justify-content-between flex-wrap gap-2">
                        <div className="d-flex gap-2 justify-content-center flex-grow-1">
                            {
                                thisItem ? <div className={styles["button-wrapper"]}>
                                    <button
                                        className={styles["btn-quantity-action"]}
                                        onClick={() => removeFromCart(product)}
                                    >
                                        -
                                    </button>

                                    <span className={styles["quantity-display"]}>{thisItem.quantity}</span>

                                    <button
                                        className={styles["btn-quantity-action"]}
                                        onClick={() => addToCart(product)}
                                    >
                                        +
                                    </button>
                                </div> :
                                    <Button className={`${styles["icon-button"]} ${styles["beer-button"]} `} onClick={() => { addToCart(product) }}><i className="bi bi-cart-fill"></i></Button>
                            }
                            <Button className={`${styles["icon-button"]} ${styles["beer-button"]} `}
                                onClick={() => toggleWishlist(product.slug)}>
                                {favorite ? (<i className="bi bi-heart-fill"></i>)
                                    : (<i className="bi bi-heart"></i>)}
                            </Button>

                        </div>
                        <div className="d-flex gap-2 justify-content-center flex-grow-1">

                            <Link to={`/products/${product.slug}`} className={`btn ${styles["beer-button"]} ${styles["text-button"]}`}>Dettagli</Link>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default BeerCardVertical