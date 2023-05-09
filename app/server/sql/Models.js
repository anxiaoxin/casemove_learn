const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('casemove', 'root', 'Li@980828298', {
  host: 'bj-cynosdbmysql-grp-flnudbrs.sql.tencentcdb.com',
  port: '22373',
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
  validityM: DataTypes.INTEGER,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
})

module.exports = {
  User,
  sequelize
}
