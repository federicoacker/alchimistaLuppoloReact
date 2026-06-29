
import Section from "./Section";
import { useState } from "react";
import useProducts from "../hooks/useProducts.js";
import BeerCardVertical from "./BeerCardVertical.jsx";
import { Row } from "react-bootstrap";
import styles from "./BeerContainer.module.css";
import BeerCardHorizontal from "./BeerCardHorizontal.jsx";
import PageNavigator from "./PageNavigator.jsx";
import useUrlQuery from "../hooks/useUrlQuery.js";

import FiltersSection from "./FiltersSection.jsx";
import { Navigate } from "react-router";

const MAX_ITEMS_PER_PAGE = 9;
function BeerContainer() {
    const urlQueryObject = useUrlQuery(MAX_ITEMS_PER_PAGE)
    const { debouncedQuery, selectedCategoryArray, orderBy, order, offset, setOffset } = urlQueryObject;
    const { products, loading, productCount, error } = useProducts(`?search=${debouncedQuery}&category=${selectedCategoryArray.join(",")}&orderBy=${orderBy}&order=${order}&limit=${MAX_ITEMS_PER_PAGE}&offset=${offset}`, true);
    const [isGrid, setIsGrid] = useState(true);

    return (
        <Section className="gap-4">
            <Section className={`d-flex ${styles["search-section"]}`}>
                <FiltersSection urlQueryObject={urlQueryObject} setIsGrid={setIsGrid} isGrid={isGrid} />
            </Section>
            <p>Sono stati trovati {productCount} risultati</p>
            <PageNavigator currentOffset={offset} MAX_ITEMS_PER_PAGE={MAX_ITEMS_PER_PAGE} setOffset={setOffset} productCount={productCount} />
            <Row className={`row-gap-4 ${styles["product-section"]}`}>
                {error && <Navigate to="/404" />}
                {(!loading && products.length === 0) ? <Navigate to="/404" /> :
                    products.map(product => { return isGrid ? <BeerCardVertical key={product?.slug} product={product} /> : <BeerCardHorizontal key={product?.slug} product={product} /> })
                }
            </Row>
        </Section>
    )
}

export default BeerContainer