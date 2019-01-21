var Conversation = require("../models").Conversation;
var router = require("express").Router();
const middleware = require("../middleware");
const RestAPI = require("./RestAPI");

var conversationsAPI = new RestAPI(Conversation);

router.get("/",(req,res) => {
	conversationsAPI.req = req;
	conversationsAPI.res = res;
	return conversationsAPI.get_findAll
})

router.get("/:id",(req,res) => {
	conversationsAPI.req = req;
	conversationsAPI.res = res;
	return conversationsAPI.get_findOne;
})

router.post("/",(req,res) => {
	conversationsAPI.req = req;
	conversationsAPI.res = res;
	return conversationsAPI.get_create;
})

router.put("/:id",(req,res) => {
	conversationsAPI.req = req;
	conversationsAPI.res = res;
	return conversationsAPI.get_update;
})

router.delete("/:id",(req,res) => {
	middleware.verifyJWT(req,res,(req,res) => {
		conversationsAPI.req = req
		conversationsAPI.res = res
		return conversationsAPI.get_delete;
	})
})

module.exports = router;