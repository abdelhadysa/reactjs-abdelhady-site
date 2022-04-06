'use strict';
import { Model } from 'sequelize'
const View = (sequelize, DataTypes) => {
	class View extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			View.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { name: 'UserUuid', allowNull: true } })

			// Message
			View.belongsTo(models.Message, { foreignKey: { name: 'MessageUuid', allowNull: false } })
		}
	}
	View.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		UserUuid: DataTypes.UUID,
		MessageUuid: DataTypes.UUID,
	}, {
		sequelize,
		modelName: 'View',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return View;
};
export default View