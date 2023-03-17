const autoIncrementCode = (code,firstC) => {
    let codeTail = parseInt(code.slice(-4));
    if(isNaN(codeTail)){
        codeTail = 0;
    }
    codeTail++;
    const newCodeTail = String(codeTail);
    const newCode = firstC+newCodeTail.padStart((5-newCodeTail.length),0);
    return newCode;
    
}

module.exports = {
    autoIncrementCode
}