'use strict';
import { Model } from 'sequelize'
const Attachment = (sequelize, DataTypes) => {
	class Attachment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// User
			Attachment.belongsTo(models.User.scope('hideSensitive'), { foreignKey: { onDelete: 'CASCADE', name: 'UserUuid', allowNull: false } })

			// Message
			Attachment.belongsTo(models.Message, { foreignKey: { onDelete: 'CASCADE', name: 'MessageUuid', allowNull: false } })
		}
	}
	Attachment.init({
		Uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		Name: DataTypes.STRING,
		Description: DataTypes.STRING,
		AttachmentUrl: DataTypes.STRING,
		UserUuid: DataTypes.UUID,
		MessageUuid: DataTypes.UUID,
	}, {
		sequelize,
		modelName: 'Attachment',
		createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
	});
	return Attachment;
};
export default Attachment