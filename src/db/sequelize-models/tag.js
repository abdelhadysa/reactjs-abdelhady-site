'use strict';
import { Model } from 'sequelize'
const Tag = (sequelize, DataTypes) => {
	class Tag extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Favorite
			Tag.hasMany(models.Favorite, { foreignKey: { onDelete: 'CASCADE', name: 'TagUuid', allowNull: false } })

			// List
			Tag.hasMany(models.List, { foreignKey: { onDelete: 'CASCADE', name: 'TagUuid', allowNull: false } })
		}
	}
	Tag.init({
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
				is: /(^[A-Za-z0-9_]+)/,
			},
		},
		Color: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
			},
			defaultValue: '#000000',
		},
		Featured: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		}
	}, {
		sequelize,
		modelName: 'Tag',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Tag;
};
export default Tag