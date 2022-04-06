'use strict';
import { Model } from 'sequelize'
const Grant = (sequelize, DataTypes) => {
	class Grant extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			Grant.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { name: 'UserUuid', allowNull: false } })

			// Role
			Grant.belongsTo(models.Role, { foreignKey: { name: 'RoleUuid', allowNull: false } })
		}
	}
	Grant.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		UserUuid: DataTypes.UUID,
		RoleUuid: DataTypes.UUID
	}, {
		sequelize,
		modelName: 'Grant',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Grant;
};
export default Grant