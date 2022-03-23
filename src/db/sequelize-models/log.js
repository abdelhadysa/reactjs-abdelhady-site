'use strict';
const {
	Model
} = require('sequelize');
const logModel = (sequelize, DataTypes) => {
	class Log extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Log.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		Message: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		}
	}, {
		sequelize,
		modelName: 'Log',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Log;
};
export default logModel