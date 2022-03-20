'use strict';
import { Model } from 'sequelize'
const roleModel = (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Role.belongsToMany(models.Permission, { through: models.RolePermissions })
			Role.belongsToMany(models.User, { through: models.UserRoles })
		}
	}
	Role.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		Name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Description: {
			type: DataTypes.STRING
		},
	}, {
		sequelize,
		modelName: 'Role',
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
	return Role;
};

export default roleModel