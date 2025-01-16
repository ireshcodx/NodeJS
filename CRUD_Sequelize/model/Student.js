const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hobbies: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
}, {
  tableName: 'students',
  timestamps: false,
});

module.exports = Student;
