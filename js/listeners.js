// Setup onclick listener for the known plaintext attack button.
$("#plaintext-attack").click(function() {
    // Upper case and cleanse input of non alphabetical characters.
    var matches = knownPlaintext('OEYJJ LYQMJ ODYPS IJIDI OXYIB QBYGY UUOLW DKDZY UYGML IDWKH OHLYY UDODY DZYLI QZDKH DZYTY KTJYD KAYYT OBPXY OLOLS UUZOJ JBKDX YIBHL IBQYP', $("#keyword").val());

    if (matches.length == 0)
        $("#keyword-table").html("<p class=\"text-center\">No matches found</p>");
    else
        buildTable(matches);
});