'use strict';
import { hashPass } from '../../../server/utils/bcryptManager';
const { metaUser } = require('../metaSeed')
module.exports = {
	async up (queryInterface, Sequelize) {
		const defaultPass = await hashPass('seed')
		await queryInterface.bulkInsert('Users', metaUser.map((user) => {
			return {
				Uuid: user.Uuid,
				Username: user.Username,
				Email: user.Email,
				IpAddress: user.IpAddress,
				Device: user.Device,
				PasswordHash: defaultPass,
				LastVisit: new Date(),
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))
	},

	async down (queryInterface, Sequelize) {
		return await queryInterface.bulkDelete('Users', null, {});
	}
};
