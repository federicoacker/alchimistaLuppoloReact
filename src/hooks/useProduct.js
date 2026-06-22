import { useEffect } from "react";
import { useState } from "react"
import { BASE_API_URL } from "../data/apiConstants.js";


function useProduct(slug) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        fetch(`${BASE_API_URL}/products/${slug}`)
        .then(response => {
            if(!response.ok){
                setError("C'è stato un problema nella fetch dei dettagli del prodotto");
            }
            return response.json();
        })
        .then(data => {
            setProduct(data.result || {});
        })
        .catch(error => {
            setError(error.message || "C'è stato un problema nella fetch dei dettagli dal prodotto");
        })
        .finally(()=>{
            setLoading(false);
        });
    });

    return {
        product,
        loading,
        error
    }
}

export default useProduct