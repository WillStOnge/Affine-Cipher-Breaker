// This will contain the encipher and decipher functions
function encipher(multiplicativeKey, additiveKey, plainText)
{
    // if multiplicativeKey is not between 1 - 25 or not an odd number or 13 then function will return a message asking user to input valid multiplicative key
    if (multiplicativeKey> 25 || multiplicativeKey < 1 || multiplicativeKey % 2 == 0 || multiplicativeKey == 13){
        return "Please enter a valid multiplicative key (odd number between 1 to 25 not including 13)"
    }else{

        var plainText = plainText.toString();            // convert plaintext into String
        plaintText = plainText.replace(/\W/ig, '').toUpperCase();     // strip non alphabet characters from plaintext then convert them to upper case
        var chars = plainText.split('');                 // split plaintext into an array of characters     
        
        for (i=0; i < chars.length - 1; i++){                                       // loop through the chars array
            var temp = chars[i].charCodeAt(0) - 64;                                 // initialize variable temp with the unicode value of the character - 64 (ex: A = 65-64 = 1) 
            var multiplicativeValue = (temp * multiplicativeKey) % 26;              // initialize the multiplicative value with temp multiply by multiplicative key mod 26
            if (multiplicativeValue == 0) var cipherTextValue = cipherTextValue + 26;    // if the result of multiplicative operation is 0, then add 26 to the result to make it positive value of mod 26   
            if (additiveKey < 0)  additiveKey = (additiveKey % 26) + 26;            // if the additive key is negative then add 26 to get positive value of mod 26   
            var finalValue = (multiplicativeValue + additiveKey) % 26;              // set the final value (using affine formula) to the result of multiplicative operation + additive key value mod 26 
            if (finalValue == 0) finalValue + 26;
            chars[i] = String.fromCharCode(finalValue + 64);                        // set character at index i to the unicode character using the value from final value (reversing the unicode value to a character)
        }

        var resultString = chars.toString();                    // convert array of characters to string
        resultString = resultString.replace(/,/g, '')           // strip all the commas from the result string
        resultString = resultString.replace(/(.{5})/g, '$1');   // add a white space (blank space) after the end of the 5th characters followed the rest of the characters (ex: ABCDE FGH)
                           
    }return resultString;
}