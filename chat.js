var mongodb = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var uri = "mongodb://localhost:27017/";

mongodb.connect(uri, function(err, db){
	var dbo = db.db('vbase');
	var query = {input_values : "test"};
	dbo.collection('test').find(query).toArray(function(err, data){
		if (err) throw err;
		app.use('/chat', function(req, res){
			res.send(data);
         })
	})
})
server.listen(3030);