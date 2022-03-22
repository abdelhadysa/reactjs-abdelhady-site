'use strict';
import { Model } from 'sequelize'
const userModel = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Message, { onDelete: 'CASCADE', foreignKey: { allowNull: false, name: 'UserUuid' } })
			User.belongsToMany(models.RolePermission, { through: models.UserRolePermission })
			User.belongsToMany(models.MessageReaction, { through: models.UserMessageReaction })
			User.hasMany(models.UserRolePermission)
			User.hasMany(models.UserMessageReaction)
		}
	}
	User.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		Username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		PasswordHash: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			}
		}
	}, {
		sequelize,
		modelName: 'User',
		scopes: {
			hideSensitive: {
				attributes: {
					exclude: ['PasswordHash'],
				},
			},
		},
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return User;
};

export default userModel