'use strict';
import { Model } from 'sequelize'
const userRolePermissionModel = (sequelize, DataTypes) => {
	class UserRolePermission extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			UserRolePermission.belongsTo(models.User.scope('hideSensitive'))
			UserRolePermission.belongsTo(models.RolePermission)
		}
	}
	UserRolePermission.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		RolePermissionUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		UserUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'UserRolePermission',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return UserRolePermission;
};

export default userRolePermissionModel