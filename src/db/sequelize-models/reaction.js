'use strict';
const {
	Model
} = require('sequelize');
const reactionModel = (sequelize, DataTypes) => {
	class Reaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Reaction.belongsToMany(models.Message, { through: models.MessageReaction })
			Reaction.hasMany(models.MessageReaction)
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
		Points: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Reaction',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Reaction;
};

export default reactionModel