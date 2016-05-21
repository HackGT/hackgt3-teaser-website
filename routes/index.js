var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require("mysql");
var path = require("path");
var config = require("./config.json");
//var lastRegisteredID = 2;


// First you need to create a connection to the db
var con = mysql.createConnection(config);


/**
 *Code to make the connection to the database
 *
 **/
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

setInterval(function () {
    con.query('SELECT 1');
}, 5000);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/getEmailID/:email', function(req, response){
	var newEmail = req.params.email;
	console.log(newEmail);
	con.query('SELECT * FROM email_list WHERE email_id = ?', newEmail, function(err, rows){
		if (err) {
			response.send(err);
		} else {
			if (rows.length === 0) {
				var em = {email_id: newEmail}
				con.query('INSERT INTO email_list SET ?', em, function(err, res){
		            if (err) {
		              console.log(err);
		            } else {
		              response.send('EMAIL ADDED');
		            }

		        });
			} else {
				response.send('EMAIL EXISTS');
			}
		}
	});
});

module.exports = router;
