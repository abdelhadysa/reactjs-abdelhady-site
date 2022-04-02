'use strict';
import { Model } from 'sequelize'
const Engagement = (sequelize, DataTypes) => {
	class Engagement extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			Engagement.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { onDelete: 'CASCADE', name: 'UserUuid', allowNull: false } })

			// Message
			Engagement.belongsTo(models.Message, { foreignKey: { onDelete: 'CASCADE', name: 'MessageUuid', allowNull: false } })

			// Reaction
			Engagement.belongsTo(models.Reaction, { foreignKey: { onDelete: 'CASCADE', name: 'ReactionUuid', allowNull: false } })
		}
	}
	Engagement.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		UserUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		MessageUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		ReactionUuid: {
			type: DataTypes.UUID,
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: 'Engagement',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Engagement;
};
export default Engagement