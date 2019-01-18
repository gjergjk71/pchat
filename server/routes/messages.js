var Message = require("../models").Message;
var router = require("express").Router();
const middleware = require("../middleware");
const RestAPI = require("./RestAPI");

var messagesAPI = new RestAPI(Message);

router.get("/",(req,res) => {
	messagesAPI.req = req;
	messagesAPI.res = res;
	return messagesAPI.get_findAll
})

router.get("/:id",(req,res) => {
	messagesAPI.req = req;
	messagesAPI.res = res;
	return messagesAPI.get_findOne;
})

router.post("/",(req,res) => {
	messagesAPI.req = req;
	messagesAPI.res = res;
	return messagesAPI.get_create;
})

router.put("/:id",(req,res) => {
	messagesAPI.req = req;
	messagesAPI.res = res;
	return messagesAPI.get_update;
})

router.delete("/:id",(req,res) => {
	middleware.verifyJWT(req,res,(req,res) => {
		messagesAPI.req = req
		messagesAPI.res = res
		return messagesAPI.get_delete;
	})
})

module.exports = router;