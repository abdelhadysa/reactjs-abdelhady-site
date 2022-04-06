'use strict';
import { Model } from 'sequelize'
const Permission = (sequelize, DataTypes) => {
	class Permission extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Right
			Permission.hasMany(models.Right, { foreignKey: { name: 'PermissionUuid', allowNull: false } })

			// Role
			Permission.belongsToMany(models.Role, { through: models.Right })
		}
	}
	Permission.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
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

export default Permission