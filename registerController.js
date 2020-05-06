//controller to insert the data into table
var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./config');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function(req, res) {
    var today = new Date();
    var encryptedString = cryptr.encrypt(req.body.password);
    var em = req.body.email;
    var users = {
        "email": req.body.email,
        "password": encryptedString,
    }

    // check if email already exists or not


    // var sqlQuery = `INSERT INTO users VALUES ? ('${req.body.email}','${encryptedString}')`;
    connection.query('INSERT INTO users SET ?', users, function(error, results) {
        if (error) {
            res.send('Cannot register. Try again with different credentials');
            console.log(error);
        } else {
            res.send('You have registered successfully 😁');
        }
    });
}