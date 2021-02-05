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
        var temp = chars[i].charCodeAt(0) - 64;
        var multiplicativeValue = math.mod((temp * multiplicativeKey), 26);

        if (multiplicativeValue == 0) 
            multiplicativeValue = 26;

        var finalValue = math.mod((multiplicativeValue + additiveKey), 26);

        if (finalValue == 0)
            finalValue = 26;

        chars[i] = String.fromCharCode(finalValue + 64);
    }

    return chars.join("");
}