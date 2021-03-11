// Setup onclick listener for the known plaintext attack button.
$("#plaintext-attack").click(function() {
    // Upper case and cleanse input of non alphabetical characters.
    var input = $("#input").val().replace(/\W/ig, "").toUpperCase();
    var cipherType = $("#cipher").val();
    var stub = $("#keyword").val();
    var matches;
    
    if (cipherType === "affine")
        matches = affineKnownPlaintext(input, stub);
    else
    {
        halfmoon.initStickyAlert({
            content: "The keyword or input field is empty.",
            title: "Error",
            alertType: "alert-danger",
            timeShown: 3000
        });
    }

    if (matches === null)
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

// When the encipher button is clicked.
$('#encipher_button').click(function() {
    var input = $("#input").val().replace(/\W/ig, "").toUpperCase();
    var cipherType = $("#cipher").val();
    var output = null;

    if (cipherType === "affine")
    {
        var m = $("#mKey").val();
        var b = $("#bKey").val();

        output = affineEncipher(m, b, input);
    }
    else
    {
        halfmoon.initStickyAlert({
            content: "Cipher does not support this operation.",
            title: "Error",
            alertType: "alert-danger",
            timeShown: 3000
        });
    }

    if (output !== null)
    {
        $("#output").text(output.replace(/(.{5})/g, '$1 '));
        $('#output_count').text("Letter Count: " + output.length);
    }
});

// When the decipher button is clicked.
$('#decipher_button').click(function() {
    var input = $("#input").val().replace(/\W/ig, "").toUpperCase();
    var cipherType = $("#cipher").val();
    var output;

    if (cipherType === "affine")
    {
        var m = $("#mKey").val();
        var b = $("#bKey").val();
        
        output = affineDecipher(m, b, input);
    }
    else
    {
        halfmoon.initStickyAlert({
            content: "Cipher does not support this operation.",
            title: "Error",
            alertType: "alert-danger",
            timeShown: 3000
        });
    }

    if (output !== null)
    {
        $("#output").text(output.replace(/(.{5})/g, '$1 '));
        $('#output_count').text("Letter Count: " + output.length);
    }
});

// Calculates letter count when input is updated.
$('#input').keyup(function() {
    $('#input_count').text("Letter Count: " + $('#input').val().length);
});

// Open the modal and generate the frequency analysis chart.
$('#freq_button').click(function() {
    // Clear the canvas
    var canvas = $('#freq_chart')[0];
    canvas.width = canvas.width;

    createChart($('#freq_chart'), $('#input').val());
    
    halfmoon.toggleModal('modal-freq');
});

// Solves the system of congruences in the frequency analysis modal.
$('#solve').click(function() {
    var p1, p2, c1, c2;

    try
    {
        p1 = Number($('#p1').val().charCodeAt(0)) - 64;
        p2 = Number($('#p2').val().charCodeAt(0)) - 64;
        c1 = Number($('#c1').val().charCodeAt(0)) - 64;
        c2 = Number($('#c2').val().charCodeAt(0)) - 64;
    }
    catch (e)
    {
        halfmoon.initStickyAlert({
            content: "Invalid input",
            title: "Error",
            alertType: "alert-danger",
            timeShown: 3000
        });
        return;
    }

    var res = affineCongruencySystems(c1, p1, c2, p2);

    $('#congruency').text("The multiplicative key is " + res[0] + " and the additive key is " + res[1]);
});

$('document').ready(function() {
    $('#year').text(new Date().getFullYear());
    $('#input_count').text("Letter Count: " + $('#input').val().length);
});
