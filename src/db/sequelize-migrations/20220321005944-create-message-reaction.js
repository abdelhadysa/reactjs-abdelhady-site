'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('MessageReactions', {
			Uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			ReactionUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Reactions',
					key: 'Uuid',
					as: 'ReactionUuid',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',	
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
		await queryInterface.dropTable('MessageReactions');
	}
};