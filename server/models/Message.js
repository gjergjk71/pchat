
module.exports = (sequelize, DataTypes) => {
	var Message = sequelize.define("Message", {
		content: DataTypes.STRING
	});
	return Message
}