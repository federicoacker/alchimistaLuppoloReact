import BeerSearchBar from "./BeerSearchBar";
import Section from "./Section";
import { useSearchParams } from "react-router";
import useDebounce from "../hooks/useDebounce.js";
import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts.js";
import BeerCardVertical from "./BeerCardVertical.jsx";
import { Row } from "react-bootstrap";
import useCategories from "../hooks/useCategories.js";
import styles from "./BeerContainer.module.css";
import BeerCardHorizontal from "./BeerCardHorizontal.jsx";
import Select from "react-select";
import PageNavigator from "./PageNavigator.jsx";

const MAX_ITEMS_PER_PAGE = 9;
function BeerContainer() {
    const [isGrid, setIsGrid] = useState(true);
    const [query, setQuery] = useSearchParams();
    const [debouncedQuery, setSearchTerms, searchTerms] = useDebounce(query.get("search") ? query.get("search") : "", 500);
    const { categories, loading: categoryLoading, error: categoryError } = useCategories();
    const [orderBy, setOrderBy] = useState(query.get("orderBy") ? query.get("orderBy") : "updated_at");
    const [order, setOrder] = useState(query.get("order") ? query.get("order") : "asc");
    const [selectedCategoryArray, setSelectedCategoryArray] = useState(query.get("category")?.split(",") ? query.get("category")?.split(",") : ["any"]);
    const [offset, setOffset] = useState(0);
    const { products, loading, productCount } = useProducts(`?search=${debouncedQuery}&category=${selectedCategoryArray.join(",")}&orderBy=${orderBy}&order=${order}&limit=${MAX_ITEMS_PER_PAGE}&offset=${offset}`, true);
    const [options, setOptions] = useState([{ value: "any", label: "Tutte" }]);

    const [sortOptions] = useState([
        { value: "name", label: "Nome" },
        { value: "price", label: "Prezzo" },
        { value: "updated_at", label: "Data" }
    ])

    const handlePrevPage = () => {
        setOffset((prev) => Math.max(prev - MAX_ITEMS_PER_PAGE, 0));
    }

    const handleNextPage = () => {
        setOffset((prev) => Math.min(prev + MAX_ITEMS_PER_PAGE, productCount));
    }

    useEffect(() => {
        if (options.length === 1) {
            const optionArray = categories.map(category => { return { value: category.slug, label: category.name } });
            setOptions([...options, ...optionArray]);
        }
    }, [categories, options]);

    const changeCategoryArray = (e) => {
        setOffset(0);
        setSelectedCategoryArray((current) => {

            if (!e || e.length === 0) {
                return ["any"];
            }

            const newSelectedValues = e.map(option => option.value);
            const hasAny = newSelectedValues.includes("any");
            const hadAny = current.includes("any");

            if (hasAny && !hadAny) {
                return ["any"];
            }

            if (hasAny && hadAny) {
                const withoutAny = newSelectedValues.filter(v => v !== "any");
                return withoutAny.length > 0 ? withoutAny : ["any"];
            }

            if (newSelectedValues.length === 0) {
                return ["any"];
            }

            return newSelectedValues;
        });
    };
    console.log(products);

    useEffect(() => {

        setQuery(
            {
                search: debouncedQuery,
                category: selectedCategoryArray.join(","),
                orderBy: orderBy,
                order: order,
                limit: MAX_ITEMS_PER_PAGE,
                offset: offset
            });

    }, [debouncedQuery, setQuery, selectedCategoryArray, orderBy, order, offset]);

    return (
        <Section className="gap-4">
            <Section className={`d-flex ${styles["search-section"]}`}>
                <div className="w-100">
                    <BeerSearchBar query={searchTerms} setQuery={setSearchTerms} setOffset={setOffset} />
                    <div className="d-flex my-2 g-4 w-100 flex-wrap">
                        <div className={styles["display-wrapper"]}>
                            <label className={styles["label"]}>
                                Display {isGrid ? "Griglia" : "Lista"}
                            </label>
                            <button className={styles["displayButton"]} onClick={() => { setIsGrid(!isGrid) }}>
                                <i className={!isGrid ? "bi bi-card-list" : "bi bi-grid-3x2"} />
                            </button>
                        </div>
                        <div className={styles["orderBy-wrapper"]}>
                            <label className={styles["label"]}>
                                Ordina per:
                            </label>
                            <Select
                                options={sortOptions}
                                onChange={(e) => {
                                    setOrderBy(e.value);
                                    setOffset(0);
                                }}
                                hideSelectedOptions
                                isSearchable={false}
                                unstyled
                                placeholder={sortOptions.find(option => option.value === orderBy).label}
                                classNames={{
                                    container: () => { return styles["select-order"] },
                                    control: () => { return styles["select-order-control"] },
                                    menu: () => { return styles["select-menu"] },
                                    option: ({ isSelected, isFocused }) => {
                                        return isSelected ? styles["select-option-selected"] : isFocused ? styles["select-option-focused"] : styles["select-option"]
                                    }
                                }}
                            />
                        </div>
                        <div className={styles["order-wrapper"]}>
                            <label className={`${styles["label"]} ${styles["order-text"]}`}>
                                Ordine: {order}
                            </label>
                            <button className={styles["buttonAction"]} onClick={() => {
                                order === "desc" ? setOrder("asc") : setOrder("desc");
                                setOffset(0);
                            }}>
                                {order === "asc" ? <i className="bi bi-arrow-bar-up"></i> : <i className="bi bi-arrow-bar-down"></i>}
                            </button>
                        </div>
                    </div>

                    {
                        !categoryLoading && !categoryError &&
                        <div className="d-flex flex-column">
                            <label className={styles["label"]}>
                                Seleziona le categorie
                            </label>
                            <Select
                                isMulti
                                options={options}
                                value={options.filter(opt => selectedCategoryArray.includes(opt.value))}
                                onChange={changeCategoryArray}
                                unstyled
                                classNames={{
                                    container: () => { return styles["select"] },
                                    menu: () => { return styles["select-menu"] },
                                    option: ({ isSelected, isFocused }) => {
                                        return isSelected ? styles["select-option-selected"] : isFocused ? styles["select-option-focused"] : styles["select-option"]
                                    },
                                    multiValue: () => { return styles["select-multi-value"] },
                                    multiValueLabel: () => { return styles["select-multi-value-label"] },
                                    multiValueRemove: () => { return styles["select-multi-value-remove-btn"] },


                                }}
                                isSearchable={false}
                                hideSelectedOptions
                            />
                        </div>
                    }
                </div>
            </Section>
            <p>Sono stati trovati {productCount} risultati</p>
            <PageNavigator currentOffset={offset} MAX_ITEMS_PER_PAGE={MAX_ITEMS_PER_PAGE} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} productCount={productCount} />
            <Row className={`row-gap-4 ${styles["product-section"]}`}>
                {
                    !loading && products.map(product => { return isGrid ? <BeerCardVertical key={product?.slug} product={product} /> : <BeerCardHorizontal key={product?.slug} product={product} /> })
                }
            </Row>
        </Section>
    )
}

export default BeerContainer