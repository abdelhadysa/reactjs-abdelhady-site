'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class View extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			View.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { onDelete: 'CASCADE', name: 'UserUuid', allowNull: false } })

			// Message
			View.belongsTo(models.Message, { foreignKey: { onDelete: 'CASCADE', name: 'MessageUuid', allowNull: false } })
		}
	}
	View.init({
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
		},
	}, {
		sequelize,
		modelName: 'View',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return View;
};