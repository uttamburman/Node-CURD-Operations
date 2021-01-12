var express = require('express');
var http = require('http');
// var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
const login_router = require("./Router/login_auth");
const Inline_png01_router = require("./Router/Emp_details_router_png01");
const Modal_png02_router = require("./Router/Emp_details_router_png02");


/****
* Parse all form data 
****/

app.use(bodyParser.urlencoded({ extended: true }));

/****
*     This is view engine
*     Template parsing 
*     Using EJS types
****/

app.set('view engine', 'ejs'); // configure template engine


var dateFormat = require('dateformat');
var now = new Date();

/*
*     Import all realted javaScript and css files to inject in our App
*/
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/img', express.static(__dirname +"/views/img" ) );
app.use(login_router); 
app.use(Inline_png01_router);
app.use(Modal_png02_router);

/* 
*    create connection to database
*    The mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
*/
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Welcome1",
//     database : "automation_test"
//   });
/*    
*     Global site title and base URL.
*/
const siteTitle = "CURD Operations";



// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });



/*    
*     Connect to the server
*/
var server = app.listen(5000,function(){
    console.log("Server started on 5000....");
});