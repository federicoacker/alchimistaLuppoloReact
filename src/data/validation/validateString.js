export function validateString(value) {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) || typeof value !== "string" || value.trim().length === 0) {
        return null;
    }

    return value.trim();
}

export function validateNumberString(value){
    if (typeof value !== "string" || value.trim().length === 0) {
        return null;
    }

    return value.trim();
}