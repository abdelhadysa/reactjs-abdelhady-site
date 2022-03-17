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
		await queryInterface.bulkInsert('Roles', [{
			Uuid: 'cf0f492f-2e14-4694-ae78-965fbc049d3a',
			Name: 'User',
			Description: 'Regular user role',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		},
		{
			Uuid: 'cb7ead4f-80d9-4de4-8f00-35046e5e10fa',
			Name: 'Admin',
			Description: 'Website administrator',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}])
		await queryInterface.bulkInsert('UserRoles', [{
			Uuid: 'f44a162a-1ffa-458f-8521-51ac23ac237f',
			UserUuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
			RoleUuid: 'cf0f492f-2e14-4694-ae78-965fbc049d3a',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		},
		{
			Uuid: 'da67f31e-437f-4b79-8991-ccc03b518161',
			UserUuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
			RoleUuid: 'cb7ead4f-80d9-4de4-8f00-35046e5e10fa',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		},
		{
			Uuid: '9a296003-8aad-4fed-9744-1c8f91e96ed6',
			UserUuid: '1a847950-0a16-4f46-82a7-4022d38218ab',
			RoleUuid: 'cf0f492f-2e14-4694-ae78-965fbc049d3a',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		},
		{
			Uuid: 'f6e11b52-c6a1-42a3-9853-faa7806cb67b',
			UserUuid: '697a73bb-7c9f-45fb-8718-ff5bdb2fe8f8',
			RoleUuid: 'cf0f492f-2e14-4694-ae78-965fbc049d3a',
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
		await queryInterface.bulkDelete('Roles')
		await queryInterface.bulkDelete('UserRoles')
	}
};
