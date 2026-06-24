export default function validateFloatNumber(value){
    const parsedValue = Number(value);
    if(value === undefined || value === null || value === ""){
        return null;
    }

    if(Number.isNaN(parsedValue)){  
        return null;
    }
    return parsedValue
}