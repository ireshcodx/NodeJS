require('@dotenvx/dotenvx').config()
module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define(process.env.TB_PACKAGE, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courierId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    deliveryStatus: {
      type: DataTypes.ENUM('Pending', 'In Transit', 'Delivered'),
      defaultValue: 'Pending'
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
      defaultValue: "Admin"
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  Package.associate = (models) => {
    Package.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
    Package.belongsTo(models.Courier, { foreignKey: 'courierId', as: 'courier' });
  };

  return Package;
};
