const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('casemove', 'root', 'root', {
  host: 'localhost',
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
  updatedAt: DataTypes.TIME,
  createdAt: DataTypes.TIME
})

module.exports = {
  User,
  sequelize
}
