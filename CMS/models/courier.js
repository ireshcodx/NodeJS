require('@dotenvx/dotenvx').config()

module.exports = (sequelize, DataTypes) => {
  const Courier = sequelize.define(process.env.TB_COURIER, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false
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
      defaultValue: 1
    }
  });

  Courier.associate = (models) => {
    Courier.hasMany(models.Package, { foreignKey: 'courierId', as: 'packages' });
    Courier.hasMany(models.Customer, { foreignKey: 'courier_id', as: 'customers' });
  };

  return Courier;
};
