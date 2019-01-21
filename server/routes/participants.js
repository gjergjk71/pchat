var Participant = require("../models").Participant;
var router = require("express").Router();
const middleware = require("../middleware");
const RestAPI = require("./RestAPI");

var participantsAPI = new RestAPI(Participant);

router.get("/",(req,res) => {
	participantsAPI.req = req;
	participantsAPI.res = res;
	return participantsAPI.get_findAll
})

router.get("/:id",(req,res) => {
	participantsAPI.req = req;
	participantsAPI.res = res;
	return participantsAPI.get_findOne;
})

router.post("/",(req,res) => {
	participantsAPI.req = req;
	participantsAPI.res = res;
	return participantsAPI.get_create;
})

router.put("/:id",(req,res) => {
	participantsAPI.req = req;
	participantsAPI.res = res;
	return participantsAPI.get_update;
})

router.delete("/:id",(req,res) => {
	middleware.verifyJWT(req,res,(req,res) => {
		participantsAPI.req = req
		participantsAPI.res = res
		return participantsAPI.get_delete;
	})
})

module.exports = router;