'use strict';
import { Model } from 'sequelize'
const List = (sequelize, DataTypes) => {
	class List extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Message
			List.belongsTo(models.Message, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// Tag
			List.belongsTo(models.Tag, { foreignKey: { name: 'TagUuid', allowNull: false } })
		}
	}
	List.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		MessageUuid: DataTypes.UUID,
		TagUuid: DataTypes.UUID
	}, {
		sequelize,
		modelName: 'List',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return List;
};
export default List