import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../data/apiConstants";

function useCategories(){
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        fetch(`${BASE_API_URL}/categories`)
        .then(response => {
            if(!response.ok){
                setError("C'è stato un problema nel fetch delle categorie")
            }
            return response.json();
        }
        )
        .then(data => {
            setCategories(data.result || []);
        })
        .catch(error => {
            setError(error.message || "C'è stato un problema nel fetch delle categorie");
        })
        .finally(()=>{
            setLoading(false);
        })
    }, []);

    return{
        categories,
        loading,
        error
    };
}

export default useCategories;