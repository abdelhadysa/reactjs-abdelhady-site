'use strict';
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Posts', {
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
			Locked: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			Pinned: {
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
		await queryInterface.dropTable('Posts');
	}
};