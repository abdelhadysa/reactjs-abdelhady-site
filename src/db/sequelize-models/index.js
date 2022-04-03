'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../sequelize-config/config.js')[env];

import Engagement from './engagement'
import Favorite from './favorite'
import Grant from './grant'
import List from './list'
import Log from './log'
import Message from './message'
import Permission from './permission'
import Post from './post'
import Reply from './reply'
import Right from './right'
import Role from './role'
import Tag from './tag'
import User from './user'
import Reaction from './reaction'
import View from './view'

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
	User: User(sequelize, Sequelize.DataTypes),
	Message: Message(sequelize, Sequelize.DataTypes),
	Reaction: Reaction(sequelize, Sequelize.DataTypes),
	Role: Role(sequelize, Sequelize.DataTypes),
	Permission: Permission(sequelize, Sequelize.DataTypes),
	Tag: Tag(sequelize, Sequelize.DataTypes),
	Log: Log(sequelize, Sequelize.DataTypes),
	Post: Post(sequelize, Sequelize.DataTypes),
	Reply: Reply(sequelize, Sequelize.DataTypes),
	Engagement: Engagement(sequelize, Sequelize.DataTypes),
	Favorite: Favorite(sequelize, Sequelize.DataTypes),
	Grant: Grant(sequelize, Sequelize.DataTypes),
	List: List(sequelize, Sequelize.DataTypes),
	Right: Right(sequelize, Sequelize.DataTypes),
	View: View(sequelize, Sequelize.DataTypes),
};

//require.context(__dirname, false, /^((?!index).)*\.js$/)
/*fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		models[model.name] = model;
	});
*/

Object.keys(models).forEach(modelName => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

export { sequelize }
export default models