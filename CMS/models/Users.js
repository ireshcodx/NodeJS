require('@dotenvx/dotenvx').config()

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(process.env.TB_USERS, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default:0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Admin'
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      }
    });
  
    Users.associate = (models) => {
      Users.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customers' });
    };
  
    return Users;
  };
  