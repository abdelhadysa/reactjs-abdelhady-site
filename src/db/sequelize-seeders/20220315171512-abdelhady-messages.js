'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Messages', [{
      uuid: '6248790e-9a3d-4367-896c-92f1428e455a',
      title: 'Untitled',
      text: 'Good day, devs!',
      userUuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: '9d5a8f35-6169-4aee-8592-8ae4cb3ffabd',
      title: 'Untitled',
      text: 'A new release of the site is coming soon!',
      userUuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: 'e0f9ede0-e1c1-4bd4-a57e-fbca44d5eb6f',
      title: 'Untitled',
      text: 'Stay tuned. More coming soon.',
      userUuid: 'c271a430-472e-48b1-8dcd-1e83dbcad379',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
