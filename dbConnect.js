
/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ak:ak@cluster0.suwfpmd.mongodb.net/test?authMechanism=DEFAULT";
var dbo="";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   dbo = db.db("attendanceTracker");
  console.log("Database Connected!");
  // db.close();
});
const con = MongoClient.connection;
module.exports=con;

*/
//import mongoose from "mongoose";
var mongoose = require('mongoose');

var dotenv = require('dotenv');
//import dotenv from "dotenv";
dotenv.config();

const mongoConnect = () => {
    // console.log(process.env.CONNECTION_STRING);
    if(mongoose.connect("mongodb+srv://ak:ak@cluster0.suwfpmd.mongodb.net/attendanceTracker")){
        console.log("\nconnected to mongo database\n");
    }
}

module.exports = {mongoConnect};
//export {mongoConnect}