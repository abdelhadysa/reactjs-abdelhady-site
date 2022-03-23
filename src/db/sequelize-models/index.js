'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../sequelize-config/config.js')[env];

import userModel from './user'
import messageModel from './message'
import roleModel from './role'
import permissionModel from './permission'
import rolePermissionModel from './rolepermission'
import userRolePermissionModel from './userrolepermission'
import reactionModel from './reaction'
import messageReactionModel from './messagereaction'
import userMessageReactionModel from './usermessagereaction'
import logModel from './log'
import messageTagModel from './messagetag'
import tagModel from './tag'
import userMessageTagModel from './usermessagetag'
import userSavedMessageModel from './usersavedmessage'

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
	User: userModel(sequelize, Sequelize.DataTypes),
	Role: roleModel(sequelize, Sequelize.DataTypes),
	Permission: permissionModel(sequelize, Sequelize.DataTypes),
	RolePermission: rolePermissionModel(sequelize, Sequelize.DataTypes),
	UserRolePermission: userRolePermissionModel(sequelize, Sequelize.DataTypes),
	Message: messageModel(sequelize, Sequelize.DataTypes),
	Reaction: reactionModel(sequelize, Sequelize.DataTypes),
	MessageReaction: messageReactionModel(sequelize, Sequelize.DataTypes),
	UserMessageReaction: userMessageReactionModel(sequelize, Sequelize.DataTypes),
	Log: logModel(sequelize, Sequelize.DataTypes),
	MessageTag: messageTagModel(sequelize, Sequelize.DataTypes),
	Tag: tagModel(sequelize, Sequelize.DataTypes),
	UserMessageTag: userMessageTagModel(sequelize, Sequelize.DataTypes),
	UserSavedMessage: userSavedMessageModel(sequelize, Sequelize.DataTypes),
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