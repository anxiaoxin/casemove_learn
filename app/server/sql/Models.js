const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('casemove', 'root', 'root', {
  host: 'localhost',
  // host: '10.0.8.15',
  // port: '3306',
  dialect: 'mysql'
});


const User = sequelize.define('user', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.CHAR,
  skey: DataTypes.CHAR,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  updatedAt: DataTypes.TIME,
  createdAt: DataTypes.TIME
})

module.exports = {
  User,
  sequelize
}
