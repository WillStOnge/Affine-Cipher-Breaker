function encipher(multiplicativeKey, additiveKey, plainText)
{
    multiplicativeKey = math.mod(multiplicativeKey, 26);
    additiveKey = math.mod(additiveKey, 26);

    if (multiplicativeKey % 2 == 0 || multiplicativeKey == 13)
        return null;
       
    var stringInput = plainText.toString();
    stringInput = stringInput.replace(/\W/ig, "").toUpperCase();
    var chars = stringInput.split("");
        
    for (i = 0; i < chars.length; i++)
    {
        var char = chars[i].charCodeAt(0) - 64;
        var multiplicativeValue = math.mod(char * multiplicativeKey, 26);

        if (multiplicativeValue == 0) 
            multiplicativeValue = 26;

        char = math.mod(multiplicativeValue + additiveKey, 26);

        if (char == 0)
        char = 26;

        chars[i] = String.fromCharCode(char + 64);
    }

    return chars.join("");
}

function decipher(multiplicativeKey, additiveKey, plainText)
{
    multiplicativeKey = math.mod(multiplicativeKey, 26);
    additiveKey = math.mod(additiveKey, 26);

    const mValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    const inverseValues = [1, 9, 21, 15, 3, 19, 7, 23, 11, 5, 17, 25];
    
    if (multiplicativeKey % 2 == 0 || multiplicativeKey == 13)
        return null;
    
    var multiplicitiveInverse = inverseValues[mValues.indexOf(multiplicativeKey)];
    
    var stringInput = plainText.toString();
    stringInput = stringInput.replace(/\W/ig, "").toUpperCase();
    var chars = stringInput.split("");
     
    for (var i = 0; i < chars.length; i++)
    {
        var char = chars[i].charCodeAt(0) - 64;
        var undoAddition = math.mod(char - additiveKey, 26);
        
        if (undoAddition == 0) 
            undoAddition = 26;
            
        char = math.mod(undoAddition * multiplicitiveInverse, 26);
         
        if (char == 0)
        char = 26;
        
        chars[i] = String.fromCharCode(char + 64);
    }

    return chars.join("");
}
