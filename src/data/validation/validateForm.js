import { validateNumberString, validateString } from "./validateString";
import validateFloatNumber from "./validateFloatNumber";
import validateNumber from "./validateNumber";
import { validateSlug } from "./validateSlug.js";
import dataTypes from "./dataTypes";

const validOrderFields = new Set(
    [
        "first_name",
        "last_name",
        "city",
        "address_line_1",
        "postal_code",
        "email",
        "phone",
        "date_of_birth",
        "total_price",
        "shipping_price",
        "products_price",
        "status",
        "products"
    ]
);

export function validateForm(formObject) {
    const errors = [];

    const orderFieldsReceived = new Set(Object.getOwnPropertyNames(formObject));

    const extraFields = [...orderFieldsReceived].filter(field => !validOrderFields.has(field));
    const missingFields = [...validOrderFields].filter(field => !orderFieldsReceived.has(field));

    if (missingFields.length !== 0) {
        errors.push(`Mancano i campi: ${missingFields.join(", ")}`);
    }

    if (extraFields.length !== 0) {
        errors.push(`Ci sono campi extra: ${extraFields.join(", ")}`);
    }

    for (const key of Object.getOwnPropertyNames(formObject)) {
        const validatorResult = switchValidator(key, formObject);

        if (validatorResult) {
            errors.push(validatorResult);
        }
    }

    if(errors.length > 0){
        console.error(errors);
        return false;
    }
    return true;
}

function switchValidator(key, formObject) {
    let result;

    switch (key) {
        case "first_name":
            result = validateString(formObject[key]);
            if (!result || result.length > 150) {
                return "Il nome inserito non è valido";
            }
            break;

        case "last_name":
            result = validateString(formObject[key]);
            if (!result || result.length > 150) {
                return "Il cognome inserito non è valido";
            }
            break;

        case "city":
            result = validateString(formObject[key]);
            if (!result || result.length > dataTypes.VARCHAR_255) {
                return "La città inserita non è valida";
            }
            break;

        case "address_line_1":
            result = validateString(formObject[key]);
            if (!result || result.length > dataTypes.VARCHAR_255) {
                return "L'indirizzo inserito non è valido";
            }
            break;

        case "postal_code":
            result = validateNumberString(formObject[key]);
            if (!result || result.length > 20) {
                return "Il codice postale inserito non è valido";
            }
            break;

        case "email":
            result = validateString(formObject[key]);
            if (!result || result.length > dataTypes.VARCHAR_255 || !isValidEmail(result)) {
                return "L'email inserita non è valida";
            }
            break;

        case "phone":
            result = validateNumberString(formObject[key]);
            if (!result || result.length > 15) {
                return "Il numero di telefono inserito non è valido";
            }
            break;

        case "date_of_birth":
            result = validateNumberString(formObject[key]);
            if (!result || !isValidDate(result)) {
                return "La data di nascita inserita non è valida";
            }
            break;

        case "total_price":
            result = validateFloatNumber(formObject[key]);
            console.log(formObject["shipping_price"], formObject["products_price"], formObject["total_price"]);
            if(result === null || result !== (formObject["shipping_price"] + formObject["products_price"]) || result > dataTypes.TOTAL_PRICE){ 
                return "Il total price inserito non è valido"
            };
            break;
        case "shipping_price":
            result = validateFloatNumber(formObject[key]);
            if(result === null){
                return "Lo shipping price inserito non è valido";
            }
            break;
        case "products_price":
            if (!isValidPrice(formObject[key])) {
                return `Il campo ${key} non è valido`;
            }
            break;

        case "status":
            result = validateString(formObject[key]);
            if (!result || !dataTypes.STATUS.includes(result)) {
                return "Lo status inserito non è valido";
            }
            break;

        case "products":
            if (!Array.isArray(formObject[key]) || formObject[key].length === 0) {
                return "I prodotti inseriti non sono validi";
            }
            for (const product of formObject[key]) {
                if (!product || typeof product !== "object") {
                    return "I dati dei prodotti inseriti non sono validi";
                }
                const productSlug = validateSlug(product.product_slug);
                const quantity = validateNumber(product.quantity);
                if (!productSlug || quantity === null || quantity <= 0) {
                    return "I dati dei prodotti inseriti non sono validi";
                }
            }
            break;

        default:
            break;
    }
}

export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidDate(value) {
    const date = new Date(value);
    const today = new Date();
    const today_year = today.getFullYear();
    const year = date.getFullYear();
    console.log(today_year, year);
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value)) && today_year - year > 18;
}

function isValidPrice(value) {
    const parsedValue = Number(value);

    if (value === undefined || value === null || value === "") {
        return false;
    }

    if (isNaN(parsedValue)) {
        return false;
    }

    if (parsedValue < 0 || parsedValue > dataTypes.TOTAL_PRICE) {
        return false;
    }

    return true;
}

export default validateForm