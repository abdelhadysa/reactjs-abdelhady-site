'use strict';
import { Model } from 'sequelize'
const Log = (sequelize, DataTypes) => {
	class Log extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Log.belongsTo(models.User, { foreignKey: { onDelete: 'SET NULL', onUpdate: 'SET NULL', name: 'UserUuid', allowNull: true } })
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
		},
		UserUuid: DataTypes.UUID,
		Username: DataTypes.STRING,
		Role: DataTypes.STRING,
		Super: DataTypes.STRING,
		Permission: DataTypes.STRING,
		Level: DataTypes.STRING,
		IpAddress: DataTypes.STRING,
}, {
		sequelize,
		modelName: 'Log',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Log;
};
export default Log