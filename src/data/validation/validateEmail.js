function validateEmail(value){
   if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
    return value;
   }
    return null;
;
}

export default validateEmail;