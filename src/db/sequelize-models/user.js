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
			User.belongsToMany(models.MessageTag, { through: models.UserMessageTag })
			User.hasMany(models.UserMessageTag)
			User.hasMany(models.UserSavedMessage)
			User.hasMany(models.UserMessageReply)
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
				is: /(^[A-Za-z0-9_]+)/,
			},
		},
		Email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
				isEmail: true,
			},
		},
		LastVisit: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		IpAddress: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				isIP: true,
			},
		},
		Device: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		AvatarUrl: {
			type: DataTypes.STRING,
			allowNull: true,
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