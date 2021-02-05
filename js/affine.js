function encipher(multiplicativeKey, additiveKey, plainText)
{
    if (multiplicativeKey > 25 || multiplicativeKey < 1 || multiplicativeKey % 2 == 0 || multiplicativeKey == 13) {
        return "Please enter a valid multiplicative key (odd number between 1 to 25 not including 13)"
    } else {
        var stringInput = plainText.toString();
        stringInput = stringInput.replace(/\W/ig, "").toUpperCase();
        var chars = stringInput.split("");
        
        for (i = 0; i < chars.length; i++)
        {
            var temp = chars[i].charCodeAt(0) - 64;
            var multiplicativeValue = (temp * multiplicativeKey) % 26;

            if (multiplicativeValue == 0) 
                multiplicativeValue += 26;
            if (additiveKey < 0)  
                additiveKey = (additiveKey % 26) + 26;

            var finalValue = (multiplicativeValue + additiveKey) % 26;

            if (finalValue == 0)
                finalValue = 26;

            chars[i] = String.fromCharCode(finalValue + 64);
        }
        return chars.join("").replace(/(.{5})/g, '$1 ');
    }
}