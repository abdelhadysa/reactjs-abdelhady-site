'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('UserRoles', {
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
		await queryInterface.dropTable('UserRoles');
	}
};