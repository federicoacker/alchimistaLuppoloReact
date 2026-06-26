import styles from "./PageNavigator.module.css";
function PageNavigator({ currentOffset, MAX_ITEMS_PER_PAGE, handlePrevPage, handleNextPage, productCount }) {
    return (
        <div className="d-flex justify-content-center align-items-center gap-3 my-4">
            <button
                className={styles["buttonAction"]}
                onClick={handlePrevPage}
                disabled={currentOffset === 0}>
                <i className="bi bi-arrow-bar-left"></i>
            </button>
            <span className="fw-semibold">
                Pagina {Math.ceil((currentOffset + 1) / MAX_ITEMS_PER_PAGE)}
            </span>
            <button
                className={styles["buttonAction"]}
                onClick={handleNextPage}
                disabled={currentOffset + MAX_ITEMS_PER_PAGE >= productCount}
            >
                <i className="bi bi-arrow-bar-right"></i>
            </button>
        </div>
    )
}

export default PageNavigator