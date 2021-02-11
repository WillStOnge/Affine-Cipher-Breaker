// Setup onclick listener for the known plaintext attack button.
$("#plaintext-attack").click(function() {
    // Upper case and cleanse input of non alphabetical characters.
    var matches = knownPlaintext($("#input").val().replace(/\W/ig, "").toUpperCase(), $("#keyword").val());

    if (matches == null)
    {
        halfmoon.initStickyAlert({
            content: "An error occured trying to perform the plaintext attack.",
            title: "Another alert",
            alertType: "alert-danger",
            timeShown: 5000
        });
    }
    else if (matches.length == 0)
        $("#keyword-table").html("<p class=\"text-center\">No matches found</p>");
    else
        buildTable(matches);
});

//.replace(/(.{5})/g, '$1 ') -> add whitespace after each 5th element