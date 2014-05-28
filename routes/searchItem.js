var express = require('express');
var util = require('util');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res) {
  	var db = req.db;
var ctr = "/" + req.query.searchString + "/i";
//ctr = "black";

var regex = new RegExp([req.query.searchString].join(""),"i");
ctr = regex;
console.log("SEARCH CRT : " + ctr);
db.item.find({ $or: [{"itemName": ctr}, {"itemInfo.brand":ctr}, {"itemInfo.color": ctr}, {"itemInfo.style": ctr}, {"itemInfo.type": ctr}, {"itemInfo.desc": ctr} ] }).toArray(function(err,
items) {

    
/*
    console.log("ITEMINFO : " + util.inspect(items) );
    console.log("ITEMINFO Length : " + items.length);
    var obj = items[0];
    console.log("Object : " + util.inspect(obj) );
    console.log("Object Price : " + obj.itemInfo.price);
*/
    res.render('searchItem', {
        "title" : "Search Result",
	    "search" : items
    });

});



});
module.exports = router;




/*
var mongo = require('mongodb');
var Mongolian = require("mongolian");
var db1 = new Mongolian("mongo://localhost:27017/mydb");
//var db1 = server.db("mydb")
*/



/*
 var mongoserver = new mongo.Server("localhost"),
    db_connector = new mongo.Db("mydb", mongoserver);

db_connector.open(function(err, db){
   var itemRet = db.command({text:"item", search: "Samsung"},           function(err, cb){
   //var itemRet = itemCol.find($text, {$search:"TV"});
   console.log("ITEM NAVTIVE QUERY  : " + util.inspect(cb)); 
});
});
*/


/*
var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
  var db = mongoClient.db("mydb");
var itemRet = db.command({text:"item", search: "LGTV"},           function(err, cb){
   //var itemRet = itemCol.find($text, {$search:"TV"});
   console.log("ITEM NAVTIVE QUERY CB : " + util.inspect(cb)); 
});

  mongoClient.close();
});


var db1 = new Mongolian("mongo://localhost:27017/mydb");
var itemCol = db1.collection("item");
//console.log("SERACH ITEM : " + util.inspect(itemCol));
var itemRet = db.command({text:"item", search: "LGTV"});
//var itemRet = itemCol.find($text, {$search:"TV"});
console.log("ITEM RET : " + util.inspect(itemRet) );

itemCol.find("$text", {$search:"*"}).toArray(function (err, 





//db.item..find({"itemInfo.type":"Book"}).toArray(function(err,items) {
*/

