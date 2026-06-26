
function BeerSearchBar({query, setQuery, setOffset}) {
    
    return (
        <div className="search-bar my-2">
            <label htmlFor="cerca" className="form-label">Cerca</label>
            <input
                id="cerca"
                type="text"
                placeholder="Cerca..."
                className="form-control"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOffset(0);}}
            />
        </div>

    );
}

export default BeerSearchBar