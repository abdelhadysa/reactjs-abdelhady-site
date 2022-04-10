'use strict';
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Views', {
			Uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
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
				onUpdate: 'SET NULL'
			},
			MessageUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Messages',
					key: 'Uuid',
					as: 'MessageUuid',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
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
		await queryInterface.dropTable('Views');
	}
};