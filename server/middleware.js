const jwt = require("jsonwebtoken");
const config = require("./config.js");

var verifyJWT = (req,res,next) => {
	if (req.token){
		jwt.verify(req.token,config.secret,(err,decoded) => {
			if (err){
				return res.json({
					success: false,
					message: "Token is not valid"
				})
			} else {
				req.decoded = decoded;
				next(req,res);
			}
		})
	} else {
		res.send("Unauthorized");
	}
}

module.exports = {
	verifyJWT: verifyJWT
}