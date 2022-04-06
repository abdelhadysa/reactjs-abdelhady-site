'use strict';
const {
	Model
} = require('sequelize');
const Right = (sequelize, DataTypes) => {
	class Right extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Role
			Right.belongsTo(models.Role, { foreignKey: { name: 'RoleUuid', allowNull: false } })

			// Permission
			Right.belongsTo(models.Permission, { foreignKey: { name: 'PermissionUuid', allowNull: false } })
		}
	}
	Right.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		RoleUuid: DataTypes.UUID,
		PermissionUuid: DataTypes.UUID
	}, {
		sequelize,
		modelName: 'Right',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Right;
};
export default Right