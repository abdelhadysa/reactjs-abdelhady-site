'use strict';
import { Model } from 'sequelize'
const rolePermissionsModel = (sequelize, DataTypes) => {
	class RolePermissions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	RolePermissions.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		RoleUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		PermissionUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'RolePermissions',
		scopes: {
			hideSensitive: {
				attributes: {
					exclude: ['uuid'],
				},
			},
		},
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return RolePermissions;
};

export default rolePermissionsModel