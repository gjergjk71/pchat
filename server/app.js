const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./middleware");
var logger = require("morgan");
var bearerToken = require("express-bearer-token");
var models = require("./models");
var auth_routes = require("./routes/auth");
var users_route = require("./routes/users");
var messages_route = require("./routes/messages");

models.sequelize.sync();

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bearerToken());

app.use("/auth/",auth_routes);
app.use("/api/users/",users_route)
app.use("/api/messages/",messages_route)
var port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on ${port}`))