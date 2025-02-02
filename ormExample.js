//orm example
var app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//creating connection
const Sequelize = require('sequelize');
var db = new Sequelize('test', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});
//checking if the connection has been made or not
//db.sync();

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//creating the model for our table user
const User = db.define('user', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
    // options
    tableName: 'user',
    timestamps: false
});
// __________________________________________________________________________________________________________________________________________ 
app.get('/', (req, res) => {
    res.sendfile('login.html');
});

//to authorize login WOrks FIne
app.post('/auth', (req, res) => {
    /*let dbname=req.body.username;
    let psswrd=req.body*/
    User.findOne({ where: { name: req.body.username, password: req.body.password } })
        .then((obj) => {
            console.log("Login Successfull" + obj.name);
            res.send(`<h1>Welcome to chatio 😁 </h1>`);
        })
        .catch(err => {
            console.log(err);
            res.send('Sorry ! ! The credentials you provided are  incorrect.\n Please try again 😑');
        });
});
app.get('/signup', (req, res) => {
    res.sendfile('signup.html');
});

var check = false;
app.post('/adduser', (req, res) => {
    let username = req.body.nm;
    let pass = req.body.pss;
    //if useremail already exists in the database  
    User.findOne({ where: { name: req.body.nm } })
        .then(() => {
            console.log('User already exists');
            res.send(`Could not create your account. Try again with with different credentials 🙁`);
            check = true;
        }).catch((err) => {

        });
    if (check === false) {
        User.create({ name: username, password: pass })
            .then(() => {
                console.log("User created successfully \n OBject's id:", obj.id);
                res.send(`<h1>You have successfuly signed up 😊</h1>`);
            }).catch((obj) => {

            });

    }

});

/*
app.post('/login', (req, res) => {
    res.send(200);
});*/

app.listen(3000, () => {
    console.log("Server running on 3000");
});