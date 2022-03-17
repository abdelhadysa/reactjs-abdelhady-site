'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Users', [{
			Username: 'abdelhady',
			Uuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
			CreatedAt: new Date(),
			UpdatedAt: new Date()
		},
		{
			Username: 'abdelhady2',
			Uuid: '1a847950-0a16-4f46-82a7-4022d38218ab',
			CreatedAt: new Date(),
			UpdatedAt: new Date()
		},
		{
			Username: 'abdelhady3',
			Uuid: '697a73bb-7c9f-45fb-8718-ff5bdb2fe8f8',
			CreatedAt: new Date(),
			UpdatedAt: new Date()
		}])
	},

	async down (queryInterface, Sequelize) {
		return await queryInterface.bulkDelete('Users', null, {});
	}
};
