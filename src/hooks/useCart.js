import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function useCart() {
    const cartValues = useContext(CartContext);
    if (cartValues === null) {

        throw new Error("cart provider non inserito");

    } else {
        return cartValues;
    }
}

export default useCart;