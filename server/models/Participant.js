
module.exports = (sequelize,DataTypes) => {
	Participant = sequelize.define("Participant");
	Participant.associate = (models) => {
		Participant.belongsTo(models.User,{as:"User"});
		Participant.belongsTo(models.Conversation,{as:"Conversation"});
	}
	return Participant
}