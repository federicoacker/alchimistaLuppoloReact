
import styles from "./OurBeers.module.css";
import useProducts from '../hooks/useProducts.js';
import { Row } from 'react-bootstrap';
import BeerCardVertical from "./BeerCardVertical.jsx";


function OurBeers() {
  const { products, loading, error } = useProducts("?limit=6&brewery=L'Alchimista del Luppolo")
  return (
    <>
      <h2 className={styles["section-title"]}>La nostra produzione</h2>
      <Row className="row-gap-4">

        {!loading && !error && products.map(product => <BeerCardVertical key={product.slug} product={product} />)}
      </Row>
    </>
  )
}

export default OurBeers;