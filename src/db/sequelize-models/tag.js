'use strict';
const {
  Model
} = require('sequelize');
const tagModel = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.Message, { through: models.MessageTag })
      Tag.hasMany(models.MessageTag)
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
				is: /(^[A-Za-z0-9_\S ]+)/,
			},
		},
    Color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
    createdAt: 'CreatedAt',
		updatedAt: 'UpdatedAt',
  });
  return Tag;
};
export default tagModel