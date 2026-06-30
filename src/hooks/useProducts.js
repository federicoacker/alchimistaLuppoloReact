import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../data/apiConstants.js";

function useProducts(query, isProductPage = false) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        fetch(`${BASE_API_URL}/products${query.toString()}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setProducts(data.result || []);
            })
            .catch(error => {
                setError(error.message || "C'è stato un problema nella fetch");
                return {
                    products:[],
                    loading: false,
                    error: error,
                    productCount: 0
                };
            })
            .finally(() => {
                setLoading(false);
            });
        if (isProductPage) {
            fetch(`${BASE_API_URL}/products/count${query.toString()}`)
                .then(response => {
                    return response.json();
                    
                })
                .then(data => {
                    setProductCount(data.result || 0);
                })
                .catch(error => {
                    setError(error.message || "Errore sconosciuto nel fetch del count dei prodotti");
                    return {
                    products:[],
                    loading: false,
                    error: error,
                    productCount: 0
                };
                })
                .finally(() => setLoading(false));
        }
    }, [query, isProductPage]);

    return {
        products,
        loading,
        error,
        productCount
    }
}

export default useProducts