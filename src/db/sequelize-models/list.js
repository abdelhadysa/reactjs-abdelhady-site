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
			List.belongsTo(models.Message, { foreignKey: { onDelete: 'CASCADE', name: 'MessageUuid', allowNull: false } })

			// Tag
			List.belongsTo(models.Tag, { foreignKey: { onDelete: 'CASCADE', name: 'TagUuid', allowNull: false } })
		}
	}
	List.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
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
		Order: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		Color: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
			},
			defaultValue: '#000000',
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