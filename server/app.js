const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./middleware");
var logger = require("morgan");
var bearerToken = require("express-bearer-token");
var auth_routes = require("./routes/auth");
var models = require("./models");

models.sequelize.sync();

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bearerToken());

app.use("/auth/",auth_routes);

var port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on ${port}`))


// app.get("/protected",(req,res) => {
// 	middleware.verifyJWT(req,res,(req,res) => {
// 		res.send(req.decoded);
// 	})
// })