'use strict';
const {
  Model
} = require('sequelize');
const userSavedMessageModel = (sequelize, DataTypes) => {
  class UserSavedMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSavedMessage.belongsTo(models.User)
      UserSavedMessage.belongsTo(models.Message)
    }
  }
  UserSavedMessage.init({
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
		}
  }, {
    sequelize,
    modelName: 'UserSavedMessage',
  });
  return UserSavedMessage;
};
export default userSavedMessageModel