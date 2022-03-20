'use strict';
import { Model } from 'sequelize'
const userRolesModel = (sequelize, DataTypes) => {
	class UserRoles extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	UserRoles.init({
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
		},
	}, {
		sequelize,
		modelName: 'UserRoles',
		scopes: {
			hideSensitive: {
				attributes: {
					exclude: ['Uuid'],
				},
			},
		},
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return UserRoles;
};

export default userRolesModel