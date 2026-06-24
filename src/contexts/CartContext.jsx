import React from "react";
import { createContext, useState, useEffect } from "react";
import { preloadModule } from "react-dom";

const CartContext = createContext(null);

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");

        if (!savedCart) {
            return [];
        }

        try {
            return JSON.parse(savedCart);
        } catch (error) {
            localStorage.removeItem("cartItems");
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(current => {
            const productIndex = current.findIndex(item => {
                return item.cartProduct?.slug === product.slug;
            });

            if (productIndex !== -1) {
                const currentCartItems = [...current];

                currentCartItems[productIndex] = {
                    ...currentCartItems[productIndex],
                    quantity: currentCartItems[productIndex].quantity + 1,
                };

                return currentCartItems;
            }

            return [
                ...current,
                {
                    cartProduct: product,
                    quantity: 1,
                },
            ];
        });
    };
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
        <CartContext.Provider value={value}>{children}</CartContext.Provider>


    )
}

export {
    CartProvider,
    CartContext
}
