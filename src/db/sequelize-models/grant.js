'use strict';
const {
	Model
} = require('sequelize');
const Grant = (sequelize, DataTypes) => {
	class Grant extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			Grant.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { onDelete: 'CASCADE', name: 'UserUuid', allowNull: false } })

			// Role
			Grant.belongsTo(models.Role, { foreignKey: { onDelete: 'CASCADE', name: 'RoleUuid', allowNull: false } })
		}
	}
	Grant.init({
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
		RoleUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: 'Grant',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Grant;
};
export default Grant