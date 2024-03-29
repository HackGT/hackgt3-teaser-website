var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require("mysql");
var path = require("path");

var config = require("../config.json");
var mysqlConfig = config.mysql;
var googleAnalyticsId = config.gaId;
var sendgridapikey = config.sendgridAPIKey;

var sendgrid = require('sendgrid')(sendgridapikey);



//var lastRegisteredID = 2;


// First you need to create a connection to the db
var con = mysql.createConnection(mysqlConfig);


/**
*Code to make the connection to the database
*
**/
con.connect(function(err){
  if(err){
    console.error('Error connecting to Db');
    throw(err);
  }
  console.log('Connection established');
});

setInterval(function () {
  con.query('SELECT 1');
}, 5000);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { googleAnalyticsId: googleAnalyticsId });
});

router.post('/getEmailID/:email', function(req, response){
  var newEmail = req.params.email;
  console.log(newEmail);
  con.query('SELECT * FROM email_list WHERE email_id = ?', newEmail, function(err, rows){
    if (err) {
      response.status(400);
      response.send(err);
    } else {
      if (rows.length === 0) {
        var em = {email_id: newEmail};
        con.query('INSERT INTO email_list SET ?', em, function(err, res){
          if (err) {
            response.send(err);
          } else {

            var emailconf   = new sendgrid.Email({
              to      : newEmail,
              from    : 'hello@hackgt.com',
              subject : 'HackGT 2016 Subscription',
              text    : 'Thank you for subscribing to HackGT 2016. We will email you with any updates.'
            });
            sendgrid.send(emailconf, function(err, json) {
              if (err) { return console.error(err); }
              response.json({emailAdded: true});
            });
          }

        });
      } else {
        response.send({emailAdded: false});
      }
    }
  });
});

router.get('/sponsors', function(req, res, next) {
  res.redirect('http://sponsors.hackgt.com/');
});

router.get('/sponsor', function(req, res, next) {
  res.redirect('/sponsors');
});

module.exports = router;
