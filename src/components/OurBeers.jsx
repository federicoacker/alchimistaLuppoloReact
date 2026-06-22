
import styles from "./OurBeers.module.css";
import useProducts from '../hooks/useProducts.js';
import BeerCard from './BeerCard.jsx';
import { Row } from 'react-bootstrap';


function OurBeers() {
  const { products, loading, error } = useProducts("?limit=6&brewery=L'Alchimista del Luppolo")
  console.log(products);
  console.log(error);
  return (
    <>
      <h2 className={styles["section-title"]}>La nostra produzione</h2>
      <Row className="row-gap-4">
        {products.map(product => <BeerCard key={product.slug} product={product} />)}
      </Row>
    </>
  )
}

export default OurBeers;