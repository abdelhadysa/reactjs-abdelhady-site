'use strict';
const { metaReaction, metaMessageReaction, metaUserMessageReaction } = require('../metaSeed')
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
		await queryInterface.bulkInsert('Reactions', metaReaction.map((reaction) => {
			return {
				Uuid: reaction.Uuid,
				Name: reaction.Name,
				Points: reaction.Points,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))

		await queryInterface.bulkInsert('MessageReactions', metaMessageReaction.map((messageReaction) => {
			return {
				Uuid: messageReaction.Uuid,
				MessageUuid: messageReaction.MessageUuid,
				ReactionUuid: messageReaction.ReactionUuid,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))

		await queryInterface.bulkInsert('UserMessageReactions', metaUserMessageReaction.map((userMessageReaction) => {
			return {
				Uuid: userMessageReaction.Uuid,
				UserUuid: userMessageReaction.UserUuid,
				MessageReactionUuid: userMessageReaction.MessageReactionUuid,
				CreatedAt: new Date(),
				UpdatedAt: new Date(),
			}
		}))
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Reactions')
		await queryInterface.bulkDelete('MessageReactions')
		await queryInterface.bulkDelete('UserMessageReactions')
	}
};
