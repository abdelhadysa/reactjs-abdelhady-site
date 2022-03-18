'use strict';
const { metaMessage } = require('../metaSeed')
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Messages', metaMessage.map((message) => {
			return {
				...message,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))
	},

	async down (queryInterface, Sequelize) {
		return await queryInterface.bulkDelete('Messages', null, {});
	}
};
