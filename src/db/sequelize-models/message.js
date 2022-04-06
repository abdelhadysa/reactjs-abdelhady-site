'use strict';
import { Model } from 'sequelize'
const Message = (sequelize, DataTypes) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Post
			Message.hasOne(models.Post, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// Reply
			Message.hasOne(models.Reply, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// Engagement
			Message.hasMany(models.Engagement, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// List
			Message.hasMany(models.List, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// View
			Message.hasMany(models.View, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// Attachment
			Message.hasMany(models.Attachment, { foreignKey: { name: 'MessageUuid', allowNull: false } })
		}
	}
	Message.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
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
	}, {
		sequelize,
		modelName: 'Message',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Message;
};

export default Message