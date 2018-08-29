var express = require('express');
var app = express();
var url = require('url');
var server = require('http').createServer(app);
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://varunkumar:azsazsazsmlab3@ds227469.mlab.com:27469/vbase";
var count = 1;

app.get('/post', function(req, res){
	var data = url.parse(req.url, true);
	var url_query = data.query;
	var input = url_query.data;
	console.log("Your Msg "+"'"+input+"'"+" sent successfully");
	console.log("Total Msgs Sent :"+count);
	res.sendFile(__dirname+'/demofile1.html');
	MongoClient.connect(uri, function(err, db){
		if(err) throw err;
		var dbo = db.db('vbase');
		var db_input = {"input_values" : input};	
		dbo.collection('test').find({}, { _id: 0}).toArray(function(err, data){
		if (err) throw err;
		app.use('/chat', function(req, res){
		res.send(data);
      });
		
	})
		dbo.collection('test').insertOne(db_input, function(err, datas){
			if (err) throw err;
			count++;
		});
		db.close();
	})

	// console.log("I am called");
	// console.log(req.body.username);
	// res.send("hurrey");	
});

app.use('/test', function(req, res){
	res.sendFile(__dirname+'/demofile1.html');
	console.log("Start chatting at port: 8080");
});


server.listen(8080);
