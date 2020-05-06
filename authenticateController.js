var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./config');
module.exports.authenticate = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;


    connection.query('SELECT password FROM users WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            console.log('Error on authentication!! ' + err);
            res.send('Invalid credentials');
        } else {

            if (results.length > 0) {
                decryptedString = cryptr.decrypt(results[0].password);
                if (password == decryptedString) {
                    console.log('Successfully matched');
                    res.send('Welcome to chatio');
                } else {
                    console.log('Password does not match');
                    res.send('Invalid id or password');
                }

            } else {
                res.send('email does not exist');
            }
        }
    });
}