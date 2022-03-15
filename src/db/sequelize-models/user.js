'use strict';
const {
	Model
} = require('sequelize');
const userModel = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Message, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
		}
	}
	User.init({
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		}
	}, {
		sequelize,
		modelName: 'user',
		scopes: {
			hideSensitive: {
				attributes: {
					exclude: ['uuid'],
				},
			},
		},
	});
	return User;
};

export default userModel