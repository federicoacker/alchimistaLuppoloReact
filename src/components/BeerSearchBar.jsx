import styles from "./BeerSearchBar.module.css";

function BeerSearchBar({query, setQuery, setOffset}) {
    
    return (
        <div className="d-flex flex-column mb-5">
            <label htmlFor="cerca" className="form-label">Cerca</label>
            <input
                id="cerca"
                type="text"
                placeholder="Cerca..."
                className={styles["beer-search-bar"]}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOffset(0);}}
            />
        </div>

    );
}

export default BeerSearchBar