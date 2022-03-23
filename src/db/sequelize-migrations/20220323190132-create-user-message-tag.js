'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('UserMessageTags', {
			Uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			UserUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'Uuid',
					as: 'UserUuid',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			MessageTagUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'MessageTags',
					key: 'Uuid',
					as: 'MessageTagUuid',
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
		await queryInterface.dropTable('UserMessageTags');
	}
};