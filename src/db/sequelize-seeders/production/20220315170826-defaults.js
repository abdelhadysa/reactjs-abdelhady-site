'use strict';
import { hashPass } from '../../../server/utils/bcryptManager';
const {
	D_DEFAULT_USER_ROLE_NAME,
	D_SUPER_USER_ROLE_NAME,
	D_DEFAULT_USER_ACCOUNT_NAME,
	D_DEFAULT_USER_ACCOUNT_PASSWORD, 
	D_USER_PERM,
	D_MESSAGE_PERM,
	D_ROLE_PERM,
	D_PERMISSION_PERM,
	D_TAG_PERM,
	D_REACTION_PERM,
	D_LOG_PERM, 
	D_DEFAULT_PERM,
} = require('../../../server/utils/defaults')
const crypto = require('crypto')
module.exports = {
	async up (queryInterface, Sequelize) {
		const defaultPass = await hashPass(D_DEFAULT_USER_ACCOUNT_PASSWORD)
		const defaultUserUuid = crypto.randomUUID()
		const defaultUserRoleUuid = crypto.randomUUID()
		const defaultSuperRoleUuid = crypto.randomUUID()
		let permUuids = []
		let defaultPermUuids = []
		await queryInterface.bulkInsert('Users', [{
			Uuid: defaultUserUuid,
			Username: D_DEFAULT_USER_ACCOUNT_NAME,
			PasswordHash: defaultPass,
			Email: D_DEFAULT_USER_ACCOUNT_NAME + '@example.com',
			IpAddress: '127.0.0.1',
			Device: 'Unknown',
			LastVisit: new Date(),
			AvatarUrl: null,
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}])
		await queryInterface.bulkInsert('Roles', [{
			Uuid: defaultUserRoleUuid,
			Name: D_DEFAULT_USER_ROLE_NAME,
			Description: `[Default] The place where all ${D_DEFAULT_USER_ROLE_NAME} members belong to.`,
			Order: 0,
			Color: '#373737',
			Super: false,
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
	}, {
			Uuid: defaultSuperRoleUuid,
			Name: D_SUPER_USER_ROLE_NAME,
			Description: `[Default] The place where all ${D_SUPER_USER_ROLE_NAME} members belong to.`,
			Order: 10,
			Color: '#FF0000',
			Super: true,
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
	}])
		await queryInterface.bulkInsert('Permissions', [
			...Object.values(D_USER_PERM),
			...Object.values(D_MESSAGE_PERM),
			...Object.values(D_ROLE_PERM),
			...Object.values(D_PERMISSION_PERM),
			...Object.values(D_TAG_PERM),
			...Object.values(D_REACTION_PERM),
			...Object.values(D_LOG_PERM),
		].map((permission) => {
			const permUuid = crypto.randomUUID()
			permUuids.push(permUuid)
			for (const defaultPerm of Object.values(D_DEFAULT_PERM)) {
				if (defaultPerm === permission) {
					defaultPermUuids.push(permUuid)
				}
			}
			return {
				Uuid: permUuid,
				Name: permission,
				Description: `[Default] Grants permission ${permission} to member roles.`,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))
		await queryInterface.bulkInsert('Grants', [{
			Uuid: crypto.randomUUID(),
			UserUuid: defaultUserUuid,
			RoleUuid: defaultSuperRoleUuid,
			CreatedAt: new Date(),
			UpdatedAt: new Date(),
		}])
		await queryInterface.bulkInsert('Rights', 
			[...permUuids.map((permUuid) => {
				return {
					Uuid: crypto.randomUUID(),
					RoleUuid: defaultSuperRoleUuid,
					PermissionUuid: permUuid,
					CreatedAt: new Date(),
					UpdatedAt: new Date(),
				}
			}),
			...defaultPermUuids.map((defaultPermUuid) => {
				return {
					Uuid: crypto.randomUUID(),
					RoleUuid: defaultUserRoleUuid,
					PermissionUuid: defaultPermUuid, 
					CreatedAt: new Date(),
					UpdatedAt: new Date(),
				}
			})]
		)
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
		await queryInterface.bulkDelete('Roles', null, {});
		await queryInterface.bulkDelete('Permissions', null, {});
		await queryInterface.bulkDelete('Grants', null, {});
		await queryInterface.bulkDelete('Rights', null, {});
	}
};
