import BeerSearchBar from "./BeerSearchBar";
import Section from "./Section";
import { useSearchParams } from "react-router";
import useDebounce from "../hooks/useDebounce.js";
import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts.js";
import BeerCardVertical from "./BeerCard.jsx";
import { Row } from "react-bootstrap";
import useCategories from "../hooks/useCategories.js";
import styles from "./BeerContainer.module.css";
import BeerCardHorizontal from "./BeerCardHorizontal.jsx";


function BeerContainer() {
    const [isGrid, setIsGrid] = useState(true);
    const [query, setQuery] = useSearchParams();
    const [debouncedQuery, setSearchTerms, searchTerms] = useDebounce(query.get("search") ? query.get("search") : "", 500);
    const [selectedCategory, setSelectedCategory] = useState("any");
    const { products, loading } = useProducts(`?search=${debouncedQuery}&category=${selectedCategory}`);
    const { categories, loading: categoryLoading, error: categoryError } = useCategories();

    const changeCategory = (e) => {
        setSelectedCategory((current) => {
            const value = e.target.value;
            if (current === "any") {
                return value;
            }
            const categoryArray = current?.split(",");
            if (categoryArray.includes(value)) {
                categoryArray.splice(categoryArray.indexOf(value), 1);
                if (categoryArray.length === 0) {
                    categoryArray.push("any");
                }
                return categoryArray.join(",");
            }
            return current + `,${e.target.value}`
        });
    };


    useEffect(() => {
        setQuery(
            {
                search: debouncedQuery,
                category: selectedCategory
            });

    }, [debouncedQuery, setQuery, selectedCategory]);

    return (
        <Section className="gap-4">
            <Section className={`d-flex ${styles["search-section"]}`}>
                <div>
                    <BeerSearchBar query={searchTerms} setQuery={setSearchTerms} />
                    <button className={styles["buttonAction"]} onClick={() => { setIsGrid(!isGrid) }}>
                        <i className={isGrid ? "bi bi-card-list" : "bi bi-grid-3x2"} />
                    </button>
                    <div className="d-flex gap-2 flex-wrap">
                        {!categoryLoading && !categoryError && categories.map(category => {
                            return (
                                <label htmlFor={category.slug} key={category.slug} className={styles["category-pill"]}>
                                    <input
                                        className={styles["category-pill-input"]}
                                        id={`${category.slug}`}
                                        type="checkbox"
                                        name="category"
                                        value={category.slug}
                                        checked={selectedCategory?.split(",").includes(category.slug)}
                                        onChange={changeCategory} />
                                    <span className={styles["category-pill-chip"]}>{category.name}</span>
                                </label>
                            )
                        }
                        )
                        }
                    </div>
                </div>
            </Section>
            <Row className={`row-gap-4 ${styles["product-section"]}`}>
                {
                    !loading && products.map(product => { return isGrid ? <BeerCardVertical key={product?.slug} product={product} /> : <BeerCardHorizontal key={product?.slug} product={product} /> })
                }
            </Row>
        </Section>
    )
}

export default BeerContainer