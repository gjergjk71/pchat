var User = require("../models").User;
var router = require("express").Router();
const middleware = require("../middleware");
const RestAPI = require("./RestAPI");

findAll_settings  = {
	attributes: {
		exclude: ["password"]
	}
}
findOne_settings = {
	attributes: {
		exclude: ["password"]
	}
}


var usersAPI = new RestAPI(undefined,undefined,User,findAll_settings,findOne_settings);

router.get("/",(req,res) => {
	usersAPI.req = req;
	usersAPI.res = res;
	return usersAPI.get_findAll
})

router.get("/:id",(req,res) => {
	usersAPI.req = req;
	usersAPI.res = res;
	return usersAPI.get_findOne;
})

router.put("/:id",(req,res) => {
	usersAPI.req = req;
	usersAPI.res = res;
	return usersAPI.get_update;
})

router.delete("/:id",(req,res) => {
	middleware.verifyJWT(req,res,(req,res) => {
		usersAPI.req = req
		usersAPI.res = res
		return usersAPI.get_delete;
	})
})

module.exports = router;