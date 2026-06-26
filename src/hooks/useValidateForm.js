import { validateNumberString, validateString } from "../data/validation/validateString.js";
import validateFloatNumber from "../data/validation/validateFloatNumber.js";
import validateNumber from "../data/validation/validateNumber.js";
import { validateSlug } from "../data/validation/validateSlug.js";
import dataTypes from "../data/validation/dataTypes.js";
import { useState, useEffect } from "react";

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

export function useValidateForm(formObject, needsValidation) {
    const [isFormValidated, setIsFormValidated] = useState(
        {
            first_name: "",
            last_name: "",
            city: "",
            address_line_1: "",
            postal_code: "",
            email: "",
            phone: "",
            date_of_birth: "",
            other_errors: []
        }
    )

    useEffect(() => {
        if (needsValidation) {
            const { validated, errors } = validateForm(formObject);
            setIsFormValidated({ validated, errors });
        }
    }, [formObject, needsValidation])

    return isFormValidated;
}

function switchValidator(key, formObject, validationErrors) {
    let result;

    switch (key) {
        case "first_name":
            result = validateString(formObject[key]);
            if (!result || result.length > 150) {
                validationErrors.first_name = "Il nome inserito non è valido";
            }
            break;

        case "last_name":
            result = validateString(formObject[key]);
            if (!result || result.length > 150) {
                validationErrors.last_name = "Il cognome inserito non è valido";
            }
            break;

        case "city":
            result = validateString(formObject[key]);
            if (!result || result.length > dataTypes.VARCHAR_255) {
                validationErrors.city = "La città inserita non è valida";
            }
            break;

        case "address_line_1":
            result = validateString(formObject[key]);
            if (!result || result.length > dataTypes.VARCHAR_255) {
                validationErrors.address_line_1 = "L'indirizzo inserito non è valido";
            }
            break;

        case "postal_code":
            result = validateNumberString(formObject[key]);
            if (!result || result.length > 5) {
                validationErrors.postal_code = "Il codice postale inserito non è valido";
            }
            break;

        case "email":
            result = validateString(formObject[key]);
            if (!result || result.length > dataTypes.VARCHAR_255 || !isValidEmail(result)) {
                validationErrors.email = "L'email inserita non è valida";
            }
            break;

        case "phone":
            result = validateNumberString(formObject[key]);
            if (!result || result.length > 15) {
                validationErrors.phone = "Il numero di telefono inserito non è valido";
            }
            break;

        case "date_of_birth":
            result = validateNumberString(formObject[key]);
            if (!result || !isValidDate(result)) {
                validationErrors.date_of_birth = "La data di nascita inserita non è valida";
            }
            break;

        case "total_price":
            result = validateFloatNumber(formObject[key]);
            if (result === null || result !== (formObject["shipping_price"] + formObject["products_price"]) || result > dataTypes.TOTAL_PRICE) {
                validationErrors.other_errors.push("Il total price inserito non è valido");
            };
            break;
        case "shipping_price":
            result = validateFloatNumber(formObject[key]);
            if (result === null) {
                validationErrors.other_errors.push("Lo shipping price inserito non è valido");
            }
            break;
        case "products_price":
            if (!isValidPrice(formObject[key])) {
                validationErrors.other_errors.push(`Il campo ${key} non è valido`);
            }
            break;

        case "status":
            result = validateString(formObject[key]);
            if (!result || !dataTypes.STATUS.includes(result)) {
                validationErrors.other_errors.push("Lo status inserito non è valido");
            }
            break;

        case "products":
            if (!Array.isArray(formObject[key]) || formObject[key].length === 0) {
                validationErrors.other_errors.push("I prodotti inseriti non sono validi");
            }
            for (const product of formObject[key]) {
                if (!product || typeof product !== "object") {
                    validationErrors.other_errors.push("I dati dei prodotti inseriti non sono validi");
                }
                const productSlug = validateSlug(product.product_slug);
                const quantity = validateNumber(product.quantity);
                if (!productSlug || quantity === null || quantity <= 0) {
                    validationErrors.other_errors.push("I dati dei prodotti inseriti non sono validi");
                }
            }
            break;

        default:
            break;
    }

    return validationErrors;
}

export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidDate(value) {
    const date = new Date(value);
    const today = new Date();
    const today_year = today.getFullYear();
    const year = date.getFullYear();
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

function validateForm(formObject) {
    const orderFieldsReceived = new Set(Object.getOwnPropertyNames(formObject));

    const extraFields = [...orderFieldsReceived].filter(field => !validOrderFields.has(field));
    const missingFields = [...validOrderFields].filter(field => !orderFieldsReceived.has(field));

    let validationErrors = {
        first_name: "",
        last_name: "",
        city: "",
        address_line_1: "",
        postal_code: "",
        email: "",
        phone: "",
        date_of_birth: "",
        other_errors: []
    };

    if (missingFields.length !== 0) {
        validationErrors.other_errors.push(`Mancano i campi: ${missingFields.join(", ")}`);
    }

    if (extraFields.length !== 0) {
        validationErrors.other_errors.push(`Ci sono campi extra: ${extraFields.join(", ")}`);
    }

    for (const key of Object.getOwnPropertyNames(formObject)) {
        validationErrors = switchValidator(key, formObject, validationErrors);
    }
    for (const key of Object.getOwnPropertyNames(validationErrors)) {
        if (validationErrors[key].length !== 0) {
            return { validated: false, errors: validationErrors };
        }
    }

    return { validated: true, errors: null };

}

export default useValidateForm