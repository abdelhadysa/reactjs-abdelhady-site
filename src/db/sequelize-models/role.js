'use strict';
import { Model } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
const roleModel = (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Role.belongsToMany(models.Permission, { through: models.RolePermission })
			Role.hasMany(models.RolePermission)
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
		modelName: 'Role',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
		scopes: {
			defaultUser: {
				where: {
					Name: process.env.DEFAULT_USER,
				},
			},
			superUser: {
				where: {
					Name: process.env.SUPER_USER,
				},
			},
		}
	});
	return Role;
};

export default roleModel