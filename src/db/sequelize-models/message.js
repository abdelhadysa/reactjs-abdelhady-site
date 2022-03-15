'use strict';
const {
	Model
} = require('sequelize');
const messageModel = (sequelize, DataTypes) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Message.belongsTo(models.User)
		}
	}
	Message.init({
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		userUuid: DataTypes.UUID,
	}, {
		sequelize,
		modelName: 'Message',
		scopes: {
			hideSensitive: {
				attributes: {
					exclude: ['uuid'],
				},
			},
		},
	});
	return Message;
};

export default messageModel