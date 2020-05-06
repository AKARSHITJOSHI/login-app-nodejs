//Home Controller
var express = require("express");
var app = express();

var bodyParser = require('body-parser');

var connection = require('./config');

var authenticateController = require('./authenticateController');
var registerController = require('./registerController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendfile('login.html');
});

app.post('/auth', (req, res) => {
    authenticateController.authenticate(req, res);
});

app.get('/signup', (req, res) => {
    res.sendfile('signup.html');
});

app.post('/register', (req, res) => {
    registerController.register(req, res);
});
/*app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
*/
app.listen(3000, () => {
    console.log("Server running on port 3000");
});