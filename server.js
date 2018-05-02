var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var id;
 var ObjectID = require('mongodb').ObjectID;
//STATIC FILES
app.use(express.static('public'));
app.use(bodyParser.json()); // Body parser use JSON data


var MongoClient = require('mongodb').MongoClient;
  
  var json1={};
    var user;
  
    app.get('/', function (req, res) {
		user="";
	res.sendFile( __dirname + "/public" +"/"+ "index.html" );
});

  
// Connect to the db
MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  var db = client.db('prop');
 
  app.get('/login', function (req, res) {  

response = {  
	type:req.query.type,
       username:req.query.username,  
       pwd:req.query.pwd  
   }; 
console.log(response.type);
user = response.username;
if(response.type=='Registrar'){
   if(response.pwd=='admin'){
   console.log("success"); 
	var _id = req.query.username;
	console.log(_id);
	   res.sendFile(__dirname+'/public'+"/"+'index1.html');
}
 else{
			 	res.send("Username or Password doesn't match. Please re-enter credentials.")
			 }
}
else{
	//res.send("Please re-enter credentials");
	  db.collection('user', function (err, collection) {
         collection.find({"username":user}).toArray(function(err, rows) {
			 var pwd1=rows[0].password;
			 console.log(pwd1);
			 if(response.pwd==pwd1){
	var _id = req.query.username;
	res.sendFile(__dirname+'/public'+"/"+'index-user.html');}
			 else{
			 	res.send("Username or Password doesn't match. Please re-enter credentials.")
			 }
});
	  });
}
}) ;
  
  app.get('/properties/listreg', function (req, res) {
	console.log("GET Request :: /list");
	  console.log(user);
	 
	var data = {
        "error": 1,
        "products": ""
    };
	
  db.collection('property', function (err, collection) {
        
         collection.find().toArray(function(err, rows) {
            if(err) throw err;    
			if (rows.length !== 0 && !err) {
				json1["error"] = 0;
				data["products"] = rows;
				json1["user"]=user;
				json1['owner']=rows;
							res.json(json1);
				
			} else if (rows.length === 0) {
				data["error"] = 2;
				data["products"] = 'No accounts Found..';
				res.json(data);
			} else {
				data["products"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
			}
        });
	  console.log(json1);
	  });
  });
	
	 app.get('/properties/list', function (req, res) {
	console.log("GET Request :: /list");
	var data = {
        "error": 1,
        "products": ""
    };
	
  db.collection('property', function (err, collection) {
        
         collection.find({"owner":user}).toArray(function(err, rows) {
            if(err) throw err;    
			if (rows.length !== 0 && !err) {
				json1["error"] = 0;
				data["products"] = rows;
				json1["user"]=user;
				json1['owner']=rows;
				
			} else if (rows.length === 0) {
				data["error"] = 2;
				data["products"] = 'No accounts Found..';
				res.json(data);
			} else {
				data["products"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
			}
			collection.find({"status":"Intended For Sale","view_type":"Public"}).toArray(function(err,rows1){
				if(err) throw err;
				json1["error"]=0;
				json1['status1']=rows1;
			
			collection.find({"status":"Intended For Sale","view_type":"Private","private":user}).toArray(function(err,rows1){
				if(err) throw err;
				json1["error"]=0;
				json1['status2']=rows1;
			
			console.log(json1);
			res.json(json1);
        });
			});
	  });
	  
  app.get('/properties/711/:_id', function (req, res) {
	var _id = req.params._id;
	  id=_id;
	var data = {
        "error": 1,
        "product": ""
	};
	console.log(_id);
  });
	  
	  
	  app.get('/properties/display/:_id',function(req,res){
		  var idd;
		  idd=req.params._id;
		  console.log("hi");
		  	  console.log("In getDetails()");
			  console.log(idd);
		  db.collection('property', function (err, collection) {
         collection.find({"_id":ObjectID(idd)}).toArray(function(err, rows) {
            if(err) throw err;    
				res.render('disp.ejs',{records: rows})  
		 });
		  });
	  });
  
app.put('/properties/update/', function (req, res) {

    var _id = req.body._id;
	var checkboxvalue1=req.body.checkboxvalue1;
	var checkboxvalue2=req.body.checkboxvalue2;
	var radiobuttonvalue=req.body.radiobuttonvalue;
	var privatenames=req.body.privatenames;
	
    var data = {
        "error": 1,
        "product": ""
    };
	console.log(checkboxvalue1);
	console.log(checkboxvalue2);
	console.log(radiobuttonvalue);
	console.log("Private names"+privatenames);
		db.collection('property', function (err, collection) {
		console.log(id);
		if(checkboxvalue1==true){
			if(radiobuttonvalue=="Public"){
        collection.update({_id: ObjectID(id)}, { $set: {"status":"Intended For Sale","view_type":radiobuttonvalue} }, {w:1},
                                                     function(err, result){
                                                                if(err) throw err;  
															
                                                                console.log('Document Updated Successfully');
                     												 });}
				if(radiobuttonvalue=="Private"){
					var usernames=privatenames.split("\n");
					console.log(usernames);
        collection.update({_id: ObjectID(id)}, { $set: {"status":"Intended For Sale","view_type":radiobuttonvalue,"private":usernames} }, {w:1},
                                                     function(err, result){
                                                                if(err) throw err;  
																
                                                                console.log('Document Updated Successfully');
                                                        
												 });}
		}
		else if(checkboxvalue2==true){
        collection.update({_id: ObjectID(id)}, { $set: {"status":"Registered","view_type":"None"} }, {w:1},
                                                     function(err, result){
                                                                if(err) throw err;    
                                                                console.log('Document Updated Successfully');
                                                        
												 });}
		});

    
	db.collection('property',function(err,collection){
		collection.find({"owner":user}).toArray(function(err, rows) {
            if(err) throw err;    
			if (rows.length !== 0 && !err) {
				json1["error"] = 0;
				json1['owner']=rows;
			} else{
				//Error code 2 = no rows in db.
				json1["error"]=2;
				res.json(data);
			} 
			collection.find({"status":"Intended For Sale","view_type":"Public"}).toArray(function(err,rows1){
				if(err) throw err;
				json1["error"]=0;
				json1['status']=rows1;
			
			collection.find({"status":"Intended For Sale","view_type":"Private","private":user}).toArray(function(err,rows1){
				if(err) throw err;
				json1["error"]=0;
				json1['status2']=rows1;
			res.json(json1);
        });
	  console.log(json1);
			});
		});
	  });
});
});
}); 
 
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("dummy app listening at: " + host + ":" + port);
});
});