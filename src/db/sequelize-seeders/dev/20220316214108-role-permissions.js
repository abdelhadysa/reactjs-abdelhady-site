'use strict';

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
		await queryInterface.bulkInsert('Permissions', [{
			Uuid: 'b274f6dd-e379-47cb-8257-91232beabae0',
			Name: 'Get messages',
			Description: 'Query API and get all the posted messages',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}, {
			Uuid: 'b0d5add7-261a-4e8c-a7ab-7050b6716ee5',
			Name: 'Get users',
			Description: 'Query API and get all the registered users',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}, {
			Uuid: '33a97fca-0db6-4dea-9cc8-88328194aa18',
			Name: 'Full access',
			Description: 'Query and manage API',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}])
		await queryInterface.bulkInsert('RolePermissions', [{
			Uuid: 'ed29f511-f9b3-44cc-bc3b-54409fd6eec0',
			RoleUuid: 'cf0f492f-2e14-4694-ae78-965fbc049d3a',
			PermissionUuid: 'b274f6dd-e379-47cb-8257-91232beabae0',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}, {
			Uuid: 'a752e2d7-bc4a-46bb-b3bb-2e32a0882645',
			RoleUuid: 'cf0f492f-2e14-4694-ae78-965fbc049d3a',
			PermissionUuid: 'b0d5add7-261a-4e8c-a7ab-7050b6716ee5',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}, {
			Uuid: 'f0566eeb-acd2-424e-a899-00afe219c37d',
			RoleUuid: 'cb7ead4f-80d9-4de4-8f00-35046e5e10fa',
			PermissionUuid: '33a97fca-0db6-4dea-9cc8-88328194aa18',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}])
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
