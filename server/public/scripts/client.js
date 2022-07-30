$(readyNow);

function readyNow () {
    // console.log('JQ ready');

    // Click Handlers
    $('#equal-submit').on('click', submitEquals);
    $('.opperator').on('click', opperatorClick);
    $('.clear').on('click', submitClear);

}

// This function is returning the array of equations as a response.
function submitEquals () {
    // console.log('in submitEquals');

    // Take the input values and operator data and send
    // to the server
    
    $.ajax({
        type: 'POST',
        url: '/equations',
        data: {
            numOne: $('.firstNum').val(),
            opp: opperator,
            numTwo: $('.secondNum').val(),
            answer: '',
        }
    }).then(function(response) {
        // console.log(response);
        console.log(response.answer);

        // handler if no opperator is selected
        if(response.answer === null){
            $('#new-result').text(`
                No Opperation Selected
            `)
        } else {
            $('#new-result').text(`
            ${response.answer}
        `);
        }
        // call to get the updated equation array
        getEquations();
    });
}


// This function is "Getting" the array of equations from the server and displaying on the DOM
function getEquations () {
    $.ajax({
        type: 'GET',
        url: '/equations'
    }).then(function(response) {
        $('#history').empty();
        for (let i = 0; i < response.length; i++) {
            let equals = response[i];
            $('#history').append(`
            <ul>
                <li>${equals.numOne} ${equals.opp} ${equals.numTwo} = ${equals.answer}</li>
            </ul>
        `)
        };

        // $('#new-result').text(`
        //     ${response}
        // `);
    })
};

// This next function and variable allows for capture of the opperator button clicks via .data('mode') to be sent to the server used in the 'POST'.  

let opperator = '';

function opperatorClick () {
    let opp = $(this).data('mode');
    opperator = opp;
}

// Function that handles clearing the inputs, opperator and "new-result" div.
function submitClear() {
    // console.log('in submitClear');
    $('#new-result').empty();
    $('.firstNum').val('');
    $('.secondNum').val('');
    opperator = '';
}
