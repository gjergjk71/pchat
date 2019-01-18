var User = require("../models").User;
var router = require("express").Router();
const middleware = require("../middleware");

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

router.delete("/:id",(req,res) => {
	middleware.verifyJWT(req,res,(req,res) => {
		User.destroy({
			where: {id:req.params.id}
		}).then(() => res.json({
			success: true,
			message: "Deleted user if it existed"
		}))
	})
})

module.exports = router;