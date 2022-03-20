'use strict';
import { Model } from 'sequelize'
const messageModel = (sequelize, DataTypes) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Message.belongsTo(models.User, { foreignKey: { allowNull: false } })
		}
	}
	Message.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		Title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Text: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		UserUuid: {
			type: DataTypes.UUID,
			allowNull: false,
			onDelete: 'CASCADE',
		},
	}, {
		sequelize,
		modelName: 'Message',
		scopes: {
			hideSensitive: {
				attributes: {
					exclude: ['Uuid'],
				},
			},
		},
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Message;
};

export default messageModel