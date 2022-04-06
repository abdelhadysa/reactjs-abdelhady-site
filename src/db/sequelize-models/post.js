'use strict';
const {
	Model
} = require('sequelize');
const Post = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			Post.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { name: 'AuthorUuid', allowNull: false } })
			Post.belongsTo(models.User.scope('hideSensitive'), { as: 'PostLastEditor', foreignKey: { name: 'LastEditorUuid', allowNull: true } })

			// Message
			Post.belongsTo(models.Message, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// Reply
			Post.hasMany(models.Reply, { foreignKey: { name: 'PostUuid', allowNull: false }, as: 'Child' })
			Post.hasMany(models.Reply, { foreignKey: 'ReplyingToUuid', constraints: false, scope: { ReplyingTo: 'Post' } })
		}
	}
	Post.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		AuthorUuid: DataTypes.UUID,
		LastEditorUuid: DataTypes.UUID,
		MessageUuid: DataTypes.UUID,
		Locked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		Pinned: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	}, {
		sequelize,
		modelName: 'Post',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
});
	return Post;
};
export default Post