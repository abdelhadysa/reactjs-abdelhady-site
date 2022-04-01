'use strict';
const {
	Model
} = require('sequelize');
const Reply = (sequelize, DataTypes) => {
	class Reply extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			Reply.belongsTo(models.User.scope('hideSensitive'), { as: 'ReplyAuthor', foreignKey: { onDelete: 'CASCADE', name: 'AuthorUuid', allowNull: false } })
			Reply.belongsTo(models.User.scope('hideSensitive'), { as: 'ReplyLastEditor', foreignKey: { onDelete: 'SET NULL', name: 'LastEditorUuid', allowNull: true } })

			// Message
			Reply.belongsTo(models.Message, { foreignKey: { onDelete: 'CASCADE', name: 'MessageUuid', allowNull: false } })

			// Post
			Reply.belongsTo(models.Post, { foreignKey: { onDelete: 'CASCADE', name: 'PostUuid', allowNull: false } })
		}
	}
	Reply.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		AuthorUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		LastEditorUuid: {
			type: DataTypes.UUID,
			allowNull: true,
		},
		MessageUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		PostUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: 'Reply',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
});
	return Reply;
};
export default Reply