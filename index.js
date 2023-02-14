const express = require('express');
const app_express = require('express');
var app = app_express();

var bodyParser = require('body-parser');
var cors = require('cors');
const ejs = require('ejs');
const path = require('path');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM('<html></html>');
var $ = require('jquery')(window);
require('dotenv').config({path: '.env'});

const mongoose  = require('./dbConnect');
mongoose.mongoConnect();

const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
//app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//app.use('/api', indexRouter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const routes = require('./routes/api'); 
app.use('/api', routes); 
app.set('view engine', 'pug');

app.use('/', function(req, res) {
    res.sendFile(path.join(static_path+'/index.html'));
  });
// var options = {
//     root: path.join(__dirname)
// };
// var fileName = static_path+'frontend/index.html';


// app.use((req,res,next)=>{
//     res.sendFile(fileName, options, function (err) {
//         if (err) {
//             next(err);
//         } else {
//             //console.log('Sent:', fileName);
//         }
//     });})

console.log("Server listening on PORT "+process.env.NODE_PORT+" \n");
console.log("Base URL : http://localhost:"+process.env.NODE_PORT+"/api  \n");
app.listen(process.env.port || process.env.NODE_PORT);
