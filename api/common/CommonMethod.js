const autoIncrementCode = (code,firstC) => {
    let codeTail = parseInt(code.slice(-4));
    if(isNaN(codeTail)){
        codeTail = 0;
    }
    codeTail++;
    let number = 5;
    if (codeTail > 9){
        number = 6;
    }else if (codeTail > 99){
        number = 7;
    }

    const newCode = firstC+`${codeTail}`.padStart((number-`${codeTail}`.length),0);
    return newCode;
    
}

module.exports = {
    autoIncrementCode
}