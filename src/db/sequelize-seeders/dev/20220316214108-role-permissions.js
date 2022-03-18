'use strict';
const { metaPermission } = require('../metaSeed')
const { metaRole } = require('../metaSeed')
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
		await queryInterface.bulkInsert('Permissions', metaPermission.map((permission) => {
			return {
				Uuid: permission.Uuid,
				Name: permission.Name,
				Description: permission.Description,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))

		for (const permission of metaPermission) {
			await queryInterface.bulkInsert('RolePermissions', permission.Roles.map((role) => {
				return {
					Uuid: crypto.randomUUID(),
					RoleUuid: metaRole[role].Uuid,
					PermissionUuid: permission.Uuid,
					CreatedAt: new Date(),
					UpdatedAt: new Date(),
				}
			}))
		}
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Permissions')
		await queryInterface.bulkDelete('RolePermissions')
	}
};
