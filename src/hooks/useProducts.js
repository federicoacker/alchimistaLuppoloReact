import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../data/apiConstants.js";

function useProducts(query){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        fetch(`${BASE_API_URL}/products${query.toString()}`)
        .then(response => {
            if(!response.ok){
                setError("C'è stato un problema nella fetch");
            }
            return response.json();
        })
        .then(data => {
            setProducts(data.result || []);
        })
        .catch(error => {
            setError(error.message || "C'è stato un problema nella fetch");
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [query, setLoading]);

    return {
        products,
        loading,
        error
    }
}

export default useProducts