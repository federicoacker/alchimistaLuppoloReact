import styles from "./PageNavigator.module.css";
function PageNavigator({ currentOffset, MAX_ITEMS_PER_PAGE, setOffset, productCount }) {
    const handlePrevPage = () => {
        setOffset((prev) => Math.max(prev - Number(MAX_ITEMS_PER_PAGE), 0));
    }


    const handleNextPage = () => {
        setOffset((prev) => Math.min(prev + Number(MAX_ITEMS_PER_PAGE), productCount));
    }

    return (
        <div className="d-flex justify-content-center align-items-center gap-3 my-4">
            <button
                className={styles["buttonAction"]}
                onClick={handlePrevPage}
                disabled={currentOffset === 0}>
                <i className="bi bi-arrow-bar-left"></i>
            </button>
            {productCount > 0 &&
                <span className="fw-semibold">
                    Pagina {Math.ceil((currentOffset + 1) / MAX_ITEMS_PER_PAGE)} / {Math.ceil(productCount / MAX_ITEMS_PER_PAGE)}
                </span>
            }
            <button
                className={styles["buttonAction"]}
                onClick={handleNextPage}
                disabled={currentOffset + Number(MAX_ITEMS_PER_PAGE) >= productCount}
            >
                <i className="bi bi-arrow-bar-right"></i>
            </button>
        </div>
    )
}

export default PageNavigator