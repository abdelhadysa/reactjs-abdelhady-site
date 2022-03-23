'use strict';
const {
	Model
} = require('sequelize');
const messageTagModel = (sequelize, DataTypes) => {
	class MessageTag extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			MessageTag.belongsTo(models.Message)
			MessageTag.belongsTo(models.Tag)
			MessageTag.belongsToMany(models.User, { through: models.UserMessageTag })
			MessageTag.hasMany(models.UserMessageTag)
		}
	}
	MessageTag.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		TagUuid: {
			type: DataTypes.UUID,
			allowNull: false,	
		},
		MessageUuid: {
			type: DataTypes.UUID,
			allowNull: false,	
		}
	}, {
		sequelize,
		modelName: 'MessageTag',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return MessageTag;
};
export default messageTagModel