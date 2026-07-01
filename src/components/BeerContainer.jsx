
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


function BeerContainer() {
    const urlQueryObject = useUrlQuery()
    const { debouncedQuery, selectedCategoryArray, orderBy, order, offset, setOffset, limit } = urlQueryObject;
    const { products, loading, productCount } = useProducts(`?search=${debouncedQuery}&category=${selectedCategoryArray.join(",")}&orderBy=${orderBy}&order=${order}&limit=${limit}&offset=${offset}`, true);
    const [isGrid, setIsGrid] = useState(true);


    return (
        <>
            <Section className={`d-flex ${styles["search-section"]}`}>
                <FiltersSection urlQueryObject={urlQueryObject} setIsGrid={setIsGrid} isGrid={isGrid} productCount={productCount} />
            </Section>

            <PageNavigator currentOffset={offset} MAX_ITEMS_PER_PAGE={limit} setOffset={setOffset} productCount={productCount} />
            <Row className={`${styles["beer-row"]} align-items-stretch`}>
                {(!loading && products.length > 0) ?
                    products.map(product => {
                        return isGrid ? <BeerCardVertical key={product?.slug} product={product} /> :
                            <BeerCardHorizontal key={product?.slug} product={product} />
                    }) :
                    <p className="fw-bold text-center fs-2">Non sono stati trovati risultati</p>
                }
            </Row>
        </>
    )
}

export default BeerContainer