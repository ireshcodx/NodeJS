require('@dotenvx/dotenvx').config()
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(process.env.TB_CUSTOMER, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courier_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
      allowNull:true,
      defaultValue: 0
    }
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Package, { foreignKey: 'customerId', as: 'packages' });
    Customer.belongsTo(models.Courier, { foreignKey: 'courier_id', as: 'courier' });
  };

  return Customer;
};