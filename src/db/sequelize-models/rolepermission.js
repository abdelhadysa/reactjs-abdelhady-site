'use strict';
import { Model } from 'sequelize'
const rolePermissionModel = (sequelize, DataTypes) => {
	class RolePermission extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			RolePermission.belongsToMany(models.User.scope('hideSensitive'), { through: models.UserRolePermission })
			RolePermission.hasMany(models.UserRolePermission)
			RolePermission.belongsTo(models.Role)
			RolePermission.belongsTo(models.Permission)
		}
	}
	RolePermission.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		PermissionUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		RoleUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'RolePermission',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return RolePermission;
};

export default rolePermissionModel