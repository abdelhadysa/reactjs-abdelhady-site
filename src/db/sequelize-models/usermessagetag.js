'use strict';
const {
	Model
} = require('sequelize');
const userMessageTagModel = (sequelize, DataTypes) => {
	class UserMessageTag extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			UserMessageTag.belongsTo(models.User)
			UserMessageTag.belongsTo(models.MessageTag)
		}
	}
	UserMessageTag.init({
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
		MessageTagUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'UserMessageTag',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return UserMessageTag;
};
export default userMessageTagModel