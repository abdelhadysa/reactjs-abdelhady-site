'use strict';
import { Model } from 'sequelize'
const permissionModel = (sequelize, DataTypes) => {
	class Permission extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Permission.belongsToMany(models.Role, { through: models.RolePermission })
			Permission.hasMany(models.RolePermission)
		}
	}
	Permission.init({
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
				is: /(^[A-Za-z0-9_\S ]+)/,
			},
		},
		Description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				is: /(^[A-Za-z0-9_\S ]+)/,
			},
		},
	}, {
		sequelize,
		modelName: 'Permission',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Permission;
};

export default permissionModel