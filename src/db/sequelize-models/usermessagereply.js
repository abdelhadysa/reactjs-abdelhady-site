'use strict';
const {
	Model
} = require('sequelize');
const userMessageReplyModel = (sequelize, DataTypes) => {
	class UserMessageReply extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			UserMessageReply.belongsTo(models.User)
			UserMessageReply.belongsTo(models.Message)
		}
	}
	UserMessageReply.init({
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
		MessageUuid: {
			type: DataTypes.UUID,
			allowNull: false,	
		}
	}, {
		sequelize,
		modelName: 'UserMessageReply',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return UserMessageReply;
};
export default userMessageReplyModel