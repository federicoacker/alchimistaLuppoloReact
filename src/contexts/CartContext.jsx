
import { createContext, useState, useEffect } from "react";


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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const sumOfItems = cartItems.reduce((accumulator, item) => {

        const itemPrice = item.cartProduct.price;
        const itemQuantity = item.quantity;

        // Moltiplichiamo il prezzo per la quantità e sommiamo al totale accumulato
        return accumulator + (itemPrice * itemQuantity);
    }, 0);

    let shippingPrice = 0;


    if (cartItems.length > 0) {
    
        if (sumOfItems > 20) {
            shippingPrice = 0;
        } else {
            shippingPrice = 5;
        }
    } 


    const productsPrice = sumOfItems;

    const totalPrice = sumOfItems + shippingPrice;


    const value = { cartItems, addToCart, removeFromCart, show, handleClose, handleShow, totalPrice, shippingPrice, productsPrice };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>


    )
}

export {
    CartProvider,
    CartContext
}
