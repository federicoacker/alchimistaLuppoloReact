export default function validateNumber(value){
    const parsedValue = Number(value);
    if(value === undefined || value === null || value === ""){
        return null;
    }

    if(Number.isNaN(parsedValue) || !Number.isInteger(parsedValue)){  
        return null;
    }
    return parsedValue
}