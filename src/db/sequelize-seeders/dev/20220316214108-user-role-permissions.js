'use strict';
const { metaUser, metaRole, metaPermission, metaRolePermission, metaUserRolePermission } = require('../metaSeed')
const crypto = require('crypto')
module.exports = {
	async up (queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		await queryInterface.bulkInsert('Roles', metaRole.map((role) => {
			return {
				...role,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))

		await queryInterface.bulkInsert('Permissions', metaPermission.map((permission) => {
			return {
				Uuid: permission.Uuid,
				Name: permission.Name,
				Description: permission.Description,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))

		await queryInterface.bulkInsert('RolePermissions', metaRolePermission.map((rolePermission) => {
			return {
				Uuid: rolePermission.Uuid,
				RoleUuid: rolePermission.RoleUuid,
				PermissionUuid: rolePermission.PermissionUuid,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))

		await queryInterface.bulkInsert('UserRolePermissions', metaUserRolePermission.map((userRolePermission) => {
			return {
				Uuid: userRolePermission.Uuid,
				UserUuid: userRolePermission.UserUuid,
				RolePermissionUuid: userRolePermission.RolePermissionUuid,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Roles')
		await queryInterface.bulkDelete('Permissions')
		await queryInterface.bulkDelete('RolePermissions')
		await queryInterface.bulkDelete('UserRolePermissions')
	}
};
