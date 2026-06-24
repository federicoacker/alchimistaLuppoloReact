import React from "react";
import { createContext, useState } from "react";
import { preloadModule } from "react-dom";

const CartContext = createContext(null);

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        let productIndex = 0;
        let productFound = false;

        //se prodotto già inserito aumenta (+1), altrimenti inserisci nuovo prodotto al cart
        for (let i = 0; i < cartItems.length && !productFound; i++) {
            const element = cartItems[i];
            const elementSlug = element.cartProduct.slug;

            if (elementSlug === product.slug) {
                productFound = true;
                productIndex = i;
            }
        }

        if (productFound) {
            setCartItems(current => {
                let currentCartItems = [...current];
                currentCartItems[productIndex].quantity += 1;
                return currentCartItems;
            })
        } else {
            setCartItems(current => {
                let currentCartItems = [...current];
                currentCartItems.push({ cartProduct: product, quantity: 1 })
                return currentCartItems;
            })


        }
    }
    const removeFromCart = (product) => {
        let productIndex = 0;
        let productFound = false;

        for (let i = 0; i < cartItems.length && !productFound; i++) {
            const element = cartItems[i];
            const elementSlug = element.cartProduct.slug;

            if (elementSlug === product.slug) {
                productFound = true;
                productIndex = i;
            }
        }

        if (productFound) {
            setCartItems(current => {
                let currentCartItems = [...current];
                currentCartItems[productIndex].quantity -= 1;
                if (currentCartItems[productIndex].quantity === 0) {
                    currentCartItems.splice(productIndex, 1)
                }
                return currentCartItems;
            })
        } else {
            return;
        }
    }


    const value = { cartItems, addToCart, removeFromCart };
    return (
        <CartContext value={value}>{children}</CartContext>


    )
}

export {
    CartProvider,
    CartContext
}
