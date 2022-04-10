'use strict';
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Reactions', {
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
			Points: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
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
		await queryInterface.dropTable('Reactions');
	}
};