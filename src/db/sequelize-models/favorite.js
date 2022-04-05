'use strict';
import { Model } from 'sequelize'
const Favorite = (sequelize, DataTypes) => {
	class Favorite extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			Favorite.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { onDelete: 'CASCADE', name: 'UserUuid', allowNull: false } })

			// Tag
			Favorite.belongsTo(models.Tag, { foreignKey: { onDelete: 'CASCADE', name: 'TagUuid', allowNull: false } })
		}
	}
	Favorite.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		UserUuid: DataTypes.UUID,
		TagUuid: DataTypes.UUID
	}, {
		sequelize,
		modelName: 'Favorite',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Favorite;
};
export default Favorite