'use strict';
import { Model } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
const Role = (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Grant
			Role.hasMany(models.Grant, { foreignKey: { onDelete: 'CASCADE', name: 'RoleUuid', allowNull: false } })

			// Right
			Role.hasMany(models.Right, { foreignKey: { onDelete: 'CASCADE', name: 'RoleUuid', allowNull: false } })

			// User
			Role.belongsToMany(models.User.scope('hideSensitive'), { through: models.Grant })

			// Permission
			Role.belongsToMany(models.Permission, { through: models.Right })
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
			allowNull: true,
			validate: {
				notEmpty: true,
				is: /(^[A-Za-z0-9_\S ]+)/,
			},
		},
		Order: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		Color: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
			},
			defaultValue: '#000000',
		},
		Super: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		}
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

export default Role