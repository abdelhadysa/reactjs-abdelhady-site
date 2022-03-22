'use strict';
const {
	Model
} = require('sequelize');
const userMessageReactionModel = (sequelize, DataTypes) => {
	class UserMessageReaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			UserMessageReaction.belongsTo(models.User.scope('hideSensitive'))
			UserMessageReaction.belongsTo(models.MessageReaction)
		}
	}
	UserMessageReaction.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		UserUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		MessageReactionUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'UserMessageReaction',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return UserMessageReaction;
};

export default userMessageReactionModel