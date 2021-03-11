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

        if (rev)
        {
            var additiveValue = math.mod(char + additiveKey, 26);

            if (additiveValue == 0)
                additiveValue = 26;

            char = math.mod(additiveValue * multiplicativeKey, 26);
        }
        else
        {
            var multiplicativeValue = math.mod(char * multiplicativeKey, 26);

            if (multiplicativeValue == 0)
                multiplicativeValue = 26;
                
            char = math.mod(multiplicativeValue + additiveKey, 26);
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

        if (!rev)
        {
            var undoMultiplication = math.mod(char * multiplicativeInverse, 26);

            if (undoMultiplication == 0)
                undoMultiplication = 26;

            char = math.mod(undoMultiplication - additiveKey, 26)
        }
        else
        {
            var undoAddition = math.mod(char - additiveKey, 26);

            if (undoAddition == 0)
                undoAddition = 26;

            char = math.mod(undoAddition * multiplicativeInverse, 26);
        }

        if (char == 0)
            char = 26;
        
        chars[i] = String.fromCharCode(char + 64);
    }

    return chars.join("");
}

// Performs a known plaintext attack on a given cipher text.
function affineKnownPlaintext(ciphertext, keyword="THE")
{
  if (ciphertext == "" || keyword == "")
    return null;
  
  const mValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
  const bValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

  var results = [];

  // Iterate through the allowed m and b values and find any matches.
  mValues.forEach(m => {
    bValues.forEach(b => {
      var enciphered = affineEncipher(m, b, keyword);

      if (ciphertext.includes(enciphered))
        results.push([enciphered, m, b]);
    });
  });

  return results;
}

function affineCongruencySystems(c1, p1, c2, p2){
    const mValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    const inverseValues = [1, 9, 21, 15, 3, 19, 7, 23, 11, 5, 17, 25];
    
    var m, b, ctemp, ptemp;
    
    /*Solve for m*/    
    ptemp = math.mod((p1-p2), 26);
    
    //find p(diff)^-1
    if(mValues.indexOf(ptemp) >= 0)
        ptemp = inverseValues[mValues.indexOf(ptemp)];
  
    ctemp = math.mod((c1-c2), 26);
    
    m = ctemp*ptemp;
    m = math.mod(m, 26);
    
    /* Solve for b*/
    b = math.mod((c1 - p1*m), 26);
    var values = [m, b];
    return values;   
}
