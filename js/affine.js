//Encipher plaintext using affine cipher method
function affineEncipher(multiplicativeKey, additiveKey, plainText, rev)
{
    multiplicativeKey = math.mod(multiplicativeKey, 26);
    additiveKey = math.mod(additiveKey, 26);
    rev = false;

    if (math.mod(multiplicativeKey, 2) == 0 || multiplicativeKey == 13)
        return null;
       
    var stringInput = plainText.toString();
    stringInput = stringInput.replace(/\W/ig, "").toUpperCase();
    var chars = stringInput.split("");
        
    for (i = 0; i < chars.length; i++)
    {
        var char = chars[i].charCodeAt(0) - 64;

        if (!rev){
             var multiplicativeValue = math.mod(char * multiplicativeKey, 26);
                if (multiplicativeValue == 0)
                    multiplicativeValue = 26;
                char = math.mod(multiplicativeValue + additiveKey, 26);
        }else{
            var additiveValue = math.mod(char + additiveKey, 26);
                    if (additiveValue == 0)
                        additiveValue = 26;
                    char = math.mod(additiveValue * multiplicativeKey, 26);
        }

        if (char == 0)
            char = 26;

        chars[i] = String.fromCharCode(char + 64);
    }

    return chars.join("");
}


//Decipher ciphertext to plaintext
function affineDecipher(multiplicativeKey, additiveKey, plainText, rev)
{
    multiplicativeKey = math.mod(multiplicativeKey, 26);
    additiveKey = math.mod(additiveKey, 26);
    rev = false

    const mValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    const inverseValues = [1, 9, 21, 15, 3, 19, 7, 23, 11, 5, 17, 25];
    
    if (math.mod(multiplicativeKey, 2) == 0 || multiplicativeKey == 13)
        return null;
    
    var multiplicativeInverse = inverseValues[mValues.indexOf(multiplicativeKey)];
    
    var stringInput = plainText.toString();
    stringInput = stringInput.replace(/\W/ig, "").toUpperCase();
    var chars = stringInput.split("");
     
    for (var i = 0; i < chars.length; i++)
    {
        var char = chars[i].charCodeAt(0) - 64;

        if (!rev){
            var undoAddition = math.mod(char - additiveKey, 26);

                if (undoAddition == 0)
                    undoAddition = 26;

                char = math.mod(undoAddition * multiplicativeInverse, 26);
        }else{
            var undoMultiplication = math.mod(char * multiplicativeInverse, 26);

                if (undoMultiplication == 0)
                    undoMultiplication = 26;

                char = math.mod(undoMultiplication - additiveKey, 26)
        }

        if (char == 0)
        char = 26;
        
        chars[i] = String.fromCharCode(char + 64);
    }

    return chars.join("");
}
