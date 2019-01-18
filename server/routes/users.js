var User = require("../models").User;
var router = require("express").Router();

router.get("/",(req,res) => {
	User.findAll({
		attributes: {
			exclude: ["password"]
		}
	}).then(users => res.json(users));
})

module.exports = router;