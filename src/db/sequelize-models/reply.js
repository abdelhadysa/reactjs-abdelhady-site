'use strict';
import { Model } from 'sequelize'
const Reply = (sequelize, DataTypes) => {
	class Reply extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			Reply.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { name: 'AuthorUuid', allowNull: false } })
			Reply.belongsTo(models.User.scope('hideSensitive'), { as: 'ReplyLastEditor', foreignKey: { name: 'LastEditorUuid', allowNull: true } })

			// Message
			Reply.belongsTo(models.Message, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// Post
			Reply.belongsTo(models.Post, { foreignKey: { name: 'PostUuid', allowNull: false }, as: 'Parent' })
			Reply.belongsTo(models.Post, { foreignKey: 'ReplyingToUuid', constraints: false, as: 'Post' })

			// Reply
			Reply.hasMany(models.Reply, { foreignKey: 'ReplyingToUuid', constraints: false, scope: { ReplyingTo: 'Reply' } })
		}
	}
	Reply.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		AuthorUuid: DataTypes.UUID,
		LastEditorUuid: DataTypes.UUID,
		MessageUuid: DataTypes.UUID,
		ReplyingTo: DataTypes.STRING,
		ReplyingToUuid: DataTypes.UUID,
		PostUuid: DataTypes.UUID,
	}, {
		sequelize,
		modelName: 'Reply',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
});
	return Reply;
};
export default Reply