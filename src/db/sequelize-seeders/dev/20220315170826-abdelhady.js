'use strict';
const { metaUser } = require('../metaSeed')
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Users', metaUser.map((user) => {
			return {
				Uuid: user.Uuid,
				Username: user.Username,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))
	},

	async down (queryInterface, Sequelize) {
		return await queryInterface.bulkDelete('Users', null, {});
	}
};
