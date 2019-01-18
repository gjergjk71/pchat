var User = require("../models").User;
var router = require("express").Router();

router.get("/",(req,res) => {
	User.findAll({
		attributes: {
			exclude: ["password"]
		}
	}).then(users => res.json(users));
})

router.get("/:id",(req,res) => {
	User.findOne({
		where:{id:req.params.id},
		attributes:{
			exclude: ["password"]
		}
	}).then(user => {
		if (user){
			res.json(user)
		} else {
			res.status(404)
			res.send({
				success: false,
				message: "User not found"
			})
		}
	})
})

module.exports = router;