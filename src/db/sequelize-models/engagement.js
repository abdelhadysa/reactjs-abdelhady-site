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
			Engagement.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { name: 'UserUuid', allowNull: true } })

			// Message
			Engagement.belongsTo(models.Message, { foreignKey: { name: 'MessageUuid', allowNull: false } })

			// Reaction
			Engagement.belongsTo(models.Reaction, { foreignKey: { name: 'ReactionUuid', allowNull: false } })
		}
	}
	Engagement.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		UserUuid: DataTypes.UUID,
		MessageUuid: DataTypes.UUID,
		ReactionUuid: DataTypes.UUID
	}, {
		sequelize,
		modelName: 'Engagement',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Engagement;
};
export default Engagement