const express = require('express');
const app = express();
const port = process.env.PORT || 5004;

app.use(express.static('server/public'));

app.use(express.urlencoded());

// Add a place to store equation data
const equationsArray = [];

// add GET to reach the equation data.
app.get('/equations', (req, res) => {
    res.send(equationsArray)
});

app.post('/equations', (req, res) => {
    const newEQ = req.body;

    let x = parseInt(newEQ.numOne);
    let y = parseInt(newEQ.numTwo);
    // console.log(x);
    // console.log(y);

    let sum = 0;
    
    if(newEQ.opp === '+') {
        sum = x + y;
    }
    if(newEQ.opp === '-') {
        sum = x - y;
    }
    if(newEQ.opp === '*') {
        sum = x * y;
    }
    if(newEQ.opp === '/') {
        sum = x / y;
    }
    if(newEQ.opp === ''){
        sum = null;
    }

    result = {
        answer: sum,
    };

    newEQ.answer = sum.toLocaleString("en-US");

    equationsArray.push(newEQ);

    res.send(result);
});


app.listen(port, () => {
    console.log('listening on port', port);
})