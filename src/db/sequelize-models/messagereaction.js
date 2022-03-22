'use strict';
const {
	Model
} = require('sequelize');
const messageReactionModel = (sequelize, DataTypes) => {
	class MessageReaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			MessageReaction.belongsToMany(models.User.scope('hideSensitive'), { through: models.UserMessageReaction })
			MessageReaction.hasMany(models.UserMessageReaction)
			MessageReaction.belongsTo(models.Message)
			MessageReaction.belongsTo(models.Reaction)
		}
	}
	MessageReaction.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		ReactionUuid: {
			type: DataTypes.UUID,
			allowNull: false,	
		},
		MessageUuid: {
			type: DataTypes.UUID,
			allowNull: false,	
		},
	}, {
		sequelize,
		modelName: 'MessageReaction',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return MessageReaction;
};

export default messageReactionModel