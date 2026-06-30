import styles from "./FiltersSection.module.css"
import BeerSearchBar from "./BeerSearchBar";
import Select from "react-select";
import { useState, useEffect } from "react";
import { baseOptions, sortingOptions } from "../data/apiConstants.js";
import useCategories from "../hooks/useCategories.js"
function FiltersSection({ urlQueryObject, isGrid, setIsGrid }) {

    const {
        orderBy,
        order,
        selectedCategoryArray,
        setOrderBy,
        setOrder,
        setSearchTerms,
        searchTerms,
        setSelectedCategoryArray,
        setOffset,
        setLimit,
        limit
    } = urlQueryObject

    console.log(limit);
    const { categories, loading: categoryLoading, error: categoryError } = useCategories();
    const [options, setOptions] = useState(baseOptions);
    const [sortOptions] = useState(sortingOptions)

    useEffect(() => {
        if (options.length === 1) {
            const optionArray = categories.map(category => { return { value: category.slug, label: category.name } });
            setOptions([...options, ...optionArray]);
        }
    }, [categories]);


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

    return (
        <div className="w-100">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <label htmlFor="paginationLimit" className={styles["label"]}>
                    Numero di prodotti per pagina
                </label>
                <div className="d-flex gap-2">
                    <button className={Number(limit) === 3 ? styles["buttonActive"] : styles["buttonAction"]} onClick={() => {
                        setOffset(0);
                        setLimit(3);
                    }}>3</button>
                    <button className={Number(limit) === 6 ? styles["buttonActive"] : styles["buttonAction"]} onClick={() => {
                        setOffset(0);
                        setLimit(6);
                    }}>6</button>
                    <button className={Number(limit) === 9 ? styles["buttonActive"] : styles["buttonAction"]} onClick={() => { 
                        setOffset(0);
                        setLimit(9);
                        }}>9</button>
                </div>
            </div>
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
    )
}

export default FiltersSection