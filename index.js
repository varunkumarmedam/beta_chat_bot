var mongodb = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var uri = "mongodb://varunkumar:azsazsazsmlab3@ds227469.mlab.com:27469/vbase";

mongodb.connect(uri, function(err, db){
	var dbo = db.db('vbase');
	var query = {
		"name" : "varun",
		"hobby" : "Time pass",
	};
	console.log(query.name);
	var data = dbo.collection('test').find({}).toArray();
	console.log(data);
})