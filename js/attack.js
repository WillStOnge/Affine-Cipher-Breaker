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

// Builds the table for the results of the known plaintext attack.
function buildTable(matches)
{
  var matchesHtml = "";

  matches.forEach(match => {
    // Filter out m=1, b=0 since that key does no transformation.
    if (match[1] != 1 || match[2] != 0)
    {
      matchesHtml += "<tr>\
        <td>" + match[0] + "</td>\
        <td>" + match[1] + "</td>\
        <td>" + match[2] + "</td>\
      </tr>"
    }
  });

  $("#keyword-table").html("<table class=\"table mt-20\">\
    <thead>\
      <tr>\
        <th>Ciphertext Keyword</th>\
        <th>Multiplicative Key</th>\
        <th>Additive Key</th>\
      </tr>\
    </thead>\
    <tbody>" + matchesHtml +
    "</tbody>\
  </table>");
}

/*
$("#freqModel").load("ajax/freq.html", function( response, status, xhr ) {
  if ( status == "error" ) 
  {
    halfmoon.initStickyAlert({
      content: "An error occured trying to load an internal resourse.",
      title: "Another alert",
      alertType: "alert-danger"
      timeShown: 5000
    });
  }
});
*/