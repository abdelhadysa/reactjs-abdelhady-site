'use strict';
const {
	Model
} = require('sequelize');
const Reaction = (sequelize, DataTypes) => {
	class Reaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Engagement
			Reaction.hasMany(models.Engagement, { foreignKey: { onDelete: 'CASCADE', name: 'ReactionUuid', allowNull: false } })
		}
	}
	Reaction.init({
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
		Points: {
			allowNull: false,
			type: DataTypes.INTEGER,
			defaultValue: 1,
			validate: {
				min: 1,
				max: 100
			},
		},
	}, {
		sequelize,
		modelName: 'Reaction',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Reaction;
};

export default Reaction