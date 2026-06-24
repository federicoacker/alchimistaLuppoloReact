import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const WishlistContext = createContext();

function WishlistProvider({ children }) {

    //Per evitare la cancellazione della wishlist al refresh
    const [wishlist, setWishlist] = useState(() => {

        const savedWishlist = localStorage.getItem("wishlist");

        if (savedWishlist !== null) {

            const parsedWishlist =
                JSON.parse(savedWishlist);

            return parsedWishlist;
        }

        return [];
    });

    //Quando la wishlist cambia aggiorno il localStorage
    useEffect(() => {

        const wishlistJson =
            JSON.stringify(wishlist);

        localStorage.setItem(
            "wishlist",
            wishlistJson
        );

    }, [wishlist]);


    //Aggiungo uno slug alla wishlist solo se non è presente
    function addToWishlist(slug) {

        setWishlist(currentWishlist => {

            const alreadyInWishlist =
                currentWishlist.includes(slug);

            if (alreadyInWishlist) {
                return currentWishlist;
            }

            return [
                ...currentWishlist,
                slug
            ];
        });
    }

    //Rimuove uno slug dalla wishlist
    function removeFromWishlist(slug) {

        setWishlist(currentWishlist => {

            return currentWishlist.filter(
                item => item !== slug
            );
        });
    }

    // Se il prodotto è presente lo rimuove, altrimenti lo aggiunge
    function toggleWishlist(slug) {

        const alreadyInWishlist =
            wishlist.includes(slug);

        if (alreadyInWishlist) {

            removeFromWishlist(slug);

        } else {

            addToWishlist(slug);
        }
    }

    // Controllo se lo slug è presente nella wishlist
    function isInWishlist(slug) {

        return wishlist.includes(slug);
    }

    //Svuotare tutta la wishlist
    function clearWishlist() {

        setWishlist([]);
    }

    //Aggiungere un prodotto al carrello e toglierlo dalla wishlist
    function moveToCart(slug) {

        removeFromWishlist(slug);

        /*
        aspetto il contesto del carrello
        */
    }

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist
    };


    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

//Per accedere al context
function useWishlist() {

    return useContext(WishlistContext);
}


export {
    WishlistProvider,
    useWishlist
};