var express = require('express');
var util = require('util');
var router = express.Router();
var mongo = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res) {
  	var db = req.db;





db.item.find({"itemInfo.type":"Cosmetic"}).toArray(function(err, items) {
    console.log("ITEMINFO : " + util.inspect(items) );
    console.log("ITEMINFO Length : " + items.length);
    var obj = items[0];
    console.log("ITEM[0] : " + obj);
    console.log("Object : " + util.inspect(obj) );
    console.log("Object Price : " + obj.itemInfo.price);

    res.render('cosmetic', {
        "title" : "Cosmetics",
	    "cosmetic" : items
    });

});



});


module.exports = router;

