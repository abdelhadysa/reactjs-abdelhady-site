'use strict';
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Rights', {
			Uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			RoleUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Roles',
					key: 'Uuid',
					as: 'RoleUuid',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			PermissionUuid: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Permissions',
					key: 'Uuid',
					as: 'PermissionUuid',
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
		await queryInterface.dropTable('Rights');
	}
};