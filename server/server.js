const express = require('express');
const app = express();
const port = process.env.PORT || 5004;

app.use(express.static('server/public'));

app.use(express.urlencoded());

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

app.get('/equations', (req, res) => {
    res.send(equationsArray)
});




app.listen(port, () => {
    console.log('listening on port', port);
})