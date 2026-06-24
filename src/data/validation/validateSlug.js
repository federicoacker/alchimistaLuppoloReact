import { validateString } from "./validateString.js";

export function validateSlug(value){
    const validatedValue = validateString(value);

    if(/^\d+$/.test(validatedValue)){
        return null;
    }

    return validatedValue;
}