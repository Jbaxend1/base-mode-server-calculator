const express = require('express');
const app = express();
const port = process.env.PORT || 5004;

app.use(express.static('server/public'));

app.use(express.urlencoded());


// Add a place to store equation data
const equationsArray = [
    {
        numOne: 4,
        opp: 'x',
        numTwo: 4
    },
    {
        numOne: 5,
        opp: '/',
        numTwo: 5
    }
];

// add GET to reach the equation data.
app.get('/equations', (req, res) => {
    res.send(equationsArray)
});

app.post('/equations', (req, res) => {
    const newEquation = req.body;

    equationsArray.push(newEquation);

    res.send(newEquation);
});


app.listen(port, () => {
    console.log('listening on port', port);
})