'use strict';
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Permissions', {
			Uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			Name: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			Description: {
				type: Sequelize.STRING,
				allowNull: true,
			},
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
		await queryInterface.dropTable('Permissions');
	}
};