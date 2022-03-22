'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRolePermissions', {
		Uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		RolePermissionUuid: {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: 'RolePermissions',
				key: 'Uuid',
				as: 'RolePermissionUuid',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('UserRolePermissions');
  }
};