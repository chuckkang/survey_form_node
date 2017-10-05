var express = require("express");
var ejd = require("ejs");
var bodyParser = require("body-parser");
var path = require("path");
var session = require("express-session");

var app = express();
app.use(session({ secret: 'codingdojorocks' }));
app.use(bodyParser.urlencoded({ extended: true }));

//static content
app.use(express.static(path.join(__dirname, "./static")));
//setup views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



//////////////////////  ROUTING ///////////////////////////////
app.get('/', function (request, response) {
	response.render("index");
})

app.post("/result", function (request, response){
///////////////////////////////////////////////////////////////
var name = request.body.name;
var location = request.body.location;
var language = request.body.language;
var comment = request.body.comment;
	request.session.name = name;
	request.session.location = location;
	request.session.language = language;
	request.session.comment = comment;
	response.redirect("/result")
/////////////////////////////////////////////
});

app.get("/result", function(request, response){
////////////////////////
	var data = {
		name: request.session.name,
		location: request.session.location,
		language: request.session.language,
		comment: request.session.comment
	}
	response.render("users", data)
////////////////////////
})
app.listen(6789, function () {
	console.log("listening on port 6789");
});