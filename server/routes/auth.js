const express = require("express");
var jwt = require("jsonwebtoken");
var User = require("../models").User;
const bcrypt = require("bcrypt");
const config = require("../config");
const saltRounds = 10;

var router = express.Router();
router.post("/login",(req,res) => {
	var { username, password } = req.body;
	User.findOne({where:{username:username}})
		.then((user) => {
			if (user){
				console.log("user found");
				if (bcrypt.compareSync(password,user.password)){
					var token = jwt.sign(
						{
							user_id:user.id,
						},
						config.secret,
						{
							expiresIn: "24h"
						}
					)
					return res.json({
						success: true,
						message: "Authentication successfull!",
						token: token
					})
				} else {
					return res.send("Incorrect")
				}
			} else {
				return res.send("Incorrect");
			}
		})
})

module.exports = router;