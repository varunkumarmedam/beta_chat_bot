var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://localhost/vbase";

app.use(bodyParser.urlencoded({extend:true}));
app.use(express.static(__dirname));

app.get('/', function(req, res){
	var name = "varun";
	console.log("We got you");
	res.render(__dirname+'/chat.ejs',{name});
});

app.get('/show', function(req, res){
	MongoClient.connect(uri, function(err, db){
		var dbo = db.db('vbase');
		dbo.collection('chat').find({}).toArray(function(err, data){
			for(var i=0;i<=data.length;i++){
			res.send('<h1>'+data[i].msg+'</h1>');
		}
		})
		console.log("connection success");
	})
})

app.post('/send', function(req, res){
	var data = {
		"data" : req.body.data
	}
	MongoClient.connect(uri, function(err, db){
		var dbo = db.db('vbase');
		dbo.collection('chat').insertOne(data);
		res.redirect('/');
	})
})

server.listen(4000, function(){
	var port = server.address().port;
	console.log("your server is loading at :"+port);
})