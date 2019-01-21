
module.exports = (sequelize, DataTypes) => {
	var Conversation = sequelize.define("Conversation",{
		name: DataTypes.STRING
	});
	return Conversation
}