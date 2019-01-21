const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./middleware");
var logger = require("morgan");
var bearerToken = require("express-bearer-token");
var models = require("./models");
var auth_routes = require("./routes/auth");
var users_route = require("./routes/users");
var messages_route = require("./routes/messages");
var conversations_route = require("./routes/conversations");
var participants_route = require("./routes/participants");

models.sequelize.sync({force:true});

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bearerToken());

app.use("/auth/",auth_routes);
app.use("/api/users/",users_route)
app.use("/api/conversations/",messages_route)
app.use("/api/participants/",participants_route)
app.use("/api/messages/",messages_route)

app.use((req,res,next) => {
	res.status(404);
	res.send("404 Page not found!");
})
var port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on ${port}`))