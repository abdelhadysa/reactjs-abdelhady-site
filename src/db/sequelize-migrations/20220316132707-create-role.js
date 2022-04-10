'use strict';
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Roles', {
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
			Order: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			Color: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: '#000000',
			},
			Super: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
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
		await queryInterface.dropTable('Roles');
	}
};