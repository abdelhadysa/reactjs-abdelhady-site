'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Messages', {
			Uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			Title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Text: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			UserUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'Users',
					key: 'Uuid',
					as: 'UserUuid',
				},
			},
			CreatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			UpdatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Messages');
	}
};