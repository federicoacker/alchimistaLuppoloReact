import { useEffect, useState } from "react";
import { BASE_API_URL } from "../data/apiConstants";

function useWishlistProducts(wishlist) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchProducts() {

            try {

                if (wishlist.length === 0) {

                    setProducts([]);
                    return;
                }

                const requests = wishlist.map(async (slug) => {

                    try {

                        const response = await fetch(
                            `${BASE_API_URL}/products/${slug}`
                        );

                        if (!response.ok) {
                            return null;
                        }

                        const data = await response.json();
                       
                        return data.result;

                    } catch {

                        return null;
                    }
                });

                const fetchedProducts = await Promise.all( requests);

                const validProducts =
                    fetchedProducts.filter(
                        product => product !== null
                    );

                setProducts(validProducts);

            } catch (error) {

                setError(
                    error.message ||
                    "Errore nel caricamento della wishlist"
                );

            } finally {

                setLoading(false);
            }
        }

        fetchProducts();

    }, [wishlist]);

    return {
        products,
        loading,
        error
    };
}

export default useWishlistProducts;