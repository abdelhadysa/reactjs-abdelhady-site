'use strict';

import Sequelize from'sequelize'
import configObj from '../sequelize-config/config.js'
import Engagement from './engagement.js'
import Favorite from './favorite.js'
import Grant from './grant.js'
import List from './list.js'
import Log from './log.js'
import Message from './message.js'
import Permission from './permission.js'
import Post from './post.js'
import Reply from './reply.js'
import Right from './right.js'
import Role from './role.js'
import Tag from './tag.js'
import User from './user.js'
import Reaction from './reaction.js'
import View from './view.js'
import Attachment from './attachment.js'

const env = process.env.NODE_ENV || 'development'
const config = configObj[env]

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
	Attachment: Attachment(sequelize, Sequelize.DataTypes),
}

Object.keys(models).forEach(modelName => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

export { sequelize }
export default models