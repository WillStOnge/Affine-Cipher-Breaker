// Setup onclick listener for the known plaintext attack button.
$("#plaintext-attack").click(function() {
    // Upper case and cleanse input of non alphabetical characters.
    var matches = affineKnownPlaintext($("#input").val().replace(/\W/ig, "").toUpperCase(), $("#keyword").val());

    if (matches == null)
        halfmoon.initStickyAlert({
            content: "The keyword or input field is empty.",
            title: "Error",
            alertType: "alert-danger",
            timeShown: 3000
        });
    else if (matches.length == 0)
        $("#keyword-table").html("<p class=\"text-center\">No matches found</p>");
    else
        buildTable(matches);
});

// Calculates word count when input is updated.
$('#input').keyup(function() {
    $('#input_count').text("Word Count: " + $('#input').val().length);
});

// Open the modal and generate the frequency analysis chart.
$('#freq_button').click(function() {
    createChart($('#freq_chart'), $('#input').val());
    
    halfmoon.toggleModal('modal-freq');
});

//.replace(/(.{5})/g, '$1 ') -> add whitespace after each 5th element