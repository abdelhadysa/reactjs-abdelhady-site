'use strict';
const { metaUser } = require('../metaSeed')
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
		await queryInterface.bulkInsert('Roles', metaRole.map((role) => {
			return {
				...role,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))
		for (const user of metaUser) {
			await queryInterface.bulkInsert('UserRoles', user.Roles.map((role) => {
				return {
					Uuid: crypto.randomUUID(),
					UserUuid: user.Uuid,
					RoleUuid: metaRole[role].Uuid,
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
		await queryInterface.bulkDelete('Roles')
		await queryInterface.bulkDelete('UserRoles')
	}
};
