const express = require('express');
const app = express();
const fast2sms = require('fast-two-sms')
var unirest = require('unirest');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log("Hello");
    res.render('index.ejs');
});

app.post('/sendMessage', (req, res) => {

    console.log(req.body);
    //const response = await fast2sms.sendMessage({ authorization: process.env.API_KEY, message: req.body.message, numbers: req.body.number });
    // const response = await fast2sms.sendMessage({ authorization: process.env.API_KEY, message: 'Hello', numbers: ['9096779493', '9987731933'] });
    // res.send(response);
    // console.log(response);

    var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

    req.headers({
        "authorization": process.env.API_KEY
    });

    req.form({
        "variables_values": "4567",
        "route": "otp",
        "numbers": "9987731933,9833484167,9096779493",
    });

    req.end(function (res) {
        console.log(res.body);
        if (res.error) throw new Error(res.error);
    });
    
    res.send(res.body);
});

app.listen(2022, (req, res) => {
    console.log("Server is listening on port no 2022");
});