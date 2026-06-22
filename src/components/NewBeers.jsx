

import useProducts from '../hooks/useProducts.js';
import BeerCard from './BeerCard.jsx';
import { Row } from 'react-bootstrap';
import styles from "./NewBeers.module.css";


function NewBeers() {
    const { products, loading, error } = useProducts("?limit=6")
    console.log(products);
    console.log(error);
    return (
        <>
            <h2 className={styles["section-title"]}>Le nuove arrivate</h2>
            <Row className="row-gap-4">
                {products.map(product => <BeerCard key={product.slug} product={product} />)}
            </Row>
        </>
    )
}

export default NewBeers;