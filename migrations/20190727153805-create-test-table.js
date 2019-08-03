module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startLatitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startLongtitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destLatitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destLongtitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      distance: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('UNASSIGNED', 'TAKEN'),
        allowNull: false,
        defaultValue: 'UNASSIGNED',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('tests');
  },
};
