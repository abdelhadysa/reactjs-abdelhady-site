'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Logs', {
			Uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			Message: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			UserUuid: {
				type: Sequelize.UUID,
				allowNull: true,
				references: {
					model: 'Users',
					key: 'Uuid',
					as: 'UserUuid',
				},
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			},
			Username: Sequelize.STRING,
			Role: Sequelize.STRING,
			Super: Sequelize.STRING,
			Permission: Sequelize.STRING,
			Level: Sequelize.STRING,
			CreatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			UpdatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Logs');
	}
};