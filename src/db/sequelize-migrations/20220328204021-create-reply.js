'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Replies', {
			Uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			AuthorUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'Uuid',
					as: 'AuthorUuid',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			LastEditorUuid: {
				type: Sequelize.UUID,
				allowNull: true,
				references: {
					model: 'Users',
					key: 'Uuid',
					as: 'LastEditorUuid',
				},
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
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
			ReplyingTo: Sequelize.STRING,
			ReplyingToUuid: Sequelize.UUID,
			PostUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Posts',
					key: 'Uuid',
					as: 'PostUuid',
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
		await queryInterface.dropTable('Replies');
	}
};