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
			Post.belongsTo(models.User.scope('hideSensitive'), { as: 'PostAuthor', foreignKey: { onDelete: 'CASCADE', name: 'AuthorUuid', allowNull: false } })
			Post.belongsTo(models.User.scope('hideSensitive'), { as: 'PostLastEditor', foreignKey: { onDelete: 'SET NULL', name: 'LastEditorUuid', allowNull: true } })

			// Message
			Post.belongsTo(models.Message, { foreignKey: { onDelete: 'CASCADE', name: 'MessageUuid', allowNull: false } })

			// Reply
			Post.hasMany(models.Reply, { foreignKey: { onDelete: 'CASCADE', name: 'PostUuid', allowNull: false } })
		}
	}
	Post.init({
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