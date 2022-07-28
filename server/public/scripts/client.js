$(readyNow);

function readyNow () {
    // console.log('JQ ready');

    // Click Handlers
    $('#equal-submit').on('click', submitEquals);
    $('.opperator').on('click', opperatorClick);

}

function submitEquals () {
    // console.log('in submitEquals');
    // Take the input values and operator data and send
    // to the server

    $.ajax({
        type: 'POST',
        url: '/equations',
        data: {
            numOne: $('.firstNum').val(),
            opp: $('.opperator').val(),
            numTwo: $('.secondNum').val(),
        }
    }).then(function(response) {
        // console.log(response);
        getEquations();
    });
}

function getEquations () {
    $.ajax({
        type: 'GET',
        url: '/equations'
    }).then(function(response) {
        for (let i = 0; i < response.length; i++) {
            let equals = response[i];
            $('#history').append(`
            <ul>
                <li>${equals.numOne} ${equals.opp} ${equals.numTwo}
            </ul>
        `)
        }
    })
};

function opperatorClick () {
    let opp = $(this).data('mode');

    console.log(opp);

}

