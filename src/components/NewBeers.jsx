

import useProducts from '../hooks/useProducts.js';
import BeerCard from './BeerCard.jsx';
import { Row } from 'react-bootstrap';
import styles from "./NewBeers.module.css";


function NewBeers() {
    const { products, loading, error } = useProducts("?limit=6&orderBy=created_at&excluded-brewery=L'Alchimista%20Del%20Luppolo")
    return (
        <div id="new-beers">
            <h2 className={styles["section-title"]}>Le nuove arrivate</h2>
            <Row className="row-gap-4">
                {!loading && !error && products.map(product => <BeerCard key={product.slug} product={product} />)}
            </Row>
        </div>
    )
}

export default NewBeers;