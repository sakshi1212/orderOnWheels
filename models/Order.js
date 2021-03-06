const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

class Order extends Sequelize.Model {

  static get Statuses() {
    return Statuses;
  }

  static init(sequelize) {
    return super.init(
      {
        startLatitude: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        startLongtitude: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        destLatitude: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        destLongtitude: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        distance: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.ENUM(
            'UNASSIGNED',
            'TAKEN',
          ),
          allowNull: false,
          defaultValue: 'UNASSIGNED',
          validate: {
            isIn: {
              args: [['UNASSIGNED', 'TAKEN']],
              msg: "Status Must be UNASSIGNED or TAKEN",
            }
          }
        },
      },
      {
        sequelize,
        modelName: 'orders',
        scopes: {
          unassigned: {
            where: {
              status: 'UNASSIGNED'
            },
          },
          taken: {
            where: {
              status: 'TAKEN'
            },
          },
        },
      }
    );
  }

  static associate(models) {
  }
}

module.exports = Order;

