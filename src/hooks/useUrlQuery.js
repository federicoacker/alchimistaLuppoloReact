import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

function useUrlQuery(MAX_ITEMS_PER_PAGE) {
    const [query, setQuery] = useSearchParams();
    const [orderBy, setOrderBy] = useState(query.get("orderBy") ? query.get("orderBy") : "updated_at");
    const [order, setOrder] = useState(query.get("order") ? query.get("order") : "asc");
    const [debouncedQuery, setSearchTerms, searchTerms] = useDebounce(query.get("search") ? query.get("search") : "", 500);
    const [selectedCategoryArray, setSelectedCategoryArray] = useState(query.get("category")?.split(",") ? query.get("category")?.split(",") : ["any"]);
    const [offset, setOffset] = useState(query.get("page") ? ((query.get("page") - 1) * 9) : 0);
    useEffect(() => {

        setQuery(
            {
                search: debouncedQuery,
                category: selectedCategoryArray.join(","),
                orderBy: orderBy,
                order: order,
                limit: MAX_ITEMS_PER_PAGE,
                page: offset/9 + 1
            });

    }, [debouncedQuery, setQuery, selectedCategoryArray, orderBy, order, offset, MAX_ITEMS_PER_PAGE]);
    return {
        orderBy,
        order,
        debouncedQuery,
        selectedCategoryArray,
        offset,
        setOrderBy,
        setOrder,
        setSearchTerms,
        searchTerms,
        setSelectedCategoryArray,
        setOffset
    }
}

export default useUrlQuery