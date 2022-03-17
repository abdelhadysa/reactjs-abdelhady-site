'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Messages', [{
			Uuid: '6248790e-9a3d-4367-896c-92f1428e455a',
			Title: 'Untitled',
			Text: 'Good day, devs!',
			UserUuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		},
		{
			Uuid: '9d5a8f35-6169-4aee-8592-8ae4cb3ffabd',
			Title: 'Untitled',
			Text: 'A new release of the site is coming soon!',
			UserUuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		},
		{
			Uuid: 'e0f9ede0-e1c1-4bd4-a57e-fbca44d5eb6f',
			Title: 'Untitled',
			Text: 'Stay tuned. More coming soon.',
			UserUuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		},
		{
			Uuid: '1a847950-0a16-4f46-82a7-4022d38218ab',
			Title: 'New User Message',
			Text: 'Hello guys, I am new here!',
			UserUuid: '1a847950-0a16-4f46-82a7-4022d38218ab',
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}])
	},

	async down (queryInterface, Sequelize) {
		return await queryInterface.bulkDelete('Messages', null, {});
	}
};
